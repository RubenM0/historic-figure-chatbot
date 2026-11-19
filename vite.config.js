import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //add a proxy for the backend to connect to the frontend
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
})