import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { toggleUserStatus } from "@/app/actions/userActions";
import { logAudit } from '@/lib/audit';

export async function POST(req: NextRequest) {
  try {
    const { ids, action } = await req.json();

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ message: "ID tidak valid" }, { status: 400 });
    }

    if (!['active', 'disabled'].includes(action)) {
      return NextResponse.json({ message: "Aksi tidak valid" }, { status: 400 });
    }

    // Ambil data user yang akan diupdate dari userinfo
    const usersToUpdate = await prisma.userinfo.findMany({
      where: { id: { in: ids } },
      select: { username: true, type: true, status: true }
    });

    // Kita update satu per satu menggunakan logic toggleUserStatus agar surgical dan update radcheck
    let successCount = 0;
    for (const user of usersToUpdate) {
      // Hanya update jika statusnya berbeda dengan aksi yang diinginkan
      // Action 'disabled' berarti kita ingin menonaktifkan yang sedang 'active'
      // Action 'active' berarti kita ingin mengaktifkan yang sedang 'disabled'
      if ((action === 'disabled' && user.status === 'active') || 
          (action === 'active' && user.status === 'disabled')) {
        const res = await toggleUserStatus(user.username, user.type, user.status);
        if (!res.error) successCount++;
      }
    }

    if (successCount > 0) {
      await logAudit('BATCH_STATUS_USERS', 'user', 'Multiple Users', { action, count: successCount, ids });
    }

    const actionText = action === 'disabled' ? 'dinonaktifkan' : 'diaktifkan';
    return NextResponse.json({ message: `${successCount} user berhasil ${actionText}` });
  } catch (error: any) {
    console.error("[Batch Status Update Error]:", error);
    return NextResponse.json(
      { message: "Gagal memperbarui status user", error: error.message },
      { status: 500 }
    );
  }
}
