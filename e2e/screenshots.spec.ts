import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Kredensial default admin RSUD NTB
const ADMIN_USER = process.env.ADMIN_USERNAME || 'simrs';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 's1r50370';

// Pemetaan Screen & Flow Program sesuai spesifikasi Stitch UI/UX (Project: 11664402237923345950)
interface ScreenFlowItem {
  id: string;
  name: string;
  stitchTitle: string;
  path: string;
  requiresAuth: boolean;
  category: 'core' | 'management' | 'monitoring' | 'system';
  customInteraction?: (page: any) => Promise<void>;
}

const screenFlows: ScreenFlowItem[] = [
  // 1. Authentication & Security Gateway
  {
    id: '01-login-portal',
    name: '01-login-portal-security-gateway',
    stitchTitle: 'Login Portal & Security Gateway',
    path: '/login',
    requiresAuth: false,
    category: 'core',
  },
  // 2. NOC Overview & Live Telemetry
  {
    id: '02-noc-dashboard',
    name: '02-noc-overview-dashboard',
    stitchTitle: 'BeeRadius RSUP NOC Overview Dashboard',
    path: '/',
    requiresAuth: true,
    category: 'core',
  },
  // 3. User Management - Hotspot (Single-Row Unified Dark Glass Toolbar)
  {
    id: '03-users-hotspot',
    name: '03-manajemen-pengguna-hotspot',
    stitchTitle: 'Manajemen Pengguna Hotspot',
    path: '/radius-users/type/hotspot',
    requiresAuth: true,
    category: 'management',
  },
  // 3b. Interactive Flow: Modal Import User CSV
  {
    id: '03b-modal-import-users',
    name: '03b-flow-modal-import-users',
    stitchTitle: 'Flow: Modal Import User CSV Dialog',
    path: '/radius-users',
    requiresAuth: true,
    category: 'management',
    customInteraction: async (page) => {
      const importBtn = page.getByRole('button', { name: /Import CSV|Import/i });
      if (await importBtn.isVisible()) {
        await importBtn.click();
        await page.waitForTimeout(600);
      }
    },
  },
  // 4. User Management - VPN
  {
    id: '04-users-vpn',
    name: '04-manajemen-pengguna-vpn',
    stitchTitle: 'Manajemen Pengguna VPN',
    path: '/radius-users/type/vpn',
    requiresAuth: true,
    category: 'management',
  },
  // 5. Form Tambah User Hotspot - 2-Kolom Stitch Standard
  {
    id: '05-form-tambah-hotspot',
    name: '05-form-tambah-user-hotspot-2kolom',
    stitchTitle: 'Form Tambah User Hotspot (2-Kolom Stitch UI/UX)',
    path: '/radius-users/create/hotspot',
    requiresAuth: true,
    category: 'management',
  },
  // 6. Form Tambah User VPN - 2-Kolom Stitch Standard
  {
    id: '06-form-tambah-vpn',
    name: '06-form-tambah-user-vpn-2kolom',
    stitchTitle: 'Form Tambah User VPN (Alokasi IP & Spec)',
    path: '/radius-users/create/vpn',
    requiresAuth: true,
    category: 'management',
  },
  // 7. Online Sessions & Stale Session Monitoring
  {
    id: '07-online-sessions',
    name: '07-pengguna-online-stale-sessions',
    stitchTitle: 'Pengguna Online & Pemantauan Sesi',
    path: '/radius-users/online/hotspot',
    requiresAuth: true,
    category: 'monitoring',
  },
  // 8. Network Analytics & Reports (Telemetry Dark Glass & Recharts)
  {
    id: '08-laporan-analitik',
    name: '08-laporan-analitik-jaringan',
    stitchTitle: 'Laporan & Analitik Jaringan (KPI & Telemetry)',
    path: '/reports',
    requiresAuth: true,
    category: 'monitoring',
  },
  // 9. Hardware Switch & VLAN Discovery (Port Matrix & Probe)
  {
    id: '09-switches-vlan',
    name: '09-switch-vlan-discovery',
    stitchTitle: 'Switch & VLAN Discovery (Port Matrix MIB)',
    path: '/switches',
    requiresAuth: true,
    category: 'monitoring',
  },
  // 9b. Interactive Flow: Modal Port Matrix Switch
  {
    id: '09b-modal-port-matrix',
    name: '09b-flow-modal-port-matrix',
    stitchTitle: 'Flow: Modal Detail Port Matrix Switch',
    path: '/switches',
    requiresAuth: true,
    category: 'monitoring',
    customInteraction: async (page) => {
      // Cari tombol aksi port / detail switch jika ada baris switch
      const detailBtn = page.getByRole('button', { name: /Port Matrix|Detail|Lihat/i }).first();
      if (await detailBtn.isVisible()) {
        await detailBtn.click();
        await page.waitForTimeout(600);
      }
    },
  },
  // 09c. Interactive Network Topology Map
  {
    id: '09c-network-topology',
    name: '18-topologi-jaringan-rsud-ntb',
    stitchTitle: 'Topologi Jaringan Terintegrasi (Router, Switch, NVR, AP)',
    path: '/topology',
    requiresAuth: true,
    category: 'monitoring',
  },
  // 10. WireGuard VPN Peer Management
  {
    id: '10-vpn-wireguard',
    name: '10-vpn-wireguard-peers',
    stitchTitle: 'WireGuard VPN & Client Config',
    path: '/vpn-wireguard',
    requiresAuth: true,
    category: 'management',
  },
  // 11. WiFi Management RSUD NTB
  {
    id: '11-wifi-rsud',
    name: '11-wifi-management-rsud-ntb',
    stitchTitle: 'WiFi Internal RSUD NTB',
    path: '/wifi',
    requiresAuth: true,
    category: 'management',
  },
  // 12. IP Pools Management
  {
    id: '12-ip-pools',
    name: '12-radius-ip-pools',
    stitchTitle: 'Radius IP Pools & Subnet Allocation',
    path: '/radius-pools',
    requiresAuth: true,
    category: 'system',
  },
  // 13. Audit Log Activity
  {
    id: '13-audit-log',
    name: '13-audit-log-security',
    stitchTitle: 'Audit Log & Activity Records',
    path: '/audit-log',
    requiresAuth: true,
    category: 'system',
  },
  // 14. NAS (Network Access Server)
  {
    id: '14-nas',
    name: '14-nas-network-access-servers',
    stitchTitle: 'NAS Gateways & RADIUS Clients',
    path: '/nas',
    requiresAuth: true,
    category: 'system',
  },
  // 15. Settings MikroTik Router API
  {
    id: '15-settings-mikrotik',
    name: '15-settings-mikrotik-api',
    stitchTitle: 'MikroTik Router API Configuration',
    path: '/settings/mikrotik',
    requiresAuth: true,
    category: 'system',
  },
  // 16. Admin RBAC Management
  {
    id: '16-admin-rbac',
    name: '16-settings-admin-rbac',
    stitchTitle: 'Admin Access Control & Roles',
    path: '/settings/admin/manage',
    requiresAuth: true,
    category: 'system',
  },
  // 17. Help & Operational Manual
  {
    id: '17-help-docs',
    name: '17-panduan-help-operasional',
    stitchTitle: 'Panduan Operasional & Dokumentasi NOC',
    path: '/help',
    requiresAuth: true,
    category: 'system',
  },
];

