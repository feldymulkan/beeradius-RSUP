import TelegramConfigClient from "@/components/TelegramConfigClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Notifikasi Telegram - BeeRadius RSUD NTB",
  description: "Pengaturan bot Telegram untuk peringatan perangkat jaringan dan pemantauan pengguna VPN",
};

export default async function TelegramSettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  // Superadmin dan Admin memiliki hak akses mengelola notifikasi sistem
  const role = (session?.user as any)?.role;
  if (role !== "superadmin" && role !== "admin") {
    redirect("/");
  }

  return (
    <div className="container mx-auto py-2">
      <TelegramConfigClient />
    </div>
  );
}
