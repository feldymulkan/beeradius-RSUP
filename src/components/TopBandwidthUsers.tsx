'use client';

import { useEffect, useState } from 'react';
import { formatBytes } from '@/lib/utils';

interface TopUser {
  username: string;
  fullName: string | null;
  type: string | null;
  upload: string | number;
  download: string | number;
  sessions: string | number;
}

export default function TopBandwidthUsers() {
  const [users, setUsers] = useState<TopUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [maxDownload, setMaxDownload] = useState(0);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/radius/bandwidth/top-users');
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      
      const parsedUsers = json.map((u: any) => ({
        ...u,
        upload: Number(u.upload || 0),
        download: Number(u.download || 0),
      }));
      
      setUsers(parsedUsers);
      
      if (parsedUsers.length > 0) {
        setMaxDownload(parsedUsers[0].download);
      }
      
      setError(false);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card relative overflow-hidden h-full">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-secondary/50 to-transparent" />
      <div className="card-body p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-mono text-[10px] font-semibold tracking-[0.08em] uppercase text-slate-400">Penggunaan Kuota</p>
            <h3 className="text-base font-bold tracking-tight">Top Konsumsi (24 Jam)</h3>
          </div>
          <span className="badge badge-sm badge-ghost font-mono text-[10px] text-slate-400">Rx Tertinggi</span>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-[280px]">
            <span className="loading loading-spinner loading-md text-primary"></span>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-[280px] text-error text-sm">
            Gagal memuat data
          </div>
        ) : users.length === 0 ? (
          <div className="flex justify-center items-center h-[280px] text-slate-500 text-sm">
            Belum ada aktivitas 24 jam terakhir
          </div>
        ) : (
          <div className="overflow-y-auto max-h-[280px] pr-1 space-y-3">
            {users.slice(0, 6).map((user, index) => {
              const percentage = maxDownload > 0 ? (Number(user.download) / maxDownload) * 100 : 0;
              
              return (
                <div key={user.username} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-mono text-[11px] text-slate-500 w-3">{index + 1}</span>
                      <div className="truncate">
                        <span className="font-medium text-base-content">{user.username}</span>
                        {user.fullName && (
                          <span className="text-[11px] text-slate-400 ml-1.5 truncate">({user.fullName})</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right shrink-0 font-mono text-xs">
                      <span className="text-primary font-medium">{formatBytes(Number(user.download))}</span>
                    </div>
                  </div>
                  <div className="w-full bg-base-300 rounded-full h-1 overflow-hidden">
                    <div 
                      className="bg-primary h-full rounded-full transition-all duration-500" 
                      style={{ width: `${Math.min(100, Math.max(8, percentage))}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
