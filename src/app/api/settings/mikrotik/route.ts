import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { logAudit } from '@/lib/audit';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const configs = await prisma.mikrotikConfig.findMany({
      orderBy: { name: 'asc' }
    });
    return NextResponse.json(configs);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const config = await prisma.mikrotikConfig.create({
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
    await logAudit('CREATE_MIKROTIK', 'mikrotik', config.name, { host: config.host });
    return NextResponse.json(config);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
