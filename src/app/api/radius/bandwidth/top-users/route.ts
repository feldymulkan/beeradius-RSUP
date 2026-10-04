import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { serializeBigInt } from '@/lib/utils';

export async function GET() {
  try {
    const topUsers: any[] = await prisma.$queryRawUnsafe(`
      SELECT 
        r.username,
        u.fullName,
        u.type,
        SUM(r.acctinputoctets) as upload,
        SUM(r.acctoutputoctets) as download,
        COUNT(*) as sessions
      FROM radacct r
      LEFT JOIN userinfo u ON r.username = u.username
      WHERE r.acctstarttime >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
      GROUP BY r.username, u.fullName, u.type
      ORDER BY download DESC
      LIMIT 10
    `);

    return NextResponse.json(serializeBigInt(topUsers), { status: 200 });
  } catch (error) {
    console.error('[API Top Bandwidth Users Error]:', error);
    return NextResponse.json({ message: 'Gagal memuat data top users.' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
