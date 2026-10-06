import { exec } from 'child_process';
import { promisify } from 'util';
import prisma from '@/lib/prisma';
import { probeSwitch } from '@/lib/snmp';
import { revalidatePath } from 'next/cache';

const execAsync = promisify(exec);

export type DeviceNetworkStatus = 'online' | 'snmp_offline' | 'offline';

export interface PollResult {
  id: number;
  name: string;
  ip: string;
  deviceType: string;
  previousStatus: string;
  newStatus: DeviceNetworkStatus;
  snmpStatus: 'up' | 'down' | 'unsupported';
  pingStatus: 'up' | 'down';
  uptime?: string;
  lastPolled: Date;
  methodUsed: string;
  error?: string;
}

export interface PollSummary {
  total: number;
  online: number;
  snmpOffline: number;
  offline: number;
  changed: number;
  polledAt: string;
  results: PollResult[];
}

/**
 * Utilitas ping cross-platform (Windows & Linux) yang aman dari command injection
 */
export async function pingHost(ip: string, timeoutMs = 2000): Promise<boolean> {
  // Validasi format IP / Hostname untuk mencegah injeksi perintah shell
  const trimmed = ip.trim();
  const isValidIpv4 = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/.test(trimmed);
  const isValidHost = /^[a-zA-Z0-9.-]+$/.test(trimmed);

  if (!isValidIpv4 && !isValidHost) {
    return false;
  }

  const isWindows = process.platform === 'win32';
  const timeoutSec = Math.max(1, Math.round(timeoutMs / 1000));
  const cmd = isWindows
    ? `ping -n 1 -w ${timeoutMs} ${trimmed}`
    : `ping -c 1 -W ${timeoutSec} ${trimmed}`;

  try {
    const { stdout } = await execAsync(cmd, { timeout: timeoutMs + 1000 });
    if (isWindows) {
      return (
        stdout.includes('TTL=') ||
        (stdout.includes('Reply from') && !stdout.includes('Destination host unreachable'))
      );
    } else {
      return (
        stdout.includes('1 packets transmitted, 1 received') ||
        stdout.includes('1 packets transmitted, 1 packets received') ||
        stdout.includes('bytes from')
      );
    }
  } catch {
    return false;
  }
}

/**
 * Polling satu perangkat switch/router/AP/server
 * Membedakan dengan presisi:
 * 1. online: SNMP & Ping berfungsi normal
 * 2. snmp_offline: ICMP Ping hidup (host UP), tapi SNMP agen tidak merespon / timeout
 * 3. offline: Host Down (Ping & SNMP timeout / unreachable)
 */
export async function pollSingleDevice(sw: any): Promise<PollResult> {
  const connMethod = sw.connMethod || 'snmp';
  let finalStatus: DeviceNetworkStatus = 'offline';
  let snmpStatus: 'up' | 'down' | 'unsupported' = 'unsupported';
  let pingStatus: 'up' | 'down' = 'down';
  let uptime = sw.uptime || '-';
  let sysDescr = sw.sysDescr || '';
  let brand = sw.brand || 'Unknown';
  let model = sw.model || 'Device';
  let portsJson = sw.ports;
  let vlansJson = sw.vlans;
  let methodUsed = connMethod;
  let errorMsg: string | undefined;

  if (connMethod === 'snmp') {
    // [Langkah 1] Probe SNMP
    try {
      const probeRes = await probeSwitch({
        ip: sw.ip,
        community: sw.community || 'public',
        port: sw.port || 161,
        version: sw.snmpVersion === '1' ? '1' : '2c',
        timeout: 2500,
        retries: 1,
      });

      if (probeRes.status === 'online') {
        snmpStatus = 'up';
        pingStatus = 'up';
        finalStatus = 'online';
        uptime = probeRes.uptime || uptime;
        sysDescr = probeRes.sysDescr || sysDescr;
        if (probeRes.brand !== 'Unknown') brand = probeRes.brand;
        if (probeRes.model !== 'Unknown') model = probeRes.model;
        if (probeRes.ports && probeRes.ports.length > 0) {
          portsJson = JSON.stringify(probeRes.ports);
        }
        if (probeRes.vlans && probeRes.vlans.length > 0) {
          vlansJson = JSON.stringify(probeRes.vlans);
        }
      } else {
        snmpStatus = 'down';
        errorMsg = probeRes.error || 'SNMP timeout';
      }
    } catch (err: any) {
      snmpStatus = 'down';
      errorMsg = err.message || 'SNMP error';
    }

    // [Langkah 2] Jika SNMP gagal, cek ICMP Ping untuk membedakan Offline SNMP vs Offline Ping
    if (snmpStatus === 'down') {
      const pingOk = await pingHost(sw.ip, 1500);
      if (pingOk) {
        pingStatus = 'up';
        finalStatus = 'snmp_offline'; // Host menyala tapi SNMP tidak merespon
        methodUsed = 'ping-only';
        errorMsg = 'SNMP tidak merespon (Host UP via Ping, SNMP timeout/port 161 tertutup)';
      } else {
        pingStatus = 'down';
        finalStatus = 'offline'; // Host mati total
        methodUsed = 'failed';
        errorMsg = 'Host unreachable (Ping & SNMP timeout)';
      }
    }
  } else {
    // connMethod: ping, api, atau manual
    snmpStatus = 'unsupported';
    const pingOk = await pingHost(sw.ip, 2000);
    if (pingOk) {
      pingStatus = 'up';
      finalStatus = 'online';
      methodUsed = 'ping';
    } else {
      pingStatus = 'down';
      finalStatus = 'offline';
      methodUsed = 'failed';
      errorMsg = 'Ping request timeout (Host unreachable)';
    }
  }

  const now = new Date();

  // Simpan status baru ke tabel SwitchDevice
  await prisma.switchDevice.update({
    where: { id: sw.id },
    data: {
      status: finalStatus,
      uptime: finalStatus === 'online' ? uptime : sw.uptime,
      sysDescr,
      brand,
      model,
      ports: portsJson,
      vlans: vlansJson,
      lastPolled: now,
    },
  });

  return {
    id: sw.id,
    name: sw.name,
    ip: sw.ip,
    deviceType: sw.deviceType || 'switch',
    previousStatus: sw.status,
    newStatus: finalStatus,
    snmpStatus,
    pingStatus,
    uptime,
    lastPolled: now,
    methodUsed,
    error: finalStatus === 'online' ? undefined : errorMsg,
  };
}

