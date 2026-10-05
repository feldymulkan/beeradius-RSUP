"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaWifi, FaShieldAlt, FaUsers, FaServer, FaPlus, FaFileAlt } from "react-icons/fa";
import BandwidthChart from "@/components/BandwidthChart";
import TopBandwidthUsers from "@/components/TopBandwidthUsers";
import NasStatusWidget from "@/components/NasStatusWidget";
import { formatDate } from "@/lib/utils";

const POLLING_INTERVAL = 15000;

interface LiveStats {
  onlineCount: number;
  hotspotCount: number;
  vpnCount: number;
  staleCount: number;
}

interface ServerData {
  totalHotspot: number;
  totalVpn: number;
  totalNas: number;
  recentSessions: {
    username: string;
    acctstarttime: string | null;
    framedipaddress: string | null;
    nasipaddress: string | null;
  }[];
}

export default function OverviewDashboard({ initialData }: { initialData: ServerData }) {
  const [stats, setStats] = useState<LiveStats>({
    onlineCount: 0,
    hotspotCount: 0,
    vpnCount: 0,
    staleCount: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);
  const [clearing, setClearing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>("");

  const fetchLiveStats = useCallback(async () => {
    try {
      const res = await fetch("/api/radius/users/online-users");
      if (!res.ok) return;
      const data = await res.json();
      setStats({
        onlineCount: data.onlineCount || 0,
        hotspotCount: data.hotspotCount || 0,
        vpnCount: data.vpnCount || 0,
        staleCount: data.staleCount || 0,
      });
      setLastRefreshed(new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    } catch (e) {
      console.error("Failed to fetch live stats:", e);
    } finally {
      setLoadingStats(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveStats();
    const interval = setInterval(fetchLiveStats, POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchLiveStats]);

  const handleClearStale = async () => {
    setClearing(true);
    const toastId = toast.loading("Membersihkan sesi gantung...");
    try {
      const res = await fetch("/api/radius/users/online-users/clear-stale", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success(data.message, { id: toastId });
      fetchLiveStats();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Gagal membersihkan sesi", { id: toastId });
    } finally {
      setClearing(false);
    }
  };

  const totalRegisteredUsers = initialData.totalHotspot + initialData.totalVpn;

  return (
    <div className="space-y-8">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-sm text-slate-400">
            Monitoring telemetri &amp; infrastruktur RADIUS RSUD NTB secara real-time.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {lastRefreshed && (
            <span className="font-mono text-xs text-slate-500 bg-base-100/60 border border-primary/10 px-3 py-1.5 rounded-lg">
              Sinkron: {lastRefreshed}
            </span>
          )}
          <div className="flex gap-2">
            <Link href="/radius-users/create/hotspot" className="btn btn-primary btn-sm gap-1.5 font-medium">
              <FaPlus className="text-xs" /> Hotspot
            </Link>
            <Link href="/radius-users/create/vpn" className="btn btn-secondary btn-sm gap-1.5 font-medium">
              <FaPlus className="text-xs" /> VPN
            </Link>
          </div>
        </div>
      </div>

      {/* 4 KPI METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Online Users */}
        <div className="card relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
          <div className="card-body p-5 gap-1.5">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] font-semibold tracking-[0.08em] uppercase text-slate-400">Sesi Online</p>
              <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                <span className="status-dot" /> Live
              </span>
            </div>
            <p className="font-mono text-4xl font-bold tracking-tight">
              {loadingStats ? <span className="loading loading-spinner loading-md text-primary" /> : stats.onlineCount}
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono pt-1">
              <span className="flex items-center gap-1"><FaWifi className="text-primary text-[10px]" /> {stats.hotspotCount} Hotspot</span>
              <span className="flex items-center gap-1"><FaShieldAlt className="text-secondary text-[10px]" /> {stats.vpnCount} VPN</span>
            </div>
          </div>
        </div>

        {/* Card 2: Total Registered Accounts */}
        <div className="card relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-secondary/50 to-transparent" />
          <div className="card-body p-5 gap-1.5">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] font-semibold tracking-[0.08em] uppercase text-slate-400">Total Akun</p>
              <FaUsers className="text-secondary text-sm" />
            </div>
            <p className="font-mono text-4xl font-bold tracking-tight">{totalRegisteredUsers}</p>
            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono pt-1">
              <span>{initialData.totalHotspot} Hotspot</span>
              <span>·</span>
              <span>{initialData.totalVpn} VPN</span>
            </div>
          </div>
        </div>

        {/* Card 3: Router NAS Gateways */}
        <div className="card relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent" />
          <div className="card-body p-5 gap-1.5">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] font-semibold tracking-[0.08em] uppercase text-slate-400">Router NAS</p>
              <FaServer className="text-accent text-sm" />
            </div>
            <p className="font-mono text-4xl font-bold tracking-tight">{initialData.totalNas}</p>
            <p className="text-xs text-slate-400 font-mono pt-1">
              Gateway terhubung ke FreeRADIUS
            </p>
          </div>
        </div>

        {/* Card 4: Stale Sessions */}
        <div className="card relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-warning/50 to-transparent" />
          <div className="card-body p-5 gap-1.5">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] font-semibold tracking-[0.08em] uppercase text-slate-400">Sesi Gantung</p>
              {stats.staleCount > 0 && <span className="badge badge-warning badge-xs font-mono">Perlu Clean</span>}
            </div>
            <div className="flex items-baseline justify-between">
              <p className={`font-mono text-4xl font-bold tracking-tight ${stats.staleCount > 0 ? "text-warning" : ""}`}>
                {loadingStats ? <span className="loading loading-spinner loading-md text-warning" /> : stats.staleCount}
              </p>
              {stats.staleCount > 0 && (
                <button
                  className="btn btn-warning btn-xs font-mono"
                  onClick={handleClearStale}
                  disabled={clearing}
                >
                  {clearing ? <span className="loading loading-spinner loading-xs" /> : "Bersihkan"}
                </button>
              )}
            </div>
            <p className="text-xs text-slate-400 font-mono pt-1">
              Idle &gt; 15 menit tanpa update
            </p>
          </div>
        </div>
      </div>

      {/* TELEMETRY ROW: BANDWIDTH CHART + TOP CONSUMPTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BandwidthChart />
        </div>
        <div className="lg:col-span-1">
          <TopBandwidthUsers />
        </div>
      </div>

      {/* INFRASTRUCTURE ROW: ROUTER HEALTH + RECENT SESSIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Router NAS Status */}
        <NasStatusWidget />

        {/* Recent Session Log */}
        <div className="card relative overflow-hidden h-full">
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />
          <div className="card-body p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-mono text-[10px] font-semibold tracking-[0.08em] uppercase text-slate-400">Autentikasi Terbaru</p>
                  <h3 className="text-base font-bold tracking-tight">Sesi Login Terakhir</h3>
                </div>
                <span className="badge badge-sm badge-ghost font-mono text-[10px] text-slate-400">5 Terakhir</span>
              </div>

              <div className="overflow-x-auto">
                <table className="table w-full text-xs">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Waktu Login</th>
                      <th>Framed IP</th>
                      <th>NAS IP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {initialData.recentSessions.map((session, idx) => (
                      <tr key={idx} className="hover">
                        <td className="font-medium text-base-content">{session.username}</td>
                        <td className="font-mono text-[11px] text-slate-400">
                          {session.acctstarttime ? formatDate(new Date(session.acctstarttime)) : "-"}
                        </td>
                        <td className="font-mono text-[11px] text-primary">{session.framedipaddress || "-"}</td>
                        <td className="font-mono text-[11px] text-slate-400">{session.nasipaddress || "-"}</td>
                      </tr>
                    ))}
                    {initialData.recentSessions.length === 0 && (
                      <tr>
                        <td colSpan={4} className="text-center py-8 text-slate-500 italic">
                          Belum ada aktivitas login tercatat.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="pt-3 border-t border-primary/10 flex justify-between items-center text-xs">
              <span className="text-slate-500 font-mono text-[11px]">Log Radacct FreeRADIUS</span>
              <Link href="/reports" className="text-primary hover:text-primary-focus font-mono inline-flex items-center gap-1 transition-colors">
                <FaFileAlt className="text-xs" /> Buka Laporan Lengkap →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
