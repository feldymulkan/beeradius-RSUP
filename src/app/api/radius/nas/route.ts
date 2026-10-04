import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { logAudit } from '@/lib/audit';

export async function GET() {
  try {
    const nas = await prisma.nas.findMany({
      orderBy: { nasname: 'asc' }
    });
    return NextResponse.json({ nas });
  } catch (error: any) {
    return NextResponse.json({ message: 'Gagal mengambil data NAS', error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nasname, shortname, type, secret, description } = body;

    if (!nasname || !secret) {
      return NextResponse.json({ message: 'IP/Host NAS dan Secret harus diisi' }, { status: 400 });
    }

    const nas = await prisma.nas.create({
      data: {
        nasname,
        shortname,
        type: type || 'other',
        secret,
        description: description || 'RADIUS Client'
      }
    });
    await logAudit('CREATE_NAS', 'nas', nasname, { shortname, type });
    return NextResponse.json({ nas, message: 'NAS berhasil ditambahkan' }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Gagal menambahkan NAS', error: error.message }, { status: 500 });
  }
}
