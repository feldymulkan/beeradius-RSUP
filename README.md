# BeeRadius v1.0.0 — RSUD NTB Network & RADIUS Management System

BeeRadius adalah platform enterprise berbasis web untuk manajemen server FreeRADIUS, pemantauan perangkat infrastruktur jaringan (Switch, Router, NVR CCTV, Access Point, Server SIMRS), dan pemetaan topologi jaringan interaktif secara real-time yang dikembangkan untuk RSUD NTB.

Dibangun dengan arsitektur modern **Next.js 15 App Router (Turbopack)**, **Prisma ORM (MySQL)**, **TypeScript**, dan **DaisyUI v5**, BeeRadius dirancang untuk menghadirkan keandalan tinggi, telemetri live, serta estetika visual premium baik dalam mode gelap (*Telemetry Dark Glass*) maupun mode terang (*Clinical NOC Precision*).

---

## 🚀 Fitur Utama (Release v1.0.0)

### 1. 🌐 Pemetaan Topologi Jaringan Cerdas & Auto-Discovery (`/topology`)
- **⚡ Engine Deteksi Bentuk Topologi (*One-Click Auto-Discovery*)**:
  - Menganalisis seluruh perangkat di database dan mengklasifikasikan posisinya secara otomatis ke dalam arsitektur hierarkis 3-Tier/4-Tier standar rumah sakit (Core Router -> Core Switch -> Access Switch -> Endpoints AP/CCTV).
  - **Zero-Crossing Sub-Grid**: Endpoints (Access Point, NVR) ditata rapi dalam sub-grid 2-kolom langsung di bawah switch induk, melenyapkan garis kabel horizontal yang saling bertumpukan.
  - **Auto-Wiring Cerdas**: Otomatis menghubungkan jalur fiber optik 10G antar Core, VLAN Trunk 802.1Q antar switch, dan PoE ke AP menggunakan port fisik riil (`sfp-sfpplus1`, `Gi0/24`, dll).
- **Kanvas Interaktif Real-Time**: Visualisasi node perangkat dan pengkabelan interaktif dengan kontrol zoom (25% - 200%), fit-to-view, pan, drag-and-drop node, serta kabel halus berteknologi *badge culling* saat zoom-out.
- **Sinkronisasi Perangkat Fisik (`🔄 Sinkron Perangkat`)**: Terintegrasi langsung dengan database fisik (`SwitchDevice`) via modal diffing interaktif dengan proteksi kabel eksisting (*Preserve Existing Edges*).
- **Pengkabelan Multi-Standar**:
  - 🔵 **Fiber Optic SFP+ (10G)**
  - 🟢 **UTP Cat6 Gigabit (1G)**
  - 🟡 **PoE (NVR CCTV / Access Point)**
  - 🟣 **VLAN Trunk 802.1Q**
- **Drawer Telemetri Lengkap (`DeviceDetailsDrawer.tsx`)**: Menampilkan spesifikasi perangkat, status port matrix riil (Up/Down, PVID), daftar VLAN tagged/untagged, dan ringkasan kabel aktif.
- **Tata Letak Bebas Tumpang Tindih (Zero-Overlap Layout)**: Toolbar responsif adaptif memastikan judul, filter jenis perangkat, dan tombol aksi tertata rapi tanpa saling menimpa.

### 2. 🔌 Manajemen Perangkat Jaringan Lengkap (`/devices`)
- **Dukungan Multi-Perangkat Komprehensif**:
  - 🔀 **Switch Managed** (Ruijie Networks, Cisco Catalyst, TP-Link JetStream, ZTE, Huawei)
  - 🌐 **Router Gateway** (MikroTik RouterOS CCR/RB/CRS/hEX, Cisco)
  - 📶 **Access Point & Wireless Home Router** (Ruijie Reyee Cloud ~304+ unit)
  - 📹 **NVR & IP Camera Surveillance**
  - 🖥️ **Server SIMRS & Database**
  - 🛡️ **Firewall & Security Appliance**
- **Multi-Metode Koneksi**:
  - `cloud`: Ruijie Cloud Northbound REST API untuk sinkronisasi otomatis ratusan Access Point dan Home Router.
  - `snmp`: SNMP v1 / v2c / v3 untuk pembacaan MIB VLAN, nama port riil, dan link status.
  - `ping`: ICMP Keepalive untuk monitoring latensi dan status online perangkat non-SNMP.
  - `api`: RouterOS API / REST API untuk sinkronisasi router cerdas.
  - `manual`: Registrasi statis untuk inventarisasi pasif.
