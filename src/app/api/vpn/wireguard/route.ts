import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { mikrotikRequest, getWireguardPeers } from "@/lib/mikrotik";
import { logAudit } from '@/lib/audit';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const configs = await prisma.mikrotikConfig.findMany();
    
    const allPeers: any[] = [];
    
    for (const config of configs) {
      try {
        const peers = await getWireguardPeers(config as any);
        if (Array.isArray(peers)) {
            const mappedPeers = peers.map((p: any) => ({
              ...p,
              id: `${config.id}:${p[".id"]}`,
              mikrotikId: config.id,
              mikrotikName: config.name,
              name: p.comment || p.name || "Unnamed Peer",
              allowedIps: p["allowed-address"] || p["allowed-ips"],
              interface: p.interface,
              publicKey: p["public-key"],
            }));
            allPeers.push(...mappedPeers);
        }
      } catch (err: any) {
        console.error(`Failed to fetch peers from Mikrotik ${config.name}:`, err.message);
      }
    }

    return NextResponse.json(allPeers);
  } catch (error: any) {
    let userMessage = error.message;
    if (error.message.includes("no such command") || error.message.includes("404")) {
        userMessage = "Salah satu router MikroTik tidak mendukung fitur WireGuard (membutuhkan RouterOS v7.1+).";
    }
    return NextResponse.json({ message: userMessage }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { mikrotikId, name, allowedIps, interfaceName, comment } = body;

    const mkConfig = await prisma.mikrotikConfig.findUnique({
      where: { id: parseInt(mikrotikId) }
    });

    if (!mkConfig) throw new Error("Mikrotik config not found");

    console.log(`[WireGuard] Creating peer on ${mkConfig.name} (${mkConfig.host})`);
    console.log(`[WireGuard] Payload:`, { interfaceName, allowedIps, name });

    // Standard POST to create a peer
    // Mikrotik REST API for WG Peer uses 'allowed-address' (not allowed-ips)
    const mkPeer = await mikrotikRequest(mkConfig as any, "/interface/wireguard/peers", "POST", {
      interface: interfaceName || "wireguard1",
      "allowed-address": allowedIps,
      comment: name || comment || `Created by BeeRadius`,
      "private-key": "auto"
    }) as any;

    await logAudit('CREATE_WG_PEER', 'wireguard', name || comment || 'Unnamed Peer', { mikrotikId, interfaceName, allowedIps });
    return NextResponse.json(mkPeer);
  } catch (error: any) {
    console.error("Failed to create Wireguard peer:", error.message);
    let userMessage = error.message;
    if (error.message.includes("no such command") || error.message.includes("404")) {
      userMessage = `Mikrotik ${error.message.includes("no such command") ? "tidak mendukung perintah WireGuard" : "mengembalikan error 404"}. Pastikan RouterOS sudah versi 7.1 ke atas dan fitur WireGuard tersedia.`;
    }
    return NextResponse.json({ message: userMessage }, { status: 500 });
  }
}
