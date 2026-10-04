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

    return NextResponse.json({
      success: result.status === "online",
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Gagal melakukan probe SNMP", error: error.message },
      { status: 500 }
    );
  }
}
