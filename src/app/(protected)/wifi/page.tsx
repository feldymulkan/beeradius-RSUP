import WifiManageClient from "@/components/WifiManageClient";

export const dynamic = "force-dynamic";

export default function WifiPage() {
  return (
    <div className="p-4 md:p-8">
      <WifiManageClient />
    </div>
  );
}
