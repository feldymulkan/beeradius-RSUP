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
  if ((session?.user as any)?.role !== "superadmin") {
    redirect("/");
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
    <div className="prose lg:prose-xl mb-6 max-w-none">
      <div className="flex justify-between items-center">
        <h1>Manajemen Perangkat (NAS)</h1>
      </div>

      <div className="not-prose mt-6">
        <NasClientWrapper 
          nasList={nasList} 
          page={page}
          pageSize={pageSize}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
