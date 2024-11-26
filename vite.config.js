import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from'vite-plugin-mkcert'
// https://vite.dev/config/
export default defineConfig({
  server: true,
  base: "./",
  build: {
    target: "es2022",
  },
  esbuild: {
    target: "es2022",
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "es2022",
    },
  },
  plugins: [react(), mkcert()],
});
