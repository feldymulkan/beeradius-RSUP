import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getRuijieWifiList } from "@/lib/ruijie";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const q = (searchParams.get("q") || "").toLowerCase().trim();
    const parentGroup = searchParams.get("parentGroup") || "";
    const subGroup = searchParams.get("subGroup") || "";
    const groupId = searchParams.get("groupId");
    const forceRefresh = searchParams.get("refresh") === "true";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

    const { wifiList, hierarchy } = await getRuijieWifiList(forceRefresh);

    let filtered = wifiList;

    // Filter Group Utama (Parent Group)
    if (parentGroup && parentGroup !== "ALL") {
      filtered = filtered.filter((item) => item.parentGroupName === parentGroup);
    }

    // Filter Sub Group
    if (subGroup && subGroup !== "ALL") {
      filtered = filtered.filter(
        (item) => item.isSubGroup && item.groupName.toLowerCase() === subGroup.toLowerCase()
      );
    }

    // Filter Specific Group ID
    if (groupId) {
      const gId = parseInt(groupId, 10);
      filtered = filtered.filter((item) => item.groupId === gId);
    }

    // Filter Pencarian Keyword (q)
    if (q) {
      filtered = filtered.filter((item) => {
        const matchSsid = item.ssidName?.toLowerCase().includes(q);
        const matchSubGroup = item.groupName?.toLowerCase().includes(q);
        const matchParent = item.parentGroupName?.toLowerCase().includes(q);
        const matchPath = item.path?.toLowerCase().includes(q);
        const matchVlan = String(item.vlanId || "").includes(q);
        const matchSecurity = (item.encryptionModeDesc || item.encryptionMode || "")
          .toLowerCase()
          .includes(q);
        return matchSsid || matchSubGroup || matchParent || matchPath || matchVlan || matchSecurity;
      });
    }

    const groupStats: Record<string, number> = {};
    for (const item of wifiList) {
      if (item.parentGroupName) {
        groupStats[item.parentGroupName] = (groupStats[item.parentGroupName] || 0) + 1;
      }
    }

    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / pageSize) || 1;
    const startIndex = (page - 1) * pageSize;
    const paginatedData = filtered.slice(startIndex, startIndex + pageSize);

    return NextResponse.json({
      data: paginatedData,
      hierarchy,
      groupStats,
      totalAll: wifiList.length,
      pagination: {
        page,
        pageSize,
        totalItems,
        totalPages,
      },
      source: "ruijie_cloud",
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Gagal mengambil data WiFi dari Ruijie Cloud", error: error.message },
      { status: 500 }
    );
  }
}
