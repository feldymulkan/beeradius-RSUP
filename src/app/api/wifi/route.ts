import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { logAudit } from '@/lib/audit';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

    const where: any = {};
    if (q) {
      where.ssid = {
        contains: q,
      };
    }

    const totalItems = await prisma.wifi.count({ where });
    const totalPages = Math.ceil(totalItems / pageSize);

    const wifiList = await prisma.wifi.findMany({
      where,
      orderBy: { ssid: "asc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return NextResponse.json({
      data: wifiList,
      pagination: {
        page,
        pageSize,
        totalItems,
        totalPages,
      }
    });
  } catch (error: any) {
    return NextResponse.json({ message: "Gagal mengambil daftar wifi", error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "superadmin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { ssid, password } = await req.json();

    if (!ssid || !password) {
      return NextResponse.json({ message: "SSID dan Password harus diisi" }, { status: 400 });
    }

    const existingWifi = await prisma.wifi.findUnique({
      where: { ssid },
    });

    if (existingWifi) {
      return NextResponse.json({ message: "SSID sudah terdaftar" }, { status: 400 });
    }

    const newWifi = await prisma.wifi.create({
      data: {
        ssid,
        password,
      },
    });

    await logAudit('CREATE_WIFI', 'wifi', ssid, { id: newWifi.id });
    return NextResponse.json({ message: "Wifi berhasil ditambahkan", id: newWifi.id }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: "Gagal menambahkan wifi", error: error.message }, { status: 500 });
  }
}
