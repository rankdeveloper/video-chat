import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const api = env.VITE_API_URL || "http://localhost:3030";

  return {
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
  };
});
