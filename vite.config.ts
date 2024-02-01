import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2}"],
      },
      manifest: {
        lang: "ru",
        name: 'Preferans the Game',
        short_name: 'Preferans',
        description: 'Preferans card game for from 3 to 4 players',
        background_color: "#f2f2f2",
        theme_color: "#f2f2f2",
        display: "standalone",
        icons: [
          {
            src: "img/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: 'maskable'
          },
          {
            src: "img/icons/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "img/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
