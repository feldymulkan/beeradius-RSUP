"use client";

import { useState } from "react";
import DataTable, { type ColumnDef } from "@/components/DataTable";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type IpEntry = {
  id: number;
  framedipaddress: string;
  username: string | null;
  expiry_time: string | null;
};

type Props = {
  poolName: string;
  initialIps: IpEntry[];
};

export default function PoolDetailClient({ poolName, initialIps }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [range, setRange] = useState({ startIp: "", endIp: "" });

  const handleDeleteIp = async (id: number) => {
    if (!confirm("Hapus IP ini dari pool?")) return;
    try {
      const res = await fetch(`/api/radius/pools/${poolName}/ips?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error("Gagal menghapus IP");
      toast.success("IP berhasil dihapus");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleAddRange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/radius/pools/${poolName}/ips`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(range),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Gagal menambahkan range IP");
      }
      toast.success("Range IP berhasil ditambahkan");
      setRange({ startIp: "", endIp: "" });
      (document.getElementById('add_range_modal') as any).close();
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns: ColumnDef<IpEntry>[] = [
    { header: "IP Address", accessorKey: "framedipaddress" },
    { 
      header: "Status", 
      accessorKey: "username",
      cell: (ip) => (
        <span className={`badge ${ip.username ? 'badge-warning' : 'badge-success'}`}>
          {ip.username ? `Digunakan oleh: ${ip.username}` : 'Tersedia'}
        </span>
      )
    },
    {
      header: "Aksi",
      accessorKey: "id",
      className: "text-center",
      cell: (ip) => (
        <button 
          onClick={() => handleDeleteIp(ip.id)} 
          className="btn btn-sm btn-error"
          disabled={!!ip.username}
          title={ip.username ? "IP sedang digunakan" : ""}
        >
          Hapus
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">Daftar IP Address</h2>
          <p className="text-sm text-gray-500">Total: {initialIps.length} IP</p>
        </div>
        <button 
          className="btn btn-primary" 
          onClick={() => (document.getElementById('add_range_modal') as any).showModal()}
        >
          Tambah Range IP
        </button>
      </div>

      <DataTable data={initialIps} columns={columns} />

      <dialog id="add_range_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Tambah Range IP ke {poolName}</h3>
          <form onSubmit={handleAddRange} className="py-4 space-y-4">
            <div className="form-control">
              <label className="label"><span className="label-text">IP Awal</span></label>
              <input 
                type="text" 
                value={range.startIp} 
                onChange={e => setRange({...range, startIp: e.target.value})}
                className="input input-bordered w-full" 
                placeholder="Contoh: 192.168.10.1"
                required 
              />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">IP Akhir</span></label>
              <input 
                type="text" 
                value={range.endIp} 
                onChange={e => setRange({...range, endIp: e.target.value})}
                className="input input-bordered w-full" 
                placeholder="Contoh: 192.168.10.50"
                required 
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={() => (document.getElementById('add_range_modal') as any).close()}>Batal</button>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? <span className="loading loading-spinner"></span> : "Tambahkan"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