- **Diferensiasi Status Jaringan (3 Status Presisi)**:
  - 🟢 **Online**: SNMP & ICMP Ping aktif normal.
  - 🟡 **Offline SNMP (Ping OK)**: Perangkat hidup dan merespon ping, namun agen SNMP timeout atau port 161 terblokir.
  - 🔴 **Offline (Host Down)**: Perangkat mati total atau link kabel putus.
- **Sistem Pemantauan Status Otomatis 5 Menit (Background Poller)**:
  - Berjalan otomatis via hook Next.js 15 `instrumentation.ts` tanpa dependensi cron eksternal.
  - Tersedia runner mandiri CLI `npm run poll:devices` untuk integrasi crontab server Linux.
- **Single-Row Unified Filter Toolbar**:
  - Tata letak responsif `xl:flex-row` menyatukan form pencarian dengan filter Brand, Koneksi, Status, dan tombol Reset dalam satu baris rapi.

### 3. 👥 Manajemen Pengguna RADIUS (Hotspot & VPN)
- **Modul Hotspot & VPN Terpadu**:
  - Halaman terpisah dan terpadu untuk user Hotspot dan VPN (L2TP/IPSec, WireGuard, PPP).
  - Tampilan **Single-Row Unified Dark Glass Toolbar** dengan pencarian stabil (tanpa race condition) dan filter dinamis.
  - Panduan konfigurasi manual VPN langkah-demi-langkah untuk Windows, macOS, dan Linux.
  - Form pembuatan user layout 2-kolom terpadu (Stitch UI/UX) dengan live generator password dan meter kekuatan sandi.
  - Pelacakan admin pembuat akun (`createdBy`).
- **Import & Export CSV**:
  - Import massal via Modal Dialog Interaktif dengan deteksi duplikasi dan parsing cerdas.
  - Ekspor CSV berstandar keamanan tinggi dengan sanitasi formula injection (CWE-1236).

### 4. ⚡ Monitoring Online Real-Time & Auto Stale Session Killer
- Pemantauan pengguna aktif, durasi online, throughput Rx/Tx, dan IP address secara real-time.
- Filter sesi cerdas: **Semua**, **Aktif**, dan **Sesi Gantung (Stale Sessions)**.
- **Pembersihan Massal (*Clear Stale Sessions*)**: Membersihkan sesi gantung (sesi tanpa interim-update >15 menit) dalam satu kali klik.
- Pemutusan koneksi instan (*Disconnect Session*) via sinyal RADIUS Pod/DM.

### 5. 📊 Laporan, Analitik & Telemetri Wi-Fi Ruijie Cloud (`/reports`)
- **Telemetri Wi-Fi Ruijie Cloud Live**:
  - Terintegrasi langsung dengan Ruijie Cloud Northbound RESTful API.
  - Memantau ~3.900+ klien aktif real-time di seluruh gedung RSUD NTB.
  - Status kesehatan ~304 Access Point dan 6 Home Router Reyee.
  - Grafik analitik 4-grid: Kepadatan Klien per Gedung, Top 8 SSID, Donut Spektrum Radio (5 GHz vs 2.4 GHz), dan Top AP Load.
  - Tabel klien Wi-Fi live (Hostname, MAC, IP, SSID, AP Lokasi, RSSI, Unduh/Unggah, Durasi).
- **FreeRADIUS Performance Metrics**:
  - 4 Kartu KPI: Total Download, Total Upload, User Aktif Harian, dan Auth Rejects.
  - Grafik interaktif Recharts dengan *dual-gradient fill* dan dark glass tooltip.
  - Pemilih rentang waktu mikro (*24j | 7h | 30h | 1t*).

### 6. 🛡️ Modul Perangkat RADIUS (`/nas`)
- Manajemen client FreeRADIUS resmi dengan antarmuka yang ramah pengguna.
- Konfigurasi NAS IP, Shared Secret, Shortname, Tipe NAS, dan Deskripsi Lokasi.

### 7. 🎨 Sistem Tema Ganda & Shimmer Skeleton
- **Telemetry Dark Glass** (`beeradius`): Nuansa dark blue futuristik untuk ruang NOC (*Network Operations Center*).
- **Clinical NOC Precision** (`beeradius-light`): Nuansa terang, bersih, dan berlatar kontras tinggi untuk ruangan beriluminasi tinggi.
- **Universal Shimmer Skeleton (`Skleton.tsx`)**: Transisi pemuatan data yang halus dan profesional di seluruh halaman.

---

## 🛠️ Teknologi & Arsitektur

