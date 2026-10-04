import prisma from "@/lib/prisma";
import OnlineUserCount from "@/components/OnlineUserCount";
import { formatDate, fixPrismaDate } from "@/lib/utils";
import NasStatusWidget from "@/components/NasStatusWidget";
import BandwidthChart from "@/components/BandwidthChart";
import TopBandwidthUsers from "@/components/TopBandwidthUsers";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  // Total Users by Type
  const hotspotGroups = await prisma.groupMetadata.findMany({
    where: { type: 'hotspot' },
    select: { groupname: true }
  });
  const vpnGroups = await prisma.groupMetadata.findMany({
    where: { type: 'vpn' },
    select: { groupname: true }
  });

  const hotspotGroupNames = hotspotGroups.map(g => g.groupname);
  const vpnGroupNames = vpnGroups.map(g => g.groupname);

  const [totalHotspotUsers, totalVpnUsers, recentAcct] = await Promise.all([
    prisma.userinfo.count({ where: { type: 'hotspot' } }),
    prisma.userinfo.count({ where: { type: 'vpn' } }),
    prisma.radacct.findMany({
      take: 5,
      orderBy: { acctstarttime: 'desc' },
      select: {
        username: true,
        acctstarttime: true,
        framedipaddress: true,
        nasipaddress: true
      }
    })
  ]);

  const totalUsers = totalHotspotUsers + totalVpnUsers;

  return (
    <div className="space-y-8 p-4 md:p-8 bg-base-200 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Dashboard Overview</h1>
          <p className="text-gray-500">Monitoring status BeeRadius Anda secara real-time.</p>
        </div>
        <div className="text-sm text-gray-400 bg-base-100 p-2 rounded-lg shadow-sm">
          Terakhir diperbarui: {formatDate(new Date())}
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <OnlineUserCount />

        <div className="card bg-base-100 shadow-xl border-t-4 border-info">
          <div className="card-body p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase">Total User</p>
                <h3 className="text-3xl font-bold">{totalUsers}</h3>
              </div>
              <div className="p-3 bg-info/10 rounded-full text-info">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.084-1.284-.23-1.857M12 12c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6zM6 20v-2c0-.653.084-1.284.23-1.857m0 0A7.988 7.988 0 0112 13a7.988 7.988 0 015.77 5.143m-5.77 1.857A10 10 0 0012 21a10 10 0 00-5.77-1.857z"></path></svg>
              </div>
            </div>
            <div className="mt-4 flex gap-4 text-xs">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary"></span> Hotspot: {totalHotspotUsers}</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-secondary"></span> VPN: {totalVpnUsers}</span>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl border-t-4 border-accent">
          <div className="card-body p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase">Total Grup</p>
                <h3 className="text-3xl font-bold">{hotspotGroupNames.length + vpnGroupNames.length}</h3>
              </div>
              <div className="p-3 bg-accent/10 rounded-full text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              </div>
            </div>
            <div className="mt-4 flex gap-4 text-xs">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary"></span> Hotspot: {hotspotGroupNames.length}</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-secondary"></span> VPN: {vpnGroupNames.length}</span>
            </div>
          </div>
        </div>

        <NasStatusWidget />
      </div>

      {/* BANDWIDTH ANALYTICS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <BandwidthChart />
        </div>
        <TopBandwidthUsers />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* RECENT ACTIVITY */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-header p-6 pb-0 flex justify-between items-center">
            <h2 className="text-xl font-bold">Aktivitas Login Terakhir</h2>
            <div className="badge badge-outline">5 Data Terbaru</div>
          </div>
          <div className="card-body p-0">
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr className="bg-base-200">
                    <th>User</th>
                    <th>Waktu</th>
                    <th>IP Address</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAcct.map((acct, idx) => (
                    <tr key={idx}>
                      <td className="font-bold text-primary">{acct.username}</td>
                      <td className="text-sm">
                        {acct.acctstarttime 
                          ? formatDate(fixPrismaDate(acct.acctstarttime)) 
                          : '-'}
                      </td>
                      <td className="font-mono text-xs">{acct.framedipaddress || '-'}</td>
                    </tr>
                  ))}
                  {recentAcct.length === 0 && (
                    <tr>
                      <td colSpan={3} className="text-center py-8 text-gray-500 italic">Belum ada aktivitas login.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* DISTRIBUTION & QUICK ACTIONS */}
        <div className="space-y-6">
          <div className="card bg-primary text-primary-content shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Link Cepat</h2>
              <p>Kelola layanan RADIUS Anda dengan satu klik.</p>
              <div className="card-actions justify-end mt-4">
                <a href="/radius-users/create/hotspot" className="btn btn-sm btn-ghost bg-white/20 hover:bg-white/30 border-none text-white">Tambah Hotspot</a>
                <a href="/radius-users/create/vpn" className="btn btn-sm btn-ghost bg-white/20 hover:bg-white/30 border-none text-white">Tambah VPN</a>
                <a href="/reports" className="btn btn-sm btn-secondary">Lihat Laporan</a>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title mb-4">Pusat Bantuan</h2>
              <div className="flex items-start gap-4 p-3 bg-base-200 rounded-lg">
                <div className="bg-info text-white p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-sm">Dokumentasi FreeRADIUS</h4>
                  <p className="text-xs text-gray-500">Pelajari lebih lanjut tentang konfigurasi backend FreeRADIUS.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
