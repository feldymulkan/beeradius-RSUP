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
    const {
      ip,
      community = "public",
      snmpVersion = "2c",
      port = 161,
      snmpUser,
      snmpSecurityLevel = "authPriv",
      snmpAuthProtocol = "sha",
      snmpAuthPassword,
      snmpPrivProtocol = "aes",
      snmpPrivPassword,
      snmpContext,
    } = await req.json();

    if (!ip) {
      return NextResponse.json({ message: "IP Switch wajib diisi" }, { status: 400 });
    }

    const isV3 = snmpVersion === "3";
    const version: "1" | "2c" | "3" = snmpVersion === "1" ? "1" : isV3 ? "3" : "2c";

    const result = await probeSwitch({
      ip,
      community: community || "public",
      port: Number(port) || 161,
      version,
      timeout: 3000,
      retries: 1,
      ...(isV3
        ? {
            v3: {
              user: snmpUser || "public",
              level: snmpSecurityLevel,
              authProtocol: snmpAuthProtocol,
              authKey: snmpAuthPassword || "",
              privProtocol: snmpPrivProtocol,
              privKey: snmpPrivPassword || "",
              context: snmpContext || "",
            },
            context: snmpContext || "",
          }
        : {}),
    });

    let pingOk = false;
    let diagnosis = "";
    if (result.status === "online") {
      pingOk = true;
      diagnosis = isV3
        ? "Perangkat merespon SNMP v3 (USM) & Ping dengan baik."
        : "Perangkat merespon SNMP & Ping dengan baik.";
    } else {
      const { pingHost } = await import("@/lib/devicePolling");
      pingOk = await pingHost(ip, 1500);
      if (pingOk) {
        diagnosis = isV3
          ? "Perangkat merespon Ping (Host HIDUP), namun SNMP v3 tidak merespon (periksa Username USM, Password Auth/Priv, Port 161, atau firewall)."
          : "Perangkat merespon Ping (Host HIDUP), namun SNMP tidak merespon (periksa Community String, Port 161, atau firewall).";
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
