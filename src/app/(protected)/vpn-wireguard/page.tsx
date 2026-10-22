import WireguardPeerClient from "@/components/WireguardPeerClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function WireguardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto">
      <WireguardPeerClient />
    </div>
  );
}
