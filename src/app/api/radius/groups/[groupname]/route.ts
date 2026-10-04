import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { logAudit } from '@/lib/audit';

// [PERUBAHAN] Tipe data untuk body PUT yang baru
interface PutRequestBody {
  newGroupname: string;
  attributes: { attribute: string; op: string; value: string }[];
  simultaneousUse?: string;
  type?: 'hotspot' | 'vpn'; // New field
}

/**
 * [PERBAIKAN] Mengambil data grup dari KEDUA tabel (reply dan check)
 */
export async function GET(
    _request: NextRequest,
    context: { params: Promise<{ groupname: string }> }
) {
    try {
        const params = await context.params;
        const groupname = decodeURIComponent(params.groupname).trim();

        // Ambil data dari kedua tabel + metadata
        const [replyAttributes, checkAttributes, metadata] = await Promise.all([
            prisma.radgroupreply.findMany({ where: { groupname } }),
            prisma.radgroupcheck.findMany({ where: { groupname } }),
            prisma.groupMetadata.findUnique({ where: { groupname } }),
        ]);

        // Jika grup tidak ada di mana pun (termasuk metadata), kembalikan 404
        if (replyAttributes.length === 0 && checkAttributes.length === 0 && !metadata) {
            return NextResponse.json(
                { message: `Grup '${groupname}' tidak ditemukan.` },
                { status: 404 }
            );
        }

        // [PERUBAHAN] Cari nilai 'Simultaneous-Use' dari checkAttributes
        const simultaneousUseAttr = checkAttributes.find(
            (attr) => attr.attribute === 'Simultaneous-Use'
        );

        // [PERUBAHAN] Kembalikan objek gabungan
        const groupData = {
            replyAttributes: replyAttributes,
            simultaneousUse: simultaneousUseAttr ? simultaneousUseAttr.value : "",
            type: metadata?.type || 'hotspot'
        };

        return NextResponse.json(groupData, { status: 200 });

    } catch (error: unknown) {
        let errorMessage = "Terjadi kesalahan pada server.";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.error("[API GET Group Error]:", errorMessage);
        return NextResponse.json(
            { message: "Gagal mengambil data grup.", error: errorMessage },
            { status: 500 }
        );
    }
}

