'use client';

import { useState, useEffect } from 'react';
import { TopologyNode, TopologyEdge, LinkType } from '@/types/topology';
import { FaTimes, FaLink, FaCheck } from 'react-icons/fa';

interface ConnectPortModalProps {
  isOpen: boolean;
  onClose: () => void;
  devices: TopologyNode[];
  onConnect: (edge: TopologyEdge) => void;
  preselectedSourceNodeId?: string;
  preselectedSourcePort?: string;
}

const LINK_TYPES: { type: LinkType; label: string; color: string; desc: string }[] = [
  { type: 'fiber', label: 'Fiber Optic (SFP+)', color: 'text-sky-400 border-sky-400', desc: 'Backbone 10G antar Core & Distribution' },
  { type: 'copper', label: 'UTP Cat6 Gigabit', color: 'text-emerald-400 border-emerald-400', desc: 'Kabel LAN Ethernet Standar 1 Gbps' },
  { type: 'poe', label: 'Power over Ethernet (PoE)', color: 'text-amber-400 border-amber-400', desc: 'Daya & Data untuk NVR CCTV & Access Point' },
  { type: 'trunk', label: 'VLAN Trunk 802.1Q', color: 'text-purple-400 border-purple-400', desc: 'Membawa multi-VLAN (SIMRS, Medis, Hotspot)' },
  { type: 'wireless', label: 'Wireless Link (PTP)', color: 'text-blue-400 border-blue-400', desc: 'Jembatan nirkabel antar gedung' },
];

