import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { defineConfig as defineTestConfig, mergeConfig } from 'vitest/config'

export default mergeConfig(
  defineConfig({
    plugins: [react()],
  }),
  defineTestConfig({
    test: {
      browser: {
        enabled: true,
        provider: 'playwright',
        name: 'chromium',
        headless: true
      },
    }
  })
)
