import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const api = "http://localhost:3030";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": api,
      "/socket.io": {
        target: api,
        ws: true,
        changeOrigin: true,
      },
      "/peerjs": {
        target: api,
        ws: true,
        changeOrigin: true,
      },
    },
  },
});
