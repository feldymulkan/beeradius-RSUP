"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { EditFormSkeleton } from "@/components/Skleton";
import { toast } from "react-hot-toast";

type Group = {
  groupname: string;
};

type Pool = {
  name: string;
};

export default function EditVpnUserPage() {
  const router = useRouter();
  const { id } = useParams();

  const [originalUsername, setOriginalUsername] = useState("");
  const [username, setUsername] = useState("");         
  const [fullName, setFullName] = useState("");
  const [department, setDepartment] = useState("");
  const [groupname, setGroupname] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [poolName, setPoolName] = useState("");

  const [groups, setGroups] = useState<Group[]>([]);
  const [pools, setPools] = useState<Pool[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, groupsRes, poolsRes] = await Promise.all([
          fetch(`/api/radius/users/vpn/${id}`),
          fetch('/api/radius/groups'),
          fetch('/api/radius/pools')
        ]);
        
        if (!userRes.ok) throw new Error("Gagal memuat data user.");
        const userData = await userRes.json();
        setOriginalUsername(userData.username);
        setUsername(userData.username);
        setFullName(userData.fullName || "");
        setDepartment(userData.department || "");
        setGroupname(userData.group || "");
        setIpAddress(userData.ipAddress || "");
        setPoolName(userData.poolName || "");

        if (groupsRes.ok) {
          const groupsData = await groupsRes.json();
          const allGroups = Array.isArray(groupsData) ? groupsData : groupsData.groups || [];
          setGroups(allGroups.filter((g: any) => g.type === 'vpn'));
        }

        if (poolsRes.ok) {
          const poolsData = await poolsRes.json();
          setPools(poolsData.pools || []);
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
      passwordType: 'cleartext',
      ipAddress,
      poolName
    };

    try {
      const res = await fetch(`/api/radius/users/vpn/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Gagal mengupdate user.");
      toast.success("User VPN diperbarui!");
      router.push(`/radius-users/vpn/detail/${id}`);
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
      setIsLoading(false);
    }
  };

  if (isFetching) return <EditFormSkeleton />;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Edit VPN: {originalUsername}</h1>
          <p className="text-sm opacity-60">Ubah konfigurasi akses remote VPN.</p>
        </div>
        <Link href={`/radius-users/vpn/detail/${id}`} className="btn btn-ghost btn-sm">Kembali</Link>
      </div>

      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-bold border-b pb-2 text-secondary">Informasi Akun</h3>
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold">Username</span></label>
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input input-bordered" required />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold">Grup VPN</span></label>
                  <select className="select select-bordered" value={groupname} onChange={(e) => setGroupname(e.target.value)} required>
                      <option value="">-- Pilih Grup --</option>
                      {groups.map(g => <option key={g.groupname} value={g.groupname}>{g.groupname}</option>)}
                  </select>
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text">Password Baru (Opsional)</span></label>
                  <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="input input-bordered" placeholder="Kosongkan jika tidak diubah" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold border-b pb-2 text-secondary">Konfigurasi Network</h3>
                <div className="form-control">
                  <label className="label"><span className="label-text">Nama Lengkap</span></label>
                  <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="input input-bordered" />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold text-secondary">IP Pool</span></label>
                  <select className="select select-bordered border-secondary" value={poolName} onChange={(e) => setPoolName(e.target.value)}>
                    <option value="">-- Tanpa Pool --</option>
                    {pools.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                  </select>
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold text-secondary">IP Address Statis</span></label>
                  <input type="text" value={ipAddress} onChange={(e) => setIpAddress(e.target.value)} className="input input-bordered border-secondary" placeholder="Contoh: 10.10.10.10" />
                </div>
              </div>
            </div>

            <div className="card-actions justify-end mt-6 border-t pt-4">
              <button type="submit" className="btn btn-secondary" disabled={isLoading}>
                {isLoading ? <span className="loading loading-spinner"></span> : "Simpan Perubahan VPN"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
