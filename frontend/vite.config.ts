import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import adonisjs from "@adonisjs/vite/client";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    adonisjs({
      entrypoints: [],
    }),
  ],
  resolve: {
    alias: {
      '#models': path.resolve(__dirname, '../backend/app/models'),
    },
  },
});
