"use client";

import { useState, useEffect } from "react";
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import toast from "react-hot-toast";

type OnlineUser = {
  radacctid: string;
  username: string;
  acctstarttime: string;
  acctupdatetime: string | null;
  framedipaddress: string | null;
  isStale: boolean;
};

type ApiResponse = {
  onlineUsers: OnlineUser[];
  total: number;
};

const POLLING_INTERVAL = 10000;

export default function RealtimeOnlineUsers() {
  const [users, setUsers] = useState<OnlineUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClearing, setIsClearing] = useState(false);

  const fetchOnlineUsers = async () => {
    try {
      const res = await fetch('/api/radius/users/online-users/list'); 
      if (!res.ok) throw new Error("Gagal mengambil data");
      const data: ApiResponse = await res.json();
      setUsers(data.onlineUsers || []);
    } catch (error) {
      console.error("Error mengambil user online:", error);
      setUsers([]); 
    } finally {
      setIsLoading(false);
    }
  };

  const clearStaleSessions = async () => {
    if (!confirm("Apakah Anda yakin ingin membersihkan semua sesi yang menggantung (stale)?")) return;
    
    setIsClearing(true);
    try {
      const res = await fetch('/api/radius/users/online-users/clear-stale', {
        method: 'POST',
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        fetchOnlineUsers();
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Gagal membersihkan sesi");
    } finally {
      setIsClearing(false);
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
      return "-";
    }
  };

  const staleCount = users.filter(u => u.isStale).length;

  if (isLoading) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-primary font-bold">User Online</h2>
          <div className="flex justify-center items-center h-24">
            <span className="loading loading-spinner text-primary"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-xl border border-base-300">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h2 className="card-title text-primary font-bold">
            User Online 
            <span className="badge badge-primary badge-lg">{users.length}</span>
          </h2>
          {staleCount > 0 && (
            <button 
              onClick={clearStaleSessions}
              disabled={isClearing}
              className={`btn btn-sm btn-outline btn-error ${isClearing ? 'loading' : ''}`}
            >
              {isClearing ? 'Cleaning...' : `Clear ${staleCount} Stale`}
            </button>
          )}
        </div>
        
        <div className="overflow-x-auto max-h-[500px]">
          {users.length > 0 ? (
            <table className="table table-sm table-zebra w-full">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>IP Address</th>
                  <th>Login Sejak</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.radacctid} className="hover">
                    <td className="font-medium">{user.username}</td>
                    <td className="font-mono text-xs">{user.framedipaddress || "-"}</td>
                    <td className="text-sm">{formatDuration(user.acctstarttime)}</td>
                    <td>
                      {user.isStale ? (
                        <span className="badge badge-warning badge-sm">Stale (Offline?)</span>
                      ) : (
                        <span className="badge badge-success badge-sm">Active</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-10 opacity-50">
              <p className="text-lg">Tidak ada user yang online.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
