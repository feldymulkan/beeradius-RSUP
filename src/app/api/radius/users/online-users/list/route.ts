import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    // 1. Ambil Parameter dari URL
    const searchParams = req.nextUrl.searchParams;
    
    const query = searchParams.get('q') || ""; // Kata kunci pencarian
    const page = parseInt(searchParams.get('page') || '1'); // Halaman ke berapa (Default 1)
    const limit = parseInt(searchParams.get('limit') || '10'); // Data per halaman (Default 10)

    // Validasi agar tidak minus
    const safePage = page > 0 ? page : 1;
    const safeLimit = limit > 0 && limit <= 100 ? limit : 10; // Max limit 100 utk keamanan

    // 2. Hitung Skip (Offset)
    // Rumus: (Halaman - 1) * Jumlah Data Per Halaman
    const skip = (safePage - 1) * safeLimit;

    // 3. Susun Filter (WHERE clause)
    const whereCondition: any = {
      acctstoptime: null, // Wajib: Hanya user yang sedang online
    };

    // Jika ada pencarian, tambahkan logika OR
    if (query) {
      whereCondition.OR = [
        {
          username: {
            contains: query,
            // mode: 'insensitive', // Aktifkan baris ini jika menggunakan PostgreSQL
          },
        },
        {
          framedipaddress: {
            contains: query,
          },
        },
      ];
    }

    // 4. Eksekusi Database (Query Data & Hitung Total secara paralel)
    const [onlineUsers, totalCount] = await Promise.all([
      // A. Ambil Data User (Dibatasi limit)
      prisma.radacct.findMany({
        where: whereCondition,
        select: {
          radacctid: true,
          username: true,
          framedipaddress: true, // IP Address User
          nasipaddress: true,    // IP Router
          acctstarttime: true,   // Waktu Login
        },
        orderBy: {
          acctstarttime: 'desc', // User yang baru login paling atas
        },
        skip: skip,      // <--- INI KUNCI PAGINASI
        take: safeLimit, // <--- INI KUNCI BATAS JUMLAH
      }),

      // B. Hitung Total Data (Sesuai filter pencarian)
      prisma.radacct.count({
        where: whereCondition,
      }),
    ]);

    // 5. Hitung Total Halaman
    const totalPages = Math.ceil(totalCount / safeLimit);

    // 6. Return Response JSON
    return NextResponse.json({ 
      onlineUsers,      // Array data (maksimal 10 biji)
      total: totalCount, // Total seluruh data (misal 500)
      totalPages,       // Total halaman (misal 50)
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

// Wajib: Mencegah caching agar data realtime & paginasi jalan
export const dynamic = 'force-dynamic';