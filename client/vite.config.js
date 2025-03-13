import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "Intelligent fridge",
        short_name: "Fridge",
        description: "A Vite + React Progressive Web App",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "/icons/fridge-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/fridge-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      devOptions: {
        enabled: true, // Fejlesztői módban is működjön
      },
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});
