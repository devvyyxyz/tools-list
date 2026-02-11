import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Use a relative base by default so built assets are resolved relative
  // to the current URL. This makes the same build work for project pages
  // (username.github.io/repo) and custom domains.
  base: process.env.VITE_BASE_PATH || './',
  plugins: [react()],
})
