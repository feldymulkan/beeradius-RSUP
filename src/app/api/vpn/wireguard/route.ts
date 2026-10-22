import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { mikrotikRequest, getWireguardPeers, generateWireguardKeys } from "@/lib/mikrotik";
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
    const { mikrotikId, name, allowedIps, interfaceName, comment, endpoint } = body;

    if (!mikrotikId || !name || !allowedIps) {
      return NextResponse.json({ message: "Router MikroTik, Nama, dan IP Client wajib diisi." }, { status: 400 });
    }

    const mkConfig = await prisma.mikrotikConfig.findUnique({
      where: { id: parseInt(mikrotikId) }
    });

    if (!mkConfig) throw new Error("Konfigurasi MikroTik tidak ditemukan");

    // Pastikan IP memiliki subnet mask (default /32 untuk host single)
    const formattedAllowedIps = allowedIps.includes('/') ? allowedIps.trim() : `${allowedIps.trim()}/32`;

    // Generate Keypair X25519 WireGuard secara lokal
    const keyPair = generateWireguardKeys();

    console.log(`[WireGuard] Creating peer on ${mkConfig.name} (${mkConfig.host})`);
    console.log(`[WireGuard] Payload:`, { interfaceName, formattedAllowedIps, name, publicKey: keyPair.publicKey });

    // MikroTik REST API menggunakan PUT untuk menambah item baru di /interface/wireguard/peers
    const mkPeer = await mikrotikRequest(mkConfig as any, "/interface/wireguard/peers", "PUT", {
      interface: interfaceName || "wireguard1",
      "allowed-address": formattedAllowedIps,
      comment: name || comment || `Created by BeeRadius`,
      "public-key": keyPair.publicKey,
    }) as any;

    // Simpan privateKey dan metadata peer ke database lokal untuk keperluan QR Code & Config
    try {
      await prisma.wireguardPeer.create({
        data: {
          mikrotikId: mkConfig.id,
          mikrotikPeerId: mkPeer?.[".id"] || null,
          name: name || comment || "Unnamed Peer",
          publicKey: keyPair.publicKey,
          privateKey: keyPair.privateKey,
          allowedIps: formattedAllowedIps,
          interface: interfaceName || "wireguard1",
          endpoint: endpoint || null,
          comment: name || comment || null,
        }
      });
    } catch (dbErr: any) {
      console.warn("[WireGuard] Gagal menyimpan privateKey ke DB lokal:", dbErr.message);
    }

    await logAudit('CREATE_WG_PEER', 'wireguard', name || comment || 'Unnamed Peer', { mikrotikId, interfaceName, allowedIps: formattedAllowedIps });
    return NextResponse.json(mkPeer);
  } catch (error: any) {
    console.error("Failed to create Wireguard peer:", error.message);
    let userMessage = error.message;
    if (error.message.includes("already have peer with such public key")) {
      userMessage = "Public Key ini sudah terdaftar pada router MikroTik.";
    } else if (error.message.includes("missing =interface=")) {
      userMessage = "Interface WireGuard tidak ditemukan di router MikroTik. Pastikan interface wireguard1 sudah aktif.";
    }
    return NextResponse.json({ message: userMessage }, { status: 500 });
  }
}
