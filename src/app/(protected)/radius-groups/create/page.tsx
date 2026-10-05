"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateGroupPage() {
  const router = useRouter();

  // State untuk form input
  const [groupname, setGroupname] = useState("");
  const [type, setType] = useState<"hotspot" | "vpn">("hotspot");
  const [poolName, setPoolName] = useState("");
  const [pools, setPools] = useState<{name: string}[]>([]);
  const [uploadSpeed, setUploadSpeed] = useState("");
  const [downloadSpeed, setDownloadSpeed] = useState("");
  const [simultaneousUse, setSimultaneousUse] = useState(""); // Batas perangkat

  // State untuk status & error
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/radius/pools")
      .then(res => res.json())
      .then(data => setPools(data.pools || []))
      .catch(err => console.error("Gagal mengambil pools:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!groupname.trim()) {
      setError("Nama grup harus diisi.");
      return;
    }

    setIsLoading(true);
    setError(null);

    // Atribut Dasar
    const finalAttributes = [];

    // Atribut Mikrotik-Rate-Limit
    if (uploadSpeed || downloadSpeed) {
      const rateLimitValue = `${uploadSpeed || 0}M/${downloadSpeed || 0}M`;
      finalAttributes.push({
        attribute: "Mikrotik-Rate-Limit",
        op: ":=",
        value: rateLimitValue,
      });
    }

    // Atribut Spesifik VPN
    if (type === "vpn") {
      finalAttributes.push(
        { attribute: "Service-Type", op: ":=", value: "Framed-User" },
        { attribute: "Framed-Protocol", op: ":=", value: "PPP" },
        { attribute: "MS-MPPE-Encryption-Policy", op: ":=", value: "1" },
        { attribute: "MS-MPPE-Encryption-Types", op: ":=", value: "6" }
      );
    }

    // Atribut IP Pool
    if (poolName) {
      finalAttributes.push({
        attribute: "Framed-Pool",
        op: ":=",
        value: poolName,
      });
    }

    try {
      // Payload untuk dikirim ke API
      const bodyPayload = {
        groupname,
        type,
        attributes: finalAttributes,
        simultaneousUse,
      };

      const res = await fetch("/api/radius/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyPayload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Gagal membuat grup.");
      }

      router.push(`/radius-groups/${type}`);
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-base-content flex items-center gap-2">
            Tambah Grup <span className="text-primary">RADIUS</span>
          </h1>
          <p className="text-xs text-base-content/70 mt-1">
            Buat profil grup baru dengan batasan bandwidth rate-limit dan alokasi IP pool.
          </p>
        </div>
        <Link href={`/radius-groups/${type}`} className="btn btn-ghost btn-sm border border-base-300">
          ← Kembali ke Daftar
        </Link>
      </div>

      <div className="card bg-base-100 shadow-xl border border-primary/10">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nama Grup */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Nama Grup</span>
                  </label>
                  <input
                    type="text"
                    value={groupname}
                    onChange={(e) => setGroupname(e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="Contoh: Paket 10Mbps"
                    required
                  />
                </div>

                {/* Tipe Grup */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Tipe Grup</span>
                  </label>
                  <select 
                    value={type} 
                    onChange={e => setType(e.target.value as any)}
                    className="select select-bordered w-full"
                  >
                    <option value="hotspot">Hotspot</option>
                    <option value="vpn">VPN (PPP)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Batas Perangkat */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">
                      Batas Perangkat (Simultaneous-Use)
                    </span>
                  </label>
                  <input
                    type="number"
                    value={simultaneousUse}
                    onChange={(e) => setSimultaneousUse(e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="Contoh: 2 (Kosongkan jika tidak ada batas)"
                    min="0"
                  />
                </div>

                {/* IP Pool */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">IP Pool (Opsional)</span>
                  </label>
                  <select 
                    value={poolName} 
                    onChange={e => setPoolName(e.target.value)}
                    className="select select-bordered w-full"
                  >
                    <option value="">-- Pilih IP Pool --</option>
                    {pools.map(pool => (
                      <option key={pool.name} value={pool.name}>{pool.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Batas Kecepatan */}
              <div>
                <label className="label">
                  <span className="label-text font-bold">
                    Batas Kecepatan (dalam Mbps)
                  </span>
                </label>

                <div className="flex items-end gap-4 p-4 border rounded-md">
                  <div className="form-control w-1/2">
                    <label className="label">
                      <span className="label-text">Kecepatan Upload</span>
                    </label>
                    <input
                      type="number"
                      value={uploadSpeed}
                      onChange={(e) => setUploadSpeed(e.target.value)}
                      className="input input-bordered w-full"
                      placeholder="Contoh: 5"
                    />
                  </div>

                  <div className="form-control w-1/2">
                    <label className="label">
                      <span className="label-text">Kecepatan Download</span>
                    </label>
                    <input
                      type="number"
                      value={downloadSpeed}
                      onChange={(e) => setDownloadSpeed(e.target.value)}
                      className="input input-bordered w-full"
                      placeholder="Contoh: 10"
                    />
                  </div>
                </div>
              </div>

              {/* Error */}
              {error && <div className="alert alert-error">{error}</div>}

              {/* Tombol Simpan */}
              <div className="card-actions justify-end pt-4">
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Simpan Grup"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
    </div>
  );
}
