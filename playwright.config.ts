import { defineConfig, devices } from '@playwright/test';

/**
 * Konfigurasi Playwright E2E Testing untuk BeeRadius
 * Mendukung pengujian Next.js App Router (Next.js 15)
 */
export default defineConfig({
  testDir: './e2e',
  /* Jalankan tes dalam file secara paralel */
  fullyParallel: true,
  /* Gagal di CI jika ada test.only yang tidak sengaja tertinggal */
  forbidOnly: !!process.env.CI,
  /* Retry hanya di CI untuk stabilitas */
  retries: process.env.CI ? 2 : 0,
  /* Batasi worker di lokal jika diperlukan */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter format */
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],
  use: {
    /* Base URL aplikasi Next.js */
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000',

    /* Kumpulkan trace saat retry pertama pada kegagalan */
    trace: 'on-first-retry',

    /* Ambil screenshot saat ada test gagal */
    screenshot: 'only-on-failure',

    /* Rekam video jika gagal */
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Hubungkan otomatis ke Next.js dev server jika belum menyala */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120000,
  },
});
