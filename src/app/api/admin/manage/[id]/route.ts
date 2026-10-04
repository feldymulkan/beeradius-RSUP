import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import * as bcrypt from "bcrypt";
import { logAudit } from '@/lib/audit';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "superadmin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { username, password, role } = await req.json();

    const data: any = { username, role };
    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

    await prisma.admin.update({
      where: { id: parseInt(id) },
      data,
    });
    await logAudit('UPDATE_ADMIN', 'admin', username, { id, role, passwordChanged: !!password });
    return NextResponse.json({ message: "Data admin berhasil diperbarui" });
  } catch (error: any) {
    return NextResponse.json({ message: "Gagal memperbarui admin", error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "superadmin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const adminId = parseInt(id);

    // Jangan izinkan superadmin menghapus dirinya sendiri dari daftar ini
    if (adminId.toString() === session.user.id) {
      return NextResponse.json({ message: "Anda tidak dapat menghapus akun Anda sendiri" }, { status: 400 });
    }

    const deletedAdmin = await prisma.admin.delete({
      where: { id: adminId },
    });
    await logAudit('DELETE_ADMIN', 'admin', deletedAdmin.username, { id: adminId });
    return NextResponse.json({ message: "Admin berhasil dihapus" });
  } catch (error: any) {
    return NextResponse.json({ message: "Gagal menghapus admin", error: error.message }, { status: 500 });
  }
}
