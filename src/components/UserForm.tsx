"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, UserFormData } from "@/lib/validations";
import { createUser } from "@/app/actions/userActions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaUser,
  FaLock,
  FaAddressCard,
  FaNetworkWired,
  FaShieldAlt,
  FaWifi,
  FaEye,
  FaEyeSlash,
  FaRandom,
  FaLayerGroup,
  FaBuilding,
  FaKey,
  FaInfoCircle,
  FaCheckCircle,
  FaArrowLeft,
  FaServer,
} from "react-icons/fa";

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
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema) as any,
    defaultValues: {
      type: type,
      passwordType: "cleartext",
      groupname: "default",
      username: "",
      password: "",
      fullName: "",
      department: "",
      ipAddress: "",
      poolName: "",
    },
  });

  const currentPassword = watch("password") || "";

  // Password strength calculation
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: "Kosong", color: "bg-base-300" };
    if (pwd.length < 4) return { score: 1, label: "Terlalu Pendek", color: "bg-rose-500" };
    let score = 1;
    if (pwd.length >= 8) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd) || /[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 2) return { score: 2, label: "Cukup", color: "bg-amber-500" };
    if (score === 3) return { score: 3, label: "Kuat", color: "bg-sky-500" };
    return { score: 4, label: "Sangat Kuat", color: "bg-emerald-500" };
  };

  const strength = getPasswordStrength(currentPassword);

  // Generate safe random password
  const generateRandomPassword = () => {
    const chars = "abcdefghjkmnpqrstuvwxyz23456789ABCDEFGHJKMNPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setValue("password", result, { shouldValidate: true });
    setShowPassword(true);
    toast.success("Password acak berhasil dibuat!");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [groupsRes, poolsRes] = await Promise.all([
          fetch("/api/radius/groups"),
          fetch("/api/radius/pools"),
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
    try {
      const result = await createUser(data);
      if (result.success) {
        toast.success(result.message || "User berhasil dibuat");
        if (type === "vpn" && result.id) {
          router.push(`/radius-users/vpn/detail/${result.id}`);
        } else {
          router.push(`/radius-users/type/${type}`);
        }
        router.refresh();
      } else {
        toast.error(result.error || "Gagal membuat user");
      }
    } catch {
      toast.error("Terjadi kesalahan sistem saat menyimpan user");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isVpn = type === "vpn";

  return (
    <div className="space-y-6">
      {/* Breadcrumbs & Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-primary/10">
        <div>
          <div className="text-xs font-mono text-base-content/60 flex items-center gap-1.5 mb-1">
            <Link href="/radius-users" className="hover:text-primary transition-colors">
              Pengguna
            </Link>
            <span>/</span>
            <Link
              href={`/radius-users/type/${type}`}
              className="hover:text-primary transition-colors capitalize"
            >
              User {type}
            </Link>
            <span>/</span>
            <span className="text-primary font-semibold">Tambah User</span>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`h-10 w-10 rounded-xl flex items-center justify-center text-white shadow-lg ${
                isVpn
                  ? "bg-linear-to-br from-indigo-500 to-blue-600 shadow-indigo-500/20"
                  : "bg-linear-to-br from-sky-400 to-blue-600 shadow-sky-500/20"
              }`}
            >
              {isVpn ? <FaShieldAlt className="h-5 w-5" /> : <FaWifi className="h-5 w-5" />}
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-base-content">
                Tambah User {isVpn ? "VPN (Remote Access)" : "Hotspot (Captive Portal)"}
              </h1>
              <p className="text-xs text-base-content/60">
                {isVpn
                  ? "Penyediaan akun terisolasi untuk akses jarak jauh SIMRS RSUD NTB via L2TP/IPSec & WireGuard"
                  : "Registrasi kredensial autentikasi jaringan Wi-Fi Hotspot internal & tamu RSUD NTB"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/radius-users/type/${type}`}
            className="btn btn-sm btn-ghost border border-base-300 gap-2 hover:border-primary/40 text-base-content"
          >
            <FaArrowLeft className="h-3.5 w-3.5" />
            <span>Kembali ke Daftar</span>
          </Link>
        </div>
      </div>

      {/* Main Grid: Form (2 Cols) + Sidebar Info (1 Col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Form Container (Cols 1-2) */}
        <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2 space-y-6">
          {/* Card 1: Informasi Kredensial & Autentikasi */}
          <div className="card p-6 space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-primary/10">
              <span className="p-2 rounded-lg bg-primary/10 text-primary">
                <FaKey className="h-4 w-4" />
              </span>
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-base-content">
                  1. Kredensial &amp; Autentikasi RADIUS
                </h2>
                <p className="text-[11px] text-base-content/60">
                  Kredensial login yang akan diverifikasi oleh server FreeRADIUS
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Username Field */}
              <div className="form-control">
                <label className="label text-xs font-semibold text-base-content/80 pb-1.5">
                  <span className="flex items-center gap-1.5">
                    <FaUser className="h-3 w-3 text-primary" /> Username
                  </span>
                  <span className="text-rose-400 text-xs">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register("username")}
                    type="text"
                    placeholder={isVpn ? "Contoh: vpn.dokter1, sirs_admin" : "Contoh: pasien102, staff_igd"}
                    className={`input input-sm w-full font-mono bg-base-100 border border-base-300 focus:border-primary ${
                      errors.username ? "border-rose-500 focus:border-rose-500" : ""
                    }`}
                  />
                </div>
                {errors.username ? (
                  <span className="text-[11px] text-rose-400 mt-1 font-mono">{errors.username.message}</span>
                ) : (
                  <span className="text-[10px] text-base-content/50 mt-1">Minimal 3 karakter tanpa spasi</span>
                )}
              </div>

              {/* Password Field */}
              <div className="form-control">
                <div className="flex items-center justify-between pb-1.5">
                  <label className="label text-xs font-semibold text-base-content/80 p-0">
                    <span className="flex items-center gap-1.5">
                      <FaLock className="h-3 w-3 text-primary" /> Password
                    </span>
                    <span className="text-rose-400 text-xs ml-1">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={generateRandomPassword}
                    className="text-[10px] text-primary hover:underline flex items-center gap-1 font-mono transition-colors cursor-pointer"
                    title="Buat password acak yang aman"
                  >
                    <FaRandom className="h-2.5 w-2.5" /> Acak Password
                  </button>
                </div>

                <div className="relative">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimal 4 karakter"
                    className={`input input-sm w-full font-mono bg-base-100 border border-base-300 focus:border-primary pl-3 pr-9 ${
                      errors.password ? "border-rose-500 focus:border-rose-500" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors cursor-pointer"
                    title={showPassword ? "Sembunyikan password" : "Lihat password"}
                  >
                    {showPassword ? <FaEyeSlash className="h-3.5 w-3.5" /> : <FaEye className="h-3.5 w-3.5" />}
                  </button>
                </div>

                {errors.password ? (
                  <span className="text-[11px] text-rose-400 mt-1 font-mono">{errors.password.message}</span>
                ) : (
                  currentPassword && (
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex-1 bg-base-300 h-1 rounded-full overflow-hidden flex gap-0.5">
                        <div
                          className={`h-full ${strength.color} transition-all duration-300`}
                          style={{ width: `${(strength.score / 4) * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-base-content/60">{strength.label}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {/* Metode Enkripsi */}
              <div className="form-control">
                <label className="label text-xs font-semibold text-base-content/80 pb-1.5">
                  Metode Enkripsi Password
                </label>
                <select {...register("passwordType")} className="select select-sm w-full font-mono bg-base-100 border border-base-300 focus:border-primary">
                  <option value="cleartext">Cleartext-Password (Standar RADIUS)</option>
                  <option value="md5">MD5-Password</option>
                  <option value="sha1">SHA1-Password</option>
                </select>
                <span className="text-[10px] text-base-content/50 mt-1">
                  Direkomendasikan Cleartext untuk kompatibilitas MS-CHAPv2 &amp; MikroTik
                </span>
              </div>

              {/* RADIUS Group */}
              <div className="form-control">
                <label className="label text-xs font-semibold text-base-content/80 pb-1.5">
                  <span className="flex items-center gap-1.5">
                    <FaLayerGroup className="h-3 w-3 text-primary" /> Grup Profil Bandwidth
                  </span>
                </label>
                {isLoadingData ? (
                  <div className="h-8 w-full bg-base-300 animate-pulse rounded" />
                ) : (
                  <select {...register("groupname")} className="select select-sm w-full font-mono bg-base-100 border border-base-300 focus:border-primary">
                    {groups.length === 0 ? (
                      <option value="default">default</option>
                    ) : (
                      groups.map((g) => (
                        <option key={g.groupname} value={g.groupname}>
                          {g.groupname}
                        </option>
                      ))
                    )}
                  </select>
                )}
                <span className="text-[10px] text-base-content/50 mt-1">
                  Menentukan limit rate, session timeout, dan policy RADIUS
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Profil Pengguna & Departemen */}
          <div className="card p-6 space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-primary/10">
              <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <FaAddressCard className="h-4 w-4" />
              </span>
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-base-content">
                  2. Profil Pengguna &amp; Unit RSUD NTB
                </h2>
                <p className="text-[11px] text-base-content/60">
                  Informasi kepemilikan akun untuk audit trail dan pelaporan SIMRS
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="form-control">
                <label className="label text-xs font-semibold text-base-content/80 pb-1.5">
                  Nama Lengkap Pemilik Akun
                </label>
                <input
                  {...register("fullName")}
                  type="text"
                  placeholder="Contoh: dr. Ahmad Fauzi, Sp.A / Siti Rahma, S.Kep"
                  className="input input-sm w-full bg-base-100 border border-base-300 focus:border-primary"
                />
                <span className="text-[10px] text-base-content/50 mt-1">
                  Nama personel atau deskripsi perangkat pemakai
                </span>
              </div>

              {/* Department */}
              <div className="form-control">
                <label className="label text-xs font-semibold text-base-content/80 pb-1.5">
                  <span className="flex items-center gap-1.5">
                    <FaBuilding className="h-3 w-3 text-emerald-400" /> Unit / Departemen Medis
                  </span>
                </label>
                <input
                  {...register("department")}
                  type="text"
                  placeholder="Contoh: IGD, Instalasi Farmasi, Radiologi, IT NOC"
                  className="input input-sm w-full bg-base-100 border border-base-300 focus:border-primary"
                />
                <span className="text-[10px] text-base-content/50 mt-1">
                  Lokasi penempatan atau instalasi kerja di RSUD NTB
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Konfigurasi Jaringan & Alokasi IP (Khusus VPN) */}
          {isVpn && (
            <div className="card p-6 space-y-5 border-indigo-500/20">
              <div className="flex items-center gap-2.5 pb-3 border-b border-primary/10">
                <span className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                  <FaServer className="h-4 w-4" />
                </span>
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-base-content">
                    3. Alokasi IP &amp; Jaringan VPN
                  </h2>
                  <p className="text-[11px] text-base-content/60">
                    Konfigurasi Framed-IP-Address atau IP Pool dari router MikroTik
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* IP Pool */}
                <div className="form-control">
                  <label className="label text-xs font-semibold text-base-content/80 pb-1.5">
                    IP Pool MikroTik
                  </label>
                  <select {...register("poolName")} className="select select-sm w-full font-mono bg-base-100 border border-base-300 focus:border-primary">
                    <option value="">-- Dinamis Otomatis (Tanpa Pool) --</option>
                    {pools.map((p) => (
                      <option key={p.name} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  <span className="text-[10px] text-base-content/50 mt-1">
                    Alokasikan IP dinamis dari pool terdaftar pada router
                  </span>
                </div>

                {/* Static IP */}
                <div className="form-control">
                  <label className="label text-xs font-semibold text-base-content/80 pb-1.5">
                    IP Address Statis (Opsional)
                  </label>
                  <input
                    {...register("ipAddress")}
                    type="text"
                    placeholder="Contoh: 10.8.8.100"
                    className={`input input-sm w-full font-mono bg-base-100 border border-base-300 focus:border-primary ${
                      errors.ipAddress ? "border-rose-500 focus:border-rose-500" : ""
                    }`}
                  />
                  {errors.ipAddress ? (
                    <span className="text-[11px] text-rose-400 mt-1 font-mono">{errors.ipAddress.message}</span>
                  ) : (
                    <span className="text-[10px] text-base-content/50 mt-1">
                      Mengisi ini akan menetapkan Framed-IP-Address tetap ke user
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action Footer Bar */}
          <div className="card p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <Link
              href={`/radius-users/type/${type}`}
              className="btn btn-sm btn-ghost order-2 sm:order-1 text-base-content"
            >
              Batalkan
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn btn-sm ${
                isVpn ? "btn-secondary text-white" : "btn-primary text-slate-900"
              } gap-2 min-w-[200px] order-1 sm:order-2 shadow-[0_0_16px_rgba(37,99,235,0.3)]`}
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-xs" />
                  <span>Memproses Akun...</span>
                </>
              ) : (
                <>
                  <FaCheckCircle className="h-3.5 w-3.5" />
                  <span>Simpan &amp; Aktifkan User {isVpn ? "VPN" : "Hotspot"}</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Sidebar Info Card (Col 3) */}
        <div className="space-y-4">
          {/* Service Specs Card */}
          <div className="card p-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-md bg-primary/10 text-primary">
                <FaInfoCircle className="h-3.5 w-3.5" />
              </span>
              <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-base-content">
                Spesifikasi Layanan
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-base-300">
                <span className="text-base-content/60">Tipe Layanan:</span>
                <span className="badge badge-sm font-mono uppercase bg-primary/10 text-primary border border-primary/20">
                  {type}
                </span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-base-300">
                <span className="text-base-content/60">Status Akun Awal:</span>
                <span className="badge badge-sm badge-success font-mono text-white">Aktif</span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-base-300">
                <span className="text-base-content/60">Isolasi Sesi:</span>
                <span className="text-base-content font-mono text-[11px]">
                  {isVpn ? "Service-Type: Framed" : "NAS-Port != Virtual"}
                </span>
              </div>

              <div className="flex justify-between items-center py-1.5">
                <span className="text-base-content/60">Sinkronisasi:</span>
                <span className="text-emerald-500 font-mono text-[11px] flex items-center gap-1">
                  <span className="status-dot" /> Real-time MySQL
                </span>
              </div>
            </div>
          </div>

          {/* Security Guidelines Card */}
          <div className="card p-5 space-y-3 border-emerald-500/10">
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-base-content flex items-center gap-1.5">
              <FaNetworkWired className="text-emerald-500" />
              Panduan NOC RSUD NTB
            </h3>
            <ul className="text-xs text-base-content/70 space-y-2 list-disc pl-4 leading-relaxed">
              <li>
                Username bersifat unik untuk layanan <span className="font-mono text-base-content">{type}</span>.
              </li>
              <li>
                Password minimal 4 karakter. Gunakan tombol{" "}
                <span className="text-primary font-mono">Acak Password</span> untuk menghasilkan sandi kuat acak.
              </li>
              {isVpn ? (
                <li className="text-indigo-500 dark:text-indigo-300">
                  Setelah disimpan, Anda akan langsung diarahkan ke halaman detail dengan panduan manual konfigurasi Windows, macOS, dan Linux.
                </li>
              ) : (
                <li>
                  Pengguna Hotspot dapat langsung login ke portal captive Wi-Fi RSUD NTB setelah akun tersimpan.
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
