import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile, mkdir, cp } from "fs/promises";
import { existsSync } from "fs";
import { compileI18n } from "./compile-i18n";
import path from "path";

const allowlist = [
  "@google/generative-ai",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "pg",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  console.log("compiling i18n...");
  await compileI18n();

  console.log("building client...");
  await viteBuild();

  console.log("removing bundled assets served from object storage...");
  await rm("dist/public/videos", { recursive: true, force: true });
  await rm("dist/public/translations", { recursive: true, force: true });
  await rm("dist/public/i18n", { recursive: true, force: true });

  console.log("building lessons data bundle...");
  await esbuild({
    entryPoints: ["client/src/data/lessons/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/lessons-data.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    logLevel: "info",
    loader: {
      ".png": "empty",
      ".jpg": "empty",
      ".jpeg": "empty",
      ".svg": "empty",
      ".webp": "empty",
      ".gif": "empty",
    },
    alias: {
      "@": path.resolve("client/src"),
      "@shared": path.resolve("shared"),
    },
    plugins: [{
      name: "externalize-np-batches",
      setup(build) {
        build.onResolve({ filter: /\.\/np-generated-batch-\d+$/ }, (args) => {
          const batchFile = args.path.replace("./", "") + ".cjs";
          return { path: "./" + batchFile, external: true };
        });
      },
    }],
  });

  console.log("building np-generated-batch bundles...");
  for (let i = 1; i <= 6; i++) {
    await esbuild({
      entryPoints: [`client/src/data/lessons/np-generated-batch-${i}.ts`],
      platform: "node",
      bundle: true,
      format: "cjs",
      outfile: `dist/np-generated-batch-${i}.cjs`,
      define: { "process.env.NODE_ENV": '"production"' },
      minify: true,
      logLevel: "warning",
      loader: {
        ".png": "empty", ".jpg": "empty", ".jpeg": "empty",
        ".svg": "empty", ".webp": "empty", ".gif": "empty",
      },
      alias: {
        "@": path.resolve("client/src"),
        "@shared": path.resolve("shared"),
      },
    });
  }

  console.log("building server...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: [...externals, "../client/src/data/lessons/index"],
    logLevel: "info",
    loader: {
      ".png": "empty",
      ".jpg": "empty",
      ".jpeg": "empty",
      ".svg": "empty",
      ".webp": "empty",
      ".gif": "empty",
    },
    plugins: [{
      name: "redirect-lessons-data",
      setup(build) {
        build.onResolve({ filter: /\.\.\/client\/src\/data\/lessons\/index$/ }, () => ({
          path: "./lessons-data.cjs",
          external: true,
        }));
      },
    }],
  });

  if (existsSync("server/seed-data")) {
    console.log("copying seed data...");
    await mkdir("dist/seed-data", { recursive: true });
    const { readdirSync, readFileSync, writeFileSync, copyFileSync } = await import("fs");
    const { gzipSync } = await import("zlib");
    for (const f of readdirSync("server/seed-data")) {
      if (f.endsWith(".ts")) continue;
      const src = `server/seed-data/${f}`;
      const dst = `dist/seed-data/${f}`;
      copyFileSync(src, dst);
      if (f.endsWith(".json")) {
        try {
          const data = JSON.parse(readFileSync(dst, "utf-8"));
          const minified = JSON.stringify(data);
          writeFileSync(dst, minified);
          if (minified.length > 500_000) {
            writeFileSync(dst + ".gz", gzipSync(Buffer.from(minified)));
            const { unlinkSync } = await import("fs");
            unlinkSync(dst);
          }
        } catch {}
      }
    }
  }
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
