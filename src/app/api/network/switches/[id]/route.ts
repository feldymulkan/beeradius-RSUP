import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { probeSwitch } from "@/lib/snmp";

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
    const { name, ip, community, snmpVersion, port, location } = body;

    const updated = await prisma.switchDevice.update({
      where: { id: switchId },
      data: {
        name,
        ip,
        community,
        snmpVersion,
        port: port ? Number(port) : undefined,
        location,
      },
    });

    await logAudit("UPDATE_SWITCH", "switch", ip, { id: switchId, name });

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

    // Trigger probe
    const probeRes = await probeSwitch({
      ip: sw.ip,
      community: sw.community,
      port: sw.port,
      version: sw.snmpVersion === "1" ? "1" : "2c",
    });

    const updated = await prisma.switchDevice.update({
      where: { id: switchId },
      data: {
        brand: probeRes.brand !== "Unknown" ? probeRes.brand : sw.brand,
        model: probeRes.model !== "Unknown" ? probeRes.model : sw.model,
        sysDescr: probeRes.sysDescr || sw.sysDescr,
        status: probeRes.status,
        uptime: probeRes.status === "online" ? probeRes.uptime : sw.uptime,
        vlans: probeRes.vlans.length > 0 ? JSON.stringify(probeRes.vlans) : sw.vlans,
        ports: probeRes.ports.length > 0 ? JSON.stringify(probeRes.ports) : sw.ports,
        lastPolled: new Date(),
      },
    });

    let vlans = [];
    let ports = [];
    try {
      if (updated.vlans) vlans = JSON.parse(updated.vlans);
    } catch {}
    try {
      if (updated.ports) ports = JSON.parse(updated.ports);
    } catch {}

    return NextResponse.json({
      message: probeRes.status === "online" ? "Pemindaian SNMP berhasil" : "Switch tidak merespon SNMP",
      data: {
        ...updated,
        vlans,
        ports,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Gagal melakukan scan ulang switch", error: error.message },
      { status: 500 }
    );
  }
}
