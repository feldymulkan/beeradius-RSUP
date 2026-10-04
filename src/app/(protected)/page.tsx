import prisma from "@/lib/prisma";
import OverviewDashboard from "@/components/OverviewDashboard";
import { fixPrismaDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [totalHotspot, totalVpn, totalNas, recentAcct] = await Promise.all([
    prisma.userinfo.count({ where: { type: "hotspot" } }),
    prisma.userinfo.count({ where: { type: "vpn" } }),
    prisma.nas.count(),
    prisma.radacct.findMany({
      take: 5,
      orderBy: { acctstarttime: "desc" },
      select: {
        username: true,
        acctstarttime: true,
        framedipaddress: true,
        nasipaddress: true,
      },
    }),
  ]);

  const recentSessions = recentAcct.map((s) => {
    const fixed = fixPrismaDate(s.acctstarttime);
    return {
      username: s.username,
      acctstarttime: fixed ? fixed.toISOString() : null,
      framedipaddress: s.framedipaddress,
      nasipaddress: s.nasipaddress,
    };
  });

  return (
    <OverviewDashboard
      initialData={{
        totalHotspot,
        totalVpn,
        totalNas,
        recentSessions,
      }}
    />
  );
}
