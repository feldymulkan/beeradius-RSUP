"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import DataTable, { type ColumnDef } from "@/components/DataTable";
import PasswordReveal from "@/components/PasswordReveal";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import SearchInput from "@/components/SearchInput";
import {
  FiWifi,
  FiRefreshCw,
  FiShield,
  FiSliders,
  FiLock,
  FiEyeOff,
  FiLayers,
  FiFolder,
  FiCornerDownRight,
  FiServer,
  FiAlertTriangle,
} from "react-icons/fi";

export type RuijieSubGroup = {
  groupId: number;
  name: string;
};

export type RuijieProjectHierarchy = {
  groupId: number;
  name: string;
  subGroups: RuijieSubGroup[];
};

export type RuijieWifiItem = {
  id: number;
  wlanId?: number;
  fowardType?: string;
  ssidName: string;
  password?: string;
  vlanId?: number;
  encryptionMode?: string;
  encryptionModeDesc?: string;
  enable?: string;
  ishidden?: string;
  relatedRadio?: string;
  groupId: number;
  groupName: string;
  parentGroupName: string;
  isSubGroup: boolean;
  path: string;
};

export default function WifiManageClient() {
  const router = useRouter();
  const { data: session } = useSession();
  const isSuperAdmin = (session?.user as any)?.role === "superadmin";

  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;
  const q = searchParams.get("q") || "";
  const selectedParentGroup = searchParams.get("parentGroup") || "ALL";
  const selectedSubGroup = searchParams.get("subGroup") || "ALL";

  const [wifiList, setWifiList] = useState<RuijieWifiItem[]>([]);
  const [hierarchy, setHierarchy] = useState<RuijieProjectHierarchy[]>([]);
  const [groupStats, setGroupStats] = useState<Record<string, number>>({});
  const [totalAll, setTotalAll] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentWifi, setCurrentWifi] = useState<Partial<RuijieWifiItem>>({
    id: 0,
    ssidName: "",
    password: "",
    groupId: 0,
    groupName: "",
    parentGroupName: "",
    vlanId: 1,
  });

  const fetchWifiList = useCallback(
    async (forceRefresh = false) => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (q) params.set("q", q);
        if (selectedParentGroup && selectedParentGroup !== "ALL") {
          params.set("parentGroup", selectedParentGroup);
        }
        if (selectedSubGroup && selectedSubGroup !== "ALL") {
          params.set("subGroup", selectedSubGroup);
        }
        params.set("page", page.toString());
        params.set("pageSize", pageSize.toString());
        if (forceRefresh) params.set("refresh", "true");

        const res = await fetch(`/api/wifi?${params.toString()}`);
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || "Gagal mengambil data Wifi dari Ruijie Cloud");
        }
        const result = await res.json();
        setWifiList(result.data || []);
        if (result.hierarchy) setHierarchy(result.hierarchy);
        if (result.groupStats) setGroupStats(result.groupStats);
        if (result.totalAll !== undefined) setTotalAll(result.totalAll);
        setTotalPages(result.pagination?.totalPages || 1);
        setTotalItems(result.pagination?.totalItems || 0);
        setErrorMessage(null);

        if (forceRefresh) {
          toast.success("Data berhasil disinkronkan langsung dari Ruijie Cloud");
        }
      } catch (err: any) {
        setErrorMessage(err.message || "Terjadi kesalahan saat memuat data WiFi");
        toast.error(err.message || "Terjadi kesalahan saat memuat data WiFi");
      } finally {
        setIsLoading(false);
      }
    },
    [q, selectedParentGroup, selectedSubGroup, page, pageSize]
  );

  useEffect(() => {
    fetchWifiList();
  }, [fetchWifiList]);

  // Sub Groups list untuk parentGroup yang dipilih
  const availableSubGroups = useMemo(() => {
    if (selectedParentGroup === "ALL") {
      const allSubs: RuijieSubGroup[] = [];
      hierarchy.forEach((h) => allSubs.push(...h.subGroups));
      return allSubs;
    }
    const currentProj = hierarchy.find((h) => h.name === selectedParentGroup);
    return currentProj?.subGroups || [];
  }, [hierarchy, selectedParentGroup]);

  // Handler pergantian Parent Group Tab
  const handleSelectParentGroup = (groupName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("parentGroup", groupName);
    params.delete("subGroup"); // reset sub group saat ganti parent
    params.set("page", "1");
    router.push(`/wifi?${params.toString()}`);
  };

  // Handler pergantian Sub Group Dropdown
  const handleSelectSubGroup = (subName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (subName === "ALL") {
      params.delete("subGroup");
    } else {
      params.set("subGroup", subName);
    }
    params.set("page", "1");
    router.push(`/wifi?${params.toString()}`);
  };

  const handleEditClick = (wifi: RuijieWifiItem) => {
    setCurrentWifi({
      id: wifi.id,
      ssidName: wifi.ssidName,
      password: wifi.password || "",
      groupId: wifi.groupId,
      groupName: wifi.groupName,
      parentGroupName: wifi.parentGroupName,
      vlanId: wifi.vlanId || 1,
      encryptionMode: wifi.encryptionMode,
    });
    const modal = document.getElementById("wifi_modal") as HTMLDialogElement;
    if (modal) modal.showModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentWifi.id || !currentWifi.groupId) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/wifi/${currentWifi.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupId: currentWifi.groupId,
          ssidName: currentWifi.ssidName,
          password: currentWifi.password,
          vlanId: currentWifi.vlanId,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Gagal memperbarui konfigurasi WiFi di Ruijie Cloud");
      }

      toast.success("Konfigurasi WiFi berhasil disinkronkan ke Ruijie Cloud");
      const modal = document.getElementById("wifi_modal") as HTMLDialogElement;
      if (modal) modal.close();
      fetchWifiList(true);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Kolom DataTable dengan lebar terdefinisi dan styling anti-tumpang tindih
  const columns: ColumnDef<RuijieWifiItem>[] = [
    {
      header: "SSID & NAMA JARINGAN",
      accessorKey: "ssidName",
      className: "min-w-[220px]",
      cell: (wifi) => (
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <FiWifi className="w-4 h-4" />
            </div>
            <span className="font-bold text-base-content text-sm tracking-tight">{wifi.ssidName}</span>
            {wifi.ishidden === "true" && (
              <span className="badge badge-xs badge-neutral gap-1 text-[10px] font-mono whitespace-nowrap" title="SSID Tersembunyi">
                <FiEyeOff className="w-3 h-3" /> Hidden
              </span>
            )}
          </div>
          <span className="text-[11px] text-base-content/60 font-mono ml-9">
            WLAN ID: {wifi.wlanId ?? "-"} • Mode: {wifi.fowardType || "bridge"}
          </span>
        </div>
      ),
    },
    {
      header: "STRUKTUR GROUP & SUB GROUP",
      accessorKey: "groupName",
      className: "min-w-[260px]",
      cell: (wifi) => (
        <div className="flex flex-col gap-1.5 py-0.5">
          {/* Group Utama */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-base-content/90">
            <FiFolder className="w-4 h-4 text-sky-400 shrink-0" />
            <span className="truncate max-w-[220px]" title={wifi.parentGroupName}>
              {wifi.parentGroupName}
            </span>
          </div>

          {/* Sub Group Badge atau Level Group Utama */}
          {wifi.isSubGroup ? (
            <div className="flex items-center gap-1.5 ml-4">
              <FiCornerDownRight className="w-3.5 h-3.5 text-primary/70 shrink-0" />
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-primary/10 text-primary border border-primary/25 whitespace-nowrap">
                <FiLayers className="w-3 h-3" />
                {wifi.groupName}
              </span>
            </div>
          ) : (
            <div className="ml-4 text-[11px] text-base-content/50 italic flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-base-content/40"></span>
              Level Group Utama (Seluruh Gedung)
            </div>
          )}
        </div>
      ),
    },
    {
      header: "PASSWORD WIFI",
      accessorKey: "password",
      className: "min-w-[170px] whitespace-nowrap",
      cell: (wifi) => {
        if (!wifi.password) {
          return (
            <span className="text-xs text-base-content/50 italic font-mono">
              Tanpa Password (Open)
            </span>
          );
        }
        return <PasswordReveal value={wifi.password} isHashed={false} />;
      },
    },
    {
      header: "VLAN",
      accessorKey: "vlanId",
      className: "min-w-[110px] text-center whitespace-nowrap",
      cell: (wifi) => (
        <span className="inline-flex items-center justify-center px-3 py-1 rounded-md text-xs font-mono font-bold whitespace-nowrap border border-sky-400/40 bg-sky-950/20 text-sky-400 shadow-sm">
          VLAN {wifi.vlanId ?? 1}
        </span>
      ),
    },
    {
      header: "KEAMANAN & RADIO",
      accessorKey: "encryptionMode",
      className: "min-w-[200px]",
      cell: (wifi) => {
        const isEncrypted = wifi.encryptionMode && wifi.encryptionMode !== "open";
        return (
          <div className="flex flex-col gap-0.5">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-base-content/90 whitespace-nowrap">
              {isEncrypted ? (
                <FiLock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <FiShield className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              )}
              {wifi.encryptionModeDesc || wifi.encryptionMode || "OPEN"}
            </span>
            <span className="text-[11px] text-base-content/60 font-mono ml-5">
              Radio: {wifi.relatedRadio === "1,2" ? "Dual-Band (2.4G & 5G)" : wifi.relatedRadio || "Dual-Band"}
            </span>
          </div>
        );
      },
    },
    {
      header: "STATUS SIARAN",
      accessorKey: "enable",
      className: "min-w-[110px] text-center whitespace-nowrap",
      cell: (wifi) => {
        const isUp = wifi.enable === "true";
        return (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap border ${
              isUp
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                : "bg-base-200 text-base-content/60 border-base-300"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isUp ? "bg-emerald-400 animate-pulse" : "bg-base-content/40"}`}></span>
            {isUp ? "Aktif" : "Nonaktif"}
          </span>
        );
      },
    },
    ...(isSuperAdmin
      ? [
          {
            header: "AKSI",
            accessorKey: "id" as keyof RuijieWifiItem,
            className: "w-24 text-center whitespace-nowrap",
            cell: (wifi: RuijieWifiItem) => (
              <div className="flex items-center justify-center">
                <button
                  className="btn btn-xs btn-outline btn-primary gap-1 font-medium px-3 shadow-sm hover:scale-105 transition-transform"
                  onClick={() => handleEditClick(wifi)}
                >
                  <FiSliders className="w-3 h-3" />
                  Edit
                </button>
              </div>
            ),
          },
        ]
      : []),
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl font-bold text-base-content tracking-tight">
              Manajemen SSID & Password WiFi
            </h1>
            <span className="badge badge-info badge-outline text-xs gap-1.5 font-semibold py-2.5 px-3">
              <span className="w-2 h-2 rounded-full bg-info animate-pulse"></span>
              Ruijie Cloud Live
            </span>
          </div>
          <p className="text-base-content/70 text-sm mt-1">
            Data dikelompokkan secara hierarkis per{" "}
            <span className="font-semibold text-base-content">Group Utama (Gedung/Proyek)</span> dan{" "}
            <span className="font-semibold text-base-content">Sub Group (Ruangan/Lantai)</span> dari Controller Ruijie RSUD NTB.
          </p>
        </div>
        <button
          className={`btn btn-sm btn-outline gap-2 shadow-sm ${isLoading ? "loading" : ""}`}
          onClick={() => fetchWifiList(true)}
          disabled={isLoading}
        >
          <FiRefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          Sinkronkan Ulang
        </button>
      </div>

      {/* Error Alert Banner */}
      {errorMessage && (
        <div className="alert alert-error shadow-sm text-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FiAlertTriangle className="w-5 h-5 shrink-0" />
            <div>
              <div className="font-bold">Gagal Mengambil Data Ruijie Cloud</div>
              <div className="text-xs opacity-90">{errorMessage}</div>
            </div>
          </div>
          <button
            onClick={() => fetchWifiList(true)}
            className="btn btn-sm btn-outline border-current text-current hover:bg-base-100/20"
          >
            Coba Sinkronkan Lagi
          </button>
        </div>
      )}

      {/* Tabs Group Utama (Project / Gedung) */}
      <div className="border-b border-base-300 pb-2">
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none flex-nowrap">
          <button
            onClick={() => handleSelectParentGroup("ALL")}
            className={`btn btn-sm gap-2 whitespace-nowrap shrink-0 transition-all ${
              selectedParentGroup === "ALL"
                ? "btn-primary shadow-sm"
                : "btn-ghost text-base-content/70 hover:bg-base-200"
            }`}
          >
            <FiServer className="w-3.5 h-3.5" />
            Semua Group
            <span className="badge badge-sm badge-neutral font-mono">{totalAll || totalItems}</span>
          </button>

          {hierarchy.length === 0 && isLoading ? (
            <>
              <div className="skeleton h-8 w-44 rounded-lg shrink-0" />
              <div className="skeleton h-8 w-36 rounded-lg shrink-0" />
              <div className="skeleton h-8 w-36 rounded-lg shrink-0" />
              <div className="skeleton h-8 w-40 rounded-lg shrink-0" />
            </>
          ) : (
            hierarchy.map((proj) => {
              const isActive = selectedParentGroup === proj.name;
              const ssidCount = groupStats[proj.name];
              return (
                <button
                  key={proj.groupId}
                  onClick={() => handleSelectParentGroup(proj.name)}
                  className={`btn btn-sm gap-2 whitespace-nowrap shrink-0 transition-all ${
                    isActive
                      ? "btn-primary shadow-sm"
                      : "btn-ghost text-base-content/70 hover:bg-base-200"
                  }`}
                >
                  <FiFolder className="w-3.5 h-3.5" />
                  {proj.name}
                  {ssidCount !== undefined && (
                    <span className="badge badge-sm badge-ghost font-mono text-[10px]">
                      {ssidCount} SSID
                    </span>
                  )}
                  {proj.subGroups.length > 0 && (
                    <span className="badge badge-sm badge-outline font-mono text-[10px]">
                      {proj.subGroups.length} Sub
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Filter Toolbar (Sub Group Selector & Search) */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-base-100 p-3.5 rounded-xl border border-base-300 shadow-sm">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap sm:flex-nowrap">
            <span className="text-xs font-semibold text-base-content/70 flex items-center gap-1.5 whitespace-nowrap shrink-0">
              <FiLayers className="w-4 h-4 text-primary" /> Sub Group:
            </span>
            <select
              value={selectedSubGroup}
              onChange={(e) => handleSelectSubGroup(e.target.value)}
              className="select select-bordered select-sm w-full sm:w-64 max-w-full font-medium text-xs bg-base-100 text-base-content focus:outline-primary"
            >
              <option value="ALL">Semua Sub Group ({availableSubGroups.length} Unit)</option>
              {availableSubGroups.map((sg) => (
                <option key={sg.groupId} value={sg.name}>
                  {sg.name}
                </option>
              ))}
            </select>
          </div>

          {selectedSubGroup !== "ALL" && (
            <button
              onClick={() => handleSelectSubGroup("ALL")}
              className="btn btn-xs btn-ghost text-error gap-1 hover:bg-error/10"
            >
              ✕ Reset Sub Group
            </button>
          )}
        </div>

        {/* Search Input */}
        <div className="w-full sm:w-80">
          <SearchInput placeholder="Cari SSID, Ruangan, VLAN..." />
        </div>
      </div>

      {/* Data Table */}
      <div className="card bg-base-100 border border-base-300 shadow-md overflow-hidden">
        <div className="card-body p-0">
          {isLoading ? (
            <WifiSkeleton isSuperAdmin={isSuperAdmin} />
          ) : (
            <DataTable
              data={wifiList}
              columns={columns}
              page={page}
              pageSize={pageSize}
              totalPages={totalPages}
            />
          )}
        </div>
      </div>

      {/* Edit Modal (Ruijie Cloud Sync) */}
      {isSuperAdmin && (
        <dialog id="wifi_modal" className="modal">
          <div className="modal-box bg-base-100 border border-base-300 shadow-2xl max-w-md">
            <div className="flex items-center gap-2 border-b border-base-300 pb-3">
              <FiSliders className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-lg text-base-content">Edit WiFi (Ruijie Cloud)</h3>
            </div>
            <form onSubmit={handleSubmit} className="py-4 space-y-4">
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium text-xs text-base-content/70">Lokasi Group / Sub Group</span>
                </label>
                <div className="p-3 bg-base-200/70 rounded-lg border border-base-300 text-xs space-y-1">
                  <div className="font-semibold text-base-content flex items-center gap-1.5">
                    <FiFolder className="w-4 h-4 text-info" />
                    {currentWifi.parentGroupName}
                  </div>
                  {currentWifi.groupName && currentWifi.groupName !== currentWifi.parentGroupName && (
                    <div className="ml-5 flex items-center gap-1 text-primary font-medium">
                      <FiCornerDownRight className="w-3.5 h-3.5" />
                      Sub Group: {currentWifi.groupName}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium text-xs text-base-content/70">Nama SSID</span>
                </label>
                <input
                  type="text"
                  value={currentWifi.ssidName}
                  onChange={(e) => setCurrentWifi({ ...currentWifi, ssidName: e.target.value })}
                  className="input input-bordered input-sm w-full font-semibold focus:outline-primary"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium text-xs text-base-content/70">
                    Password WiFi (Kosongkan jika Tanpa Password)
                  </span>
                </label>
                <input
                  type="text"
                  value={currentWifi.password}
                  onChange={(e) => setCurrentWifi({ ...currentWifi, password: e.target.value })}
                  className="input input-bordered input-sm w-full font-mono focus:outline-primary"
                  placeholder="Masukkan Password Baru"
                />
              </div>

              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-medium text-xs text-base-content/70">VLAN ID</span>
                </label>
                <input
                  type="number"
                  value={currentWifi.vlanId || 1}
                  onChange={(e) =>
                    setCurrentWifi({ ...currentWifi, vlanId: parseInt(e.target.value, 10) || 1 })
                  }
                  className="input input-bordered input-sm w-full font-mono focus:outline-primary"
                  required
                />
              </div>

              <div className="p-3 bg-base-200/50 rounded-lg border border-base-300 text-xs text-base-content/70">
                Perubahan pada SSID atau password ini akan langsung dipush ke Ruijie Cloud Controller dan disebarkan ke seluruh Access Point pada grup ini di RSUD NTB.
              </div>

              <div className="modal-action border-t border-base-300 pt-3">
                <button
                  type="button"
                  className="btn btn-sm btn-ghost"
                  onClick={() => (document.getElementById("wifi_modal") as HTMLDialogElement).close()}
                >
                  Batal
                </button>
                <button type="submit" className="btn btn-sm btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Menyimpan...
                    </>
                  ) : (
                    "Simpan ke Ruijie Cloud"
                  )}
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
  const skeletonRows = Array.from({ length: 8 });
  return (
    <div className="space-y-4 animate-pulse">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="w-12">#</th>
              <th>SSID &amp; NAMA JARINGAN</th>
              <th>STRUKTUR GROUP &amp; SUB GROUP</th>
              <th>PASSWORD WIFI</th>
              <th className="text-center">VLAN</th>
              <th>KEAMANAN &amp; RADIO</th>
              <th className="text-center">STATUS SIARAN</th>
              {isSuperAdmin && <th className="text-center w-24">AKSI</th>}
            </tr>
          </thead>
          <tbody>
            {skeletonRows.map((_, idx) => (
              <tr key={idx} className="border-b border-base-200">
                <td><div className="skeleton h-4 w-4" /></td>
                <td>
                  <div className="flex items-center gap-2.5">
                    <div className="skeleton h-7 w-7 rounded-lg shrink-0" />
                    <div className="space-y-1">
                      <div className="skeleton h-4 w-40 rounded" />
                      <div className="skeleton h-3 w-28 rounded" />
                    </div>
                  </div>
                </td>
                <td>
                  <div className="space-y-1.5 py-0.5">
                    <div className="skeleton h-4 w-32 rounded" />
                    <div className="skeleton h-3.5 w-24 rounded ml-4" />
                  </div>
                </td>
                <td><div className="skeleton h-5 w-24 rounded" /></td>
                <td className="text-center"><div className="skeleton h-6 w-16 mx-auto rounded-md" /></td>
                <td>
                  <div className="space-y-1">
                    <div className="skeleton h-4 w-28 rounded" />
                    <div className="skeleton h-3 w-20 rounded" />
                  </div>
                </td>
                <td className="text-center"><div className="skeleton h-6 w-16 mx-auto rounded-full" /></td>
                {isSuperAdmin && (
                  <td>
                    <div className="flex justify-center">
                      <div className="skeleton h-7 w-16 rounded-md" />
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 py-3 bg-base-100/60 border-t border-base-300">
        <div className="skeleton h-4 w-48 rounded" />
        <div className="skeleton h-6 w-40 rounded" />
      </div>
    </div>
  );
}
