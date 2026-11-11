import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative base keeps the build portable: it works at a domain root and
  // under a GitHub Pages project path such as /ramayana/.
  base: './',
  plugins: [react()],
})
