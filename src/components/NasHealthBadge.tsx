'use client';

import { useEffect, useState } from 'react';

type NasHealth = {
  nasId: number;
  nasname: string;
  shortname: string | null;
  status: 'online' | 'offline' | 'unknown';
  latencyMs: number;
  uptime?: string;
  cpuLoad?: string;
  freeMemory?: string;
  totalMemory?: string;
  version?: string;
};

export default function NasHealthBadge({ nasname }: { nasname: string }) {
  const [health, setHealth] = useState<NasHealth | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const res = await fetch(`/api/radius/nas/health?nasIp=${encodeURIComponent(nasname)}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setHealth(data[0]);
          }
        }
      } catch (error) {
        console.error('Failed to fetch NAS health', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHealth();
    const interval = setInterval(fetchHealth, 30000);
    return () => clearInterval(interval);
  }, [nasname]);

  if (loading) {
    return <span className="loading loading-spinner loading-xs text-base-content/50"></span>;
  }

  if (!health || health.status === 'unknown') {
    return (
      <div className="tooltip tooltip-top" data-tip="Konfigurasi MikroTik tidak ditemukan">
        <span className="badge badge-ghost badge-sm font-medium">Unknown</span>
      </div>
    );
  }

  if (health.status === 'offline') {
    return (
      <div className="tooltip tooltip-top" data-tip={`Latency: ${health.latencyMs}ms`}>
        <span className="badge badge-error badge-sm font-medium">Offline</span>
      </div>
    );
  }

  return (
    <div 
      className="tooltip tooltip-top" 
      data-tip={`Uptime: ${health.uptime || '-'} | CPU: ${health.cpuLoad || '-'}% | Mem: ${formatBytes(health.freeMemory)} / ${formatBytes(health.totalMemory)} | Latency: ${health.latencyMs}ms`}
    >
      <span className="badge badge-success badge-sm font-medium">Online</span>
    </div>
  );
}

function formatBytes(bytes?: string) {
  if (!bytes) return '-';
  const b = parseInt(bytes, 10);
  if (isNaN(b)) return '-';
  if (b === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(b) / Math.log(k));
  return parseFloat((b / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}
