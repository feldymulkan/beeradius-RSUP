"use client";

import { useState, useEffect } from "react";
import { FaWifi, FaShieldAlt } from "react-icons/fa";

const POLLING_INTERVAL = 15000;

export default function OnlineUserCount() {
  const [stats, setStats] = useState({ onlineCount: 0, activeCount: 0, staleCount: 0, hotspotCount: 0, vpnCount: 0, othersCount: 0 });
  const [isLoading, setIsLoading] = useState(true);

  const fetchOnlineUsers = async () => {
    try {
      const res = await fetch('/api/radius/users/online-users');
      if (!res.ok) throw new Error("Gagal fetch data");
      const data = await res.json();
      setStats({
        onlineCount: data.onlineCount || 0,
        activeCount: data.activeCount || 0,
        staleCount: data.staleCount || 0,
        hotspotCount: data.hotspotCount || 0,
        vpnCount: data.vpnCount || 0,
        othersCount: data.othersCount || 0
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOnlineUsers();
    const intervalId = setInterval(fetchOnlineUsers, POLLING_INTERVAL);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {/* Card Hotspot Aktif */}
      <div className="card bg-base-100 shadow-xl border-t-4 border-success">
        <div className="card-body p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase">Hotspot Aktif</p>
              <h3 className="text-3xl font-bold">
                {isLoading ? <span className="loading loading-spinner loading-md"></span> : stats.hotspotCount}
              </h3>
            </div>
            <div className="p-3 bg-success/10 rounded-full text-success">
              <FaWifi className="w-6 h-6" />
            </div>
          </div>
          {stats.staleCount > 0 && (
            <div className="mt-2 flex items-center gap-1">
              <span className="badge badge-warning badge-xs animate-pulse"></span>
              <span className="text-[10px] text-warning font-bold uppercase">{stats.staleCount} Sesi Gantung</span>
            </div>
          )}
        </div>
      </div>

      {/* Card VPN Aktif */}
      <div className="card bg-base-100 shadow-xl border-t-4 border-secondary">
        <div className="card-body p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase">VPN Aktif</p>
              <h3 className="text-3xl font-bold">
                {isLoading ? <span className="loading loading-spinner loading-md"></span> : stats.vpnCount}
              </h3>
            </div>
            <div className="p-3 bg-secondary/10 rounded-full text-secondary">
              <FaShieldAlt className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
