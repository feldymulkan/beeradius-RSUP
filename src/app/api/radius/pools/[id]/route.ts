import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { logAudit } from '@/lib/audit';

export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id) return NextResponse.json({ message: 'ID pool harus disertakan' }, { status: 400 });

    const deletedPool = await prisma.radiusPool.delete({
      where: { id: parseInt(id) }
    });
    await logAudit('DELETE_POOL', 'pool', deletedPool.name, { id });
    return NextResponse.json({ message: 'Pool berhasil dihapus' });
  } catch (error: any) {
    return NextResponse.json({ message: 'Gagal menghapus pool', error: error.message }, { status: 500 });
  }
}
