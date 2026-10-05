import prisma from "@/lib/prisma";
import Link from "next/link";
import UserClientWrapper from "@/components/UserClientWrapper";
import SearchInput from "@/components/SearchInput";
import UserFilter from "@/components/UserFilter";
import ImportUser from "@/components/ImportUser";
import ExportCSV from "@/components/ExportCSV";
import { Suspense } from "react";
import TableSkeleton from "@/components/Skleton";
import { fixPrismaDate, toPrismaDate } from "@/lib/utils";

// Valid sort keys mapping to Prisma orderBy fields
const SORT_KEY_MAP: Record<string, string> = {
  username: "username",
  type: "type",
  fullName: "fullName",
  department: "department",
  status: "status",
};

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const key = JSON.stringify(params); // Used to trigger Suspense on searchParam change

  // ============================================================
  // Group list untuk dropdown filter (Cepat, bisa di luar Suspense)
  // ============================================================
  const groups = await prisma.radusergroup.findMany({
    distinct: ["groupname"],
    select: { groupname: true },
  });
  const groupList = groups.map(g => g.groupname);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-base-content">
            Manajemen Pengguna RADIUS
          </h1>
          <p className="text-xs text-base-content/70 mt-1">
            Kelola seluruh akun autentikasi Hotspot dan VPN (PPP) jaringan RSUD NTB.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <ImportUser />
          <ExportCSV />
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-primary btn-sm gap-1.5 shadow-[0_0_12px_rgba(56,189,248,0.25)]">
              <span>+</span> Tambah User Baru
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </label>
            <ul tabIndex={0} className="dropdown-content z-10 menu p-2 shadow-2xl bg-base-100 border border-primary/20 rounded-xl w-48 mt-1">
              <li><Link href="/radius-users/create/hotspot" className="text-xs py-2">User Hotspot</Link></li>
              <li><Link href="/radius-users/create/vpn" className="text-xs py-2">User VPN (PPP)</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Unified Search & Filter Toolbar */}
      <div className="bg-base-100/90 backdrop-blur-xl border border-primary/10 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-sm">
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          <SearchInput placeholder="Cari username, nama, atau departemen..." />
          <div className="h-5 w-px bg-slate-700/50 hidden md:block"></div>
          <UserFilter groups={groupList} />
        </div>
      </div>

      <Suspense key={key} fallback={<div className="mt-4"><TableSkeleton /></div>}>
        <UsersData params={params} />
      </Suspense>
    </div>
  );
}

