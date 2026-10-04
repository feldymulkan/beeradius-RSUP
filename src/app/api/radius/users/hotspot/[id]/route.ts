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
      where: { id, type: 'hotspot' },
    });

    if (!userInfo) return NextResponse.json({ message: "User Hotspot tidak ditemukan." }, { status: 404 });
    
    const { username } = userInfo;
    const [checkAttributes, userGroup] = await Promise.all([
      prisma.radcheck.findMany({ where: { username }, select: { attribute: true, op: true, value: true } }),
      prisma.radusergroup.findFirst({ 
        where: { 
            username,
            groupMetadata: { type: 'hotspot' }
        }, 
        select: { groupname: true } 
      }),
    ]);

    const filteredAttributes = checkAttributes.filter(attr => 
      attr.attribute.toLowerCase().includes("password") || 
      ['NAS-Port-Type', 'Simultaneous-Use'].includes(attr.attribute)
    );

    return NextResponse.json({
      ...userInfo,
      group: userGroup?.groupname || "default",
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
    const { newUsername, fullName, department, groupname, newPassword, passwordType } = body;

    const userInfo = await prisma.userinfo.findFirst({ where: { id, type: 'hotspot' } });
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
      const hotspotGroups = await prisma.groupMetadata.findMany({ where: { type: 'hotspot' }, select: { groupname: true } });
      const hotspotGroupNames = hotspotGroups.map(g => g.groupname);

      prismaOperations.push(prisma.radusergroup.deleteMany({ 
        where: { username: finalUsername, groupname: { in: hotspotGroupNames } } 
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

    await prisma.$transaction(prismaOperations);
    await logAudit('UPDATE_USER', 'user', finalUsername, { type: 'hotspot', oldUsername, fullName, department, groupname });
    return NextResponse.json({ message: "User Hotspot berhasil diupdate" });
  } catch (error: any) {
    return NextResponse.json({ message: "Error", error: error.message }, { status: 500 });
  }
}
