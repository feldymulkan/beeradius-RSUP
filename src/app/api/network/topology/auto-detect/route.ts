import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { autoDetectTopology } from "@/lib/topologyAutoDetect";
import { logAudit } from "@/lib/audit";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    let body: any = {};
    try {
      body = await req.json();
    } catch {}

    const { preserveCustomEdges = true, topologyId } = body;

    const result = await autoDetectTopology({
      topologyId: topologyId ? Number(topologyId) : undefined,
      preserveCustomEdges,
    });

    try {
      revalidatePath("/topology");
    } catch {}

    await logAudit(
      "UPDATE_TOPOLOGY",
      "topology",
      `Auto-Detect (${result.summary.totalDevices} Devices, ${result.summary.totalEdges} Links)`,
      {
        totalDevices: result.summary.totalDevices,
        totalEdges: result.summary.totalEdges,
        routers: result.summary.routersCount,
        coreSwitches: result.summary.coreSwitchesCount,
        accessSwitches: result.summary.accessSwitchesCount,
      }
    );

    return NextResponse.json({
      success: true,
      message: `Topologi berhasil dideteksi otomatis (${result.summary.totalDevices} Perangkat, ${result.summary.totalEdges} Jalur Kabel)`,
      data: result,
    });
  } catch (error: any) {
    console.error("Error in auto-detect topology:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Gagal melakukan deteksi otomatis topologi",
      },
      { status: 500 }
    );
  }
}
