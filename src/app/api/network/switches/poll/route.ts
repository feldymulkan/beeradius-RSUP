import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { pollAllDevices } from "@/lib/devicePolling";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const cronSecret = req.headers.get("x-cron-secret");
  const isAuthorizedCron = Boolean(process.env.CRON_SECRET && cronSecret === process.env.CRON_SECRET);
  const host = req.headers.get("host") || "";
  const isLocalhost = host.startsWith("localhost:") || host.startsWith("127.0.0.1:");

  if (!session && !isAuthorizedCron && !isLocalhost) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const summary = await pollAllDevices();
    return NextResponse.json({
      success: true,
      message: `Polling selesai: ${summary.online} Online, ${summary.snmpOffline} Offline SNMP, ${summary.offline} Offline Ping (${summary.changed} status berubah)`,
      data: summary,
    });
  } catch (error: any) {
    console.error("Error executing device polling API:", error);
    return NextResponse.json(
      { message: "Gagal melakukan polling status perangkat", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  return POST(req);
}
