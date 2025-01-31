import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // Use Render's dynamic PORT environment variable, fal lback to 3000 in local development
    port:3000,
    host: "0.0.0.0", // Listen on all network interfaces, necessary for cloud deployments like Render
  },
});