| Komponen | Teknologi |
|---|---|
| **Framework** | Next.js 15 (App Router, Turbopack) |
| **Bahasa** | TypeScript 5+ |
| **ORM & Database** | Prisma ORM 6 & MySQL Server |
| **Autentikasi** | NextAuth.js v4 (RBAC: `superadmin` & `admin`) |
| **Styling & Theme** | Tailwind CSS 4 & DaisyUI 5 |
| **Network Telemetry** | `net-snmp` (v1/v2c SNMP Poller & MIB Parser) |
| **Visualisasi Topologi** | Custom SVG Reactive Canvas Engine |
| **Grafik & Analitik** | Recharts 2 |
| **Testing** | Playwright E2E Suite |

---

## 📋 Prasyarat Sistem

- **Node.js**: Versi 20.x atau terbaru.
- **Database**: MySQL 8.x atau MariaDB 10.x.
- **RADIUS Engine**: FreeRADIUS 3.x terkonfigurasi dengan modul `rlm_sql` MySQL.
- **Akses Jaringan**: Konektivitas UDP port 161 (SNMP) ke perangkat switch/router yang dipantau.

---

## ⚙️ Instalasi & Menjalankan Aplikasi

1. **Clone Repositori**:
   ```bash
   git clone https://github.com/feldymulkan/beeradius-RSUP.git
   cd beeradius-RSUP
   ```

2. **Instal Dependensi**:
   ```bash
   npm install
   ```

3. **Konfigurasi Environment (`.env`)**:
   Salin `.env.example` atau buat file `.env` baru:
   ```env
   DATABASE_URL="mysql://radius_user:radius_pass@localhost:3306/radius"
   NEXTAUTH_SECRET="buat-kunci-rahasia-acak-32-karakter"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Generate Prisma Client & Migrasi**:
   ```bash
   npx prisma generate
   # Opsional: Jika inisialisasi awal skema tabel custom
   # npx prisma db push
   ```

5. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) pada browser Anda.

6. **Menjalankan Pengujian E2E (Playwright)**:
   ```bash
   npm run test:e2e
   ```

---

## 📖 Panduan Integrasi Perangkat

Untuk panduan mendetail tentang cara menghubungkan Switch (Cisco, Ruijie, TP-Link), Router MikroTik, NVR CCTV, Server, dan Access Point ke dalam sistem BeeRadius hingga muncul pada topologi jaringan, silakan baca:
👉 **[PANDUAN_KONEKSI_PERANGKAT.md](file:///c:/Users/feldy/Downloads/Project/beeradius-RSUP/PANDUAN_KONEKSI_PERANGKAT.md)**

---

## 📁 Struktur Direktori

```text
beeradius/
├── prisma/
│   └── schema.prisma            # Skema Prisma (Tabel RADIUS + Custom Models)
├── src/
│   ├── app/
│   │   ├── (protected)/         # Halaman terlindungi (Dashboard, Topologi, Devices, Reports, Users, dll)
│   │   ├── api/                 # API Route Handlers (Devices, SNMP, Topology Sync, Ruijie Cloud, RADIUS)
│   │   ├── globals.css          # Desain sistem tokens & Topo Canvas CSS Variables
│   │   ├── instrumentation.ts   # Next.js Server Hook untuk Background Poller 5 Menit
│   │   └── layout.tsx           # Layout dasar & Theme Loader
│   ├── components/
│   │   ├── topology/            # Komponen Kanvas Topologi, Modal Sync, Drawer & Kabel
│   │   ├── DataTable.tsx        # Tabel dinamis modular dengan filter & paginasi
│   │   ├── Skleton.tsx          # Shimmer skeleton loader adaptif terpadu
│   │   ├── ThemeToggle.tsx      # Pengalih tema instan (Dark/Light)
│   │   └── ...                  # Komponen UI spesifik (UserForm, ReportClient, dll)
│   ├── lib/
│   │   ├── prisma.ts            # Prisma Database Client Singleton
│   │   ├── ruijie.ts            # Client Ruijie Cloud Northbound RESTful API
│   │   ├── devicePolling.ts     # Multi-perangkat Concurrent Poller & ICMP Ping
│   │   ├── topologyAutoDetect.ts# Hierarchical 3-Tier/4-Tier Auto-Discovery Engine
│   │   ├── snmp.ts              # Driver SNMP, MIB OID Scanner, Port Bitmask Decoder
│   │   └── utils.ts             # BigInt Serializer, Format Bytes, Format Date
│   └── types/                   # Definisi tipe TypeScript
├── scripts/
│   └── poll-devices.js          # CLI background device poller untuk cron server Linux
└── e2e/                         # Test suite Playwright untuk E2E & visual regression
```

---

## 📄 Lisensi & Pemeliharaan

Dikembangkan dan dipelihara oleh Tim SIRS & IT RSUD NTB.
Versi Rilis: **1.0.0** (Oktober 2026).
