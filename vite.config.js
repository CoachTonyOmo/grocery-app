import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // IMPORTANT: Change 'grocery-app' below to match your GitHub repository name exactly
  base: '/grocery-app/',
  build: {
    outDir: 'dist',
  },
})
