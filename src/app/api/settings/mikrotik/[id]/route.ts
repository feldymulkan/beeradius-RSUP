import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { logAudit } from '@/lib/audit';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    const body = await req.json();
    const config = await prisma.mikrotikConfig.update({
      where: { id: parseInt(id) },
      data: {
        name: body.name,
        host: body.host,
        port: parseInt(body.port),
        username: body.username,
        password: body.password,
        useSsl: body.useSsl === true,
        wgPublicHost: body.wgPublicHost || null,
      }
    });
    await logAudit('UPDATE_MIKROTIK', 'mikrotik', config.name, { id, host: config.host });
    return NextResponse.json(config);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    const deletedConfig = await prisma.mikrotikConfig.delete({
      where: { id: parseInt(id) }
    });
    await logAudit('DELETE_MIKROTIK', 'mikrotik', deletedConfig.name, { id });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
