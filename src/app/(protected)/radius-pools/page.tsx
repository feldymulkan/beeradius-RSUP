import prisma from "@/lib/prisma";
import PoolClientWrapper from "@/components/PoolClientWrapper";

export default async function RadiusPoolsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const q = (resolvedSearchParams?.q as string) || "";
  const page = Number(resolvedSearchParams?.page) || 1;
  const pageSize = Number(resolvedSearchParams?.pageSize) || 10;

  const where = {
    OR: [
      { name: { contains: q } },
      { description: { contains: q } }
    ]
  };

  const [pools, totalCount] = await Promise.all([
    prisma.radiusPool.findMany({
      where,
      orderBy: { name: 'asc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.radiusPool.count({ where })
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-base-content flex items-center gap-2">
            Manajemen <span className="text-primary">IP Pool</span>
          </h1>
          <p className="text-xs text-base-content/70 mt-1">
            Konfigurasi alokasi subnet IP Pool untuk koneksi VPN dan Hotspot RSUD NTB.
          </p>
        </div>
      </div>

      <PoolClientWrapper 
        pools={pools} 
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
      />
    </div>
  );
}
