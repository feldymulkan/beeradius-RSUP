"use client";

import { useState, useEffect } from "react";
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

/**
 * Tipe data disesuaikan dengan Output API Baru
 * (API sekarang mengirim object lengkap, bukan array terpisah)
 */
type OnlineUser = {
  radacctid: number;
  username: string;
  acctstarttime: string; // ISO string date
  framedipaddress: string | null; // Tambahan info IP (opsional ditampilkan)
};

type ApiResponse = {
  onlineUsers: OnlineUser[];
  total: number;
};

// Atur seberapa sering data di-refresh
const POLLING_INTERVAL = 10000; // 10 detik

export default function RealtimeOnlineUsers() {
  const [users, setUsers] = useState<OnlineUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOnlineUsers = async () => {
    try {
      // Pastikan URL ini sesuai dengan lokasi file route.ts backend Anda
      // (Bisa jadi '/api/radius/online-users' atau '/api/radius/users/online-users/list')
      const res = await fetch('/api/radius/users/online-users/list'); 
      
      if (!res.ok) throw new Error("Gagal mengambil data");
      
      const data: ApiResponse = await res.json();

      // PERUBAHAN PENTING:
      // Kita tidak perlu lagi mapping/menggabungkan array manual.
      // Backend sekarang sudah mengirim array object yang rapi.
      setUsers(data.onlineUsers || []);

    } catch (error) {
      console.error("Error mengambil user online:", error);
      setUsers([]); 
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOnlineUsers();
    const intervalId = setInterval(fetchOnlineUsers, POLLING_INTERVAL);
    return () => clearInterval(intervalId);
  }, []); 

  const formatDuration = (startTime: string) => {
    try {
      return formatDistanceToNow(new Date(startTime), {
        addSuffix: true,
        locale: id, 
      });
    } catch (error) {
      console.error("Format date error:", error);
      return "-";
    }
  };

  if (isLoading) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">User Online</h2>
          <div className="flex justify-center items-center h-24">
            <span className="loading loading-spinner text-primary"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title justify-between">
          User Online 
          <span className="badge badge-primary">{users.length}</span>
        </h2>
        
        <div className="overflow-x-auto max-h-96">
          {users.length > 0 ? (
            <table className="table table-sm table-zebra w-full">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>IP Address</th>
                  <th>Login Sejak</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  // Gunakan radacctid sebagai key jika ada, atau fallback ke index
                  <tr key={user.radacctid || index}>
                    <td className="font-medium text-primary">{user.username}</td>
                    <td className="font-mono text-xs">{user.framedipaddress || "-"}</td>
                    <td className="text-sm">{formatDuration(user.acctstarttime)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-4 text-gray-500">
              <p>Tidak ada user yang online.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}