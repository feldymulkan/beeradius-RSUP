"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { FaSync, FaTrashAlt, FaWifi, FaUserClock, FaNetworkWired, FaSearch, FaTimes } from "react-icons/fa";
import { formatDate } from "@/lib/utils";
import DisconnectButton from "@/components/DisconnectButton";

type OnlineUser = {
  radacctid: string;
  username: string;
  framedipaddress: string | null;
  nasipaddress: string;
  acctstarttime: string | null;
  acctupdatetime: string | null;
  isStale: boolean;
  lastLogout: string | null;
};

type ApiResponse = {
  onlineUsers: OnlineUser[];
  total: number;
  totalPages: number;
  currentPage: number;
  totalStaleCount: number;
};

const POLLING_INTERVAL = 15000;

export default function OnlineUserTable() {
  const params = useParams();
  const type = params.type as string; // hotspot or vpn

  const [users, setUsers] = useState<OnlineUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClearing, setIsClearing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // State Pagination, Search & Filter
  const [searchInput, setSearchInput] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("active");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalStaleCount, setTotalStaleCount] = useState(0);

  const fetchOnlineUsers = useCallback(async (pageNum: number, query: string, limitNum: number, status: string) => {
    try {
      const queryParams = new URLSearchParams({
        q: query,
        type: type || "",
        page: pageNum.toString(),
        limit: limitNum.toString(),
      });
      if (status !== "all") {
        queryParams.set("status", status);
      }

      const res = await fetch(`/api/radius/users/online-users/list?${queryParams.toString()}`);
      if (!res.ok) throw new Error("Gagal mengambil data");

      const data: ApiResponse = await res.json();

      setUsers(data.onlineUsers || []);
      setTotalPages(data.totalPages || 1);
      setTotalRecords(data.total || 0);
      setTotalStaleCount(data.totalStaleCount || 0);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  }, [type]);

  // Initial load and refetch on state change
  useEffect(() => {
    fetchOnlineUsers(page, appliedQuery, pageSize, statusFilter);
  }, [page, appliedQuery, pageSize, statusFilter, fetchOnlineUsers]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const q = searchInput.trim();
    setAppliedQuery(q);
    setPage(1);
  };

  const handleSearchClear = () => {
    setSearchInput("");
    setAppliedQuery("");
    setPage(1);
  };

  const handleStatusFilterChange = (newStatus: string) => {
    setStatusFilter(newStatus);
    setPage(1);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(1);
  };

  // Polling interval uses appliedQuery
  useEffect(() => {
    const interval = setInterval(() => {
      fetchOnlineUsers(page, appliedQuery, pageSize, statusFilter);
    }, POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, [page, appliedQuery, pageSize, statusFilter, fetchOnlineUsers]);

  // Realtime clock tick for duration counter
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getExactDuration = (startTime: string | null) => {
    if (!startTime) return "--:--:--";
    try {
      const start = new Date(startTime).getTime();
      const diff = Math.floor((currentTime.getTime() - start) / 1000);

      if (diff < 0) return "00:00:00";

      const hours = Math.floor(diff / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      const seconds = diff % 60;

      return [
        hours.toString().padStart(2, "0"),
        minutes.toString().padStart(2, "0"),
        seconds.toString().padStart(2, "0"),
      ].join(":");
    } catch {
      return "--:--:--";
    }
  };

  const clearStaleSessions = async () => {
    if (!confirm("Apakah Anda yakin ingin membersihkan semua sesi yang menggantung (stale)?")) return;

    setIsClearing(true);
    try {
      const res = await fetch("/api/radius/users/online-users/clear-stale", {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        fetchOnlineUsers(page, appliedQuery, pageSize, statusFilter);
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Gagal membersihkan sesi");
    } finally {
      setIsClearing(false);
    }
  };

  // staleCount di halaman ini untuk badge per halaman, totalStaleCount untuk tombol clear

  const typeLabel = type === "vpn" ? "VPN" : "Hotspot";

  return (
    <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden">
      {/* 1. HEADER UTAMA: Title & Main Action Buttons */}
      <div className="bg-primary/5 px-6 py-4 border-b border-base-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2.5 rounded-lg text-primary-content shadow-xs">
            <FaWifi size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              User Online {typeLabel}
              <span className="badge badge-primary font-mono">{totalRecords}</span>
              {totalStaleCount > 0 && (
                <span className="badge badge-warning badge-sm gap-1 font-mono">
                  <FaUserClock size={10} />
                  {totalStaleCount} Gantung
                </span>
              )}
            </h2>
            <p className="text-xs opacity-60 uppercase tracking-widest font-bold">
              Monitor Koneksi Realtime
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* REFRESH */}
          <button
            onClick={() => fetchOnlineUsers(page, appliedQuery, pageSize, statusFilter)}
            className="btn btn-sm btn-ghost border border-base-300 gap-1.5"
            title="Refresh data"
          >
            <FaSync className={isLoading ? "animate-spin text-primary" : ""} />
            <span className="hidden md:inline text-xs">Refresh</span>
          </button>

          {/* CLEAR STALE */}
          {totalStaleCount > 0 && (
            <button
              onClick={clearStaleSessions}
              disabled={isClearing}
              className={`btn btn-sm btn-error gap-1.5 ${isClearing ? "loading" : ""}`}
              title="Bersihkan semua sesi gantung"
            >
              {!isClearing && <FaTrashAlt />}
              <span>Clear {totalStaleCount} Stale</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. UNIFIED FILTER & SEARCH TOOLBAR */}
      <div className="bg-base-200/50 px-6 py-3 border-b border-base-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Status Filter Segmented & Page Size */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex gap-1 bg-base-100 p-1 rounded-lg border border-base-300">
            <button
              onClick={() => handleStatusFilterChange("all")}
              className={`btn btn-xs ${statusFilter === "all" ? "btn-primary font-semibold" : "btn-ghost text-slate-400"}`}
            >
              Semua
            </button>
            <button
              onClick={() => handleStatusFilterChange("active")}
              className={`btn btn-xs ${statusFilter === "active" ? "btn-success font-semibold" : "btn-ghost text-slate-400"}`}
            >
              Aktif
            </button>
            <button
              onClick={() => handleStatusFilterChange("stale")}
              className={`btn btn-xs ${statusFilter === "stale" ? "btn-warning font-semibold" : "btn-ghost text-slate-400"}`}
            >
              Gantung
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <span className="hidden sm:inline">Ukuran:</span>
            <select
              className="select select-sm bg-base-100 border border-base-300 text-xs rounded-lg"
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            >
              <option value="10">10 / hal</option>
              <option value="20">20 / hal</option>
              <option value="50">50 / hal</option>
              <option value="100">100 / hal</option>
            </select>
          </div>
        </div>

        {/* Right: Search Input Form + Active Filter Tag */}
        <div className="flex flex-wrap items-center gap-2">
          {/* SEARCH FORM WITH CARI BUTTON */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-1.5 w-full sm:w-auto">
            <div className="relative w-full sm:w-56">
              <span className="absolute inset-y-0 left-2.5 flex items-center text-base-content/40 pointer-events-none">
                <FaSearch size={11} />
              </span>
              <input
                type="text"
                placeholder="Cari Username / IP..."
                className="input input-sm bg-base-100 border border-base-300 w-full pl-8 pr-7 text-xs rounded-lg focus:border-primary focus:outline-none"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={handleSearchClear}
                  className="absolute inset-y-0 right-2 flex items-center text-base-content/40 hover:text-error cursor-pointer"
                  title="Hapus pencarian"
                >
                  <FaTimes size={10} />
                </button>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-sm btn-primary text-xs px-2.5 shadow-xs gap-1 font-medium flex items-center shrink-0 cursor-pointer"
              title="Terapkan pencarian (Enter)"
            >
              <FaSearch size={10} />
              <span>Cari</span>
            </button>
          </form>

          {/* APPLIED QUERY TAG */}
          {appliedQuery && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary/10 border border-primary/30 text-primary text-[11px] font-mono font-semibold">
              <span>Hasil:</span>
              <span className="max-w-[100px] truncate">"{appliedQuery}"</span>
              <button
                type="button"
                onClick={handleSearchClear}
                className="hover:text-rose-400 ml-0.5 cursor-pointer text-xs"
                title="Hapus filter pencarian"
              >
                ×
              </button>
            </span>
          )}
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto min-h-[400px]">
        {isLoading && users.length === 0 ? (
          <div className="flex justify-center items-center h-48">
            <div className="flex flex-col items-center gap-2">
              <span className="loading loading-spinner loading-lg text-primary"></span>
              <p className="text-sm opacity-50">Menghubungkan ke RADIUS...</p>
            </div>
          </div>
        ) : users.length > 0 ? (
          <table className="table table-zebra w-full">
            <thead className="bg-base-200/50">
              <tr>
                <th className="w-12">#</th>
                <th>Username</th>
                <th>IP Address</th>
                <th>Router (NAS)</th>
                <th>Durasi Online</th>
                <th>Login Sejak</th>
                <th>Last Logout</th>
                <th>Status</th>
                <th className="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                const rowNumber = (page - 1) * pageSize + index + 1;
                return (
                  <tr key={user.radacctid} className="hover group">
                    <td className="opacity-50 text-xs">{rowNumber}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-base-300 flex items-center justify-center font-bold text-xs">
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-bold text-primary">{user.username}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <FaNetworkWired className="opacity-30" />
                        {user.framedipaddress || "N/A"}
                      </div>
                    </td>
                    <td className="text-gray-500 text-sm">{user.nasipaddress}</td>
                    <td>
                      <div className={`flex items-center gap-2 font-mono font-bold px-2 py-1 rounded w-fit ${
                        user.isStale 
                          ? "text-warning bg-warning/10" 
                          : "text-success bg-success/10"
                      }`}>
                        <FaUserClock size={12} />
                        {getExactDuration(user.acctstarttime)}
                      </div>
                    </td>
                    <td>
                      <span className="text-xs opacity-70">
                        {user.acctstarttime ? formatDate(user.acctstarttime, "dd MMM, HH:mm") : "-"}
                      </span>
                    </td>
                    <td>
                      <span className="text-xs opacity-70 italic">
                        {user.lastLogout ? formatDate(user.lastLogout, "dd MMM, HH:mm") : "Belum logout"}
                      </span>
                    </td>
                    <td>
                      {user.isStale ? (
                        <div className="tooltip" data-tip="Tidak ada update dari MikroTik > 15 menit">
                          <span className="badge badge-warning badge-sm gap-1 italic">
                            Stale Session
                          </span>
                        </div>
                      ) : (
                        <span className="badge badge-success badge-sm gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                          Terhubung
                        </span>
                      )}
                    </td>
                    <td className="text-center">
                      <DisconnectButton username={user.username} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-xs mx-auto flex flex-col items-center opacity-30">
              <FaWifi size={64} className="mb-4" />
              <p className="text-xl font-bold">Kosong</p>
              <p className="text-sm">
                {statusFilter === "stale"
                  ? "Tidak ada sesi gantung saat ini. 🎉"
                  : `Tidak ada user ${typeLabel} yang online saat ini.`}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* PAGINATION */}
      {totalRecords > pageSize && (
        <div className="flex justify-center py-4 border-t border-base-200">
          <div className="join">
            <button
              className="join-item btn btn-sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              « Prev
            </button>

            <button className="join-item btn btn-sm no-animation pointer-events-none">
              Halaman {page} / {totalPages}
            </button>

            <button
              className="join-item btn btn-sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next »
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div className="bg-base-200/30 px-6 py-2 text-[10px] uppercase tracking-widest opacity-40 text-center border-t border-base-200">
        Data diperbarui setiap 15 detik • Waktu server: {formatDate(currentTime, "HH:mm:ss")}
      </div>
    </div>
  );
}
