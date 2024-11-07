import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import jsConfigPaths from 'vite-jsconfig-paths'
// const baseUrl = import.meta.env.VITE_SERVER_URL
// if (!baseUrl) throw new Error("Server baseUrl not specified")

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), jsConfigPaths()],
  server: {
    proxy: {
      // Basic proxy configuration
      '/api': {
        target: "http://localhost:3000", // Your backend server URL
        changeOrigin: true,
        secure: false,
        // Optionally remove /api prefix when forwarding to the backend
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  }
})
