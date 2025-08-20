// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/EduTrackr',
  server: {
    proxy: {
      '/api': {
        target: 'https://api.quotable.io',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''), // remove "/api" before sending
      },
    },
  },
})
