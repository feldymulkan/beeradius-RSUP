# Panduan Proyek BeeRadius (GEMINI.md)

Dokumen ini berisi konvensi tim, panduan arsitektur, dan alur kerja untuk pengembangan proyek BeeRadius. Semua anggota tim harus mengikuti panduan ini untuk menjaga konsistensi kode.

## 🏗️ Arsitektur & Teknologi

- **Framework**: Next.js 15 (App Router).
- **Runtime**: Node.js 20+.
- **Database**: MySQL dengan Prisma ORM. Proyek ini berinteraksi langsung dengan skema tabel FreeRADIUS standar (`radcheck`, `radreply`, `radusergroup`, dll) ditambah tabel custom (`admin`, `userinfo`).
- **Autentikasi**: NextAuth.js v4 dengan `CredentialsProvider`. Mendukung Role-Based Access Control (RBAC) dengan role `superadmin` dan `admin`.
- **UI & Styling**: Tailwind CSS dan DaisyUI.

## 🛠️ Konvensi Pengembangan

### 1. Struktur Folder
- `src/app`: Semua rute (pages), API handlers, dan Server Actions.
- `src/components`: Komponen UI modular dan reusable.
- `src/lib`: Konfigurasi shared seperti `prisma.ts`, `auth.ts`, dan utilitas serialisasi BigInt di `utils.ts`.
- `src/types`: Definisi tipe TypeScript global.

### 2. Pengelolaan Database (Prisma)
- **Transaksi**: Gunakan `prisma.$transaction` saat melakukan operasi yang melibatkan lebih dari satu tabel (misalnya: saat membuat user baru yang melibatkan `radcheck`, `radusergroup`, dan `userinfo`).
- **Tracking**: Saat membuat user baru, simpan nama admin yang sedang login ke kolom `createdBy` di tabel `userinfo`.
- **RBAC**: Role `superadmin` memiliki akses penuh, sedangkan `admin` memiliki akses terbatas (misal: tidak bisa mengelola akun admin lain).

### 3. API & Server Actions
- Prioritaskan penggunaan **Server Actions** di Next.js 15 untuk mutasi data (create, update, delete).
- Gunakan **Zod** untuk validasi input baik di sisi client maupun server.
- Tangani tipe data `BigInt` (dari tabel `radacct`) menggunakan utilitas `serializeBigInt` sebelum dikirim ke client components.

### 4. Komponen UI
- **DataTable**: Gunakan komponen `src/components/DataTable.tsx` untuk menampilkan data dalam bentuk tabel guna menjaga konsistensi fitur paginasi dan tampilan.
- **Client vs Server**: Prioritaskan Server Components untuk pengambilan data. Gunakan Client Components (`"use client"`) hanya untuk elemen interaktif atau saat menggunakan hook React.
- **Tema**: Gunakan class dari DaisyUI untuk elemen UI standar (btn, table, card, dll).

### 5. Keamanan & Autentikasi
- **Middleware**: Middleware di `src/middleware.ts` melindungi semua rute kecuali `/login`, `/api`, dan file statis.
- **Password**: Gunakan `bcrypt` untuk password admin di tabel `admin`. Untuk password RADIUS di `radcheck`, dukung format `Cleartext-Password`, `MD5-Password`, atau `SHA1-Password` sesuai kebutuhan server RADIUS.

## 🔄 Alur Kerja (Workflow)

1. **Sinkronisasi Database**: Setelah menarik perubahan dari Git, selalu jalankan `npx prisma generate`. Jika ada perubahan skema, jalankan migrasi yang sesuai.
2. **Linting**: Jalankan `npm run lint` sebelum melakukan commit untuk memastikan kualitas kode tetap terjaga.
3. **Pencabutan Akses**: Untuk memutus koneksi user secara paksa, gunakan API endpoint `disconnect` yang berinteraksi dengan log `radacct`.

## 📝 Catatan Penting
- Proyek ini dirancang untuk berjalan berdampingan dengan server FreeRADIUS. Pastikan koneksi database memiliki izin yang cukup untuk memodifikasi tabel RADIUS.
- Perhatikan tipe data `BigInt` pada tabel `radacct` saat melakukan query via Prisma.

---
Dokumen ini adalah instruksi dasar bagi AI (Gemini) dan pengembang manusia untuk memahami konteks proyek dengan cepat.
