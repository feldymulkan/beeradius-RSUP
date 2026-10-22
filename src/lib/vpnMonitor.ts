import prisma from "@/lib/prisma";
import { getWireguardPeers, parseMikrotikDuration } from "@/lib/mikrotik";
import {
  sendVpnUserOnlineNotification,
  sendVpnUserOfflineNotification,
} from "@/lib/telegram";

interface CachedRadiusSession {
  radacctid: string;
  username: string;
  ip: string;
  nasIp: string;
  endpoint?: string;
  protocol?: string;
  startTime: Date;
}

interface CachedWireguardPeer {
  key: string;
  name: string;
  ip: string;
  routerName: string;
  endpoint?: string;
  connectedSince: number; // timestamp ms
  lastHandshakeSec: number;
}

interface VpnMonitorState {
  initialized: boolean;
  radiusSessions: Map<string, CachedRadiusSession>;
  wireguardPeers: Map<string, CachedWireguardPeer>;
  intervalTimer?: NodeJS.Timeout;
}

// Persist state across hot module reloads in Node.js runtime
const globalState = globalThis as unknown as {
  __vpnMonitorState?: VpnMonitorState;
};

if (!globalState.__vpnMonitorState) {
  globalState.__vpnMonitorState = {
    initialized: false,
    radiusSessions: new Map(),
    wireguardPeers: new Map(),
  };
}

const state = globalState.__vpnMonitorState;

/**
 * Check active and terminated RADIUS VPN sessions
 */
async function checkRadiusVpnSessions(): Promise<void> {
  try {
    // 1. Ambil seluruh sesi RADIUS VPN aktif saat ini
    const activeSessions = await prisma.radacct.findMany({
      where: {
        acctstoptime: null,
        OR: [
          { nasporttype: "Virtual" },
          { framedprotocol: { in: ["PPP", "PPTP", "L2TP", "SSTP"] } },
        ],
      },
      select: {
        radacctid: true,
        username: true,
        framedipaddress: true,
        nasipaddress: true,
        callingstationid: true,
        acctstarttime: true,
        framedprotocol: true,
      },
    });

    const currentSessionMap = new Map<string, (typeof activeSessions)[0]>();
    for (const s of activeSessions) {
      currentSessionMap.set(s.radacctid.toString(), s);
    }

    if (!state.initialized) {
      // Inisialisasi awal tanpa blast notifikasi
      for (const s of activeSessions) {
        state.radiusSessions.set(s.radacctid.toString(), {
          radacctid: s.radacctid.toString(),
          username: s.username,
          ip: s.framedipaddress || "0.0.0.0",
          nasIp: s.nasipaddress,
          endpoint: s.callingstationid,
          protocol: s.framedprotocol || "PPP",
          startTime: s.acctstarttime || new Date(),
        });
      }
      return;
    }

    // 2. Deteksi Sesi Baru Terhubung (ONLINE)
    for (const s of activeSessions) {
      const idStr = s.radacctid.toString();
      if (!state.radiusSessions.has(idStr)) {
        // Ambil info detail pengguna dari userinfo jika tersedia
        let fullName = "";
        let department = "";
        try {
          const user = await prisma.userinfo.findFirst({
            where: { username: s.username },
            select: { fullName: true, department: true },
          });
          if (user) {
            fullName = user.fullName || "";
            department = user.department || "";
          }
        } catch {
          // Abaikan jika userinfo tidak ditemukan
        }

        const newSession: CachedRadiusSession = {
          radacctid: idStr,
          username: s.username,
          ip: s.framedipaddress || "0.0.0.0",
          nasIp: s.nasipaddress,
          endpoint: s.callingstationid,
          protocol: s.framedprotocol || "PPP",
          startTime: s.acctstarttime || new Date(),
        };

        state.radiusSessions.set(idStr, newSession);

        console.log(`[VpnMonitor] RADIUS VPN Online terdeteksi: ${s.username} (${s.framedipaddress})`);
        sendVpnUserOnlineNotification({
          username: s.username,
          fullName,
          department,
          protocol: "radius",
          vpnTypeDetail: s.framedprotocol ? `${s.framedprotocol} (RADIUS)` : "RADIUS VPN",
          ip: s.framedipaddress || "0.0.0.0",
          nasOrRouter: s.nasipaddress,
          endpoint: s.callingstationid,
        }).catch((err) => console.error("[VpnMonitor] Gagal kirim notif online:", err.message));
      }
    }

    // 3. Deteksi Sesi yang Baru Saja Berakhir (OFFLINE)
    for (const [idStr, prevSession] of Array.from(state.radiusSessions.entries())) {
      if (!currentSessionMap.has(idStr)) {
        // Sesi telah ditutup! Ambil statistik dari database
        let durationSec = 0;
        let inOctets: bigint | undefined;
        let outOctets: bigint | undefined;
        let termCause = "User-Request";
        let fullName = "";

        try {
          const closed = await prisma.radacct.findUnique({
            where: { radacctid: BigInt(idStr) },
            select: {
              acctsessiontime: true,
              acctinputoctets: true,
              acctoutputoctets: true,
              acctterminatecause: true,
            },
          });

          if (closed) {
            durationSec = closed.acctsessiontime || 0;
            inOctets = closed.acctinputoctets || undefined;
            outOctets = closed.acctoutputoctets || undefined;
            termCause = closed.acctterminatecause || termCause;
          }

          const user = await prisma.userinfo.findFirst({
            where: { username: prevSession.username },
            select: { fullName: true },
          });
          if (user?.fullName) fullName = user.fullName;
        } catch (err: any) {
          console.warn(`[VpnMonitor] Gagal mengambil rincian radacct #${idStr}:`, err.message);
        }

        state.radiusSessions.delete(idStr);

        console.log(`[VpnMonitor] RADIUS VPN Offline terdeteksi: ${prevSession.username} (Durasi: ${durationSec}s)`);
        sendVpnUserOfflineNotification({
          username: prevSession.username,
          fullName,
          protocol: "radius",
          vpnTypeDetail: prevSession.protocol ? `${prevSession.protocol} (RADIUS)` : "RADIUS VPN",
          ip: prevSession.ip,
          durationSeconds: durationSec,
          inputBytes: inOctets,
          outputBytes: outOctets,
          terminateCause: termCause,
          nasOrRouter: prevSession.nasIp,
        }).catch((err) => console.error("[VpnMonitor] Gagal kirim notif offline:", err.message));
      }
    }
  } catch (err: any) {
    console.error("[VpnMonitor] Kesalahan saat memindai sesi RADIUS:", err.message);
  }
}

