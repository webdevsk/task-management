import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import jsConfigPaths from 'vite-jsconfig-paths'
// const baseUrl = import.meta.env.VITE_SERVER_URL
// if (!baseUrl) throw new Error("Server baseUrl not specified")
const configure = (proxy, _options) => {
  proxy.on('error', (err, _req, _res) => {
    console.log('proxy error', err)
  })
  proxy.on('proxyReq', (proxyReq, req, _res) => {
    console.log('Sending Request to the Target:', req.method, req.url)
  })
  proxy.on('proxyRes', (proxyRes, req, _res) => {
    console.log('Received Response from the Target:', proxyRes.statusCode, req.url)
  })
}
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), jsConfigPaths()],
  // server: {
  //   proxy: {
  //     // Basic proxy configuration
  //     '/api': {
  //       target: "http://localhost:3000", // Your backend server URL
  //       changeOrigin: true,
  //       secure: false,
  //       // Optionally remove /api prefix when forwarding to the backend
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //       configure,

  //     },
  //   }
  // },
  // build: {
  //   proxy: {
  //     // Basic proxy configuration
  //     '/api': {
  //       target: "https://task-management-bp2j.onrender.com", // Your backend server URL
  //       changeOrigin: true,
  //       secure: false,
  //       rewrite: (path) => path.replace(/^\/api/, ''),

  //       configure,

  //     },
  //   }
  // }
})
