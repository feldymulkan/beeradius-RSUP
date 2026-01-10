"use client";

import { useState, useEffect, useCallback } from "react";
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import DisconnectButton from "@/components/DisconnectButton";

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
  totalPages: number;
  currentPage: number;
};

const POLLING_INTERVAL = 10000;
const ITEMS_PER_PAGE = 10; // Pastikan ini sama atau dikirim ke backend

export default function OnlineUserTable() {
  const [users, setUsers] = useState<OnlineUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State Pagination & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  // Fungsi Fetch Data Utama
  // Gunakan useCallback agar tidak re-create function setiap render
  const fetchOnlineUsers = useCallback(async (pageNum: number, query: string) => {
    try {
      // Buat URL params dengan rapi
      const params = new URLSearchParams({
        q: query,
        page: pageNum.toString(),
        limit: ITEMS_PER_PAGE.toString(),
      });

      const res = await fetch(`/api/radius/users/online-users/list?${params.toString()}`);
      if (!res.ok) throw new Error("Gagal mengambil data");
      
      const data: ApiResponse = await res.json();
      
      setUsers(data.onlineUsers || []);
      setTotalPages(data.totalPages || 1);
      setTotalRecords(data.total || 0);

    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 1. Efek Debounce Search (Reset ke Halaman 1 jika cari)
  useEffect(() => {
    const timer = setTimeout(() => {
      // Set loading true agar user tahu sedang mencari
      // Tapi jangan set users ke [] agar tidak flickering parah
      fetchOnlineUsers(1, searchQuery);
      setPage(1); // Reset page tampilan ke 1
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, fetchOnlineUsers]);

  // 2. Efek Ganti Halaman (Ketika tombol next/prev ditekan)
  useEffect(() => {
    fetchOnlineUsers(page, searchQuery);
  }, [page, fetchOnlineUsers]); // Jangan masukkan searchQuery di sini untuk menghindari double fetch

  // 3. Efek Polling (Refresh otomatis data di halaman yg aktif)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchOnlineUsers(page, searchQuery);
    }, POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, [page, searchQuery, fetchOnlineUsers]);

  const formatDuration = (startTime: string | null) => {
    if (!startTime) return "-";
    try {
      return formatDistanceToNow(new Date(startTime), { addSuffix: true, locale: id });
    } catch { return "-"; }
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
            <p className="text-xs text-gray-500 mt-1">
              Menampilkan {users.length} dari total {totalRecords} user
            </p>
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
                  const rowNumber = (page - 1) * ITEMS_PER_PAGE + index + 1;
                  return (
                    <tr key={index}>
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
            <div className="text-center py-10 text-gray-500">
              <p>Tidak ada data user.</p>
            </div>
          )}
        </div>

        {/* PAGINATION BUTTONS */}
        {totalRecords > ITEMS_PER_PAGE && (
          <div className="flex justify-center mt-6">
            <div className="join">
              <button 
                className="join-item btn btn-sm"
                disabled={page <= 1}
                onClick={() => setPage(p => p - 1)}
              >
                « Prev
              </button>
              
              <button className="join-item btn btn-sm no-animation pointer-events-none">
                Halaman {page} / {totalPages}
              </button>
              
              <button 
                className="join-item btn btn-sm" 
                disabled={page >= totalPages}
                onClick={() => setPage(p => p + 1)}
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