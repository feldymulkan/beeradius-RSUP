"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { FaTimes } from "react-icons/fa";

export default function UserFilter({
  groups,
}: {
  groups: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentGroup = searchParams.get("group") || "";
  const currentStatus = searchParams.get("status") || "";
  const currentNeverLogged = searchParams.get("never_logged_in") || "";

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set("page", "1"); // Reset ke halaman 1
    const newQuery = params.toString();
    startTransition(() => {
      router.push(newQuery ? `${pathname}?${newQuery}` : pathname);
    });
  };

  const resetFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("group");
    params.delete("status");
    params.delete("never_logged_in");
    params.set("page", "1");
    const newQuery = params.toString();
    startTransition(() => {
      router.push(newQuery ? `${pathname}?${newQuery}` : pathname);
    });
  };

  const activeFilterCount =
    (currentGroup ? 1 : 0) +
    (currentStatus ? 1 : 0) +
    (currentNeverLogged ? 1 : 0);

  return (
    <div className="flex flex-wrap gap-2 items-center w-full sm:w-auto">
      {/* Filter Group */}
      <select
        className={`select select-sm bg-base-100 border text-xs rounded-lg focus:border-primary focus:outline-none transition-colors flex-1 sm:flex-initial ${
          currentGroup ? "border-primary text-primary font-medium" : "border-base-300"
        } ${isPending ? "opacity-70 cursor-wait" : ""}`}
        value={currentGroup}
        onChange={(e) => updateParam("group", e.target.value)}
        disabled={isPending}
        title="Filter berdasarkan profil bandwidth grup"
      >
        <option value="">Semua Group</option>
        {groups.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      {/* Filter Status (Online/Offline/Stale) */}
      <select
        className={`select select-sm bg-base-100 border text-xs rounded-lg focus:border-primary focus:outline-none transition-colors flex-1 sm:flex-initial ${
          currentStatus ? "border-primary text-primary font-medium" : "border-base-300"
        } ${isPending ? "opacity-70 cursor-wait" : ""}`}
        value={currentStatus}
        onChange={(e) => updateParam("status", e.target.value)}
        disabled={isPending}
        title="Filter berdasarkan status koneksi realtime"
      >
        <option value="">Status Koneksi</option>
        <option value="online">User Online</option>
        <option value="stale">Sesi Gantung</option>
        <option value="offline">Offline</option>
      </select>

      {/* Filter Inaktivitas */}
      <select
        className={`select select-sm bg-base-100 border text-xs rounded-lg focus:border-primary focus:outline-none transition-colors flex-1 sm:flex-initial ${
          currentNeverLogged ? "border-primary text-primary font-medium" : "border-base-300"
        } ${isPending ? "opacity-70 cursor-wait" : ""}`}
        value={currentNeverLogged}
        onChange={(e) => updateParam("never_logged_in", e.target.value)}
        disabled={isPending}
        title="Filter akun tidak aktif"
      >
        <option value="">Filter Inaktivitas</option>
        <option value="never">Belum Pernah Login</option>
        <option value="30">Inaktif &gt; 30 Hari</option>
        <option value="90">Inaktif &gt; 90 Hari</option>
      </select>

      {/* Indikator Memfilter */}
      {isPending && (
        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-medium animate-pulse">
          <span className="loading loading-spinner loading-xs" />
          <span>Memfilter...</span>
        </span>
      )}

      {/* Reset Filter Action */}
      {activeFilterCount > 0 && !isPending && (
        <button
          onClick={resetFilter}
          className="btn btn-ghost btn-sm text-xs text-base-content/70 hover:text-rose-400 gap-1.5 border border-base-300 hover:border-rose-400/40"
          title="Reset filter pilihan (mempertahankan kata kunci pencarian jika ada)"
        >
          <FaTimes size={10} />
          <span>Reset Filter ({activeFilterCount})</span>
        </button>
      )}
    </div>
  );
}