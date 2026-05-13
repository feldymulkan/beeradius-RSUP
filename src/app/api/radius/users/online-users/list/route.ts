import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    // 1. Ambil Parameter
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('q') || "";
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Validasi
    const safePage = page > 0 ? page : 1;
    const safeLimit = limit > 0 && limit <= 100 ? limit : 10;
    const skip = (safePage - 1) * safeLimit;

    // 2. Filter Kondisi
    const whereCondition: any = {
      acctstoptime: null, // User yang sedang online
    };

    if (query) {
      whereCondition.OR = [
        { username: { contains: query } },
        { framedipaddress: { contains: query } },
      ];
    }

    // 3. Ambil Data dari Database
    const [onlineUsers, totalCount] = await Promise.all([
      prisma.radacct.findMany({
        where: whereCondition,
        select: {
          radacctid: true, 
          username: true,
          framedipaddress: true,
          nasipaddress: true,
          acctstarttime: true,
          acctupdatetime: true,
        },
        orderBy: { acctstarttime: 'desc' },
        skip: skip,
        take: safeLimit,
      }),
      prisma.radacct.count({ where: whereCondition }),
    ]);

    // Threshold untuk stale session (15 menit)
    const STALE_THRESHOLD_MS = 15 * 60 * 1000;
    const now = new Date();

    // ============================================================
    // PERBAIKAN UTAMA: Mengubah BigInt menjadi String & Deteksi Stale
    // ============================================================
    const serializedUsers = onlineUsers.map((user) => {
      const lastUpdate = user.acctupdatetime ? new Date(user.acctupdatetime) : (user.acctstarttime ? new Date(user.acctstarttime) : now);
      const isStale = (now.getTime() - lastUpdate.getTime()) > STALE_THRESHOLD_MS;

      return {
        ...user,
        // Convert BigInt ke String agar JSON tidak error
        radacctid: user.radacctid.toString(),
        isStale,
      };
    });
    // ============================================================

    const totalPages = Math.ceil(totalCount / safeLimit);

    return NextResponse.json({ 
      onlineUsers: serializedUsers,
      total: totalCount,
      totalPages,
      currentPage: safePage,
      limit: safeLimit
    }, { status: 200 });

  } catch (error) {
    console.error("[API List Online Error]:", error);
    return NextResponse.json(
      { message: "Gagal mengambil daftar user.", error: String(error) },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
