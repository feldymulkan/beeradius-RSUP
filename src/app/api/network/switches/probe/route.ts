import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { probeSwitch } from "@/lib/snmp";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { ip, community = "public", snmpVersion = "2c", port = 161 } = await req.json();

    if (!ip) {
      return NextResponse.json({ message: "IP Switch wajib diisi" }, { status: 400 });
    }

    const result = await probeSwitch({
      ip,
      community: community || "public",
      port: Number(port) || 161,
      version: snmpVersion === "1" ? "1" : "2c",
      timeout: 3000,
      retries: 1,
    });

    let pingOk = false;
    let diagnosis = "";
    if (result.status === "online") {
      pingOk = true;
      diagnosis = "Perangkat merespon SNMP & Ping dengan baik.";
    } else {
      const { pingHost } = await import("@/lib/devicePolling");
      pingOk = await pingHost(ip, 1500);
      if (pingOk) {
        diagnosis = "Perangkat merespon Ping (Host HIDUP), namun SNMP tidak merespon (periksa Community String, Port 161, atau firewall).";
      } else {
        diagnosis = "Host tidak dapat dijangkau (Ping & SNMP keduanya timeout / mati).";
      }
    }

    return NextResponse.json({
      success: result.status === "online",
      data: {
        ...result,
        pingOk,
        diagnosis,
        detailedStatus: result.status === "online" ? "online" : pingOk ? "snmp_offline" : "offline",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Gagal melakukan probe SNMP", error: error.message },
      { status: 500 }
    );
  }
}
