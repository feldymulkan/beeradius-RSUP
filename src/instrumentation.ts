export async function register() {
  console.log('[Instrumentation] Menginisialisasi sistem BeeRadius (Runtime:', process.env.NEXT_RUNTIME || 'standalone/node', ')...');
  
  if (process.env.NEXT_RUNTIME === 'nodejs' || !process.env.NEXT_RUNTIME) {
    try {
      const { startDevicePollingWorker } = await import('@/lib/devicePolling');
      startDevicePollingWorker();
    } catch (err: any) {
      console.error('[Instrumentation] Gagal memulai Device Polling Worker:', err.message);
    }

    try {
      const { startVpnMonitorWorker } = await import('@/lib/vpnMonitor');
      startVpnMonitorWorker();
    } catch (err: any) {
      console.error('[Instrumentation] Gagal memulai VPN Monitor Worker:', err.message);
    }
  }
}