const themes = [
  { name: 'dark', themeName: 'beeradius', label: 'Dark Mode (Telemetry Dark Glass)' },
  { name: 'light', themeName: 'beeradius-light', label: 'Light Mode (Clinical NOC Precision)' },
];

test.describe('Stitch UI/UX Automated Screenshot Suite', () => {
  // Waktu timeout 6 menit untuk menangkap seluruh screen dalam 2 tema + modal interactions
  test.setTimeout(360000);

  test('Tangkap seluruh screen & flow program sesuai Stitch (Dark & Light Mode)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    const baseDir = path.join(process.cwd(), 'screenshots');
    const darkDir = path.join(baseDir, 'dark');
    const lightDir = path.join(baseDir, 'light');

    fs.mkdirSync(darkDir, { recursive: true });
    fs.mkdirSync(lightDir, { recursive: true });

    // 1. Eksekusi untuk masing-masing tema
    for (const themeConfig of themes) {
      console.log(`\n========================================`);
      console.log(`🎨 MEMULAI PENGAMBILAN TEMA: ${themeConfig.label.toUpperCase()}`);
      console.log(`========================================\n`);

      const targetDir = path.join(baseDir, themeConfig.name);

      // A. Buka login sebelum ada sesi (pastikan tema diset)
      console.log(`📸 [${themeConfig.name}] Menangkap: 01-login-portal-security-gateway`);
      await page.goto('/login', { waitUntil: 'domcontentloaded' });
      await page.evaluate((theme) => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
      }, themeConfig.themeName);
      await page.waitForTimeout(500);

      const loginPath = path.join(targetDir, '01-login-portal-security-gateway.png');
      await page.screenshot({ path: loginPath, fullPage: true });

      // B. Login ke akun admin
      console.log(`🔐 Login sebagai admin (${ADMIN_USER}) untuk sesi ${themeConfig.name}...`);
      await page.getByPlaceholder('Username').fill(ADMIN_USER);
      await page.getByPlaceholder('Password').fill(ADMIN_PASS);
      await page.getByRole('button', { name: /Masuk|Login/i }).click();

      // Tunggu hingga berhasil masuk
      await page.waitForURL((url) => !url.pathname.includes('/login'), { timeout: 15000 });
      console.log(` Berhasil login untuk tema ${themeConfig.name}.`);

      // C. Loop seluruh flow screen terproteksi
      for (const item of screenFlows) {
        if (!item.requiresAuth) continue;

        console.log(`📸 [${themeConfig.name}] Menangkap: [${item.name}] -> ${item.path}`);
        try {
          await page.goto(item.path, { waitUntil: 'domcontentloaded', timeout: 20000 });

          // Pastikan tema diterapkan konsisten di setiap halaman
          await page.evaluate((theme) => {
            localStorage.setItem('theme', theme);
            document.documentElement.setAttribute('data-theme', theme);
          }, themeConfig.themeName);

          // Jalankan interaksi flow jika ada (misal membuka modal)
          if (item.customInteraction) {
            try {
              await item.customInteraction(page);
            } catch (err: any) {
              console.warn(`  ℹ️ Custom interaction untuk ${item.name} dilewati:`, err.message);
            }
          }

          // Tunggu render grafik dan transisi
          await page.waitForTimeout(800);

          const outputPath = path.join(targetDir, `${item.name}.png`);
          await page.screenshot({ path: outputPath, fullPage: true });

          expect(fs.existsSync(outputPath)).toBeTruthy();
        } catch (err: any) {
          console.error(`⚠️ Gagal menangkap ${item.name}:`, err.message);
        }
      }

      // Logout atau clear cookies agar tema berikutnya mulai bersih
      await page.context().clearCookies();
    }

    // 2. Buat File Index Gallery HTML Interaktif (Side-by-Side Comparison)
    const galleryHtml = generateGalleryHtml(screenFlows);
    const galleryPath = path.join(baseDir, 'index.html');
    fs.writeFileSync(galleryPath, galleryHtml, 'utf-8');
    console.log(`\n🎉 Gallery perbandingan UI tersimpan di: ${galleryPath}`);
  });
});

