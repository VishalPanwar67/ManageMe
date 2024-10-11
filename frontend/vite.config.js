import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8000,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000", // Ensure this matches your backend server URL
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""), // Remove "/api" prefix
      },
    },
  },
});
