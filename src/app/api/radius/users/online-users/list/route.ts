import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    
    // 1. Ambil Parameter (dengan default value)
    const query = searchParams.get('q') || "";
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10'); // Default 10 data per halaman

    // Debugging: Cek apakah request masuk dengan benar
    console.log(`[API Online] Request -> Page: ${page}, Limit: ${limit}, Search: "${query}"`);

    // 2. Hitung Offset (Skip)
    const skip = (page - 1) * limit;

    // 3. Susun Filter Pencarian
    const whereCondition: any = {
      acctstoptime: null, // Hanya yang online
    };

    if (query) {
      whereCondition.OR = [
        // Cari berdasarkan username
        { username: { contains: query } }, 
        // Cari berdasarkan IP Address
        { framedipaddress: { contains: query } },
      ];
    }

    // 4. Query Database (PENTING: ada skip dan take)
    const [onlineUsers, totalCount] = await Promise.all([
      prisma.radacct.findMany({
        where: whereCondition,
        select: {
          radacctid: true,
          username: true,
          framedipaddress: true,
          acctstarttime: true,
          nasipaddress: true,
        },
        orderBy: {
          acctstarttime: 'desc',
        },
        skip: skip,  // <--- INI KUNCINYA (Lewati data awal)
        take: limit, // <--- INI KUNCINYA (Ambil hanya 10)
      }),
      prisma.radacct.count({
        where: whereCondition,
      }),
    ]);

    // 5. Hitung Total Halaman
    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({ 
      onlineUsers, 
      total: totalCount,
      totalPages: totalPages,
      currentPage: page,
      limit: limit
    }, { status: 200 });

  } catch (error) {
    console.error("[API Error]:", error);
    return NextResponse.json(
      { message: "Server Error", error: String(error) },
      { status: 500 }
    );
  }
}

// Mencegah Next.js menyimpan cache data lama
export const dynamic = 'force-dynamic';