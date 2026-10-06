/**
 * scripts/poll-devices.js
 * Script CLI / cron pemantau status perangkat jaringan BeeRadius RSUD NTB
 * 
 * Penggunaan di Linux crontab:
 * * /5 * * * * node /path/to/beeradius/scripts/poll-devices.js >> /var/log/beeradius-poll.log 2>&1
 * Atau:
 * * /5 * * * * curl -s -X POST http://localhost:3000/api/network/switches/poll > /dev/null 2>&1
 */

const port = process.env.PORT || 3000;
const cronSecret = process.env.CRON_SECRET || '';

async function run() {
  const timestamp = new Date().toLocaleString('id-ID');
  console.log(`[${timestamp}] Menjalankan polling status perangkat jaringan...`);

  try {
    const headers = { 'Content-Type': 'application/json' };
    if (cronSecret) {
      headers['x-cron-secret'] = cronSecret;
    }

    const res = await fetch(`http://127.0.0.1:${port}/api/network/switches/poll`, {
      method: 'POST',
      headers,
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || `HTTP ${res.status}`);
    }

    console.log(`[Sukses] Total: ${data.data.total} | Online: ${data.data.online} | Offline SNMP: ${data.data.snmpOffline} | Offline Ping: ${data.data.offline} | Berubah: ${data.data.changed}`);
    for (const r of data.data.results) {
      let icon = '🔴';
      let label = 'OFFLINE PING (HOST DOWN)';
      if (r.newStatus === 'online') {
        icon = '🟢';
        label = 'ONLINE (SNMP & PING OK)';
      } else if (r.newStatus === 'snmp_offline') {
        icon = '🟡';
        label = 'OFFLINE SNMP (PING OK, SNMP DOWN)';
      }
      console.log(`  ${icon} [${r.deviceType.toUpperCase()}] ${r.name} (${r.ip}): ${label} [${r.methodUsed}] ${r.error ? `-> ${r.error}` : ''}`);
    }
  } catch (err) {
    console.error(`[Error] Gagal menjalankan polling:`, err.message);
    process.exit(1);
  }
}

run();
