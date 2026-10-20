import prisma from "@/lib/prisma";
import NasClientWrapper from "@/components/NasClientWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function NasPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const resolvedSearchParams = await searchParams;
  const q = (resolvedSearchParams?.q as string) || "";
  const page = Number(resolvedSearchParams?.page) || 1;
  const pageSize = Number(resolvedSearchParams?.pageSize) || 10;

  const where = {
    OR: [
      { nasname: { contains: q } },
      { shortname: { contains: q } },
      { description: { contains: q } }
    ]
  };

  const [nasList, totalCount] = await Promise.all([
    prisma.nas.findMany({
      where,
      orderBy: { nasname: 'asc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.nas.count({ where })
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-base-content flex items-center gap-2">
            Perangkat <span className="text-primary">RADIUS</span>
          </h1>
          <p className="text-xs text-base-content/70 mt-1">
            Kelola router gateway, access point, dan klien autentikasi FreeRADIUS RSUD NTB.
          </p>
        </div>
      </div>

      <NasClientWrapper 
        nasList={nasList} 
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
      />
    </div>
  );
}
