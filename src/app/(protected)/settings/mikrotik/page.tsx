import MikrotikConfigClient from "@/components/MikrotikConfigClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function MikrotikSettingsPage() {
  const session = await getServerSession(authOptions);
  if ((session?.user as any)?.role !== "superadmin") {
    redirect("/");
  }

  return (
    <div className="container mx-auto">
      <MikrotikConfigClient />
    </div>
  );
}
