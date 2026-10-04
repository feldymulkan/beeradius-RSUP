"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { EditFormSkeleton } from "@/components/Skleton"; 
import toast from "react-hot-toast";

// Tipe data untuk atribut 'reply'
type ReplyAttribute = {
  id?: number;
  attribute: string;
  op: string;
  value: string;
};

// [PERBAIKAN] Tipe data respons dari API GET Anda
type GroupDataResponse = {
  replyAttributes: ReplyAttribute[];
  simultaneousUse: string;
  type: "hotspot" | "vpn";
};

export default function EditGroupPage() {
  const router = useRouter();
  const params = useParams();
  const originalGroupname = decodeURIComponent(params.groupname as string);

  // State untuk form
  const [newGroupname, setNewGroupname] = useState(originalGroupname);
  const [type, setType] = useState<"hotspot" | "vpn">("hotspot");
  const [poolName, setPoolName] = useState("");
  const [pools, setPools] = useState<{name: string}[]>([]);
  
  // State khusus untuk speed
  const [uploadSpeed, setUploadSpeed] = useState("");
  const [downloadSpeed, setDownloadSpeed] = useState("");

  // [PERBAIKAN] State baru untuk batas perangkat
  const [simultaneousUse, setSimultaneousUse] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch pools
  useEffect(() => {
    fetch("/api/radius/pools")
      .then(res => res.json())
      .then(data => setPools(data.pools || []))
      .catch(err => console.error("Gagal mengambil pools:", err));
  }, []);

  // [PERBAIKAN] Fetch data dan ekstrak speed + simultaneousUse
  useEffect(() => {
    if (originalGroupname) {
      const fetchGroupData = async () => {
        setIsFetching(true);
        try {
          const res = await fetch(`/api/radius/groups/${encodeURIComponent(originalGroupname)}`);
          if (!res.ok) throw new Error("Gagal memuat data grup.");
          
          const data: GroupDataResponse = await res.json();
          
          setSimultaneousUse(data.simultaneousUse || "");
          setType(data.type || "hotspot");

          // Ekstrak attributes
          const rateLimitAttr = data.replyAttributes.find(attr => attr.attribute === 'Mikrotik-Rate-Limit');
          if (rateLimitAttr && rateLimitAttr.value.includes('/')) {
            const [up, down] = rateLimitAttr.value.replace(/M/g, '').split('/');
            setUploadSpeed(up || "");
            setDownloadSpeed(down || "");
          }

          const poolAttr = data.replyAttributes.find(attr => attr.attribute === 'Framed-Pool');
          if (poolAttr) {
            setPoolName(poolAttr.value);
          }
        } catch (err: unknown) {
          if (err instanceof Error) setError(err.message);
        } finally {
          setIsFetching(false);
        }
      };
      fetchGroupData();
    }
  }, [originalGroupname]);

  // Handle submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const finalAttributes = [];

    // Atribut Mikrotik-Rate-Limit
    if (uploadSpeed || downloadSpeed) {
      const rateLimitValue = `${uploadSpeed || 0}M/${downloadSpeed || 0}M`;
      finalAttributes.push({ attribute: 'Mikrotik-Rate-Limit', op: ':=', value: rateLimitValue });
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
      finalAttributes.push({ attribute: "Framed-Pool", op: ":=", value: poolName });
    }

    const bodyPayload = {
        newGroupname,
        type,
        attributes: finalAttributes,
        simultaneousUse: simultaneousUse
    };

    try {
      const res = await fetch(`/api/radius/groups/${encodeURIComponent(originalGroupname)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Gagal mengupdate grup.");
      }
      
      toast.success("Grup berhasil diupdate!");
      router.push(`/radius-groups/${type}`);
      router.refresh();
      
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        toast.error(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) return <EditFormSkeleton />;

  return (
    <div className="prose lg:prose-xl">
      <h1>Edit Grup: {originalGroupname}</h1>
      <div className="not-prose">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control w-full">
                  <label className="label"><span className="label-text font-bold">Nama Grup</span></label>
                  <input type="text" value={newGroupname} onChange={(e) => setNewGroupname(e.target.value)} className="input input-bordered w-full" required />
                </div>
                
                <div className="form-control w-full">
                  <label className="label"><span className="label-text font-bold">Tipe Grup</span></label>
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
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Batas Perangkat (Simultaneous-Use)</span>
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

              {/* Input khusus untuk Kecepatan */}
              <div>
                <label className="label"><span className="label-text font-bold">Batas Kecepatan (Mikrotik-Rate-Limit)</span></label>
                <div className="flex items-end gap-4 p-4 border rounded-md">
                    <div className="form-control w-1/2">
                        <label className="label"><span className="label-text">Upload Speed (Mbps)</span></label>
                        <input type="number" value={uploadSpeed} onChange={e => setUploadSpeed(e.target.value)} className="input input-bordered w-full" placeholder="Contoh: 5" />
                    </div>
                    <div className="form-control w-1/2">
                        <label className="label"><span className="label-text">Download Speed (Mbps)</span></label>
                        <input type="number" value={downloadSpeed} onChange={e => setDownloadSpeed(e.target.value)} className="input input-bordered w-full" placeholder="Contoh: 10" />
                    </div>
                </div>
              </div>

              {error && <div className="alert alert-error">{error}</div>}

              <div className="card-actions justify-end pt-4">
                <Link href={`/radius-groups/${type}`} className="btn btn-ghost">Batal</Link>
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? <span className="loading loading-spinner"></span> : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
