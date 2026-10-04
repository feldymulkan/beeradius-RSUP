import * as crypto from 'crypto';
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { logAudit } from '@/lib/audit';

/**
 * Mengambil detail user RADIUS berdasarkan ID dari tabel userinfo
 */
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ message: "ID tidak valid." }, { status: 400 });
    }

    // Cari di userinfo
    const userInfo = await prisma.userinfo.findUnique({
      where: { id },
    });

    if (!userInfo) {
      return NextResponse.json({ message: `User dengan ID '${id}' tidak ditemukan.` }, { status: 404 });
    }
    
    const { username, type } = userInfo;
    
    // Ambil data tambahan dari radcheck, radreply, dan radusergroup
    const [checkAttributes, replyAttributes, userGroup] = await Promise.all([
      prisma.radcheck.findMany({ where: { username }, select: { attribute: true, op: true, value: true } }),
      prisma.radreply.findMany({ where: { username }, select: { attribute: true, op: true, value: true } }),
      prisma.radusergroup.findFirst({ where: { username }, select: { groupname: true } }),
    ]);

    const allAttributes = [...checkAttributes, ...replyAttributes];

    // Filter atribut berdasarkan tipe layanan
    const filteredAttributes = allAttributes.filter(attr => {
      // Password selalu ditampilkan
      if (attr.attribute.toLowerCase().includes("password")) return true;

      if (type === 'vpn') {
        // Atribut khusus VPN
        return [
          'Service-Type', 
          'Framed-IP-Address', 
          'Framed-Pool', 
          'Tunnel-Type', 
          'Tunnel-Medium-Type', 
          'Tunnel-Private-Group-Id',
          'Framed-Protocol',
          'MS-MPPE-Encryption-Policy',
          'MS-MPPE-Encryption-Types'
        ].includes(attr.attribute);
      } else {
        // Atribut khusus Hotspot
        return ['NAS-Port-Type', 'Simultaneous-Use'].includes(attr.attribute);
      }
    });

    const userData = {
      username,
      type,
      group: userGroup?.groupname || "N/A",
      fullName: userInfo.fullName || "N/A",
      department: userInfo.department || "N/A",
      // Extra fields for VPN editing
      ipAddress: replyAttributes.find(a => a.attribute === 'Framed-IP-Address')?.value || "",
      poolName: replyAttributes.find(a => a.attribute === 'Framed-Pool')?.value || "",
      checkAttributes: filteredAttributes.map((attr) => ({
        ...attr,
        value: attr.attribute.toLowerCase().includes("password") ? "********" : attr.value,
      })),
    };
    return NextResponse.json(userData, { status: 200 });

  } catch (error: unknown) {
    let errorMessage = "Terjadi kesalahan pada server.";
    if (error instanceof Error) { errorMessage = error.message; }
    return NextResponse.json({ message: "Gagal mengambil data user.", error: errorMessage }, { status: 500 });
  }
}

// Interface untuk body request PUT yang fleksibel
interface UpdateRequestBody {
  newUsername?: string;
  newPassword?: string;
  passwordType?: 'md5' | 'sha1' | 'cleartext';
  groupname?: string;
  fullName?: string;
  department?: string;
  ipAddress?: string;
  poolName?: string;
}