/**
 * Check active and disconnected WireGuard peers from MikroTik
 */
async function checkWireguardPeers(): Promise<void> {
  try {
    const configs = await prisma.mikrotikConfig.findMany();
    if (!configs || configs.length === 0) return;

    // Ambang batas aktif: handshake dalam 3 menit terakhir (180 detik)
    const WG_ACTIVE_THRESHOLD_SEC = 3 * 60;
    // Ambang batas offline: tidak ada handshake > 3 menit
    const WG_OFFLINE_THRESHOLD_SEC = WG_ACTIVE_THRESHOLD_SEC;

    for (const config of configs) {
      let peers: any[] = [];
      try {
        peers = await getWireguardPeers(config as any);
        if (!Array.isArray(peers)) continue;
      } catch (routerErr: any) {
        // Jika router MikroTik tidak merespon/offline, jangan hapus peer dari cache
        console.warn(`[VpnMonitor] Router MikroTik ${config.name} (${config.host}) unreachable:`, routerErr.message);
        continue;
      }

      for (const p of peers) {
        const peerId = p[".id"];
        const key = `${config.id}-${peerId}`;
        const name = p.comment || p.name || `WireGuard Peer #${peerId}`;
        const ip = (p["allowed-address"] || p["allowed-ips"] || "").replace("/32", "");
        const endpoint = p["endpoint-address"] ? `${p["endpoint-address"]}:${p["endpoint-port"] || ""}` : undefined;
        const handshakeSec = parseMikrotikDuration(p["last-handshake"]);

        const isCurrentlyActive = handshakeSec !== null && handshakeSec <= WG_ACTIVE_THRESHOLD_SEC;
        const isCurrentlyOffline = handshakeSec === null || handshakeSec > WG_OFFLINE_THRESHOLD_SEC;

        if (!state.initialized) {
          // Jika handshake sangat baru (<= 150 detik / 2.5 menit), berarti pengguna baru saja terhubung!
          // Kirim notifikasi online ke Telegram agar admin langsung menerima alert saat pengetesan
          if (isCurrentlyActive && handshakeSec !== null && handshakeSec <= 150) {
            // Biarkan jatuh ke blok Kasus 1 di bawah (ONLINE)
          } else {
            if (isCurrentlyActive) {
              state.wireguardPeers.set(key, {
                key,
                name,
                ip,
                routerName: `${config.name} (${config.host})`,
                endpoint,
                connectedSince: Date.now() - (handshakeSec || 0) * 1000,
                lastHandshakeSec: handshakeSec || 0,
              });
            }
            continue;
          }
        }

        const existing = state.wireguardPeers.get(key);

        // Kasus 1: Peer baru saja aktif (ONLINE)
        if (isCurrentlyActive && !existing) {
          state.wireguardPeers.set(key, {
            key,
            name,
            ip,
            routerName: `${config.name} (${config.host})`,
            endpoint,
            connectedSince: Date.now(),
            lastHandshakeSec: handshakeSec || 0,
          });

          console.log(`[VpnMonitor] WireGuard VPN Online: ${name} (${ip}) di ${config.name}`);
          sendVpnUserOnlineNotification({
            username: name,
            protocol: "wireguard",
            ip: ip || "Auto WireGuard IP",
            nasOrRouter: `${config.name} (${config.host})`,
            endpoint,
          }).catch((err) => console.error("[VpnMonitor] Gagal kirim notif WG online:", err.message));
        }

        // Kasus 2: Peer sebelumnya aktif, sekarang sudah idle/disconnect (OFFLINE)
        if (existing && isCurrentlyOffline) {
          const durationSeconds = Math.max(1, Math.floor((Date.now() - existing.connectedSince) / 1000));
          state.wireguardPeers.delete(key);

          console.log(`[VpnMonitor] WireGuard VPN Offline: ${existing.name} (${existing.ip})`);
          sendVpnUserOfflineNotification({
            username: existing.name,
            protocol: "wireguard",
            ip: existing.ip,
            durationSeconds,
            terminateCause: "Handshake Idle (>3 menit tanpa aktivitas)",
            nasOrRouter: existing.routerName,
          }).catch((err) => console.error("[VpnMonitor] Gagal kirim notif WG offline:", err.message));
        }
      }
    }
  } catch (err: any) {
    console.error("[VpnMonitor] Kesalahan saat memindai WireGuard peers:", err.message);
  }
}

