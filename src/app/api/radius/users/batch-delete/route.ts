import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { logAudit } from '@/lib/audit';
import { deleteUser } from "@/app/actions/userActions";

export async function POST(req: NextRequest) {
  try {
    const { ids } = await req.json();

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ message: "ID tidak valid" }, { status: 400 });
    }

    // Ambil data user yang akan dihapus dari userinfo
    const usersToDelete = await prisma.userinfo.findMany({
      where: { id: { in: ids } },
      select: { username: true, type: true }
    });

    // Kita hapus satu per satu menggunakan logic deleteUser agar surgical
    let successCount = 0;
    for (const user of usersToDelete) {
      const res = await deleteUser(user.username, user.type);
      if (!res.error) successCount++;
    }

    if (successCount > 0) {
      await logAudit('BATCH_DELETE_USERS', 'user', 'Multiple Users', { count: successCount, ids });
    }

    return NextResponse.json({ message: `${successCount} user berhasil dihapus` });
  } catch (error: any) {
    console.error("[Batch Delete Error]:", error);
    return NextResponse.json(
      { message: "Gagal menghapus user", error: error.message },
      { status: 500 }
    );
  }
}
