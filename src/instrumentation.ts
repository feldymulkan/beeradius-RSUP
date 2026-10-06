export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { startDevicePollingWorker } = await import('@/lib/devicePolling');
    startDevicePollingWorker();
  }
}
