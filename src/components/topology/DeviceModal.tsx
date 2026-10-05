'use client';

import { useState, useEffect } from 'react';
import { DeviceType, DevicePort, TopologyNode, generateDefaultPorts } from '@/types/topology';
import {
  FaRoute,
  FaNetworkWired,
  FaVideo,
  FaWifi,
  FaServer,
  FaShieldAlt,
  FaDesktop,
  FaPlus,
  FaTimes,
  FaCheck,
} from 'react-icons/fa';

interface DeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (deviceData: Omit<TopologyNode, 'x' | 'y'> & { x?: number; y?: number }) => void;
  initialDevice?: TopologyNode | null;
}

const DEVICE_TYPES: { type: DeviceType; label: string; icon: any; color: string; desc: string }[] = [
  { type: 'router', label: 'Router', icon: FaRoute, color: 'text-sky-400 bg-sky-500/10 border-sky-500/30', desc: 'Core / Gateway MikroTik / Cisco' },
  { type: 'switch', label: 'Switch', icon: FaNetworkWired, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30', desc: 'Managed / Unmanaged Switch' },
  { type: 'nvr', label: 'NVR', icon: FaVideo, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30', desc: 'Network Video Recorder CCTV' },
  { type: 'ap', label: 'Access Point', icon: FaWifi, color: 'text-purple-400 bg-purple-500/10 border-purple-500/30', desc: 'WiFi Hotspot Ruang Pasien / Staf' },
  { type: 'server', label: 'Server', icon: FaServer, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30', desc: 'SIMRS, PACS, Database, FreeRADIUS' },
  { type: 'firewall', label: 'Firewall', icon: FaShieldAlt, color: 'text-rose-400 bg-rose-500/10 border-rose-500/30', desc: 'Keamanan Jaringan & Gateway' },
  { type: 'cctv', label: 'Kamera CCTV', icon: FaVideo, color: 'text-teal-400 bg-teal-500/10 border-teal-500/30', desc: 'IP Camera Ruangan / Koridor' },
  { type: 'pc', label: 'Workstation / PC', icon: FaDesktop, color: 'text-blue-400 bg-blue-500/10 border-blue-500/30', desc: 'PC Nurse Station / Ruang Dokter' },
];

export default function DeviceModal({ isOpen, onClose, onSave, initialDevice }: DeviceModalProps) {
  const [type, setType] = useState<DeviceType>('switch');
  const [name, setName] = useState('');
  const [ip, setIp] = useState('');
  const [mac, setMac] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState<'online' | 'warning' | 'offline'>('online');
  const [ports, setPorts] = useState<DevicePort[]>([]);
  const [newPortName, setNewPortName] = useState('');
  const [newPortSpeed, setNewPortSpeed] = useState('1G');

  useEffect(() => {
    if (initialDevice) {
      setType(initialDevice.type);
      setName(initialDevice.name);
      setIp(initialDevice.ip || '');
      setMac(initialDevice.mac || '');
      setBrand(initialDevice.brand || '');
      setModel(initialDevice.model || '');
      setLocation(initialDevice.location || '');
      setStatus(initialDevice.status);
      setPorts(initialDevice.ports || []);
    } else {
      setType('switch');
      setName('SW-BARU-01');
      setIp('192.168.100.20');
      setMac('');
      setBrand('Ruijie Networks');
      setModel('RG-NBS3100-24GT4SFP');
      setLocation('Gedung Rawat Inap Lt. 2');
      setStatus('online');
      setPorts(generateDefaultPorts('switch', 24));
    }
  }, [initialDevice, isOpen]);

  const handleTypeChange = (newType: DeviceType) => {
    setType(newType);
    if (!initialDevice) {
      setPorts(generateDefaultPorts(newType));
      if (newType === 'router') {
        setName('R-CORE-01');
        setBrand('MikroTik');
        setModel('CCR2004-1G-12S+2XS');
      } else if (newType === 'switch') {
        setName('SW-DIST-01');
        setBrand('TP-Link');
        setModel('TL-SG3428');
      } else if (newType === 'nvr') {
        setName('NVR-CCTV-01');
        setBrand('Hikvision');
        setModel('DS-7732NI-K4');
      } else if (newType === 'ap') {
        setName('AP-HOTSPOT-01');
        setBrand('Ruijie');
        setModel('RG-AP820-L');
      } else if (newType === 'server') {
        setName('SRV-APP-01');
        setBrand('Dell');
        setModel('PowerEdge R750');
      }
    }
  };

  const applyPortPreset = (count: number) => {
    setPorts(generateDefaultPorts(type, count));
  };

  const handleAddPort = () => {
    if (!newPortName.trim()) return;
    const newPort: DevicePort = {
      id: `p-${Date.now()}`,
      name: newPortName.trim(),
      speed: newPortSpeed,
      status: 'unconnected',
    };
    setPorts([...ports, newPort]);
    setNewPortName('');
  };

  const handleRemovePort = (portId: string) => {
    setPorts(ports.filter((p) => p.id !== portId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      id: initialDevice ? initialDevice.id : `node-${Date.now()}`,
      name: name.trim(),
      type,
      ip: ip.trim() || undefined,
      mac: mac.trim() || undefined,
      brand: brand.trim() || undefined,
      model: model.trim() || undefined,
      location: location.trim() || undefined,
      status,
      ports,
      x: initialDevice?.x,
      y: initialDevice?.y,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-base-100 border border-primary/20 rounded-2xl shadow-2xl p-6 text-base-content">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-base-300">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-primary animate-pulse"></span>
              {initialDevice ? 'Edit Perangkat Jaringan' : 'Tambah Perangkat Baru ke Topologi'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Tentukan jenis perangkat, identitas IP, lokasi ruangan, dan daftar nomor port.
            </p>
          </div>
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost text-base-content/60 hover:text-base-content"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* 1. Pilih Tipe Perangkat */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-base-content/70 block mb-2">
              1. Jenis Perangkat
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {DEVICE_TYPES.map((dt) => {
                const IconComponent = dt.icon;
                const isSelected = type === dt.type;
                return (
                  <button
                    type="button"
                    key={dt.type}
                    onClick={() => handleTypeChange(dt.type)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'border-primary bg-primary/15 text-primary shadow-[0_0_12px_rgba(56,189,248,0.25)] ring-1 ring-primary'
                        : 'border-base-300 bg-base-200/50 hover:bg-base-200 text-base-content/80'
                    }`}
                  >
                    <IconComponent className={`h-6 w-6 mb-1.5 ${isSelected ? 'text-primary' : 'text-base-content/60'}`} />
                    <span className="text-xs font-semibold">{dt.label}</span>
                    <span className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{dt.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Informasi Utama Perangkat */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">
                Nama / Hostname Perangkat <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: SW-CORE-RSUD / NVR-IGD"
                required
                className="input input-sm input-bordered w-full font-mono text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">
                Alamat IP Management
              </label>
              <input
                type="text"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                placeholder="Contoh: 192.168.100.1"
                className="input input-sm input-bordered w-full font-mono text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Brand / Merk</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="MikroTik, Ruijie, TP-Link, Cisco, Hikvision"
                className="input input-sm input-bordered w-full text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Model / Tipe Hardware</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Contoh: CCR2004 / TL-SG3428 / DS-7732NI"
                className="input input-sm input-bordered w-full text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">
                Lokasi / Gedung RSUD NTB
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Contoh: Server Room Lt. 2 / Gedung IGD Lt. 1"
                className="input input-sm input-bordered w-full text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Status Operasional</label>
              <select
                value={status}
                onChange={(e: any) => setStatus(e.target.value)}
                className="select select-sm select-bordered w-full text-sm"
              >
                <option value="online">🟢 Normal / Online</option>
                <option value="warning">🟡 Warning / Degradasi</option>
                <option value="offline">🔴 Offline / Terputus</option>
              </select>
            </div>
          </div>

          {/* 3. Manajemen Port & Interface */}
          <div className="bg-base-200/50 border border-base-300 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-base-content/80">
                  Daftar Nomor Port ({ports.length} Port Terdaftar)
                </h3>
                <p className="text-[11px] text-slate-500">
                  Port ini akan digunakan untuk menghubungkan kabel antar-perangkat pada diagram topologi.
                </p>
              </div>

              {/* Preset Buttons */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] text-slate-400">Preset:</span>
                <button
                  type="button"
                  onClick={() => applyPortPreset(8)}
                  className="btn btn-xs btn-outline border-base-300 text-xs"
                >
                  8 Port
                </button>
                <button
                  type="button"
                  onClick={() => applyPortPreset(16)}
                  className="btn btn-xs btn-outline border-base-300 text-xs"
                >
                  16 Port
                </button>
                <button
                  type="button"
                  onClick={() => applyPortPreset(24)}
                  className="btn btn-xs btn-outline border-base-300 text-xs"
                >
                  24 Port
                </button>
                <button
                  type="button"
                  onClick={() => applyPortPreset(48)}
                  className="btn btn-xs btn-outline border-base-300 text-xs"
                >
                  48 Port
                </button>
              </div>
            </div>

            {/* Input Tambah Port Manual */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={newPortName}
                onChange={(e) => setNewPortName(e.target.value)}
                placeholder="Nama port baru (contoh: ether1, port 24, SFP+ 1, PoE 5)"
                className="input input-sm input-bordered flex-1 text-xs font-mono"
              />
              <select
                value={newPortSpeed}
                onChange={(e) => setNewPortSpeed(e.target.value)}
                className="select select-sm select-bordered text-xs"
              >
                <option value="10G">10 Gbps (Fiber SFP+)</option>
                <option value="1G">1 Gbps (Gigabit)</option>
                <option value="100M">100 Mbps (Fast Ethernet)</option>
              </select>
              <button
                type="button"
                onClick={handleAddPort}
                className="btn btn-sm btn-primary gap-1"
              >
                <FaPlus className="h-3 w-3" /> Tambah
              </button>
            </div>

            {/* List Port Tags */}
            <div className="max-h-48 overflow-y-auto pr-1 flex flex-wrap gap-1.5 pt-2">
              {ports.map((p) => (
                <div
                  key={p.id}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-base-100 border border-base-300 text-xs font-mono shadow-xs hover:border-primary/40 transition-colors"
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${p.speed === '10G' ? 'bg-sky-400' : 'bg-emerald-400'}`}></span>
                  <span className="font-semibold">{p.name}</span>
                  <span className="text-[10px] text-slate-500">({p.speed || '1G'})</span>
                  <button
                    type="button"
                    onClick={() => handleRemovePort(p.id)}
                    className="text-slate-400 hover:text-rose-400 ml-1 transition-colors"
                    title="Hapus port"
                  >
                    ×
                  </button>
                </div>
              ))}
              {ports.length === 0 && (
                <p className="text-xs text-slate-500 italic py-2">
                  Belum ada port. Tambahkan port di atas atau pilih tombol preset.
                </p>
              )}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-base-300">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-sm btn-ghost"
            >
              Batalkan
            </button>
            <button
              type="submit"
              className="btn btn-sm btn-primary gap-1.5 shadow-[0_0_12px_rgba(56,189,248,0.3)]"
            >
              <FaCheck className="h-3.5 w-3.5" />
              {initialDevice ? 'Simpan Perubahan' : 'Tambahkan ke Topologi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
