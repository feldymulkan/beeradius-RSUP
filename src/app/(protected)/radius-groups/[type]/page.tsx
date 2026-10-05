import Link from "next/link";
import prisma from "@/lib/prisma";
import GroupClientWrapper from "@/components/GroupClientWrapper";

export default async function RadiusGroupsPage({
  params,
  searchParams,
}: {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { type } = await params;
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams?.page) || 1;
  const pageSize = Number(resolvedSearchParams?.pageSize) || 10;
  const q = (resolvedSearchParams?.q as string) || "";

  // 1. Ambil metadata grup berdasarkan tipe
  const groupMetadata = await prisma.groupMetadata.findMany({
    where: { 
      type: type,
      groupname: { contains: q }
    },
    select: { groupname: true, type: true }
  });

  const targetGroupNames = groupMetadata.map(m => m.groupname);

  // 2. Ambil semua nama grup dari KEDUA tabel (check dan reply) yang ada di metadata
  const replyGroups = await prisma.radgroupreply.findMany({
    where: { groupname: { in: targetGroupNames } },
    distinct: ['groupname'],
    select: { groupname: true },
  });
  const checkGroups = await prisma.radgroupcheck.findMany({
    where: { groupname: { in: targetGroupNames } },
    distinct: ['groupname'],
    select: { groupname: true },
  });

  const allGroupNames = new Set([
    ...replyGroups.map(g => g.groupname.trim()),
    ...checkGroups.map(g => g.groupname.trim())
  ]);
  
  // 3. Ubah kembali menjadi array dan urutkan
  const uniqueSortedGroups = Array.from(allGroupNames).sort();
  
  const totalItems = uniqueSortedGroups.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  // 4. Lakukan paginasi secara manual dari array yang sudah bersih
  const paginatedGroupNames = uniqueSortedGroups.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const groupsWithId = paginatedGroupNames.map(name => {
    const meta = groupMetadata.find(m => m.groupname === name);
    return {
      id: name,
      groupname: name,
      type: meta?.type || type
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-base-content flex items-center gap-2">
            Manajemen Grup <span className="text-primary uppercase">{type}</span>
          </h1>
          <p className="text-xs text-base-content/70 mt-1">
            Kelola profil bandwidth, batasan kecepatan (rate limit), dan alokasi IP pool untuk grup {type}.
          </p>
        </div>
        <Link
          href="/radius-groups/create"
          className="btn btn-primary btn-sm gap-1.5 shadow-[0_0_12px_rgba(56,189,248,0.25)] self-start sm:self-auto"
        >
          <span>+</span> Tambah Grup Baru
        </Link>
      </div>

      <GroupClientWrapper 
        groups={groupsWithId}
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
      />
    </div>
  );
}