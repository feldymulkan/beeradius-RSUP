import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { defaultHospitalTopology } from '@/lib/defaultTopology';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const listOnly = searchParams.get('list') === 'true';

    if (listOnly) {
      const list = await prisma.networkTopology.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          isDefault: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { updatedAt: 'desc' },
      });
      return NextResponse.json({ topologies: list });
    }

    // Cari topologi default atau yang paling baru diedit
    let active = await prisma.networkTopology.findFirst({
      where: { isDefault: true },
      orderBy: { updatedAt: 'desc' },
    });

    if (!active) {
      active = await prisma.networkTopology.findFirst({
        orderBy: { updatedAt: 'desc' },
      });
    }

    // Jika belum ada sama sekali di database, inisialisasi dengan default template RSUD NTB
    if (!active) {
      active = await prisma.networkTopology.create({
        data: {
          name: defaultHospitalTopology.name,
          description: defaultHospitalTopology.description,
          isDefault: true,
          nodes: JSON.stringify(defaultHospitalTopology.nodes),
          edges: JSON.stringify(defaultHospitalTopology.edges),
          viewport: JSON.stringify(defaultHospitalTopology.viewport),
        },
      });
    }

    return NextResponse.json({
      topology: {
        id: active.id,
        name: active.name,
        description: active.description,
        isDefault: active.isDefault,
        nodes: JSON.parse(active.nodes || '[]'),
        edges: JSON.parse(active.edges || '[]'),
        viewport: active.viewport ? JSON.parse(active.viewport) : { zoom: 1, panX: 0, panY: 0 },
        createdAt: active.createdAt,
        updatedAt: active.updatedAt,
      },
    });
  } catch (error: any) {
    console.error('Error fetching network topology:', error);
    // Fallback ke default template jika ada error database
    return NextResponse.json({
      topology: defaultHospitalTopology,
      fallback: true,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, description, isDefault, nodes, edges, viewport } = body;

    if (!name) {
      return NextResponse.json({ error: 'Nama topologi wajib diisi' }, { status: 400 });
    }

    let saved;
    if (id) {
      saved = await prisma.networkTopology.update({
        where: { id: Number(id) },
        data: {
          name,
          description: description || null,
          isDefault: isDefault ?? false,
          nodes: JSON.stringify(nodes || []),
          edges: JSON.stringify(edges || []),
          viewport: viewport ? JSON.stringify(viewport) : null,
        },
      });
    } else {
      saved = await prisma.networkTopology.create({
        data: {
          name,
          description: description || null,
          isDefault: isDefault ?? true,
          nodes: JSON.stringify(nodes || []),
          edges: JSON.stringify(edges || []),
          viewport: viewport ? JSON.stringify(viewport) : null,
        },
      });
    }

    return NextResponse.json({
      success: true,
      id: saved.id,
      message: 'Topologi jaringan berhasil disimpan',
    });
  } catch (error: any) {
    console.error('Error saving network topology:', error);
    return NextResponse.json({ error: error.message || 'Gagal menyimpan topologi' }, { status: 500 });
  }
}
