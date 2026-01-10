import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    
    // 1. Ambil parameter dari URL
    const query = searchParams.get('q') || "";
    const page = parseInt(searchParams.get('page') || '1'); // Default hal 1
    const limit = parseInt(searchParams.get('limit') || '10'); // Default 10 per halaman

    // Hitung offset (berapa data yang harus dilewati)
    const skip = (page - 1) * limit;

    // 2. Susun Filter (Where Condition)
    const whereCondition: any = {
      acctstoptime: null, // Hanya user yang sedang online
    };

    if (query) {
      whereCondition.OR = [
        { username: { contains: query } }, // Hapus mode: 'insensitive' jika error di MySQL
        { framedipaddress: { contains: query } },
      ];
    }

    // 3. Ambil Data dengan Pagination
    const onlineUsers = await prisma.radacct.findMany({
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
      skip: skip,      // <--- Lewati data sebelumnya
      take: limit,     // <--- Ambil sejumlah limit
    });

    // 4. Hitung Total Data (untuk navigasi halaman)
    const totalCount = await prisma.radacct.count({
      where: whereCondition,
    });

    // Hitung total halaman
    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({ 
      onlineUsers, 
      total: totalCount,
      totalPages: totalPages,
      currentPage: page
    }, { status: 200 });

  } catch (error) {
    console.error("[API Online Users Error]:", error);
    return NextResponse.json(
      { message: "Gagal mengambil data pengguna online." },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';