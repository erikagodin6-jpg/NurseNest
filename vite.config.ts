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
    chunkSizeWarningLimit: 2000,
    cssMinify: "esbuild",
    minify: "esbuild",
    modulePreload: false,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("node_modules/react-dom")) return "react-dom";
          if (id.includes("node_modules/react/") || id.includes("node_modules/scheduler")) return "react-core";
          if (id.includes("node_modules/@tanstack")) return "tanstack";
          if (id.includes("node_modules/lucide-react")) return "icons";
          if (id.includes("node_modules/wouter")) return "router";
          if (id.includes("node_modules/framer-motion")) return "framer";
          if (id.includes("node_modules/recharts") || id.includes("node_modules/d3")) return "charts";
          if (id.includes("node_modules/@radix-ui")) return "radix";
          if (id.includes("node_modules/stripe") || id.includes("node_modules/@stripe")) return "stripe";
          if (id.includes("/allied/")) return "allied";
          if (id.includes("/pages/admin")) return "admin";
          if (id.includes("node_modules/")) return "vendor";
        },
      },
    },
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
