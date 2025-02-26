import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const backendUrl = process.env.BACKEND_URL ?? '';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': backendUrl,
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
