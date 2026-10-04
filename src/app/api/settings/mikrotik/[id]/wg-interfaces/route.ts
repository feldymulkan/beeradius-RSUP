import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { mikrotikRequest } from "@/lib/mikrotik";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id: mkId } = await params;

  try {
    const config = await prisma.mikrotikConfig.findUnique({
      where: { id: parseInt(mkId) }
    });

    if (!config) throw new Error("Mikrotik config not found");

    // Fetch interfaces to get listen-port
    const interfaces = await mikrotikRequest(config as any, "/interface/wireguard");

    return NextResponse.json(interfaces);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
