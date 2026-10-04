import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { fixPrismaDate, toPrismaDate } from "@/lib/utils";

export async function GET(req: NextRequest) {
  try {
    // 1. Ambil Parameter
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('q') || "";
    const type = searchParams.get('type'); // hotspot or vpn
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

    // Threshold untuk stale session (15 menit)
    const STALE_THRESHOLD_MS = 15 * 60 * 1000;
    const now = new Date();
    const staleDate = new Date(now.getTime() - STALE_THRESHOLD_MS);
    const staleDatePrisma = toPrismaDate(staleDate);

    const status = searchParams.get('status'); // active, stale, or all

    if (status === 'active') {
      whereCondition.OR = [
        { acctupdatetime: { gte: staleDatePrisma } },
        { 
          AND: [
            { acctupdatetime: null },
            { acctstarttime: { gte: staleDatePrisma } }
          ]
        }
      ];
    } else if (status === 'stale') {
      whereCondition.AND = [
        {
          OR: [
            { acctupdatetime: { lt: staleDatePrisma } },
            { 
              AND: [
                { acctupdatetime: null },
                { acctstarttime: { lt: staleDatePrisma } }
              ]
            }
          ]
        }
      ];
    }

    if (type) {
      // Find groups of this type
      const groupMetadata = await prisma.groupMetadata.findMany({
        where: { type },
        select: { groupname: true }
      });
      const groupNames = groupMetadata.map(g => g.groupname);

      // Find users in these groups
      const userGroups = await prisma.radusergroup.findMany({
        where: { groupname: { in: groupNames } },
        select: { username: true }
      });
      const usernames = userGroups.map(ug => ug.username);

      whereCondition.username = { in: usernames };

      // Tambahkan filter session type agar tidak bercampur antara Hotspot & VPN
      if (type === 'vpn') {
        whereCondition.nasporttype = 'Virtual';
      } else if (type === 'hotspot') {
        whereCondition.nasporttype = { not: 'Virtual' };
      }
    }

    if (query) {
      const queryFilter = {
        OR: [
          { username: { contains: query } },
          { framedipaddress: { contains: query } },
        ]
      };
      
      if (whereCondition.AND) {
        whereCondition.AND.push(queryFilter);
      } else if (whereCondition.username || whereCondition.OR) {
        // If we already have complex conditions, use AND to combine
        const existing = { ...whereCondition };
        delete existing.acctstoptime;
        whereCondition.acctstoptime = null;
        whereCondition.AND = [
          existing,
          queryFilter
        ];
      } else {
        whereCondition.OR = queryFilter.OR;
      }
    }

    // 3. Buat kondisi untuk menghitung total sesi gantung (stale) secara keseluruhan
    const staleWhereCondition: any = {
      acctstoptime: null,
      AND: [
        {
          OR: [
            { acctupdatetime: { lt: staleDatePrisma } },
            { 
              AND: [
                { acctupdatetime: null },
                { acctstarttime: { lt: staleDatePrisma } }
              ]
            }
          ]
        }
      ]
    };

    // Terapkan filter type yang sama ke stale count
    if (whereCondition.username) {
      staleWhereCondition.username = whereCondition.username;
    }
    if (whereCondition.nasporttype) {
      staleWhereCondition.nasporttype = whereCondition.nasporttype;
    }

    // 4. Ambil Data dari Database
    const [onlineUsers, totalCount, totalStaleCount] = await Promise.all([
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
      prisma.radacct.count({ where: staleWhereCondition }),
    ]);

    // Ambil Last Logout untuk masing-masing user
    const usernames = onlineUsers.map(u => u.username);
    const lastLogouts = await prisma.radacct.groupBy({
      by: ['username'],
      where: {
        username: { in: usernames },
        acctstoptime: { not: null }
      },
      _max: {
        acctstoptime: true
      }
    });

    const logoutMap = new Map(lastLogouts.map(l => [l.username, l._max.acctstoptime]));

    // ============================================================
    // PERBAIKAN UTAMA: Normalisasi timezone & deteksi stale
    // ============================================================
    const serializedUsers = onlineUsers.map((user) => {
      const fixedStartTime = fixPrismaDate(user.acctstarttime);
      const fixedUpdateTime = fixPrismaDate(user.acctupdatetime);
      const fixedLastLogout = fixPrismaDate(logoutMap.get(user.username) || null);

      const lastUpdate = fixedUpdateTime || fixedStartTime || now;
      const isStale = (now.getTime() - lastUpdate.getTime()) > STALE_THRESHOLD_MS;

      return {
        ...user,
        acctstarttime: fixedStartTime ? fixedStartTime.toISOString() : null,
        acctupdatetime: fixedUpdateTime ? fixedUpdateTime.toISOString() : null,
        radacctid: user.radacctid.toString(),
        isStale,
        lastLogout: fixedLastLogout ? fixedLastLogout.toISOString() : null
      };
    });
    // ============================================================

    const totalPages = Math.ceil(totalCount / safeLimit);

    return NextResponse.json({ 
      onlineUsers: serializedUsers,
      total: totalCount,
      totalPages,
      currentPage: safePage,
      limit: safeLimit,
      totalStaleCount,
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
