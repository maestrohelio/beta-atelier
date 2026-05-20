import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/admin-proxy': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/admin-proxy/, ''),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id) return undefined
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('react-router-dom')) {
            return 'react-vendor'
          }
          if (id.includes('framer-motion')) return 'motion'
          if (id.includes('@supabase/supabase-js')) return 'supabase'
          return undefined
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
