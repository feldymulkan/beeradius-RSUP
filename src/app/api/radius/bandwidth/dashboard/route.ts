import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { serializeBigInt } from '@/lib/utils';

export async function GET() {
  try {
    // Query bandwidth per day for last 7 days using raw SQL
    const usage: any[] = await prisma.$queryRawUnsafe(`
      SELECT 
        DATE(acctstarttime) as date,
        SUM(acctinputoctets) as upload,
        SUM(acctoutputoctets) as download
      FROM radacct
      WHERE acctstarttime >= DATE_SUB(NOW(), INTERVAL 7 DAY)
      GROUP BY date
      ORDER BY date ASC
    `);

    return NextResponse.json(serializeBigInt(usage), { status: 200 });
  } catch (error) {
    console.error('[API Bandwidth Dashboard Error]:', error);
    return NextResponse.json({ message: 'Gagal memuat data bandwidth.' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
