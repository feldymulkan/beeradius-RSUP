import { test, expect } from '@playwright/test';

test.describe('Autentikasi & Halaman Login', () => {
  test('harus otomatis redirect ke /login saat mengakses rute terproteksi tanpa sesi', async ({ page }) => {
    // Coba akses root URL atau /radius-users yang diproteksi middleware
    await page.goto('/');
    await expect(page).toHaveURL(/.*login/);
  });

  test('halaman login menampilkan elemen branding dan form dengan benar', async ({ page }) => {
    await page.goto('/login');

    // Branding RSUD NTB & BeeRadius
    await expect(page.locator('h1')).toContainText('BeeRadius');
    await expect(page.getByText('RSUD NTB · RADIUS Management')).toBeVisible();

    // Input form
    const usernameInput = page.getByPlaceholder('Username');
    const passwordInput = page.getByPlaceholder('Password');
    const submitBtn = page.getByRole('button', { name: /Masuk|Login/i });

    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitBtn).toBeVisible();
  });

  test('menampilkan notifikasi error saat kredensial salah dimasukkan', async ({ page }) => {
    await page.goto('/login');

    await page.getByPlaceholder('Username').fill('user_salah_test');
    await page.getByPlaceholder('Password').fill('password_ngawur_123');
    await page.getByRole('button', { name: /Masuk|Login/i }).click();

    // Verifikasi pesan error muncul
    const errorAlert = page.getByText(/Username atau password salah/i);
    await expect(errorAlert).toBeVisible({ timeout: 10000 });
  });
});
