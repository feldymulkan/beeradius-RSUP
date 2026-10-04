"use client";

import { useState, useEffect, useCallback } from "react";
import DataTable, { type ColumnDef } from "@/components/DataTable";
import toast from "react-hot-toast";
import { QRCodeCanvas } from "qrcode.react";

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
      
      if (!peersRes.ok || !configsRes.ok) throw new Error("Gagal mengambil data");
      
      const peersData = await peersRes.json();
      const configsData = await configsRes.json();
      
      setPeers(peersData);
      setConfigs(configsData);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (compositeId: string, name: string) => {
    if (!confirm(`Hapus peer "${name}" dari Mikrotik?`)) return;
    try {
      const res = await fetch(`/api/vpn/wireguard/${compositeId}`, { method: 'DELETE' });
      if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Gagal menghapus peer");
      }
      toast.success("Peer berhasil dihapus dari Mikrotik");
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
        throw new Error(data.message || "Gagal membuat peer");
      }
      
      toast.success("Peer baru ditambahkan ke Mikrotik");
      (document.getElementById('peer_modal') as any).close();
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
    } catch (_err) {}
  };

  const handleShowConfig = async (peer: WireguardPeer) => {
    setIsLoading(true);
    try {
        const res = await fetch(`/api/vpn/wireguard/${peer.id}`);
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Gagal mengambil detail peer dari Mikrotik");
        }
        
        const detailedPeer = await res.json();
        setShowConfig(detailedPeer);
        
        const mkConfig = configs.find(c => c.id === peer.mikrotikId);
        const host = mkConfig?.wgPublicHost || mkConfig?.host || "YOUR_SERVER_IP";
        
        setServerPubKey("");
        setServerEndpoint(`${host}:13231`);
        
        await fetchServerPubKey(peer.mikrotikId, peer.interface, host);
        (document.getElementById('config_modal') as any).showModal();
    } catch (err: any) {
        toast.error(err.message);
    } finally {
        setIsLoading(false);
    }
  };

  const generateConfig = (peer: WireguardPeer) => {
    if (!peer.privateKey) return "# Private Key tidak tersedia atau izin Mikrotik kurang (butuh policy 'sensitive')";
    
    return `[Interface]
ListenPort = ${peer.listenPort || "51820"}
PrivateKey = ${peer.privateKey}
Address = ${peer.allowedIps}
DNS = 8.8.8.8, 10.9.1.3

[Peer]
PublicKey = ${serverPubKey || "MASUKKAN_PUBLIC_KEY_SERVER"}
AllowedIPs = 0.0.0.0/0, ::/0
Endpoint = ${serverEndpoint}
${peer.presharedKey ? `PresharedKey = ${peer.presharedKey}` : ""}
PersistentKeepalive = 25`;
  };

  const columns: ColumnDef<WireguardPeer>[] = [
    { header: "Nama (Comment)", accessorKey: "name" },
    { header: "Router Mikrotik", accessorKey: "mikrotikName" },
    { header: "Interface", accessorKey: "interface" },
    { header: "IP Client", accessorKey: "allowedIps" },
    {
      header: "Aksi",
      className: "text-center",
      cell: (peer) => (
        <div className="flex items-center justify-center gap-2">
          <button className="btn btn-sm btn-success" onClick={() => handleShowConfig(peer)}>Config / QR</button>
          <button className="btn btn-sm btn-error" onClick={() => handleDelete(peer.id, peer.name)}>Hapus</button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-2xl font-bold">Manajemen VPN WireGuard</h1>
            <p className="text-sm opacity-60">Data diambil langsung dari Mikrotik REST API (Tanpa DB Lokal)</p>
        </div>
        <div className="flex gap-2">
            <button className="btn btn-ghost btn-sm" onClick={fetchData} disabled={isLoading}>
                {isLoading ? <span className="loading loading-spinner loading-xs"></span> : "🔄 Refresh"}
            </button>
            <button className="btn btn-primary" onClick={() => (document.getElementById('peer_modal') as any).showModal()}>Tambah Peer Baru</button>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-0">
          <DataTable data={peers} columns={columns} page={1} pageSize={100} totalPages={1} />
        </div>
      </div>

      <dialog id="peer_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Tambah Peer WireGuard Baru</h3>
          <form onSubmit={handleSubmit} className="py-4 space-y-4">
            <div className="form-control">
              <label className="label"><span className="label-text">Pilih Mikrotik</span></label>
              <select 
                className="select select-bordered w-full"
                value={newPeer.mikrotikId}
                onChange={e => setNewPeer({...newPeer, mikrotikId: e.target.value})}
                required
              >
                <option value="">-- Pilih Mikrotik --</option>
                {configs.map(c => <option key={c.id} value={c.id.toString()}>{c.name}</option>)}
              </select>
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Nama Peer (akan disimpan di Comment)</span></label>
              <input 
                type="text" 
                value={newPeer.name} 
                onChange={e => setNewPeer({...newPeer, name: e.target.value})}
                className="input input-bordered w-full" 
                placeholder="Misal: Laptop-Budi"
                required 
              />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">IP Client (Allowed IPs)</span></label>
              <input 
                type="text" 
                value={newPeer.allowedIps} 
                onChange={e => setNewPeer({...newPeer, allowedIps: e.target.value})}
                className="input input-bordered w-full" 
                placeholder="10.0.0.2/32"
                required 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Interface WG</span></label>
                <input 
                  type="text" 
                  value={newPeer.interfaceName} 
                  onChange={e => setNewPeer({...newPeer, interfaceName: e.target.value})}
                  className="input input-bordered w-full" 
                  placeholder="wireguard1"
                  required 
                />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Server Endpoint</span></label>
                <input 
                  type="text" 
                  value={newPeer.endpoint} 
                  onChange={e => setNewPeer({...newPeer, endpoint: e.target.value})}
                  className="input input-bordered w-full" 
                  placeholder="domain.com:13231"
                />
              </div>
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={() => (document.getElementById('peer_modal') as any).close()}>Batal</button>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? <span className="loading loading-spinner"></span> : "Simpan ke Mikrotik"}
              </button>
            </div>
          </form>
        </div>
      </dialog>

      <dialog id="config_modal" className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-lg">Konfigurasi WireGuard (Real-time dari Mikrotik)</h3>
          <div className="py-4 space-y-6">
            {!showConfig?.privateKey && !isLoading && (
                <div className="alert alert-warning text-sm">
                    ⚠️ <strong>Private Key tidak ditemukan.</strong> <br/>
                    Pastikan user API Mikrotik memiliki izin <code>sensitive</code> dan RouterOS versi 7.12+.
                </div>
            )}
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="bg-white p-4 rounded-lg">
                {showConfig && showConfig.privateKey ? (
                  <QRCodeCanvas 
                    value={generateConfig(showConfig)} 
                    size={256}
                    level="M"
                  />
                ) : (
                    <div className="w-64 h-64 bg-base-200 flex items-center justify-center text-center p-4 text-xs italic opacity-50">
                        {isLoading ? "Memuat..." : "QR Code tidak tersedia tanpa Private Key"}
                    </div>
                )}
              </div>
              <div className="flex-1 w-full">
                <div className="form-control mb-4">
                  <label className="label"><span className="label-text">Server Public Key</span></label>
                  <input 
                    type="text" 
                    value={serverPubKey} 
                    onChange={e => setServerPubKey(e.target.value)}
                    className="input input-bordered w-full input-sm" 
                    placeholder="Auto-fetching..."
                  />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text">Konfigurasi Teks</span></label>
                  <textarea 
                    className="textarea textarea-bordered h-48 font-mono text-xs" 
                    readOnly 
                    value={showConfig ? generateConfig(showConfig) : ""}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-action">
            <button className="btn" onClick={() => (document.getElementById('config_modal') as any).close()}>Tutup</button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
