"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, UserFormData } from "@/lib/validations";
import { createUser } from "@/app/actions/userActions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { FaUser, FaLock, FaAddressCard, FaNetworkWired, FaShieldAlt } from "react-icons/fa";

type UserFormProps = {
  type: "hotspot" | "vpn";
};

type Group = {
  groupname: string;
  type: "hotspot" | "vpn";
};

type Pool = {
  name: string;
};

export default function UserForm({ type }: UserFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const [pools, setPools] = useState<Pool[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema) as any,
    defaultValues: {
      type: type,
      passwordType: "cleartext",
      groupname: "default",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [groupsRes, poolsRes] = await Promise.all([
          fetch("/api/radius/groups"),
          fetch("/api/radius/pools")
        ]);
        
        const groupsData = await groupsRes.json();
        const poolsData = await poolsRes.json();
        
        // Filter groups based on type
        const filteredGroups = (groupsData.groups || []).filter((g: Group) => g.type === type);
        setGroups(filteredGroups);
        setPools(poolsData.pools || []);

        if (filteredGroups.length > 0) {
          setValue("groupname", filteredGroups[0].groupname);
        } else {
          setValue("groupname", "default");
        }

      } catch (err) {
        console.error("Gagal mengambil data:", err);
        toast.error("Gagal memuat daftar grup/pool");
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchData();
  }, [type, setValue]);

  const onSubmit = async (data: UserFormData) => {
    setIsSubmitting(true);
    const result = await createUser(data);
    setIsSubmitting(false);

    if (result.success) {
      toast.success(result.message || "User berhasil dibuat");
      if (type === "vpn" && result.id) {
        router.push(`/radius-users/vpn/detail/${result.id}`);
      } else {
        router.push("/radius-users");
      }
      router.refresh();
    } else {
      toast.error(result.error || "Gagal membuat user");
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl border border-base-200">
      <div className="card-body">
        <div className="flex items-center gap-3 mb-6 border-b pb-4">
          <div className={`p-3 rounded-xl ${type === 'vpn' ? 'bg-secondary text-secondary-content' : 'bg-primary text-primary-content'}`}>
            {type === 'vpn' ? <FaShieldAlt size={24} /> : <FaNetworkWired size={24} />}
          </div>
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wider">
              Tambah User {type}
            </h2>
            <p className="text-xs opacity-60">Silahkan isi formulir di bawah untuk membuat akun baru</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Seksi Akun */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold flex items-center gap-2 text-primary">
                <FaUser size={14} /> INFORMASI AKUN
              </h3>
              
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Username <span className="text-error">*</span></span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content/50">
                    <FaUser />
                  </span>
                  <input
                    {...register("username")}
                    type="text"
                    placeholder="Contoh: user123"
                    className={`input input-bordered w-full pl-10 ${errors.username ? "input-error" : "focus:border-primary"}`}
                  />
                </div>
                {errors.username && <span className="text-error text-xs mt-1">{errors.username.message}</span>}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Password <span className="text-error">*</span></span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content/50">
                    <FaLock />
                  </span>
                  <input
                    {...register("password")}
                    type="password"
                    placeholder="Minimal 4 karakter"
                    className={`input input-bordered w-full pl-10 ${errors.password ? "input-error" : "focus:border-primary"}`}
                  />
                </div>
                {errors.password && <span className="text-error text-xs mt-1">{errors.password.message}</span>}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Radius Group</span>
                </label>
                {isLoadingData ? (
                  <div className="h-12 w-full bg-base-200 animate-pulse rounded-lg"></div>
                ) : (
                  <select 
                    {...register("groupname")}
                    className="select select-bordered w-full focus:border-primary"
                  >
                    {groups.length === 0 && <option value="default">default</option>}
                    {groups.map(g => (
                      <option key={g.groupname} value={g.groupname}>{g.groupname}</option>
                    ))}
                  </select>
                )}
              </div>

              {type === "vpn" && (
                <div className="form-control w-full animate-in fade-in duration-500">
                  <label className="label">
                    <span className="label-text font-semibold text-primary">IP Pool (MikroTik)</span>
                  </label>
                  <select 
                    {...register("poolName")}
                    className="select select-bordered w-full focus:border-primary"
                  >
                    <option value="">-- Tanpa Pool (Otomatis) --</option>
                    {pools.map(p => (
                      <option key={p.name} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Seksi Profil & Teknis */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold flex items-center gap-2 text-primary">
                <FaAddressCard size={14} /> PROFIL PENGGUNA
              </h3>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Nama Lengkap</span>
                </label>
                <input
                  {...register("fullName")}
                  type="text"
                  placeholder="Nama lengkap sesuai KTP/ID"
                  className="input input-bordered w-full focus:border-primary"
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Unit / Departemen</span>
                </label>
                <input
                  {...register("department")}
                  type="text"
                  placeholder="Contoh: Perawat, IT, Keuangan"
                  className="input input-bordered w-full focus:border-primary"
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold">Metode Enkripsi</span>
                </label>
                <select {...register("passwordType")} className="select select-bordered w-full focus:border-primary">
                  <option value="cleartext">Cleartext-Password (Rekomendasi)</option>
                  <option value="md5">MD5-Password</option>
                  <option value="sha1">SHA1-Password</option>
                </select>
                <label className="label">
                  <span className="label-text-alt opacity-50 italic">Gunakan Cleartext jika ragu</span>
                </label>
              </div>

              {type === "vpn" && (
                <div className="form-control w-full animate-in fade-in duration-500">
                  <label className="label">
                    <span className="label-text font-semibold text-secondary">IP Address Statis (Opsional)</span>
                  </label>
                  <input
                    {...register("ipAddress")}
                    type="text"
                    placeholder="Contoh: 10.0.0.50"
                    className={`input input-bordered border-secondary w-full ${errors.ipAddress ? "input-error" : ""}`}
                  />
                  {errors.ipAddress && <span className="text-error text-xs mt-1">{errors.ipAddress.message}</span>}
                  <label className="label">
                    <span className="label-text-alt opacity-50 italic text-secondary">Kosongkan jika menggunakan IP Pool</span>
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t mt-8">
            <button
              type="button"
              onClick={() => router.back()}
              className="btn btn-ghost order-2 sm:order-1"
            >
              Kembali
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn ${type === 'vpn' ? 'btn-secondary' : 'btn-primary'} min-w-[160px] order-1 sm:order-2 shadow-lg`}
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Proses...
                </>
              ) : (
                "Simpan User Baru"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
