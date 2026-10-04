import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { logAudit } from '@/lib/audit';

// Utility to convert IP string to number
function ipToLong(ip: string) {
  return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
}

// Utility to convert number to IP string
function longToIp(long: number) {
  return [
    (long >>> 24) & 0xff,
    (long >>> 16) & 0xff,
    (long >>> 8) & 0xff,
    long & 0xff
  ].join('.');
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: name } = await params;
    const { startIp, endIp } = await req.json();

    if (!startIp || !endIp) {
      return NextResponse.json({ message: 'IP Awal dan IP Akhir harus diisi' }, { status: 400 });
    }

    const start = ipToLong(startIp);
    const end = ipToLong(endIp);

    if (start > end) {
      return NextResponse.json({ message: 'IP Awal tidak boleh lebih besar dari IP Akhir' }, { status: 400 });
    }

    if (end - start > 256) {
      return NextResponse.json({ message: 'Range IP terlalu besar (maks 256 IP sekaligus)' }, { status: 400 });
    }

    const ipList = [];
    for (let i = start; i <= end; i++) {
      ipList.push(longToIp(i));
    }

    // Check existing IPs in this pool to avoid duplicates
    const existing = await prisma.radippool.findMany({
      where: {
        pool_name: name,
        framedipaddress: { in: ipList }
      },
      select: { framedipaddress: true }
    });

    const existingIps = new Set(existing.map(e => e.framedipaddress));
    const newIps = ipList.filter(ip => !existingIps.has(ip));

    if (newIps.length === 0) {
      return NextResponse.json({ message: 'Semua IP dalam range sudah ada di pool ini' }, { status: 400 });
    }

    await prisma.radippool.createMany({
      data: newIps.map(ip => ({
        pool_name: name,
        framedipaddress: ip,
        calledstationid: '',
        callingstationid: '',
        pool_key: '',
        username: ''
      }))
    });
    await logAudit('MANAGE_POOL_IPS', 'pool', name, { action: 'add', count: newIps.length, startIp, endIp });
    return NextResponse.json({ message: `${newIps.length} IP berhasil ditambahkan ke pool` });
  } catch (error: any) {
    return NextResponse.json({ message: 'Gagal menambahkan IP', error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ message: 'ID IP harus disertakan' }, { status: 400 });

    const deletedIp = await prisma.radippool.delete({
      where: { id: parseInt(id) }
    });
    await logAudit('MANAGE_POOL_IPS', 'pool', deletedIp.pool_name, { action: 'delete', ip: deletedIp.framedipaddress });
    return NextResponse.json({ message: 'IP berhasil dihapus dari pool' });
  } catch (error: any) {
    return NextResponse.json({ message: 'Gagal menghapus IP', error: error.message }, { status: 500 });
  }
}
