"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { userSchema, UserFormData } from "@/lib/validations";
import * as crypto from "crypto";
import { revalidatePath } from "next/cache";

export async function createUser(data: UserFormData) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { error: "Unauthorized" };
  }

  // Validasi data
  const validated = userSchema.safeParse(data);
  if (!validated.success) {
    return { error: validated.error.issues[0].message };
  }

  const { username, password, groupname, fullName, department, passwordType, type, ipAddress, poolName } = validated.data;

  try {
    // Check if user exists WITH SAME TYPE
    const userExists = await prisma.userinfo.findFirst({
      where: { username, type }
    });
    if (userExists) {
      return { error: `Username '${username}' sudah digunakan untuk layanan ${type.toUpperCase()}.` };
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
      // Hapus semua atribut radcheck yang akan kita set ulang (Idempotent)
      prisma.radcheck.deleteMany({
        where: { 
          username, 
          attribute: { in: [attribute, 'Service-Type', 'NAS-Port-Type', 'Cleartext-Password', 'MD5-Password', 'SHA1-Password'] } 
        }
      }),
      prisma.radcheck.create({
        data: { 
          username, 
          attribute,
          op: ':=', 
          value: hashedPassword
        },
      }), 
      // Cek radusergroup: Hanya tambah jika belum ada di group itu
      prisma.radusergroup.deleteMany({
        where: { username, groupname: groupname || "default" }
      }),
      prisma.radusergroup.create({
        data: { username, groupname: groupname || "default" },
      }),
      prisma.userinfo.create({
        data: {
          username,
          type, // Simpan tipe layanan
          fullName: fullName || "", 
          department: department || "",
          createdBy: session.user?.name || "system",
          status: "active"
        }
      })
    ];

    // Tambahkan Check Attribute untuk Isolasi Layanan
    if (type === 'vpn') {
      prismaOperations.push(
        prisma.radcheck.create({
          data: {
            username,
            attribute: 'Service-Type',
            op: ':=',
            value: 'Framed-User'
          }
        })
      );
    } else {
      // Hotspot: Tolak jika login via VPN (Virtual)
      prismaOperations.push(
        prisma.radcheck.create({
          data: {
            username,
            attribute: 'NAS-Port-Type',
            op: '!=',
            value: 'Virtual'
          }
        })
      );
    }

    // Jika tipe VPN, tambahkan atribut spesifik VPN ke radreply
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
        }),
        prisma.radreply.create({
          data: {
            username,
            attribute: 'MS-MPPE-Encryption-Policy',
            op: '=',
            value: '1'
          }
        }),
        prisma.radreply.create({
          data: {
            username,
            attribute: 'MS-MPPE-Encryption-Types',
            op: '=',
            value: '6'
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

      if (poolName) {
        prismaOperations.push(
          prisma.radreply.create({
            data: {
              username,
              attribute: 'Framed-Pool',
              op: '=',
              value: poolName
            }
          })
        );
      }
    }

    const results = await prisma.$transaction(prismaOperations);
    const userInfo = results[4]; // userinfo.create is the 5th operation (index 4)
    
    revalidatePath('/(protected)/radius-users');
    return { 
      success: true, 
      message: `User ${type.toUpperCase()} berhasil dibuat.`,
      id: userInfo.id // Return ID for redirection
    };

  } catch (error: any) {
    console.error("Create User Action Error:", error);
    return { error: "Terjadi kesalahan server: " + error.message };
  }
}

