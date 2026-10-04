"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { serializeBigInt } from "@/lib/utils";
import { unstable_cache } from "next/cache";

// Cache heavy queries for 15 minutes
const CACHE_TIME = 900; 

function getRangeDate(range: string) {
    const now = new Date();
    if (range === '24h') return new Date(now.getTime() - 24 * 60 * 60 * 1000);
    if (range === '7d') return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    if (range === '30d') return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    if (range === '90d') return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    if (range === '1y') return new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
    return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000); // default 30d
}

export async function getTopUsageReport(range: string = '30d') {
  const session = await getServerSession(authOptions);
  if (!session) return { error: "Unauthorized" };

  const fetcher = unstable_cache(
    async (r: string) => {
      const startDate = getRangeDate(r);
      const usage = await prisma.radacct.groupBy({
        by: ['username'],
        where: {
            acctstarttime: { gte: startDate }
        },
        _sum: {
          acctinputoctets: true,
          acctoutputoctets: true,
        },
        _count: {
          radacctid: true,
        },
        orderBy: {
          _sum: {
            acctoutputoctets: 'desc',
          }
        },
        take: 20,
      });
      return serializeBigInt(usage);
    },
    [`top-usage-report-${range}`],
    { revalidate: CACHE_TIME }
  );

  try {
    const data = await fetcher(range);
    return { success: true, data };
  } catch (error: any) {
    return { error: "Gagal memuat laporan: " + error.message };
  }
}

export async function getRecentLoginReport() {
  const session = await getServerSession(authOptions);
  if (!session) return { error: "Unauthorized" };

  try {
    const log = await prisma.radacct.findMany({
      orderBy: { acctstarttime: 'desc' },
      take: 50,
    });

    return { success: true, data: serializeBigInt(log) };
  } catch (error: any) {
    return { error: "Gagal memuat laporan login: " + error.message };
  }
}

export async function getNASActivityReport() {
  const session = await getServerSession(authOptions);
  if (!session) return { error: "Unauthorized" };

  const fetcher = unstable_cache(
    async () => {
      const activity = await prisma.radacct.groupBy({
        by: ['nasipaddress'],
        _count: {
          radacctid: true,
        },
        _sum: {
          acctsessiontime: true,
          acctinputoctets: true,
          acctoutputoctets: true,
        },
        orderBy: {
          _count: {
            radacctid: 'desc'
          }
        }
      });
      return serializeBigInt(activity);
    },
    ['nas-activity-report'],
    { revalidate: CACHE_TIME }
  );

  try {
    const data = await fetcher();
    return { success: true, data };
  } catch (error: any) {
    return { error: "Gagal memuat laporan NAS: " + error.message };
  }
}

export async function getUserDistributionReport() {
  const session = await getServerSession(authOptions);
  if (!session) return { error: "Unauthorized" };

  try {
    const distribution = await prisma.radusergroup.groupBy({
      by: ['groupname'],
      _count: {
        username: true,
      }
    });

    const mappedData = distribution.map(item => ({
      groupname: item.groupname,
      count: item._count.username
    }));

    return { success: true, data: mappedData };
  } catch (error: any) {
    return { error: "Gagal memuat distribusi user: " + error.message };
  }
}

export async function getBandwidthUsageReport(range: string = '30d') {
  const session = await getServerSession(authOptions);
  if (!session) return { error: "Unauthorized" };

  const fetcher = unstable_cache(
    async (r: string) => {
      let days = 30;
      let groupBy = "DATE(acctstarttime)";
      
      if (r === '7d') days = 7;
      else if (r === '24h') days = 1;
      else if (r === '90d') days = 90;
      else if (r === '1y') {
        days = 365;
        groupBy = "DATE_FORMAT(acctstarttime, '%Y-%m')";
      }

      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const usage: any[] = await prisma.$queryRawUnsafe(`
        SELECT 
          ${groupBy} as date,
          SUM(acctinputoctets) as upload,
          SUM(acctoutputoctets) as download
        FROM radacct
        WHERE acctstarttime >= ?
        GROUP BY date
        ORDER BY date ASC
      `, startDate);

      return serializeBigInt(usage);
    },
    [`bandwidth-report-${range}`],
    { revalidate: CACHE_TIME }
  );

  try {
    const data = await fetcher(range);
    return { success: true, data };
  } catch (error: any) {
    console.error("Bandwidth Report Error:", error);
    return { error: "Gagal memuat laporan bandwidth: " + error.message };
  }
}

