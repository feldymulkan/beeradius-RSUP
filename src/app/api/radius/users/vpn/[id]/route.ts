import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import * as crypto from 'crypto';
import { logAudit } from '@/lib/audit';

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const id = parseInt(params.id);
    if (isNaN(id)) return NextResponse.json({ message: "ID tidak valid." }, { status: 400 });

    const userInfo = await prisma.userinfo.findFirst({
      where: { id, type: 'vpn' },
    });

    if (!userInfo) return NextResponse.json({ message: "User VPN tidak ditemukan." }, { status: 404 });
    
    const { username } = userInfo;
    const [checkAttributes, replyAttributes, userGroup] = await Promise.all([
      prisma.radcheck.findMany({ where: { username }, select: { attribute: true, op: true, value: true } }),
      prisma.radreply.findMany({ where: { username }, select: { attribute: true, op: true, value: true } }),
      prisma.radusergroup.findFirst({ 
        where: { 
            username,
            groupMetadata: { type: 'vpn' }
        }, 
        select: { groupname: true } 
      }),
    ]);

    const allAttributes = [...checkAttributes, ...replyAttributes];
    const filteredAttributes = allAttributes.filter(attr => 
      attr.attribute.toLowerCase().includes("password") || 
      [
        'Service-Type', 'Framed-IP-Address', 'Framed-Pool', 
        'Tunnel-Type', 'Tunnel-Medium-Type', 'Tunnel-Private-Group-Id',
        'Framed-Protocol', 'MS-MPPE-Encryption-Policy', 'MS-MPPE-Encryption-Types'
      ].includes(attr.attribute)
    );

    return NextResponse.json({
      ...userInfo,
      group: userGroup?.groupname || "default",
      ipAddress: replyAttributes.find(a => a.attribute === 'Framed-IP-Address')?.value || "",
      poolName: replyAttributes.find(a => a.attribute === 'Framed-Pool')?.value || "",
      checkAttributes: filteredAttributes.map(attr => ({
        ...attr,
        value: attr.attribute.toLowerCase().includes("password") ? "********" : attr.value
      }))
    });
  } catch (error: any) {
    return NextResponse.json({ message: "Error", error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const id = parseInt(params.id);
    const body = await request.json();
    const { newUsername, fullName, department, groupname, newPassword, passwordType, ipAddress, poolName } = body;

    const userInfo = await prisma.userinfo.findFirst({ where: { id, type: 'vpn' } });
    if (!userInfo) return NextResponse.json({ message: "User tidak ditemukan" }, { status: 404 });

    const oldUsername = userInfo.username;
    const finalUsername = newUsername || oldUsername;
    const prismaOperations: any[] = [];

    // Update UserInfo
    prismaOperations.push(prisma.userinfo.update({
      where: { id },
      data: { username: finalUsername, fullName, department }
    }));

    if (newUsername && oldUsername !== newUsername) {
        prismaOperations.push(prisma.radcheck.updateMany({ where: { username: oldUsername }, data: { username: finalUsername } }));
        prismaOperations.push(prisma.radreply.updateMany({ where: { username: oldUsername }, data: { username: finalUsername } }));
        prismaOperations.push(prisma.radusergroup.updateMany({ where: { username: oldUsername }, data: { username: finalUsername } }));
    }

    if (groupname) {
      const vpnGroups = await prisma.groupMetadata.findMany({ where: { type: 'vpn' }, select: { groupname: true } });
      const vpnGroupNames = vpnGroups.map(g => g.groupname);

      prismaOperations.push(prisma.radusergroup.deleteMany({ 
        where: { username: finalUsername, groupname: { in: vpnGroupNames } } 
      }));
      prismaOperations.push(prisma.radusergroup.create({ 
        data: { username: finalUsername, groupname, priority: 1 } 
      }));
    }

    if (newPassword) {
      const passwordAttr = passwordType === 'md5' ? 'MD5-Password' : 'Cleartext-Password';
      let val = newPassword;
      if (passwordType === 'md5') val = crypto.createHash('md5').update(newPassword).digest('hex');
      
      prismaOperations.push(prisma.radcheck.updateMany({
        where: { username: finalUsername, attribute: { contains: 'Password' } },
        data: { attribute: passwordAttr, value: val }
      }));
    }

    // VPN Specific (IP & Pool)
    prismaOperations.push(prisma.radreply.deleteMany({
      where: { username: finalUsername, attribute: 'Framed-IP-Address' }
    }));
    if (ipAddress) {
      prismaOperations.push(prisma.radreply.create({
        data: { username: finalUsername, attribute: 'Framed-IP-Address', op: '=', value: ipAddress }
      }));
    }

    prismaOperations.push(prisma.radreply.deleteMany({
      where: { username: finalUsername, attribute: 'Framed-Pool' }
    }));
    if (poolName) {
      prismaOperations.push(prisma.radreply.create({
        data: { username: finalUsername, attribute: 'Framed-Pool', op: '=', value: poolName }
      }));
    }

    await prisma.$transaction(prismaOperations);
    await logAudit('UPDATE_USER', 'user', finalUsername, { type: 'vpn', oldUsername, fullName, department, groupname, ipAddress, poolName });
    return NextResponse.json({ message: "User VPN berhasil diupdate" });
  } catch (error: any) {
    return NextResponse.json({ message: "Error", error: error.message }, { status: 500 });
  }
}
