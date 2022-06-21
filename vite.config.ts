import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3001/'
    }
  },
  plugins: [
    react(),
    tsconfigPaths() // https://github.com/aleclarson/vite-tsconfig-paths
  ]
})
