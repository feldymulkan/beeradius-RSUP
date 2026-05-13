import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const STALE_THRESHOLD_MS = 15 * 60 * 1000;
    const now = new Date();
    const staleDate = new Date(now.getTime() - STALE_THRESHOLD_MS);

    // Cari sesi yang tidak ada update lebih dari 15 menit dan acctstoptime null
    // Kita anggap acctupdatetime atau acctstarttime sebagai patokan
    const result = await prisma.radacct.updateMany({
      where: {
        acctstoptime: null,
        OR: [
          { acctupdatetime: { lt: staleDate } },
          { 
            AND: [
                { acctupdatetime: null },
                { acctstarttime: { lt: staleDate } }
            ]
          }
        ]
      },
      data: {
        acctstoptime: now,
        acctterminatecause: "Admin-Reset-Stale",
      }
    });

    return NextResponse.json({ 
      message: `Berhasil membersihkan ${result.count} sesi menggantung.`,
      count: result.count 
    }, { status: 200 });

  } catch (error) {
    console.error("[API Clear Stale Error]:", error);
    return NextResponse.json(
      { message: "Gagal membersihkan sesi menggantung.", error: String(error) },
      { status: 500 }
    );
  }
}
