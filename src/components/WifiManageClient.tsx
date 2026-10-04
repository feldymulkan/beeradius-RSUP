"use client";

import { useState, useEffect, useCallback } from "react";
import DataTable, { type ColumnDef } from "@/components/DataTable";
import PasswordReveal from "@/components/PasswordReveal";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { formatDate } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import SearchInput from "@/components/SearchInput";

type Wifi = {
  id: number;
  ssid: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

export default function WifiManageClient() {
  const { data: session } = useSession();
  const isSuperAdmin = (session?.user as any)?.role === "superadmin";

  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;
  const q = searchParams.get("q") || "";

  const [wifiList, setWifiList] = useState<Wifi[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentWifi, setCurrentWifi] = useState<Partial<Wifi>>({
    ssid: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const fetchWifiList = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      params.set("page", page.toString());
      params.set("pageSize", pageSize.toString());

      const res = await fetch(`/api/wifi?${params.toString()}`);
      if (!res.ok) throw new Error("Gagal mengambil data Wifi");
      const result = await res.json();
      setWifiList(result.data || []);
      setTotalPages(result.pagination?.totalPages || 1);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [q, page, pageSize]);

  useEffect(() => {
    fetchWifiList();
  }, [fetchWifiList]);

  const handleEditClick = (wifi: Wifi) => {
    setCurrentWifi(wifi);
    setIsEditing(true);
    const modal = document.getElementById("wifi_modal") as HTMLDialogElement;
    if (modal) modal.showModal();
  };

  const handleAddClick = () => {
    setCurrentWifi({
      ssid: "",
      password: "",
    });
    setIsEditing(false);
    const modal = document.getElementById("wifi_modal") as HTMLDialogElement;
    if (modal) modal.showModal();
  };

  const handleDeleteWifi = async (id: number, ssid: string) => {
    if (!confirm(`Hapus wifi "${ssid}"?`)) return;
    try {
      const res = await fetch(`/api/wifi/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Gagal menghapus Wifi");
      }
      toast.success("Wifi berhasil dihapus");
      fetchWifiList();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = isEditing ? `/api/wifi/${currentWifi.id}` : "/api/wifi";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentWifi),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Gagal menyimpan data");
      }

      toast.success(isEditing ? "Data wifi diperbarui" : "Wifi baru ditambahkan");
      const modal = document.getElementById("wifi_modal") as HTMLDialogElement;
      if (modal) modal.close();
      fetchWifiList();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const baseColumns: ColumnDef<Wifi>[] = [
    { header: "SSID", accessorKey: "ssid" },
    {
      header: "Password",
      accessorKey: "password",
      cell: (wifi) => <PasswordReveal value={wifi.password} isHashed={false} />,
    },
    {
      header: "Dibuat Pada",
      accessorKey: "createdAt",
      cell: (wifi) => (wifi.createdAt ? formatDate(new Date(wifi.createdAt)) : "-"),
    },
    {
      header: "Diubah Pada",
      accessorKey: "updatedAt",
      cell: (wifi) => (wifi.updatedAt ? formatDate(new Date(wifi.updatedAt)) : "-"),
    },
  ];

  const columns: ColumnDef<Wifi>[] = isSuperAdmin
    ? [
        ...baseColumns,
        {
          header: "Aksi",
          accessorKey: "id",
          className: "text-center",
          cell: (wifi) => (
            <div className="flex items-center justify-center gap-2">
              <button className="btn btn-sm btn-info" onClick={() => handleEditClick(wifi)}>
                Edit
              </button>
              <button className="btn btn-sm btn-error" onClick={() => handleDeleteWifi(wifi.id, wifi.ssid)}>
                Hapus
              </button>
            </div>
          ),
        },
      ]
    : baseColumns;

  if (isLoading) {
    return <WifiSkeleton isSuperAdmin={isSuperAdmin} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Daftar Wifi RSUD NTB</h1>
          <p className="text-gray-500 text-sm">Informasi SSID dan password wifi internal RSUD NTB.</p>
        </div>
        {isSuperAdmin && (
          <button className="btn btn-primary" onClick={handleAddClick}>
            Tambah Wifi Baru
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <SearchInput placeholder="Cari SSID Wifi..." />
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-0">
          <DataTable
            data={wifiList}
            columns={columns}
            page={page}
            pageSize={pageSize}
            totalPages={totalPages}
          />
        </div>
      </div>

      {isSuperAdmin && (
        <dialog id="wifi_modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">{isEditing ? "Edit Wifi RSUD NTB" : "Tambah Wifi Baru"}</h3>
            <form onSubmit={handleSubmit} className="py-4 space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">SSID Wifi</span>
                </label>
                <input
                  type="text"
                  value={currentWifi.ssid}
                  onChange={(e) => setCurrentWifi({ ...currentWifi, ssid: e.target.value })}
                  className="input input-bordered w-full"
                  required
                  placeholder="Contoh: RSUD-GUEST"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password Wifi</span>
                </label>
                <input
                  type="text"
                  value={currentWifi.password}
                  onChange={(e) => setCurrentWifi({ ...currentWifi, password: e.target.value })}
                  className="input input-bordered w-full"
                  required
                  placeholder="Masukkan Password Wifi"
                />
              </div>
              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={() => (document.getElementById("wifi_modal") as HTMLDialogElement).close()}
                >
                  Batal
                </button>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? <span className="loading loading-spinner"></span> : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
}

function WifiSkeleton({ isSuperAdmin }: { isSuperAdmin: boolean }) {
  const skeletonRows = Array.from({ length: 5 });
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex justify-between items-center">
        <div>
          <div className="skeleton h-8 w-48 mb-2"></div>
          <div className="skeleton h-4 w-72"></div>
        </div>
        {isSuperAdmin && <div className="skeleton h-12 w-36"></div>}
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <div className="skeleton h-12 w-full max-w-md"></div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-0">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th className="w-12">#</th>
                  <th>SSID</th>
                  <th>Password</th>
                  <th>Dibuat Pada</th>
                  <th>Diubah Pada</th>
                  {isSuperAdmin && <th className="text-center">Aksi</th>}
                </tr>
              </thead>
              <tbody>
                {skeletonRows.map((_, idx) => (
                  <tr key={idx}>
                    <td><div className="skeleton h-4 w-4"></div></td>
                    <td><div className="skeleton h-4 w-32"></div></td>
                    <td><div className="skeleton h-4 w-24"></div></td>
                    <td><div className="skeleton h-4 w-40"></div></td>
                    <td><div className="skeleton h-4 w-40"></div></td>
                    {isSuperAdmin && (
                      <td>
                        <div className="flex items-center justify-center gap-2">
                          <div className="skeleton h-8 w-14"></div>
                          <div className="skeleton h-8 w-14"></div>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
