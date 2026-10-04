import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { toPrismaDate } from "@/lib/utils";

export async function GET() {
  try {
    const STALE_THRESHOLD_MS = 15 * 60 * 1000;
    const now = new Date();
    const staleDate = new Date(now.getTime() - STALE_THRESHOLD_MS);
    // Normalisasi timezone agar konsisten dengan list API
    const staleDatePrisma = toPrismaDate(staleDate);

    const [hotspotOnlineCount, vpnOnlineCount, allOnlineSessions, activeSessionsCount] = await Promise.all([
      countOnlineByType('hotspot', staleDatePrisma),
      countOnlineByType('vpn', staleDatePrisma),
      prisma.radacct.count({ 
        where: { acctstoptime: null }
      }),
      prisma.radacct.count({
        where: {
          acctstoptime: null,
          OR: [
            { acctupdatetime: { gte: staleDatePrisma } },
            { 
              AND: [
                { acctupdatetime: null },
                { acctstarttime: { gte: staleDatePrisma } }
              ]
            }
          ]
        }
      })
    ]);

    return NextResponse.json({ 
      onlineCount: allOnlineSessions,
      activeCount: activeSessionsCount,
      staleCount: Math.max(0, allOnlineSessions - activeSessionsCount),
      hotspotCount: hotspotOnlineCount, // Sekarang ini hanya yang AKTIF
      vpnCount: vpnOnlineCount, // Sekarang ini hanya yang AKTIF
      othersCount: Math.max(0, activeSessionsCount - (hotspotOnlineCount + vpnOnlineCount))
    }, { status: 200 });
  } catch (error) {
    console.error("[API Count Online Error]:", error);
    return NextResponse.json(
      { message: "Gagal mengambil jumlah user online." },
      { status: 500 }
    );
  }
}

/**
 * Hitung jumlah sesi AKTIF berdasarkan tipe user.
 * Menggunakan GroupMetadata → radusergroup sebagai sumber kebenaran.
 */
async function countOnlineByType(type: string, staleDatePrisma: Date) {
  // 1. Ambil groupname dari GroupMetadata berdasarkan tipe
  const groupMetadata = await prisma.groupMetadata.findMany({
    where: { type },
    select: { groupname: true }
  });
  const groupNames = groupMetadata.map(g => g.groupname);

  if (groupNames.length === 0) return 0;

  // 2. Ambil username dari radusergroup yang masuk grup tersebut
  const userGroups = await prisma.radusergroup.findMany({
    where: { groupname: { in: groupNames } },
    select: { username: true }
  });
  const usernames = [...new Set(userGroups.map(ug => ug.username))];

  if (usernames.length === 0) return 0;

  // 3. Count sesi AKTIF di radacct
  return prisma.radacct.count({
    where: {
      acctstoptime: null,
      username: { in: usernames },
      nasporttype: type === 'vpn' ? 'Virtual' : { not: 'Virtual' },
      OR: [
        { acctupdatetime: { gte: staleDatePrisma } },
        { 
          AND: [
            { acctupdatetime: null },
            { acctstarttime: { gte: staleDatePrisma } }
          ]
        }
      ]
    },
  });
}

// Mencegah caching agar angka selalu realtime
export const dynamic = 'force-dynamic';