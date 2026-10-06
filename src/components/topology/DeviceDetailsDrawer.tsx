'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TopologyNode, TopologyEdge } from '@/types/topology';
import {
  FaTimes,
  FaLink,
  FaEdit,
  FaTrash,
  FaNetworkWired,
  FaRoute,
  FaVideo,
  FaWifi,
  FaServer,
  FaShieldAlt,
  FaDesktop,
  FaPlug,
  FaLayerGroup,
  FaExternalLinkAlt,
  FaMicrochip,
  FaCheckCircle,
} from 'react-icons/fa';

interface DeviceDetailsDrawerProps {
  device: TopologyNode | null | undefined;
  edges: TopologyEdge[];
  allDevices: TopologyNode[];
  onClose: () => void;
  onEdit: (device: TopologyNode) => void;
  onDelete: (deviceId: string) => void;
  onConnectPort: (deviceId: string, portName?: string) => void;
  onDisconnectEdge: (edgeId: string) => void;
}

export default function DeviceDetailsDrawer({
  device,
  edges,
  allDevices,
  onClose,
  onEdit,
  onDelete,
  onConnectPort,
  onDisconnectEdge,
}: DeviceDetailsDrawerProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'ports' | 'vlans'>('info');

  if (!device) return null;

  // Find all edges connected to this device
  const connectedEdges = edges.filter(
    (e) => e.sourceNodeId === device.id || e.targetNodeId === device.id
  );

  const isSwitch = device.type === 'switch';
  const hasVlans = Array.isArray(device.vlans) && device.vlans.length > 0;

  const getDeviceIcon = (t: string) => {
    switch (t) {
      case 'router': return <FaRoute className="h-4 w-4 text-sky-400" />;
      case 'switch': return <FaNetworkWired className="h-4 w-4 text-emerald-400" />;
      case 'nvr': return <FaVideo className="h-4 w-4 text-amber-400" />;
      case 'ap': return <FaWifi className="h-4 w-4 text-purple-400" />;
      case 'server': return <FaServer className="h-4 w-4 text-indigo-400" />;
      case 'firewall': return <FaShieldAlt className="h-4 w-4 text-rose-400" />;
      case 'cctv': return <FaVideo className="h-4 w-4 text-teal-400" />;
      default: return <FaDesktop className="h-4 w-4 text-blue-400" />;
    }
  };

  return (
    <div className="absolute top-4 right-4 z-40 w-[calc(100vw-2rem)] sm:w-[440px] max-h-[calc(100%-2rem)] flex flex-col bg-base-100/95 backdrop-blur-xl border border-primary/20 rounded-2xl shadow-2xl overflow-hidden animate-slideIn">
      {/* Header Drawer */}
      <div className="p-4 border-b border-base-300 flex items-center justify-between bg-base-200/50">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-2 rounded-xl bg-base-100 border border-base-300 shadow-xs shrink-0">
            {getDeviceIcon(device.type)}
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-sm text-base-content font-mono flex items-center gap-1.5 truncate">
              {device.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
              <span className="text-[10px] text-base-content/60 uppercase tracking-wider font-semibold">
                {device.type.toUpperCase()} · {device.brand || 'Perangkat Jaringan'}
              </span>
              {device.isSnmpSynced && (
                <span className="badge badge-xs badge-primary font-mono text-[8px] gap-1">
                  <FaCheckCircle className="h-2 w-2" /> SNMP SYNCED
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="btn btn-xs btn-circle btn-ghost text-base-content/60 hover:text-base-content shrink-0"
        >
          <FaTimes />
        </button>
      </div>

      {/* Tabs if Switch has SNMP data */}
      {isSwitch && (
        <div className="flex items-center px-4 pt-2 border-b border-base-300 bg-base-200/30 gap-1 text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab('info')}
            className={`pb-2 px-2.5 font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'info'
                ? 'border-primary text-primary'
                : 'border-transparent text-base-content/60 hover:text-base-content'
            }`}
          >
            Ringkasan & Kabel
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ports')}
            className={`pb-2 px-2.5 font-semibold border-b-2 transition-all flex items-center gap-1 cursor-pointer ${
              activeTab === 'ports'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-base-content/60 hover:text-base-content'
            }`}
          >
            <FaMicrochip className="h-3 w-3" />
            Port Matrix ({device.ports?.length || 0})
          </button>
          {hasVlans && (
            <button
              type="button"
              onClick={() => setActiveTab('vlans')}
              className={`pb-2 px-2.5 font-semibold border-b-2 transition-all flex items-center gap-1 cursor-pointer ${
                activeTab === 'vlans'
                  ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                  : 'border-transparent text-base-content/60 hover:text-base-content'
              }`}
            >
              <FaLayerGroup className="h-3 w-3" />
              VLAN Discovered ({device.vlans?.length || 0})
            </button>
          )}
        </div>
      )}

      {/* Drawer Body */}
      <div className="p-4 space-y-4 overflow-y-auto flex-1 text-xs">
        {/* TAB 1: INFO & KABEL */}
        {activeTab === 'info' && (
          <div className="space-y-4">
            {/* Detail Spesifikasi */}
            <div className="grid grid-cols-2 gap-2 bg-base-200/50 p-3 rounded-xl border border-base-300 font-mono">
              <div>
                <span className="text-[10px] text-base-content/60 block uppercase">Alamat IP</span>
                <span className="font-semibold text-base-content">{device.ip || '-'}</span>
              </div>
              <div>
                <span className="text-[10px] text-base-content/60 block uppercase">Status</span>
                <span
                  className={`inline-flex items-center gap-1 font-semibold ${
                    device.status === 'online'
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : device.status === 'warning'
                      ? 'text-amber-500'
                      : 'text-rose-500'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      device.status === 'online'
                        ? 'bg-emerald-500 animate-pulse'
                        : device.status === 'warning'
                        ? 'bg-amber-500 animate-pulse'
                        : 'bg-rose-500'
                    }`}
                  ></span>
                  {device.status === 'warning' ? 'OFFLINE SNMP (PING OK)' : device.status.toUpperCase()}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-base-content/60 block uppercase">Hardware Model</span>
                <span className="text-base-content/90 font-medium line-clamp-1">{device.model || '-'}</span>
              </div>
              <div>
                <span className="text-[10px] text-base-content/60 block uppercase">Lokasi Gedung</span>
                <span className="text-base-content/90 font-medium line-clamp-1">{device.location || '-'}</span>
              </div>
              {device.lastPolled && (
                <div className="col-span-2 pt-1 border-t border-base-300/50">
                  <span className="text-[9px] text-slate-500 block uppercase">Polling SNMP Terakhir</span>
                  <span className="text-slate-400 text-[10px]">
                    {new Date(device.lastPolled).toLocaleString('id-ID')}
                  </span>
                </div>
              )}
            </div>

            {/* Quick Port Matrix Grid */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold uppercase tracking-wider text-slate-400 text-[11px]">
                  Koneksi Port ({device.ports?.length || 0} Port)
                </span>
                <button
                  type="button"
                  onClick={() => onConnectPort(device.id)}
                  className="text-[11px] text-primary hover:underline flex items-center gap-1 font-mono"
                >
                  <FaPlug className="h-3 w-3" /> Sambung Port
                </button>
              </div>

              <div className="grid grid-cols-4 gap-1.5 max-h-44 overflow-y-auto pr-1">
                {device.ports?.map((p) => {
                  const edge = connectedEdges.find(
                    (e) =>
                      (e.sourceNodeId === device.id && e.sourcePort === p.name) ||
                      (e.targetNodeId === device.id && e.targetPort === p.name)
                  );
                  const isConnected = !!edge;

                  return (
                    <div
                      key={p.id}
                      onClick={() => !isConnected && onConnectPort(device.id, p.name)}
                      className={`p-1.5 rounded-lg border text-center font-mono cursor-pointer transition-all ${
                        isConnected
                          ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 font-bold'
                          : 'border-base-300 bg-base-200/40 text-base-content/70 hover:border-primary/40 hover:text-base-content'
                      }`}
                      title={
                        isConnected
                          ? `Terhubung ke: ${
                              edge.sourceNodeId === device.id
                                ? allDevices.find((d) => d.id === edge.targetNodeId)?.name + ' (' + edge.targetPort + ')'
                                : allDevices.find((d) => d.id === edge.sourceNodeId)?.name + ' (' + edge.sourcePort + ')'
                            }`
                          : `Port Kosong - Klik untuk menghubungkan`
                      }
                    >
                      <span className="block text-[10px] font-bold truncate">{p.name}</span>
                      <span
                        className={`block text-[9px] ${
                          isConnected
                            ? 'text-emerald-400'
                            : p.status === 'up'
                            ? 'text-sky-400'
                            : 'text-slate-500'
                        }`}
                      >
                        {isConnected ? 'LINK UP' : p.status === 'up' ? 'ACTIVE' : 'IDLE'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active Connected Cables */}
            <div>
              <span className="font-semibold uppercase tracking-wider text-slate-400 text-[11px] block mb-2 font-mono">
                Koneksi Kabel Aktif ({connectedEdges.length})
              </span>

              {connectedEdges.length === 0 ? (
                <p className="text-[11px] text-slate-500 italic p-3 bg-base-200/30 rounded-xl">
                  Belum ada port yang terhubung kabel ke perangkat lain.
                </p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {connectedEdges.map((e) => {
                    const isSource = e.sourceNodeId === device.id;
                    const otherDevId = isSource ? e.targetNodeId : e.sourceNodeId;
                    const otherDevice = allDevices.find((d) => d.id === otherDevId);
                    const localPort = isSource ? e.sourcePort : e.targetPort;
                    const remotePort = isSource ? e.targetPort : e.sourcePort;

                    return (
                      <div
                        key={e.id}
                        className="p-2.5 rounded-xl border border-base-300 bg-base-200/50 flex items-center justify-between gap-2"
                      >
                        <div className="space-y-0.5 min-w-0">
                          <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-base-content truncate">
                            <span className="text-primary truncate">{localPort}</span>
                            <span className="text-base-content/40">↔</span>
                            <span className="text-emerald-600 dark:text-emerald-400 truncate">
                              {otherDevice?.name} ({remotePort})
                            </span>
                          </div>
                          <p className="text-[10px] text-base-content/60 font-mono truncate">
                            {e.speed} · {e.linkType.toUpperCase()} {e.vlan ? `· ${e.vlan}` : ''}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => onDisconnectEdge(e.id)}
                          className="btn btn-xs btn-ghost text-base-content/60 hover:text-rose-500 p-1 shrink-0"
                          title="Putus kabel koneksi"
                        >
                          <FaTimes className="h-3 w-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PORT MATRIX DETAIL (SNMP) */}
        {activeTab === 'ports' && (
          <div className="space-y-3 font-mono">
            <div className="flex items-center justify-between">
              <span className="text-base-content/70 text-xs">
                Total: <strong className="text-base-content">{device.ports?.length || 0} Port Fisik</strong>
              </span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                {device.ports?.filter((p) => p.status === 'up').length || 0} Status UP
              </span>
            </div>

            <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
              {device.ports?.map((p, idx) => {
                const isUp = p.status === 'up';
                const edge = connectedEdges.find(
                  (e) =>
                    (e.sourceNodeId === device.id && e.sourcePort === p.name) ||
                    (e.targetNodeId === device.id && e.targetPort === p.name)
                );

                return (
                  <div
                    key={p.id || idx}
                    className={`p-2 rounded-xl border flex items-center justify-between gap-2 text-[11px] ${
                      edge
                        ? 'border-emerald-500/40 bg-emerald-500/5'
                        : isUp
                        ? 'border-base-300 bg-base-200/50'
                        : 'border-base-300/60 bg-base-200/20 opacity-75'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`h-2 w-2 rounded-full shrink-0 ${
                            isUp ? 'bg-emerald-500' : 'bg-slate-400'
                          }`}
                        ></span>
                        <span className="font-bold text-base-content truncate">{p.name}</span>
                        {p.type === 'sfp' && (
                          <span className="badge badge-xs badge-info font-mono text-[8px]">SFP</span>
                        )}
                        {p.pvid && (
                          <span className="badge badge-xs badge-neutral text-base-content/80 font-bold text-[8px]">
                            PVID {p.pvid}
                          </span>
                        )}
                      </div>
                      {p.alias && (
                        <p className="text-[10px] text-base-content/60 truncate pl-3.5 mt-0.5">
                          {p.alias}
                        </p>
                      )}
                      {p.taggedVlans && p.taggedVlans.length > 0 && (
                        <p className="text-[9px] text-purple-600 dark:text-purple-400 font-semibold truncate pl-3.5">
                          Trunk VLAN: {p.taggedVlans.join(', ')}
                        </p>
                      )}
                    </div>

                    <div className="shrink-0 text-right">
                      {edge ? (
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Kabel Terhubung</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onConnectPort(device.id, p.name)}
                          className="btn btn-xs btn-outline border-base-300 hover:border-primary text-base-content/80 hover:text-base-content text-[10px] h-6 px-2"
                        >
                          Hubungkan
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: VLAN DISCOVERED (SNMP) */}
        {activeTab === 'vlans' && (
          <div className="space-y-3 font-mono">
            <div className="flex items-center justify-between">
              <span className="text-base-content/70 text-xs">
                Total: <strong className="text-base-content">{device.vlans?.length || 0} VLAN Aktif</strong>
              </span>
              {device.ip && (
                <Link
                  href={`/switches?q=${encodeURIComponent(device.ip)}`}
                  target="_blank"
                  className="text-primary hover:underline text-[11px] flex items-center gap-1 font-sans font-medium"
                >
                  Buka di Switch VLAN <FaExternalLinkAlt className="h-2.5 w-2.5" />
                </Link>
              )}
            </div>

            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {device.vlans?.map((vlan) => (
                <div
                  key={vlan.vlanId}
                  className="p-3 rounded-xl border border-base-300 bg-base-200/50 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-base-content flex items-center gap-1.5">
                      <span className="badge badge-sm badge-primary font-mono text-white">
                        VLAN {vlan.vlanId}
                      </span>
                      <span className="truncate">{vlan.name}</span>
                    </span>
                    <span className="text-[10px] text-base-content/60">
                      {vlan.allPorts?.length || 0} Port Terdaftar
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px] pt-1 border-t border-base-300/40">
                    <div>
                      <span className="text-base-content/60 uppercase block">Untagged Ports:</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        {vlan.untaggedPorts?.length > 0
                          ? vlan.untaggedPorts.join(', ')
                          : '-'}
                      </span>
                    </div>
                    <div>
                      <span className="text-base-content/60 uppercase block">Tagged Ports (Trunk):</span>
                      <span className="text-purple-600 dark:text-purple-400 font-semibold">
                        {vlan.taggedPorts?.length > 0
                          ? vlan.taggedPorts.join(', ')
                          : '-'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-3 border-t border-base-300 bg-base-200/50 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => {
            if (confirm(`Yakin ingin menghapus perangkat "${device.name}" dari diagram topologi?`)) {
              onDelete(device.id);
            }
          }}
          className="btn btn-xs btn-outline btn-error gap-1"
        >
          <FaTrash className="h-3 w-3" /> Hapus
        </button>

        <div className="flex items-center gap-1.5">
          {device.ip && (
            <Link
              href={`/switches?q=${encodeURIComponent(device.ip)}`}
              target="_blank"
              className="btn btn-xs btn-outline text-base-content/80 hover:text-base-content gap-1"
              title="Buka halaman Perangkat Jaringan"
            >
              <FaExternalLinkAlt className="h-2.5 w-2.5" /> Perangkat
            </Link>
          )}

          <button
            type="button"
            onClick={() => onEdit(device)}
            className="btn btn-xs btn-outline gap-1"
          >
            <FaEdit className="h-3 w-3" /> Edit
          </button>
          <button
            type="button"
            onClick={() => onConnectPort(device.id)}
            className="btn btn-xs btn-primary gap-1"
          >
            <FaLink className="h-3 w-3" /> Hubungkan
          </button>
        </div>
      </div>
    </div>
  );
}
