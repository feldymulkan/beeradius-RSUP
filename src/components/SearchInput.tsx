"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, FormEvent } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

type Props = {
  placeholder?: string;
  queryKey?: string;
  className?: string;
};

export default function SearchInput({
  placeholder = "Cari...",
  queryKey = "q",
  className = "",
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlQuery = searchParams.get(queryKey)?.toString() || "";
  const [term, setTerm] = useState(urlQuery);

  // Sync state with URL parameter when URL changes externally (navigation, reset)
  useEffect(() => {
    setTerm(urlQuery);
  }, [urlQuery]);

  const executeSearch = (valueToSearch: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1"); // Always reset to page 1 on new search
    const trimmed = valueToSearch.trim();
    if (trimmed) {
      params.set(queryKey, trimmed);
    } else {
      params.delete(queryKey);
    }
    const newQuery = params.toString();
    router.replace(newQuery ? `${pathname}?${newQuery}` : pathname);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    executeSearch(term);
  };

  const handleClear = () => {
    setTerm("");
    executeSearch("");
  };

  const isQueryApplied = Boolean(urlQuery);

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <form onSubmit={handleSubmit} className="flex items-center gap-1.5 w-full sm:w-auto">
        <div className="relative group w-full sm:w-64">
          <span className="absolute inset-y-0 left-2.5 flex items-center text-base-content/40 group-focus-within:text-primary transition-colors pointer-events-none">
            <FaSearch size={12} />
          </span>
          <input
            type="text"
            className="input input-sm bg-base-100 border border-base-300 w-full pl-8 pr-7 text-xs rounded-lg focus:border-primary focus:outline-none transition-all placeholder:text-base-content/40"
            placeholder={placeholder}
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          {term && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-2 flex items-center text-base-content/40 hover:text-error transition-colors cursor-pointer"
              title="Hapus teks pencarian"
            >
              <FaTimes size={11} />
            </button>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-sm btn-primary text-xs px-3 shadow-xs gap-1.5 font-medium flex items-center shrink-0 cursor-pointer"
          title="Terapkan pencarian (atau tekan Enter)"
        >
          <FaSearch size={11} />
          <span>Cari</span>
        </button>
      </form>

      {/* Indikator query aktif jika sedang menyaring hasil */}
      {isQueryApplied && (
        <div className="flex items-center gap-1 text-[11px] font-mono animate-in fade-in duration-200">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary/10 border border-primary/30 text-primary font-semibold">
            <span>Hasil:</span>
            <span className="max-w-[120px] truncate">"{urlQuery}"</span>
            <button
              type="button"
              onClick={handleClear}
              className="hover:text-rose-400 ml-0.5 text-xs font-bold cursor-pointer"
              title="Batalkan filter pencarian ini"
            >
              ×
            </button>
          </span>
        </div>
      )}
    </div>
  );
}
