import fs from "fs";
import path from "path";
import prisma from "@/lib/prisma";

/**
 * Ruijie Cloud Northbound API Client
 * Berdasarkan Ruijie Cloud API Reference Manual V2.0.3
 */

interface RuijieTokenCache {
  accessToken: string;
  refreshToken: string;
  expiresAt: number; // timestamp ms
}

// <ruijie-state>
// State global disimpan di globalThis agar cache, mutex, dan pacer tetap tunggal
// walau modul di-reload (HMR dev) atau ter-bundle terpisah per route handler.
export interface RuijieSyncResult {
  totalSynced: number;
  created: number;
  updated: number;
  devices: any[];
}

interface RuijieGlobalState {
  tokenCache: RuijieTokenCache | null;
  isRefreshingToken: Promise<string> | null;
  wifiCache: WifiCache | null;
  wifiFetchPromise: Promise<{ wifiList: RuijieSsid[]; hierarchy: RuijieProjectHierarchy[] }> | null;
  hierarchyCache: HierarchyCache | null;
  hierarchyPromise: Promise<RuijieProjectHierarchy[]> | null;
  wifiReportCache: WifiReportCache | null;
  wifiReportPromise: Promise<RuijieWifiReportData> | null;
  syncDevicesPromise: Promise<RuijieSyncResult> | null;
  lastRuijieRequestTime: number;
  ruijieQueuePromise: Promise<void>;
}

const globalForRuijie = globalThis as unknown as { __ruijieState?: RuijieGlobalState };
const S: RuijieGlobalState =
  globalForRuijie.__ruijieState ??
  (globalForRuijie.__ruijieState = {
    tokenCache: null,
    isRefreshingToken: null,
    wifiCache: null,
    wifiFetchPromise: null,
    hierarchyCache: null,
    hierarchyPromise: null,
    wifiReportCache: null,
    wifiReportPromise: null,
    syncDevicesPromise: null,
    lastRuijieRequestTime: 0,
    ruijieQueuePromise: Promise.resolve(),
  });
// </ruijie-state>

// Persistent File Cache untuk Wi-Fi agar tidak terkena rate limit Ruijie Cloud saat server restart/HMR
const WIFI_CACHE_FILE = path.resolve(process.cwd(), ".ruijie_wifi_cache.json");

interface WifiCache {
  data: RuijieSsid[];
  hierarchy: RuijieProjectHierarchy[];
  timestamp: number;
}

function readPersistentWifiCache(): WifiCache | null {
  try {
    if (fs.existsSync(WIFI_CACHE_FILE)) {
      const raw = fs.readFileSync(WIFI_CACHE_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.data) && Array.isArray(parsed.hierarchy)) {
        return parsed;
      }
    }
  } catch {}
  return null;
}

function writePersistentWifiCache(cache: WifiCache) {
  try {
    fs.writeFileSync(WIFI_CACHE_FILE, JSON.stringify(cache), "utf-8");
  } catch {}
}

export interface RuijieSubGroup {
  groupId: number;
  name: string;
}

export interface RuijieProjectHierarchy {
  groupId: number;
  name: string;
  subGroups: RuijieSubGroup[];
}

export interface RuijieSsid {
  id: number;
  wlanId?: number;
  ssidName: string;
  password?: string;
  vlanId?: number;
  encryptionMode?: string;
  encryptionModeDesc?: string;
  enable?: string;
  ishidden?: string;
  relatedRadio?: string;
  groupId: number;
  groupName: string;
  parentGroupName: string;
  isSubGroup: boolean;
  path: string;
  [key: string]: any;
}

function loadEnvFallback() {
  if (process.env.RUIJIE_APP_ID && process.env.RUIJIE_SECRET_KEY) return;
  try {
    const envPath = path.resolve(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf8");
      for (const line of content.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#")) {
          const eqIdx = trimmed.indexOf("=");
          if (eqIdx > 0) {
            const key = trimmed.substring(0, eqIdx).trim();
            const val = trimmed.substring(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
            process.env[key] = val;
          }
        }
      }
    }
  } catch {}
}

// Load env vars immediately on module import
loadEnvFallback();

export function getRuijieConfig() {
  loadEnvFallback();
  const cloudUrl = (process.env.RUIJIE_CLOUD_URL || "https://cloud-as.ruijienetworks.com").replace(/\/+$/, "");
  const appid = process.env.RUIJIE_APP_ID || "";
  const secret = process.env.RUIJIE_SECRET_KEY || "";

  if (!appid || !secret) {
    throw new Error("RUIJIE_APP_ID atau RUIJIE_SECRET_KEY belum dikonfigurasi pada .env");
  }

  return { cloudUrl, appid, secret };
}

/**
 * Mendapatkan Access Token (dengan in-memory caching 20 menit dan thread-safe mutex)
 */

