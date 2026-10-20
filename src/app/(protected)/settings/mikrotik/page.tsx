import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FaBan, FaServer, FaArrowLeft, FaNetworkWired } from "react-icons/fa";

export default async function MikrotikSettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      <div className="card bg-base-100/90 border border-base-300 shadow-xl overflow-hidden backdrop-blur-xl">
        <div className="h-2 bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500" />
        <div className="card-body p-8 text-center items-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center text-3xl mb-4 shadow-inner">
            <FaBan />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <FaServer className="h-3 w-3" />
            Fitur Dinonaktifkan Sementara
          </div>

          <h1 className="text-2xl font-bold text-base-content">
            Koneksi MikroTik via REST API Nonaktif
          </h1>

          <p className="text-sm text-base-content/70 max-w-lg mt-2 leading-relaxed">
            Halaman konfigurasi dan integrasi koneksi MikroTik via REST API saat ini telah 
            dinonaktifkan oleh Administrator. Seluruh pemantauan router, switch, dan access point 
            saat ini dipantau secara terpusat melalui telemetri <strong>SNMP</strong> &amp; <strong>Ruijie Cloud</strong>.
          </p>

          <div className="divider my-6" />

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/devices"
              className="btn btn-primary btn-sm gap-2 shadow-md cursor-pointer"
            >
              <FaNetworkWired />
              Buka Perangkat Jaringan
            </Link>
            <Link
              href="/"
              className="btn btn-ghost border border-base-300 btn-sm gap-2 cursor-pointer"
            >
              <FaArrowLeft />
              Kembali ke Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
