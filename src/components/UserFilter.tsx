"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaTimes } from "react-icons/fa";

export default function UserFilter({
  groups,
}: {
  groups: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
    router.push(newQuery ? `${pathname}?${newQuery}` : pathname);
  };

  const resetFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("group");
    params.delete("status");
    params.delete("never_logged_in");
    params.set("page", "1");
    const newQuery = params.toString();
    router.push(newQuery ? `${pathname}?${newQuery}` : pathname);
  };

  const activeFilterCount =
    (currentGroup ? 1 : 0) +
    (currentStatus ? 1 : 0) +
    (currentNeverLogged ? 1 : 0);

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {/* Filter Group */}
      <select
        className={`select select-sm bg-base-100 border text-xs rounded-lg focus:border-primary focus:outline-none transition-colors ${
          currentGroup ? "border-primary text-primary font-medium" : "border-base-300"
        }`}
        value={currentGroup}
        onChange={(e) => updateParam("group", e.target.value)}
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
        className={`select select-sm bg-base-100 border text-xs rounded-lg focus:border-primary focus:outline-none transition-colors ${
          currentStatus ? "border-primary text-primary font-medium" : "border-base-300"
        }`}
        value={currentStatus}
        onChange={(e) => updateParam("status", e.target.value)}
        title="Filter berdasarkan status koneksi realtime"
      >
        <option value="">Status Koneksi</option>
        <option value="online">User Online</option>
        <option value="stale">Sesi Gantung</option>
        <option value="offline">Offline</option>
      </select>

      {/* Filter Inaktivitas */}
      <select
        className={`select select-sm bg-base-100 border text-xs rounded-lg focus:border-primary focus:outline-none transition-colors ${
          currentNeverLogged ? "border-primary text-primary font-medium" : "border-base-300"
        }`}
        value={currentNeverLogged}
        onChange={(e) => updateParam("never_logged_in", e.target.value)}
        title="Filter akun tidak aktif"
      >
        <option value="">Filter Inaktivitas</option>
        <option value="never">Belum Pernah Login</option>
        <option value="30">Inaktif &gt; 30 Hari</option>
        <option value="90">Inaktif &gt; 90 Hari</option>
      </select>

      {/* Reset Filter Action */}
      {activeFilterCount > 0 && (
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