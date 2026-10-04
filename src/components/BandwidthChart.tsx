'use client';

import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatBytes } from '@/lib/utils';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

interface BandwidthData {
  date: string;
  upload: string | number;
  download: string | number;
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
    <div className="card bg-base-100 shadow-xl h-full border border-base-200">
      <div className="card-body">
        <h2 className="card-title text-lg font-bold mb-4">Bandwidth 7 Hari Terakhir</h2>
        
        {loading ? (
          <div className="flex justify-center items-center h-[300px]">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-[300px] text-error">
            Gagal memuat data
          </div>
        ) : (
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={300}>
              <AreaChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUpload" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDownload" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" opacity={0.1} />
                <XAxis 
                  dataKey="date" 
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fill: 'currentColor', opacity: 0.6, fontSize: 12 }}
                />
                <YAxis 
                  tickFormatter={(val) => formatBytes(val)}
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fill: 'currentColor', opacity: 0.6, fontSize: 12 }}
                  width={80}
                />
                <Tooltip 
                  formatter={(value: any) => formatBytes(value)}
                  contentStyle={{ backgroundColor: 'hsl(var(--b1))', borderColor: 'hsl(var(--b2))', borderRadius: '8px' }}
                />
                <Legend verticalAlign="bottom" height={36} />
                <Area 
                  type="monotone" 
                  dataKey="upload" 
                  name="Upload"
                  stroke="#3b82f6" 
                  fillOpacity={1} 
                  fill="url(#colorUpload)" 
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="download" 
                  name="Download"
                  stroke="#22c55e" 
                  fillOpacity={1} 
                  fill="url(#colorDownload)" 
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
