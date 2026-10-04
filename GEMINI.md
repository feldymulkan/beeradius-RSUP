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
  - `SwitchDevice`: Data perangkat switch managed (IP, brand, model, SNMP community, port, VLAN & port configuration JSON).
- **Autentikasi**: NextAuth.js v4 dengan `CredentialsProvider`. Mendukung Role-Based Access Control (RBAC) dengan role `superadmin` dan `admin`.
- **UI & Styling**: Tailwind CSS dan DaisyUI (dengan tema ganda Dark & Light mode).

## 🛠️ Konvensi Pengembangan

### 1. Struktur Folder
- `src/app`: Semua rute (pages), API handlers, dan Server Actions.
  - Rute dilindungi dikelompokkan dalam route group `(protected)`.
  - API endpoints diletakkan di bawah `src/app/api`.
- `src/components`: Komponen UI modular dan reusable (seperti `DataTable`, `PasswordReveal`, `Sidebar`, dll).
- `src/lib`: Konfigurasi shared seperti `prisma.ts`, `auth.ts`, utilitas integrasi MikroTik (`mikrotik.ts`), dan utilitas serialisasi BigInt di `utils.ts`.
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
- **Halaman Manajemen Pengguna (`/radius-users` & `/radius-users/type/[type]`)**: 
  - Menggunakan tata letak **Single-Row Unified Dark Glass Toolbar** (`#131b2e` border `primary/10`) yang menyatukan `SearchInput` dan `UserFilter` tanpa *stacked clutter*.
  - Menghapus pembungkus `prose` Tailwind agar hierarki margin dan tombol aksi tetap rapi.
  - Komponen `ImportUser.tsx` menggunakan **Modal Dialog Interaktif** (DaisyUI modal) sehingga kotak upload file mentah tidak lagi merusak tampilan toolbar utama.
  - Tombol aksi utama diletakkan di header kanan: `+ Tambah User`, `Import CSV`, dan `Export CSV`.
- **Form Tambah User Hotspot & VPN (`/radius-users/create/hotspot` & `/radius-users/create/vpn`)**:
  - Mengadopsi arsitektur layout 2-kolom terpadu sesuai standar **Stitch UI/UX**:
    - **Kolom Utama (Form Grid)**: Terbagi menjadi 3 panel kartu terstruktur: (1) *Kredensial & Autentikasi RADIUS* (username monospace, toggle reveal password, generator *Acak Password*, dan live meter kekuatan password), (2) *Profil Pengguna & Unit RSUD NTB* (nama lengkap, departemen/instalasi, dan dropdown grup bandwidth dinamis), serta (3) *Alokasi IP & Jaringan VPN* (khusus VPN: dropdown IP pool MikroTik dan input static Framed-IP-Address monospace).
    - **Kolom Samping (NOC Telemetry & Security Specs)**: Menampilkan spesifikasi real-time profil layanan, status isolasi sesi (`Framed` / `NAS-Port`), sinkronisasi status ke MySQL, serta panduan operasional NOC RSUD NTB.
    - **Unified Footer Bar**: Tombol *Batalkan* dan tombol *Simpan & Aktifkan User* berstatus loading reaktif dengan glowing shadow.
  - Kompatibel penuh dengan tema ganda: Gelap (`beeradius`) dan Terang (`beeradius-light`) menggunakan token semantik `text-base-content`, `border-base-300`, dan `bg-base-100`.