/**
 * [PERBAIKAN] Mengupdate grup, sekarang termasuk 'Simultaneous-Use'.
 */
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ groupname: string }> }
) {
  try {
    const params = await context.params;
    const oldGroupname = decodeURIComponent(params.groupname).trim();

    const body: PutRequestBody = await request.json();
    const { newGroupname, attributes, simultaneousUse, type } = body;

    if (!newGroupname || !attributes) {
        return NextResponse.json({ message: "Nama grup baru dan atribut harus ada." }, { status: 400 });
    }

    const isRenamed = oldGroupname !== newGroupname;

    // Cek duplikat jika nama berubah (cek di kedua tabel)
    if (isRenamed) {
      const existingReply = await prisma.radgroupreply.findFirst({ where: { groupname: newGroupname } });
      const existingCheck = await prisma.radgroupcheck.findFirst({ where: { groupname: newGroupname } });
      if (existingReply || existingCheck) {
        return NextResponse.json({ message: `Grup dengan nama '${newGroupname}' sudah ada.` }, { status: 409 });
      }
    }

    // Siapkan atribut 'reply' termasuk Acct-Interim-Interval
    const newAttributesData = attributes.map((attr: { attribute: string; op: string; value: string }) => ({
      groupname: newGroupname,
      attribute: attr.attribute,
      op: attr.op,
      value: attr.value,
    }));

    // Tambahkan Acct-Interim-Interval secara otomatis jika belum ada
    const hasInterim = newAttributesData.some((a: { attribute: string }) => a.attribute === 'Acct-Interim-Interval');
    if (!hasInterim) {
      newAttributesData.push({
        groupname: newGroupname,
        attribute: 'Acct-Interim-Interval',
        op: ':=',
        value: '300',
      });
    }

    // [PERBAIKAN] Susun operasi transaksi dengan urutan yang benar
    // agar tidak melanggar Foreign Key constraint antara radusergroup -> GroupMetadata
    const operations: any[] = [
      // 1. Hapus semua atribut reply lama
      prisma.radgroupreply.deleteMany({ where: { groupname: oldGroupname } }),
      // 2. Hapus semua atribut check lama
      prisma.radgroupcheck.deleteMany({ where: { groupname: oldGroupname } }),
      // 3. Buat semua atribut reply baru
      prisma.radgroupreply.createMany({ data: newAttributesData }),
    ];

    if (isRenamed) {
      // Jika nama berubah:
      // 4a. Buat metadata baru terlebih dahulu (agar FK reference valid)
      operations.push(
        prisma.groupMetadata.create({
          data: { groupname: newGroupname, type: type || 'hotspot' }
        })
      );
      // 5a. Update radusergroup agar menunjuk ke nama baru
      operations.push(
        prisma.radusergroup.updateMany({
          where: { groupname: oldGroupname },
          data: { groupname: newGroupname }
        })
      );
      // 6a. Hapus metadata lama (sekarang aman, tidak ada FK yang menunjuk)
      operations.push(
        prisma.groupMetadata.deleteMany({ where: { groupname: oldGroupname } })
      );
    } else {
      // Jika nama tidak berubah: cukup update metadata yang sudah ada
      operations.push(
        prisma.groupMetadata.upsert({
          where: { groupname: oldGroupname },
          update: { type: type || 'hotspot' },
          create: { groupname: newGroupname, type: type || 'hotspot' }
        })
      );
    }

    // Tambahkan 'Simultaneous-Use' baru jika ada
    if (simultaneousUse && simultaneousUse.trim() !== "") {
        operations.push(
            prisma.radgroupcheck.create({
                data: {
                    groupname: newGroupname,
                    attribute: 'Simultaneous-Use',
                    op: ':=',
                    value: simultaneousUse
                }
            })
        );
    }

    await prisma.$transaction(operations);

    await logAudit('UPDATE_GROUP', 'group', newGroupname, { oldGroupname, type });
    return NextResponse.json({ message: `Grup '${oldGroupname}' berhasil diupdate menjadi '${newGroupname}'.` }, { status: 200 });

  } catch (error: unknown) {
    let errorMessage = "Terjadi kesalahan pada server.";
     if (typeof error === 'object' && error !== null && 'code' in error) {
        if (error.code === 'P2002') {
            errorMessage = `Grup dengan nama tersebut sudah ada.`;
            return NextResponse.json({ message: "Gagal mengupdate grup.", error: errorMessage }, { status: 409 });
        }
    }
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    console.error("[API PUT Group Error]:", errorMessage);
    return NextResponse.json({ message: "Gagal mengupdate grup.", error: errorMessage }, { status: 500 });
  }
}

/**
 * [IMPROVED] Menghapus grup dari semua tabel terkait.
 * (Fungsi DELETE Anda sudah benar dan tidak perlu diubah)
 */
export async function DELETE(
    _requests: NextRequest,
    context: { params: Promise<{ groupname: string }> }
){
    try {
        const params = await context.params;
        const groupname = decodeURIComponent(params.groupname).trim();

        await prisma.$transaction([
            prisma.radgroupreply.deleteMany({ where: { groupname } }),
            prisma.radgroupcheck.deleteMany({ where: { groupname } }),
            prisma.radusergroup.deleteMany({ where: { groupname } }),
            prisma.groupMetadata.deleteMany({ where: { groupname } }),
        ]);

        await logAudit('DELETE_GROUP', 'group', groupname);

        return NextResponse.json(
            { message: `Grup '${groupname}' berhasil dihapus dari semua tabel.` },
            { status: 200 }
        );

    } catch (error: unknown) {
        let errorMessage = "Terjadi kesalahan pada server.";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.error("[API DELETE Group Error]:", errorMessage);
        return NextResponse.json(
            { message: "Gagal menghapus grup.", error: errorMessage },
            { status: 500 }
        );
    }
}