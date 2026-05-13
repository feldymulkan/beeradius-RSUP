import prisma from "@/lib/prisma";
import Link from "next/link";
import UserClientWrapper from "@/components/UserClientWrapper";
import SearchInput from "@/components/SearchInput";
import UserFilter from "@/components/UserFilter";
import ImportUser from "@/components/ImportUser";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const pageSize = Number(params.pageSize) || 10;

  const query = params.query as string | undefined;
  const group = params.group as string | undefined;

  // =============================
  // 1️⃣ Filter username dari search (username + fullName + DEPARTMENT)
  // =============================
  let filteredUsernames: string[] | undefined = undefined;

  if (query) {
    const [fromUsername, fromUserInfo] = await Promise.all([
      // 1. Cari berdasarkan Username
      prisma.radcheck.findMany({
        where: { username: { contains: query } },
        select: { username: true },
      }),
      // 2. Cari berdasarkan Nama Lengkap ATAU Departemen
      prisma.userinfo.findMany({
        where: {
          OR: [
            { fullName: { contains: query } },
            { department: { contains: query } }, // 👈 Tambahan: Cari department di sini
          ],
        },
        select: { username: true },
      }),
    ]);

    // Gabungkan hasil pencarian (menghindari duplikat)
    filteredUsernames = Array.from(
      new Set([
        ...fromUsername.map(u => u.username),
        ...fromUserInfo.map(u => u.username),
      ])
    );

    if (filteredUsernames.length === 0) {
      return (
        <div className="prose lg:prose-xl mb-6">
          <div className="flex justify-between items-center">
            <h1>Manajemen User</h1>
            <Link href="/radius-users/create" className="btn btn-primary">
              Tambah User Baru
            </Link>
          </div>
          <div className="not-prose mt-6 flex flex-wrap gap-4 items-center">
            <SearchInput placeholder="Cari username, nama, atau departemen..." queryKey="query" />
             {/* Perlu merender filter agar tombol reset tetap ada jika user ingin kembali */}
             <UserFilter groups={[]} /> 
          </div>
          <p className="mt-6 text-gray-500">Tidak ada data ditemukan untuk "{query}"</p>
        </div>
      );
    }
  }

  // =============================
  // 2️⃣ Filter tambahan (HANYA GROUP)
  // =============================
  if (group) {
    const usersByGroup = await prisma.radusergroup.findMany({
      where: { groupname: group },
      select: { username: true },
    });

    const usernamesByGroup = usersByGroup.map(u => u.username);

    filteredUsernames = filteredUsernames
      ? filteredUsernames.filter(u => usernamesByGroup.includes(u))
      : usernamesByGroup;
  }

  // =============================
  // 3️⃣ Hitung total item
  // =============================
  const groupedByUsername = await prisma.radcheck.groupBy({
    by: ["username"],
    where: filteredUsernames
      ? { username: { in: filteredUsernames } }
      : undefined,
  });

  const totalItems = groupedByUsername.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  // =============================
  // 4️⃣ Ambil data utama (pagination)
  // =============================
  const radcheckUsers = await prisma.radcheck.findMany({
    distinct: ["username"],
    select: { id: true, username: true },
    where: filteredUsernames
      ? { username: { in: filteredUsernames } }
      : undefined,
    orderBy: { username: "asc" },
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  const usernames = radcheckUsers.map(u => u.username);

  // =============================
  // 5️⃣ Ambil data tambahan
  // =============================
  const [userInfos, userGroups] = await Promise.all([
    prisma.userinfo.findMany({
      where: { username: { in: usernames } },
      select: { username: true, fullName: true, department: true, createdBy: true },
    }),
    prisma.radusergroup.findMany({
      where: { username: { in: usernames } },
      select: { username: true, groupname: true },
    }),
  ]);

  const userInfoMap = new Map(userInfos.map(i => [i.username, i]));
  const userGroupMap = new Map(userGroups.map(g => [g.username, g]));

  const combinedUsers = radcheckUsers.map(user => ({
    id: user.id,
    username: user.username,
    fullName: userInfoMap.get(user.username)?.fullName || "N/A",
    department: userInfoMap.get(user.username)?.department || "N/A",
    groupname: userGroupMap.get(user.username)?.groupname || "N/A",
    createdBy: userInfoMap.get(user.username)?.createdBy || "N/A",
  }));

  // =============================
  // 6️⃣ Data untuk dropdown filter (HANYA GROUP)
  // =============================
  const groups = await prisma.radusergroup.findMany({
    distinct: ["groupname"],
    select: { groupname: true },
  });

  const groupList = groups.map(g => g.groupname);

  // =============================
  // 7️⃣ Render UI
  // =============================
  return (
    <div className="prose lg:prose-xl mb-6">
      <div className="flex justify-between items-center">
        <h1>Manajemen User</h1>
        <div className="dropdown dropdown-end not-prose">
          <label tabIndex={0} className="btn btn-primary m-1">Tambah User Baru</label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link href="/radius-users/create/hotspot">User Hotspot</Link></li>
            <li><Link href="/radius-users/create/vpn">User VPN (PPP)</Link></li>
          </ul>
        </div>
      </div>

      <div className="not-prose mt-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 items-center">
          <SearchInput
            placeholder="Cari username, nama, atau departemen..."
            queryKey="query"
          />

          <UserFilter
            groups={groupList}
          />
        </div>

        <div className="card bg-base-200 p-2 shadow-sm">
          <ImportUser />
        </div>
      </div>

      <div className="not-prose mt-6">
        <UserClientWrapper
          users={combinedUsers}
          page={page}
          pageSize={pageSize}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}