export async function deleteUser(username: string, type: string) {
  const session = await getServerSession(authOptions);
  if (!session) return { error: "Unauthorized" };

  try {
    // Cari group yang sesuai dengan tipe ini
    const groupMetadata = await prisma.groupMetadata.findMany({
      where: { type },
      select: { groupname: true }
    });
    const groupNames = groupMetadata.map(g => g.groupname);

    await prisma.$transaction(async (tx) => {
      // 1. Hapus dari userinfo (Surgically by username & type)
      await tx.userinfo.deleteMany({
        where: { username, type }
      });

      // 2. Hapus dari radusergroup (Surgically by username & groups associated with this type)
      await tx.radusergroup.deleteMany({
        where: { 
          username,
          groupname: { in: groupNames }
        }
      });

      // 3. Cek apakah masih ada user dengan username sama tapi tipe berbeda
      const otherTypeExists = await tx.userinfo.findFirst({
        where: { username }
      });

      if (!otherTypeExists) {
        // Jika tidak ada user lain dengan username ini, hapus semua dari radcheck & radreply
        await tx.radcheck.deleteMany({ where: { username } });
        await tx.radreply.deleteMany({ where: { username } });
      } else {
        // Jika ada user lain (misal: VPN masih ada, Hotspot dihapus)
        // Kita hanya hapus atribut spesifik tipe yang dihapus
        if (type === 'vpn') {
          await tx.radcheck.deleteMany({
            where: { 
              username,
              OR: [
                { attribute: 'Service-Type' },
                { attribute: 'Framed-IP-Address' },
                { attribute: 'Framed-Pool' }
              ]
            }
          });
          await tx.radreply.deleteMany({
            where: { 
              username,
              OR: [
                { attribute: 'Service-Type' },
                { attribute: 'Framed-Protocol' },
                { attribute: 'MS-MPPE-Encryption-Policy' },
                { attribute: 'MS-MPPE-Encryption-Types' },
                { attribute: 'Framed-IP-Address' },
                { attribute: 'Framed-Pool' }
              ]
            }
          });
        } else {
          // Hotspot
          await tx.radcheck.deleteMany({
            where: { 
              username,
              attribute: 'NAS-Port-Type'
            }
          });
        }
        // Masalah: Password (Cleartext-Password) ada di radcheck.
        // Jika kita hapus password, user tipe lain juga kehilangan password.
        // Jika kita tidak hapus, password lama tetap ada.
        // Solusi ideal: Differentiate rows. Tapi untuk sekarang, kita biarkan password jika ada user lain.
      }
    });

    revalidatePath('/(protected)/radius-users');
    return { success: true, message: `User ${username} (${type}) berhasil dihapus.` };
  } catch (error: any) {
    return { error: "Gagal menghapus user: " + error.message };
  }
}

export async function toggleUserStatus(username: string, type: string, currentStatus: string) {
  const session = await getServerSession(authOptions);
  if (!session) return { error: "Unauthorized" };

  const newStatus = currentStatus === 'active' ? 'disabled' : 'active';

  try {
    await prisma.$transaction(async (tx) => {
      // 1. Update status di userinfo (Surgical)
      await tx.userinfo.update({
        where: { 
          username_type: { username, type } 
        },
        data: { status: newStatus }
      });

      if (newStatus === 'disabled') {
        // 2. Jika disable, tambahkan Auth-Type := Reject di radcheck
        // Cek dulu apakah sudah ada
        const existingReject = await tx.radcheck.findFirst({
          where: { username, attribute: 'Auth-Type' }
        });

        if (!existingReject) {
          await tx.radcheck.create({
            data: {
              username,
              attribute: 'Auth-Type',
              op: ':=',
              value: 'Reject'
            }
          });
        }
      } else {
        // 3. Jika enable, hapus Auth-Type dari radcheck
        // Hanya jika TIDAK ADA user lain dengan username sama yang berstatus disabled
        const otherDisabled = await tx.userinfo.findFirst({
          where: { 
            username, 
            status: 'disabled',
            NOT: { type }
          }
        });

        if (!otherDisabled) {
          await tx.radcheck.deleteMany({
            where: { username, attribute: 'Auth-Type' }
          });
        }
      }
    });

    revalidatePath('/(protected)/radius-users');
    return { success: true, message: `User ${username} sekarang ${newStatus}.` };
  } catch (error: any) {
    return { error: "Gagal mengubah status user: " + error.message };
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
      await prisma.$transaction(async (tx) => {
        const type = user.type || 'hotspot';
        const exists = await tx.userinfo.findFirst({ 
          where: { username: user.username, type } 
        });
        if (exists) throw new Error(`User ${user.username} (${type}) sudah ada`);

        await tx.radcheck.deleteMany({
          where: { username: user.username, attribute: { contains: 'Password' } }
        });

        await tx.radcheck.create({
          data: {
            username: user.username,
            attribute: 'Cleartext-Password',
            op: ':=',
            value: user.password
          }
        });

        await tx.radusergroup.deleteMany({
          where: { username: user.username, groupname: user.groupname || 'default' }
        });

        await tx.radusergroup.create({
          data: { username: user.username, groupname: user.groupname || 'default' }
        });

        await tx.userinfo.create({
          data: {
            username: user.username,
            type,
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
