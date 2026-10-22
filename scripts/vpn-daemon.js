/**
 * scripts/vpn-daemon.js
 * Standalone background daemon untuk pemantauan VPN Online/Offline setiap 30 detik
 * 
 * Penggunaan via PM2 di server produksi:
 * pm2 start scripts/vpn-daemon.js --name "beeradius-vpn-worker"
 */

const port = process.env.PORT || 3000;
const cronSecret = process.env.CRON_SECRET || '';
const INTERVAL_MS = 30 * 1000; // 30 Detik

console.log(`[VpnDaemon] Worker pemantauan VPN Online/Offline aktif (Interval: 30 detik). Port Target: ${port}`);

async function pollOnce() {
  try {
    const headers = { 'Content-Type': 'application/json' };
    if (cronSecret) {
      headers['x-cron-secret'] = cronSecret;
    }

    const res = await fetch(`http://127.0.0.1:${port}/api/vpn/monitor/poll`, {
      method: 'POST',
      headers,
    });

    const data = await res.json();
    if (res.ok && data.success) {
      const time = new Date().toLocaleTimeString('id-ID');
      console.log(`[VpnDaemon ${time}] Selesai: ${data.status.radiusCount} RADIUS aktif | ${data.status.wireguardCount} WireGuard aktif.`);
    } else {
      console.warn(`[VpnDaemon Warning] Respon server:`, data.message || data.error);
    }
  } catch (err) {
    console.error(`[VpnDaemon Error] Gagal menghubungi Next.js server di port ${port}:`, err.message);
  }
}

// Polling pertama setelah jeda 3 detik startup
setTimeout(pollOnce, 3000);

// Timer berulang setiap 30 detik
setInterval(pollOnce, INTERVAL_MS);
