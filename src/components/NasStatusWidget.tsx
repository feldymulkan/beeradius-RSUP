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

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const total = healthData.length;
  const onlineCount = healthData.filter(h => h.status === 'online').length;

  return (
    <div className="card relative overflow-hidden h-full">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent" />
      <div className="card-body p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-mono text-[10px] font-semibold tracking-[0.08em] uppercase text-slate-400">Infrastruktur Router</p>
              <h3 className="text-base font-bold tracking-tight">Status Router &amp; NAS</h3>
            </div>
            <span className="badge badge-sm badge-ghost font-mono text-[10px] text-slate-400">
              {onlineCount}/{total} Online
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-[180px]">
              <span className="loading loading-spinner loading-md text-primary"></span>
            </div>
          ) : healthData.length === 0 ? (
            <div className="flex justify-center items-center h-[180px] text-slate-500 text-sm italic">
              Belum ada perangkat NAS terdaftar
            </div>
          ) : (
            <div className="space-y-2.5 my-2">
              {healthData.slice(0, 4).map((nas) => (
                <div key={nas.nasId} className="flex items-center justify-between p-2 rounded-lg bg-base-200/50 border border-primary/5 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span 
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        nas.status === 'online' ? 'bg-success shadow-[0_0_6px_#10b981]' : 
                        nas.status === 'offline' ? 'bg-error shadow-[0_0_6px_#ef4444]' : 'bg-slate-500'
                      }`} 
                    />
                    <div className="truncate">
                      <p className="font-medium text-slate-200 truncate">{nas.shortname || nas.nasname}</p>
                      <p className="font-mono text-[10px] text-slate-500">{nas.nasname}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono text-[11px] text-slate-400">
                      {nas.latencyMs ? `${nas.latencyMs}ms` : nas.status === 'online' ? 'Aktif' : 'Offline'}
                    </span>
                  </div>
                </div>
              ))}
              {total > 4 && (
                <p className="text-center text-[11px] text-slate-500 font-mono pt-1">
                  +{total - 4} router/perangkat lainnya
                </p>
              )}
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-primary/10 flex justify-end">
          <Link href="/nas" className="text-xs text-primary hover:text-primary-focus font-mono inline-flex items-center gap-1 transition-colors">
            Kelola Semua Perangkat →
          </Link>
        </div>
      </div>
    </div>
  );
}
