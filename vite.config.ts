import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { metaImagesPlugin } from "./vite-plugin-meta-images";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    tailwindcss(),
    metaImagesPlugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    target: "es2020",
    sourcemap: false,
    chunkSizeWarningLimit: 3000,
    cssMinify: "esbuild",
    minify: "esbuild",
    modulePreload: false,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("node_modules/lucide-react")) return "icons";
          if (id.includes("node_modules/@radix-ui") || id.includes("node_modules/framer-motion") || id.includes("node_modules/@tanstack")) return "vendor";
        },
      },
    },
  },
  optimizeDeps: {
    exclude: [
      "i18n-fr", "i18n-ar", "i18n-es", "i18n-de", "i18n-zh", "i18n-zh-tw",
      "i18n-hi", "i18n-pa", "i18n-ko", "i18n-ja", "i18n-pt", "i18n-vi",
      "i18n-tl", "i18n-ur", "i18n-ht", "i18n-fa", "i18n-th", "i18n-tr", "i18n-id",
    ],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
