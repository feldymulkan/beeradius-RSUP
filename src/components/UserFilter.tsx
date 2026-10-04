"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function UserFilter({
  groups,
}: {
  groups: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentGroup = searchParams.get("group") || "";
  const currentStatus = searchParams.get("status") || "";
  const currentNeverLogged = searchParams.get("never_logged_in") || "";

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set(key, value);
    else params.delete(key);

    params.set("page", "1"); // reset pagination
    router.push(`?${params.toString()}`);
  };

  const resetFilter = () => {
    router.push("?"); // Reset URL ke root page tanpa query params
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {/* Filter Group */}
      <select
        className="select select-sm bg-base-200/80 border border-primary/20 text-xs rounded-lg focus:border-primary focus:outline-none"
        value={currentGroup}
        onChange={e => updateParam("group", e.target.value)}
      >
        <option value="">Semua Group</option>
        {groups.map(g => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      {/* Filter Status (Online/Offline) */}
      <select
        className="select select-sm bg-base-200/80 border border-primary/20 text-xs rounded-lg focus:border-primary focus:outline-none"
        value={currentStatus}
        onChange={e => updateParam("status", e.target.value)}
      >
        <option value="">Status Koneksi</option>
        <option value="online">User Online</option>
        <option value="stale">Sesi Gantung</option>
        <option value="offline">Offline</option>
      </select>

      {/* Filter Inaktivitas */}
      <select
        className="select select-sm bg-base-200/80 border border-primary/20 text-xs rounded-lg focus:border-primary focus:outline-none"
        value={currentNeverLogged}
        onChange={e => updateParam("never_logged_in", e.target.value)}
      >
        <option value="">Filter Inaktivitas</option>
        <option value="never">Belum Pernah Login</option>
        <option value="30">Inaktif &gt; 30 Hari</option>
        <option value="90">Inaktif &gt; 90 Hari</option>
      </select>

      {(currentGroup || currentStatus || currentNeverLogged) && (
        <button
          onClick={resetFilter}
          className="btn btn-ghost btn-sm text-xs text-slate-400 hover:text-white"
          title="Reset semua filter"
        >
          Reset
        </button>
      )}
    </div>
  );
}