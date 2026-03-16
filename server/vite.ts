import { type Express } from "express";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { nanoid } from "nanoid";
import { checkContentExists } from "./seo-meta";
import { deLocalizeSlug } from "@shared/localized-slugs";

const viteLogger = createLogger();

export async function setupVite(server: Server, app: Express) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server, path: "/vite-hmr" },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(async (req, res, next) => {
    if (
      req.path.startsWith("/api") ||
      req.path.startsWith("/assets") ||
      req.path.startsWith("/vite-hmr") ||
      req.path.startsWith("/@") ||
      req.path.startsWith("/src") ||
      req.path.startsWith("/node_modules") ||
      /\.\w{2,5}($|\?)/.test(req.path)
    ) {
      return next();
    }

    const localeMatch = req.path.match(/^\/(en|fr|es|fil|hi|zh-tw|zh|ar|ko|pt|pa|vi|ht|ur|ja|fa|de|th|tr|id)(\/.*|$)/);
    const detectedLocale = localeMatch ? localeMatch[1] : "en";
    const strippedPath = localeMatch ? (localeMatch[2] || "/") : req.path;
    const deLocalizedPath = detectedLocale !== "en" ? deLocalizeSlug(detectedLocale, strippedPath) : strippedPath;

    try {
      const contentExists = await checkContentExists(deLocalizedPath);
      if (!contentExists) {
        (req as any).__softStatus = 404;
      }
    } catch {}

    const origWriteHead = res.writeHead.bind(res);
    (res as any).writeHead = function(statusCode: number, ...args: any[]) {
      if ((req as any).__softStatus === 404 && statusCode === 200) {
        return origWriteHead(404, ...args);
      }
      return origWriteHead(statusCode, ...args);
    };

    next();
  });

  app.use(vite.middlewares);

  app.use("/{*path}", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const viteDir = typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));
      const clientTemplate = path.resolve(
        viteDir,
        "..",
        "client",
        "index.html",
      );

      const statusCode = (req as any).__softStatus || 200;

      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(statusCode).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}
