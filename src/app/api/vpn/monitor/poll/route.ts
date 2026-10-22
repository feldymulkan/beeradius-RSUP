import { NextResponse } from "next/server";
import { pollVpnEvents, startVpnMonitorWorker, getVpnMonitorStatus } from "@/lib/vpnMonitor";

export async function GET() {
  try {
    startVpnMonitorWorker();
    const status = getVpnMonitorStatus();
    return NextResponse.json({ success: true, status });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // Optional cron secret protection if header exists
    const cronSecret = req.headers.get("x-cron-secret");
    if (process.env.CRON_SECRET && cronSecret && cronSecret !== process.env.CRON_SECRET) {
      return NextResponse.json({ message: "Unauthorized cron secret" }, { status: 401 });
    }

    startVpnMonitorWorker();
    await pollVpnEvents();
    const status = getVpnMonitorStatus();

    return NextResponse.json({
      success: true,
      message: "Pemindaian sesi VPN berhasil dieksekusi.",
      status,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
