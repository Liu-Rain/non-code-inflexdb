import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    //host: '0.0.0.0',
    host: "frontend", // node container in docker
    port: 4000,
    origin: 'http://localhost:5173', // exposed node container address
  },
})
