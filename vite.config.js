import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
   
    VitePWA({
      registerType: "autoUpdate",
      devOptions: { enabled: true },
      manifest: {
        name: "Movies",
        short_name: "Movies",
        description: "Movies app",
        theme_color: "#111827",
        background_color: "#111827",
        display: "standalone",
        start_url: "/",
        icons: [
          { src: "/pwa-192.png", sizes: "192x192", type: "image/png" },
          { src: "/pwa-512.png", sizes: "512x512", type: "image/png" },
          { src: "/pwa-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "any maskable" }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.themoviedb\.org\/3\//,
            handler: "NetworkFirst",
            options: { cacheName: "tmdb-api", networkTimeoutSeconds: 4 }
          },
          {
            urlPattern: /^https:\/\/image\.tmdb\.org\//,
            handler: "CacheFirst",
            options: {
              cacheName: "tmdb-images",
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 14 }
            }
          }
        ]
      }
    }),
  ],navigateFallback: "/index.html"
});
