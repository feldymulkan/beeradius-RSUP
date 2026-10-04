import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { mikrotikRequest } from "@/lib/mikrotik";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    const config = await prisma.mikrotikConfig.findUnique({
      where: { id: parseInt(id) }
    });

    if (!config) throw new Error("Konfigurasi Mikrotik tidak ditemukan");

    // Test request to /system/resource (lightweight)
    const resource = await mikrotikRequest(config as any, "/system/resource") as any;

    return NextResponse.json({ 
      success: true, 
      message: "Koneksi Berhasil!",
      data: {
        version: resource.version,
        boardName: resource["board-name"],
        uptime: resource.uptime
      }
    });
  } catch (error: any) {
    console.error("Mikrotik connection test failed:", error);
    return NextResponse.json({ 
      success: false, 
      message: `Koneksi Gagal: ${error.message}` 
    }, { status: 500 });
  }
}
