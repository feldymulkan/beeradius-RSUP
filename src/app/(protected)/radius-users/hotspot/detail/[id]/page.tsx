import Link from "next/link";
import { getRadiusUserDetailsById } from "@/lib/data";
import UserDeleteAction from "@/components/UserDeleteActions";
import PasswordReveal from "@/components/PasswordReveal";

export default async function HotspotUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const userId = parseInt(id);
  const userData = await getRadiusUserDetailsById(userId);

  if (!userData || userData.type !== 'hotspot') {
    return (
      <div className="alert alert-error">Data user hotspot tidak ditemukan.</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Detail User Hotspot</h1>
        <div className="flex gap-2">
          <Link href={`/radius-users/hotspot/edit/${id}`} className="btn btn-sm btn-info">Edit</Link>
          <UserDeleteAction userId={userData.id} username={userData.username} />
          <Link href="/radius-users/type/hotspot" className="btn btn-sm btn-ghost">← Kembali</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body">
            <h3 className="card-title text-primary border-b pb-2">Informasi Umum</h3>
            <div className="space-y-2 mt-4">
              <p><strong>Username:</strong> {userData.username}</p>
              <p><strong>Nama Lengkap:</strong> {userData.fullName}</p>
              <p><strong>Departemen:</strong> {userData.department}</p>
              <p><strong>Grup:</strong> {userData.group}</p>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body">
            <h3 className="card-title text-primary border-b pb-2">Atribut RADIUS</h3>
            <div className="overflow-x-auto mt-4">
              <table className="table table-sm">
                <thead>
                  <tr><th>Atribut</th><th>Value</th></tr>
                </thead>
                <tbody>
                  {userData.checkAttributes.map((attr, i) => (
                    <tr key={i}>
                      <td>{attr.attribute}</td>
                      <td>
                        {attr.attribute.toLowerCase().includes("password") ? (
                          <PasswordReveal value={attr.value} isHashed={attr.attribute !== "Cleartext-Password"} />
                        ) : attr.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