async function UsersData({ params }: { params: { [key: string]: string | string[] | undefined } }) {
  const page = Number(params.page) || 1;
  const pageSize = Number(params.pageSize) || 10;

  const q = params.q as string | undefined;
  const group = params.group as string | undefined;
  const status = params.status as string | undefined;
  const neverLoggedIn = params.never_logged_in as string | undefined;
  const sort = params.sort as string | undefined;
  const order = (params.order as string) === "desc" ? "desc" : "asc";

  let filteredUsernames: string[] | undefined = undefined;

  if (q) {
    const searchTerm = q.trim();
    const [fromUsername, fromUserInfo, fromGroup] = await Promise.all([
      prisma.radcheck.findMany({
        where: { username: { contains: searchTerm } },
        select: { username: true },
        distinct: ['username'],
      }),
      prisma.userinfo.findMany({
        where: {
          OR: [
            { fullName: { contains: searchTerm } },
            { department: { contains: searchTerm } },
          ],
        },
        select: { username: true },
      }),
      prisma.radusergroup.findMany({
        where: { groupname: { contains: searchTerm } },
        select: { username: true },
        distinct: ['username'],
      })
    ]);

    const combined = new Set([
      ...fromUsername.map(u => u.username),
      ...fromUserInfo.map(u => u.username),
      ...fromGroup.map(u => u.username),
    ]);
    filteredUsernames = Array.from(combined);
  }

  if (group) {
    const usersByGroup = await prisma.radusergroup.findMany({
      where: { groupname: group },
      select: { username: true },
    });
    const usernamesByGroup = new Set(usersByGroup.map(u => u.username));
    
    if (filteredUsernames) {
      filteredUsernames = filteredUsernames.filter(u => usernamesByGroup.has(u));
    } else {
      filteredUsernames = Array.from(usernamesByGroup);
    }
  }

  if (status) {
    const STALE_THRESHOLD_MS = 15 * 60 * 1000;
    const staleDatePrisma = toPrismaDate(new Date(Date.now() - STALE_THRESHOLD_MS));

    const activeSessions = await prisma.radacct.findMany({
      where: {
        acctstoptime: null,
        ...(filteredUsernames ? { username: { in: filteredUsernames } } : {}),
      },
      select: { username: true, acctstarttime: true, acctupdatetime: true },
    });

    const onlineUsernames = new Set<string>();
    const staleUsernames = new Set<string>();

    for (const session of activeSessions) {
      const lastUpdate = session.acctupdatetime || session.acctstarttime;
      const isStale = lastUpdate ? lastUpdate < staleDatePrisma : true;
      if (isStale) {
        staleUsernames.add(session.username);
      } else {
        onlineUsernames.add(session.username);
      }
    }
    for (const u of onlineUsernames) staleUsernames.delete(u);

    if (status === 'online') {
      filteredUsernames = Array.from(onlineUsernames);
    } else if (status === 'stale') {
      filteredUsernames = Array.from(staleUsernames);
    } else if (status === 'offline') {
      const allOnlineOrStale = new Set([...onlineUsernames, ...staleUsernames]);
      if (filteredUsernames) {
        filteredUsernames = filteredUsernames.filter(u => !allOnlineOrStale.has(u));
      } else {
        const allUsers = await prisma.userinfo.findMany({
          select: { username: true },
          distinct: ['username'],
        });
        filteredUsernames = allUsers.map(u => u.username).filter(u => !allOnlineOrStale.has(u));
      }
    }
  }

  if (neverLoggedIn) {
    const userActivity = await prisma.radacct.groupBy({
      by: ['username'],
      where: filteredUsernames ? { username: { in: filteredUsernames } } : undefined,
      _max: { acctstarttime: true },
    });
    const activeUserMap = new Map(
      userActivity.map(a => [a.username, a._max.acctstarttime])
    );

    if (neverLoggedIn === 'never') {
      if (filteredUsernames) {
        filteredUsernames = filteredUsernames.filter(u => !activeUserMap.has(u));
      } else {
        const allUsers = await prisma.userinfo.findMany({
          select: { username: true },
          distinct: ['username'],
        });
        filteredUsernames = allUsers.map(u => u.username).filter(u => !activeUserMap.has(u));
      }
    } else {
      const days = parseInt(neverLoggedIn);
      if (!isNaN(days)) {
        const thresholdDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
        if (filteredUsernames) {
          filteredUsernames = filteredUsernames.filter(u => {
            const lastLogin = activeUserMap.get(u);
            if (!lastLogin) return true;
            return lastLogin < thresholdDate;
          });
        } else {
          const allUsers = await prisma.userinfo.findMany({
            select: { username: true },
            distinct: ['username'],
          });
          filteredUsernames = allUsers.map(u => u.username).filter(u => {
            const lastLogin = activeUserMap.get(u);
            if (!lastLogin) return true;
            return lastLogin < thresholdDate;
          });
        }
      }
    }
  }

  if (filteredUsernames !== undefined && filteredUsernames.length === 0) {
    return (
      <div className="not-prose mt-6">
        <p className="mt-8 text-center text-gray-500 italic">Tidak ada user yang memenuhi kriteria filter.</p>
      </div>
    );
  }

  const whereClause: any = filteredUsernames
    ? { username: { in: filteredUsernames } }
    : {};

  const totalItems = await prisma.userinfo.count({ where: whereClause });
  const totalPages = Math.ceil(totalItems / pageSize);

  const prismaSort = sort && SORT_KEY_MAP[sort] ? SORT_KEY_MAP[sort] : "username";
  const orderBy: any = [{ [prismaSort]: order }];
  if (prismaSort !== "username") {
    orderBy.push({ username: "asc" });
  }

  const userInfos = await prisma.userinfo.findMany({
    where: whereClause,
    orderBy,
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  const usernames = Array.from(new Set(userInfos.map(u => u.username)));

  const [userGroups, lastLogins, groupsWithType] = await Promise.all([
    prisma.radusergroup.findMany({
      where: { username: { in: usernames } },
      select: { username: true, groupname: true },
    }),
    prisma.radacct.groupBy({
      by: ['username'],
      where: { username: { in: usernames } },
      _max: { acctstarttime: true },
    }),
    prisma.groupMetadata.findMany({
      select: { groupname: true, type: true }
    }),
  ]);

  const lastLoginMap = new Map(
    lastLogins.map(l => [l.username, l._max.acctstarttime ? fixPrismaDate(l._max.acctstarttime)?.toISOString() || null : null])
  );
  const groupTypeMap = new Map(groupsWithType.map(g => [g.groupname, g.type]));

  const combinedUsers = userInfos.map(info => {
    const relevantGroup = userGroups.find(ug => 
      ug.username === info.username && groupTypeMap.get(ug.groupname) === info.type
    );

    return {
      id: info.id,
      username: info.username,
      type: info.type,
      fullName: info.fullName || "N/A",
      department: info.department || "N/A",
      groupname: relevantGroup?.groupname || "N/A",
      createdBy: info.createdBy || "N/A",
      status: info.status || "active",
      lastLogin: lastLoginMap.get(info.username) || null,
    };
  });

  if (sort === "lastLogin") {
    combinedUsers.sort((a, b) => {
      if (!a.lastLogin && !b.lastLogin) return 0;
      if (!a.lastLogin) return order === "asc" ? -1 : 1;
      if (!b.lastLogin) return order === "asc" ? 1 : -1;
      return order === "asc" 
        ? a.lastLogin.localeCompare(b.lastLogin) 
        : b.lastLogin.localeCompare(a.lastLogin);
    });
  } else if (sort === "groupname") {
    combinedUsers.sort((a, b) => {
      return order === "asc" 
        ? a.groupname.localeCompare(b.groupname) 
        : b.groupname.localeCompare(a.groupname);
    });
  }

  return (
    <div className="not-prose mt-6">
      <UserClientWrapper
        users={combinedUsers}
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
        totalItems={totalItems}
      />
    </div>
  );
}