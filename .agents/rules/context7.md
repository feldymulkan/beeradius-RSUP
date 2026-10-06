# Panduan Penggunaan Context7 MCP (Mode Hemat Kuota / Free-Tier)

Tujuan aturan ini adalah menjaga kuota Free Tier API Context7 dan token LLM agar tidak cepat habis, dengan memprioritaskan pengecekan lokal terlebih dahulu.

## 1. Urutan Prioritas Pencarian (Hierarchy of Information)
1. **Prioritas 1 (Gratis & Instan): Kode Lokal & TypeScript Definitions (`node_modules`)**
   - Sebelum memanggil tool eksternal, periksa tipe data (`.d.ts`) di `node_modules/@types`, `@prisma/client`, `net-snmp`, dsb.
   - Periksa pola implementasi yang sudah ada di codebase BeeRadius (`src/`).
2. **Prioritas 2 (Gratis): Panduan Proyek (`GEMINI.md`)**
   - Rujuk standar arsitektur dan konvensi tim di `GEMINI.md`.
3. **Prioritas 3 (Context7 - Mode Hemat)**:
   - HANYA panggil Context7 jika:
     a. Terdapat breaking change atau API baru (Next.js 15, React 19, Tailwind v4, DaisyUI v5, Prisma 6) yang tidak terpecahkan lewat tipe lokal.
     b. User secara eksplisit meminta ("cek via Context7", "lihat docs resmi", dll).

## 2. Larangan Pemanggilan Context7 (DILARANG KERAS)
- DILARANG memanggil untuk sintaks standar JavaScript/TypeScript (array methods, Promise, regex).
- DILARANG memanggil untuk business logic RSUD NTB, skema database RADIUS, atau routing internal.
- DILARANG memanggil jika jawaban sudah jelas dari file lokal atau contoh di komponen lain.

## 3. Strategi Hemat Kuota 50% (Bypass `resolve-library-id`)
- Jangan panggil `resolve-library-id` jika library ID sudah diketahui secara umum. Langsung gunakan format library ID Context7 di `query-docs`:
  - Next.js: `/vercel/next.js`
  - Tailwind CSS: `/tailwindlabs/tailwindcss`
  - DaisyUI: `/saadeghi/daisyui`
  - Prisma: `/prisma/prisma`
  - Recharts: `/recharts/recharts`
- Buat kueri yang spesifik dan terfokus (maksimal 1-2 panggilan per topik).
