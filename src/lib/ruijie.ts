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

let tokenCache: RuijieTokenCache | null = null;

// Cache daftar Wi-Fi agar pencarian dan filter cepat (3 menit)
interface WifiCache {
  data: RuijieSsid[];
  hierarchy: RuijieProjectHierarchy[];
  timestamp: number;
}
let wifiCache: WifiCache | null = null;

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
 * Mendapatkan Access Token (dengan in-memory caching 20 menit)
 */
export async function getRuijieToken(forceRefresh = false): Promise<string> {
  const now = Date.now();
  if (!forceRefresh && tokenCache && tokenCache.expiresAt > now) {
    return tokenCache.accessToken;
  }

  const { cloudUrl, appid, secret } = getRuijieConfig();
  const authUrl = `${cloudUrl}/service/api/oauth20/client/access_token?token=d63dss0a81e4415a889ac5b78fsc904a`;

  const res = await fetch(authUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ appid, secret }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`HTTP Error saat login Ruijie: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  if (data.code !== 0 || !data.accessToken) {
    throw new Error(`Gagal mendapatkan token Ruijie: ${data.msg || JSON.stringify(data)}`);
  }

  tokenCache = {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken || "",
    expiresAt: now + 20 * 60 * 1000,
  };

  return tokenCache.accessToken;
}

/**
 * Fetch helper dengan penanganan otomatis jika token kedaluwarsa (code === 4)
 */
export async function fetchRuijie<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const { cloudUrl } = getRuijieConfig();
  let token = await getRuijieToken();

  const delimiter = endpoint.includes("?") ? "&" : "?";
  let url = `${cloudUrl}${endpoint}${delimiter}access_token=${token}`;

  let res = await fetch(url, { ...options, cache: "no-store" });
  let data = await res.json();

  // Code 4: Token is overdued
  if (data.code === 4) {
    token = await getRuijieToken(true);
    url = `${cloudUrl}${endpoint}${delimiter}access_token=${token}`;
    res = await fetch(url, { ...options, cache: "no-store" });
    data = await res.json();
  }

  return data;
}

/**
 * Mengambil hierarki lengkap Group Utama dan Sub Group dari Ruijie Cloud
 */
export async function getRuijieHierarchy(): Promise<RuijieProjectHierarchy[]> {
  const data = await fetchRuijie<{ code: number; msg?: string; groups?: any }>(
    "/service/api/group/single/tree?depth=DEVICE"
  );

  if (data.code !== 0 || !data.groups) {
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
  return projects;
}

/**
 * Mengambil daftar SSID dan password dari seluruh grup dan sub-grup di Ruijie Cloud
 */
export async function getRuijieWifiList(forceRefresh = false): Promise<{
  wifiList: RuijieSsid[];
  hierarchy: RuijieProjectHierarchy[];
}> {
  const now = Date.now();
  if (!forceRefresh && wifiCache && wifiCache.timestamp > now - 3 * 60 * 1000) {
    return {
      wifiList: wifiCache.data,
      hierarchy: wifiCache.hierarchy,
    };
  }

  const hierarchy = await getRuijieHierarchy();

  // Kumpulkan semua node (Group Utama & Sub Group) yang akan dipindai
  const nodesToScan: {
    groupId: number;
    groupName: string;
    parentGroupName: string;
    isSubGroup: boolean;
  }[] = [];

  for (const proj of hierarchy) {
    // 1. Group Utama
    nodesToScan.push({
      groupId: proj.groupId,
      groupName: proj.name,
      parentGroupName: proj.name,
      isSubGroup: false,
    });

    // 2. Sub Groups
    for (const sg of proj.subGroups) {
      nodesToScan.push({
        groupId: sg.groupId,
        groupName: sg.name,
        parentGroupName: proj.name,
        isSubGroup: true,
      });
    }
  }

  const allSsids: RuijieSsid[] = [];

  // Pindai secara paralel dalam batch 16 agar cepat tanpa membebani rate limit
  const BATCH_SIZE = 16;
  for (let i = 0; i < nodesToScan.length; i += BATCH_SIZE) {
    const chunk = nodesToScan.slice(i, i + BATCH_SIZE);
    const chunkResults = await Promise.all(
      chunk.map(async (node) => {
        try {
          const res = await fetchRuijie<{ code: number; msg?: string; ssidList?: any[] }>(
            `/service/api/open/v1/wifi?group_id=${node.groupId}`
          );
          if (res.code === 0 && Array.isArray(res.ssidList)) {
            return res.ssidList.map((s) => ({
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
            }));
          }
        } catch {
          // Abaikan grup tanpa WiFi
        }
        return [];
      })
    );

    chunkResults.forEach((items) => {
      if (items && items.length > 0) {
        allSsids.push(...items);
      }
    });
  }

  // Update in-memory cache
  wifiCache = {
    data: allSsids,
    hierarchy,
    timestamp: now,
  };

  return { wifiList: allSsids, hierarchy };
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
  const { cloudUrl } = getRuijieConfig();
  const token = await getRuijieToken();

  // Ambil data wifi saat ini untuk menjaga properti lain
  const { wifiList } = await getRuijieWifiList(false);
  const existing = wifiList.find((s) => s.id === params.ssidId && s.groupId === params.groupId);

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

  const res = await fetch(`${cloudUrl}/service/api/open/v1/wifi?access_token=${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (data.code !== 0) {
    throw new Error(`Gagal update WiFi Ruijie: ${data.msg || JSON.stringify(data)}`);
  }

  // Invalidate cache
  wifiCache = null;

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

let wifiReportCache: { data: RuijieWifiReportData; timestamp: number } | null = null;

/**
 * Mengambil Laporan Komprehensif Telemetri Wi-Fi Ruijie:
 * Klien online, penggunaan bandwidth per SSID/Klien, kesehatan AP, dan distribusi spektrum radio.
 */
export async function getRuijieWifiReport(forceRefresh = false): Promise<RuijieWifiReportData> {
  const now = Date.now();
  if (!forceRefresh && wifiReportCache && wifiReportCache.timestamp > now - 2 * 60 * 1000) {
    return wifiReportCache.data;
  }

  const hierarchy = await getRuijieHierarchy();

  // Fetch client telemetry & AP inventory paralel untuk setiap group utama (project)
  const projectResults = await Promise.all(
    hierarchy.map(async (proj) => {
      try {
        const userRes = await fetchRuijie<{ code: number; totalCount?: number; list?: any[] }>(
          `/service/api/open/v1/dev/user/current-user?group_id=${proj.groupId}&page_size=100&page_index=1`
        ).catch(() => ({ code: -1, totalCount: 0, list: [] }));

        // Tarik seluruh perangkat nirkabel (AP & Home Router) dengan paginasi penuh
        const rawAps: any[] = [];
        let apPage = 1;
        let reportedTotal = 0;
        while (true) {
          try {
            const apRes = await fetchRuijie<{ code: number; totalCount?: number; deviceList?: any[] }>(
              `/service/api/maint/devices?group_id=${proj.groupId}&page=${apPage}&per_page=100`
            );
            if (apRes.totalCount) reportedTotal = apRes.totalCount;
            const list = Array.isArray(apRes.deviceList) ? apRes.deviceList : [];
            rawAps.push(...list);
            if (list.length < 100 || (reportedTotal && rawAps.length >= reportedTotal)) break;
            apPage++;
          } catch {
            break;
          }
        }

        const rawClients = Array.isArray(userRes.list) ? userRes.list : [];

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

        return {
          project: proj.name,
          groupId: proj.groupId,
          totalClients: userRes.totalCount || clients.length,
          clients,
          totalAps: projApsCount,
          onlineAps: projOnlineApsCount,
          totalHomeRouters: projWrsCount,
          onlineHomeRouters: projOnlineWrsCount,
          aps,
          totalFlow,
        };
      } catch {
        return {
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
        };
      }
    })
  );

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
    offlineAps += (pr.totalAps - pr.onlineAps);
    totalHomeRouters += pr.totalHomeRouters;
    onlineHomeRouters += pr.onlineHomeRouters;

    pr.aps.forEach((ap) => {
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

    pr.clients.forEach((c) => {
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

  // Jika totalAps 0 tapi ada device di allAps
  if (totalAps === 0) totalAps = allAps.length;
  if (offlineAps === 0 && onlineAps < totalAps) offlineAps = totalAps - onlineAps;

  const totalBands = count5G + count24G || 1;
  const pct5G = Math.round((count5G / totalBands) * 100);
  const pct24G = 100 - pct5G;

  // Top SSIDs sorted by client count
  const totalSsidClients = Object.values(ssidMap).reduce((a, b) => a + b.clients, 0) || 1;
  const topSsids = Object.entries(ssidMap)
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
    timestamp: now,
  };

  wifiReportCache = {
    data: reportData,
    timestamp: now,
  };

  return reportData;
}

/**
 * Sinkronisasi seluruh perangkat (Access Point & Switches) dari Ruijie Cloud ke tabel SwitchDevice di BeeRadius
 */
export async function syncRuijieCloudDevicesToDb(): Promise<{
  totalSynced: number;
  created: number;
  updated: number;
  devices: any[];
}> {
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
    const deviceType = isWr || isGw ? "router" : "ap";
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
}


