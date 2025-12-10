import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
// import fs from "fs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: true,
    /* https: {
      key: fs.readFileSync("./cert/192.168.1.6-key.pem"),
      cert: fs.readFileSync("./cert/192.168.1.6.pem"),
    }, */
    host: "0.0.0.0",
  },
});
