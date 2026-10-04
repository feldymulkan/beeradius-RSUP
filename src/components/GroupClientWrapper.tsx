"use client";

import Link from "next/link";
import DataTable, { type ColumnDef } from "@/components/DataTable";
import DeleteButton from "@/components/DeleteButton";
import SearchInput from "@/components/SearchInput";

// Definisikan tipe data yang diterima
type Group = {
  id: string;
  groupname: string;
  type: string;
};

type Props = {
  groups: Group[];
  page: number;
  pageSize: number;
  totalPages: number;
};

export default function GroupClientWrapper({ groups, page, pageSize, totalPages }: Props) {
  // Definisikan 'columns' di dalam Client Component ini
  const columns: ColumnDef<Group>[] = [
    { 
      header: "Nama Grup", 
      accessorKey: "groupname" 
    },
    {
      header: "Tipe",
      accessorKey: "type",
      cell: (group) => (
        <span className={`badge ${group.type === 'vpn' ? 'badge-secondary' : 'badge-primary'}`}>
          {group.type.toUpperCase()}
        </span>
      )
    },
    {
      header: "Actions",
      accessorKey: "id",
      className: "text-center",
      cell: (group) => (
        <div className="flex items-center justify-center gap-2">
          <Link href={`/radius-groups/edit/${group.groupname}`} className="btn btn-sm btn-info">Edit</Link>
          <DeleteButton 
            itemId={group.groupname} 
            itemName={group.groupname} 
            entityType="grup" 
            apiEndpoint="/api/radius/groups" 
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-4">
        <SearchInput placeholder="Cari nama grup..." />
      </div>
      <DataTable 
        data={groups} 
        columns={columns} 
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
        />
    </div>
  );
}