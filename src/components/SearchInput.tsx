"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useDebounce } from "use-debounce";
import { FaSearch, FaTimes } from "react-icons/fa";

type Props = {
    placeholder?: string;
    queryKey?: string;
};

export default function SearchInput({ placeholder = "Cari...", queryKey = "q" }: Props) {
    const { replace } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [term, setTerm] = useState(searchParams.get(queryKey)?.toString() || "");
    const [debouncedTerm] = useDebounce(term, 500);

    const handleSearch = useCallback((value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", "1");
        if (value) {
            params.set(queryKey, value);
        } else {
            params.delete(queryKey);
        }
        replace(`${pathname}?${params.toString()}`);
    }, [pathname, replace, searchParams, queryKey]);

    // Sync state with URL only on initial load or external URL changes
    useEffect(() => {
        const urlTerm = searchParams.get(queryKey)?.toString() || "";
        if (urlTerm !== term && !term) {
            setTerm(urlTerm);
        }
    }, [searchParams, queryKey, term]);

    // Debounced search trigger
    useEffect(() => {
        if (debouncedTerm !== (searchParams.get(queryKey) || "")) {
            handleSearch(debouncedTerm);
        }
    }, [debouncedTerm, handleSearch, searchParams, queryKey]);

    const clearSearch = () => {
        setTerm("");
        handleSearch("");
    };

    return (
        <div className="form-control w-full sm:w-72">
            <div className="relative group">
                <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 group-focus-within:text-primary transition-colors">
                    <FaSearch size={13} />
                </span>
                <input
                    type="text"
                    className="input input-sm bg-base-200/80 border border-primary/20 w-full pl-9 pr-8 text-xs rounded-lg focus:border-primary focus:outline-none transition-all"
                    placeholder={placeholder}
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                />
                {term && (
                    <button
                        onClick={clearSearch}
                        className="absolute inset-y-0 right-2.5 flex items-center text-slate-400 hover:text-error transition-colors"
                        title="Hapus Pencarian"
                    >
                        <FaTimes size={12} />
                    </button>
                )}
            </div>
            {debouncedTerm && debouncedTerm === term && (
                <div className="text-[10px] text-cyan-400/80 font-mono mt-0.5 px-1 animate-pulse">
                    Mencari: {debouncedTerm}
                </div>
            )}
        </div>
    );
}


