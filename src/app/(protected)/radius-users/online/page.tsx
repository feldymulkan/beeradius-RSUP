"use client";

import { useState, useEffect } from "react";
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import DisconnectButton from "@/components/DisconnectButton";

// Tipe data
type OnlineUser = {
  radacctid: bigint | number;
  username: string;
  framedipaddress: string | null;
  nasipaddress: string;
  acctstarttime: string | null;
};

type ApiResponse = {
  onlineUsers: OnlineUser[];
  total: number;
  totalPages: number;    // Tambahan dari API
  currentPage: number;   // Tambahan dari API
};

const POLLING_INTERVAL = 10000; // 10 detik
const ITEMS_PER_PAGE = 10;      // Jumlah baris per halaman

export default function OnlineUserTable() {
  // State Data
  const [users, setUsers] = useState<OnlineUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State Filter & Pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  // Fungsi Fetch Data
  const fetchOnlineUsers = async (currPage: number, query: string) => {
    try {
      // Kirim page dan limit ke API
      const url = `/api/radius/users/online-users/list?q=${encodeURIComponent(query)}&page=${currPage}&limit=${ITEMS_PER_PAGE}`;
      
      const res = await fetch(url);
      if (!res.ok) throw new Error("Gagal mengambil data");
      
      const data: ApiResponse = await res.json();
      
      setUsers(data.onlineUsers || []);
      setTotalPages(data.totalPages || 1);
      setTotalRecords(data.total || 0);

    } catch (error) {
      console.error("Error mengambil user online:", error);
      // Jangan kosongkan data jika ini hanya polling background (agar tidak kedip)
      if (isLoading) setUsers([]); 
    } finally {
      setIsLoading(false);
    }
  };

  // Efek 1: Debounce Search (Reset ke Halaman 1 saat mengetik)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setPage(1); // PENTING: Reset ke hal 1 jika search berubah
      fetchOnlineUsers(1, searchQuery); 
    }, 500);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  // Efek 2: Pindah Halaman
  useEffect(() => {
    // Hanya fetch jika bukan render pertama (karena sudah di-handle oleh Efek 1)
    // Tapi untuk simplifikasi, kita biarkan fetch berjalan, React cukup pintar mengelola ini.
    fetchOnlineUsers(page, searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]); 

  // Efek 3: Polling Otomatis (Refresh data di halaman yang sedang aktif)
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchOnlineUsers(page, searchQuery);
    }, POLLING_INTERVAL);

    return () => clearInterval(intervalId);
  }, [page, searchQuery]);

  // Format Tanggal
  const formatDuration = (startTime: string | null) => {
    if (!startTime) return "-";
    try {
      return formatDistanceToNow(new Date(startTime), {
        addSuffix: true,
        locale: id,
      });
    } catch (error) {
      console.error("Gagal format tanggal:", error);
      return "-";
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div>
            <h2 className="card-title">
              User Online 
              <span className="badge badge-primary ml-2">{totalRecords}</span>
            </h2>
            <p className="text-xs text-gray-500 mt-1">Halaman {page} dari {totalPages}</p>
          </div>

          <div className="form-control w-full md:w-auto">
            <input
              type="text"
              placeholder="Cari Username / IP..."
              className="input input-bordered w-full md:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* TABEL */}
        <div className="overflow-x-auto min-h-[400px]">
          {isLoading && users.length === 0 ? (
            <div className="flex justify-center items-center h-48">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : users.length > 0 ? (
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>IP Address</th>
                  <th>Router (NAS)</th>
                  <th>Login Sejak</th>
                  <th className="text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => {
                  // Hitung nomor urut berdasarkan halaman (contoh: Hal 2 mulai dari 11)
                  const rowNumber = (page - 1) * ITEMS_PER_PAGE + index + 1;
                  
                  return (
                    <tr key={user.radacctid ? String(user.radacctid) : index}>
                      <th>{rowNumber}</th>
                      <td className="font-bold text-primary">{user.username}</td>
                      <td className="font-mono text-sm">{user.framedipaddress || "-"}</td>
                      <td className="text-gray-500 text-sm">{user.nasipaddress}</td>
                      <td>{formatDuration(user.acctstarttime)}</td>
                      <td className="text-center">
                        <DisconnectButton username={user.username} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-gray-500">
              <p>Tidak ada user online yang ditemukan.</p>
            </div>
          )}
        </div>

        {/* PAGINATION CONTROLS */}
        {users.length > 0 && (
          <div className="flex justify-center mt-6">
            <div className="join">
              <button 
                className="join-item btn btn-sm"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                « Prev
              </button>
              
              <button className="join-item btn btn-sm no-animation">
                Halaman {page}
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

      </div>
    </div>
  );
}