import { defineConfig } from 'vite'
import { defineConfig as defineTestConfig, mergeConfig } from 'vitest/config'

export default mergeConfig(
  defineConfig({
    define: { // exclude tests in production
      'import.meta.vitest': 'undefined',
    },
  }),
  defineTestConfig({
    test: {
      includeSource: ['src/**/*.{js,ts}'],
    },
  })
)