/**
 * Mengubah data user RADIUS (Edit) berdasarkan ID dari userinfo
 */
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ message: "ID tidak valid." }, { status: 400 });
    }

    // 1. Ambil data LAMA dari userinfo
    const userInfo = await prisma.userinfo.findUnique({ where: { id } });
    if (!userInfo) {
      return NextResponse.json({ message: `User dengan ID '${id}' tidak ditemukan.` }, { status: 404 });
    }
    const oldUsername = userInfo.username;
    const type = userInfo.type;
    
    // 2. Ambil semua data BARU dari body request
    const body: UpdateRequestBody = await request.json();
    const { newUsername, fullName, department, groupname, newPassword, passwordType, ipAddress, poolName } = body;

    // 3. PENTING: Jika username diubah, cek dulu apakah nama baru sudah dipakai UNTUK TIPE YANG SAMA
    if (newUsername && oldUsername !== newUsername) {
      const existingUser = await prisma.userinfo.findFirst({
        where: { username: newUsername, type: type },
      });
      if (existingUser) {
        return NextResponse.json({ message: `Username '${newUsername}' sudah digunakan untuk layanan ${type.toUpperCase()}.` }, { status: 409 });
      }
    }
    
    // Tentukan username final yang akan digunakan di semua operasi
    const finalUsername = newUsername || oldUsername;
    const prismaOperations: any[] = [];

    // 4. Logika untuk mengubah username di SEMUA tabel terkait
    if (newUsername && oldUsername !== newUsername) {
      prismaOperations.push(prisma.userinfo.update({
        where: { id },
        data: { username: finalUsername, fullName, department }
      }));
      
      prismaOperations.push(prisma.radcheck.updateMany({ where: { username: oldUsername }, data: { username: finalUsername } }));
      prismaOperations.push(prisma.radreply.updateMany({ where: { username: oldUsername }, data: { username: finalUsername } }));
      prismaOperations.push(prisma.radusergroup.updateMany({ where: { username: oldUsername }, data: { username: finalUsername } }));
    } else {
      prismaOperations.push(prisma.userinfo.update({
        where: { id },
        data: { fullName, department }
      }));
    }

    // 5. Logika untuk mengubah grup
    if (groupname) {
      const targetGroups = await prisma.groupMetadata.findMany({
        where: { type },
        select: { groupname: true }
      });
      const targetGroupNames = targetGroups.map(g => g.groupname);

      prismaOperations.push(prisma.radusergroup.deleteMany({ 
        where: { username: finalUsername, groupname: { in: targetGroupNames } } 
      }));
      prismaOperations.push(prisma.radusergroup.create({ 
        data: { username: finalUsername, groupname, priority: 1 } 
      }));
    }

    // 6. Logika untuk mengubah password
    if (newPassword && newPassword.length > 0) {
      const passwordAttr = passwordType === 'md5' ? 'MD5-Password' : 'Cleartext-Password';
      let hashedPassword = newPassword;
      if (passwordType === 'md5') {
        hashedPassword = crypto.createHash('md5').update(newPassword).digest('hex');
      }
      prismaOperations.push(prisma.radcheck.updateMany({
        where: { username: finalUsername, attribute: { contains: 'Password' } },
        data: { attribute: passwordAttr, op: ':=', value: hashedPassword }
      }));
    }

    // 7. Logika untuk VPN (IP Address & Pool)
    if (type === 'vpn') {
      // Framed-IP-Address
      prismaOperations.push(prisma.radreply.deleteMany({
        where: { username: finalUsername, attribute: 'Framed-IP-Address' }
      }));
      if (ipAddress) {
        prismaOperations.push(prisma.radreply.create({
          data: { username: finalUsername, attribute: 'Framed-IP-Address', op: '=', value: ipAddress }
        }));
      }

      // Framed-Pool
      prismaOperations.push(prisma.radreply.deleteMany({
        where: { username: finalUsername, attribute: 'Framed-Pool' }
      }));
      if (poolName) {
        prismaOperations.push(prisma.radreply.create({
          data: { username: finalUsername, attribute: 'Framed-Pool', op: '=', value: poolName }
        }));
      }
    }

    await prisma.$transaction(prismaOperations);
    await logAudit('UPDATE_USER', 'user', finalUsername, { type, oldUsername, fullName, department, groupname });
    return NextResponse.json({ message: `Data untuk user ${finalUsername} berhasil diubah` }, { status: 200 });
    
  } catch (error: unknown) {
    let errorMessage = "Terjadi kesalahan pada server.";
    if (error instanceof Error) { errorMessage = error.message; }
    console.error("[API PUT Error]:", errorMessage); 
    return NextResponse.json({ message: "Gagal mengupdate data user.", error: errorMessage }, { status: 500 });
  }
}

import { deleteUser } from '@/app/actions/userActions';

/**
 * Menghapus user RADIUS dari semua tabel berdasarkan ID
 */
export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ message: "ID tidak valid." }, { status: 400 });
    }

    // Cari di userinfo untuk mendapatkan username dan type
    const userInfo = await prisma.userinfo.findUnique({ where: { id } });
    if (!userInfo) {
      return new NextResponse(null, { status: 204 });
    }

    const { username, type } = userInfo;

    const result = await deleteUser(username, type);

    if (result.error) {
      return NextResponse.json({ message: result.error }, { status: 400 });
    }

    await logAudit('DELETE_USER', 'user', username, { type });
    return new NextResponse(null, { status: 204 });

  } catch (error: unknown) {
    let errorMessage = "Terjadi kesalahan pada server.";
    if (error instanceof Error) { errorMessage = error.message; }
    console.error("DELETE Error:", errorMessage);
    return NextResponse.json({ message: "Gagal menghapus user.", error: errorMessage }, { status: 500 });
  }
}