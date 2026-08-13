import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: 'html',

  use: {
    baseURL: 'https://api.restful-api.dev',
  },
});