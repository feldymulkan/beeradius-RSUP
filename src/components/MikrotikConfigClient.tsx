"use client";

import { useState, useEffect } from "react";
import DataTable, { type ColumnDef } from "@/components/DataTable";
import toast from "react-hot-toast";

type MikrotikConfig = {
  id: number;
  name: string;
  host: string;
  port: number;
  username: string;
  useSsl: boolean;
};

export default function MikrotikConfigClient() {
  const [configs, setConfigs] = useState<MikrotikConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentConfig, setCurrentConfig] = useState<any>({
    name: "",
    host: "",
    port: 443,
    username: "",
    password: "",
    useSsl: true,
    wgPublicHost: ""
  });
  const [isEditing, setIsEditing] = useState(false);

  const fetchConfigs = async () => {
    try {
      const res = await fetch("/api/settings/mikrotik");
      if (!res.ok) throw new Error("Gagal mengambil data Mikrotik");
      const data = await res.json();
      setConfigs(data);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConfigs();
  }, []);

  const handleEditClick = (config: MikrotikConfig) => {
    setCurrentConfig({ ...config, password: "", wgPublicHost: (config as any).wgPublicHost || "" });
    setIsEditing(true);
    (document.getElementById('mikrotik_modal') as any).showModal();
  };

  const handleAddClick = () => {
    setCurrentConfig({
      name: "",
      host: "",
      port: 443,
      username: "",
      password: "",
      useSsl: true,
      wgPublicHost: ""
    });
    setIsEditing(false);
    (document.getElementById('mikrotik_modal') as any).showModal();
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Hapus koneksi Mikrotik "${name}"?`)) return;
    try {
      const res = await fetch(`/api/settings/mikrotik/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Gagal menghapus koneksi");
      }
      toast.success("Koneksi berhasil dihapus");
      fetchConfigs();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = isEditing ? `/api/settings/mikrotik/${currentConfig.id}` : "/api/settings/mikrotik";
      const method = isEditing ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentConfig),
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Gagal menyimpan data");
      }
      
      toast.success(isEditing ? "Koneksi diperbarui" : "Koneksi baru ditambahkan");
      (document.getElementById('mikrotik_modal') as any).close();
      fetchConfigs();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [isTesting, setIsTesting] = useState<number | null>(null);

  const testConnection = async (id: number) => {
    setIsTesting(id);
    try {
      const res = await fetch(`/api/settings/mikrotik/${id}/test-connection`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        toast.success(`${data.message} (${data.data.boardName} - v${data.data.version})`);
      } else {
        toast.error(data.message);
      }
    } catch (_err: any) {
      toast.error("Gagal melakukan tes koneksi");
    } finally {
      setIsTesting(null);
    }
  };

  const columns: ColumnDef<MikrotikConfig>[] = [
    { header: "Nama", accessorKey: "name" },
    { header: "Host/IP", accessorKey: "host" },
    { header: "Port", accessorKey: "port" },
    { header: "Username", accessorKey: "username" },
    { 
      header: "SSL", 
      accessorKey: "useSsl",
      cell: (config) => (config.useSsl ? "Ya" : "Tidak")
    },
    {
      header: "Status",
      className: "text-center",
      cell: (config) => (
        <button 
          className={`btn btn-xs ${isTesting === config.id ? 'btn-disabled' : 'btn-outline btn-ghost'}`}
          onClick={() => testConnection(config.id)}
          disabled={isTesting === config.id}
        >
          {isTesting === config.id ? <span className="loading loading-spinner loading-xs"></span> : "Cek Koneksi"}
        </button>
      )
    },
    {
      header: "Aksi",
      accessorKey: "id",
      className: "text-center",
      cell: (config) => (
        <div className="flex items-center justify-center gap-2">
          <button className="btn btn-sm btn-info" onClick={() => handleEditClick(config)}>Edit</button>
          <button className="btn btn-sm btn-error" onClick={() => handleDelete(config.id, config.name)}>Hapus</button>
        </div>
      ),
    },
  ];

  if (isLoading) return <div className="flex justify-center p-10"><span className="loading loading-spinner loading-lg"></span></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Koneksi Mikrotik (REST API)</h1>
        <button className="btn btn-primary" onClick={handleAddClick}>Tambah Koneksi</button>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-0">
          <DataTable data={configs} columns={columns} />
        </div>
      </div>

      <dialog id="mikrotik_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{isEditing ? "Edit Koneksi Mikrotik" : "Tambah Koneksi Mikrotik"}</h3>
          <form onSubmit={handleSubmit} className="py-4 space-y-4">
            <div className="form-control">
              <label className="label"><span className="label-text">Nama Koneksi</span></label>
              <input 
                type="text" 
                value={currentConfig.name} 
                onChange={e => setCurrentConfig({...currentConfig, name: e.target.value})}
                className="input input-bordered w-full" 
                placeholder="Misal: Router Utama"
                required 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Host / IP</span></label>
                <input 
                  type="text" 
                  value={currentConfig.host} 
                  onChange={e => setCurrentConfig({...currentConfig, host: e.target.value})}
                  className="input input-bordered w-full" 
                  placeholder="192.168.1.1"
                  required 
                />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Port</span></label>
                <input 
                  type="number" 
                  value={currentConfig.port} 
                  onChange={e => setCurrentConfig({...currentConfig, port: e.target.value})}
                  className="input input-bordered w-full" 
                  required 
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Username API</span></label>
              <input 
                type="text" 
                value={currentConfig.username} 
                onChange={e => setCurrentConfig({...currentConfig, username: e.target.value})}
                className="input input-bordered w-full" 
                required 
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">IP Publik / Domain WireGuard</span>
                <span className="label-text-alt text-info">Opsional</span>
              </label>
              <input 
                type="text" 
                value={currentConfig.wgPublicHost} 
                onChange={e => setCurrentConfig({...currentConfig, wgPublicHost: e.target.value})}
                className="input input-bordered w-full" 
                placeholder="vpn.domain.com atau IP Publik"
              />
              <label className="label">
                <span className="label-text-alt opacity-60">Digunakan sebagai endpoint di konfigurasi client.</span>
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">{isEditing ? "Password Baru (kosongkan jika tidak diubah)" : "Password"}</span>
              </label>
              <input 
                type="password" 
                value={currentConfig.password} 
                onChange={e => setCurrentConfig({...currentConfig, password: e.target.value})}
                className="input input-bordered w-full" 
                required={!isEditing} 
              />
            </div>
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-4">
                <input 
                  type="checkbox" 
                  checked={currentConfig.useSsl} 
                  onChange={e => setCurrentConfig({...currentConfig, useSsl: e.target.checked})}
                  className="checkbox checkbox-primary" 
                />
                <span className="label-text">Gunakan SSL (HTTPS)</span>
              </label>
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={() => (document.getElementById('mikrotik_modal') as any).close()}>Batal</button>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? <span className="loading loading-spinner"></span> : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
