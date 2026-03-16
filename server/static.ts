import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { injectMeta } from "./seo-meta";

let cachedIndexHtml: string | null = null;

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  const indexHtmlPath = path.resolve(distPath, "index.html");
  cachedIndexHtml = fs.readFileSync(indexHtmlPath, "utf-8");

  app.use(
    "/assets",
    express.static(path.join(distPath, "assets"), {
      maxAge: "1y",
      immutable: true,
    }),
  );

  app.use(
    express.static(distPath, {
      maxAge: "1h",
      setHeaders: (res, filePath) => {
        if (filePath.endsWith(".html") || filePath.endsWith("sw.js")) {
          res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        } else if (/\.(gif|png|jpg|jpeg|svg|ico|webp|woff2?)$/i.test(filePath)) {
          res.setHeader("Cache-Control", "public, max-age=604800, immutable");
        }
      },
    }),
  );

  app.use("/{*path}", async (req, res) => {
    try {
      const html = cachedIndexHtml || fs.readFileSync(indexHtmlPath, "utf-8");
      const injected = await injectMeta(html, req.path, { isAllied: !!(req as any).isAllied });
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.status(200).send(injected);
    } catch (err) {
      console.error("SEO meta injection error:", err);
      res.setHeader("Cache-Control", "no-cache");
      res.sendFile(indexHtmlPath);
    }
  });
}