- **Halaman Laporan & Statistik (`/reports`)**:
  - Mengadopsi prinsip desain **Telemetry Dark Glass** (`#131b2e` border `primary/10`, aksen cyan `#38bdf8`) dengan tata letak **Single-Row Unified Navigation Bar** untuk beralih antar tab (Ringkasan, Penggunaan Data, Distribusi Grup, Aktivitas Login, Sistem & NAS) tanpa *stacked clutter*.
  - **KPI Metric Cards**: 4 kartu berjejer horizontal (Total Download, Total Upload, User Aktif Harian, Auth Rejects) dengan angka metrik tebal berfont monospace (`font-mono`) serta border aksen warna fungsional (*cyan, emerald, amber, rose*).
  - **Interactive Telemetry Charts**: Menggunakan Recharts dengan tema gelap, *dual-gradient glowing fill*, tooltip *dark glass* kustom, serta pemilih rentang waktu mikro (*24j | 7h | 30h | 1t*) yang diletakkan secara *inline* pada header kartu.
  - **Telemetry Mini-Insights**: Visualisasi terpadu untuk proporsi tipe pengguna (Hotspot vs VPN), kesehatan gateway & NAS, serta kalkulasi rasio throughput (Rx/Tx).
- **Sistem Tema Dark & Light Mode**:
  - Menggunakan DaisyUI v5 dengan tema `beeradius` (*Telemetry Dark Glass*) dan `beeradius-light` (*Clinical NOC Precision*).
  - Preferensi disimpan di `localStorage` melalui [ThemeProvider.tsx](file:///c:/Users/feldy/Downloads/Project/beeradius-RSUP/src/components/ThemeProvider.tsx).
  - Komponen [ThemeToggle.tsx](file:///c:/Users/feldy/Downloads/Project/beeradius-RSUP/src/components/ThemeToggle.tsx) diletakkan di Navbar kanan atas dan bagian bawah Sidebar.
  - Script inline `ThemeLoaderScript` di [layout.tsx](file:///c:/Users/feldy/Downloads/Project/beeradius-RSUP/src/app/layout.tsx) mencegah *flash of unstyled content* (FOUC) saat halaman dimuat ulang.
- **Halaman Manajemen Switch & VLAN Discovery (`/switches`)**:
  - Deteksi otomatis brand & model perangkat (Ruijie Networks, ZTE, TP-Link, Cisco Systems, Huawei, MikroTik) berdasarkan `sysObjectID` (Enterprise PEN) dan regex `sysDescr`.
  - Pemindaian VLAN dan keanggotaan port (*Access / Untagged* vs *Trunk / Tagged*) mendukung:
    - **Standar RFC 2674 (Q-BRIDGE-MIB)** via algoritma dekode bitmask port (`decodePortBitmap` di [snmp.ts](file:///c:/Users/feldy/Downloads/Project/beeradius-RSUP/src/lib/snmp.ts)).
    - **TP-Link JetStream Private MIB (`TPLINK-DOT1Q-VLAN-MIB` OID `1.3.6.1.4.1.11863.6.14.1.2.1.1`)** dengan normalisasi nomor port fisik dan parsing range port (`1/0/1-12`).
    - **Cisco Catalyst VTP & VMPS MIB (`CISCO-VTP-MIB` & `CISCO-VLAN-MEMBERSHIP-MIB`)**.
  - Menyediakan modal interaktif: *Detail VLAN & Port Matrix* (visual grid port 1..24/48 dengan status OperStatus Up/Down dan PVID), *Uji Cepat Probe SNMP*, serta aksi *Scan Ulang SNMP* real-time.

### 5. Keamanan, Validasi & Best Practices
- **Middleware**: Middleware di `src/middleware.ts` melindungi semua rute kecuali `/login`, `/api` (beberapa API endpoint melakukan pengecekan session secara internal), dan file statis.
- **Password**: Gunakan `bcrypt` untuk password admin di tabel `admin`. Untuk password RADIUS di `radcheck`, dukung format `Cleartext-Password`, `MD5-Password`, atau `SHA1-Password` sesuai kebutuhan server RADIUS.
- **CSV Sanitization (CWE-1236)**: Pada fitur ekspor CSV (`/api/radius/users/export-csv`), pastikan sel yang berawalan formula (`=`, `+`, `-`, `@`) disanitasi guna mencegah *CSV Formula Injection*.
- **Paginasi & Sorting**: Waspadai *in-memory sorting* pada data hasil paginasi database (`take`/`skip`) untuk field yang tidak berada di satu tabel yang sama agar urutan data tetap konsisten antar halaman.

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
