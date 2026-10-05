# Stitch UI/UX Design System Specification (v1.0.0)
## BeeRadius — RSUD NTB Network & RADIUS Management System

Dokumen ini merangkum spesifikasi desain antarmuka (UI), prinsip pengalaman pengguna (UX), sistem token, tata letak kanvas topologi bebas tumpang tindih, serta pedoman kontras tinggi untuk mode gelap (*Telemetry Dark Glass*) dan mode terang (*Clinical NOC Precision*).

---

## 1. Fondasi Desain & Sistem Warna

BeeRadius v1.0.0 mengadopsi standar **Dual-Theme High Contrast Precision**:

### 1.1 Palet Warna & Token Semantik
| Token Semantik | Tema Gelap (`beeradius`) | Tema Terang (`beeradius-light`) | Penggunaan |
|---|---|---|---|
| `--color-base-100` | `#0b1326` (Dark Navy Glass) | `#ffffff` (Pure White) | Kartu utama, drawer, modal dialog |
| `--color-base-200` | `#101935` | `#f1f5f9` (Slate 100) | Secondary surface, input container, table hover |
| `--color-base-300` | `#1e293b` (Slate 800) | `#e2e8f0` (Slate 200) | Border divider, separator kabel |
| `--color-primary` | `#38bdf8` (Cyan Aksen) | `#0284c7` (Deep Cyan) | Tombol aksi utama, tautan aktif, kabel fiber |
| `--color-secondary` | `#818cf8` (Indigo Glow) | `#4f46e5` (Deep Indigo) | Badge kategori, aksen sekunder |
| `text-base-content` | `#f8fafc` (Slate 50) | `#0f172a` (Slate 900) | Teks judul utama, teks tabel penting |
| `text-base-content/80`| `#cbd5e1` (Slate 300) | `#334155` (Slate 700) | Teks sekunder, label formulir |
| `text-base-content/60`| `#94a3b8` (Slate 400) | `#64748b` (Slate 500) | Subtitle, metadata, keterangan port |

### 1.2 Aturan Kontras Aksesibilitas (WCAG 2.1 AA)
- ❌ **Dilarang Keras**: Menggunakan utility class `text-white`, `text-slate-100`, `text-slate-200`, atau `text-slate-300` secara langsung tanpa pembungkus yang memiliki latar belakang gelap permanen. Pada tema terang, teks tersebut kehilangan kontras dan menjadi tidak terbaca.
- ✅ **Wajib**: Selalu gunakan token DaisyUI `text-base-content` dengan variasi opacity (`/80`, `/70`, `/60`).

---

## 2. Kanvas Topologi Jaringan (`/topology`)

### 2.1 CSS Variables Adaptif Kanvas
Kanvas SVG dan grid beradaptasi otomatis terhadap tema aktif melalui variabel CSS di `src/app/globals.css`:
```css
[data-theme="beeradius"] {
  --topo-canvas-bg: #070b15;
  --topo-grid-color: rgba(56, 189, 248, 0.12);
  --topo-cable-bg: #0b1326;
  --topo-cable-text: #f8fafc;
}

[data-theme="beeradius-light"] {
  --topo-canvas-bg: #f1f5f9;
  --topo-grid-color: rgba(37, 99, 235, 0.15);
  --topo-cable-bg: #ffffff;
  --topo-cable-text: #0f172a;
}
```

### 2.2 Tata Letak Toolbar Kanvas Bebas Tumpang Tindih (Zero Overlap Layout)
Untuk mencegah elemen judul tertimpa tombol filter atau aksi pada layar menengah (tablet/laptop):
```tsx
<div className="min-h-14 py-2 px-4 border-b border-base-300 bg-base-100/90 backdrop-blur-md flex flex-wrap xl:flex-nowrap items-center justify-between gap-3 shrink-0">
  {/* 1. Title Block (Fixed width & no shrink) */}
  <div className="flex items-center gap-3 shrink-0 min-w-[200px]">
    ...
  </div>

  {/* 2. Device Type Filter Pills (Horizontal scrollable & auto-wrap) */}
  <div className="flex items-center gap-1.5 overflow-x-auto shrink-0 py-0.5">
    ...
  </div>

  {/* 3. Action Controls (Zoom, Auto-Layout, Sync, Import) */}
  <div className="flex items-center gap-2 flex-wrap shrink-0">
    ...
  </div>
</div>
```

