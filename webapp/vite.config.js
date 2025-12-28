import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Faster refresh for Safari
      fastRefresh: true,
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'Alpha Quant Academy',
        short_name: 'AQA',
        description: 'Master Python for Quantitative Finance',
        theme_color: '#2563eb',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              }
            }
          }
        ]
      }
    })
  ],
  build: {
    target: 'es2020', // Better Safari compatibility
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      output: {
        // Aggressive code splitting for faster initial load
        manualChunks: (id) => {
          // React core - load immediately
          if (id.includes('react-dom') || id.includes('react/')) {
            return 'react'
          }
          // Framer Motion - lazy load
          if (id.includes('framer-motion')) {
            return 'motion'
          }
          // Icons - lazy load
          if (id.includes('lucide-react')) {
            return 'icons'
          }
          // State management
          if (id.includes('zustand')) {
            return 'state'
          }
        }
      }
    },
    // Reduce chunk size warnings
    chunkSizeWarningLimit: 500,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['framer-motion'] // Lazy load this
  },
  // Faster dev server
  server: {
    warmup: {
      clientFiles: ['./src/App.jsx', './src/components/Hero.jsx', './src/components/Navigation.jsx']
    }
  }
})
