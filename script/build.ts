import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile, mkdir, cp } from "fs/promises";
import { existsSync } from "fs";

// server deps to bundle to reduce openat(2) syscalls
// which helps cold start times
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

async function compileI18n() {
  const { writeFileSync, mkdirSync } = await import("fs");
  const path = await import("path");
  const LANGUAGES = [
    "en", "fr", "tl", "hi", "es", "zh", "zh-tw", "ar", "ko",
    "pt", "pa", "vi", "ht", "ur", "ja", "fa", "de", "th", "tr", "id",
  ];
  const outDir = path.resolve(process.cwd(), "client/public/i18n");
  mkdirSync(outDir, { recursive: true });
  for (const lang of LANGUAGES) {
    const mod = await import(`../client/src/lib/i18n-${lang}`);
    const key = Object.keys(mod).find((k: string) => typeof mod[k] === "object" && !Array.isArray(mod[k]));
    if (!key) continue;
    writeFileSync(path.join(outDir, `${lang}.json`), JSON.stringify(mod[key]));
  }
  console.log(`compiled ${LANGUAGES.length} i18n files to JSON`);
}

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  console.log("compiling i18n...");
  await compileI18n();

  console.log("building client...");
  await viteBuild();

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
    external: externals,
    logLevel: "info",
    loader: {
      ".png": "empty",
      ".jpg": "empty",
      ".jpeg": "empty",
      ".svg": "empty",
      ".webp": "empty",
      ".gif": "empty",
    },
  });

  if (existsSync("server/seed-data")) {
    console.log("copying seed data...");
    await mkdir("dist/seed-data", { recursive: true });
    await cp("server/seed-data", "dist/seed-data", { recursive: true });
  }
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
