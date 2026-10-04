# BeeRadius

BeeRadius adalah aplikasi manajemen RADIUS berbasis web yang dibangun dengan Next.js 15. Aplikasi ini dirancang untuk memudahkan administrator dalam mengelola pengguna, grup, dan memantau sesi aktif pada server RADIUS (seperti FreeRADIUS) yang menggunakan database MySQL.

## 🚀 Fitur Utama

- **Manajemen Pengguna RADIUS (Hotspot & VPN)**:
  - Halaman terpisah untuk pembuatan user Hotspot dan VPN.
  - Panduan konfigurasi manual VPN (L2TP/IPSec) untuk Windows, macOS, dan Linux.
  - Tambah, edit, dan hapus pengguna.
  - Detail informasi profil pengguna (Nama Lengkap, Departemen).
  - Pelacakan admin pembuat akun (`createdBy`).
  - Pengaturan atribut `radcheck` dan `radreply`.
- **Manajemen Grup RADIUS**:
  - Pembuatan dan pengelolaan grup.
  - Pengaturan atribut `radgroupcheck` dan `radgroupreply`.
  - Penugasan pengguna ke grup tertentu.
- **Monitoring & Analitik**:
  - Pantau pengguna yang sedang aktif dan durasi online secara real-time.
  - Filter sesi berdasarkan status (Aktif / Gantung / Semua) pada halaman Online User.
  - Fitur untuk memutuskan koneksi pengguna (*Disconnect*) dan pembersihan massal sesi gantung (*Clear Stale Sessions*).
  - Laporan penggunaan bandwidth terbanyak (Top Usage) berdasarkan User/IP.
- **Autentikasi & RBAC**:
  - Sistem login aman menggunakan NextAuth.js.
  - Role-Based Access Control: `superadmin` dan `admin`.
- **Fitur Enterprise Lainnya**:
  - Import massal user menggunakan file CSV.
  - Validasi data ketat menggunakan Zod.
- **Antarmuka Modern**:
  - Tema *dark/light mode* yang responsif menggunakan DaisyUI.
  - Tabel data dengan fitur pencarian dan paginasi.

## 🛠️ Teknologi

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router & Turbopack)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Database ORM**: [Prisma](https://www.prisma.io/) (MySQL)
- **Autentikasi**: [NextAuth.js](https://next-auth.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
- **Form Management**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## 📋 Prasyarat

Sebelum memulai, pastikan Anda telah menginstal:
- Node.js (versi 20 atau terbaru)
- MySQL Server
- Server FreeRADIUS (yang sudah dikonfigurasi untuk menggunakan MySQL)

## ⚙️ Instalasi & Persiapan

1. **Clone repositori:**
   ```bash
   git clone <repository-url>
   cd beeradius
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment:**
   Buat file `.env` di direktori akar dan sesuaikan dengan environment Anda:
   ```env
   DATABASE_URL="mysql://user:password@localhost:3306/radius"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Sinkronisasi Database:**
   Jalankan migrasi Prisma untuk menyesuaikan skema database:
   ```bash
   npx prisma generate
   # Jika database belum ada isinya, Anda mungkin perlu menjalankan:
   # npx prisma db push
   ```

5. **Seeding (Opsional):**
   Untuk membuat data awal atau user admin default:
   ```bash
   npx prisma db seed
   ```

## 🏃 Memulai Pengembangan

Jalankan server pengembangan:

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 📁 Struktur Proyek

- `src/app`: Route, page, dan API handler (Next.js App Router).
- `src/components`: Komponen UI yang dapat digunakan kembali.
- `src/lib`: Utilitas dan konfigurasi (Prisma, Auth).
- `src/types`: Definisi tipe TypeScript.
- `prisma`: Skema database dan skrip migrasi.

---
Dibuat dengan ❤️ untuk pengelolaan RADIUS yang lebih mudah.
