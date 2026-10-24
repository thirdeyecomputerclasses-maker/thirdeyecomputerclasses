import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const norm = id.replace(/\\/g, '/');
          if (norm.includes('/node_modules/')) {
            // 1. Heavy 3D / Graphics engines (lazy on demand)
            if (norm.includes('/node_modules/three/')) {
              return 'three-vendor';
            }
            if (norm.includes('/node_modules/matter-js/')) {
              return 'matter-vendor';
            }
            if (norm.includes('/node_modules/ogl/')) {
              return 'ogl-vendor';
            }
            if (norm.includes('/node_modules/gsap/')) {
              return 'gsap-vendor';
            }
            // 2. Authentication & Security
            if (norm.includes('/node_modules/@clerk/')) {
              return 'clerk-vendor';
            }
            // 3. Animation
            if (norm.includes('/node_modules/framer-motion/') || norm.includes('/node_modules/motion/')) {
              return 'framer-motion';
            }
            // 4. Icons
            if (norm.includes('/node_modules/lucide-react/') || norm.includes('/node_modules/react-icons/')) {
              return 'icons';
            }
            // 5. Minimal React Runtime Core
            if (
              norm.includes('/node_modules/react/') ||
              norm.includes('/node_modules/react-dom/') ||
              norm.includes('/node_modules/react-router/') ||
              norm.includes('/node_modules/react-router-dom/') ||
              norm.includes('/node_modules/scheduler/')
            ) {
              return 'react-core';
            }
            // 6. UI Helpers
            if (norm.includes('/node_modules/@base-ui/') || norm.includes('/node_modules/class-variance-authority/')) {
              return 'ui-vendor';
            }
            // 7. Other shared libraries
            return 'vendor';
          }
        },
      },
    },
  },
})
