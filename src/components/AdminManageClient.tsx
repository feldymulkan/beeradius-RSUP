"use client";

import { useState, useEffect } from "react";
import DataTable, { type ColumnDef } from "@/components/DataTable";
import toast from "react-hot-toast";

type Admin = {
  id: number;
  username: string;
  role: string;
};

export default function AdminManageClient() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState<Partial<Admin & { password?: string }>>({
    username: "",
    password: "",
    role: "admin"
  });
  const [isEditing, setIsEditing] = useState(false);

  const fetchAdmins = async () => {
    try {
      const res = await fetch("/api/admin/manage");
      if (!res.ok) throw new Error("Gagal mengambil data admin");
      const data = await res.json();
      setAdmins(data);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleEditClick = (admin: Admin) => {
    setCurrentAdmin({ ...admin, password: "" });
    setIsEditing(true);
    (document.getElementById('admin_modal') as any).showModal();
  };

  const handleAddClick = () => {
    setCurrentAdmin({
      username: "",
      password: "",
      role: "admin"
    });
    setIsEditing(false);
    (document.getElementById('admin_modal') as any).showModal();
  };

  const handleDeleteAdmin = async (id: number, username: string) => {
    if (!confirm(`Hapus akun admin "${username}"?`)) return;
    try {
      const res = await fetch(`/api/admin/manage/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Gagal menghapus admin");
      }
      toast.success("Admin berhasil dihapus");
      fetchAdmins();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = isEditing ? `/api/admin/manage/${currentAdmin.id}` : "/api/admin/manage";
      const method = isEditing ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentAdmin),
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Gagal menyimpan data");
      }
      
      toast.success(isEditing ? "Data admin diperbarui" : "Admin baru ditambahkan");
      (document.getElementById('admin_modal') as any).close();
      fetchAdmins();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns: ColumnDef<Admin>[] = [
    { header: "Username", accessorKey: "username" },
    { 
      header: "Role", 
      accessorKey: "role",
      cell: (admin) => (
        <span className={`badge ${admin.role === 'superadmin' ? 'badge-primary' : 'badge-ghost'}`}>
          {admin.role.toUpperCase()}
        </span>
      )
    },
    {
      header: "Aksi",
      accessorKey: "id",
      className: "text-center",
      cell: (admin) => (
        <div className="flex items-center justify-center gap-2">
          <button className="btn btn-sm btn-info" onClick={() => handleEditClick(admin)}>Edit</button>
          <button className="btn btn-sm btn-error" onClick={() => handleDeleteAdmin(admin.id, admin.username)}>Hapus</button>
        </div>
      ),
    },
  ];

  if (isLoading) return <div className="flex justify-center p-10"><span className="loading loading-spinner loading-lg"></span></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Daftar Akun Admin</h1>
        <button className="btn btn-primary" onClick={handleAddClick}>Tambah Admin Baru</button>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-0">
          <DataTable data={admins} columns={columns} />
        </div>
      </div>

      <dialog id="admin_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{isEditing ? "Edit Akun Admin" : "Tambah Admin Baru"}</h3>
          <form onSubmit={handleSubmit} className="py-4 space-y-4">
            <div className="form-control">
              <label className="label"><span className="label-text">Username</span></label>
              <input 
                type="text" 
                value={currentAdmin.username} 
                onChange={e => setCurrentAdmin({...currentAdmin, username: e.target.value})}
                className="input input-bordered w-full" 
                required 
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">{isEditing ? "Password Baru (kosongkan jika tidak diubah)" : "Password"}</span>
              </label>
              <input 
                type="password" 
                value={currentAdmin.password} 
                onChange={e => setCurrentAdmin({...currentAdmin, password: e.target.value})}
                className="input input-bordered w-full" 
                required={!isEditing} 
              />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Role</span></label>
              <select 
                className="select select-bordered w-full"
                value={currentAdmin.role}
                onChange={e => setCurrentAdmin({...currentAdmin, role: e.target.value})}
              >
                <option value="admin">Admin (Terbatas)</option>
                <option value="superadmin">Superadmin (Akses Penuh)</option>
              </select>
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={() => (document.getElementById('admin_modal') as any).close()}>Batal</button>
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
