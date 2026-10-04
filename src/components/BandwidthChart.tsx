'use client';

import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatBytes } from '@/lib/utils';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface BandwidthData {
  date: string;
  upload: number;
  download: number;
}

export default function BandwidthChart() {
  const [data, setData] = useState<BandwidthData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/radius/bandwidth/dashboard');
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      
      const formattedData = json.map((item: any) => ({
        date: format(new Date(item.date), 'dd/MM', { locale: id }),
        upload: Number(item.upload || 0),
        download: Number(item.download || 0),
      }));
      
      setData(formattedData);
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
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
      <div className="card-body p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="font-mono text-[10px] font-semibold tracking-[0.08em] uppercase text-slate-400">Trafik Jaringan</p>
            <h3 className="text-base font-bold tracking-tight">Penggunaan Bandwidth 7 Hari</h3>
          </div>
          <span className="badge badge-sm badge-ghost font-mono text-[10px] text-slate-400">Rx / Tx</span>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-[280px]">
            <span className="loading loading-spinner loading-md text-primary"></span>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-[280px] text-error text-sm">
            Gagal memuat data bandwidth
          </div>
        ) : data.length === 0 ? (
          <div className="flex justify-center items-center h-[280px] text-slate-500 text-sm">
            Belum ada catatan log bandwidth
          </div>
        ) : (
          <div className="h-[280px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="chartDownload" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="chartUpload" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.08)" />
                <XAxis 
                  dataKey="date" 
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
                />
                <YAxis 
                  tickFormatter={(val) => formatBytes(val)}
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }}
                  width={75}
                />
                <Tooltip 
                  formatter={(value: any) => [formatBytes(Number(value)), '']}
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    borderColor: 'rgba(56, 189, 248, 0.25)', 
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontFamily: 'monospace'
                  }}
                />
                <Legend 
                  verticalAlign="top" 
                  align="right" 
                  height={32}
                  wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="download" 
                  name="Download (Rx)"
                  stroke="#38bdf8" 
                  fillOpacity={1} 
                  fill="url(#chartDownload)" 
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="upload" 
                  name="Upload (Tx)"
                  stroke="#10b981" 
                  fillOpacity={1} 
                  fill="url(#chartUpload)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
