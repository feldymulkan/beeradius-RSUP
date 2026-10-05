# 📘 Panduan Lengkap: Menghubungkan Perangkat Jaringan ke BeeRadius

Panduan ini ditujukan bagi administrator sistem dan tim Network Operations Center (NOC) RSUD NTB untuk mendaftarkan, menguji, dan menyinkronkan seluruh perangkat infrastruktur jaringan (Switch Managed, Router MikroTik, NVR CCTV, Server SIMRS, Access Point, dan Firewall) ke dalam sistem **BeeRadius v1.0.0**.

---

## 📑 Daftar Isi
1. [Arsitektur & Metode Koneksi](#1-arsitektur--metode-koneksi)
2. [Menghubungkan Switch Managed (Cisco, Ruijie, TP-Link)](#2-menghubungkan-switch-managed-cisco-ruijie-tp-link)
3. [Menghubungkan Router Gateway MikroTik](#3-menghubungkan-router-gateway-mikrotik)
4. [Menghubungkan NVR & IP Camera CCTV](#4-menghubungkan-nvr--ip-camera-cctv)
5. [Menghubungkan Server SIMRS & Database](#5-menghubungkan-server-simrs--database)
6. [Menghubungkan Access Point (AP) & Wireless Controller](#6-menghubungkan-access-point-ap--wireless-controller)
7. [Melakukan Sinkronisasi ke Kanvas Topologi Jaringan](#7-melakukan-sinkronisasi-ke-kanvas-topologi-jaringan)
8. [Menghubungkan Kabel Antar-Perangkat di Topologi](#8-menghubungkan-kabel-antar-perangkat-di-topologi)
9. [Troubleshooting & Diagnostik](#9-troubleshooting--diagnostik)

---

## 1. Arsitektur & Metode Koneksi

Sistem BeeRadius mendukung 4 metode koneksi yang fleksibel sesuai kemampuan perangkat:

| Metode Koneksi | Protokol / Port | Perangkat yang Direkomendasikan | Informasi yang Diperoleh |
|---|---|---|---|
| **SNMP (v1/v2c/v3)** | UDP `161` | Switch Managed, Router, Server Linux | Status Online, Uptime, Nama Port Riil, Status Link (Up/Down), Speed, PVID, dan Keanggotaan VLAN (Tagged/Untagged). |
| **PING (ICMP)** | ICMP Echo | NVR, IP Camera, Server Pasif, Dumb Switch | Status Online/Offline, Response Time Latency (ms), Uptime Tracking. |
| **API** | TCP `8728` / HTTP `80` | Router MikroTik RouterOS, Controller AP | Resource CPU, RAM, Active Leases, Interface Traffic. |
| **MANUAL** | - | Rak Server, Patch Panel, Perangkat Non-IP | Dokumentasi inventaris dan penataan diagram topologi. |

---

## 2. Menghubungkan Switch Managed (Cisco, Ruijie, TP-Link)

Switch Managed adalah perangkat utama yang mendukung pembacaan otomatis port fisik dan pemetaan VLAN 802.1Q.

### Langkah 2.1: Aktifkan SNMP pada Perangkat Switch

#### A. Cisco Catalyst (IOS / IOS-XE)
Masuk ke terminal switch (Console / SSH / Telnet):
```bash
configure terminal
# Aktifkan SNMP Read-Only Community
snmp-server community rsudntb RO
# Buka akses port SNMP ke IP Server BeeRadius (contoh: 10.1.8.10)
snmp-server host 10.1.8.10 version 2c rsudntb
# Aktifkan informasi VLAN MIB
snmp-server enable traps
exit
write memory
```

#### B. Ruijie Networks / Reyee Managed Switch
Masuk ke Web GUI atau CLI Ruijie:
```bash
enable
configure terminal
snmp-server enable
snmp-server community rsudntb ro
write
```
*Atau via Web GUI:* Masuk ke **System** > **SNMP** > Aktifkan **SNMP Agent** > Tambahkan Community `rsudntb` dengan permission **Read Only**.

#### C. TP-Link JetStream (T2600 / SG3428 / SG3452)
Masuk ke Web GUI TP-Link:
1. Buka menu **SNMP** > **Global Config** > Centang **Enable SNMP**.
2. Buka submenu **Community Config** > Klik **Add**:
   - Community Name: `rsudntb`
   - Access Mode: `read-only`
   - MIB View: `all`
3. Klik **Apply** dan simpan konfigurasi (**Save Config**).

---

### Langkah 2.2: Input Switch ke BeeRadius

1. Buka dashboard BeeRadius, pilih menu **Perangkat Jaringan** pada sidebar (`/switches`).
2. Klik tombol **"+ Tambah Perangkat"** di pojok kanan atas.
3. Isi formulir pendaftaran:
   - **Tipe Perangkat**: Pilih `Switch Managed`.
   - **Metode Koneksi**: Pilih `SNMP (v1/v2c)`.
   - **Nama Perangkat**: Contoh `Switch-Core-IGD` atau `SW-Lantai2-Bedah`.
   - **Alamat IP**: Masukkan IP Management Switch (contoh: `10.1.8.2`).
   - **SNMP Port**: `161` (default).
   - **SNMP Version**: `v2c`.
   - **SNMP Community**: Masukkan community string yang telah disetting (contoh: `rsudntb`).
   - **Brand & Model**: Masukkan brand (Ruijie/Cisco/TP-Link) atau kosongkan untuk auto-detect.
   - **Lokasi / Rack**: Contoh `Ruang Server Gedung IGD Lt. 1, Rack A`.
4. Klik **"Simpan & Test Koneksi"**.
5. Sistem akan langsung melakukan probe SNMP. Jika sukses, data port riil (1..24/48) dan daftar VLAN akan otomatis terindeks!

---

## 3. Menghubungkan Router Gateway MikroTik

Router MikroTik dapat dipantau statusnya via SNMP untuk link status dan interface bandwidth.

### Langkah 3.1: Konfigurasi SNMP di MikroTik RouterOS
Buka **WinBox** atau terminal SSH MikroTik:
```routeros
/snmp community
add name=rsudntb addresses=10.1.8.0/24 read-access=yes

/snmp
set enabled=yes contact="NOC RSUD NTB" location="Data Center" trap-version=2
```

### Langkah 3.2: Daftarkan di BeeRadius
1. Buka menu **Perangkat Jaringan** > **"+ Tambah Perangkat"**.
2. Pilih Tipe Perangkat: **Router Gateway**.
3. Pilih Metode Koneksi: **SNMP** atau **API**.
4. Masukkan IP Router (contoh: `10.1.8.1`), Port `161`, dan Community `rsudntb`.
5. Klik **"Simpan & Test Koneksi"**.

---

## 4. Menghubungkan NVR & IP Camera CCTV

Sistem BeeRadius v1.0.0 mendukung pemantauan NVR (Network Video Recorder) dan IP CCTV untuk monitoring keamanan RSUD NTB.

1. Buka menu **Perangkat Jaringan** > **"+ Tambah Perangkat"**.
2. Pilih Tipe Perangkat: **NVR (CCTV)** atau **IP Camera CCTV**.
3. Pilih Metode Koneksi:
   - Pilih **PING (ICMP Keepalive)** jika NVR tidak mengaktifkan SNMP.
   - Pilih **SNMP** jika NVR mendukung SNMP (misal Hikvision/Dahua enterprise).
4. Masukkan IP NVR (contoh: `10.1.50.10`).
5. Masukkan Lokasi: Contoh `Ruang Satpam / Security Center Gedung Utama`.
6. Klik **"Simpan Perangkat"**.

---

## 5. Menghubungkan Server SIMRS & Database

1. Buka menu **Perangkat Jaringan** > **"+ Tambah Perangkat"**.
2. Pilih Tipe Perangkat: **Server Aplikasi / Database**.
3. Pilih Metode Koneksi: **SNMP** atau **PING (ICMP)**.
4. Masukkan IP Server SIMRS (contoh: `10.1.10.5`).
5. Masukkan Lokasi: `Data Center RSUD NTB, Rack Server 01`.
6. Klik **"Simpan Perangkat"**.

---

## 6. Menghubungkan Access Point (AP) & Wireless Controller

1. Buka menu **Perangkat Jaringan** > **"+ Tambah Perangkat"**.
2. Pilih Tipe Perangkat: **Access Point (AP)**.
3. Masukkan IP AP atau IP Wireless Controller (contoh: `10.1.30.2`).
4. Pilih Metode Koneksi: **SNMP** atau **PING**.
5. Masukkan Lokasi: Contoh `Poli Rawat Jalan Lt. 1`.
6. Klik **"Simpan Perangkat"**.

---

## 7. Melakukan Sinkronisasi ke Kanvas Topologi Jaringan

Setelah semua perangkat terdaftar pada menu Perangkat Jaringan, langkah selanjutnya adalah memunculkannya ke diagram interaktif Topologi Jaringan:

1. Buka menu **Topologi Jaringan** pada sidebar (`/topology`).
2. Perhatikan tombol **"🔄 Sinkron Perangkat"** di toolbar kanan atas:
   - Jika terdapat switch atau perangkat baru, tombol akan menampilkan badge angka (misal: `[+2 Baru]`).
3. Klik tombol **"🔄 Sinkron Perangkat"**.
4. Modal **Sinkronisasi Perangkat Jaringan** akan terbuka:
   - Anda dapat melihat tab filter: **Semua**, **Perlu Ditambahkan (Baru)**, **Perlu Update**, dan **Tersinkron**.
   - Setiap switch menampilkan detail: Nama, IP, Brand/Model, jumlah port fisik riil, dan status koneksi saat ini.
   - Pastikan opsi **"Pertahankan kabel koneksi yang sudah digambar (Preserve Existing Edges)"** tercentang.
5. Klik **"Pilih Semua"** atau centang perangkat yang diinginkan.
6. Klik tombol **"Sinkronkan (N) Perangkat Terpilih"**.
7. Kanvas topologi akan otomatis memuat perangkat baru dengan posisi kartu rapi di kanvas!

---

## 8. Menghubungkan Kabel Antar-Perangkat di Topologi

Setelah perangkat muncul di topologi, Anda dapat memetakan pengkabelan riil:

1. Klik tombol **"Hubungkan Kabel"** di toolbar atas atau klik tombol **"Link"** pada kartu switch asal.
2. Modal **"Hubungkan Port Jaringan"** akan terbuka:
   - **Perangkat Asal**: Pilih perangkat dan port fisik asal (contoh: `Switch-Core-IGD` port `1/0/24 (SFP+)`).
   - **Perangkat Tujuan**: Pilih perangkat dan port fisik tujuan (contoh: `SW-Lantai2-Bedah` port `1/0/24 (SFP+)`).
   - **Tipe Kabel**:
     - Pilih **Fiber Optic SFP+ (10G)** untuk koneksi backbone fiber.
     - Pilih **UTP Cat6 Gigabit (1G)** untuk koneksi LAN tembaga.
     - Pilih **PoE (NVR CCTV / Access Point)** untuk perangkat yang diberi daya via kabel LAN.
     - Pilih **VLAN Trunk 802.1Q** untuk link distribusi trunking.
3. Klik **"Hubungkan Kabel"**.
4. Garis kabel interaktif akan langsung terhubung di kanvas lengkap dengan badge tipe kabel!
5. Untuk melihat rincian kabel atau memutuskan kabel:
   - Klik kartu perangkat untuk membuka **Drawer Detail Telemetri**.
   - Pada tab **"Ringkasan & Kabel"**, Anda dapat melihat seluruh kabel aktif dan menghapusnya jika terjadi perubahan topologi fisik.

---

## 9. Troubleshooting & Diagnostik

| Gejala Masalah | Kemungkinan Penyebab | Solusi |
|---|---|---|
| **Probe SNMP Gagal / Timeout** | 1. IP switch salah atau tidak terjangkau dari server.<br/>2. Community string tidak cocok.<br/>3. Firewall switch memblokir port UDP 161. | 1. Coba lakukan ping IP switch dari terminal server: `ping 10.1.8.2`.<br/>2. Pastikan community string di switch dan di form BeeRadius sama persis (case-sensitive).<br/>3. Gunakan fitur **"Uji Probe SNMP"** di halaman `/switches` untuk testing cepat. |
| **Port Matrix Menampilkan 0 Port** | Switch belum mendukung RFC 1213 / RFC 2674 standar. | Pastikan OID `1.3.6.1.2.1.2.2.1.1` (ifIndex) dapat diakses. Di BeeRadius, sistem menyediakan fallback standar 24 port jika SNMP tidak mengembalikan daftar interface. |
| **VLAN Tidak Terdeteksi** | Switch menggunakan Private Vendor MIB yang belum aktif. | Untuk TP-Link JetStream, pastikan modul 802.1Q VLAN diaktifkan. Untuk Cisco, pastikan mode switchport bukan switch default unmanaged. |
| **Kabel Hilang Setelah Sinkronisasi** | Opsi preservasi kabel tidak dicentang. | Selalu pastikan opsi *Preserve Existing Edges* tercentang pada modal sinkronisasi switch. |
| **Tampilan Buram / Kontras Rendah** | Browser cache tema lama. | Klik tombol alih tema (*ThemeToggle*) di pojok kanan atas untuk beralih antara Mode Gelap (`beeradius`) dan Terang (`beeradius-light`). |

---

*Panduan resmi BeeRadius v1.0.0 — Dikeluarkan oleh Instalasi SIRS & IT RSUD NTB (Oktober 2026).*
