import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { formatDate, fixPrismaDate } from '@/lib/utils';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get('q') || '';
  const group = searchParams.get('group') || '';
  const status = searchParams.get('status') || '';
  const neverLoggedIn = searchParams.get('never_logged_in') || '';
  const type = searchParams.get('type') || '';

  try {
    // ============================================================
    // 1. Build filteredUsernames using same logic as page.tsx
    // ============================================================
    let filteredUsernames: string[] | undefined = undefined;

    // Type filter: scope to users in groups of this type
    if (type) {
      const targetGroups = await prisma.groupMetadata.findMany({
        where: { type },
        select: { groupname: true },
      });
      const usersInGroups = await prisma.radusergroup.findMany({
        where: { groupname: { in: targetGroups.map(g => g.groupname) } },
        select: { username: true },
      });
      filteredUsernames = Array.from(new Set(usersInGroups.map(u => u.username)));
    }

    // Search filter
    if (q) {
      const [fromUsername, fromUserInfo, fromGroup] = await Promise.all([
        prisma.radcheck.findMany({
          where: {
            username: { contains: q },
            ...(filteredUsernames ? { username: { in: filteredUsernames, contains: q } } : {}),
          },
          select: { username: true },
          distinct: ['username'],
        }),
        prisma.userinfo.findMany({
          where: {
            ...(filteredUsernames ? { username: { in: filteredUsernames } } : {}),
            OR: [
              { fullName: { contains: q } },
              { department: { contains: q } },
            ],
          },
          select: { username: true },
        }),
        prisma.radusergroup.findMany({
          where: {
            ...(filteredUsernames ? { username: { in: filteredUsernames } } : {}),
            groupname: { contains: q },
          },
          select: { username: true },
          distinct: ['username'],
        }),
      ]);

      const combined = new Set([
        ...fromUsername.map(u => u.username),
        ...fromUserInfo.map(u => u.username),
        ...fromGroup.map(u => u.username),
      ]);
      filteredUsernames = Array.from(combined);
    }

    // Group filter
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

    // Status filter (online/offline/stale)
    if (status) {
      const STALE_THRESHOLD_MS = 15 * 60 * 1000;
      const staleDate = new Date(Date.now() - STALE_THRESHOLD_MS);

      const activeSessions = await prisma.radacct.findMany({
        where: {
          acctstoptime: null,
          ...(filteredUsernames ? { username: { in: filteredUsernames } } : {}),
        },
        select: { username: true, acctstarttime: true, acctupdatetime: true },
      });

      const onlineUsernames = new Set<string>();
      const staleUsernames = new Set<string>();

      for (const s of activeSessions) {
        const lastUpdate = s.acctupdatetime || s.acctstarttime;
        if (lastUpdate && lastUpdate < staleDate) {
          staleUsernames.add(s.username);
        } else {
          onlineUsernames.add(s.username);
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

    // Inactivity filter
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

    // ============================================================
    // 2. Fetch all matching users (no pagination)
    // ============================================================
    const whereClause: any = {};
    if (filteredUsernames !== undefined) {
      whereClause.username = { in: filteredUsernames };
    }
    if (type) {
      whereClause.type = type;
    }

    const users = await prisma.userinfo.findMany({
      where: whereClause,
      orderBy: { username: 'asc' },
    });

    const usernames = Array.from(new Set(users.map(u => u.username)));

    // ============================================================
    // 3. Fetch group info and last login
    // ============================================================
    const [userGroups, lastLogins, groupsWithType] = await Promise.all([
      usernames.length > 0
        ? prisma.radusergroup.findMany({
            where: { username: { in: usernames } },
            select: { username: true, groupname: true },
          })
        : Promise.resolve([]),
      usernames.length > 0
        ? prisma.radacct.groupBy({
            by: ['username'],
            where: { username: { in: usernames } },
            _max: { acctstarttime: true },
          })
        : Promise.resolve([]),
      prisma.groupMetadata.findMany({
        select: { groupname: true, type: true },
      }),
    ]);

    const groupTypeMap = new Map(groupsWithType.map(g => [g.groupname, g.type]));
    const lastLoginMap = new Map(
      lastLogins.map(l => [l.username, l._max.acctstarttime])
    );

    // ============================================================
    // 4. Build CSV
    // ============================================================
    const headers = ['Username', 'Tipe', 'Nama Lengkap', 'Departemen', 'Grup', 'Dibuat Oleh', 'Status', 'Login Terakhir'];

    const escapeCSV = (value: string): string => {
      if (value.includes(',') || value.includes('"') || value.includes('\n')) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    };

    const rows = users.map(user => {
      const relevantGroup = userGroups.find(ug =>
        ug.username === user.username && groupTypeMap.get(ug.groupname) === user.type
      );
      const lastLogin = lastLoginMap.get(user.username);
      const lastLoginStr = lastLogin
        ? formatDate(fixPrismaDate(lastLogin))
        : '-';

      return [
        user.username,
        user.type || '-',
        user.fullName || '-',
        user.department || '-',
        relevantGroup?.groupname || '-',
        user.createdBy || '-',
        user.status || 'active',
        lastLoginStr,
      ].map(escapeCSV).join(',');
    });

    const BOM = '\uFEFF';
    const csvContent = BOM + [headers.join(','), ...rows].join('\n');

    const today = new Date().toISOString().split('T')[0];
    const filename = `users_export_${today}.csv`;

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename=${filename}`,
      },
    });
  } catch (error) {
    console.error('Export CSV error:', error);
    return NextResponse.json(
      { error: 'Failed to export CSV' },
      { status: 500 }
    );
  }
}
