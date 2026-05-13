import UserForm from "@/components/UserForm";

export default function CreateHotspotPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary">Tambah User Hotspot</h1>
        <p className="text-gray-500">Buat akun baru untuk akses internet via Hotspot.</p>
      </div>

      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <UserForm type="hotspot" />
        </div>
      </div>
    </div>
  );
}
