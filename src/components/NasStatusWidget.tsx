'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type NasHealth = {
  nasId: number;
  nasname: string;
  shortname: string | null;
  status: 'online' | 'offline' | 'unknown';
  latencyMs: number;
};

export default function NasStatusWidget() {
  const [healthData, setHealthData] = useState<NasHealth[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const res = await fetch('/api/radius/nas/health');
        if (res.ok) {
          const data = await res.json();
          setHealthData(data);
        }
      } catch (error) {
        console.error('Failed to fetch NAS health data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHealth();
    const interval = setInterval(fetchHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const total = healthData.length;
  const onlineCount = healthData.filter(h => h.status === 'online').length;
  const offlineCount = healthData.filter(h => h.status === 'offline').length;
  const unknownCount = healthData.filter(h => h.status === 'unknown').length;

  return (
    <div className="card bg-base-100 shadow-sm border border-base-200 border-t-4 border-t-warning flex flex-col h-full">
      <div className="card-body p-6 flex flex-col h-full">
        <h3 className="card-title text-base text-base-content/70">Status Router</h3>
        
        {loading ? (
          <div className="flex-grow flex items-center justify-center">
            <span className="loading loading-spinner text-warning"></span>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4 my-2">
              <span className="text-4xl font-bold text-base-content">{onlineCount}</span>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-base-content/70">{onlineCount}/{total} Router Aktif</span>
                {offlineCount > 0 && (
                  <span className="badge badge-error badge-sm mt-1">{offlineCount} Offline</span>
                )}
              </div>
            </div>

            <div className="mt-4 flex-grow">
              <ul className="flex flex-col gap-2">
                {healthData.slice(0, 5).map((nas) => (
                  <li key={nas.nasId} className="flex items-center justify-between text-sm">
                    <span className="truncate max-w-[150px]" title={nas.shortname || nas.nasname}>
                      {nas.shortname || nas.nasname}
                    </span>
                    <span className="flex items-center gap-1.5">
                      {nas.status === 'online' && <span className="w-2 h-2 rounded-full bg-success inline-block"></span>}
                      {nas.status === 'offline' && <span className="w-2 h-2 rounded-full bg-error inline-block"></span>}
                      {nas.status === 'unknown' && <span className="w-2 h-2 rounded-full bg-base-300 inline-block"></span>}
                    </span>
                  </li>
                ))}
                {total > 5 && (
                  <li className="text-xs text-base-content/50 italic mt-1">
                    + {total - 5} router lainnya
                  </li>
                )}
              </ul>
            </div>
            
            <div className="card-actions justify-end mt-4 pt-4 border-t border-base-200">
              <Link href="/nas" className="btn btn-sm btn-ghost w-full">Lihat Detail</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
