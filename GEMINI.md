# Panduan Proyek BeeRadius (GEMINI.md)

Dokumen ini berisi konvensi tim, panduan arsitektur, dan alur kerja untuk pengembangan proyek BeeRadius. Semua anggota tim harus mengikuti panduan ini untuk menjaga konsistensi kode.

## 🏗️ Arsitektur & Teknologi

- **Framework**: Next.js 15 (App Router).
- **Runtime**: Node.js 20+.
- **Database**: MySQL dengan Prisma ORM. Proyek ini berinteraksi langsung dengan skema tabel FreeRADIUS standar (`radcheck`, `radreply`, `radusergroup`, dll) serta tabel custom tambahan:
  - `admin`: Kredensial dan hak akses administrator.
  - `userinfo`: Informasi detail pengguna (VPN, hotspot, dll) beserta tracking admin pembuat (`createdBy`).
  - `GroupMetadata`: Metadata tambahan untuk grup RADIUS.
  - `RadiusPool`: Konfigurasi IP Pool untuk manajemen alokasi IP.
  - `MikrotikConfig`: Konfigurasi koneksi router MikroTik.
  - `WireguardPeer`: Konfigurasi peer WireGuard untuk koneksi VPN WireGuard.
  - `Wifi`: Daftar SSID dan password wifi internal RSUD NTB.
- **Autentikasi**: NextAuth.js v4 dengan `CredentialsProvider`. Mendukung Role-Based Access Control (RBAC) dengan role `superadmin` dan `admin`.
- **UI & Styling**: Tailwind CSS dan DaisyUI.

## 🛠️ Konvensi Pengembangan

### 1. Struktur Folder
- `src/app`: Semua rute (pages), API handlers, dan Server Actions.
  - Rute dilindungi dikelompokkan dalam route group `(protected)`.
  - API endpoints diletakkan di bawah `src/app/api`.
- `src/components`: Komponen UI modular dan reusable (seperti `DataTable`, `PasswordReveal`, `Sidebar`, dll).
- `src/lib`: Konfigurasi shared seperti `prisma.ts`, `auth.ts`, utilitas integrasi MikroTik (`mikrotik.ts`), utilitas WireGuard (`wg-utils.ts`), dan utilitas serialisasi BigInt di `utils.ts`.
- `src/types`: Definisi tipe TypeScript global.

### 2. Pengelolaan Database (Prisma)
- **Transaksi**: Gunakan `prisma.$transaction` saat melakukan operasi yang melibatkan lebih dari satu tabel (misalnya: saat membuat user baru yang melibatkan `radcheck`, `radusergroup`, dan `userinfo`).
- **Tracking**: Saat membuat user baru, simpan nama admin yang sedang login ke kolom `createdBy` di tabel `userinfo`.
- **RBAC**: Role `superadmin` memiliki akses penuh, sedangkan `admin` memiliki akses terbatas (misal: tidak bisa mengelola akun admin lain).

### 3. API & Server Actions
- Prioritaskan penggunaan **Server Actions** di Next.js 15 untuk mutasi data sederhana.
- Gunakan **API Route Handlers** untuk operasi CRUD yang membutuhkan interaksi client-side dinamis (seperti manajemen WiFi, WireGuard, MikroTik, dan NAS).
- Gunakan **Zod** untuk validasi input baik di sisi client maupun server.
- Tangani tipe data `BigInt` (dari tabel `radacct`) menggunakan utilitas `serializeBigInt` sebelum dikirim ke client components.

### 4. Komponen UI & Workflow Khusus
- **DataTable**: Gunakan komponen `src/components/DataTable.tsx` untuk menampilkan data dalam bentuk tabel guna menjaga konsistensi fitur paginasi dan tampilan.
- **VPN Manual Guide**: Konfigurasi VPN menggunakan panduan langkah-langkah manual untuk Windows, macOS, dan Linux yang tersedia di halaman detail user. Ini menggantikan penggunaan script otomatis untuk stabilitas yang lebih baik.
- **Redireksi Pasca-Create**: Pembuatan user VPN akan langsung mengarahkan (redirect) admin ke halaman detail user agar informasi konfigurasi manual segera tersedia.
- **Halaman Online User (`/radius-users/online/[type]`)**: Mengintegrasikan fitur pemantauan durasi online secara real-time, status badge (*Terhubung* / *Stale Session*), filter status sesi (*Semua*, *Aktif*, *Gantung*), serta tombol *Clear Stale Sessions* untuk pembersihan massal sesi gantung (sesi tanpa *interim-update* >15 menit). Komponen `OnlineUserList.tsx` yang sebelumnya terpisah kini telah dihapus karena fungsinya disatukan langsung ke dalam halaman ini.

### 5. Keamanan & Autentikasi
- **Middleware**: Middleware di `src/middleware.ts` melindungi semua rute kecuali `/login`, `/api` (beberapa API endpoint melakukan pengecekan session secara internal), dan file statis.
- **Password**: Gunakan `bcrypt` untuk password admin di tabel `admin`. Untuk password RADIUS di `radcheck`, dukung format `Cleartext-Password`, `MD5-Password`, atau `SHA1-Password` sesuai kebutuhan server RADIUS.

## 🔄 Alur Kerja (Workflow)

1. **Sinkronisasi Database**: Setelah menarik perubahan dari Git, selalu jalankan `npx prisma generate`. Jika ada perubahan skema, jalankan migrasi yang sesuai.
2. **Linting**: Jalankan `npm run lint` sebelum melakukan commit untuk memastikan kualitas kode tetap terjaga.
3. **Deployment**: Gunakan script `/home/sirs/deploy.sh` untuk melakukan deployment ke lingkungan produksi.
4. **Pencabutan Akses**: Untuk memutus koneksi user secara paksa, gunakan API endpoint `disconnect` yang berinteraksi dengan log `radacct`.

## 📝 Catatan Penting
- Proyek ini dirancang untuk berjalan berdampingan dengan server FreeRADIUS. Pastikan koneksi database memiliki izin yang cukup untuk memodifikasi tabel RADIUS.
- Perhatikan tipe data `BigInt` pada tabel `radacct` saat melakukan query via Prisma.

---
Dokumen ini adalah instruksi dasar bagi AI (Gemini) dan pengembang manusia untuk memahami konteks proyek dengan cepat.
