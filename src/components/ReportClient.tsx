"use client";

import { useMemo, useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Legend,
} from "recharts";
import { formatBytes, formatDate, safeBigInt } from "@/lib/utils";
import DataTable, { type ColumnDef } from "./DataTable";
import {
  getBandwidthUsageReport,
  getDailyActiveUsersReport,
  getTopUsageReport,
} from "@/app/actions/reportActions";
import {
  FaChartPie,
  FaDatabase,
  FaLayerGroup,
  FaHistory,
  FaServer,
  FaDownload,
  FaUpload,
  FaUsers,
  FaExclamationTriangle,
  FaWifi,
  FaNetworkWired,
  FaCrown,
} from "react-icons/fa";

type ReportClientProps = {
  usageData: any[];
  loginData: any[];
  nasData: any[];
  distributionData: any[];
  bandwidthData: any[];
  dailyUserData: any[];
  failureData: any[];
  typeData: any[];
  wgData: { totalPeers?: number; totalMikrotik?: number };
  yearlyData: { upload?: number | string | bigint; download?: number | string | bigint };
};

const CHART_COLORS = [
  "#38bdf8", // Cyan
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#818cf8", // Indigo
  "#f43f5e", // Rose
  "#06b6d4", // Sky
  "#ec4899", // Pink
  "#a855f7", // Purple
];

