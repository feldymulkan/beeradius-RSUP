"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { serializeBigInt } from "@/lib/utils";

export async function getTopUsageReport() {
  const session = await getServerSession(authOptions);
  if (!session) return { error: "Unauthorized" };

  try {
    // Group by username and sum input/output octets
    // Prisma doesn't support sum on BigInt directly in some versions or needs special handling
    // We can use raw query for better control or prisma.groupBy if supported
    
    const usage = await prisma.radacct.groupBy({
      by: ['username'],
      _sum: {
        acctinputoctets: true,
        acctoutputoctets: true,
      },
      _count: {
        radacctid: true,
      },
      orderBy: {
        _sum: {
          acctoutputoctets: 'desc', // Urutkan berdasarkan Download terbanyak
        }
      },
      take: 20,
    });

    return { success: true, data: serializeBigInt(usage) };
  } catch (error: any) {
    console.error("Report Error:", error);
    return { error: "Gagal memuat laporan: " + error.message };
  }
}
