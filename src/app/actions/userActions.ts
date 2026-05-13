"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { userSchema, UserFormData } from "@/lib/validations";
import * as crypto from "crypto";
import { Prisma } from "@/generated/client";
import { revalidatePath } from "next/cache";

export async function createUser(data: UserFormData) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { error: "Unauthorized" };
  }

  // Validasi data
  const validated = userSchema.safeParse(data);
  if (!validated.success) {
    return { error: validated.error.errors[0].message };
  }

  const { username, password, groupname, fullName, department, passwordType, type, ipAddress } = validated.data;

  try {
    // Check if user exists
    const userExists = await prisma.radcheck.findFirst({
      where: { username }
    });
    if (userExists) {
      return { error: `Username '${username}' sudah digunakan.` };
    }

    // Hash password for RADIUS
    let attribute = 'Cleartext-Password';
    let hashedPassword = password;

    if (passwordType === 'md5') {
      attribute = 'MD5-Password';
      hashedPassword = crypto.createHash('md5').update(password).digest('hex');
    } else if (passwordType === 'sha1') {
      attribute = 'SHA1-Password';
      hashedPassword = crypto.createHash('sha1').update(password).digest('hex');
    }

    const prismaOperations: any[] = [
      prisma.radcheck.create({
        data: { 
          username, 
          attribute,
          op: ':=', 
          value: hashedPassword
        },
      }), 
      prisma.radusergroup.create({
        data: { username, groupname: groupname || "default" },
      }),
      prisma.userinfo.create({
        data: {
          username,
          fullName: fullName || "", 
          department: department || "",
          createdBy: session.user?.name || "system"
        }
      })
    ];

    // Jika tipe VPN, tambahkan atribut spesifik VPN
    if (type === 'vpn') {
      prismaOperations.push(
        prisma.radreply.create({
          data: {
            username,
            attribute: 'Service-Type',
            op: '=',
            value: 'Framed-User'
          }
        }),
        prisma.radreply.create({
          data: {
            username,
            attribute: 'Framed-Protocol',
            op: '=',
            value: 'PPP'
          }
        })
      );

      if (ipAddress) {
        prismaOperations.push(
          prisma.radreply.create({
            data: {
              username,
              attribute: 'Framed-IP-Address',
              op: '=',
              value: ipAddress
            }
          })
        );
      }
    }

    await prisma.$transaction(prismaOperations);
    
    revalidatePath('/(protected)/radius-users');
    return { success: true, message: `User ${type.toUpperCase()} berhasil dibuat.` };

  } catch (error: any) {
    console.error("Create User Action Error:", error);
    return { error: "Terjadi kesalahan server: " + error.message };
  }
}

export async function deleteUser(username: string) {
  const session = await getServerSession(authOptions);
  if (!session) return { error: "Unauthorized" };

  // Implementasi RBAC sederhana: Superadmin bisa hapus apa saja, admin mungkin terbatas
  // Untuk sekarang kita izinkan admin menghapus user RADIUS.

  try {
    await prisma.$transaction([
      prisma.radcheck.deleteMany({ where: { username } }),
      prisma.radreply.deleteMany({ where: { username } }),
      prisma.radusergroup.deleteMany({ where: { username } }),
      prisma.userinfo.deleteMany({ where: { username } }),
    ]);

    revalidatePath('/(protected)/radius-users');
    return { success: true, message: `User ${username} berhasil dihapus.` };
  } catch (error: any) {
    return { error: "Gagal menghapus user: " + error.message };
  }
}

export async function importUsers(usersData: any[]) {
  const session = await getServerSession(authOptions);
  if (!session) return { error: "Unauthorized" };

  let successCount = 0;
  let failCount = 0;
  const errors: string[] = [];

  for (const user of usersData) {
    try {
      // Validasi minimal
      if (!user.username || !user.password) {
        failCount++;
        errors.push(`Baris skip: Username/Password kosong`);
        continue;
      }

      // Gunakan logic yang mirip dengan createUser tapi tanpa revalidatePath di setiap loop
      const result = await prisma.$transaction(async (tx) => {
        const exists = await tx.radcheck.findFirst({ where: { username: user.username } });
        if (exists) throw new Error(`User ${user.username} sudah ada`);

        await tx.radcheck.create({
          data: {
            username: user.username,
            attribute: 'Cleartext-Password',
            op: ':=',
            value: user.password
          }
        });

        await tx.radusergroup.create({
          data: { username: user.username, groupname: user.groupname || 'default' }
        });

        await tx.userinfo.create({
          data: {
            username: user.username,
            fullName: user.fullName || '',
            department: user.department || '',
            createdBy: session.user?.name || 'import'
          }
        });
      });

      successCount++;
    } catch (err: any) {
      failCount++;
      errors.push(`${user.username}: ${err.message}`);
    }
  }

  revalidatePath('/(protected)/radius-users');
  return { 
    success: true, 
    message: `Berhasil import ${successCount} user. Gagal: ${failCount}`,
    details: errors
  };
}
