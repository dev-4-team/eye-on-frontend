import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tsconfigPaths()],
    base: env.VITE_APP_BASE_URL || './',
    build: {
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            const name = assetInfo.name ?? ''
            let extType = name.split('.').at(1) ?? 'unknown'
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = 'img'
            }
            return `assets/${extType}/[name]-[hash][extname]`
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
        },
      },
    },
    // Define environment variables for the app
    define: {
      'process.env': env,
    },
  }
})
