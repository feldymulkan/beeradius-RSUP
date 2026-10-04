"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaSortUp, FaSortDown, FaSort } from "react-icons/fa";

export type ColumnDef<T> = {
  header: string;
  accessorKey?: keyof T | "selection";
  cell?: (item: T) => React.ReactNode;
  className?: string;
  sortKey?: string; // server-side sort key
};

type DataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  page?: number;
  pageSize?: number;
  totalPages?: number;
  totalItems?: number;
  onSelectionChange?: (selectedIds: any[]) => void;
  idKey?: keyof T;
};

export default function DataTable<T extends { [key: string]: any }>({
  data,
  columns,
  page = 1,
  pageSize = 10,
  totalPages = 1,
  totalItems,
  onSelectionChange,
  idKey = "id" as keyof T,
}: DataTableProps<T>) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedIds, setSelectedIds] = useState<any[]>([]);

  const currentSort = searchParams.get("sort") || "";
  const currentOrder = searchParams.get("order") || "asc";

  useEffect(() => {
    setSelectedIds([]);
  }, [data]);

  const toggleSelectAll = (checked: boolean) => {
    const newSelected = checked ? data.map(item => item[idKey]) : [];
    setSelectedIds(newSelected);
    onSelectionChange?.(newSelected);
  };

  const toggleSelect = (id: any) => {
    const newSelected = selectedIds.includes(id)
      ? selectedIds.filter(sid => sid !== id)
      : [...selectedIds, id];
    setSelectedIds(newSelected);
    onSelectionChange?.(newSelected);
  };

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handlePageSizeChange = (newSize: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("pageSize", newSize);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const createSortURL = (sortKey: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");

    if (currentSort === sortKey) {
      if (currentOrder === "asc") {
        params.set("sort", sortKey);
        params.set("order", "desc");
      } else {
        // Reset sort
        params.delete("sort");
        params.delete("order");
      }
    } else {
      params.set("sort", sortKey);
      params.set("order", "asc");
    }

    return `${pathname}?${params.toString()}`;
  };

  const getSortIcon = (sortKey: string) => {
    if (currentSort !== sortKey) {
      return <FaSort className="opacity-30 ml-1 inline" size={10} />;
    }
    return currentOrder === "asc" 
      ? <FaSortUp className="text-primary ml-1 inline" size={10} /> 
      : <FaSortDown className="text-primary ml-1 inline" size={10} />;
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | '...')[] = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push('...');
      
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      
      if (page < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            {onSelectionChange && (
              <th className="w-12 text-center">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary checkbox-sm"
                  checked={data.length > 0 && selectedIds.length === data.length}
                  onChange={(e) => toggleSelectAll(e.target.checked)}
                />
              </th>
            )}
            <th className="w-12">#</th>
            {columns.map((column, idx) => (
              <th key={idx} className={column.className}>
                {column.sortKey ? (
                  <Link
                    href={createSortURL(column.sortKey)}
                    className="cursor-pointer select-none hover:text-primary transition-colors inline-flex items-center gap-0.5"
                    prefetch={false}
                  >
                    {column.header}
                    {getSortIcon(column.sortKey)}
                  </Link>
                ) : (
                  column.header
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (onSelectionChange ? 2 : 1)} className="text-center py-10 opacity-50 italic">
                Tidak ada data ditemukan.
              </td>
            </tr>
          ) : (
            data.map((item, index) => {
              const rowNumber = (page - 1) * pageSize + index + 1;
              const itemId = item[idKey];
              return (
                <tr key={itemId} className="hover">
                  {onSelectionChange && (
                    <td className="text-center">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary checkbox-sm"
                        checked={selectedIds.includes(itemId)}
                        onChange={() => toggleSelect(itemId)}
                      />
                    </td>
                  )}
                  <td className="opacity-50 text-xs">{rowNumber}</td>
                  {columns.map((column, idx) => (
                    <td
                      key={idx}
                      className={column.className}
                    >
                      {column.cell
                        ? column.cell(item)
                        : (item[column.accessorKey as keyof T] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6 px-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase text-gray-400">Tampilkan</span>
          <select 
            className="select select-bordered select-xs"
            value={pageSize}
            onChange={(e) => handlePageSizeChange(e.target.value)}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="500">500</option>
            <option value="1000">1000</option>
          </select>
          <span className="text-xs font-bold uppercase text-gray-400">Data</span>
          {totalItems !== undefined && (
            <span className="text-xs text-gray-400 ml-2">
              (Total: <strong className="text-primary">{totalItems.toLocaleString('id-ID')}</strong>)
            </span>
          )}
        </div>

        {totalPages > 1 && (
          <div className="join">
            <Link
              href={createPageURL(page - 1)}
              className={`join-item btn btn-xs px-3 ${page <= 1 ? "btn-disabled" : ""}`}
              prefetch={false}
            >
              «
            </Link>
            {getPageNumbers().map((p, idx) => 
              p === '...' ? (
                <button key={`dot-${idx}`} className="join-item btn btn-xs px-2 btn-disabled no-animation">…</button>
              ) : (
                <Link
                  key={p}
                  href={createPageURL(p)}
                  className={`join-item btn btn-xs px-3 ${page === p ? "btn-active btn-primary" : ""}`}
                  prefetch={false}
                >
                  {p}
                </Link>
              )
            )}
            <Link
              href={createPageURL(page + 1)}
              className={`join-item btn btn-xs px-3 ${page >= totalPages ? "btn-disabled" : ""}`}
              prefetch={false}
            >
              »
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
