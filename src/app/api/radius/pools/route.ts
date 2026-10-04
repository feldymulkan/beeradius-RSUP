import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { logAudit } from '@/lib/audit';

export async function GET() {
  try {
    const pools = await prisma.radiusPool.findMany({
      orderBy: { name: 'asc' }
    });
    return NextResponse.json({ pools });
  } catch (error: any) {
    return NextResponse.json({ message: 'Gagal mengambil data pool', error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, description } = await req.json();
    if (!name) return NextResponse.json({ message: 'Nama pool harus diisi' }, { status: 400 });

    const pool = await prisma.radiusPool.create({
      data: { name, description }
    });
    await logAudit('CREATE_POOL', 'pool', name, { description });
    return NextResponse.json({ pool, message: 'Pool berhasil dibuat' }, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ message: 'Nama pool sudah ada' }, { status: 409 });
    }
    return NextResponse.json({ message: 'Gagal membuat pool', error: error.message }, { status: 500 });
  }
}
