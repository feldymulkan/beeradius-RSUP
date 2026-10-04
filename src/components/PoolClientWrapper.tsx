"use client";

import { useState } from "react";
import DataTable, { type ColumnDef } from "@/components/DataTable";
import DeleteButton from "@/components/DeleteButton";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import Link from "next/link";
import SearchInput from "@/components/SearchInput";

type Pool = {
  id: number;
  name: string;
  description: string | null;
};

type Props = {
  pools: Pool[];
  page: number;
  pageSize: number;
  totalPages: number;
};

export default function PoolClientWrapper({ pools, page, pageSize, totalPages }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newPool, setNewPool] = useState({ name: "", description: "" });

  const columns: ColumnDef<Pool>[] = [
    { header: "Nama Pool", accessorKey: "name" },
    { header: "Keterangan", accessorKey: "description" },
    {
      header: "Actions",
      accessorKey: "id",
      className: "text-center",
      cell: (pool) => (
        <div className="flex items-center justify-center gap-2">
          <Link href={`/radius-pools/${pool.name}`} className="btn btn-sm btn-info">Kelola IP</Link>
          <DeleteButton 
            itemId={pool.id.toString()} 
            itemName={pool.name} 
            entityType="IP Pool" 
            apiEndpoint="/api/radius/pools" 
          />
        </div>
      ),
    },
  ];

  const handleAddPool = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/radius/pools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPool),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Gagal membuat pool");
      }
      toast.success("Pool berhasil dibuat");
      setNewPool({ name: "", description: "" });
      (document.getElementById('add_pool_modal') as any).close();
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap justify-between items-center gap-4">
        <SearchInput placeholder="Cari nama atau keterangan pool..." />
        <button 
          className="btn btn-primary" 
          onClick={() => (document.getElementById('add_pool_modal') as any).showModal()}
        >
          Tambah Pool Baru
        </button>
      </div>

      <DataTable 
        data={pools} 
        columns={columns} 
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
      />

      <dialog id="add_pool_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Tambah IP Pool Baru</h3>
          <form onSubmit={handleAddPool} className="py-4 space-y-4">
            <div className="form-control">
              <label className="label"><span className="label-text">Nama Pool (sesuai MikroTik)</span></label>
              <input 
                type="text" 
                value={newPool.name} 
                onChange={e => setNewPool({...newPool, name: e.target.value})}
                className="input input-bordered w-full" 
                placeholder="Contoh: pool_vpn_it"
                required 
              />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Keterangan</span></label>
              <input 
                type="text" 
                value={newPool.description} 
                onChange={e => setNewPool({...newPool, description: e.target.value})}
                className="input input-bordered w-full" 
                placeholder="Contoh: Pool untuk divisi IT"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={() => (document.getElementById('add_pool_modal') as any).close()}>Batal</button>
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
