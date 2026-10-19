import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { syncRuijieCloudDevicesToDb } from "@/lib/ruijie";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await syncRuijieCloudDevicesToDb();

    revalidatePath("/devices");
    revalidatePath("/switches");
    revalidatePath("/topology");

    return NextResponse.json({
      success: true,
      message: `Berhasil menyinkronkan ${result.totalSynced} perangkat Ruijie Cloud (${result.created} baru, ${result.updated} diperbarui)`,
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Gagal menyinkronkan perangkat dari Ruijie Cloud", error: error.message },
      { status: 500 }
    );
  }
}
