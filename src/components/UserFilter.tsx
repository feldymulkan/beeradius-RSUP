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
    <div className="flex flex-wrap gap-4 items-center">
      {/* Filter Group */}
      <select
        className="select select-bordered select-sm"
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
        className="select select-bordered select-sm"
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
        className="select select-bordered select-sm"
        value={currentNeverLogged}
        onChange={e => updateParam("never_logged_in", e.target.value)}
      >
        <option value="">Filter Inaktivitas</option>
        <option value="never">Belum Pernah Login</option>
        <option value="30">Inaktif &gt; 30 Hari</option>
        <option value="90">Inaktif &gt; 90 Hari</option>
      </select>

      <button onClick={resetFilter} className="btn btn-outline btn-sm">
        Reset
      </button>
    </div>
  );
}