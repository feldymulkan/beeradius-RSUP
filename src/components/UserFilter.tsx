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
    <div className="flex gap-4 items-center">
      {/* Filter Group */}
      <select
        className="select select-bordered"
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

      <button onClick={resetFilter} className="btn btn-outline">
        Reset
      </button>
    </div>
  );
}