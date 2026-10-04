import prisma from "@/lib/prisma";
import Link from "next/link";
import PoolDetailClient from "@/components/PoolDetailClient";

export default async function PoolDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const pool = await prisma.radiusPool.findUnique({
    where: { name: name }
  });

  if (!pool) {
    return <div>Pool tidak ditemukan</div>;
  }

  const ips = await prisma.radippool.findMany({
    where: { pool_name: name },
    orderBy: { framedipaddress: 'asc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/radius-pools" className="btn btn-ghost btn-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Kembali
        </Link>
        <h1 className="text-2xl font-bold uppercase">Kelola IP Pool: {name}</h1>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
           <PoolDetailClient poolName={name} initialIps={ips.map(ip => ({
             id: ip.id,
             framedipaddress: ip.framedipaddress,
             username: ip.username,
             expiry_time: ip.expiry_time?.toISOString() || null
           }))} />
        </div>
      </div>
    </div>
  );
}
