import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { updateRuijieWifi } from "@/lib/ruijie";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "superadmin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const ssidId = parseInt(id, 10);
    const body = await req.json();
    const { groupId, ssidName, password, vlanId } = body;

    if (!groupId || !ssidName) {
      return NextResponse.json({ message: "Group ID dan SSID Name harus diisi" }, { status: 400 });
    }

    await updateRuijieWifi({
      groupId: parseInt(groupId, 10),
      ssidId,
      ssidName,
      password,
      vlanId: vlanId ? parseInt(vlanId, 10) : undefined,
    });

    await logAudit("UPDATE_RUIJIE_WIFI", "wifi", ssidName, {
      ssidId,
      groupId,
      hasPassword: Boolean(password),
    });

    return NextResponse.json({ message: "Konfigurasi WiFi berhasil diperbarui di Ruijie Cloud" });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Gagal memperbarui WiFi di Ruijie Cloud", error: error.message },
      { status: 500 }
    );
  }
}
