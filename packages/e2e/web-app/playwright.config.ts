import { defineConfig } from '@playwright/test'

const baseURL = 'http://localhost:5173'

export default defineConfig({
  fullyParallel: true,
  use: {
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'e2e',
      testDir: '../../web-app/src',
      testMatch: '**/*.e2e.ts',
      use: { baseURL },
    },
    {
      name: 'components',
      testDir: '../..',
      testMatch: '**/*.ct.ts',
      // `mount` renders a story on the gallery page, which the web app's dev server serves.
      use: { baseURL: `${baseURL}/playwright/gallery/index.html`, reuseContext: true },
    },
  ],
  webServer: {
    command: 'npm run dev',
    cwd: '../../..',
    url: baseURL,
    reuseExistingServer: true,
  },
})
