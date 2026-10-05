'use client';

import { useState, useEffect, useMemo } from 'react';
import { TopologyData } from '@/types/topology';
import {
  FaTimes,
  FaSyncAlt,
  FaNetworkWired,
  FaRoute,
  FaVideo,
  FaServer,
  FaWifi,
  FaShieldAlt,
  FaExclamationTriangle,
  FaPlus,
  FaCheckCircle,
} from 'react-icons/fa';
import toast from 'react-hot-toast';

interface SwitchDiffItem {
  switchId: number;
  name: string;
  ip: string;
  brand: string;
  model: string;
  location: string;
  status: 'online' | 'offline';
  deviceType?: string;
  connMethod?: string;
  lastPolled?: string;
  portCount: number;
  vlanCount: number;
  syncStatus: 'new' | 'needs_update' | 'synced';
  canvasNodeId?: string | null;
  diffs?: {
    status?: { canvas: string; db: string } | null;
    ip?: { canvas: string; db: string } | null;
    ports?: { canvas: number; db: number } | null;
  };
  details: string;
}

interface SwitchSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSyncComplete: (newTopology: TopologyData) => void;
}

export default function SwitchSyncModal({
  isOpen,
  onClose,
  onSyncComplete,
}: SwitchSyncModalProps) {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [switches, setSwitches] = useState<SwitchDiffItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'new' | 'needs_update' | 'synced'>('all');
  const [preserveEdges, setPreserveEdges] = useState(true);

  // Fetch sync diff status from API
  const fetchSyncStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/network/topology/sync-switches');
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Gagal memuat status sinkronisasi');

      const items: SwitchDiffItem[] = json.data?.switches || [];
      setSwitches(items);

      // Secara default pilih semua switch yang 'new' atau 'needs_update'
      const actionableIds = items
        .filter((s) => s.syncStatus === 'new' || s.syncStatus === 'needs_update')
        .map((s) => s.switchId);
      // Jika semua sudah sinkron, pilih semua switch agar bisa re-sync
      setSelectedIds(actionableIds.length > 0 ? actionableIds : items.map((s) => s.switchId));
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Gagal memeriksa status sinkronisasi switch');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchSyncStatus();
    }
  }, [isOpen]);

  // Tab filtering
  const filteredSwitches = useMemo(() => {
    if (activeTab === 'all') return switches;
    return switches.filter((s) => s.syncStatus === activeTab);
  }, [switches, activeTab]);

  const counts = useMemo(() => {
    return {
      all: switches.length,
      new: switches.filter((s) => s.syncStatus === 'new').length,
      needs_update: switches.filter((s) => s.syncStatus === 'needs_update').length,
      synced: switches.filter((s) => s.syncStatus === 'synced').length,
    };
  }, [switches]);

  const handleToggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === filteredSwitches.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredSwitches.map((s) => s.switchId));
    }
  };

  // Submit sync execution
  const handleApplySync = async () => {
    if (selectedIds.length === 0) {
      toast.error('Pilih setidaknya satu switch untuk disinkronkan');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/network/topology/sync-switches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          switchDeviceIds: selectedIds,
          preserveExistingEdges: preserveEdges,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Gagal melakukan sinkronisasi');

      toast.success(json.message || 'Sinkronisasi switch berhasil!');
      if (json.data?.topology) {
        onSyncComplete(json.data.topology);
      }
      onClose();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Gagal menyinkronkan switch');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[88vh] flex flex-col bg-base-100 border border-primary/20 rounded-2xl shadow-2xl overflow-hidden text-base-content">
        {/* Header */}
        <div className="px-6 py-4 border-b border-base-300 flex items-center justify-between bg-base-200/50">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-linear-to-br from-primary to-emerald-500 flex items-center justify-center text-white shadow-md">
              <FaSyncAlt className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </div>
            <div>
              <h2 className="text-base font-bold text-base-content flex items-center gap-2">
                Sinkronisasi Switch & VLAN Discovery
                <span className="badge badge-xs badge-primary font-mono text-[9px]">SNMP INTEGRATION</span>
              </h2>
              <p className="text-xs text-base-content/70 mt-0.5">
                Sinkronkan perangkat fisik dari modul Switch VLAN ke dalam kanvas topologi jaringan RSUD NTB.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost text-base-content/60 hover:text-base-content"
          >
            <FaTimes />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Navigation Sub-Tabs */}
          <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-base-300">
            <div className="flex items-center gap-1 bg-base-200/60 p-1 rounded-xl border border-base-300 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-primary text-primary-content font-bold shadow-xs'
                    : 'text-base-content/70 hover:text-base-content hover:bg-base-300/40'
                }`}
              >
                Semua ({counts.all})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('new')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'new'
                    ? 'bg-emerald-500 text-white font-bold shadow-xs'
                    : 'text-base-content/70 hover:text-base-content hover:bg-base-300/40'
                }`}
              >
                <FaPlus className="h-2.5 w-2.5" />
                Baru ({counts.new})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('needs_update')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'needs_update'
                    ? 'bg-amber-500 text-black font-bold shadow-xs'
                    : 'text-base-content/70 hover:text-base-content hover:bg-base-300/40'
                }`}
              >
                <FaExclamationTriangle className="h-2.5 w-2.5" />
                Perlu Update ({counts.needs_update})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('synced')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'synced'
                    ? 'bg-base-300 text-base-content font-bold shadow-xs'
                    : 'text-base-content/70 hover:text-base-content hover:bg-base-300/40'
                }`}
              >
                <FaCheckCircle className="h-2.5 w-2.5" />
                Tersinkron ({counts.synced})
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={fetchSyncStatus}
                disabled={loading}
                className="btn btn-xs btn-ghost text-base-content/70 hover:text-base-content gap-1"
                title="Cek ulang perbedaan"
              >
                <FaSyncAlt className={loading ? 'animate-spin' : ''} /> Refresh Diff
              </button>
              <button
                type="button"
                onClick={handleSelectAll}
                className="btn btn-xs btn-outline border-base-300 text-base-content/70 text-[11px]"
              >
                {selectedIds.length === filteredSwitches.length ? 'Batalkan Semua' : 'Pilih Semua'}
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <span className="loading loading-spinner text-primary loading-lg"></span>
              <p className="mt-3 text-xs text-base-content/60">
                Membandingkan database SwitchDevice dengan kanvas topologi...
              </p>
            </div>
          ) : filteredSwitches.length === 0 ? (
            <div className="text-center py-12 bg-base-200/40 rounded-2xl border border-base-300 p-6">
              <FaNetworkWired className="h-8 w-8 text-base-content/40 mx-auto mb-2" />
              <p className="text-sm font-semibold text-base-content/80">Tidak ada perangkat pada kategori ini</p>
              <p className="text-xs text-slate-500 mt-1">
                Semua switch di kategori ini sudah sesuai atau belum terdaftar di modul Switch VLAN.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {filteredSwitches.map((sw) => {
                const isSelected = selectedIds.includes(sw.switchId);
                const isNew = sw.syncStatus === 'new';
                const isUpdate = sw.syncStatus === 'needs_update';

                return (
                  <div
                    key={sw.switchId}
                    onClick={() => handleToggleSelect(sw.switchId)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 select-none ${
                      isSelected
                        ? 'border-primary/50 bg-primary/5 shadow-xs'
                        : 'border-base-300 bg-base-200/30 hover:border-base-300/80 hover:bg-base-200/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}} // handled by parent div onClick
                        className="checkbox checkbox-primary checkbox-sm shrink-0"
                      />

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="p-1 rounded bg-base-100 border border-base-300">
                            {(() => {
                              switch (sw.deviceType) {
                                case 'router': return <FaRoute className="h-3.5 w-3.5 text-sky-400" />;
                                case 'switch': return <FaNetworkWired className="h-3.5 w-3.5 text-emerald-400" />;
                                case 'nvr': case 'cctv': return <FaVideo className="h-3.5 w-3.5 text-amber-400" />;
                                case 'ap': return <FaWifi className="h-3.5 w-3.5 text-purple-400" />;
                                case 'server': return <FaServer className="h-3.5 w-3.5 text-indigo-400" />;
                                case 'firewall': return <FaShieldAlt className="h-3.5 w-3.5 text-rose-400" />;
                                default: return <FaNetworkWired className="h-3.5 w-3.5 text-emerald-400" />;
                              }
                            })()}
                          </span>
                          <span className="font-mono font-bold text-xs text-base-content">
                            {sw.name}
                          </span>
                          <span className="font-mono text-[11px] text-base-content/60">
                            {sw.ip}
                          </span>

                          <span className="badge badge-xs badge-outline border-base-300 font-mono text-[8px] uppercase">
                            {sw.deviceType || 'SWITCH'}
                          </span>

                          <span className="badge badge-xs bg-primary/10 text-primary border border-primary/20 font-mono text-[8px] uppercase">
                            {sw.connMethod || 'SNMP'}
                          </span>

                          {/* Status Badge */}
                          <span
                            className={`badge badge-xs font-mono text-[9px] ${
                              sw.status === 'online'
                                ? 'badge-success text-white font-bold'
                                : 'badge-error text-white'
                            }`}
                          >
                            {sw.status.toUpperCase()}
                          </span>

                          {/* Sync Diff Status */}
                          {isNew && (
                            <span className="badge badge-xs badge-accent font-bold text-[9px]">
                              BARU DI TEMUKAN
                            </span>
                          )}
                          {isUpdate && (
                            <span className="badge badge-xs badge-warning font-bold text-[9px]">
                              PERLU UPDATE
                            </span>
                          )}
                          {!isNew && !isUpdate && (
                            <span className="badge badge-xs badge-neutral text-base-content/60 text-[9px]">
                              TERSINKRON
                            </span>
                          )}
                        </div>

                        {/* Telemetry row */}
                        <div className="flex items-center gap-3 text-[11px] text-base-content/70 mt-1 font-mono flex-wrap">
                          <span>{sw.brand} · {sw.model}</span>
                          <span className="text-base-content/30">|</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{sw.portCount} Port SNMP</span>
                          <span className="text-base-content/30">|</span>
                          <span className="text-sky-600 dark:text-sky-400 font-semibold">{sw.vlanCount} VLAN Discovered</span>
                          <span className="text-base-content/30">|</span>
                          <span className="text-base-content/60">{sw.location}</span>
                        </div>

                        {/* Diff highlight message if any */}
                        {sw.diffs && (
                          <div className="mt-1.5 text-[10px] font-mono text-amber-500 dark:text-amber-300/90 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 inline-block">
                            Perubahan terdeteksi:{' '}
                            {sw.diffs.status && (
                              <span>
                                Status: {sw.diffs.status.canvas} → {sw.diffs.status.db}.{' '}
                              </span>
                            )}
                            {sw.diffs.ip && (
                              <span>
                                IP: {sw.diffs.ip.canvas} → {sw.diffs.ip.db}.{' '}
                              </span>
                            )}
                            {sw.diffs.ports && (
                              <span>
                                Port: {sw.diffs.ports.canvas} → {sw.diffs.ports.db} port riil.{' '}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      {isNew ? (
                        <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                          <FaPlus className="h-2.5 w-2.5" /> Tambahkan
                        </span>
                      ) : (
                        <span className="text-[11px] text-primary font-semibold flex items-center gap-1">
                          <FaSyncAlt className="h-2.5 w-2.5" /> Sinkronkan
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Sync Options Panel */}
          <div className="p-3.5 rounded-xl bg-base-200/40 border border-base-300 space-y-2 mt-4 text-xs font-mono">
            <div className="font-semibold text-base-content flex items-center gap-2">
              <FaShieldAlt className="text-emerald-600 dark:text-emerald-400" />
              Opsi Keamanan Topologi:
            </div>
            <label className="flex items-center gap-2 cursor-pointer text-base-content/80">
              <input
                type="checkbox"
                checked={preserveEdges}
                onChange={(e) => setPreserveEdges(e.target.checked)}
                className="checkbox checkbox-xs checkbox-primary"
              />
              <span>Pertahankan koneksi kabel yang sudah ada (Preserve Edges & Ports)</span>
            </label>
            <p className="text-[10px] text-base-content/60 pl-5">
              Jika aktif, kabel yang sudah tersambung antar perangkat tidak akan terputus saat nama atau status port switch diperbarui via SNMP.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-base-300 bg-base-200/50 flex items-center justify-between">
          <p className="text-xs text-base-content/70 font-mono">
            <span className="text-base-content font-bold">{selectedIds.length}</span> dari {switches.length} switch dipilih
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-sm btn-ghost text-base-content/70 hover:text-base-content"
            >
              Batalkan
            </button>
            <button
              type="button"
              onClick={handleApplySync}
              disabled={submitting || selectedIds.length === 0}
              className="btn btn-sm btn-primary gap-1.5 shadow-[0_0_15px_rgba(56,189,248,0.3)]"
            >
              <FaSyncAlt className={submitting ? 'animate-spin' : ''} />
              <span>
                {submitting
                  ? 'Menyinkronkan...'
                  : `Terapkan & Sinkronkan (${selectedIds.length})`}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
