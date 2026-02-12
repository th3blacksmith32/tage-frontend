import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      'noncruciform-tomirailwayless.ngrok-free.dev',
      'noncruciform-tomi-railwayless.ngrok-free.dev'
    ]
  }
})
