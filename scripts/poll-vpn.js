/**
 * scripts/poll-vpn.js
 * Script CLI / cron pemantau sesi VPN (FreeRADIUS & WireGuard) BeeRadius
 * 
 * Penggunaan di Linux crontab:
 * * * * * * node /path/to/beeradius/scripts/poll-vpn.js >> /var/log/beeradius-vpn.log 2>&1
 */

const port = process.env.PORT || 3000;
const cronSecret = process.env.CRON_SECRET || '';

async function run() {
  const timestamp = new Date().toLocaleString('id-ID');
  console.log(`[${timestamp}] Menjalankan polling pemantauan VPN Online/Offline...`);

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
    if (!res.ok || !data.success) {
      throw new Error(data.message || data.error || `HTTP ${res.status}`);
    }

    console.log(`[Sukses] Terpantau: ${data.status.radiusCount} RADIUS aktif | ${data.status.wireguardCount} WireGuard aktif.`);
  } catch (err) {
    console.error(`[Error] Gagal menjalankan polling VPN:`, err.message);
  }
}

run();