export async function getRuijieToken(forceRefresh = false): Promise<string> {
  const now = Date.now();
  if (!forceRefresh && S.tokenCache && S.tokenCache.expiresAt > now) {
    return S.tokenCache.accessToken;
  }

  // Jika sedang ada proses refresh token yang berjalan, gunakan promise yang sama (cegah token collision)
  if (S.isRefreshingToken) {
    return S.isRefreshingToken;
  }

  S.isRefreshingToken = (async () => {
    try {
      const { cloudUrl, appid, secret } = getRuijieConfig();
      const authUrl = `${cloudUrl}/service/api/oauth20/client/access_token?token=d63dss0a81e4415a889ac5b78fsc904a`;

      const res = await fetch(authUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appid, secret }),
        cache: "no-store",
        signal: AbortSignal.timeout(15000),
      });

      if (!res.ok) {
        throw new Error(`HTTP Error saat login Ruijie: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      if (data.code !== 0 || !data.accessToken) {
        throw new Error(`Gagal mendapatkan token Ruijie: ${data.msg || JSON.stringify(data)}`);
      }

      S.tokenCache = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken || "",
        expiresAt: Date.now() + 20 * 60 * 1000,
      };

      return S.tokenCache.accessToken;
    } finally {
      S.isRefreshingToken = null;
    }
  })();

  return S.isRefreshingToken;
}

// Global Request Pacer: Menjamin jarak minimal antar request ke Ruijie Cloud di seluruh aplikasi
const MIN_RUIJIE_INTERVAL_MS = 150; // Jeda minimal 150ms (~6.6 req/detik max)

async function waitRuijiePacing(): Promise<void> {
  const p = S.ruijieQueuePromise.then(async () => {
    const now = Date.now();
    const elapsed = now - S.lastRuijieRequestTime;
    if (elapsed < MIN_RUIJIE_INTERVAL_MS) {
      await new Promise((resolve) => setTimeout(resolve, MIN_RUIJIE_INTERVAL_MS - elapsed));
    }
    S.lastRuijieRequestTime = Date.now();
  });
  S.ruijieQueuePromise = p.catch(() => {});
  return p;
}

/**
 * Fetch helper dengan penanganan otomatis jika token kedaluwarsa (code === 4),
 * pembatasan laju global (pacing), dan proteksi auto-retry backoff jika terkena rate limit
 */
export async function fetchRuijie<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  await waitRuijiePacing();
  const { cloudUrl } = getRuijieConfig();
  let token = await getRuijieToken();

  const delimiter = endpoint.includes("?") ? "&" : "?";
  let url = `${cloudUrl}${endpoint}${delimiter}access_token=${token}`;

  let res = await fetch(url, {
    ...options,
    cache: "no-store",
    signal: options.signal || AbortSignal.timeout(15000),
  });
  let data = await res.json();

  // Code 4: Token is overdued -> Segarkan token dan ulangi request
  if (data.code === 4) {
    token = await getRuijieToken(true);
    url = `${cloudUrl}${endpoint}${delimiter}access_token=${token}`;
    await waitRuijiePacing();
    res = await fetch(url, {
      ...options,
      cache: "no-store",
      signal: options.signal || AbortSignal.timeout(15000),
    });
    data = await res.json();
  }

  // Rate Limiting Detection (Code 429 atau pesan frequency / busy dari server Ruijie)
  for (let retry = 0; retry < 2; retry++) {
    const isRateLimited =
      data.code === 429 ||
      res.status === 429 ||
      (typeof data.msg === "string" &&
        (data.msg.toLowerCase().includes("frequency") ||
          data.msg.toLowerCase().includes("busy") ||
          data.msg.toLowerCase().includes("too many")));

    if (!isRateLimited) break;

    // Backoff bertahap: 2000ms lalu 4000ms jika Ruijie Cloud sedang sibuk
    const backoff = 2000 * (retry + 1);
    await new Promise((r) => setTimeout(r, backoff));
    await waitRuijiePacing();
    res = await fetch(url, {
      ...options,
      cache: "no-store",
      signal: options.signal || AbortSignal.timeout(15000),
    });
    data = await res.json();
  }

  return data;
}

// Persistent File Cache untuk Hierarki Grup Ruijie (15 Menit TTL)
const HIERARCHY_CACHE_FILE = path.resolve(process.cwd(), ".ruijie_hierarchy_cache.json");

interface HierarchyCache {
  data: RuijieProjectHierarchy[];
  timestamp: number;
}


function readPersistentHierarchyCache(): HierarchyCache | null {
  try {
    if (fs.existsSync(HIERARCHY_CACHE_FILE)) {
      const raw = fs.readFileSync(HIERARCHY_CACHE_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.data)) {
        return parsed;
      }
    }
  } catch {}
  return null;
}

function writePersistentHierarchyCache(cache: HierarchyCache) {
  try {
    fs.writeFileSync(HIERARCHY_CACHE_FILE, JSON.stringify(cache), "utf-8");
  } catch {}
}

/**
 * Mengambil hierarki lengkap Group Utama dan Sub Group dari Ruijie Cloud
 * Dilengkapi Disk Persistence, Single-Flight Mutex, dan True SWR (stale dikembalikan instan,
 * revalidasi berjalan di background)
 */
export async function getRuijieHierarchy(forceRefresh = false): Promise<RuijieProjectHierarchy[]> {
  const now = Date.now();
  const TTL = 15 * 60 * 1000; // 15 menit

  if (!S.hierarchyCache) {
    S.hierarchyCache = readPersistentHierarchyCache();
  }

  const hasCache = !!S.hierarchyCache && S.hierarchyCache.data.length > 0;
  if (!forceRefresh && hasCache) {
    if (S.hierarchyCache!.timestamp <= now - TTL) {
      // Stale: revalidasi di background, kembalikan data lama tanpa menunggu
      refreshRuijieHierarchy().catch(() => {});
    }
    return S.hierarchyCache!.data;
  }

  return refreshRuijieHierarchy();
}

function refreshRuijieHierarchy(): Promise<RuijieProjectHierarchy[]> {
  // Single-flight Mutex: Jika proses fetch hierarki sedang berjalan, gabung ke Promise yang sama
  if (S.hierarchyPromise) {
    return S.hierarchyPromise;
  }

  S.hierarchyPromise = (async () => {
    try {
      const data = await fetchRuijie<{ code: number; msg?: string; groups?: any }>(
        "/service/api/group/single/tree?depth=DEVICE"
      );

      if (data.code !== 0 || !data.groups) {
        if (S.hierarchyCache?.data && S.hierarchyCache.data.length > 0) return S.hierarchyCache.data;
        return [];
      }

      const projects: RuijieProjectHierarchy[] = [];

      function crawl(node: any) {
        if (node.type === "BUILDING" && node.groupId > 0) {
          const subGroups: RuijieSubGroup[] = [];
          if (node.subGroups && Array.isArray(node.subGroups)) {
            for (const sg of node.subGroups) {
              if (sg.groupId > 0) {
                subGroups.push({
                  groupId: sg.groupId,
                  name: sg.name,
                });
              }
            }
          }
          if (node.name !== "defaultNetwork" || subGroups.length > 0) {
            projects.push({
              groupId: node.groupId,
              name: node.name,
              subGroups,
            });
          }
        } else if (node.subGroups && Array.isArray(node.subGroups)) {
          node.subGroups.forEach(crawl);
        }
      }

      crawl(data.groups);
      if (projects.length === 0 && S.hierarchyCache?.data.length) {
        // Respons kosong tidak boleh menimpa hierarki yang sudah diketahui
        return S.hierarchyCache.data;
      }
      S.hierarchyCache = { data: projects, timestamp: Date.now() };
      writePersistentHierarchyCache(S.hierarchyCache);
      return projects;
    } catch (err: any) {
      if (S.hierarchyCache?.data && S.hierarchyCache.data.length > 0) {
        return S.hierarchyCache.data;
      }
      throw err;
    } finally {
      S.hierarchyPromise = null;
    }
  })();

  return S.hierarchyPromise;
}

interface WifiScanNode {
  groupId: number;
  groupName: string;
  parentGroupName: string;
  isSubGroup: boolean;
}

/**
 * Ambil SSID mentah satu grup. Mengembalikan null jika gagal (rate limit / error),
 * sehingga pemanggil bisa membedakan "grup tanpa SSID" vs "gagal diambil".
 * Retry & backoff sudah ditangani di fetchRuijie (tidak ada retry berlapis).
 */
async function fetchGroupSsidsRaw(groupId: number): Promise<any[] | null> {
  try {
    const res = await fetchRuijie<{ code: number; msg?: string; ssidList?: any[] }>(
      `/service/api/open/v1/wifi?group_id=${groupId}`
    );
    if (res.code === 0) return Array.isArray(res.ssidList) ? res.ssidList : [];
    return null;
  } catch {
    return null;
  }
}

function mapSsid(s: any, node: WifiScanNode): RuijieSsid {
  return {
    ...s,
    id: s.id,
    ssidName: s.ssidName,
    password: s.password || "",
    vlanId: s.vlanId,
    encryptionMode: s.encryptionMode,
    encryptionModeDesc: s.encryptionModeDesc || s.encryptionMode,
    enable: s.enable,
    ishidden: s.ishidden,
    relatedRadio: s.relatedRadio,
    groupId: node.groupId,
    groupName: node.groupName,
    parentGroupName: node.parentGroupName,
    isSubGroup: node.isSubGroup,
    path: node.isSubGroup ? `${node.parentGroupName} > ${node.groupName}` : node.groupName,
  };
}

const WIFI_LIST_TTL = 15 * 60 * 1000; // 15 menit (konfigurasi Wi-Fi rumah sakit sangat jarang berubah)
const PARTIAL_RETRY_MS = 60 * 1000; // Jika crawl parsial, coba revalidasi lagi setelah 1 menit

/**
 * Mengambil daftar SSID dan password dari seluruh grup dan sub-grup di Ruijie Cloud
 * Dilengkapi Disk Persistence, Single-Flight Mutex, Pacing Batch Aman, True SWR
 * (stale dikembalikan instan + revalidasi background), dan Partial Merge per grup.
 */
export async function getRuijieWifiList(forceRefresh = false): Promise<{
  wifiList: RuijieSsid[];
  hierarchy: RuijieProjectHierarchy[];
}> {
  // 1. Baca cache disk persisten jika memory cache kosong (misal pasca restart / fast refresh dev)
  if (!S.wifiCache) {
    S.wifiCache = readPersistentWifiCache();
  }

  // 2. Ada cache & tidak force: kembalikan instan (0 API call). Jika basi, revalidasi di background.
  if (!forceRefresh && S.wifiCache && S.wifiCache.data.length > 0) {
    if (S.wifiCache.timestamp <= Date.now() - WIFI_LIST_TTL) {
      refreshRuijieWifiList(false).catch(() => {});
    }
    return { wifiList: S.wifiCache.data, hierarchy: S.wifiCache.hierarchy };
  }

  return refreshRuijieWifiList(forceRefresh);
}

function refreshRuijieWifiList(forceRefresh: boolean): Promise<{
  wifiList: RuijieSsid[];
  hierarchy: RuijieProjectHierarchy[];
}> {
  // Mutex In-Flight Promise: cegah "thundering herd" (banyak request concurrent memicu crawl ganda)
  if (S.wifiFetchPromise) {
    return S.wifiFetchPromise;
  }

  S.wifiFetchPromise = (async () => {
    try {
      const hierarchy = await getRuijieHierarchy(forceRefresh);

      // Kumpulkan semua node (Group Utama & Sub Group) yang akan dipindai
      const nodesToScan: WifiScanNode[] = [];
      for (const proj of hierarchy) {
        nodesToScan.push({
          groupId: proj.groupId,
          groupName: proj.name,
          parentGroupName: proj.name,
          isSubGroup: false,
        });
        for (const sg of proj.subGroups) {
          nodesToScan.push({
            groupId: sg.groupId,
            groupName: sg.name,
            parentGroupName: proj.name,
            isSubGroup: true,
          });
        }
      }

      const freshSsids: RuijieSsid[] = [];
      const failedGroupIds = new Set<number>();

      // Pindai paralel dalam batch kecil (3 per batch, jeda 250ms) + global pacer di fetchRuijie
      const BATCH_SIZE = 3;
      for (let i = 0; i < nodesToScan.length; i += BATCH_SIZE) {
        const chunk = nodesToScan.slice(i, i + BATCH_SIZE);
        const chunkResults = await Promise.all(chunk.map((node) => fetchGroupSsidsRaw(node.groupId)));

        chunkResults.forEach((list, idx) => {
          const node = chunk[idx];
          if (list === null) {
            failedGroupIds.add(node.groupId);
          } else {
            freshSsids.push(...list.map((s) => mapSsid(s, node)));
          }
        });

        if (i + BATCH_SIZE < nodesToScan.length) {
          await new Promise((r) => setTimeout(r, 250));
        }
      }

      // Semua grup gagal: pertahankan cache lama sepenuhnya (SWR Fallback)
      if (nodesToScan.length > 0 && failedGroupIds.size === nodesToScan.length && S.wifiCache?.data.length) {
        console.warn("[Ruijie Cloud] Crawl Wi-Fi gagal total. Mempertahankan cache persisten sebelumnya.");
        return { wifiList: S.wifiCache.data, hierarchy: S.wifiCache.hierarchy };
      }

      // Partial Merge: grup yang gagal memakai SSID dari cache lama, bukan dihapus
      const carried = failedGroupIds.size > 0
        ? (S.wifiCache?.data || []).filter((s) => failedGroupIds.has(s.groupId))
        : [];
      if (failedGroupIds.size > 0) {
        console.warn(
          `[Ruijie Cloud] ${failedGroupIds.size}/${nodesToScan.length} grup Wi-Fi gagal diambil, memakai data cache untuk grup tersebut.`
        );
      }

      const now = Date.now();
      const updatedCache: WifiCache = {
        data: [...freshSsids, ...carried],
        hierarchy,
        // Jika parsial, buat cache cepat basi agar grup yang gagal dicoba ulang ±1 menit lagi
        timestamp: failedGroupIds.size > 0 ? now - WIFI_LIST_TTL + PARTIAL_RETRY_MS : now,
      };
      S.wifiCache = updatedCache;
      writePersistentWifiCache(updatedCache);

      return { wifiList: updatedCache.data, hierarchy };
    } catch (err: any) {
      console.warn("[Ruijie Cloud] Gagal crawl Wi-Fi live, fallback ke cache:", err.message);
      if (S.wifiCache && S.wifiCache.data && S.wifiCache.data.length > 0) {
        return { wifiList: S.wifiCache.data, hierarchy: S.wifiCache.hierarchy };
      }
      throw err;
    } finally {
      S.wifiFetchPromise = null;
    }
  })();

  return S.wifiFetchPromise;
}

/**
 * Mengupdate konfigurasi SSID/Password di Ruijie Cloud
 */
export async function updateRuijieWifi(params: {
  groupId: number;
  ssidId: number;
  ssidName: string;
  password?: string;
  vlanId?: number;
  enable?: boolean;
  ishidden?: boolean;
  encryptionMode?: string;
}) {
  // Ambil konfigurasi terkini HANYA untuk grup terkait (1 request), bukan crawl seluruh grup.
  // Data cache dipakai sebagai metadata (groupName/path) dan fallback jika request gagal.
  if (!S.wifiCache) {
    S.wifiCache = readPersistentWifiCache();
  }
  const cached = S.wifiCache?.data.find((s) => s.id === params.ssidId && s.groupId === params.groupId);
  const liveList = await fetchGroupSsidsRaw(params.groupId);
  const live = liveList?.find((s) => s.id === params.ssidId);
  const existing: Record<string, any> | undefined = live ? { ...cached, ...live } : cached;

  const wirelessConfEntity: Record<string, any> = {
    ssidName: params.ssidName,
    ssidEncode: existing?.ssidEncode || "utf-8",
    relatedRadio: existing?.relatedRadio || "1,2",
    enable: params.enable !== undefined ? String(params.enable) : existing?.enable || "true",
    ishidden: params.ishidden !== undefined ? String(params.ishidden) : existing?.ishidden || "false",
    fowardType: existing?.fowardType || "bridge",
    vlanId: params.vlanId !== undefined ? params.vlanId : existing?.vlanId || 1,
    encryptionMode: params.encryptionMode || existing?.encryptionMode || (params.password ? "wpa_wpa2-psk" : "open"),
    password: params.password !== undefined ? params.password : existing?.password || "",
    qosEnable: existing?.qosEnable || "false",
    wlanQosEnable: existing?.wlanQosEnable || "false",
    authEnable: existing?.authEnable || "false",
    bandSelectEnable: existing?.bandSelectEnable || "false",
    ppskEnable: existing?.ppskEnable || "false",
    usersLimit: existing?.usersLimit || 0,
    xpressEnable: existing?.xpressEnable || "false",
    ftEnable: existing?.ftEnable || 0,
    okcEnable: existing?.okcEnable || 0,
    axMode: existing?.axMode || "false",
    beMode: existing?.beMode || "false",
    wm: existing?.wm || "0",
    vAuth: existing?.vAuth || "0",
    mlo: existing?.mlo || "0",
    radiusServerAll: existing?.radiusServerAll || [],
    isApartment: existing?.isApartment || "false",
    isGuest: existing?.isGuest || "false",
    l2iso: existing?.l2iso || "false",
    wirelessModeType: existing?.wirelessModeType || "compatibilityMode",
    preset: existing?.preset || "0",
    supportTmngt: existing?.supportTmngt || false,
  };

  const payload = {
    groupId: params.groupId,
    wifiGrpSsid: false,
    ssidId: params.ssidId,
    wirelessConfEntity,
  };

  const data = await fetchRuijie<{ code: number; msg?: string }>(
    "/service/api/open/v1/wifi",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  if (data.code !== 0) {
    throw new Error(`Gagal update WiFi Ruijie: ${data.msg || JSON.stringify(data)}`);
  }

  // Perbarui item langsung di in-memory & persistent cache tanpa perlu re-crawl 70 grup
  if (S.wifiCache && Array.isArray(S.wifiCache.data)) {
    const idx = S.wifiCache.data.findIndex((s) => s.id === params.ssidId && s.groupId === params.groupId);
    if (idx !== -1) {
      S.wifiCache.data[idx] = {
        ...S.wifiCache.data[idx],
        ssidName: params.ssidName,
        password: params.password !== undefined ? params.password : S.wifiCache.data[idx].password,
        vlanId: params.vlanId !== undefined ? params.vlanId : S.wifiCache.data[idx].vlanId,
        enable: params.enable !== undefined ? String(params.enable) : S.wifiCache.data[idx].enable,
        ishidden: params.ishidden !== undefined ? String(params.ishidden) : S.wifiCache.data[idx].ishidden,
        encryptionMode: params.encryptionMode || S.wifiCache.data[idx].encryptionMode,
      };
      writePersistentWifiCache(S.wifiCache);
    }
  } else {
    S.wifiCache = null;
  }

  return data;
}

export interface RuijieWifiClient {
  mac: string;
  ip: string;
  userName: string;
  linkedDevice: string;
  deviceName: string;
  groupName: string;
  parentGroupName: string;
  flowUp: number;
  flowDown: number;
  flowUpDown: number;
  upRate: number;
  downRate: number;
  activeSec: number;
  band: string;
  rssi: number;
  pktLoseRate: number;
  channel: string;
  connectType: string;
  ssid: string;
  manufacturer: string;
  staCategoryName: string;
  staOs: string;
  staModel: string;
  onlineTime: number;
}

export interface RuijieApDevice {
  serialNumber: string;
  name: string;
  aliasName: string;
  productClass: string;
  commonType?: string;
  onlineStatus: string;
  localIp: string;
  groupName: string;
  parentGroupName: string;
  staNums: number;
  staActiveNums: number;
  radio1ChannelUtil: number;
  radio2ChannelUtil: number;
}

export interface RuijieWifiReportData {
  summary: {
    totalClients: number;
    totalAps: number;
    onlineAps: number;
    offlineAps: number;
    totalHomeRouters?: number;
    onlineHomeRouters?: number;
    totalWirelessDevices?: number;
    onlineWirelessDevices?: number;
    totalFlowDown: number;
    totalFlowUp: number;
    totalFlow: number;
    bandStats: {
      count5G: number;
      count24G: number;
      pct5G: number;
      pct24G: number;
    };
  };
  projectStats: Array<{
    name: string;
    groupId: number;
    clients: number;
    apCount: number;
    onlineApCount: number;
    homeRouterCount?: number;
    onlineHomeRouterCount?: number;
    totalFlow: number;
  }>;
  topSsids: Array<{
    ssid: string;
    clients: number;
    totalFlow: number;
    pct: number;
  }>;
  topAps: Array<{
    name: string;
    model: string;
    ip: string;
    groupName: string;
    parentGroupName: string;
    clients: number;
    activeClients: number;
    util24: number;
    util50: number;
    onlineStatus: string;
  }>;
  topClients: Array<RuijieWifiClient>;
  clients: Array<RuijieWifiClient>;
  timestamp: number;
}

// Persistent File Cache untuk Telemetri Laporan Wi-Fi Ruijie (5 Menit TTL)
const WIFI_REPORT_CACHE_FILE = path.resolve(process.cwd(), ".ruijie_wifi_report_cache.json");

/** Snapshot per proyek (tanpa daftar klien, karena klien sudah ada di data.clients) */
interface WifiReportProjectSnapshot {
  project: string;
  groupId: number;
  totalClients: number;
  totalAps: number;
  onlineAps: number;
  totalHomeRouters: number;
  onlineHomeRouters: number;
  aps: RuijieApDevice[];
  totalFlow: number;
}

type WifiReportProjectResult = WifiReportProjectSnapshot & { clients: RuijieWifiClient[] };

interface WifiReportCache {
  data: RuijieWifiReportData;
  timestamp: number;
  projects?: WifiReportProjectSnapshot[];
}

const WIFI_REPORT_TTL = 5 * 60 * 1000; // 5 menit


function readPersistentWifiReportCache(): WifiReportCache | null {
  try {
    if (fs.existsSync(WIFI_REPORT_CACHE_FILE)) {
      const raw = fs.readFileSync(WIFI_REPORT_CACHE_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (parsed && parsed.data && parsed.data.summary && Array.isArray(parsed.data.clients)) {
        return parsed;
      }
    }
  } catch {}
  return null;
}

function writePersistentWifiReportCache(cache: WifiReportCache) {
  try {
    fs.writeFileSync(WIFI_REPORT_CACHE_FILE, JSON.stringify(cache), "utf-8");
  } catch {}
}

/**
 * Mengambil Laporan Komprehensif Telemetri Wi-Fi Ruijie:
 * Klien online, penggunaan bandwidth per SSID/Klien, kesehatan AP, dan distribusi spektrum radio.
 * Dilengkapi Disk Persistence (5m TTL), Single-Flight Mutex, Sekuensial Pacing, True SWR
 * (stale dikembalikan instan + revalidasi background), dan Fallback per Proyek.
 */
export async function getRuijieWifiReport(forceRefresh = false): Promise<RuijieWifiReportData> {
  // 1. Baca persistent disk cache jika memory cache belum dimuat
  if (!S.wifiReportCache) {
    S.wifiReportCache = readPersistentWifiReportCache();
  }

  // 2. Ada cache & tidak force: kembalikan instan. Jika basi, revalidasi di background (tanpa menunggu crawl).
  if (!forceRefresh && S.wifiReportCache) {
    if (S.wifiReportCache.timestamp <= Date.now() - WIFI_REPORT_TTL) {
      refreshRuijieWifiReport(false).catch(() => {});
    }
    return S.wifiReportCache.data;
  }

  return refreshRuijieWifiReport(forceRefresh);
}

function refreshRuijieWifiReport(forceRefresh: boolean): Promise<RuijieWifiReportData> {
  // Single-Flight Mutex: Jika sedang ada proses crawling report, gabung ke Promise yang sama
  if (S.wifiReportPromise) {
    return S.wifiReportPromise;
  }

  S.wifiReportPromise = (async () => {
    const now = Date.now();
    try {
      const hierarchy = await getRuijieHierarchy(forceRefresh);
      const prevCache = S.wifiReportCache;
      if (hierarchy.length === 0 && prevCache) {
        return prevCache.data;
      }

      // Snapshot proyek dari cache lama sebagai cadangan jika sebagian crawl gagal
      const prevSnapshots = new Map((prevCache?.projects || []).map((p) => [p.project, p]));
      const prevClientsOf = (name: string) =>
        (prevCache?.data.clients || []).filter((c) => c.parentGroupName === name);

      // Crawl per project secara sekuensial (menghindari burst traffic bersamaan ke Ruijie Cloud)
      const projectResults: WifiReportProjectResult[] = [];
      let failedParts = 0;
      let freshProjects = 0;

      for (const proj of hierarchy) {
        const prev = prevSnapshots.get(proj.name);
        try {
          // Tarik seluruh klien nirkabel aktif dengan paginasi penuh per-1000
          let clientsOk = true;
          const rawClients: any[] = [];
          let clientPage = 1;
          let reportedTotalClients = 0;
          while (true) {
            try {
              const userRes = await fetchRuijie<{ code: number; totalCount?: number; list?: any[] }>(
                `/service/api/open/v1/dev/user/current-user?group_id=${proj.groupId}&page_size=1000&page_index=${clientPage}`
              ).catch(() => null);

              // Halaman gagal (rate limit / error): tandai gagal agar tidak dihitung sebagai 0 klien
              if (!userRes || (userRes.code !== 0 && !Array.isArray(userRes.list))) {
                clientsOk = false;
                break;
              }

              if (userRes.totalCount) reportedTotalClients = userRes.totalCount;
              const list = Array.isArray(userRes.list) ? userRes.list : [];
              rawClients.push(...list);

              if (list.length < 1000 || (reportedTotalClients && rawClients.length >= reportedTotalClients) || clientPage >= 10) {
                break;
              }
              clientPage++;
            } catch {
              clientsOk = false;
              break;
            }
          }

          // Tarik seluruh perangkat nirkabel (AP & Home Router) dengan paginasi penuh
          let apsOk = true;
          const rawAps: any[] = [];
          let apPage = 1;
          let reportedTotal = 0;
          while (true) {
            try {
              const apRes = await fetchRuijie<{ code: number; totalCount?: number; deviceList?: any[] }>(
                `/service/api/maint/devices?group_id=${proj.groupId}&page=${apPage}&per_page=100`
              );
              if (apRes.code !== 0 && !Array.isArray(apRes.deviceList)) {
                apsOk = false;
                break;
              }
              if (apRes.totalCount) reportedTotal = apRes.totalCount;
              const list = Array.isArray(apRes.deviceList) ? apRes.deviceList : [];
              rawAps.push(...list);
              if (list.length < 100 || (reportedTotal && rawAps.length >= reportedTotal)) break;
              apPage++;
            } catch {
              apsOk = false;
              break;
            }
          }

          const clients: RuijieWifiClient[] = rawClients.map((c) => ({
            mac: c.mac || "-",
            ip: c.ip || "-",
            userName: c.userName || "",
            linkedDevice: c.linkedDevice || "-",
            deviceName: c.deviceName || "-",
            groupName: c.groupName || proj.name,
            parentGroupName: proj.name,
            flowUp: Number(c.flowUp || 0),
            flowDown: Number(c.flowDown || 0),
            flowUpDown: Number(c.flowUpDown || 0),
            upRate: Number(c.upRate || 0),
            downRate: Number(c.downRate || 0),
            activeSec: Number(c.activeSec || 0),
            band: c.band || "2.4G",
            rssi: Number(c.rssi || 0),
            pktLoseRate: Number(c.pktLoseRate || 0),
            channel: c.channel ? String(c.channel) : "-",
            connectType: c.connectType || "wireless",
            ssid: c.ssid || "Unknown",
            manufacturer: c.manufacturer || "",
            staCategoryName: c.staCategoryName || "",
            staOs: c.staOs || "",
            staModel: c.staModel || "",
            onlineTime: Number(c.onlineTime || now),
          }));

          let projApsCount = 0;
          let projOnlineApsCount = 0;
          let projWrsCount = 0;
          let projOnlineWrsCount = 0;

          const aps: RuijieApDevice[] = [];
          for (const d of rawAps) {
            if (d.commonType === "GW") continue; // Lewati Gateway core jika ada

            const isAp = d.commonType === "AP" || !d.commonType;
            const isWr = d.commonType === "WR";
            const isOnline = d.onlineStatus === "ON";

            if (isAp) {
              projApsCount++;
              if (isOnline) projOnlineApsCount++;
            } else if (isWr) {
              projWrsCount++;
              if (isOnline) projOnlineWrsCount++;
            }

            aps.push({
              serialNumber: d.serialNumber || "-",
              name: d.name || d.aliasName || "AP",
              aliasName: d.aliasName || d.name || "AP",
              productClass: d.productClass || "AP",
              commonType: d.commonType || "AP",
              onlineStatus: d.onlineStatus || "OFF",
              localIp: d.localIp || "-",
              groupName: d.groupName || proj.name,
              parentGroupName: proj.name,
              staNums: Number(d.staNums || 0),
              staActiveNums: Number(d.staActiveNums || 0),
              radio1ChannelUtil: Number(d.radio1ChannelUtil || 0),
              radio2ChannelUtil: Number(d.radio2ChannelUtil || 0),
            });
          }

          let totalFlow = 0;
          clients.forEach((c) => (totalFlow += c.flowUpDown));

          let result: WifiReportProjectResult = {
            project: proj.name,
            groupId: proj.groupId,
            totalClients: reportedTotalClients || clients.length,
            clients,
            totalAps: projApsCount,
            onlineAps: projOnlineApsCount,
            totalHomeRouters: projWrsCount,
            onlineHomeRouters: projOnlineWrsCount,
            aps,
            totalFlow,
          };

          // Fallback per bagian: klien gagal -> pakai klien proyek ini dari cache lama
          if (!clientsOk) {
            failedParts++;
            if (prev) {
              result = {
                ...result,
                clients: prevClientsOf(proj.name),
                totalClients: prev.totalClients,
                totalFlow: prev.totalFlow,
              };
            }
          }
          // AP gagal -> pakai inventaris AP proyek ini dari cache lama
          if (!apsOk) {
            failedParts++;
            if (prev) {
              result = {
                ...result,
                aps: prev.aps,
                totalAps: prev.totalAps,
                onlineAps: prev.onlineAps,
                totalHomeRouters: prev.totalHomeRouters,
                onlineHomeRouters: prev.onlineHomeRouters,
              };
            }
          }
          if (clientsOk || apsOk) freshProjects++;
          projectResults.push(result);
        } catch {
          failedParts += 2;
          projectResults.push(
            prev
              ? { ...prev, clients: prevClientsOf(proj.name) }
              : {
                  project: proj.name,
                  groupId: proj.groupId,
                  totalClients: 0,
                  clients: [],
                  totalAps: 0,
                  onlineAps: 0,
                  totalHomeRouters: 0,
                  onlineHomeRouters: 0,
                  aps: [],
                  totalFlow: 0,
                }
          );
        }
      }

      // Tidak ada satu pun proyek yang berhasil diambil: pertahankan cache lama apa adanya
      if (freshProjects === 0 && prevCache) {
        console.warn("[Ruijie Cloud] Crawl report Wi-Fi gagal total. Mempertahankan cache persisten sebelumnya.");
        return prevCache.data;
      }
      if (failedParts > 0) {
        console.warn(
          `[Ruijie Cloud] ${failedParts} bagian crawl report gagal, memakai snapshot cache untuk bagian tersebut.`
        );
      }

      let totalClients = 0;
      let totalAps = 0;
      let onlineAps = 0;
      let offlineAps = 0;
      let totalHomeRouters = 0;
      let onlineHomeRouters = 0;
      let totalFlowDown = 0;
      let totalFlowUp = 0;
      let count5G = 0;
      let count24G = 0;

      const allClients: RuijieWifiClient[] = [];
      const allAps: RuijieApDevice[] = [];
      const ssidMap: Record<string, { clients: number; totalFlow: number }> = {};
      const projectStats: RuijieWifiReportData["projectStats"] = [];

      for (const pr of projectResults) {
        totalClients += pr.totalClients;
        totalAps += pr.totalAps;
        onlineAps += pr.onlineAps;
        offlineAps += pr.totalAps - pr.onlineAps;
        totalHomeRouters += pr.totalHomeRouters;
        onlineHomeRouters += pr.onlineHomeRouters;

        pr.aps.forEach((ap: any) => {
          allAps.push(ap);
        });

        projectStats.push({
          name: pr.project,
          groupId: pr.groupId,
          clients: pr.totalClients,
          apCount: pr.totalAps,
          onlineApCount: pr.onlineAps,
          homeRouterCount: pr.totalHomeRouters,
          onlineHomeRouterCount: pr.onlineHomeRouters,
          totalFlow: pr.totalFlow,
        });

        pr.clients.forEach((c: any) => {
          allClients.push(c);
          totalFlowDown += c.flowDown;
          totalFlowUp += c.flowUp;

          if (c.band === "5G") {
            count5G++;
          } else {
            count24G++;
          }

          if (!ssidMap[c.ssid]) {
            ssidMap[c.ssid] = { clients: 0, totalFlow: 0 };
          }
          ssidMap[c.ssid].clients++;
          ssidMap[c.ssid].totalFlow += c.flowUpDown;
        });
      }

      if (totalAps === 0) totalAps = allAps.length;
      if (offlineAps === 0 && onlineAps < totalAps) offlineAps = totalAps - onlineAps;

      const totalBands = count5G + count24G || 1;
      const pct5G = Math.round((count5G / totalBands) * 100);
      const pct24G = 100 - pct5G;

      // Top SSIDs sorted by client count (filter out Unknown, empty, or placeholder '-')
      const validSsidEntries = Object.entries(ssidMap).filter(
        ([ssid]) => ssid && ssid !== "Unknown" && ssid !== "-" && ssid.trim() !== ""
      );
      const totalSsidClients = validSsidEntries.reduce((a, b) => a + b[1].clients, 0) || 1;
      const topSsids = validSsidEntries
        .map(([ssid, val]) => ({
          ssid,
          clients: val.clients,
          totalFlow: val.totalFlow,
          pct: Math.round((val.clients / totalSsidClients) * 100),
        }))
        .sort((a, b) => b.clients - a.clients)
        .slice(0, 10);

      // Top APs sorted by client count (staNums)
      const topAps = allAps
        .sort((a, b) => b.staNums - a.staNums)
        .slice(0, 10)
        .map((ap) => ({
          name: ap.name,
          model: ap.productClass,
          ip: ap.localIp,
          groupName: ap.groupName,
          parentGroupName: ap.parentGroupName,
          clients: ap.staNums,
          activeClients: ap.staActiveNums,
          util24: ap.radio1ChannelUtil,
          util50: ap.radio2ChannelUtil,
          onlineStatus: ap.onlineStatus,
        }));

      // Top Clients sorted by usage (flowUpDown)
      const topClients = [...allClients].sort((a, b) => b.flowUpDown - a.flowUpDown).slice(0, 10);

      const reportData: RuijieWifiReportData = {
        summary: {
          totalClients,
          totalAps,
          onlineAps,
          offlineAps,
          totalHomeRouters,
          onlineHomeRouters,
          totalWirelessDevices: totalAps + totalHomeRouters,
          onlineWirelessDevices: onlineAps + onlineHomeRouters,
          totalFlowDown,
          totalFlowUp,
          totalFlow: totalFlowDown + totalFlowUp,
          bandStats: {
            count5G,
            count24G,
            pct5G,
            pct24G,
          },
        },
        projectStats,
        topSsids,
        topAps,
        topClients,
        clients: allClients,
        timestamp: Date.now(),
      };

      S.wifiReportCache = {
        data: reportData,
        // Jika parsial, buat cache cepat basi agar bagian yang gagal dicoba ulang ±1 menit lagi
        timestamp: failedParts > 0 ? Date.now() - WIFI_REPORT_TTL + 60 * 1000 : Date.now(),
        projects: projectResults.map(({ clients: _clients, ...snapshot }) => snapshot),
      };
      writePersistentWifiReportCache(S.wifiReportCache);

      return reportData;
    } catch (err: any) {
      // SWR Graceful Fallback: Jika terjadi rate limit atau error jaringan, kembalikan cache persisten terakhir
      if (S.wifiReportCache?.data) {
        console.warn("[Ruijie Cloud] Rate limit atau error saat crawl report Wi-Fi live. Menggunakan cache persisten:", err.message);
        return S.wifiReportCache.data;
      }
      throw err;
    } finally {
      S.wifiReportPromise = null;
    }
  })();

  return S.wifiReportPromise;
}

// Single-Flight Mutex untuk Sinkronisasi Perangkat ke Database

/**
 * Sinkronisasi seluruh perangkat (Access Point & Switches) dari Ruijie Cloud ke tabel SwitchDevice di BeeRadius
 * Dilengkapi Single-Flight Mutex untuk mencegah proses ganda saat ditekan beruntun
 */
export async function syncRuijieCloudDevicesToDb(): Promise<{
  totalSynced: number;
  created: number;
  updated: number;
  devices: any[];
}> {
  // Single-Flight Mutex: Jika sedang berjalan proses sinkronisasi, jangan buat proses baru
  if (S.syncDevicesPromise) {
    return S.syncDevicesPromise;
  }

  S.syncDevicesPromise = (async () => {
    try {
      const hierarchy = await getRuijieHierarchy();
      const rawDevices: any[] = [];

      for (const p of hierarchy) {
        let page = 1;
        while (true) {
          try {
            const res = await fetchRuijie<{ code: number; totalCount?: number; deviceList?: any[] }>(
              `/service/api/maint/devices?group_id=${p.groupId}&page=${page}&per_page=100`
            );
            const list = Array.isArray(res.deviceList) ? res.deviceList : [];
            list.forEach((d) => {
              rawDevices.push({
                ...d,
                projectName: p.name,
              });
            });
            if (list.length < 100 || rawDevices.length >= (res.totalCount || 0)) break;
            page++;
          } catch {
            break;
          }
        }
      }

      let created = 0;
      let updated = 0;
      const syncedList: any[] = [];

      for (const dev of rawDevices) {
        const rawIp = (dev.localIp || "").trim();
        const validIp =
          rawIp && rawIp !== "-" && !rawIp.startsWith("0.0")
            ? rawIp
            : (dev.cpeIp || `ruijie-${dev.serialNumber}`);
        const name = dev.aliasName || dev.name || dev.serialNumber || `Ruijie Device`;
        const brand = "Ruijie Networks";
        const model = dev.productClass || dev.productType || "Ruijie Device";
        const isWr = dev.commonType === "WR";
        const isGw = dev.commonType === "GW";
        const deviceType = isWr ? "home_router" : isGw ? "router" : "ap";
        const connMethod = "cloud";
        const status = dev.onlineStatus === "ON" ? "online" : "offline";
        const location = `${dev.projectName} > ${dev.groupName || "Ruangan"}`;
        const sysDescr = `Ruijie Cloud ${isWr ? "Home Router" : isGw ? "Gateway" : "AP"} (${model}) - SN: ${dev.serialNumber} - Firmware: ${dev.softwareVersion || "-"} - Klien Aktif: ${dev.staNums || 0}`;
        const uptime = dev.onlineStatus === "ON" ? "Online di Ruijie Cloud" : "Offline";
        const now = new Date();

        try {
          const existing = await prisma.switchDevice.findUnique({
            where: { ip: validIp },
          });

          if (existing) {
            const updatedDev = await prisma.switchDevice.update({
              where: { id: existing.id },
              data: {
                name,
                brand,
                model,
                deviceType: existing.deviceType === "switch" ? "switch" : deviceType,
                connMethod: "cloud",
                status,
                location,
                sysDescr,
                uptime,
                lastPolled: now,
              },
            });
            updated++;
            syncedList.push(updatedDev);
          } else {
            const newDev = await prisma.switchDevice.create({
              data: {
                name,
                ip: validIp,
                brand,
                model,
                deviceType,
                connMethod,
                status,
                location,
                sysDescr,
                uptime,
                community: "public",
                snmpVersion: "2c",
                port: 161,
                lastPolled: now,
              },
            });
            created++;
            syncedList.push(newDev);
          }
        } catch (e: any) {
          console.error(`Gagal sync perangkat Ruijie ${name} (${validIp}):`, e.message);
        }
      }

      return {
        totalSynced: created + updated,
        created,
        updated,
        devices: syncedList,
      };
    } finally {
      S.syncDevicesPromise = null;
    }
  })();

  return S.syncDevicesPromise;
}


