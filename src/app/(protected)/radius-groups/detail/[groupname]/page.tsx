import prisma from "@/lib/prisma";
import Link from "next/link";
// Ganti nama komponen ini jika nama file form edit Anda berbeda
import GroupDetailClientWrapper from "@/components/GroupDetailClientWrapper";
import { notFound } from "next/navigation";

export default async function GroupDetailPage({
  params,
}: {
  params: Promise<{ groupname: string }>;
}) {
  
  const resolvedParams = await params;
  const groupname = decodeURIComponent(resolvedParams.groupname);

  // [PERBAIKAN] Ambil data dari KEDUA tabel secara bersamaan
  const [replyAttributes, checkAttributes] = await Promise.all([
    // 1. Ambil atribut reply (seperti rate-limit)
    prisma.radgroupreply.findMany({
      where: {
        groupname: groupname,
      },
      orderBy: {
        attribute: 'asc',
      },
    }),
    // 2. Ambil atribut check (untuk batas device)
    prisma.radgroupcheck.findMany({
        where: {
            groupname: groupname,
            attribute: 'Simultaneous-Use' // Hanya ambil atribut yang kita perlu
        }
    })
  ]);

  // [PERBAIKAN] Cek apakah grup ada
  if (replyAttributes.length === 0 && checkAttributes.length === 0) {
      notFound(); // Tampilkan halaman 404 jika grup tidak ada
  }

  // [PERBAIKAN] Ekstrak nilai 'Simultaneous-Use'
  // Ambil data pertama dari array (jika ada), atau set ke string kosong
  const simultaneousUseValue = checkAttributes[0] ? checkAttributes[0].value : "";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-base-content flex items-center gap-2">
            Detail &amp; Edit Grup: <span className="text-primary">{groupname}</span>
          </h1>
          <p className="text-xs text-base-content/70 mt-1">
            Konfigurasi atribut RADIUS, rate limit MikroTik, dan simultaneous-use.
          </p>
        </div>
        <Link href="/radius-groups" className="btn btn-ghost btn-sm border border-base-300 self-start sm:self-auto">
          ← Kembali ke Grup
        </Link>
      </div>

      <GroupDetailClientWrapper
        initialReplyAttributes={replyAttributes}
        initialSimultaneousUse={simultaneousUseValue}
        groupname={groupname}
      />
    </div>
  );
}