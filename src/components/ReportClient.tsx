"use client";

import { useMemo, useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area, Legend
} from 'recharts';
import { formatBytes, formatDate, safeBigInt } from '@/lib/utils';
import DataTable, { type ColumnDef } from './DataTable';
import { 
  getBandwidthUsageReport, 
  getDailyActiveUsersReport, 
  getTopUsageReport 
} from '@/app/actions/reportActions';

type ReportClientProps = {
  usageData: any[];
  loginData: any[];
  nasData: any[];
  distributionData: any[];
  bandwidthData: any[];
  dailyUserData: any[];
  failureData: any[];
  typeData: any[];
  wgData: any;
  yearlyData: any;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const RangeSelector = ({ value, onChange, label }: { value: string, onChange: (val: string) => void, label?: string }) => (
    <div className="flex items-center gap-2">
        {label && <span className="text-xs font-bold opacity-50 uppercase">{label}</span>}
        <div className="join bg-base-100 shadow-sm border border-base-200">
            <button onClick={() => onChange('24h')} className={`join-item btn btn-xs ${value === '24h' ? 'btn-primary' : 'btn-ghost'}`}>24j</button>
            <button onClick={() => onChange('7d')} className={`join-item btn btn-xs ${value === '7d' ? 'btn-primary' : 'btn-ghost'}`}>7h</button>
            <button onClick={() => onChange('30d')} className={`join-item btn btn-xs ${value === '30d' ? 'btn-primary' : 'btn-ghost'}`}>30h</button>
            <button onClick={() => onChange('1y')} className={`join-item btn btn-xs ${value === '1y' ? 'btn-primary' : 'btn-ghost'}`}>1t</button>
        </div>
    </div>
);

export default function ReportClient({ 
  usageData: initialUsageData, 
  loginData, 
  nasData, 
  distributionData, 
  bandwidthData: initialBandwidthData, 
  dailyUserData: initialDailyUserData, 
  failureData, 
  typeData: _typeData, 
  wgData: _wgData, 
  yearlyData 
}: ReportClientProps) {
  const [activeTab, setActiveTab] = useState('summary');
  const [isClient, setIsClient] = useState(false);

  // States for independent chart ranges
  const [bwRange, setBwRange] = useState('30d');
  const [userRange, setUserRange] = useState('30d');
  const [topRange, setTopRange] = useState('30d');

  // Dynamic data states
  const [bwData, setBwData] = useState(initialBandwidthData);
  const [userData, setUserData] = useState(initialDailyUserData);
  const [topData, setTopData] = useState(initialUsageData);

  const [loadingBw, setLoadingBw] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingTop, setLoadingTop] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetching logic for Bandwidth Chart
  useEffect(() => {
    if (!isClient) return;
    const updateBw = async () => {
        setLoadingBw(true);
        const res = await getBandwidthUsageReport(bwRange);
        if (res.success) setBwData(res.data);
        setLoadingBw(false);
    };
    updateBw();
  }, [bwRange, isClient]);

  // Fetching logic for Active Users Chart
  useEffect(() => {
    if (!isClient) return;
    const updateUser = async () => {
        setLoadingUser(true);
        const res = await getDailyActiveUsersReport(userRange);
        if (res.success) setUserData(res.data);
        setLoadingUser(false);
    };
    updateUser();
  }, [userRange, isClient]);

  // Fetching logic for Top Usage Table
  useEffect(() => {
    if (!isClient) return;
    const updateTop = async () => {
        setLoadingTop(true);
        const res = await getTopUsageReport(topRange);
        if (res.success) setTopData(res.data);
        setLoadingTop(false);
    };
    updateTop();
  }, [topRange, isClient]);
  
  const bandwidthChartData = useMemo(() => {
    if (!bwData || !Array.isArray(bwData)) return [];
    return bwData.map(d => ({
        name: bwRange === '1y' 
        ? formatDate(d.date, 'MMM yy')
        : formatDate(d.date, 'dd MMM'),
        upload: Number(safeBigInt(d.upload)) / (1024 * 1024), // to MB
        download: Number(safeBigInt(d.download)) / (1024 * 1024) // to MB
    }));
  }, [bwData, bwRange]);

  const dailyActiveChartData = useMemo(() => {
    if (!userData || !Array.isArray(userData)) return [];
    return userData.map(d => ({
        name: formatDate(d.date, 'dd MMM'),
        users: d.userCount || d.count || 0
    }));
  }, [userData]);

  const recentLoginColumns: ColumnDef<any>[] = [
    { header: "User", accessorKey: "username" },
    { 
      header: "Waktu Login", 
      cell: (log) => formatDate(log.acctstarttime || log.authdate)
    },
    { header: "IP Address", accessorKey: "framedipaddress" },
    { header: "NAS", accessorKey: "nasipaddress" },
  ];

  const authFailureColumns: ColumnDef<any>[] = [
    { header: "User", accessorKey: "username" },
    { 
      header: "Waktu", 
      cell: (log) => formatDate(log.authdate)
    },
    { header: "Alasan", accessorKey: "reply" },
  ];

  const nasActivityColumns: ColumnDef<any>[] = [
    { header: "NAS IP", accessorKey: "nasipaddress" },
    { 
      header: "Total Sesi", 
      cell: (row) => row.total_sessions || row._count?.radacctid || "0"
    },
    { 
      header: "Data Terpakai", 
      cell: (row) => formatBytes(safeBigInt(row.total_input || row._sum?.acctinputoctets) + safeBigInt(row.total_output || row._sum?.acctoutputoctets))
    },
  ];

  if (!isClient) return <div className="p-8 text-center"><span className="loading loading-spinner loading-lg"></span></div>;

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-primary tracking-tight">Laporan & Statistik</h1>
          <p className="text-sm opacity-60">Analisis penggunaan BeeRadius secara mendalam.</p>
        </div>
      </div>

      <div className="tabs tabs-lifted tabs-lg w-full">
        <button className={`tab flex-1 ${activeTab === 'summary' ? 'tab-active font-bold' : ''}`} onClick={() => setActiveTab('summary')}>Ringkasan</button>
        <button className={`tab flex-1 ${activeTab === 'usage' ? 'tab-active font-bold' : ''}`} onClick={() => setActiveTab('usage')}>Penggunaan Data</button>
        <button className={`tab flex-1 ${activeTab === 'groups' ? 'tab-active font-bold' : ''}`} onClick={() => setActiveTab('groups')}>Distribusi Grup</button>
        <button className={`tab flex-1 ${activeTab === 'login' ? 'tab-active font-bold' : ''}`} onClick={() => setActiveTab('login')}>Aktivitas Login</button>
        <button className={`tab flex-1 ${activeTab === 'system' ? 'tab-active font-bold' : ''}`} onClick={() => setActiveTab('system')}>Sistem & NAS</button>
      </div>

      {activeTab === 'summary' && (
        <div className="space-y-8 py-4">
          {/* Top Cards remain same as they are cumulative/summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card bg-base-100 shadow-xl border-l-4 border-primary">
              <div className="card-body p-6">
                <h3 className="text-xs uppercase tracking-wider opacity-50 font-bold">Total Download</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black">{formatBytes(yearlyData?.download || 0).split(' ')[0]}</span>
                  <span className="text-sm opacity-60 font-bold">{formatBytes(yearlyData?.download || 0).split(' ')[1]}</span>
                </div>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl border-l-4 border-secondary">
              <div className="card-body p-6">
                <h3 className="text-xs uppercase tracking-wider opacity-50 font-bold">Total Upload</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black">{formatBytes(yearlyData?.upload || 0).split(' ')[0]}</span>
                  <span className="text-sm opacity-60 font-bold">{formatBytes(yearlyData?.upload || 0).split(' ')[1]}</span>
                </div>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl border-l-4 border-accent">
              <div className="card-body p-6">
                <h3 className="text-xs uppercase tracking-wider opacity-50 font-bold">User Aktif</h3>
                <div className="text-2xl font-black">{initialDailyUserData[initialDailyUserData.length - 1]?.userCount || 0}</div>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl border-l-4 border-warning">
              <div className="card-body p-6">
                <h3 className="text-xs uppercase tracking-wider opacity-50 font-bold">Log Gagal</h3>
                <div className="text-2xl font-black text-error">{failureData?.length || 0}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card bg-base-100 shadow-xl p-4 relative">
                {loadingBw && <div className="absolute inset-0 bg-base-100/50 z-10 flex items-center justify-center"><span className="loading loading-spinner"></span></div>}
                <div className="flex justify-between items-center mb-4 px-2">
                    <h2 className="text-lg font-bold">Tren Bandwidth</h2>
                    <RangeSelector value={bwRange} onChange={setBwRange} />
                </div>
                <div className="h-[300px] w-full min-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={300}>
                    <AreaChart data={bandwidthChartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" tick={{fontSize: 10}} />
                      <YAxis tick={{fontSize: 10}} />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="download" stroke="#0088FE" fill="#0088FE" fillOpacity={0.1} name="Download (MB)" />
                      <Area type="monotone" dataKey="upload" stroke="#00C49F" fill="#00C49F" fillOpacity={0.1} name="Upload (MB)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
            </div>
            <div className="card bg-base-100 shadow-xl p-4 relative">
                {loadingUser && <div className="absolute inset-0 bg-base-100/50 z-10 flex items-center justify-center"><span className="loading loading-spinner"></span></div>}
                <div className="flex justify-between items-center mb-4 px-2">
                    <h2 className="text-lg font-bold">Tren User Aktif</h2>
                    <RangeSelector value={userRange} onChange={setUserRange} />
                </div>
                <div className="h-[300px] w-full min-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={300}>
                    <BarChart data={dailyActiveChartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" tick={{fontSize: 10}} />
                      <YAxis tick={{fontSize: 10}} />
                      <Tooltip />
                      <Bar dataKey="users" fill="#8884d8" radius={[4, 4, 0, 0]} name="Total User" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'usage' && (
        <div className="space-y-8 py-4">
            <div className="card bg-base-100 shadow-xl overflow-hidden relative">
                {loadingTop && <div className="absolute inset-0 bg-base-100/50 z-10 flex items-center justify-center"><span className="loading loading-spinner"></span></div>}
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-lg font-bold">Top Pengguna Data</h2>
                    <RangeSelector value={topRange} onChange={setTopRange} />
                </div>
                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>Upload</th>
                        <th>Download</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(topData || []).map((u, i) => (
                        <tr key={i}>
                          <td className="font-bold">{u.username}</td>
                          <td>{formatBytes(u._sum?.acctinputoctets || u.upload || 0)}</td>
                          <td>{formatBytes(u._sum?.acctoutputoctets || u.download || 0)}</td>
                          <td className="font-bold text-primary">
                            {formatBytes(safeBigInt(u._sum?.acctinputoctets || u.upload) + safeBigInt(u._sum?.acctoutputoctets || u.download))}
                          </td>
                        </tr>
                      ))}
                      {topData.length === 0 && (
                        <tr>
                          <td colSpan={4} className="text-center py-10 opacity-50 italic">Tidak ada data untuk periode ini.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
            </div>
        </div>
      )}

      {activeTab === 'groups' && (
        <div className="space-y-8 py-4">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card bg-base-100 shadow-xl p-4">
                <h2 className="text-lg font-bold mb-4">Grafik Distribusi Grup</h2>
                <div className="h-[350px] w-full min-h-[350px]">
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={350}>
                    <PieChart>
                      <Pie
                        data={distributionData || []}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        dataKey="count"
                        nameKey="groupname"
                        label={({ groupname, percent }: any) => `${groupname}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {(distributionData || []).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
            </div>

            <div className="card bg-base-100 shadow-xl overflow-hidden">
                <div className="p-6 border-b">
                    <h2 className="text-lg font-bold">Detail Distribusi Grup</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Nama Grup</th>
                        <th>Total User</th>
                        <th>Persentase</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        const total = distributionData.reduce((acc, curr) => acc + curr.count, 0);
                        return (distributionData || []).map((g, i) => (
                          <tr key={i}>
                            <td className="opacity-50 text-xs">{i + 1}</td>
                            <td className="font-bold">{g.groupname}</td>
                            <td className="font-mono text-primary">{g.count} User</td>
                            <td>
                              <div className="flex items-center gap-2">
                                <div className="radial-progress text-primary text-[10px]" style={{ "--value": (g.count/total*100), "--size": "2rem" } as any} role="progressbar">
                                  {Math.round(g.count/total*100)}%
                                </div>
                                <progress className="progress progress-primary w-20" value={g.count} max={total}></progress>
                              </div>
                            </td>
                          </tr>
                        ));
                      })()}
                    </tbody>
                    <tfoot className="bg-base-200">
                      <tr>
                        <th colSpan={2} className="text-right">Total Seluruh User:</th>
                        <th className="text-primary text-lg">{distributionData.reduce((acc, curr) => acc + curr.count, 0)} User</th>
                        <th>100%</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'login' && (
        <div className="space-y-8 py-4">
          <div className="card bg-base-100 shadow-xl overflow-hidden">
            <div className="p-6 border-b bg-base-200/50 flex justify-between items-center">
              <h2 className="text-lg font-bold">Log Login Terbaru (Realtime)</h2>
            </div>
            <DataTable data={loginData || []} columns={recentLoginColumns} page={1} pageSize={15} totalPages={1} />
          </div>

          <div className="card bg-base-100 shadow-xl border-t-4 border-error overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-lg font-bold text-error">Percobaan Gagal Terbaru</h2>
            </div>
            <DataTable data={failureData || []} columns={authFailureColumns} page={1} pageSize={10} totalPages={1} />
          </div>
        </div>
      )}

      {activeTab === 'system' && (
        <div className="space-y-8 py-4">
           <div className="card bg-base-100 shadow-xl overflow-hidden">
                <div className="p-6 border-b">
                    <h2 className="text-lg font-bold text-info">Statistik NAS (Router)</h2>
                </div>
                <DataTable data={nasData || []} columns={nasActivityColumns} page={1} pageSize={10} totalPages={1} />
            </div>
        </div>
      )}
    </div>
  );
}
