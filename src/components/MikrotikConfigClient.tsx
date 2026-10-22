"use client";

import { useState, useEffect } from "react";
import DataTable, { type ColumnDef } from "@/components/DataTable";
import toast from "react-hot-toast";
import { 
  FaServer, 
  FaPlus, 
  FaSync, 
  FaEdit, 
  FaTrash, 
  FaGlobe, 
  FaCheckCircle, 
  FaExclamationTriangle 
} from "react-icons/fa";

type MikrotikConfig = {
  id: number;
  name: string;
  host: string;
  port: number;
  username: string;
  useSsl: boolean;
  wgPublicHost?: string;
};

type ConnectionStatus = {
  [id: number]: {
    success: boolean;
    message: string;
    boardName?: string;
    version?: string;
    uptime?: string;
  };
};

export default function MikrotikConfigClient() {
  const [configs, setConfigs] = useState<MikrotikConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTesting, setIsTesting] = useState<number | null>(null);
  const [testResults, setTestResults] = useState<ConnectionStatus>({});

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
      if (!res.ok) throw new Error("Gagal mengambil data router MikroTik");
      const data = await res.json();
      setConfigs(data || []);
    } catch (err: any) {
      toast.error(err.message || "Gagal memuat konfigurasi");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConfigs();
  }, []);

  const handleEditClick = (config: MikrotikConfig) => {
    setCurrentConfig({ ...config, password: "", wgPublicHost: config.wgPublicHost || "" });
    setIsEditing(true);
    (document.getElementById('mikrotik_modal') as any)?.showModal();
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
    (document.getElementById('mikrotik_modal') as any)?.showModal();
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Hapus koneksi router MikroTik "${name}"? Seluruh konfigurasi peer terkait akan terputus.`)) return;
    try {
      const res = await fetch(`/api/settings/mikrotik/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Gagal menghapus koneksi");
      }
      toast.success(`Koneksi router "${name}" berhasil dihapus`);
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
        throw new Error(data.message || "Gagal menyimpan konfigurasi");
      }
      
      toast.success(isEditing ? "Konfigurasi router diperbarui" : "Router MikroTik baru berhasil ditambahkan");
      (document.getElementById('mikrotik_modal') as any)?.close();
      fetchConfigs();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const testConnection = async (id: number) => {
    setIsTesting(id);
    try {
      const res = await fetch(`/api/settings/mikrotik/${id}/test-connection`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setTestResults(prev => ({
          ...prev,
          [id]: {
            success: true,
            message: data.message,
            boardName: data.data?.boardName,
            version: data.data?.version,
            uptime: data.data?.uptime,
          }
        }));
        toast.success(`Koneksi Sukses: ${data.data?.boardName} (ROS v${data.data?.version})`);
      } else {
        setTestResults(prev => ({
          ...prev,
          [id]: {
            success: false,
            message: data.message,
          }
        }));
        toast.error(data.message || "Koneksi gagal");
      }
    } catch {
      toast.error("Gagal menghubungi server MikroTik");
    } finally {
      setIsTesting(null);
    }
  };

  const columns: ColumnDef<MikrotikConfig>[] = [
    { 
      header: "Nama Router", 
      accessorKey: "name",
      cell: (config) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xs shrink-0 font-bold">
            <FaServer size={12} />
          </div>
          <div>
            <span className="font-bold text-base-content text-sm">{config.name}</span>
            <div className="text-[11px] font-mono text-base-content/60">
              User: <span className="text-base-content/80 font-medium">{config.username}</span>
            </div>
          </div>
        </div>
      )
    },
    { 
      header: "Host / IP Target", 
      accessorKey: "host",
      cell: (config) => (
        <div className="space-y-0.5">
          <span className="font-mono text-xs font-semibold text-primary">{config.host}</span>
          <div className="flex items-center gap-1.5">
            <span className={`badge badge-xs font-mono ${config.useSsl ? 'badge-success badge-outline' : 'badge-warning badge-outline'}`}>
              {config.useSsl ? "HTTPS" : "HTTP"}
            </span>
            <span className="text-[10px] text-base-content/60 font-mono">Port {config.port}</span>
          </div>
        </div>
      )
    },
    { 
      header: "Endpoint Publik WG", 
      accessorKey: "wgPublicHost",
      cell: (config) => (
        config.wgPublicHost ? (
          <span className="badge badge-sm badge-info badge-outline font-mono text-xs">
            {config.wgPublicHost}
          </span>
        ) : (
          <span className="text-xs text-base-content/40 italic">Menggunakan Host IP</span>
        )
      )
    },
    {
      header: "Telemetri / Status",
      className: "text-center",
      cell: (config) => {
        const result = testResults[config.id];
        const isCurrentlyTesting = isTesting === config.id;

        return (
          <div className="flex flex-col items-center gap-1">
            <button 
              className={`btn btn-xs ${isCurrentlyTesting ? 'btn-disabled' : 'btn-outline border-base-300 hover:btn-primary gap-1 shadow-xs'}`}
              onClick={() => testConnection(config.id)}
              disabled={isCurrentlyTesting}
              title="Uji koneksi REST API ke MikroTik"
            >
              {isCurrentlyTesting ? (
                <span className="loading loading-spinner loading-xs text-primary"></span>
              ) : (
                <FaGlobe size={10} />
              )}
              <span className="text-[11px]">{isCurrentlyTesting ? "Menguji..." : "Cek Koneksi"}</span>
            </button>

            {result && (
              <div className="text-[10px] font-mono mt-0.5">
                {result.success ? (
                  <span className="text-success inline-flex items-center gap-0.5 font-medium">
                    <FaCheckCircle size={9} />
                    {result.boardName || "RouterOS"} (v{result.version})
                  </span>
                ) : (
                  <span className="text-error inline-flex items-center gap-0.5 font-medium" title={result.message}>
                    <FaExclamationTriangle size={9} />
                    Gagal Konek
                  </span>
                )}
              </div>
            )}
          </div>
        );
      }
    },
    {
      header: "Aksi",
      accessorKey: "id",
      className: "text-center",
      cell: (config) => (
        <div className="flex items-center justify-center gap-1.5">
          <button 
            className="btn btn-xs btn-ghost border border-base-300 hover:btn-info gap-1 cursor-pointer" 
            onClick={() => handleEditClick(config)}
            title="Edit konfigurasi router"
          >
            <FaEdit size={10} />
            <span>Edit</span>
          </button>
          <button 
            className="btn btn-xs btn-ghost border border-base-300 hover:btn-error gap-1 cursor-pointer" 
            onClick={() => handleDelete(config.id, config.name)}
            title="Hapus router"
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
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xl shadow-xs shrink-0">
              <FaServer />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold text-base-content">
                  Koneksi MikroTik (REST API)
                </h1>
                <span className="badge badge-primary badge-sm font-mono font-bold">
                  {configs.length} Router Terdaftar
                </span>
                <span className="badge badge-success badge-outline badge-sm font-mono">
                  RouterOS v7.1+
                </span>
              </div>
              <p className="text-xs text-base-content/70 mt-1">
                Integrasi REST API langsung untuk manajemen sinkronisasi <strong>WireGuard</strong>, status resource, dan telemetri koneksi klien RSUD NTB
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto shrink-0">
            <button 
              className="btn btn-ghost border border-base-300 btn-sm gap-1.5 cursor-pointer" 
              onClick={fetchConfigs} 
              disabled={isLoading}
              title="Refresh data router"
            >
              <FaSync className={isLoading ? "animate-spin text-primary" : ""} />
              <span className="text-xs">Refresh</span>
            </button>
            <button 
              className="btn btn-primary btn-sm gap-1.5 shadow-md cursor-pointer" 
              onClick={handleAddClick}
            >
              <FaPlus />
              <span>Tambah Koneksi Router</span>
            </button>
          </div>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="card bg-base-100 border border-base-300 shadow-md overflow-hidden">
        <div className="p-0">
          <DataTable 
            data={configs} 
            columns={columns} 
            page={1}
            pageSize={50}
            totalPages={1}
            isLoading={isLoading} 
          />
        </div>
      </div>

      {/* MODAL TAMBAH / EDIT ROUTER */}
      <dialog id="mikrotik_modal" className="modal">
        <div className="modal-box bg-base-100 border border-base-300 text-base-content max-w-lg">
          <div className="flex items-center gap-2 pb-2 border-b border-base-200">
            <FaServer className="text-primary" />
            <h3 className="font-bold text-base sm:text-lg">
              {isEditing ? "Edit Koneksi MikroTik" : "Tambah Koneksi MikroTik Baru"}
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="py-4 space-y-4">
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-semibold text-xs text-base-content">Nama Router / Identitas *</span>
              </label>
              <input 
                type="text" 
                value={currentConfig.name} 
                onChange={e => setCurrentConfig({...currentConfig, name: e.target.value})}
                className="input input-bordered input-sm w-full text-xs" 
                placeholder="Misal: Core Router CCR2004 atau Gateway Utama"
                required 
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2 form-control">
                <label className="label py-1">
                  <span className="label-text font-semibold text-xs text-base-content">Host / IP Address *</span>
                </label>
                <input 
                  type="text" 
                  value={currentConfig.host} 
                  onChange={e => setCurrentConfig({...currentConfig, host: e.target.value})}
                  className="input input-bordered input-sm w-full font-mono text-xs" 
                  placeholder="192.168.10.1"
                  required 
                />
              </div>

              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-semibold text-xs text-base-content">Port REST *</span>
                </label>
                <input 
                  type="number" 
                  value={currentConfig.port} 
                  onChange={e => setCurrentConfig({...currentConfig, port: e.target.value})}
                  className="input input-bordered input-sm w-full font-mono text-xs" 
                  required 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-semibold text-xs text-base-content">Username API *</span>
                </label>
                <input 
                  type="text" 
                  value={currentConfig.username} 
                  onChange={e => setCurrentConfig({...currentConfig, username: e.target.value})}
                  className="input input-bordered input-sm w-full text-xs" 
                  placeholder="admin-radius"
                  required 
                />
              </div>

              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-semibold text-xs text-base-content">
                    {isEditing ? "Password Baru (Opsional)" : "Password API *"}
                  </span>
                </label>
                <input 
                  type="password" 
                  value={currentConfig.password} 
                  onChange={e => setCurrentConfig({...currentConfig, password: e.target.value})}
                  className="input input-bordered input-sm w-full text-xs" 
                  placeholder={isEditing ? "Kosongkan jika tidak diubah" : "••••••••"}
                  required={!isEditing} 
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-semibold text-xs text-base-content">IP Publik / Host Endpoint WireGuard</span>
                <span className="label-text-alt text-info text-[11px]">Opsional</span>
              </label>
              <input 
                type="text" 
                value={currentConfig.wgPublicHost} 
                onChange={e => setCurrentConfig({...currentConfig, wgPublicHost: e.target.value})}
                className="input input-bordered input-sm w-full font-mono text-xs" 
                placeholder="vpn.rsudntb.id atau IP Publik WAN"
              />
              <span className="text-[10px] text-base-content/60 mt-1">
                Digunakan sebagai endpoint default pada file konfigurasi dan QR Code klien WireGuard.
              </span>
            </div>

            <div className="form-control bg-base-200/50 p-3 rounded-lg border border-base-200">
              <label className="label cursor-pointer justify-start gap-3 p-0">
                <input 
                  type="checkbox" 
                  checked={currentConfig.useSsl} 
                  onChange={e => setCurrentConfig({...currentConfig, useSsl: e.target.checked})}
                  className="checkbox checkbox-primary checkbox-sm" 
                />
                <div>
                  <span className="label-text font-semibold text-xs text-base-content">Gunakan Koneksi Aman HTTPS (SSL)</span>
                  <p className="text-[10px] text-base-content/60">Direkomendasikan port 443 dengan sertifikat RouterOS aktif</p>
                </div>
              </label>
            </div>

            <div className="modal-action pt-2">
              <button 
                type="button" 
                className="btn btn-sm btn-ghost cursor-pointer" 
                onClick={() => (document.getElementById('mikrotik_modal') as any)?.close()}
              >
                Batal
              </button>
              <button 
                type="submit" 
                className="btn btn-sm btn-primary cursor-pointer gap-1" 
                disabled={isSubmitting}
              >
                {isSubmitting ? <span className="loading loading-spinner loading-xs"></span> : <FaServer size={11} />}
                <span>{isEditing ? "Simpan Perubahan" : "Simpan Router"}</span>
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
