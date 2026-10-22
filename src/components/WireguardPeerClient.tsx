"use client";

import { useState, useEffect, useCallback } from "react";
import DataTable, { type ColumnDef } from "@/components/DataTable";
import toast from "react-hot-toast";
import { QRCodeCanvas } from "qrcode.react";
import { 
  FaShieldAlt, 
  FaSync, 
  FaPlus, 
  FaQrcode, 
  FaTrash, 
  FaCopy, 
  FaDownload, 
  FaCheck, 
  FaServer 
} from "react-icons/fa";

type WireguardPeer = {
  id: string; // Format composite "mikrotikId:peerId"
  name: string;
  publicKey: string;
  privateKey?: string;
  presharedKey?: string;
  allowedIps: string;
  interface: string;
  endpoint?: string;
  listenPort?: string | number;
  mikrotikId: number;
  mikrotikName: string;
};

type MikrotikConfig = {
  id: number;
  name: string;
  host: string;
  wgPublicHost?: string;
};

export default function WireguardPeerClient() {
  const [peers, setPeers] = useState<WireguardPeer[]>([]);
  const [configs, setConfigs] = useState<MikrotikConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfig, setShowConfig] = useState<WireguardPeer | null>(null);
  const [serverPubKey, setServerPubKey] = useState("");
  const [serverEndpoint, setServerEndpoint] = useState("");
  const [copied, setCopied] = useState(false);

  const [newPeer, setNewPeer] = useState({
    mikrotikId: "",
    name: "",
    allowedIps: "",
    interfaceName: "wireguard1",
    endpoint: "",
    comment: ""
  });

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [peersRes, configsRes] = await Promise.all([
        fetch("/api/vpn/wireguard"),
        fetch("/api/settings/mikrotik")
      ]);
      
      if (!peersRes.ok || !configsRes.ok) throw new Error("Gagal mengambil data dari router MikroTik");
      
      const peersData = await peersRes.json();
      const configsData = await configsRes.json();
      
      setPeers(peersData || []);
      setConfigs(configsData || []);
    } catch (err: any) {
      toast.error(err.message || "Gagal mengambil data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (compositeId: string, name: string) => {
    if (!confirm(`Hapus peer WireGuard "${name}" dari router MikroTik?`)) return;
    try {
      const res = await fetch(`/api/vpn/wireguard/${compositeId}`, { method: 'DELETE' });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Gagal menghapus peer");
      }
      toast.success(`Peer "${name}" berhasil dihapus dari router MikroTik`);
      fetchData();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/vpn/wireguard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPeer),
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Gagal membuat peer baru");
      }
      
      toast.success("Peer WireGuard baru berhasil ditambahkan ke MikroTik");
      (document.getElementById('peer_modal') as any)?.close();
      setNewPeer({
        mikrotikId: "",
        name: "",
        allowedIps: "",
        interfaceName: "wireguard1",
        endpoint: "",
        comment: ""
      });
      fetchData();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchServerPubKey = async (mkId: number, interfaceName: string, host: string) => {
    try {
      const res = await fetch(`/api/settings/mikrotik/${mkId}/wg-interfaces`);
      if (!res.ok) return;
      const interfaces = await res.json();
      const iface = interfaces.find((i: any) => i.name === interfaceName);
      if (iface) {
        if (iface["public-key"]) setServerPubKey(iface["public-key"]);
        if (iface["listen-port"]) setServerEndpoint(`${host}:${iface["listen-port"]}`);
      }
    } catch {}
  };

  const handleShowConfig = async (peer: WireguardPeer) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/vpn/wireguard/${peer.id}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Gagal mengambil detail peer dari MikroTik");
      }
      
      const detailedPeer = await res.json();
      setShowConfig(detailedPeer);
      
      const mkConfig = configs.find(c => c.id === peer.mikrotikId);
      const host = mkConfig?.wgPublicHost || mkConfig?.host || "YOUR_SERVER_IP";
      
      setServerPubKey("");
      setServerEndpoint(`${host}:13231`);
      
      await fetchServerPubKey(peer.mikrotikId, peer.interface, host);
      (document.getElementById('config_modal') as any)?.showModal();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const generateConfig = (peer: WireguardPeer) => {
    if (!peer.privateKey) return "# Private Key tidak tersedia atau user API kurang izin (membutuhkan policy 'sensitive' pada MikroTik)";
    
    return `[Interface]
PrivateKey = ${peer.privateKey}
Address = ${peer.allowedIps}
DNS = 8.8.8.8, 10.9.1.3

[Peer]
PublicKey = ${serverPubKey || "MASUKKAN_PUBLIC_KEY_SERVER"}
AllowedIPs = 0.0.0.0/0, ::/0
Endpoint = ${serverEndpoint}
${peer.presharedKey ? `PresharedKey = ${peer.presharedKey}\n` : ""}PersistentKeepalive = 25`;
  };

  const handleCopyConfig = () => {
    if (!showConfig) return;
    const conf = generateConfig(showConfig);
    navigator.clipboard.writeText(conf);
    setCopied(true);
    toast.success("Konfigurasi WireGuard disalin ke clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadConfig = () => {
    if (!showConfig) return;
    const conf = generateConfig(showConfig);
    const blob = new Blob([conf], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const safeName = (showConfig.name || "client").replace(/[^a-zA-Z0-9_-]/g, "_").toLowerCase();
    const filename = `wg-${safeName}.conf`;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`File ${filename} berhasil diunduh!`);
  };

  const columns: ColumnDef<WireguardPeer>[] = [
    { 
      header: "Nama Klien (Comment)", 
      accessorKey: "name",
      cell: (peer) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-info/10 text-info border border-info/20 flex items-center justify-center font-bold text-xs shrink-0">
            <FaShieldAlt size={12} />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-base-content text-sm truncate max-w-[200px]">{peer.name}</p>
            <p className="text-[11px] font-mono text-base-content/50 truncate max-w-[200px]">
              Key: {peer.publicKey ? `${peer.publicKey.slice(0, 10)}...` : "-"}
            </p>
          </div>
        </div>
      )
    },
    { 
      header: "Router MikroTik", 
      accessorKey: "mikrotikName",
      cell: (peer) => (
        <div className="flex items-center gap-1.5 text-xs text-base-content/80">
          <FaServer className="text-primary/70 shrink-0" size={11} />
          <span className="font-medium">{peer.mikrotikName}</span>
        </div>
      )
    },
    { 
      header: "Interface", 
      accessorKey: "interface",
      cell: (peer) => (
        <span className="badge badge-sm badge-neutral font-mono text-xs">{peer.interface}</span>
      )
    },
    { 
      header: "IP Klien (Tunnel)", 
      accessorKey: "allowedIps",
      cell: (peer) => (
        <span className="badge badge-sm badge-info badge-outline font-mono text-xs font-semibold">
          {peer.allowedIps}
        </span>
      )
    },
    {
      header: "Aksi",
      className: "text-center",
      cell: (peer) => (
        <div className="flex items-center justify-center gap-1.5">
          <button 
            className="btn btn-xs btn-primary gap-1 shadow-xs cursor-pointer" 
            onClick={() => handleShowConfig(peer)}
            title="Lihat QR Code & Konfigurasi"
          >
            <FaQrcode size={10} />
            <span>Config / QR</span>
          </button>
          <button 
            className="btn btn-xs btn-error btn-outline gap-1 cursor-pointer" 
            onClick={() => handleDelete(peer.id, peer.name)}
            title="Hapus peer dari MikroTik"
          >
            <FaTrash size={10} />
            <span>Hapus</span>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="card bg-base-100 border border-base-300 shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-info/10 text-info border border-info/20 flex items-center justify-center text-xl shadow-xs shrink-0">
              <FaShieldAlt />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold text-base-content">
                  Manajemen VPN WireGuard
                </h1>
                <span className="badge badge-info badge-sm font-mono font-bold gap-1">
                  {peers.length} Peer Terdaftar
                </span>
                <span className="badge badge-neutral badge-sm font-mono">
                  {configs.length} Router Terhubung
                </span>
              </div>
              <p className="text-xs text-base-content/70 mt-1">
                Sinkronisasi data langsung via <strong>MikroTik REST API</strong> tanpa database lokal • Protokol UDP cepat &amp; modern RSUD NTB
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto shrink-0">
            <button 
              className="btn btn-ghost border border-base-300 btn-sm gap-1.5 cursor-pointer" 
              onClick={fetchData} 
              disabled={isLoading}
              title="Refresh daftar peer"
            >
              <FaSync className={isLoading ? "animate-spin text-primary" : ""} />
              <span className="text-xs">Refresh</span>
            </button>
            <button 
              className="btn btn-primary btn-sm gap-1.5 shadow-md cursor-pointer" 
              onClick={() => (document.getElementById('peer_modal') as any)?.showModal()}
              disabled={configs.length === 0}
            >
              <FaPlus />
              <span>Tambah Peer Baru</span>
            </button>
          </div>
        </div>

        {configs.length === 0 && !isLoading && (
          <div className="alert alert-warning text-xs mt-4">
            <span>
              ⚠️ Belum ada koneksi MikroTik yang aktif. Silakan tambahkan router di menu <strong>Sistem → Koneksi MikroTik</strong> terlebih dahulu.
            </span>
          </div>
        )}
      </div>

      {/* TABLE SECTION */}
      <div className="card bg-base-100 border border-base-300 shadow-md overflow-hidden">
        <div className="p-0">
          <DataTable 
            data={peers} 
            columns={columns} 
            page={1} 
            pageSize={100} 
            totalPages={1}
            isLoading={isLoading} 
          />
        </div>
      </div>

      {/* MODAL TAMBAH PEER */}
      <dialog id="peer_modal" className="modal">
        <div className="modal-box bg-base-100 border border-base-300 text-base-content max-w-lg">
          <div className="flex items-center gap-2 pb-2 border-b border-base-200">
            <FaShieldAlt className="text-info" />
            <h3 className="font-bold text-base sm:text-lg">Tambah Peer WireGuard Baru</h3>
          </div>

          <form onSubmit={handleSubmit} className="py-4 space-y-4">
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-semibold text-xs text-base-content">Pilih Router MikroTik *</span>
              </label>
              <select 
                className="select select-bordered select-sm w-full text-xs"
                value={newPeer.mikrotikId}
                onChange={e => setNewPeer({...newPeer, mikrotikId: e.target.value})}
                required
              >
                <option value="">-- Pilih Router MikroTik --</option>
                {configs.map(c => (
                  <option key={c.id} value={c.id.toString()}>
                    {c.name} ({c.host})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-semibold text-xs text-base-content">Nama Klien / Perangkat *</span>
              </label>
              <input 
                type="text" 
                value={newPeer.name} 
                onChange={e => setNewPeer({...newPeer, name: e.target.value})}
                className="input input-bordered input-sm w-full text-xs" 
                placeholder="Misal: dr. Budi - Laptop Poli"
                required 
              />
              <span className="text-[10px] text-base-content/60 mt-1">Nama ini akan disimpan pada field Comment di MikroTik.</span>
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-semibold text-xs text-base-content">IP Client Tunnel (Allowed IPs) *</span>
              </label>
              <input 
                type="text" 
                value={newPeer.allowedIps} 
                onChange={e => setNewPeer({...newPeer, allowedIps: e.target.value})}
                className="input input-bordered input-sm w-full font-mono text-xs" 
                placeholder="10.8.0.2/32"
                required 
              />
              <span className="text-[10px] text-base-content/60 mt-1">Gunakan subnet /32 untuk alokasi 1 IP per perangkat.</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-semibold text-xs text-base-content">Interface WG</span>
                </label>
                <input 
                  type="text" 
                  value={newPeer.interfaceName} 
                  onChange={e => setNewPeer({...newPeer, interfaceName: e.target.value})}
                  className="input input-bordered input-sm w-full font-mono text-xs" 
                  placeholder="wireguard1"
                  required 
                />
              </div>

              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-semibold text-xs text-base-content">Server Endpoint (Opsional)</span>
                </label>
                <input 
                  type="text" 
                  value={newPeer.endpoint} 
                  onChange={e => setNewPeer({...newPeer, endpoint: e.target.value})}
                  className="input input-bordered input-sm w-full font-mono text-xs" 
                  placeholder="vpn.rsudntb.id:13231"
                />
              </div>
            </div>

            <div className="modal-action pt-2">
              <button 
                type="button" 
                className="btn btn-sm btn-ghost cursor-pointer" 
                onClick={() => (document.getElementById('peer_modal') as any)?.close()}
              >
                Batal
              </button>
              <button 
                type="submit" 
                className="btn btn-sm btn-primary cursor-pointer gap-1" 
                disabled={isSubmitting}
              >
                {isSubmitting ? <span className="loading loading-spinner loading-xs"></span> : <FaPlus size={10} />}
                <span>Simpan ke MikroTik</span>
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* MODAL CONFIG & QR CODE */}
      <dialog id="config_modal" className="modal">
        <div className="modal-box bg-base-100 border border-base-300 text-base-content max-w-3xl">
          <div className="flex items-center justify-between pb-3 border-b border-base-200">
            <div className="flex items-center gap-2">
              <FaQrcode className="text-primary" />
              <h3 className="font-bold text-base sm:text-lg">
                Konfigurasi Klien: <span className="text-primary">{showConfig?.name || "WireGuard"}</span>
              </h3>
            </div>
            <span className="badge badge-info badge-sm font-mono">{showConfig?.allowedIps}</span>
          </div>

          <div className="py-4 space-y-4">
            {!showConfig?.privateKey && !isLoading && (
              <div className="alert alert-warning text-xs">
                <span>
                  ⚠️ <strong>Private Key tidak dapat dibaca.</strong> Pastikan user API MikroTik memiliki policy <code>sensitive</code> dan RouterOS versi 7.12+.
                </span>
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              {/* QR Code Container */}
              <div className="flex flex-col items-center gap-2 shrink-0">
                <div className="bg-white p-3 rounded-xl border border-slate-300 shadow-md">
                  {showConfig && showConfig.privateKey ? (
                    <QRCodeCanvas 
                      value={generateConfig(showConfig)} 
                      size={200}
                      level="M"
                    />
                  ) : (
                    <div className="w-[200px] h-[200px] bg-slate-100 text-slate-500 flex items-center justify-center text-center p-4 text-xs italic">
                      {isLoading ? "Memuat data..." : "QR Code membutuhkan Private Key"}
                    </div>
                  )}
                </div>
                <span className="text-[11px] text-base-content/60 font-mono text-center">
                  Scan via aplikasi WireGuard (iOS/Android)
                </span>
              </div>

              {/* Teks Konfigurasi & Endpoint */}
              <div className="flex-1 w-full space-y-3">
                <div className="form-control">
                  <label className="label py-0.5">
                    <span className="label-text font-semibold text-xs text-base-content">Server Public Key</span>
                  </label>
                  <input 
                    type="text" 
                    value={serverPubKey} 
                    onChange={e => setServerPubKey(e.target.value)}
                    className="input input-bordered input-sm w-full font-mono text-xs" 
                    placeholder="Auto-fetching..."
                  />
                </div>

                <div className="form-control">
                  <div className="flex justify-between items-center mb-1">
                    <label className="label py-0">
                      <span className="label-text font-semibold text-xs text-base-content">File Konfigurasi (.conf)</span>
                    </label>
                    <div className="flex gap-1.5">
                      <button 
                        type="button"
                        onClick={handleCopyConfig}
                        className="btn btn-xs btn-ghost border border-base-300 gap-1 cursor-pointer"
                        title="Salin ke clipboard"
                      >
                        {copied ? <FaCheck className="text-success" size={10} /> : <FaCopy size={10} />}
                        <span className="text-[10px]">{copied ? "Tersalin!" : "Salin"}</span>
                      </button>
                      <button 
                        type="button"
                        onClick={handleDownloadConfig}
                        className="btn btn-xs btn-primary gap-1 cursor-pointer shadow-xs"
                        title="Download file konfigurasi"
                      >
                        <FaDownload size={10} />
                        <span className="text-[10px]">Download .conf</span>
                      </button>
                    </div>
                  </div>

                  <textarea 
                    className="textarea textarea-bordered h-44 font-mono text-xs leading-relaxed bg-base-200/50" 
                    readOnly 
                    value={showConfig ? generateConfig(showConfig) : ""}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="modal-action border-t border-base-200 pt-3">
            <button 
              className="btn btn-sm btn-ghost cursor-pointer" 
              onClick={() => (document.getElementById('config_modal') as any)?.close()}
            >
              Tutup
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
