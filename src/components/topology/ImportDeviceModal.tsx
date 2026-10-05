'use client';

import { useState, useEffect } from 'react';
import { TopologyNode, generateDefaultPorts } from '@/types/topology';
import { FaTimes, FaNetworkWired, FaServer, FaPlus } from 'react-icons/fa';

interface ImportDeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (newNode: TopologyNode) => void;
  existingNodeNames: string[];
}

export default function ImportDeviceModal({
  isOpen,
  onClose,
  onImport,
  existingNodeNames,
}: ImportDeviceModalProps) {
  const [loading, setLoading] = useState(false);
  const [switches, setSwitches] = useState<any[]>([]);
  const [mikrotiks, setMikrotiks] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetch('/api/network/topology/devices')
        .then((res) => res.json())
        .then((data) => {
          setSwitches(data.switches || []);
          setMikrotiks(data.mikrotiks || []);
        })
        .catch((err) => console.error('Error fetching registered devices:', err))
        .finally(() => setLoading(false));
    }
  }, [isOpen]);

  const handleSelectSwitch = (sw: any) => {
    let ports: any[] = [];
    let vlans: any[] = [];

    try {
      if (sw.ports) {
        const parsed = JSON.parse(sw.ports);
        if (Array.isArray(parsed) && parsed.length > 0) {
          ports = parsed.map((p: any, idx: number) => {
            const isSfp =
              p.name?.toLowerCase().includes('sfp') ||
              p.name?.toLowerCase().includes('fiber') ||
              p.name?.toLowerCase().includes('10g');
            return {
              id: `sw-p-${p.index || idx + 1}`,
              name: p.name || `Port ${p.index || idx + 1}`,
              alias: p.alias || undefined,
              type: isSfp ? 'sfp' : 'rj45',
              speed: p.speed || (isSfp ? '10G' : '1G'),
              status: p.status === 'up' ? 'up' : 'down',
              pvid: p.pvid || 1,
            };
          });
        }
      }
    } catch {}

    try {
      if (sw.vlans) {
        const parsed = JSON.parse(sw.vlans);
        if (Array.isArray(parsed)) vlans = parsed;
      }
    } catch {}

    if (ports.length === 0) {
      ports = generateDefaultPorts('switch', 24);
    }

    const newNode: TopologyNode = {
      id: `sw-node-${sw.id}`,
      name: sw.name,
      type: 'switch',
      ip: sw.ip,
      brand: sw.brand || 'Managed Switch',
      model: sw.model || 'Network Switch',
      location: sw.location || 'RSUD NTB',
      status: sw.status === 'online' ? 'online' : 'offline',
      switchDeviceId: sw.id,
      isSnmpSynced: true,
      lastPolled: sw.lastPolled,
      ports,
      vlans,
      x: 350 + Math.floor(Math.random() * 200),
      y: 200 + Math.floor(Math.random() * 200),
    };

    onImport(newNode);
    onClose();
  };

  const handleSelectMikrotik = (m: any) => {
    const newNode: TopologyNode = {
      id: `imported-mkt-${m.id}-${Date.now()}`,
      name: m.name,
      type: 'router',
      ip: m.host,
      brand: 'MikroTik RouterOS',
      model: 'Router API Gateway',
      location: 'Server Room RSUD NTB',
      status: 'online',
      ports: generateDefaultPorts('router'),
      x: 450 + Math.floor(Math.random() * 150),
      y: 100 + Math.floor(Math.random() * 100),
    };

    onImport(newNode);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-base-100 border border-primary/20 rounded-2xl shadow-2xl p-6 text-base-content">
        <div className="flex items-center justify-between pb-4 border-b border-base-300">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <FaNetworkWired className="text-primary h-4 w-4" />
              Import dari Perangkat Switch & Router Terdaftar
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Pilih perangkat fisik yang sudah terdata di database BeeRadius RSUD NTB untuk langsung diletakkan di kanvas topologi.
            </p>
          </div>
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost text-base-content/60 hover:text-base-content"
          >
            <FaTimes />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <span className="loading loading-spinner text-primary"></span>
            <span className="ml-3 text-xs text-base-content/60">Memuat data perangkat terdaftar...</span>
          </div>
        ) : (
          <div className="space-y-6 mt-4">
            {/* Daftar Switch Managed */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mb-2">
                <FaNetworkWired className="h-3.5 w-3.5" />
                Switch Managed Terdaftar ({switches.length})
              </h3>
              {switches.length === 0 ? (
                <p className="text-xs text-base-content/50 italic p-3 bg-base-200/50 rounded-xl">
                  Belum ada switch yang terdaftar di menu Switch & VLAN Discovery.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {switches.map((sw) => {
                    const isAlreadyIn = existingNodeNames.includes(sw.name);
                    return (
                      <div
                        key={sw.id}
                        className="p-3 rounded-xl border border-base-300 bg-base-200/40 hover:border-primary/40 flex items-center justify-between transition-all"
                      >
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold text-base-content flex items-center gap-1.5 font-mono">
                            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                            {sw.name}
                            {isAlreadyIn && (
                              <span className="badge badge-xs badge-neutral text-[9px]">Ada di Canvas</span>
                            )}
                          </p>
                          <p className="text-[11px] text-base-content/60 font-mono">{sw.ip}</p>
                          <p className="text-[10px] text-base-content/50 line-clamp-1">
                            {sw.brand || 'Switch'} · {sw.location || 'RSUD NTB'}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSelectSwitch(sw)}
                          className="btn btn-xs btn-primary gap-1"
                        >
                          <FaPlus className="h-2.5 w-2.5" /> Tambah
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Daftar Router MikroTik */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-1.5 mb-2">
                <FaServer className="h-3.5 w-3.5" />
                Router MikroTik API ({mikrotiks.length})
              </h3>
              {mikrotiks.length === 0 ? (
                <p className="text-xs text-base-content/50 italic p-3 bg-base-200/50 rounded-xl">
                  Belum ada konfigurasi MikroTik Router API yang tersimpan.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {mikrotiks.map((m) => (
                    <div
                      key={m.id}
                      className="p-3 rounded-xl border border-base-300 bg-base-200/40 hover:border-primary/40 flex items-center justify-between transition-all"
                    >
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-base-content flex items-center gap-1.5 font-mono">
                          <span className="h-2 w-2 rounded-full bg-sky-500"></span>
                          {m.name}
                        </p>
                        <p className="text-[11px] text-base-content/60 font-mono">{m.host}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleSelectMikrotik(m)}
                        className="btn btn-xs btn-primary gap-1"
                      >
                        <FaPlus className="h-2.5 w-2.5" /> Tambah
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-end pt-4 mt-6 border-t border-base-300">
          <button type="button" onClick={onClose} className="btn btn-sm btn-ghost">
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
