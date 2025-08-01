import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: 'localhost',
    hmr: {
      port: 5174,
      host: 'localhost'
    },
    // Если проблемы с WebSocket продолжаются, раскомментируйте следующую строку:
    // hmr: false,
    proxy: {
      // Прокси для API запросов чтобы обойти CORS в разработке
      '/api': {
        target: 'https://api.dimbopizza.ru',
        changeOrigin: true,
        secure: true,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (_proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      }
    }
  }
})
