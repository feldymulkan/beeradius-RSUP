import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { logAudit } from '@/lib/audit';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "superadmin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { ssid, password } = await req.json();

    if (!ssid || !password) {
      return NextResponse.json({ message: "SSID dan Password harus diisi" }, { status: 400 });
    }

    const wifiId = parseInt(id);

    // Check if SSID already used by another wifi record
    const existingWifi = await prisma.wifi.findFirst({
      where: {
        ssid,
        id: { not: wifiId },
      },
    });

    if (existingWifi) {
      return NextResponse.json({ message: "SSID sudah terdaftar pada Wifi lain" }, { status: 400 });
    }

    await prisma.wifi.update({
      where: { id: wifiId },
      data: {
        ssid,
        password,
      },
    });

    await logAudit('UPDATE_WIFI', 'wifi', ssid, { id: wifiId });
    return NextResponse.json({ message: "Wifi berhasil diperbarui" });
  } catch (error: any) {
    return NextResponse.json({ message: "Gagal memperbarui wifi", error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "superadmin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const wifiId = parseInt(id);

    const deletedWifi = await prisma.wifi.delete({
      where: { id: wifiId },
    });

    await logAudit('DELETE_WIFI', 'wifi', deletedWifi.ssid, { id: wifiId });
    return NextResponse.json({ message: "Wifi berhasil dihapus" });
  } catch (error: any) {
    return NextResponse.json({ message: "Gagal menghapus wifi", error: error.message }, { status: 500 });
  }
}
