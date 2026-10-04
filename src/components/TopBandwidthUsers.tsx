'use client';

import { useEffect, useState } from 'react';
import { formatBytes } from '@/lib/utils';
import { FaUserCircle } from 'react-icons/fa';

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
        setMaxDownload(parsedUsers[0].download); // Sorted descending by download
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
    <div className="card bg-base-100 shadow-xl h-full border border-base-200">
      <div className="card-body p-4 sm:p-6">
        <h2 className="card-title text-lg font-bold mb-4">Top 10 Bandwidth (24 Jam)</h2>
        
        {loading ? (
          <div className="flex justify-center items-center h-[300px]">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-[300px] text-error">
            Gagal memuat data
          </div>
        ) : users.length === 0 ? (
          <div className="flex justify-center items-center h-[300px] text-base-content/50">
            Tidak ada data
          </div>
        ) : (
          <div className="overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
            <div className="flex flex-col gap-4">
              {users.map((user, index) => {
                const percentage = maxDownload > 0 ? (Number(user.download) / maxDownload) * 100 : 0;
                
                return (
                  <div key={user.username} className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="font-bold text-base-content/50 w-4 text-right">
                          {index + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-primary">{user.username}</span>
                            {user.type && (
                              <span className={`badge badge-xs ${user.type === 'hotspot' ? 'badge-primary' : 'badge-secondary'}`}>
                                {user.type}
                              </span>
                            )}
                          </div>
                          {user.fullName && (
                            <div className="text-xs text-base-content/70">{user.fullName}</div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{formatBytes(Number(user.download))}</div>
                        <div className="text-xs text-base-content/50">Up: {formatBytes(Number(user.upload))}</div>
                      </div>
                    </div>
                    <progress 
                      className="progress progress-success w-full bg-base-200 h-1.5" 
                      value={percentage} 
                      max="100"
                    ></progress>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
