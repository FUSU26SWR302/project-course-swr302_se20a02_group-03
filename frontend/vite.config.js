import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/swp391-su26-ai-audit-project-swp391_se20a02_group-03/',
  server: {
    watch: {
      // Exclude Visual Studio lock files to prevent EBUSY errors
      ignored: ['**/.vs/**'],
    },
  },
})
