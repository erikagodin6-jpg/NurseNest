import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { injectMeta, checkContentExists } from "./seo-meta";

let cachedIndexHtml: string | null = null;

const SUPPORTED_LOCALES = new Set(["en", "fr", "es", "fil", "hi", "zh", "zh-tw", "ar", "ko", "pt", "pa", "vi", "ht", "ur", "ja", "fa", "de", "th", "tr", "id"]);

function extractLocaleAndPath(reqPath: string): { locale: string; strippedPath: string } {
  const localeMatch = reqPath.match(/^\/(en|fr|es|fil|hi|zh-tw|zh|ar|ko|pt|pa|vi|ht|ur|ja|fa|de|th|tr|id)(\/.*|$)/);
  if (localeMatch) {
    return { locale: localeMatch[1], strippedPath: localeMatch[2] || "/" };
  }
  return { locale: "en", strippedPath: reqPath };
}

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
      maxAge: "1d",
      setHeaders: (res, filePath) => {
        if (filePath.endsWith("sw.js") || filePath.endsWith(".html")) {
          res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        } else if (/\.(gif|png|jpg|jpeg|svg|ico|webp|avif)$/i.test(filePath)) {
          res.setHeader("Cache-Control", "public, max-age=2592000, immutable");
        } else if (/\.(woff2?)$/i.test(filePath)) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        } else if (/\.(css|js)$/i.test(filePath)) {
          res.setHeader("Cache-Control", "public, max-age=86400");
        }
      },
    }),
  );

  app.use("/assets/{*path}", (req, res) => {
    if (req.path.endsWith(".js")) {
      res.status(200).type("text/javascript").send(
        `if(!sessionStorage.getItem("_nnr")){sessionStorage.setItem("_nnr","1");` +
        `if(typeof caches!=="undefined")caches.keys().then(function(n){n.forEach(function(k){caches.delete(k)})});` +
        `if(navigator.serviceWorker)navigator.serviceWorker.getRegistrations().then(function(r){r.forEach(function(w){w.unregister()})});` +
        `setTimeout(function(){location.href=location.pathname+"?_r="+Date.now()},100)}`
      );
      return;
    }
    res.status(404).type("text/plain").send("Asset not found");
  });

  app.use("/{*path}", async (req, res) => {
    try {
      const html = cachedIndexHtml || fs.readFileSync(indexHtmlPath, "utf-8");
      const { strippedPath } = extractLocaleAndPath(req.path);

      const contentExists = await checkContentExists(strippedPath);
      const statusCode = contentExists ? 200 : 404;

      const injected = await injectMeta(html, req.path, { isAllied: !!(req as any).isAllied });
      const isNoindex = injected.includes('content="noindex');
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("X-Robots-Tag", isNoindex ? "noindex, follow" : "index, follow");
      res.status(statusCode).send(injected);
    } catch (err) {
      console.error("SEO meta injection error:", err);
      res.setHeader("Cache-Control", "no-cache");
      res.sendFile(indexHtmlPath);
    }
  });
}
