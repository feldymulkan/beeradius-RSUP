"use client";

import { useState } from "react";
import DataTable, { type ColumnDef } from "@/components/DataTable";
import DeleteButton from "@/components/DeleteButton";
import SearchInput from "@/components/SearchInput";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import NasHealthBadge from "@/components/NasHealthBadge";

type Nas = {
  id: number;
  nasname: string;
  shortname: string | null;
  type: string | null;
  secret: string;
  description: string | null;
};

type Props = {
  nasList: Nas[];
  page: number;
  pageSize: number;
  totalPages: number;
};

export default function NasClientWrapper({ nasList, page, pageSize, totalPages }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentNas, setCurrentNas] = useState<Partial<Nas>>({
    nasname: "",
    shortname: "",
    type: "mikrotik",
    secret: "",
    description: ""
  });
  const [isEditing, setIsEditing] = useState(false);

  const columns: ColumnDef<Nas>[] = [
    { header: "IP/Host", accessorKey: "nasname" },
    { header: "Nama Pendek", accessorKey: "shortname" },
    { header: "Vendor", accessorKey: "type" },
    { header: "Secret", accessorKey: "secret" },
    { header: "Keterangan", accessorKey: "description" },
    {
      header: "Status",
      accessorKey: "nasname",
      className: "text-center",
      cell: (nas) => <NasHealthBadge nasname={nas.nasname} />
    },
    {
      header: "Actions",
      accessorKey: "id",
      className: "text-center",
      cell: (nas) => (
        <div className="flex items-center justify-center gap-2">
          <button 
            className="btn btn-sm btn-info"
            onClick={() => handleEditClick(nas)}
          >
            Edit
          </button>
          <DeleteButton 
            itemId={nas.id.toString()} 
            itemName={nas.nasname} 
            entityType="NAS" 
            apiEndpoint="/api/radius/nas" 
          />
        </div>
      ),
    },
  ];

  const handleEditClick = (nas: Nas) => {
    setCurrentNas(nas);
    setIsEditing(true);
    (document.getElementById('nas_modal') as any).showModal();
  };

  const handleAddClick = () => {
    setCurrentNas({
      nasname: "",
      shortname: "",
      type: "mikrotik",
      secret: "",
      description: ""
    });
    setIsEditing(false);
    (document.getElementById('nas_modal') as any).showModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const method = isEditing ? "PUT" : "POST";
      const url = isEditing ? `/api/radius/nas/${currentNas.id}` : "/api/radius/nas";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentNas),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Gagal menyimpan data NAS");
      }
      toast.success(isEditing ? "NAS berhasil diperbarui" : "NAS berhasil ditambahkan");
      (document.getElementById('nas_modal') as any).close();
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
        <SearchInput placeholder="Cari IP, nama, atau keterangan..." />
        <button 
          className="btn btn-primary" 
          onClick={handleAddClick}
        >
          Tambah NAS Baru
        </button>
      </div>

      <DataTable 
        data={nasList} 
        columns={columns} 
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
      />

      <dialog id="nas_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{isEditing ? "Edit Perangkat (NAS)" : "Tambah Perangkat Baru (NAS)"}</h3>
          <form onSubmit={handleSubmit} className="py-4 space-y-4">
            <div className="form-control">
              <label className="label"><span className="label-text">IP Address atau Hostname</span></label>
              <input 
                type="text" 
                value={currentNas.nasname} 
                onChange={e => setCurrentNas({...currentNas, nasname: e.target.value})}
                className="input input-bordered w-full" 
                placeholder="Contoh: 192.168.1.1 atau router.local"
                required 
              />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Nama Pendek (Identitas)</span></label>
              <input 
                type="text" 
                value={currentNas.shortname || ""} 
                onChange={e => setCurrentNas({...currentNas, shortname: e.target.value})}
                className="input input-bordered w-full" 
                placeholder="Contoh: Core-Router"
              />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Vendor / Tipe</span></label>
              <select 
                className="select select-bordered w-full"
                value={currentNas.type || "other"}
                onChange={e => setCurrentNas({...currentNas, type: e.target.value})}
              >
                <option value="mikrotik">MikroTik</option>
                <option value="cisco">Cisco</option>
                <option value="ubiquiti">Ubiquiti</option>
                <option value="other">Lainnya (Other)</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">RADIUS Secret (Shared Secret)</span></label>
              <input 
                type="text" 
                value={currentNas.secret} 
                onChange={e => setCurrentNas({...currentNas, secret: e.target.value})}
                className="input input-bordered w-full" 
                placeholder="Secret yang diset di perangkat"
                required 
              />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Keterangan</span></label>
              <textarea 
                className="textarea textarea-bordered w-full"
                value={currentNas.description || ""}
                onChange={e => setCurrentNas({...currentNas, description: e.target.value})}
                placeholder="Contoh: Router gedung A"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={() => (document.getElementById('nas_modal') as any).close()}>Batal</button>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? <span className="loading loading-spinner"></span> : (isEditing ? "Simpan Perubahan" : "Simpan")}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
