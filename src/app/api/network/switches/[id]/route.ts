import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { pollSingleDevice } from "@/lib/devicePolling";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const switchId = parseInt(id, 10);
    const sw = await prisma.switchDevice.findUnique({
      where: { id: switchId },
    });

    if (!sw) {
      return NextResponse.json({ message: "Switch tidak ditemukan" }, { status: 404 });
    }

    let vlans = [];
    let ports = [];
    try {
      if (sw.vlans) vlans = JSON.parse(sw.vlans);
    } catch {}
    try {
      if (sw.ports) ports = JSON.parse(sw.ports);
    } catch {}

    return NextResponse.json({
      data: {
        ...sw,
        vlans,
        ports,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Gagal mengambil detail switch", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const switchId = parseInt(id, 10);
    const body = await req.json();
    const {
      name,
      ip,
      community,
      snmpVersion,
      port,
      location,
      deviceType,
      connMethod,
      brand,
      model,
    } = body;

    const updated = await prisma.switchDevice.update({
      where: { id: switchId },
      data: {
        name,
        ip,
        community,
        snmpVersion,
        port: port ? Number(port) : undefined,
        location,
        deviceType: deviceType || undefined,
        connMethod: connMethod || undefined,
        brand: brand || undefined,
        model: model || undefined,
      },
    });

    await logAudit("UPDATE_SWITCH", deviceType || "switch", ip, { id: switchId, name });

    return NextResponse.json({
      message: "Switch berhasil diperbarui",
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Gagal memperbarui switch", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const switchId = parseInt(id, 10);
    const existing = await prisma.switchDevice.findUnique({
      where: { id: switchId },
    });

    if (!existing) {
      return NextResponse.json({ message: "Switch tidak ditemukan" }, { status: 404 });
    }

    await prisma.switchDevice.delete({
      where: { id: switchId },
    });

    await logAudit("DELETE_SWITCH", "switch", existing.ip, { id: switchId, name: existing.name });

    return NextResponse.json({ message: "Switch berhasil dihapus" });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Gagal menghapus switch", error: error.message },
      { status: 500 }
    );
  }
}

// POST to trigger live re-poll
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const switchId = parseInt(id, 10);
    const sw = await prisma.switchDevice.findUnique({
      where: { id: switchId },
    });

    if (!sw) {
      return NextResponse.json({ message: "Switch tidak ditemukan" }, { status: 404 });
    }

    // Trigger polling dengan deteksi diferensial Online / SNMP Offline / Ping Offline
    const pollRes = await pollSingleDevice(sw);
    const updated = await prisma.switchDevice.findUnique({
      where: { id: switchId },
    });

    if (!updated) {
      return NextResponse.json({ message: "Switch tidak ditemukan setelah polling" }, { status: 404 });
    }

    let vlans = [];
    let ports = [];
    try {
      if (updated.vlans) vlans = JSON.parse(updated.vlans);
    } catch {}
    try {
      if (updated.ports) ports = JSON.parse(updated.ports);
    } catch {}

    const statusMsg =
      pollRes.newStatus === "online"
        ? "Pemindaian berhasil: Perangkat Online (SNMP & Ping OK)"
        : pollRes.newStatus === "snmp_offline"
        ? "Offline SNMP: Host terhubung (Ping OK), namun agen SNMP tidak merespon"
        : "Offline Ping: Host tidak dapat dijangkau (Ping & SNMP timeout)";

    return NextResponse.json({
      message: statusMsg,
      data: {
        ...updated,
        vlans,
        ports,
        snmpStatus: pollRes.snmpStatus,
        pingStatus: pollRes.pingStatus,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Gagal melakukan scan ulang switch", error: error.message },
      { status: 500 }
    );
  }
}
