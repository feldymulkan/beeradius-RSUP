"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { EditFormSkeleton } from "@/components/Skleton";
import { toast } from "react-hot-toast";

type Group = {
  groupname: string;
};

export default function EditHotspotUserPage() {
  const router = useRouter();
  const { id } = useParams();

  const [originalUsername, setOriginalUsername] = useState("");
  const [username, setUsername] = useState("");         
  const [fullName, setFullName] = useState("");
  const [department, setDepartment] = useState("");
  const [groupname, setGroupname] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, groupsRes] = await Promise.all([
          fetch(`/api/radius/users/hotspot/${id}`),
          fetch('/api/radius/groups')
        ]);
        
        if (!userRes.ok) throw new Error("Gagal memuat data user.");
        const userData = await userRes.json();
        setOriginalUsername(userData.username);
        setUsername(userData.username);
        setFullName(userData.fullName || "");
        setDepartment(userData.department || "");
        setGroupname(userData.group || "");

        if (groupsRes.ok) {
          const groupsData = await groupsRes.json();
          const allGroups = Array.isArray(groupsData) ? groupsData : groupsData.groups || [];
          setGroups(allGroups.filter((g: any) => g.type === 'hotspot'));
        }
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setIsFetching(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const body = { 
      newUsername: username,
      fullName, 
      department, 
      groupname,
      newPassword: newPassword || undefined,
      passwordType: 'cleartext'
    };

    try {
      const res = await fetch(`/api/radius/users/hotspot/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Gagal mengupdate user.");
      toast.success("User hotspot diperbarui!");
      router.push(`/radius-users/hotspot/detail/${id}`);
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
      setIsLoading(false);
    }
  };

  if (isFetching) return <EditFormSkeleton />;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Hotspot: {originalUsername}</h1>
        <Link href={`/radius-users/hotspot/detail/${id}`} className="btn btn-ghost btn-sm">Kembali</Link>
      </div>

      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label"><span className="label-text font-bold">Username</span></label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input input-bordered" required />
            </div>
            
            <div className="form-control">
              <label className="label"><span className="label-text">Nama Lengkap</span></label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="input input-bordered" />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Departemen</span></label>
              <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} className="input input-bordered" />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-bold">Grup Hotspot</span></label>
              <select className="select select-bordered" value={groupname} onChange={(e) => setGroupname(e.target.value)} required>
                  <option value="">-- Pilih Grup --</option>
                  {groups.map(g => <option key={g.groupname} value={g.groupname}>{g.groupname}</option>)}
              </select>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Password Baru (Opsional)</span></label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="input input-bordered" placeholder="Kosongkan jika tidak diubah" />
            </div>

            <div className="card-actions justify-end mt-4">
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? <span className="loading loading-spinner"></span> : "Simpan Perubahan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
