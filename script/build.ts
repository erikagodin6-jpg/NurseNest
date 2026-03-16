import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile } from "fs/promises";
import { existsSync, readdirSync, readFileSync, writeFileSync, copyFileSync, unlinkSync, mkdirSync } from "fs";
import { gzipSync } from "zlib";
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

const ASSET_LOADER: Record<string, "empty"> = {
  ".png": "empty", ".jpg": "empty", ".jpeg": "empty",
  ".svg": "empty", ".webp": "empty", ".gif": "empty",
};

const CLIENT_ALIAS = {
  "@": path.resolve("client/src"),
  "@shared": path.resolve("shared"),
};

function buildLessonsData() {
  return esbuild({
    entryPoints: ["client/src/data/lessons/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/lessons-data.cjs",
    define: { "process.env.NODE_ENV": '"production"' },
    minify: true,
    logLevel: "warning",
    loader: ASSET_LOADER,
    alias: CLIENT_ALIAS,
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
}

function buildNpBatch(i: number) {
  return esbuild({
    entryPoints: [`client/src/data/lessons/np-generated-batch-${i}.ts`],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: `dist/np-generated-batch-${i}.cjs`,
    define: { "process.env.NODE_ENV": '"production"' },
    minify: true,
    logLevel: "warning",
    loader: ASSET_LOADER,
    alias: CLIENT_ALIAS,
  });
}

async function buildServer() {
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  return esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: { "process.env.NODE_ENV": '"production"' },
    minify: true,
    external: [...externals, "../client/src/data/lessons/index"],
    logLevel: "warning",
    loader: ASSET_LOADER,
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
}

function copySeedData() {
  if (!existsSync("server/seed-data")) return;
  mkdirSync("dist/seed-data", { recursive: true });
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
          unlinkSync(dst);
        }
      } catch {}
    }
  }
}

async function buildAll() {
  const t0 = Date.now();
  const log = (msg: string) => console.log(`[${((Date.now() - t0) / 1000).toFixed(1)}s] ${msg}`);

  await rm("dist", { recursive: true, force: true });

  log("compiling i18n...");
  await compileI18n();

  log("building client (vite) + server (esbuild) in parallel...");
  await Promise.all([
    viteBuild(),
    buildServer(),
  ]);

  log("client + server done");

  log("removing bundled assets served from object storage...");
  await Promise.all([
    rm("dist/public/videos", { recursive: true, force: true }),
    rm("dist/public/translations", { recursive: true, force: true }),
  ]);

  log("building lessons data + NP batches (7 bundles in parallel)...");
  await Promise.all([
    buildLessonsData(),
    buildNpBatch(1),
    buildNpBatch(2),
    buildNpBatch(3),
    buildNpBatch(4),
    buildNpBatch(5),
    buildNpBatch(6),
  ]);

  log("copying seed data...");
  copySeedData();

  log(`build complete`);
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
