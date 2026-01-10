import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Menghitung jumlah sesi yang acctstoptime-nya NULL (sedang online)
    const onlineCount = await prisma.radacct.count({
      where: {
        acctstoptime: null,
      },
    });

    return NextResponse.json({ onlineCount }, { status: 200 });
  } catch (error) {
    console.error("[API Count Online Error]:", error);
    return NextResponse.json(
      { message: "Gagal mengambil jumlah user online." },
      { status: 500 }
    );
  }
}

// Mencegah caching agar angka selalu realtime
export const dynamic = 'force-dynamic';