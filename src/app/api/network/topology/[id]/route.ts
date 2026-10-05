import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const item = await prisma.networkTopology.findUnique({
      where: { id: Number(id) },
    });

    if (!item) {
      return NextResponse.json({ error: 'Topologi tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({
      topology: {
        id: item.id,
        name: item.name,
        description: item.description,
        isDefault: item.isDefault,
        nodes: JSON.parse(item.nodes || '[]'),
        edges: JSON.parse(item.edges || '[]'),
        viewport: item.viewport ? JSON.parse(item.viewport) : { zoom: 1, panX: 0, panY: 0 },
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.networkTopology.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true, message: 'Topologi berhasil dihapus' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
