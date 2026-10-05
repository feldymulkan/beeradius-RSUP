import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Fitur Audit Log (/audit-log)', () => {
  test('Halaman audit log menampilkan nama admin dan detail aksi dengan benar', async ({ page }) => {
    // 1. Login sebagai superadmin
    await page.goto('/login');
    await page.getByPlaceholder('Username').fill('simrs');
    await page.getByPlaceholder('Password').fill('s1r50370');
    await page.getByRole('button', { name: /Masuk|Login/i }).click();
    await page.waitForURL((url) => !url.pathname.includes('/login'), { timeout: 15000 });

    // 2. Akses halaman audit-log
    await page.goto('/audit-log');
    await page.waitForLoadState('domcontentloaded');

    // 3. Verifikasi judul dan elemen tabel
    await expect(page.getByRole('heading', { name: /Audit Log/i })).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Waktu')).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Admin', exact: true })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Aksi', exact: true })).toBeVisible();

    // 4. Verifikasi bahwa nama admin terlihat (tidak kosong / tidak hanya '-')
    // Harus ada setidaknya satu entri 'simrs' atau 'system'
    const adminCell = page.locator('table tbody tr td').filter({ hasText: /simrs|system/i }).first();
    await expect(adminCell).toBeVisible({ timeout: 8000 });

    // 5. Verifikasi bahwa dropdown admin terisi opsi admin
    const adminSelect = page.locator('select[name="admin"]');
    await expect(adminSelect).toBeVisible();
    const adminOptions = adminSelect.locator('option');
    const optionsCount = await adminOptions.count();
    expect(optionsCount).toBeGreaterThan(1);

    // 6. Ambil screenshot dalam tema Dark
    const darkPath = path.join(process.cwd(), 'screenshots', 'dark', '19-audit-log.png');
    await page.screenshot({ path: darkPath, fullPage: true });

    // 7. Ganti ke Light Mode dan screenshot
    const themeBtn = page.locator('button[aria-label="Toggle theme"], button:has-text("Dark"), button:has-text("Light")').first();
    if (await themeBtn.isVisible()) {
      await themeBtn.click();
      await page.waitForTimeout(500);
      const lightPath = path.join(process.cwd(), 'screenshots', 'light', '19-audit-log.png');
      await page.screenshot({ path: lightPath, fullPage: true });
    }
  });
});