### 2.3 Standar Visual Pengkabelan (Cable Semantics)
| Tipe Kabel | Warna Garis | Kegunaan Standar RSUD NTB |
|---|---|---|
| **Fiber Optic SFP+** | `#38bdf8` (Cyan Neon) | Backbone antar-core switch & server farm (10 Gbps) |
| **UTP Cat6 Gigabit** | `#10b981` (Emerald) | Distribusi access switch & work area (1 Gbps) |
| **PoE (Power over Ethernet)** | `#f59e0b` (Amber) | Power & data NVR CCTV dan Access Point |
| **VLAN Trunk 802.1Q** | `#a855f7` (Purple) | Uplink inter-VLAN trunking |

---

## 3. Komponen Modal Diffing Sinkronisasi (`SwitchSyncModal.tsx`)

### 3.1 Status Chip & Klasifikasi
- 🟢 **Switch Baru (`NEW`)**: Switch terdaftar di tabel `SwitchDevice` namun belum ada di topologi. Sistem akan menghitung posisi grid baru otomatis.
- 🟡 **Perlu Update (`NEEDS_UPDATE`)**: IP, status online, atau konfigurasi port berubah.
- ⚪ **Tersinkron (`SYNCED`)**: Spesifikasi node topologi identik dengan data fisik SNMP.

### 3.2 Opsi Proteksi Kabel (`Preserve Existing Edges`)
- Checkbox default **Aktif**: Menjamin kabel koneksi yang telah dihubungkan admin antar-perangkat tidak akan terhapus saat pembaruan port matrix dilakukan.

---

## 4. Drawer Telemetri Perangkat (`DeviceDetailsDrawer.tsx`)

Struktur drawer samping kanan (lebar `w-96` hingga `w-[420px]`):
1. **Header**: Nama perangkat, icon tipe, IP address, tombol close.
2. **Telemetry Grid**: Status (Online/Offline), Brand & Model, Lokasi, Uptime.
3. **Tab Navigation**:
   - **Ringkasan & Kabel**: Daftar kabel yang tersambung ke port perangkat ini beserta aksi hapus kabel.
   - **Port Matrix SNMP**: Grid status port fisik (Up/Down) dengan PVID dan kecepatan link.
   - **VLAN Discovered**: Daftar seluruh VLAN tagged dan untagged yang terdeteksi via SNMP.

---

## 5. Ringkasan Komponen UI & Lokasi File

- **Kanvas Topologi**: [TopologyCanvas.tsx](file:///c:/Users/feldy/Downloads/Project/beeradius-RSUP/src/components/topology/TopologyCanvas.tsx)
- **Modal Diffing Sinkronisasi**: [SwitchSyncModal.tsx](file:///c:/Users/feldy/Downloads/Project/beeradius-RSUP/src/components/topology/SwitchSyncModal.tsx)
- **Drawer Detail Telemetri**: [DeviceDetailsDrawer.tsx](file:///c:/Users/feldy/Downloads/Project/beeradius-RSUP/src/components/topology/DeviceDetailsDrawer.tsx)
- **Katalog Perangkat Multi-Tipe**: [switches/page.tsx](file:///c:/Users/feldy/Downloads/Project/beeradius-RSUP/src/app/(protected)/switches/page.tsx)
- **Driver SNMP & MIB Parser**: [snmp.ts](file:///c:/Users/feldy/Downloads/Project/beeradius-RSUP/src/lib/snmp.ts)
- **Engine Sinkronisasi API**: [sync-switches/route.ts](file:///c:/Users/feldy/Downloads/Project/beeradius-RSUP/src/app/api/network/topology/sync-switches/route.ts)
