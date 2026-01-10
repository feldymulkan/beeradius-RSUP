"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Group = {
  groupname: string;
};

export default function CreateUserPage() {
  const router = useRouter();

  // State Form
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("cleartext");
  const [groupname, setGroupname] = useState("");
  const [fullName, setFullName] = useState("");
  const [department, setDepartment] = useState("");

  // State Data & UI
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State Modal Sukses
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch Group saat load
  useEffect(() => {
    async function fetchGroups() {
      try {
        const res = await fetch("/api/radius/groups");
        const data = await res.json();
        const fetchedGroups: Group[] = data.groups || [];
        setGroups(fetchedGroups);
        
        // Set default group jika ada
        if (fetchedGroups.length > 0) {
          const hasDefaultGroup = fetchedGroups.some((g) => g.groupname === "default");
          setGroupname(hasDefaultGroup ? "default" : fetchedGroups[0].groupname);
        }
      } catch (err) {
        // Menggunakan console.error agar variabel 'err' terpakai (menghindari warning eslint)
        console.error("Gagal load group:", err);
        setError("Gagal memuat daftar grup.");
      }
    }
    fetchGroups();
  }, []);

  // Handle Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const body = { 
      username, 
      password, 
      passwordType, 
      groupname, 
      fullName, 
      department 
    };

    try {
      const res = await fetch("/api/radius/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal membuat user.");
      }

      // SUKSES: Buka Modal
      setIsModalOpen(true);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form agar bersih kembali
  const resetForm = () => {
    setUsername("");
    setPassword("");
    setFullName("");
    setDepartment("");
    setPasswordType("cleartext");
    if (groups.length > 0) {
      const hasDefaultGroup = groups.some((g) => g.groupname === "default");
      setGroupname(hasDefaultGroup ? "default" : groups[0].groupname);
    }
  };

  // Aksi Tombol di Modal
  const handleCloseModalAndRedirect = () => {
    setIsModalOpen(false);
    router.push("/radius-users"); // Redirect ke halaman list
  };

  const handleRecreate = () => {
    resetForm();
    setIsModalOpen(false); // Tutup modal, tetap di halaman ini
  };

  return (
    <>
      <div className="prose lg:prose-xl mb-6">
        <h1>Tambah User Baru</h1>
        <div className="not-prose">
          <div className="card bg-base-100 shadow-xl max-w-2xl">
            <div className="card-body">
              <Link href="/radius-users" className="btn btn-ghost btn-sm self-start mb-4">
                ← Kembali ke Daftar User
              </Link>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Username */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">Username</span>
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="Contoh: user123"
                    required
                  />
                </div>

                {/* Password & Tipe */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="form-control w-full md:w-2/3">
                    <label className="label">
                      <span className="label-text font-semibold">Password</span>
                    </label>
                    <input
                      type="password" // Bisa diganti text jika ingin terlihat
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input input-bordered w-full"
                      placeholder="Masukkan password"
                      required
                    />
                  </div>
                  <div className="form-control w-full md:w-1/3">
                    <label className="label">
                      <span className="label-text font-semibold">Enkripsi</span>
                    </label>
                    <select
                      value={passwordType}
                      onChange={(e) => setPasswordType(e.target.value)}
                      className="select select-bordered w-full"
                    >
                      <option value="cleartext">Cleartext</option>
                      <option value="md5">MD5</option>
                      <option value="sha1">SHA1</option>
                    </select>
                  </div>
                </div>

                {/* Group */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">Group / Paket</span>
                  </label>
                  <select
                    value={groupname}
                    onChange={(e) => setGroupname(e.target.value)}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="" disabled>-- Pilih Group --</option>
                    {groups.map((g) => (
                      <option key={g.groupname} value={g.groupname}>
                        {g.groupname}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="divider">Info Tambahan</div>

                {/* Nama Lengkap */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">Nama Lengkap (Opsional)</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="Nama User"
                  />
                </div>

                {/* Departemen */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">Departemen (Opsional)</span>
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="Contoh: IT, Keuangan"
                  />
                </div>

                {/* Error Alert */}
                {error && (
                  <div className="alert alert-error mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{error}</span>
                  </div>
                )}

                {/* Submit Button */}
                <div className="card-actions justify-end mt-6">
                  <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading && <span className="loading loading-spinner"></span>}
                    Simpan User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL SUKSES --- */}
      {/* Checkbox ini mengontrol status open/close modal secara CSS */}
      <input
        type="checkbox"
        id="success-modal"
        className="modal-toggle"
        checked={isModalOpen}
        readOnly // Kita kontrol via state React, jadi readonly agar tidak complain
      />
      
      <div className="modal modal-bottom sm:modal-middle" role="dialog">
        <div className="modal-box">
          <div className="flex flex-col items-center text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-success shrink-0 h-20 w-20 mb-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="font-bold text-2xl">Berhasil!</h3>
            <p className="py-4 text-lg text-gray-600">
              User <strong>{username}</strong> telah berhasil dibuat.
            </p>
          </div>
          
          <div className="modal-action justify-center gap-4 mt-2">
            <button
              onClick={handleCloseModalAndRedirect}
              className="btn btn-outline"
            >
              Kembali ke Daftar
            </button>
            <button
              onClick={handleRecreate}
              className="btn btn-primary px-8"
            >
              Tambah Lagi
            </button>
          </div>
        </div>
      </div>
    </>
  );
}