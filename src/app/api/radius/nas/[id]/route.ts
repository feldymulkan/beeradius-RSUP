import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { logAudit } from '@/lib/audit';

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { nasname, shortname, type, secret, description } = body;

    if (!id || !nasname || !secret) {
      return NextResponse.json({ message: 'ID, IP/Host NAS, dan Secret harus diisi' }, { status: 400 });
    }

    const nas = await prisma.nas.update({
      where: { id: parseInt(id) },
      data: {
        nasname,
        shortname,
        type,
        secret,
        description
      }
    });
    await logAudit('UPDATE_NAS', 'nas', nasname, { id, shortname, type });
    return NextResponse.json({ nas, message: 'NAS berhasil diperbarui' });
  } catch (error: any) {
    return NextResponse.json({ message: 'Gagal memperbarui NAS', error: error.message }, { status: 500 });
  }
}

export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id) return NextResponse.json({ message: 'ID NAS harus disertakan' }, { status: 400 });

    const deletedNas = await prisma.nas.delete({
      where: { id: parseInt(id) }
    });
    await logAudit('DELETE_NAS', 'nas', deletedNas.nasname, { id });
    return NextResponse.json({ message: 'NAS berhasil dihapus' });
  } catch (error: any) {
    return NextResponse.json({ message: 'Gagal menghapus NAS', error: error.message }, { status: 500 });
  }
}