function generateGalleryHtml(items: ScreenFlowItem[]): string {
  const rows = items.map((item) => {
    return `
      <div class="screen-card">
        <div class="screen-header">
          <div class="screen-title-badge">
            <span class="category-tag ${item.category}">${item.category.toUpperCase()}</span>
            <h3>${item.stitchTitle}</h3>
          </div>
          <span class="route-badge"><code>${item.path}</code></span>
        </div>
        <div class="comparison-grid">
          <div class="preview-box dark-box">
            <div class="theme-header">
              <span class="theme-indicator dark-dot"></span>
              <strong>Dark Mode</strong> (Telemetry Dark Glass)
            </div>
            <a href="dark/${item.name}.png" target="_blank" title="Klik untuk membuka ukuran penuh">
              <img src="dark/${item.name}.png" alt="${item.name} Dark" loading="lazy" />
            </a>
          </div>
          <div class="preview-box light-box">
            <div class="theme-header">
              <span class="theme-indicator light-dot"></span>
              <strong>Light Mode</strong> (Clinical NOC Precision)
            </div>
            <a href="light/${item.name}.png" target="_blank" title="Klik untuk membuka ukuran penuh">
              <img src="light/${item.name}.png" alt="${item.name} Light" loading="lazy" />
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BeeRadius RSUP - Stitch UI/UX Alignment Gallery</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0b1326;
      --card-bg: rgba(19, 27, 46, 0.7);
      --card-border: rgba(56, 189, 248, 0.15);
      --primary: #38bdf8;
      --primary-hover: #0284c7;
      --text: #f8fafc;
      --text-muted: #94a3b8;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: 'Inter', sans-serif;
      padding: 32px 24px;
      line-height: 1.5;
    }
    .container { max-width: 1600px; margin: 0 auto; }
    .header {
      margin-bottom: 40px;
      border-bottom: 1px solid var(--card-border);
      padding-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-wrap: wrap;
      gap: 16px;
    }
    .header h1 {
      font-size: 28px;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: #fff;
    }
    .header p { color: var(--text-muted); font-size: 14px; margin-top: 4px; }
    .stats-badge {
      background: rgba(56, 189, 248, 0.1);
      border: 1px solid rgba(56, 189, 248, 0.3);
      padding: 8px 16px;
      border-radius: 6px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      color: var(--primary);
    }
    .screen-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 8px;
      margin-bottom: 32px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(12px);
    }
    .screen-header {
      padding: 16px 20px;
      background: rgba(11, 19, 38, 0.8);
      border-bottom: 1px solid var(--card-border);
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }
    .screen-title-badge { display: flex; align-items: center; gap: 12px; }
    .screen-title-badge h3 { font-size: 16px; font-weight: 600; color: #fff; }
    .category-tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      padding: 3px 8px;
      border-radius: 4px;
      font-weight: 600;
    }
    .category-tag.core { background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); }
    .category-tag.management { background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); }
    .category-tag.monitoring { background: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3); }
    .category-tag.system { background: rgba(139, 92, 246, 0.15); color: #a78bfa; border: 1px solid rgba(139, 92, 246, 0.3); }
    .route-badge code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      color: #94a3b8;
      background: rgba(0, 0, 0, 0.3);
      padding: 4px 8px;
      border-radius: 4px;
    }
    .comparison-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      padding: 16px;
    }
    @media (max-width: 1024px) {
      .comparison-grid { grid-template-columns: 1fr; }
    }
    .preview-box {
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 6px;
      overflow: hidden;
      background: #000;
    }
    .dark-box { border-color: rgba(56, 189, 248, 0.2); }
    .light-box { border-color: rgba(255, 255, 255, 0.2); }
    .theme-header {
      padding: 10px 14px;
      font-size: 12px;
      font-weight: 500;
      color: #cbd5e1;
      background: rgba(255, 255, 255, 0.03);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .theme-indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;
    }
    .dark-dot { background: #38bdf8; box-shadow: 0 0 6px #38bdf8; }
    .light-dot { background: #f8fafc; box-shadow: 0 0 6px #f8fafc; }
    .preview-box a { display: block; overflow: hidden; }
    .preview-box img {
      width: 100%;
      height: auto;
      display: block;
      transition: transform 0.2s ease;
    }
    .preview-box img:hover { transform: scale(1.01); }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div>
        <h1>BeeRadius RSUP · Visual UI/UX Stitch Alignment</h1>
        <p>Perbandingan real-time hasil implementasi UI aktif (Dark & Light Mode) dengan spesifikasi Stitch Design System</p>
      </div>
      <div class="stats-badge">
        Total: ${items.length} Screens & Interactive Flows
      </div>
    </div>
    <div class="screens-container">
      ${rows}
    </div>
  </div>
</body>
</html>`;
}
