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
    <div className="prose lg:prose-xl mb-6 max-w-none">
      <div className="flex justify-between items-center">
        <h1>Manajemen IP Pool</h1>
      </div>

      <div className="not-prose mt-6">
        <PoolClientWrapper 
          pools={pools} 
          page={page}
          pageSize={pageSize}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
