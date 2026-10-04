"use client";

import { useState } from "react";
import Link from "next/link";
import DataTable, { type ColumnDef } from "@/components/DataTable";
import DeleteButton from "@/components/DeleteButton";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { toggleUserStatus } from "@/app/actions/userActions";

// Definisikan tipe data user yang diterima
type User = {
  id: number;
  username: string;
  type: string;
  fullName: string;
  department: string;
  groupname: string;
  createdBy: string;
  status: string;
  lastLogin: string | null;
};

type Props = {
  users: User[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems?: number;
};

export default function UserClientWrapper({ users, page, pageSize, totalPages, totalItems }: Props) {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isBatchUpdating, setIsBatchUpdating] = useState(false);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const handleToggleStatus = async (username: string, type: string, currentStatus: string) => {
    const updateKey = `${username}-${type}`;
    setIsUpdating(updateKey);
    try {
      const res = await toggleUserStatus(username, type, currentStatus);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(res.message || "Status berhasil diperbarui");
        router.refresh();
      }
    } catch {
      toast.error("Terjadi kesalahan");
    } finally {
      setIsUpdating(null);
    }
  };

  const handleBatchDelete = async () => {
    if (!selectedIds.length) return;
    
    if (!confirm(`Hapus ${selectedIds.length} user terpilih? Tindakan ini tidak dapat dibatalkan.`)) {
      return;
    }

    setIsDeleting(true);
    try {
      const res = await fetch("/api/radius/users/batch-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Gagal menghapus user");
      }

      toast.success(`${selectedIds.length} user berhasil dihapus`);
      setSelectedIds([]);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBatchStatus = async (action: 'active' | 'disabled') => {
    if (!selectedIds.length) return;
    
    const actionText = action === 'disabled' ? 'nonaktifkan' : 'aktifkan';
    if (!confirm(`Apakah Anda yakin ingin ${actionText} ${selectedIds.length} user terpilih?`)) {
      return;
    }

    setIsBatchUpdating(true);
    try {
      const res = await fetch("/api/radius/users/batch-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds, action }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || `Gagal ${actionText} user`);
      }

      const data = await res.json();
      toast.success(data.message);
      setSelectedIds([]);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsBatchUpdating(false);
    }
  };

  // Definisikan 'columns' dengan sortKey untuk sorting server-side
  const columns: ColumnDef<User>[] = [
    {
      header: "Username",
      accessorKey: "username",
      sortKey: "username",
    },
    {
      header: "Layanan",
      accessorKey: "type",
      sortKey: "type",
      cell: (user) => (
        <div className={`badge ${user.type === 'hotspot' ? 'badge-info' : 'badge-secondary'} badge-outline badge-sm uppercase font-bold`}>
          {user.type}
        </div>
      )
    },
    { 
      header: "Nama Lengkap", 
      accessorKey: "fullName",
      sortKey: "fullName",
    },
    { 
      header: "Departemen", 
      accessorKey: "department",
      sortKey: "department",
    },
    {
      header: "Grup",
      accessorKey: "groupname",
      sortKey: "groupname",
    },
    {
      header: "Login Terakhir",
      accessorKey: "lastLogin",
      sortKey: "lastLogin",
      cell: (user) => {
        if (!user.lastLogin) {
          return <span className="text-gray-400 italic text-xs">Belum pernah</span>;
        }
        const date = new Date(user.lastLogin);
        return (
          <span className="text-xs">
            {date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}{' '}
            {date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
          </span>
        );
      }
    },
    { 
      header: "Status",
      accessorKey: "status",
      sortKey: "status",
      cell: (user) => (
        <div className={`badge ${user.status === 'active' ? 'badge-success' : 'badge-error'} badge-sm font-semibold`}>
          {user.status.toUpperCase()}
        </div>
      )
    },
    {
      header: "Actions",
      accessorKey: "id",
      className: "text-center",
      cell: (user) => (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => handleToggleStatus(user.username, user.type, user.status)}
            disabled={isUpdating === `${user.username}-${user.type}`}
            className={`btn btn-xs ${user.status === 'active' ? 'btn-outline btn-warning' : 'btn-outline btn-success'}`}
          >
            {isUpdating === `${user.username}-${user.type}` ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              user.status === 'active' ? 'Disable' : 'Enable'
            )}
          </button>
          <Link href={`/radius-users/${user.type}/detail/${user.id}`} className="btn btn-xs btn-accent">Detail</Link>
          <DeleteButton 
            itemId={user.id} 
            itemName={`${user.username} (${user.type})`} 
            entityType="user" 
            apiEndpoint="/api/radius/users" 
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {selectedIds.length > 0 && (
        <div className="alert shadow-lg bg-base-100 border-primary">
          <div className="flex justify-between w-full items-center">
            <span className="font-medium">{selectedIds.length} user terpilih</span>
            <div className="flex gap-2">
              <button 
                className={`btn btn-warning btn-sm ${isBatchUpdating ? 'loading' : ''}`}
                onClick={() => handleBatchStatus('disabled')}
                disabled={isBatchUpdating || isDeleting}
              >
                Disable Terpilih
              </button>
              <button 
                className={`btn btn-success btn-sm ${isBatchUpdating ? 'loading' : ''}`}
                onClick={() => handleBatchStatus('active')}
                disabled={isBatchUpdating || isDeleting}
              >
                Enable Terpilih
              </button>
              <button 
                className={`btn btn-error btn-sm ${isDeleting ? 'loading' : ''}`}
                onClick={handleBatchDelete}
                disabled={isBatchUpdating || isDeleting}
              >
                Hapus Terpilih
              </button>
            </div>
          </div>
        </div>
      )}

      <DataTable 
        data={users} 
        columns={columns} 
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
        totalItems={totalItems}
        onSelectionChange={(ids) => setSelectedIds(ids as number[])}
        idKey="id"
      />
    </div>
  );
}