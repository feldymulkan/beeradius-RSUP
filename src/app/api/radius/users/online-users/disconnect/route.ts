import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { exec } from "child_process";
import util from "util";

const execAsync = util.promisify(exec);

// Fungsi sanitize hanya untuk input dasar (Username/IP)
// Jangan gunakan ini untuk Secret NAS karena bisa merusak password yang ada simbolnya
function sanitize(input: string): string {
  return input.replace(/[^a-zA-Z0-9_.-@]/g, '');
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username } = body;

    // 1. Validasi Input
    if (!username) {
      return NextResponse.json({ message: "Username diperlukan." }, { status: 400 });
    }

    const cleanUsername = sanitize(username);

    // 2. Cari Sesi Aktif di radacct
    // Kita ambil: nasipaddress, acctsessionid, DAN framedipaddress
    const session = await prisma.radacct.findFirst({
      where: {
        username: cleanUsername,
        acctstoptime: null, // Hanya cari yang masih online
      },
      orderBy: {
        acctstarttime: 'desc', // Ambil sesi paling baru
      },
      select: {
        nasipaddress: true,
        acctsessionid: true,
        framedipaddress: true, // <--- PENTING: IP User
      },
    });

    if (!session) {
      return NextResponse.json(
        { message: `User ${cleanUsername} tidak sedang online / tidak ditemukan di radacct.` },
        { status: 404 }
      );
    }

    // 3. Cari Secret NAS berdasarkan IP Router
    const nas = await prisma.nas.findFirst({
      where: {
        nasname: session.nasipaddress,
      },
      select: {
        secret: true,
      },
    });

    if (!nas || !nas.secret) {
      return NextResponse.json(
        { message: `Router (NAS) ${session.nasipaddress} tidak ditemukan atau secret kosong.` },
        { status: 404 }
      );
    }

    // 4. Susun Payload Packet of Disconnect (PoD)
    // MikroTik sering menolak (NAK) jika kita tidak mengirim Framed-IP-Address
    const payloadParts = [];
    
    // a. Username (Wajib)
    payloadParts.push(`User-Name="${cleanUsername}"`);

    // b. Framed-IP-Address (Sangat Disarankan untuk MikroTik)
    if (session.framedipaddress && session.framedipaddress.length > 5) {
        payloadParts.push(`Framed-IP-Address=${session.framedipaddress}`);
    }

    // c. Acct-Session-Id (Pencegahan salah kick user lain)
    if (session.acctsessionid) {
        payloadParts.push(`Acct-Session-Id="${session.acctsessionid}"`);
    }

    // Gabungkan dengan koma
    const finalPayload = payloadParts.join(",");

    // 5. Persiapkan Command
    // Escape single quote pada secret untuk keamanan command shell
    const safeSecret = nas.secret.replace(/'/g, "'\\''");
    
    // Command: echo 'User-Name=...,Framed-IP=...' | radclient -r 2 -t 2 -x IP:3799 disconnect 'secret'
    const command = `echo '${finalPayload}' | radclient -r 2 -t 2 -x ${session.nasipaddress}:3799 disconnect '${safeSecret}'`;

    console.log(`[Disconnect] Executing: ${command}`);

    // 6. Jalankan Perintah
    const { stdout, stderr } = await execAsync(command);

    console.log("[Disconnect Output]:", stdout);

    // 7. Cek Hasil Output
    // Sukses biasanya berisi "Disconnect-ACK"
    if (stdout.includes("Disconnect-ACK")) {
      return NextResponse.json(
        { message: "Sukses! User berhasil diputus (Disconnect-ACK).", details: stdout },
        { status: 200 }
      );
    } 
    // Gagal/Ditolak Router biasanya "Disconnect-NAK"
    else if (stdout.includes("Disconnect-NAK")) {
      return NextResponse.json(
        { message: "Gagal. Router menolak perintah (Disconnect-NAK). Pastikan Incoming Radius aktif di Mikrotik.", details: stdout },
        { status: 500 }
      );
    }
    // Timeout
    else if (stderr.includes("no reply") || stdout.includes("no reply")) {
       return NextResponse.json(
        { message: "Timeout. Router tidak merespon. Cek Firewall/Port 3799 UDP.", details: stderr || stdout },
        { status: 504 }
      );
    }

    // Fallback response
    return NextResponse.json(
      { message: "Perintah terkirim, tapi respon tidak dikenal.", details: stdout },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("[API Disconnect Error]:", error);
    
    // Cek error spesifik (misal radclient belum install)
    if (error.code === 127) {
        return NextResponse.json({ message: "Server Error: 'radclient' tidak ditemukan. Install freeradius-utils." }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Terjadi kesalahan internal server.", error: error.message },
      { status: 500 }
    );
  }
}