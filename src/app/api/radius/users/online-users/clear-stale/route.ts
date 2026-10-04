import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { toPrismaDate } from "@/lib/utils";
import { logAudit } from '@/lib/audit';

export async function POST() {
  try {
    const STALE_THRESHOLD_MS = 15 * 60 * 1000;
    const now = new Date();
    const staleDatePrisma = toPrismaDate(new Date(now.getTime() - STALE_THRESHOLD_MS));

    // Cari sesi yang tidak ada update lebih dari 15 menit dan acctstoptime null
    // Kita anggap acctupdatetime atau acctstarttime sebagai patokan
    const result = await prisma.radacct.updateMany({
      where: {
        acctstoptime: null,
        OR: [
          { acctupdatetime: { lt: staleDatePrisma } },
          { 
            AND: [
                { acctupdatetime: null },
                { acctstarttime: { lt: staleDatePrisma } }
            ]
          }
        ]
      },
      data: {
        acctstoptime: toPrismaDate(now),
        acctterminatecause: "Admin-Reset-Stale",
      }
    });

    if (result.count > 0) {
      await logAudit('CLEAR_STALE_SESSIONS', 'session', 'Multiple Sessions', { count: result.count });
    }

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
