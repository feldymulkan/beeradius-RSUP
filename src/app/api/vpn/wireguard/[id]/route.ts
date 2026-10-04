import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { mikrotikRequest } from "@/lib/mikrotik";
import { logAudit } from '@/lib/audit';

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id: compositeId } = await params;
  
  // compositeId format is "mikrotikId:peerId" (e.g., "1:*1")
  const [mikrotikId, peerId] = compositeId.split(":");

  try {
    const config = await prisma.mikrotikConfig.findUnique({
      where: { id: parseInt(mikrotikId) }
    });

    if (!config) throw new Error("Mikrotik config not found");

    // Delete directly from Mikrotik
    await mikrotikRequest(config as any, `/interface/wireguard/peers/${peerId}`, "DELETE");

    await logAudit('DELETE_WG_PEER', 'wireguard', peerId, { mikrotikId, configName: config.name });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id: compositeId } = await params;
  const [mikrotikId, peerId] = compositeId.split(":");

  try {
    const config = await prisma.mikrotikConfig.findUnique({
      where: { id: parseInt(mikrotikId) }
    });

    if (!config) throw new Error("Mikrotik config not found");

    // Fetch peer details from Mikrotik including private-key and preshared-key
    // ROS 7.12+ supports private-key in .proplist if permission is correct
    const peer = await mikrotikRequest(config as any, `/interface/wireguard/peers/${peerId}?.proplist=.id,interface,public-key,private-key,preshared-key,allowed-address,comment,endpoint-address,endpoint-port,listen-port`) as any;

    return NextResponse.json({
        ...peer,
        id: compositeId,
        mikrotikId: parseInt(mikrotikId),
        name: peer.comment || "Unnamed Peer",
        allowedIps: peer["allowed-address"],
        publicKey: peer["public-key"],
        privateKey: peer["private-key"],
        presharedKey: peer["preshared-key"],
        listenPort: peer["listen-port"],
        interface: peer.interface
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