/**
 * Satu siklus pengecekan VPN Online & Offline (RADIUS & WireGuard)
 */
export async function pollVpnEvents(): Promise<void> {
  await checkRadiusVpnSessions();
  await checkWireguardPeers();

  if (!state.initialized) {
    state.initialized = true;
    console.log(
      `[VpnMonitor] Inisialisasi selesai. Terpantau ${state.radiusSessions.size} sesi RADIUS dan ${state.wireguardPeers.size} peer WireGuard aktif.`
    );
  }
}

/**
 * Start the background VPN monitoring service (runs every 30 seconds)
 */
const VPN_POLL_INTERVAL_MS = 30 * 1000; // 30 detik

export function startVpnMonitorWorker(): void {
  const globalObj = globalThis as any;
  if (globalObj.__vpnMonitorWorkerStarted) {
    return;
  }
  globalObj.__vpnMonitorWorkerStarted = true;

  console.log("[VpnMonitor] Background worker pemantauan VPN Online/Offline diaktifkan (Interval: 30 Detik).");

  // Timer berulang setiap 30 detik
  globalObj.__vpnMonitorInterval = setInterval(async () => {
    try {
      await pollVpnEvents();
    } catch (err: any) {
      console.error("[VpnMonitor] Error pada siklus periodik:", err.message);
    }
  }, VPN_POLL_INTERVAL_MS);

  // Jalankan polling perdana setelah delay 2 detik dari inisialisasi
  setTimeout(async () => {
    try {
      await pollVpnEvents();
    } catch (err: any) {
      console.error("[VpnMonitor] Error pada inisialisasi perdana:", err.message);
    }
  }, 2000);
}

// Auto-start worker di background Node.js
if (typeof window === "undefined") {
  startVpnMonitorWorker();
}