export async function getYearlyBandwidthTotal() {
  const session = await getServerSession(authOptions);
  if (!session) return { error: "Unauthorized" };

  const fetcher = unstable_cache(
    async () => {
      const startOfYear = new Date();
      startOfYear.setMonth(0, 1);
      startOfYear.setHours(0, 0, 0, 0);

      const total: any[] = await prisma.$queryRaw`
        SELECT 
          SUM(acctinputoctets) as upload,
          SUM(acctoutputoctets) as download
        FROM radacct
        WHERE acctstarttime >= ${startOfYear}
      `;
      return serializeBigInt(total[0]);
    },
    ['bandwidth-yearly-total'],
    { revalidate: CACHE_TIME * 4 }
  );

  try {
    const data = await fetcher();
    return { success: true, data };
  } catch (error: any) {
    return { error: "Gagal memuat total tahunan: " + error.message };
  }
}

export async function getDailyActiveUsersReport(range: string = '30d') {
  const session = await getServerSession(authOptions);
  if (!session) return { error: "Unauthorized" };

  try {
    let days = 30;
    if (range === '7d') days = 7;
    else if (range === '24h') days = 1;
    else if (range === '90d') days = 90;
    else if (range === '1y') days = 365;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const activeUsers: any[] = await prisma.$queryRaw`
      SELECT 
        DATE(acctstarttime) as date,
        COUNT(DISTINCT username) as userCount
      FROM radacct
      WHERE acctstarttime >= ${startDate}
      GROUP BY DATE(acctstarttime)
      ORDER BY date ASC
    `;

    return { success: true, data: serializeBigInt(activeUsers) };
  } catch (error: any) {
    return { error: "Gagal memuat laporan pengguna aktif: " + error.message };
  }
}

export async function getAuthFailureReport() {
  const session = await getServerSession(authOptions);
  if (!session) return { error: "Unauthorized" };

  try {
    const failures = await prisma.radpostauth.findMany({
      where: {
        reply: { not: 'Access-Accept' }
      },
      orderBy: { authdate: 'desc' },
      take: 50,
    });

    return { success: true, data: failures };
  } catch (error: any) {
    return { error: "Gagal memuat laporan kegagalan login: " + error.message };
  }
}

export async function getTypeDistributionReport() {
  const session = await getServerSession(authOptions);
  if (!session) return { error: "Unauthorized" };

  try {
    const distribution = await prisma.userinfo.groupBy({
      by: ['type'],
      _count: {
        username: true,
      }
    });

    const mappedData = distribution.map(item => ({
      type: item.type,
      count: item._count.username
    }));

    return { success: true, data: mappedData };
  } catch (error: any) {
    return { error: "Gagal memuat distribusi tipe user: " + error.message };
  }
}

export async function getWireguardStatsReport() {
  const session = await getServerSession(authOptions);
  if (!session) return { error: "Unauthorized" };

  try {
    const peerCount = await prisma.wireguardPeer.count();
    const mkConfigCount = await prisma.mikrotikConfig.count();
    
    return { 
      success: true, 
      data: {
        totalPeers: peerCount,
        totalMikrotik: mkConfigCount
      } 
    };
  } catch (error: any) {
    return { error: "Gagal memuat statistik Wireguard: " + error.message };
  }
}
