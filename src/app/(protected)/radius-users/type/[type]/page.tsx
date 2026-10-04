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

export default async function TypedUsersPage({
  params,
  searchParams,
}: {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { type } = await params;
  const sParams = await searchParams;
  const key = JSON.stringify(sParams); // Trigger suspense on query param changes

  const targetGroups = await prisma.groupMetadata.findMany({
    where: { type: type },
    select: { groupname: true }
  });
  const targetGroupNames = targetGroups.map(g => g.groupname);

  return (
    <div className="prose lg:prose-xl mb-6 max-w-none">
      <div className="flex justify-between items-center">
        <h1>Manajemen User {type.toUpperCase()}</h1>
        <Link href={`/radius-users/create/${type}`} className="btn btn-primary">Tambah User {type.toUpperCase()}</Link>
      </div>

      <div className="not-prose mt-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 items-center">
          <SearchInput placeholder="Cari username, nama, atau departemen..." />
          <UserFilter groups={targetGroupNames} />
        </div>
        <div className="flex gap-2 items-center">
          <ExportCSV type={type} />
          <div className="card bg-base-200 p-2 shadow-sm">
            <ImportUser />
          </div>
        </div>
      </div>

      <Suspense key={key} fallback={<div className="mt-6"><TableSkeleton /></div>}>
        <UsersData params={sParams} type={type} targetGroupNames={targetGroupNames} />
      </Suspense>
    </div>
  );
}

async function UsersData({ 
  params, 
  type,
  targetGroupNames 
}: { 
  params: { [key: string]: string | string[] | undefined }, 
  type: string,
  targetGroupNames: string[] 
}) {
  const page = Number(params.page) || 1;
  const pageSize = Number(params.pageSize) || 10;

  const q = params.q as string | undefined;
  const group = params.group as string | undefined;
  const status = params.status as string | undefined; 
  const neverLoggedIn = params.never_logged_in as string | undefined;
  const sort = params.sort as string | undefined;
  const order = (params.order as string) === "desc" ? "desc" : "asc";

  const usersInGroups = await prisma.radusergroup.findMany({
    where: { groupname: { in: targetGroupNames } },
    select: { username: true }
  });
  let filteredUsernames: string[] = Array.from(new Set(usersInGroups.map(u => u.username)));

  if (q) {
    const searchTerm = q.trim();
    const [fromUsername, fromUserInfo, fromGroup] = await Promise.all([
      prisma.radcheck.findMany({
        where: { 
          username: { in: filteredUsernames },
          AND: { username: { contains: searchTerm } },
        },
        select: { username: true },
        distinct: ['username'],
      }),
      prisma.userinfo.findMany({
        where: {
          username: { in: filteredUsernames },
          OR: [
            { fullName: { contains: searchTerm } },
            { department: { contains: searchTerm } },
          ],
        },
        select: { username: true },
      }),
      prisma.radusergroup.findMany({
        where: { 
          username: { in: filteredUsernames },
          groupname: { contains: searchTerm } 
        },
        select: { username: true },
        distinct: ['username'],
      })
    ]);

    filteredUsernames = Array.from(
      new Set([
        ...fromUsername.map(u => u.username),
        ...fromUserInfo.map(u => u.username),
        ...fromGroup.map(u => u.username),
      ])
    );
  }

  if (group) {
    const usersByGroup = await prisma.radusergroup.findMany({
      where: { username: { in: filteredUsernames }, groupname: group },
      select: { username: true },
    });
    filteredUsernames = usersByGroup.map(u => u.username);
  }

  if (status) {
    const STALE_THRESHOLD_MS = 15 * 60 * 1000;
    const staleDatePrisma = toPrismaDate(new Date(Date.now() - STALE_THRESHOLD_MS));

    const activeSessions = await prisma.radacct.findMany({
      where: {
        acctstoptime: null,
        username: { in: filteredUsernames },
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
      filteredUsernames = filteredUsernames.filter(u => onlineUsernames.has(u));
    } else if (status === 'stale') {
      filteredUsernames = filteredUsernames.filter(u => staleUsernames.has(u));
    } else if (status === 'offline') {
      const allOnlineOrStale = new Set([...onlineUsernames, ...staleUsernames]);
      filteredUsernames = filteredUsernames.filter(u => !allOnlineOrStale.has(u));
    }
  }

  if (neverLoggedIn) {
    const userActivity = await prisma.radacct.groupBy({
      by: ['username'],
      where: { username: { in: filteredUsernames } },
      _max: { acctstarttime: true },
    });
    const activeUserMap = new Map(
      userActivity.map(a => [a.username, a._max.acctstarttime])
    );

    if (neverLoggedIn === 'never') {
      filteredUsernames = filteredUsernames.filter(u => !activeUserMap.has(u));
    } else {
      const days = parseInt(neverLoggedIn);
      if (!isNaN(days)) {
        const thresholdDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
        filteredUsernames = filteredUsernames.filter(u => {
          const lastLogin = activeUserMap.get(u);
          if (!lastLogin) return true;
          return lastLogin < thresholdDate;
        });
      }
    }
  }

  if (filteredUsernames.length === 0) {
    return (
      <div className="not-prose mt-6">
        <p className="mt-8 text-center text-gray-500 italic">Tidak ada user {type} yang memenuhi kriteria filter.</p>
      </div>
    );
  }

  const totalItems = await prisma.userinfo.count({
    where: { 
      username: { in: filteredUsernames },
      type: type 
    }
  });
  const totalPages = Math.ceil(totalItems / pageSize);

  const prismaSort = sort && SORT_KEY_MAP[sort] ? SORT_KEY_MAP[sort] : "username";
  const orderBy: any = [{ [prismaSort]: order }];
  if (prismaSort !== "username") {
    orderBy.push({ username: "asc" });
  }

  const userInfos = await prisma.userinfo.findMany({
    where: { 
      username: { in: filteredUsernames },
      type: type 
    },
    orderBy,
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  const usernames = Array.from(new Set(userInfos.map(u => u.username)));

  const [userGroups, lastLoginData] = await Promise.all([
    prisma.radusergroup.findMany({
      where: { username: { in: usernames } },
      select: { username: true, groupname: true },
    }),
    prisma.radacct.groupBy({
      by: ['username'],
      where: { username: { in: usernames } },
      _max: { acctstarttime: true },
    }),
  ]);

  const lastLoginMap = new Map(
    lastLoginData.map(a => [a.username, a._max.acctstarttime])
  );
  const targetGroupNamesSet = new Set(targetGroupNames);

  const combinedUsers = userInfos.map(info => {
    const relevantGroup = userGroups.find(ug => 
      ug.username === info.username && targetGroupNamesSet.has(ug.groupname)
    );
    const lastLogin = lastLoginMap.get(info.username);

    return {
      id: info.id,
      username: info.username,
      type: info.type,
      fullName: info.fullName || "N/A",
      department: info.department || "N/A",
      groupname: relevantGroup?.groupname || "N/A",
      createdBy: info.createdBy || "N/A",
      status: info.status || "active",
      lastLogin: lastLogin ? fixPrismaDate(lastLogin)?.toISOString() || null : null,
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
