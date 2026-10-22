import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { fixPrismaDate, toPrismaDate } from "@/lib/utils";
import { getWireguardPeers, parseMikrotikDuration } from "@/lib/mikrotik";

async function fetchActiveWireguardPeers(query: string = "", status: string = "active"): Promise<any[]> {
  try {
    const configs = await prisma.mikrotikConfig.findMany();
    if (!configs || configs.length === 0) return [];

    const activePeers: any[] = [];
    const q = query.toLowerCase().trim();

    // Ambang batas: 15 menit (900 detik), sejalan dengan standard stale session FreeRADIUS
    const ACTIVE_THRESHOLD_SEC = 15 * 60; // 15 menit

    await Promise.all(
      configs.map(async (config) => {
        try {
          const peers = await getWireguardPeers(config as any);
          if (!Array.isArray(peers)) return;

          for (const p of peers) {
            const rawHandshake = p["last-handshake"];
            const handshakeSec = parseMikrotikDuration(rawHandshake);

            // Jika belum pernah handshake sama sekali, peer belum aktif
            if (handshakeSec === null) continue;

            const isStale = handshakeSec > ACTIVE_THRESHOLD_SEC;
            const isRecent = handshakeSec <= 86400; // Handshake dalam 24 jam terakhir

            // Filter status
            if (status === "active" && isStale) continue;
            if (status === "stale" && (!isStale || !isRecent)) continue;
            if (status === "all" && !isRecent) continue;

            const name = p.comment || p.name || "WireGuard Client";
            const ip = p["allowed-address"] || p["allowed-ips"] || "";

            if (q && !name.toLowerCase().includes(q) && !ip.toLowerCase().includes(q)) {
              continue;
            }

            // Hitung estimasi acctstarttime dari selisih handshake terakhir
            const nowMs = Date.now();
            const startMs = nowMs - (handshakeSec || 0) * 1000;
            const startTimeIso = new Date(startMs).toISOString();

            activePeers.push({
              radacctid: `wg-${config.id}-${p[".id"]}`,
              username: name,
              framedipaddress: ip || "N/A",
              nasipaddress: `${config.name} (${config.host})`,
              acctstarttime: startTimeIso,
              acctupdatetime: new Date().toISOString(),
              isStale,
              lastLogout: null,
              protocol: "wireguard",
              endpoint: p["endpoint-address"] ? `${p["endpoint-address"]}:${p["endpoint-port"] || ""}` : null,
              lastHandshake: rawHandshake || `${handshakeSec}s lalu`,
              rx: p.rx || null,
              tx: p.tx || null,
              mikrotikId: config.id,
              mikrotikName: config.name,
              peerId: p[".id"],
            });
          }
        } catch (err: any) {
          console.warn(`[Online WireGuard] Router ${config.name} (${config.host}) tidak merespon:`, err.message);
        }
      })
    );

    return activePeers;
  } catch (err) {
    console.error("[Online WireGuard Error]:", err);
    return [];
  }
}

export async function GET(req: NextRequest) {
  try {
    // 1. Ambil Parameter
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('q') || "";
    const type = searchParams.get('type'); // hotspot or vpn
    const protocol = searchParams.get('protocol') || "all"; // all, radius, wireguard
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Validasi
    const safePage = page > 0 ? page : 1;
    const safeLimit = limit > 0 && limit <= 100 ? limit : 10;
    const skip = (safePage - 1) * safeLimit;

    // 2. Filter Kondisi RADIUS
    const whereCondition: any = {
      acctstoptime: null, // User yang sedang online
    };

    // Threshold untuk stale session (15 menit)
    const STALE_THRESHOLD_MS = 15 * 60 * 1000;
    const now = new Date();
    const staleDate = new Date(now.getTime() - STALE_THRESHOLD_MS);
    const staleDatePrisma = toPrismaDate(staleDate);

    const status = searchParams.get('status') || "all"; // active, stale, or all

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

    if (whereCondition.username) {
      staleWhereCondition.username = whereCondition.username;
    }
    if (whereCondition.nasporttype) {
      staleWhereCondition.nasporttype = whereCondition.nasporttype;
    }

    // Jika filter protocol adalah 'wireguard' saja, kita tidak perlu memuat data RADIUS dalam jumlah banyak
    const shouldFetchRadius = protocol !== "wireguard";
    const shouldFetchWireguard = type === "vpn" && protocol !== "radius";

    // 4. Ambil Data dari Database RADIUS & WireGuard
    const isVpnAll = type === "vpn" && protocol === "all";

    const [onlineUsers, totalCount, totalStaleCount, rawWgPeers] = await Promise.all([
      shouldFetchRadius
        ? prisma.radacct.findMany({
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
            // Untuk VPN 'all', ambil hingga 200 data agar penggabungan dengan WireGuard akurat
            skip: isVpnAll ? 0 : skip,
            take: isVpnAll ? 200 : safeLimit,
          })
        : Promise.resolve([]),
      shouldFetchRadius ? prisma.radacct.count({ where: whereCondition }) : Promise.resolve(0),
      shouldFetchRadius ? prisma.radacct.count({ where: staleWhereCondition }) : Promise.resolve(0),
      shouldFetchWireguard ? fetchActiveWireguardPeers(query, status) : Promise.resolve([]),
    ]);

    // Ambil Last Logout untuk masing-masing user RADIUS
    const usernames = onlineUsers.map(u => u.username);
    const lastLogouts = usernames.length > 0
      ? await prisma.radacct.groupBy({
          by: ['username'],
          where: {
            username: { in: usernames },
            acctstoptime: { not: null }
          },
          _max: {
            acctstoptime: true
          }
        })
      : [];

    const logoutMap = new Map(lastLogouts.map(l => [l.username, l._max.acctstoptime]));

    // Normalisasi user RADIUS
    const serializedRadiusUsers = onlineUsers.map((user) => {
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
        protocol: "radius" as const,
        lastLogout: fixedLastLogout ? fixedLastLogout.toISOString() : null,
      };
    });

    // Hitung total masing-masing
    const totalRadiusCount = totalCount;
    const totalWgCount = rawWgPeers.length;

    let finalUsers: any[] = [];
    let finalTotal = 0;

    if (protocol === "wireguard") {
      finalUsers = rawWgPeers.slice(skip, skip + safeLimit);
      finalTotal = totalWgCount;
    } else if (protocol === "radius" || type === "hotspot") {
      finalUsers = serializedRadiusUsers;
      finalTotal = totalRadiusCount;
    } else {
      // Protocol === "all" (Kombinasi RADIUS + WireGuard)
      const combined = [...serializedRadiusUsers, ...rawWgPeers];
      combined.sort((a, b) => {
        const timeA = a.acctstarttime ? new Date(a.acctstarttime).getTime() : 0;
        const timeB = b.acctstarttime ? new Date(b.acctstarttime).getTime() : 0;
        return timeB - timeA;
      });

      finalUsers = combined.slice(skip, skip + safeLimit);
      finalTotal = totalRadiusCount + totalWgCount;
    }

    const totalPages = Math.max(1, Math.ceil(finalTotal / safeLimit));

    return NextResponse.json({ 
      onlineUsers: finalUsers,
      total: finalTotal,
      totalPages,
      currentPage: safePage,
      limit: safeLimit,
      totalStaleCount,
      totalRadiusCount,
      totalWgCount,
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