/**
 * Polling seluruh perangkat jaringan terdaftar
 */
export async function pollAllDevices(): Promise<PollSummary> {
  const switches = await prisma.switchDevice.findMany();
  const polledAt = new Date().toISOString();

  if (switches.length === 0) {
    return { total: 0, online: 0, snmpOffline: 0, offline: 0, changed: 0, polledAt, results: [] };
  }

  console.log(`[DevicePoller] Memulai pemindaian status untuk ${switches.length} perangkat jaringan...`);

  // Eksekusi paralel dengan batasan konkurensi (batch 5 perangkat sekaligus)
  const results: PollResult[] = [];
  const chunkSize = 5;
  for (let i = 0; i < switches.length; i += chunkSize) {
    const chunk = switches.slice(i, i + chunkSize);
    const chunkResults = await Promise.all(chunk.map((sw) => pollSingleDevice(sw)));
    results.push(...chunkResults);
  }

  let onlineCount = 0;
  let snmpOfflineCount = 0;
  let offlineCount = 0;
  let changedCount = 0;

  for (const r of results) {
    if (r.newStatus === 'online') onlineCount++;
    else if (r.newStatus === 'snmp_offline') snmpOfflineCount++;
    else offlineCount++;

    if (r.previousStatus !== r.newStatus) changedCount++;
  }

  // Sinkronkan status ke peta topologi aktif jika ada node yang cocok
  try {
    const activeTopo = await prisma.networkTopology.findFirst({
      where: { isDefault: true },
      orderBy: { updatedAt: 'desc' },
    });

    if (activeTopo && activeTopo.nodes) {
      const nodes = JSON.parse(activeTopo.nodes || '[]');
      let topoUpdated = false;

      for (const node of nodes) {
        const matched = results.find(
          (r) => r.id === node.switchDeviceId || (node.ip && node.ip === r.ip)
        );
        if (matched) {
          const topoStatus: 'online' | 'warning' | 'offline' =
            matched.newStatus === 'online'
              ? 'online'
              : matched.newStatus === 'snmp_offline'
              ? 'warning'
              : 'offline';

          if (node.status !== topoStatus) {
            node.status = topoStatus;
            node.lastPolled = matched.lastPolled.toISOString();
            topoUpdated = true;
          }
        }
      }

      if (topoUpdated) {
        await prisma.networkTopology.update({
          where: { id: activeTopo.id },
          data: { nodes: JSON.stringify(nodes) },
        });
        revalidatePath('/topology');
      }
    }
  } catch (err) {
    console.error('[DevicePoller] Gagal menyinkronkan status ke peta topologi:', err);
  }

  revalidatePath('/switches');

  console.log(
    `[DevicePoller] Selesai: ${onlineCount} online, ${snmpOfflineCount} SNMP offline, ${offlineCount} offline, ${changedCount} status berubah.`
  );

  return {
    total: switches.length,
    online: onlineCount,
    snmpOffline: snmpOfflineCount,
    offline: offlineCount,
    changed: changedCount,
    polledAt,
    results,
  };
}

/**
 * Background Daemon Worker yang berjalan setiap 5 menit di lingkungan Next.js Node.js
 */
const POLLING_INTERVAL_MS = 5 * 60 * 1000; // 5 Menit

export function startDevicePollingWorker() {
  const globalObj = globalThis as any;
  if (globalObj.__devicePollingWorkerStarted) {
    return;
  }
  globalObj.__devicePollingWorkerStarted = true;

  console.log('[DevicePoller] Worker polling status perangkat jaringan diaktifkan (Interval: 5 Menit).');

  // Timer berulang setiap 5 menit
  globalObj.__devicePollingInterval = setInterval(async () => {
    try {
      await pollAllDevices();
    } catch (err) {
      console.error('[DevicePoller] Kesalahan saat polling 5-menit berkala:', err);
    }
  }, POLLING_INTERVAL_MS);

  // Polling perdana setelah delay 10 detik dari waktu inisialisasi server
  setTimeout(async () => {
    try {
      await pollAllDevices();
    } catch (err) {
      console.error('[DevicePoller] Kesalahan saat polling perdana startup:', err);
    }
  }, 10000);
}
