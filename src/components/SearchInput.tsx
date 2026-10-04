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
        <div className="form-control w-full max-w-md">
            <div className="relative group">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 group-focus-within:text-primary transition-colors">
                    <FaSearch size={14} />
                </span>
                <input
                    type="text"
                    className="input input-bordered w-full pl-10 pr-10 focus:input-primary transition-all shadow-sm"
                    placeholder={placeholder}
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                />
                {term && (
                    <button
                        onClick={clearSearch}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-error transition-colors"
                        title="Hapus Pencarian"
                    >
                        <FaTimes size={14} />
                    </button>
                )}
            </div>
            {debouncedTerm && debouncedTerm === term && (
                <div className="absolute -bottom-5 left-0 text-[10px] text-gray-400 font-bold uppercase tracking-widest px-2 animate-pulse">
                    Mencari: {debouncedTerm}
                </div>
            )}
        </div>
    );
}


