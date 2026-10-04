import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { fixPrismaDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'superadmin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const admin = searchParams.get('admin');
    const action = searchParams.get('action');
    const q = searchParams.get('q');
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    const whereClause: any = {};

    if (admin) {
      whereClause.adminUser = admin;
    }

    if (action) {
      whereClause.action = action;
    }

    if (q) {
      whereClause.targetName = { contains: q };
    }

    if (from || to) {
      whereClause.timestamp = {};
      if (from) {
        whereClause.timestamp.gte = new Date(from);
      }
      if (to) {
        const toDate = new Date(to);
        toDate.setHours(23, 59, 59, 999);
        whereClause.timestamp.lte = toDate;
      }
    }

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where: whereClause,
        orderBy: {
          timestamp: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.auditLog.count({ where: whereClause }),
    ]);

    const serializedLogs = logs.map((log: any) => ({
      ...log,
      timestamp: fixPrismaDate(log.timestamp)?.toISOString() || null,
    }));

    return NextResponse.json({
      logs: serializedLogs,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error('Failed to fetch audit logs:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data audit log' },
      { status: 500 }
    );
  }
}
