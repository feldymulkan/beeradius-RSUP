import UserForm from "@/components/UserForm";

export default function CreateVpnPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary">Tambah User VPN (L2TP/PPTP)</h1>
        <p className="text-gray-500">Buat akun baru untuk akses remote via VPN.</p>
      </div>

      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <UserForm type="vpn" />
        </div>
      </div>
    </div>
  );
}