export default function ConnectPortModal({
  isOpen,
  onClose,
  devices,
  onConnect,
  preselectedSourceNodeId,
  preselectedSourcePort,
}: ConnectPortModalProps) {
  const [sourceNodeId, setSourceNodeId] = useState('');
  const [sourcePort, setSourcePort] = useState('');
  const [targetNodeId, setTargetNodeId] = useState('');
  const [targetPort, setTargetPort] = useState('');
  const [linkType, setLinkType] = useState<LinkType>('fiber');
  const [speed, setSpeed] = useState('10 Gbps');
  const [vlan, setVlan] = useState('');
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (devices.length >= 2) {
      const srcId = preselectedSourceNodeId || devices[0]?.id || '';
      setSourceNodeId(srcId);
      const srcDevice = devices.find((d) => d.id === srcId);
      setSourcePort(preselectedSourcePort || srcDevice?.ports[0]?.name || '');

      const otherDevices = devices.filter((d) => d.id !== srcId);
      const tgtId = otherDevices[0]?.id || '';
      setTargetNodeId(tgtId);
      const tgtDevice = devices.find((d) => d.id === tgtId);
      setTargetPort(tgtDevice?.ports[0]?.name || '');
    }
  }, [isOpen, preselectedSourceNodeId, preselectedSourcePort, devices]);

  const sourceDevice = devices.find((d) => d.id === sourceNodeId);
  const targetDevice = devices.find((d) => d.id === targetNodeId);

  // Update speed when link type changes
  const handleLinkTypeChange = (lt: LinkType) => {
    setLinkType(lt);
    if (lt === 'fiber') setSpeed('10 Gbps');
    else if (lt === 'copper') setSpeed('1 Gbps');
    else if (lt === 'poe') setSpeed('1 Gbps');
    else if (lt === 'trunk') setSpeed('10 Gbps');
    else if (lt === 'wireless') setSpeed('300 Mbps');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceNodeId || !targetNodeId || !sourcePort || !targetPort) return;
    if (sourceNodeId === targetNodeId) {
      alert('Perangkat sumber dan target tidak boleh sama.');
      return;
    }

    const newEdge: TopologyEdge = {
      id: `edge-${Date.now()}`,
      sourceNodeId,
      sourcePort,
      targetNodeId,
      targetPort,
      linkType,
      speed,
      vlan: vlan.trim() || undefined,
      label: label.trim() || undefined,
      status: 'up',
    };

    onConnect(newEdge);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-base-100 border border-primary/20 rounded-2xl shadow-2xl p-6 text-base-content">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-base-300">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <FaLink className="text-primary h-4 w-4" />
              Hubungkan Port Antar-Perangkat
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Pilih port pada kedua perangkat untuk membuat koneksi kabel / link topologi.
            </p>
          </div>
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost text-base-content/60 hover:text-base-content"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* Sisi Sumber (Device A) -> Sisi Tujuan (Device B) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-base-200/50 border border-base-300">
            {/* Perangkat A */}
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-sky-400"></span> Perangkat Asal (A)
              </span>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Pilih Perangkat:</label>
                <select
                  value={sourceNodeId}
                  onChange={(e) => {
                    setSourceNodeId(e.target.value);
                    const dev = devices.find((d) => d.id === e.target.value);
                    setSourcePort(dev?.ports[0]?.name || '');
                  }}
                  className="select select-sm select-bordered w-full font-mono text-xs"
                  required
                >
                  {devices.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.type.toUpperCase()})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Pilih Port / Interface:</label>
                <select
                  value={sourcePort}
                  onChange={(e) => setSourcePort(e.target.value)}
                  className="select select-sm select-bordered w-full font-mono text-xs text-primary font-bold"
                  required
                >
                  {sourceDevice?.ports.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} ({p.speed || '1G'})
                    </option>
                  ))}
                  {(!sourceDevice?.ports || sourceDevice.ports.length === 0) && (
                    <option value="Port 1">Port 1 (Default)</option>
                  )}
                </select>
              </div>
            </div>

            {/* Perangkat B */}
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span> Perangkat Tujuan (B)
              </span>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Pilih Perangkat:</label>
                <select
                  value={targetNodeId}
                  onChange={(e) => {
                    setTargetNodeId(e.target.value);
                    const dev = devices.find((d) => d.id === e.target.value);
                    setTargetPort(dev?.ports[0]?.name || '');
                  }}
                  className="select select-sm select-bordered w-full font-mono text-xs"
                  required
                >
                  {devices
                    .filter((d) => d.id !== sourceNodeId)
                    .map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.type.toUpperCase()})
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Pilih Port / Interface:</label>
                <select
                  value={targetPort}
                  onChange={(e) => setTargetPort(e.target.value)}
                  className="select select-sm select-bordered w-full font-mono text-xs text-emerald-400 font-bold"
                  required
                >
                  {targetDevice?.ports.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} ({p.speed || '1G'})
                    </option>
                  ))}
                  {(!targetDevice?.ports || targetDevice.ports.length === 0) && (
                    <option value="Port 1">Port 1 (Default)</option>
                  )}
                </select>
              </div>
            </div>
          </div>

          {/* Tipe Link / Kabel */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
              Jenis Kabel / Media Transmisi
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {LINK_TYPES.map((lt) => {
                const isSelected = linkType === lt.type;
                return (
                  <button
                    type="button"
                    key={lt.type}
                    onClick={() => handleLinkTypeChange(lt.type)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-primary bg-primary/10 shadow-[0_0_10px_rgba(56,189,248,0.2)] ring-1 ring-primary'
                        : 'border-base-300 bg-base-200/40 hover:bg-base-200'
                    }`}
                  >
                    <span className="text-xs font-bold block">{lt.label}</span>
                    <span className="text-[10px] text-slate-500 line-clamp-1">{lt.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Spesifikasi Kecepatan & VLAN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Kecepatan Link (Speed)</label>
              <input
                type="text"
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
                placeholder="10 Gbps, 1 Gbps, 100 Mbps"
                className="input input-sm input-bordered w-full text-xs font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">
                Alokasi VLAN (Opsional)
              </label>
              <input
                type="text"
                value={vlan}
                onChange={(e) => setVlan(e.target.value)}
                placeholder="Contoh: Trunk (VLAN 10,20) / VLAN 40"
                className="input input-sm input-bordered w-full text-xs font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">
              Catatan / Label Jalur (Opsional)
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Contoh: Jalur Kabel Bawah Tanah Ruang Server ke Gedung IGD"
              className="input input-sm input-bordered w-full text-xs"
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-base-300">
            <button type="button" onClick={onClose} className="btn btn-sm btn-ghost">
              Batalkan
            </button>
            <button
              type="submit"
              className="btn btn-sm btn-primary gap-1.5 shadow-[0_0_12px_rgba(56,189,248,0.3)]"
            >
              <FaCheck className="h-3.5 w-3.5" /> Sambungkan Kabel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
