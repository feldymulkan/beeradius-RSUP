import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { exec } from "child_process"; // Untuk menjalankan perintah terminal
import util from "util";

const execAsync = util.promisify(exec);

function sanitize(input: string): string {
  return input.replace(/[^a-zA-Z0-9_.-@]/g, '');
}

/**
 * POST /api/radius/users/disconnect
 * Menerima { username } dan mengirim Packet of Disconnect (PoD)
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username } = body;

    if (!username) return NextResponse.json({ message: "Username required" }, { status: 400 });

    const cleanUsername = sanitize(username);

    // 1. Cari data sesi lengkap
    const session = await prisma.radacct.findFirst({
      where: { username: cleanUsername, acctstoptime: null },
      select: { nasipaddress: true, acctsessionid: true }, // Ambil Session ID!
      orderBy: { acctstarttime: 'desc' }
    });

    if (!session) {
      return NextResponse.json({ message: "User is offline" }, { status: 404 });
    }

    // 2. Cari Secret NAS
    const nas = await prisma.nas.findFirst({
      where: { nasname: session.nasipaddress },
    });

    if (!nas || !nas.secret) {
      return NextResponse.json({ message: "NAS Secret not found" }, { status: 404 });
    }

    // 3. Susun Command radclient
    // Kita kirim Username DAN Acct-Session-Id agar Router tau siapa yg harus dikick
    const payload = `User-Name="${cleanUsername}",Acct-Session-Id="${session.acctsessionid}"`;
    
    // Command: echo 'atribut' | radclient -r 3 -t 3 -x IP:3799 disconnect 'secret'
    // -r 3: retry 3 kali, -t 3: timeout 3 detik
    const command = `echo '${payload}' | radclient -r 2 -t 2 -x ${session.nasipaddress}:3799 disconnect '${nas.secret}'`;

    console.log(`[Disconnect] Executing for ${cleanUsername} on ${session.nasipaddress}`);

    const { stdout, stderr } = await execAsync(command);

    console.log("Output radclient:", stdout); // Cek ini di terminal VSCode

    // Cek apakah Router menerima (ACK) atau menolak (NAK/Timeout)
    if (stdout.includes("Disconnect-ACK")) {
         return NextResponse.json({ message: "Sukses! User terputus.", output: stdout });
    } else {
         // NAK atau error lain (misal User-Name tidak ketemu di router)
         return NextResponse.json({ message: "Gagal. Router menolak perintah.", output: stdout }, { status: 500 });
    }

  } catch (error: any) {
    console.error("[Disconnect Error]", error);
    return NextResponse.json({ message: "Server Error", error: error.message }, { status: 500 });
  }
}