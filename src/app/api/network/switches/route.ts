import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { probeSwitch } from "@/lib/snmp";
import { generateDefaultPorts, DeviceType } from "@/types/topology";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";
    const brandFilter = searchParams.get("brand") || "";
    const typeFilter = searchParams.get("type") || "";

    const where: any = {};
    if (q) {
      where.OR = [
        { name: { contains: q } },
        { ip: { contains: q } },
        { brand: { contains: q } },
        { model: { contains: q } },
        { location: { contains: q } },
        { deviceType: { contains: q } },
      ];
    }
    if (brandFilter && brandFilter !== "all") {
      where.brand = { contains: brandFilter };
    }
    if (typeFilter && typeFilter !== "all") {
      where.deviceType = typeFilter;
    }

    const switches = await prisma.switchDevice.findMany({
      where,
      orderBy: { updatedAt: "desc" },
    });

    let totalOnline = 0;
    let totalOffline = 0;
    let totalVlans = 0;
    let totalPorts = 0;
    let totalSwitches = 0;
    let totalRouters = 0;
    let totalServers = 0;
    let totalNvrs = 0;
    let totalAps = 0;
    let totalFirewalls = 0;

    const formatted = switches.map((sw: any) => {
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

      const dtype = sw.deviceType || "switch";
      if (dtype === "switch") totalSwitches++;
      else if (dtype === "router") totalRouters++;
      else if (dtype === "server") totalServers++;
      else if (dtype === "nvr" || dtype === "cctv") totalNvrs++;
      else if (dtype === "ap") totalAps++;
      else if (dtype === "firewall") totalFirewalls++;

      return {
        ...sw,
        deviceType: sw.deviceType || "switch",
        connMethod: sw.connMethod || "snmp",
        vlans,
        ports,
      };
    });

    return NextResponse.json({
      data: formatted,
      summary: {
        totalDevices: switches.length,
        totalSwitches,
        totalRouters,
        totalServers,
        totalNvrs,
        totalAps,
        totalFirewalls,
        totalOnline,
        totalOffline,
        totalVlans,
        totalPorts,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Gagal mengambil daftar perangkat jaringan", error: error.message },
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
    const {
      name,
      ip,
      deviceType = "switch",
      connMethod = "snmp",
      community = "public",
      snmpVersion = "2c",
      port = 161,
      brand,
      model,
      location = "Ruang Server RSUD NTB",
    } = body;

    if (!name || !ip) {
      return NextResponse.json(
        { message: "Nama dan IP Perangkat wajib diisi" },
        { status: 400 }
      );
    }

    const existing = await prisma.switchDevice.findUnique({
      where: { ip },
    });

    if (existing) {
      return NextResponse.json(
        { message: `IP Address ${ip} sudah terdaftar di sistem` },
        { status: 400 }
      );
    }

    let finalBrand = brand || "Unknown";
    let finalModel = model || "Network Device";
    let finalSysDescr = "";
    let finalStatus: "online" | "offline" = "online";
    let finalUptime = "0m";
    let finalVlans: any[] = [];
    let finalPorts: any[] = [];

    // Jika metode koneksi SNMP, lakukan probe
    if (connMethod === "snmp") {
      try {
        const probeRes = await probeSwitch({
          ip,
          community,
          port: Number(port) || 161,
          version: snmpVersion === "1" ? "1" : "2c",
        });

        finalBrand = brand || probeRes.brand || "Managed Switch";
        finalModel = model || probeRes.model || "SNMP Device";
        finalSysDescr = probeRes.sysDescr || "";
        finalStatus = probeRes.status;
        finalUptime = probeRes.uptime || "0m";
        finalVlans = probeRes.vlans || [];
        finalPorts = probeRes.ports || [];
      } catch {
        finalStatus = "offline";
      }
    }

    // Jika belum ada port (misal probe offline atau metode koneksi ping/manual/api)
    if (finalPorts.length === 0) {
      const defPorts = generateDefaultPorts(deviceType as DeviceType);
      finalPorts = defPorts.map((p, idx) => ({
        index: idx + 1,
        name: p.name,
        status: "up",
        speed: p.speed || "1G",
      }));
    }

    if (!brand) {
      if (deviceType === "router") finalBrand = "MikroTik RouterOS";
      else if (deviceType === "nvr") finalBrand = "Hikvision / Dahua NVR";
      else if (deviceType === "server") finalBrand = "Dell / HP Enterprise";
      else if (deviceType === "ap") finalBrand = "Ruijie / Ubiquiti AP";
      else if (deviceType === "firewall") finalBrand = "Fortinet / Sophos";
    }

    if (!model) {
      if (deviceType === "router") finalModel = "Core Gateway Router";
      else if (deviceType === "nvr") finalModel = "Network Video Recorder";
      else if (deviceType === "server") finalModel = "Rackmount Server";
      else if (deviceType === "ap") finalModel = "Dual-Band Wi-Fi 6 AP";
      else if (deviceType === "firewall") finalModel = "Hardware Firewall NGFW";
    }

    const newDevice = await prisma.switchDevice.create({
      data: {
        name,
        ip,
        community,
        snmpVersion,
        port: Number(port) || 161,
        location,
        brand: finalBrand,
        model: finalModel,
        sysDescr: finalSysDescr,
        status: finalStatus,
        uptime: finalUptime,
        vlans: JSON.stringify(finalVlans),
        ports: JSON.stringify(finalPorts),
        deviceType,
        connMethod,
        lastPolled: new Date(),
      },
    });

    await logAudit("CREATE_SWITCH", deviceType, ip, {
      id: newDevice.id,
      name,
      deviceType,
      connMethod,
      brand: finalBrand,
    });

    return NextResponse.json(
      {
        message: `Perangkat ${name} (${deviceType.toUpperCase()}) berhasil ditambahkan`,
        data: {
          ...newDevice,
          vlans: finalVlans,
          ports: finalPorts,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating network device:", error);
    return NextResponse.json(
      { message: "Gagal menambahkan perangkat", error: error.message },
      { status: 500 }
    );
  }
}
