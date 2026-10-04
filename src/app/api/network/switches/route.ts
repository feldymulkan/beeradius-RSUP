import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { probeSwitch } from "@/lib/snmp";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";
    const brandFilter = searchParams.get("brand") || "";

    const where: any = {};
    if (q) {
      where.OR = [
        { name: { contains: q } },
        { ip: { contains: q } },
        { brand: { contains: q } },
        { model: { contains: q } },
        { location: { contains: q } },
      ];
    }
    if (brandFilter) {
      where.brand = { contains: brandFilter };
    }

    const switches = await prisma.switchDevice.findMany({
      where,
      orderBy: { updatedAt: "desc" },
    });

    let totalOnline = 0;
    let totalOffline = 0;
    let totalVlans = 0;
    let totalPorts = 0;

    const formatted = switches.map((sw) => {
      let vlans = [];
      let ports = [];
      try {
        if (sw.vlans) vlans = JSON.parse(sw.vlans);
      } catch {}
      try {
        if (sw.ports) ports = JSON.parse(sw.ports);
      } catch {}

      if (sw.status === "online") totalOnline++;
      else totalOffline++;

      totalVlans += vlans.length;
      totalPorts += ports.length;

      return {
        ...sw,
        vlans,
        ports,
      };
    });

    return NextResponse.json({
      data: formatted,
      summary: {
        totalSwitches: switches.length,
        totalOnline,
        totalOffline,
        totalVlans,
        totalPorts,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Gagal mengambil daftar switch", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, ip, community = "public", snmpVersion = "2c", port = 161, location = "Ruang Server RSUD NTB" } = body;

    if (!name || !ip) {
      return NextResponse.json({ message: "Nama dan IP Switch wajib diisi" }, { status: 400 });
    }

    const existing = await prisma.switchDevice.findUnique({
      where: { ip },
    });

    if (existing) {
      return NextResponse.json({ message: "IP Switch sudah terdaftar di sistem" }, { status: 400 });
    }

    // Lakukan SNMP probe awal ke perangkat
    const probeRes = await probeSwitch({
      ip,
      community,
      port: Number(port),
      version: snmpVersion === "1" ? "1" : "2c",
    });

    const newSwitch = await prisma.switchDevice.create({
      data: {
        name,
        ip,
        community,
        snmpVersion,
        port: Number(port),
        location,
        brand: probeRes.brand,
        model: probeRes.model,
        sysDescr: probeRes.sysDescr,
        status: probeRes.status,
        uptime: probeRes.uptime,
        vlans: JSON.stringify(probeRes.vlans),
        ports: JSON.stringify(probeRes.ports),
        lastPolled: new Date(),
      },
    });

    await logAudit("CREATE_SWITCH", "switch", ip, { id: newSwitch.id, name, brand: probeRes.brand });

    return NextResponse.json(
      {
        message: "Switch berhasil ditambahkan",
        data: {
          ...newSwitch,
          vlans: probeRes.vlans,
          ports: probeRes.ports,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Gagal menambahkan switch", error: error.message },
      { status: 500 }
    );
  }
}
