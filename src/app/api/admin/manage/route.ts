import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import * as bcrypt from "bcrypt";
import { logAudit } from '@/lib/audit';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "superadmin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        username: true,
        role: true,
      },
      orderBy: { username: "asc" },
    });
    return NextResponse.json(admins);
  } catch (error: any) {
    return NextResponse.json({ message: "Gagal mengambil data admin", error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "superadmin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { username, password, role } = await req.json();

    if (!username || !password || !role) {
      return NextResponse.json({ message: "Data tidak lengkap" }, { status: 400 });
    }

    const existingAdmin = await prisma.admin.findUnique({
      where: { username },
    });

    if (existingAdmin) {
      return NextResponse.json({ message: "Username sudah digunakan" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await prisma.admin.create({
      data: {
        username,
        password: hashedPassword,
        role,
      },
    });
    await logAudit('CREATE_ADMIN', 'admin', username, { role });
    return NextResponse.json({ message: "Admin berhasil dibuat", id: newAdmin.id }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: "Gagal membuat admin", error: error.message }, { status: 500 });
  }
}
