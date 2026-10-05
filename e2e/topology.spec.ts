import { test, expect } from '@playwright/test';
import * as path from 'path';

const ADMIN_USER = process.env.ADMIN_USERNAME || 'simrs';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 's1r50370';

test.describe('Fitur Pemetaan Topologi Jaringan (/topology)', () => {
  test('Halaman topologi dapat dibuka dan merender kanvas interaktif perangkat', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // 1. Login sebagai admin
    await page.goto('/login');
    await page.getByPlaceholder('Username').fill(ADMIN_USER);
    await page.getByPlaceholder('Password').fill(ADMIN_PASS);
    await page.getByRole('button', { name: /Masuk|Login/i }).click();
    await page.waitForURL((url) => !url.pathname.includes('/login'), { timeout: 15000 });

    // 2. Akses halaman topologi
    await page.goto('/topology');
    await page.waitForLoadState('domcontentloaded');

    // 3. Verifikasi elemen UI utama kanvas
    await expect(page.getByText('LIVE MAP')).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('button', { name: /Tambah Perangkat/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Hubungkan Port/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Import Switch/i })).toBeVisible();

    // Verifikasi perangkat dummy sudah tidak ada di kanvas
    await expect(page.getByText('R-CORE-CCR2004')).toBeHidden();
    await expect(page.getByText('SW-CORE-24G')).toBeHidden();

    // Verifikasi tombol Sinkron Perangkat
    const syncBtn = page.getByRole('button', { name: /Sinkron Perangkat/i });
    await expect(syncBtn).toBeVisible();

    // Buka modal sinkronisasi switch
    await syncBtn.click();
    await expect(page.getByText('Sinkronisasi Perangkat Jaringan')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('SNMP / PING')).toBeVisible();

    // Tunggu hasil diff selesai dimuat
    await page.waitForResponse(
      (resp) => resp.url().includes('/api/network/topology/sync-switches') && resp.status() === 200,
      { timeout: 10000 }
    ).catch(() => {});
    await page.waitForTimeout(1000);

    // Screenshot modal sinkronisasi switch
    const modalPath = path.join(process.cwd(), 'screenshots', 'dark', '18b-modal-sinkronisasi-switch.png');
    await page.screenshot({ path: modalPath, fullPage: true });

    // Tutup modal
    await page.getByRole('button', { name: 'Batalkan', exact: true }).click();
    await expect(page.getByText('Sinkronisasi Perangkat Jaringan')).toBeHidden();

    // 4. Ambil screenshot topologi kanvas dalam Dark Mode
    const darkPath = path.join(process.cwd(), 'screenshots', 'dark', '18-topologi-jaringan-rsud-ntb.png');
    await page.screenshot({ path: darkPath, fullPage: true });

    // 5. Ubah ke Light Mode dan ambil screenshot
    await page.evaluate(() => {
      localStorage.setItem('theme', 'beeradius-light');
      document.documentElement.setAttribute('data-theme', 'beeradius-light');
    });
    await page.waitForTimeout(600);

    const lightPath = path.join(process.cwd(), 'screenshots', 'light', '18-topologi-jaringan-rsud-ntb.png');
    await page.screenshot({ path: lightPath, fullPage: true });

    console.log('✅ Screenshot topologi berhasil disimpan di screenshots/dark dan screenshots/light');
  });

  test('Halaman switch & perangkat jaringan mendukung multi-perangkat dan metode koneksi', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // 1. Login sebagai admin
    await page.goto('/login');
    await page.getByPlaceholder('Username').fill(ADMIN_USER);
    await page.getByPlaceholder('Password').fill(ADMIN_PASS);
    await page.getByRole('button', { name: /Masuk|Login/i }).click();
    await page.waitForURL((url) => !url.pathname.includes('/login'), { timeout: 15000 });

    // 2. Akses halaman switches
    await page.goto('/switches');
    await page.waitForLoadState('domcontentloaded');

    // 3. Verifikasi judul dan filter kategori perangkat
    await expect(page.getByText('Manajemen Perangkat Jaringan')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Semua Perangkat')).toBeVisible();
    await expect(page.getByRole('button', { name: /Router/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /NVR & CCTV/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Server/i })).toBeVisible();

    // Screenshot halaman switches dengan filter multi-perangkat
    const switchesPath = path.join(process.cwd(), 'screenshots', 'dark', '17-manajemen-switches-multi-device.png');
    await page.screenshot({ path: switchesPath, fullPage: true });

    // 4. Buka modal tambah perangkat
    const addBtn = page.getByRole('button', { name: /Tambah Perangkat/i });
    await expect(addBtn).toBeVisible();
    await addBtn.click();

    // Verifikasi form memiliki field Jenis Perangkat dan Metode Koneksi
    await expect(page.getByText('Tambah Perangkat Jaringan Baru')).toBeVisible();
    await expect(page.getByText('Jenis Perangkat', { exact: false })).toBeVisible();
    await expect(page.getByText('Metode Koneksi', { exact: false })).toBeVisible();

    // Screenshot modal tambah perangkat baru multi-metode
    const addModalPath = path.join(process.cwd(), 'screenshots', 'dark', '17b-modal-tambah-perangkat-koneksi.png');
    await page.screenshot({ path: addModalPath, fullPage: true });

    // Tutup modal
    await page.getByRole('button', { name: 'Batal', exact: true }).click();
  });
});
