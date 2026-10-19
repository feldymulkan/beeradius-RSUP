import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getRuijieWifiReport } from "@/lib/ruijie";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const forceRefresh = searchParams.get("refresh") === "true";
    const project = searchParams.get("project") || "ALL";
    const q = (searchParams.get("q") || "").toLowerCase().trim();
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

    const reportData = await getRuijieWifiReport(forceRefresh);

    let filteredClients = reportData.clients;

    // Filter project/gedung
    if (project && project !== "ALL") {
      filteredClients = filteredClients.filter((c) => c.parentGroupName === project);
    }

    // Filter search keyword
    if (q) {
      filteredClients = filteredClients.filter((c) => {
        const matchMac = c.mac.toLowerCase().includes(q);
        const matchIp = c.ip.toLowerCase().includes(q);
        const matchUser = c.userName.toLowerCase().includes(q);
        const matchDevice = c.deviceName.toLowerCase().includes(q);
        const matchSsid = c.ssid.toLowerCase().includes(q);
        const matchGroup = c.groupName.toLowerCase().includes(q);
        const matchParent = c.parentGroupName.toLowerCase().includes(q);
        const matchModel = c.staModel.toLowerCase().includes(q);
        const matchOs = c.staOs.toLowerCase().includes(q);
        return (
          matchMac ||
          matchIp ||
          matchUser ||
          matchDevice ||
          matchSsid ||
          matchGroup ||
          matchParent ||
          matchModel ||
          matchOs
        );
      });
    }

    const totalItems = filteredClients.length;
    const totalPages = Math.ceil(totalItems / pageSize) || 1;
    const startIndex = (page - 1) * pageSize;
    const paginatedClients = filteredClients.slice(startIndex, startIndex + pageSize);

    return NextResponse.json({
      summary: reportData.summary,
      projectStats: reportData.projectStats,
      topSsids: reportData.topSsids,
      topAps: reportData.topAps,
      topClients: reportData.topClients,
      clients: paginatedClients,
      pagination: {
        page,
        pageSize,
        totalItems,
        totalPages,
      },
      timestamp: reportData.timestamp,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Gagal mengambil data laporan Wi-Fi Ruijie Cloud", error: error.message },
      { status: 500 }
    );
  }
}