const RangeSelector = ({
  value,
  onChange,
  disabled = false,
}: {
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}) => {
  const options = [
    { id: "24h", label: "24j" },
    { id: "7d", label: "7h" },
    { id: "30d", label: "30h" },
    { id: "1y", label: "1t" },
  ];

  return (
    <div className="inline-flex items-center p-0.5 rounded-lg bg-base-300/40 border border-primary/10 text-xs font-mono">
      {options.map((opt) => {
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            disabled={disabled}
            onClick={() => onChange(opt.id)}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all duration-150 ${
              active
                ? "bg-primary text-slate-900 shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-base-100/40"
            } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};

// Custom dark glass tooltips for Recharts
const CustomAreaTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0f172a]/95 backdrop-blur-xl border border-primary/20 rounded-xl p-3 shadow-2xl text-xs font-mono">
        <p className="font-semibold text-slate-200 mb-2 pb-1 border-b border-white/10 flex items-center justify-between gap-4">
          <span className="text-[10px] uppercase text-slate-400">Periode</span>
          <span className="text-cyan-400">{label}</span>
        </p>
        {payload.map((entry: any, index: number) => (
          <div key={`entry-${index}`} className="flex items-center justify-between gap-6 py-0.5">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              {entry.name}:
            </span>
            <span className="font-bold text-white">
              {typeof entry.value === "number" ? entry.value.toFixed(2) : entry.value} MB
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0f172a]/95 backdrop-blur-xl border border-primary/20 rounded-xl p-3 shadow-2xl text-xs font-mono">
        <p className="font-semibold text-slate-200 mb-2 pb-1 border-b border-white/10 flex items-center justify-between gap-4">
          <span className="text-[10px] uppercase text-slate-400">Tanggal</span>
          <span className="text-amber-400">{label}</span>
        </p>
        {payload.map((entry: any, index: number) => (
          <div key={`entry-${index}`} className="flex items-center justify-between gap-6 py-0.5">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              User Aktif:
            </span>
            <span className="font-bold text-white font-mono">{entry.value} Klien</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0];
    return (
      <div className="bg-[#0f172a]/95 backdrop-blur-xl border border-primary/20 rounded-xl p-2.5 shadow-2xl text-xs font-mono">
        <p className="font-semibold text-slate-200 border-b border-white/10 pb-1 mb-1.5">
          {item.name}
        </p>
        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-400">Total Pengguna:</span>
          <span className="font-bold text-cyan-400">{item.value} User</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function ReportClient({
  usageData: initialUsageData,
  loginData,
  nasData,
  distributionData,
  bandwidthData: initialBandwidthData,
  dailyUserData: initialDailyUserData,
  failureData,
  typeData,
  wgData,
  yearlyData,
}: ReportClientProps) {
  const [activeTab, setActiveTab] = useState("summary");
  const [isClient, setIsClient] = useState(false);

  // States for independent chart ranges
  const [bwRange, setBwRange] = useState("30d");
  const [userRange, setUserRange] = useState("30d");
  const [topRange, setTopRange] = useState("30d");

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
    return bwData.map((d) => ({
      name:
        bwRange === "1y"
          ? formatDate(d.date, "MMM yy")
          : formatDate(d.date, "dd MMM"),
      upload: Number(safeBigInt(d.upload)) / (1024 * 1024), // to MB
      download: Number(safeBigInt(d.download)) / (1024 * 1024), // to MB
    }));
  }, [bwData, bwRange]);

  const dailyActiveChartData = useMemo(() => {
    if (!userData || !Array.isArray(userData)) return [];
    return userData.map((d) => ({
      name: formatDate(d.date, "dd MMM"),
      users: d.userCount || d.count || 0,
    }));
  }, [userData]);

  // Compute breakdown stats
  const hotspotCount = useMemo(() => {
    return typeData?.find((t) => t.type === "hotspot")?.count || 0;
  }, [typeData]);

  const vpnCount = useMemo(() => {
    return typeData?.find((t) => t.type === "vpn")?.count || 0;
  }, [typeData]);

  const totalUsersCount = useMemo(() => {
    return distributionData.reduce((acc, curr) => acc + (curr.count || 0), 0);
  }, [distributionData]);

  const totalDlNumber = useMemo(() => {
    return Number(safeBigInt(yearlyData?.download || 0));
  }, [yearlyData]);

  const totalUlNumber = useMemo(() => {
    return Number(safeBigInt(yearlyData?.upload || 0));
  }, [yearlyData]);

  const trafficRatio = useMemo(() => {
    if (!totalUlNumber) return "1.0:1";
    return `${(totalDlNumber / totalUlNumber).toFixed(1)}:1`;
  }, [totalDlNumber, totalUlNumber]);

  // Columns for DataTable tabs
  const recentLoginColumns: ColumnDef<any>[] = [
    {
      header: "User",
      accessorKey: "username",
      cell: (log) => <span className="font-semibold text-white">{log.username}</span>,
    },
    {
      header: "Waktu Login",
      cell: (log) => (
        <span className="font-mono text-xs text-slate-300">
          {formatDate(log.acctstarttime || log.authdate)}
        </span>
      ),
    },
    {
      header: "IP Address",
      cell: (log) => (
        <span className="font-mono text-xs text-cyan-400">
          {log.framedipaddress || "-"}
        </span>
      ),
    },
    {
      header: "NAS IP",
      cell: (log) => (
        <span className="font-mono text-xs text-slate-400">
          {log.nasipaddress || "-"}
        </span>
      ),
    },
  ];

  const authFailureColumns: ColumnDef<any>[] = [
    {
      header: "User",
      accessorKey: "username",
      cell: (log) => <span className="font-semibold text-white">{log.username}</span>,
    },
    {
      header: "Waktu",
      cell: (log) => (
        <span className="font-mono text-xs text-slate-300">
          {formatDate(log.authdate)}
        </span>
      ),
    },
    {
      header: "Alasan Penolakan",
      cell: (log) => (
        <span className="badge badge-error badge-sm font-mono text-[11px] bg-rose-950/40 text-rose-400 border-rose-500/20">
          {log.reply || "Access-Reject"}
        </span>
      ),
    },
  ];

  const nasActivityColumns: ColumnDef<any>[] = [
    {
      header: "NAS IP Address",
      cell: (row) => (
        <span className="font-mono font-semibold text-cyan-400">
          {row.nasipaddress || "-"}
        </span>
      ),
    },
    {
      header: "Total Sesi",
      cell: (row) => (
        <span className="font-mono font-medium text-white">
          {row.total_sessions || row._count?.radacctid || "0"}
        </span>
      ),
    },
    {
      header: "Data Terpakai",
      cell: (row) => (
        <span className="font-mono font-semibold text-primary">
          {formatBytes(
            safeBigInt(row.total_input || row._sum?.acctinputoctets) +
              safeBigInt(row.total_output || row._sum?.acctoutputoctets)
          )}
        </span>
      ),
    },
  ];

  const TABS = [
    { id: "summary", label: "Ringkasan", icon: FaChartPie },
    { id: "usage", label: "Penggunaan Data", icon: FaDatabase },
    { id: "groups", label: "Distribusi Grup", icon: FaLayerGroup },
    { id: "login", label: "Aktivitas Login", icon: FaHistory },
    { id: "system", label: "Sistem & NAS", icon: FaServer },
  ];

  if (!isClient) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-3">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">
          Memuat Telemetri BeeRadius...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Laporan & Statistik
            </h1>
            <span className="badge badge-primary badge-sm font-mono text-[10px] font-semibold bg-primary/20 text-primary border border-primary/30">
              Live Telemetry
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Analisis performa throughput bandwidth, distribusi kuota, dan statistik autentikasi RADIUS RSUD NTB.
          </p>
        </div>
      </div>

      {/* Single-Row Unified Dark Glass Navigation Toolbar */}
      <div className="bg-base-100/90 backdrop-blur-xl border border-primary/10 rounded-xl p-2 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-lg">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-primary/20 text-primary border border-primary/30 shadow-[0_0_12px_rgba(56,189,248,0.2)] font-semibold"
                    : "text-slate-400 hover:text-white hover:bg-base-200/50"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Status Telemetry Pill */}
        <div className="flex items-center gap-2 self-end md:self-center px-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            FreeRADIUS Synchronized
          </span>
        </div>
      </div>

      {/* TAB 1: SUMMARY */}
      {activeTab === "summary" && (
        <div className="space-y-6">
          {/* 4 High-Impact Metric KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Download */}
            <div className="border-l-4 border-l-cyan-400 bg-base-100/90 backdrop-blur-xl border border-primary/10 rounded-xl p-5 shadow-lg relative overflow-hidden group hover:border-cyan-500/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-semibold tracking-wider text-slate-400 uppercase">
                  TOTAL DOWNLOAD
                </span>
                <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                  <FaDownload className="h-3.5 w-3.5" />
                </div>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl lg:text-3xl font-mono font-bold text-white tracking-tight">
                  {formatBytes(yearlyData?.download || 0).split(" ")[0]}
                </span>
                <span className="text-xs font-mono font-semibold text-cyan-400">
                  {formatBytes(yearlyData?.download || 0).split(" ")[1]}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                Akumulasi trafik Rx tahun berjalan
              </p>
            </div>

            {/* Total Upload */}
            <div className="border-l-4 border-l-emerald-400 bg-base-100/90 backdrop-blur-xl border border-primary/10 rounded-xl p-5 shadow-lg relative overflow-hidden group hover:border-emerald-500/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-semibold tracking-wider text-slate-400 uppercase">
                  TOTAL UPLOAD
                </span>
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <FaUpload className="h-3.5 w-3.5" />
                </div>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl lg:text-3xl font-mono font-bold text-white tracking-tight">
                  {formatBytes(yearlyData?.upload || 0).split(" ")[0]}
                </span>
                <span className="text-xs font-mono font-semibold text-emerald-400">
                  {formatBytes(yearlyData?.upload || 0).split(" ")[1]}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                Akumulasi trafik Tx tahun berjalan
              </p>
            </div>

            {/* Active Users */}
            <div className="border-l-4 border-l-amber-400 bg-base-100/90 backdrop-blur-xl border border-primary/10 rounded-xl p-5 shadow-lg relative overflow-hidden group hover:border-amber-500/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-semibold tracking-wider text-slate-400 uppercase">
                  USER AKTIF HARIAN
                </span>
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <FaUsers className="h-3.5 w-3.5" />
                </div>
              </div>
              <div className="text-2xl lg:text-3xl font-mono font-bold text-white tracking-tight">
                {(initialDailyUserData[initialDailyUserData.length - 1]?.userCount || 0).toLocaleString()}
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                {hotspotCount} Hotspot · {vpnCount} VPN terdaftar
              </p>
            </div>

            {/* Auth Failures */}
            <div className="border-l-4 border-l-rose-500 bg-base-100/90 backdrop-blur-xl border border-primary/10 rounded-xl p-5 shadow-lg relative overflow-hidden group hover:border-rose-500/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-semibold tracking-wider text-slate-400 uppercase">
                  AUTH REJECTS / GAGAL
                </span>
                <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
                  <FaExclamationTriangle className="h-3.5 w-3.5" />
                </div>
              </div>
              <div className="text-2xl lg:text-3xl font-mono font-bold text-rose-400 tracking-tight">
                {failureData?.length || 0}
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                Percobaan autentikasi ditolak
              </p>
            </div>
          </div>

          {/* 2 Telemetry Charts Side-by-Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bandwidth Chart */}
            <div className="bg-base-100/90 backdrop-blur-xl border border-primary/10 rounded-xl p-5 shadow-xl relative">
              {loadingBw && (
                <div className="absolute inset-0 bg-base-100/60 backdrop-blur-xs z-10 flex items-center justify-center rounded-xl">
                  <span className="loading loading-spinner text-primary"></span>
                </div>
              )}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    Tren Bandwidth & Throughput
                  </h2>
                  <p className="text-xs text-slate-400">
                    Agregat Rx (Download) & Tx (Upload) MikroTik
                  </p>
                </div>
                <RangeSelector value={bwRange} onChange={setBwRange} disabled={loadingBw} />
              </div>
              <div className="h-[300px] w-full min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={300}>
                  <AreaChart data={bandwidthChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="downloadGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="uploadGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} vertical={false} />
                    <XAxis
                      dataKey="name"
                      stroke="#64748b"
                      tick={{ fill: "#94a3b8", fontSize: 11, fontFamily: "monospace" }}
                    />
                    <YAxis
                      stroke="#64748b"
                      tick={{ fill: "#94a3b8", fontSize: 11, fontFamily: "monospace" }}
                    />
                    <Tooltip content={<CustomAreaTooltip />} />
                    <Legend
                      verticalAlign="top"
                      height={36}
                      formatter={(val) => <span className="text-xs font-mono text-slate-300">{val}</span>}
                    />
                    <Area
                      type="monotone"
                      dataKey="download"
                      stroke="#38bdf8"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#downloadGradient)"
                      name="Download (MB)"
                    />
                    <Area
                      type="monotone"
                      dataKey="upload"
                      stroke="#10b981"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#uploadGradient)"
                      name="Upload (MB)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Active User Chart */}
            <div className="bg-base-100/90 backdrop-blur-xl border border-primary/10 rounded-xl p-5 shadow-xl relative">
              {loadingUser && (
                <div className="absolute inset-0 bg-base-100/60 backdrop-blur-xs z-10 flex items-center justify-center rounded-xl">
                  <span className="loading loading-spinner text-primary"></span>
                </div>
              )}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    Tren User Aktif & Sesi
                  </h2>
                  <p className="text-xs text-slate-400">
                    Jumlah user login harian terotentikasi
                  </p>
                </div>
                <RangeSelector value={userRange} onChange={setUserRange} disabled={loadingUser} />
              </div>
              <div className="h-[300px] w-full min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={300}>
                  <BarChart data={dailyActiveChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} vertical={false} />
                    <XAxis
                      dataKey="name"
                      stroke="#64748b"
                      tick={{ fill: "#94a3b8", fontSize: 11, fontFamily: "monospace" }}
                    />
                    <YAxis
                      stroke="#64748b"
                      tick={{ fill: "#94a3b8", fontSize: 11, fontFamily: "monospace" }}
                    />
                    <Tooltip content={<CustomBarTooltip />} />
                    <Legend
                      verticalAlign="top"
                      height={36}
                      formatter={(val) => <span className="text-xs font-mono text-slate-300">{val}</span>}
                    />
                    <Bar
                      dataKey="users"
                      fill="#818cf8"
                      radius={[4, 4, 0, 0]}
                      name="Total User Aktif"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Bottom Telemetry Insight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Tipe Akun Breakdown */}
            <div className="bg-base-100/90 backdrop-blur-xl border border-primary/10 rounded-xl p-5 shadow-lg">
              <h3 className="text-xs font-mono font-semibold tracking-wider text-slate-400 uppercase mb-3 flex items-center justify-between">
                <span>DISTRIBUSI TIPE AKUN</span>
                <FaWifi className="text-primary h-3.5 w-3.5" />
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      Hotspot
                    </span>
                    <span className="font-bold text-white">
                      {hotspotCount} ({totalUsersCount > 0 ? ((hotspotCount / totalUsersCount) * 100).toFixed(0) : 0}%)
                    </span>
                  </div>
                  <progress
                    className="progress progress-primary h-1.5 w-full bg-slate-800"
                    value={hotspotCount}
                    max={totalUsersCount || 1}
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      VPN (WireGuard / PPP)
                    </span>
                    <span className="font-bold text-white">
                      {vpnCount} ({totalUsersCount > 0 ? ((vpnCount / totalUsersCount) * 100).toFixed(0) : 0}%)
                    </span>
                  </div>
                  <progress
                    className="progress progress-success h-1.5 w-full bg-slate-800"
                    value={vpnCount}
                    max={totalUsersCount || 1}
                  />
                </div>
              </div>
            </div>

            {/* Infrastruktur Jaringan */}
            <div className="bg-base-100/90 backdrop-blur-xl border border-primary/10 rounded-xl p-5 shadow-lg">
              <h3 className="text-xs font-mono font-semibold tracking-wider text-slate-400 uppercase mb-3 flex items-center justify-between">
                <span>INFRASTRUKTUR GATEWAY</span>
                <FaNetworkWired className="text-emerald-400 h-3.5 w-3.5" />
              </h3>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-2.5 rounded-lg bg-base-200/50 border border-primary/5">
                  <p className="text-[10px] font-mono text-slate-400 uppercase">NAS Router</p>
                  <p className="text-xl font-mono font-bold text-cyan-400 mt-0.5">{nasData?.length || 0}</p>
                  <p className="text-[10px] text-slate-500">Router aktif</p>
                </div>
                <div className="p-2.5 rounded-lg bg-base-200/50 border border-primary/5">
                  <p className="text-[10px] font-mono text-slate-400 uppercase">WG Peers</p>
                  <p className="text-xl font-mono font-bold text-emerald-400 mt-0.5">{wgData?.totalPeers || 0}</p>
                  <p className="text-[10px] text-slate-500">Client terdaftar</p>
                </div>
              </div>
            </div>

            {/* Rasio Trafik Data */}
            <div className="bg-base-100/90 backdrop-blur-xl border border-primary/10 rounded-xl p-5 shadow-lg">
              <h3 className="text-xs font-mono font-semibold tracking-wider text-slate-400 uppercase mb-3 flex items-center justify-between">
                <span>RASIO TRAFIK THROUGHPUT</span>
                <FaDatabase className="text-amber-400 h-3.5 w-3.5" />
              </h3>
              <div className="flex items-center justify-between py-1">
                <div>
                  <p className="text-2xl font-mono font-bold text-white tracking-tight">{trafficRatio}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Rasio Download vs Upload</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-semibold text-primary">
                    {formatBytes(safeBigInt(yearlyData?.download) + safeBigInt(yearlyData?.upload))}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-0.5">Total Trafik Akumulatif</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DATA USAGE */}
      {activeTab === "usage" && (
        <div className="space-y-6">
          <div className="bg-base-100/90 backdrop-blur-xl border border-primary/10 rounded-xl overflow-hidden shadow-xl relative">
            {loadingTop && (
              <div className="absolute inset-0 bg-base-100/60 backdrop-blur-xs z-10 flex items-center justify-center">
                <span className="loading loading-spinner text-primary"></span>
              </div>
            )}
            <div className="p-5 border-b border-primary/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-white">Top Pengguna Data Kuota</h2>
                <p className="text-xs text-slate-400">
                  Peringkat konsumsi kuota bandwidth berdasarkan log akuntansi RADIUS
                </p>
              </div>
              <RangeSelector value={topRange} onChange={setTopRange} disabled={loadingTop} />
            </div>

            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="bg-[#0f172a] text-[11px] font-mono uppercase tracking-wider text-slate-400 border-b border-primary/10">
                    <th className="w-16 text-center">Rank</th>
                    <th>Username</th>
                    <th>Upload (Tx)</th>
                    <th>Download (Rx)</th>
                    <th>Total Bandwidth</th>
                    <th className="w-48">Porsi Konsumsi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5">
                  {(() => {
                    const maxUsage = topData?.[0]
                      ? safeBigInt(topData[0]._sum?.acctinputoctets || topData[0].upload) +
                        safeBigInt(topData[0]._sum?.acctoutputoctets || topData[0].download)
                      : BigInt(1);

                    return (topData || []).map((u, i) => {
                      const totalBytes =
                        safeBigInt(u._sum?.acctinputoctets || u.upload) +
                        safeBigInt(u._sum?.acctoutputoctets || u.download);
                      const percentOfMax = maxUsage > BigInt(0) ? Number((totalBytes * BigInt(100)) / maxUsage) : 0;

                      return (
                        <tr key={i} className="hover:bg-primary/5 transition-colors">
                          <td className="text-center font-mono">
                            {i === 0 ? (
                              <span className="badge badge-warning badge-sm font-bold gap-1">
                                <FaCrown className="h-2.5 w-2.5" /> 1
                              </span>
                            ) : i === 1 ? (
                              <span className="badge badge-neutral badge-sm font-bold">2</span>
                            ) : i === 2 ? (
                              <span className="badge badge-ghost badge-sm font-bold">3</span>
                            ) : (
                              <span className="text-slate-500 text-xs">{i + 1}</span>
                            )}
                          </td>
                          <td className="font-semibold text-white">{u.username}</td>
                          <td className="font-mono text-xs text-slate-300">
                            {formatBytes(u._sum?.acctinputoctets || u.upload || 0)}
                          </td>
                          <td className="font-mono text-xs text-slate-300">
                            {formatBytes(u._sum?.acctoutputoctets || u.download || 0)}
                          </td>
                          <td className="font-mono text-xs font-bold text-primary">
                            {formatBytes(totalBytes)}
                          </td>
                          <td>
                            <div className="flex items-center gap-2">
                              <progress
                                className="progress progress-primary h-1.5 flex-1 bg-slate-800"
                                value={percentOfMax}
                                max={100}
                              />
                              <span className="text-[10px] font-mono text-slate-400 w-8 text-right">
                                {percentOfMax}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    });
                  })()}
                  {(!topData || topData.length === 0) && (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-slate-500 italic">
                        Tidak ada data penggunaan untuk periode ini.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: GROUPS DISTRIBUTION */}
      {activeTab === "groups" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart Card */}
            <div className="bg-base-100/90 backdrop-blur-xl border border-primary/10 rounded-xl p-5 shadow-xl">
              <div className="mb-4">
                <h2 className="text-base font-bold text-white">Visualisasi Distribusi Grup</h2>
                <p className="text-xs text-slate-400">
                  Proporsi pengguna aktif per profil grup RADIUS
                </p>
              </div>
              <div className="h-[340px] w-full min-h-[340px]">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={340}>
                  <PieChart>
                    <Pie
                      data={distributionData || []}
                      cx="50%"
                      cy="50%"
                      innerRadius={75}
                      outerRadius={115}
                      paddingAngle={3}
                      dataKey="count"
                      nameKey="groupname"
                    >
                      {(distributionData || []).map((_entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={CHART_COLORS[index % CHART_COLORS.length]}
                          stroke="#0b1326"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomPieTooltip />} />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      formatter={(val) => <span className="text-xs font-mono text-slate-300">{val}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Table Detail Card */}
            <div className="bg-base-100/90 backdrop-blur-xl border border-primary/10 rounded-xl overflow-hidden shadow-xl flex flex-col">
              <div className="p-5 border-b border-primary/10">
                <h2 className="text-base font-bold text-white">Rincian Grup Pengguna</h2>
                <p className="text-xs text-slate-400">
                  Total kuantitas akun pengguna yang terdaftar di masing-masing grup
                </p>
              </div>
              <div className="overflow-x-auto flex-1">
                <table className="table w-full">
                  <thead>
                    <tr className="bg-[#0f172a] text-[11px] font-mono uppercase tracking-wider text-slate-400 border-b border-primary/10">
                      <th className="w-12 text-center">#</th>
                      <th>Nama Grup</th>
                      <th>Total User</th>
                      <th>Proporsi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/5">
                    {(() => {
                      const total = distributionData.reduce((acc, curr) => acc + curr.count, 0);
                      return (distributionData || []).map((g, i) => {
                        const pct = total > 0 ? Math.round((g.count / total) * 100) : 0;
                        const color = CHART_COLORS[i % CHART_COLORS.length];
                        return (
                          <tr key={i} className="hover:bg-primary/5 transition-colors">
                            <td className="text-center font-mono text-slate-500 text-xs">{i + 1}</td>
                            <td className="font-semibold text-white flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                              {g.groupname}
                            </td>
                            <td className="font-mono text-xs font-bold text-primary">
                              {g.count} User
                            </td>
                            <td>
                              <div className="flex items-center gap-2">
                                <progress
                                  className="progress progress-primary h-1.5 flex-1 bg-slate-800"
                                  value={g.count}
                                  max={total || 1}
                                />
                                <span className="font-mono text-[11px] text-slate-400 w-9 text-right font-medium">
                                  {pct}%
                                </span>
                              </div>
                            </td>
                          </tr>
                        );
                      });
                    })()}
                  </tbody>
                  <tfoot className="bg-[#0f172a]/80 font-mono text-xs border-t border-primary/10">
                    <tr>
                      <th colSpan={2} className="text-right text-slate-400">
                        Total Seluruh Pengguna:
                      </th>
                      <th className="text-primary font-bold text-sm">
                        {totalUsersCount} User
                      </th>
                      <th className="text-slate-400">100%</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: LOGIN ACTIVITY */}
      {activeTab === "login" && (
        <div className="space-y-6">
          {/* Recent Logins */}
          <div className="bg-base-100/90 backdrop-blur-xl border border-primary/10 rounded-xl overflow-hidden shadow-xl">
            <div className="p-5 border-b border-primary/10 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <FaHistory className="text-primary h-4 w-4" />
                  Log Login Terbaru (Realtime Sesi)
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  50 riwayat aktivitas autentikasi dan penugasan IP terakhir
                </p>
              </div>
            </div>
            <DataTable
              data={loginData || []}
              columns={recentLoginColumns}
              page={1}
              pageSize={15}
              totalPages={1}
            />
          </div>

          {/* Authentication Failures */}
          <div className="bg-base-100/90 backdrop-blur-xl border border-rose-500/20 border-t-4 border-t-rose-500 rounded-xl overflow-hidden shadow-xl">
            <div className="p-5 border-b border-primary/10 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-rose-400 flex items-center gap-2">
                  <FaExclamationTriangle className="h-4 w-4" />
                  Percobaan Gagal Terbaru (Auth Rejects)
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Daftar insiden penolakan autentikasi FreeRADIUS
                </p>
              </div>
              <span className="badge badge-error badge-sm font-mono text-xs">
                {failureData?.length || 0} Insiden
              </span>
            </div>
            <DataTable
              data={failureData || []}
              columns={authFailureColumns}
              page={1}
              pageSize={10}
              totalPages={1}
            />
          </div>
        </div>
      )}

      {/* TAB 5: SYSTEM & NAS */}
      {activeTab === "system" && (
        <div className="space-y-6">
          {/* NAS Router Stats */}
          <div className="bg-base-100/90 backdrop-blur-xl border border-primary/10 rounded-xl overflow-hidden shadow-xl">
            <div className="p-5 border-b border-primary/10 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-cyan-400 flex items-center gap-2">
                  <FaServer className="h-4 w-4" />
                  Statistik NAS (Router Gateway)
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Volume sesi dan beban throughput yang ditangani oleh masing-masing NAS Client
                </p>
              </div>
            </div>
            <DataTable
              data={nasData || []}
              columns={nasActivityColumns}
              page={1}
              pageSize={10}
              totalPages={1}
            />
          </div>
        </div>
      )}
    </div>
  );
}
