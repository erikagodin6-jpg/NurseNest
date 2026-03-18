import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile, readdir, readFile as readFileAsync, writeFile, copyFile, unlink, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { gzipSync } from "zlib";
import { compileI18n } from "./compile-i18n";
import { execSync } from "child_process";
import { runI18nScan } from "./scan-hardcoded-strings-lib";
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

async function copySeedData() {
  if (!existsSync("server/seed-data")) return;
  await mkdir("dist/seed-data", { recursive: true });
  const files = await readdir("server/seed-data");
  await Promise.all(
    files
      .filter((f) => !f.endsWith(".ts"))
      .map(async (f) => {
        const src = `server/seed-data/${f}`;
        const dst = `dist/seed-data/${f}`;
        await copyFile(src, dst);
        if (f.endsWith(".json")) {
          try {
            const raw = await readFileAsync(dst, "utf-8");
            const data = JSON.parse(raw);
            const minified = JSON.stringify(data);
            if (minified.length > 500_000) {
              await writeFile(dst + ".gz", gzipSync(Buffer.from(minified)));
              await unlink(dst);
            } else {
              await writeFile(dst, minified);
            }
          } catch {}
        }
      })
  );
}

function runValidationStep(name: string, command: string, log: (msg: string) => void): void {
  log(`running ${name}...`);
  const isEnforce = command.includes("--enforce");
  try {
    execSync(command, { stdio: "pipe", encoding: "utf-8" });
    log(`${name} passed`);
  } catch (err: any) {
    const output = (err.stdout || "") + (err.stderr || "");
    if (isEnforce) {
      console.error(`\n=== ${name} FAILED (blocking) ===\n`);
      console.error(output);
      process.exit(1);
    } else {
      console.warn(`\n=== ${name} WARNING (non-blocking) ===\n`);
      if (output) console.warn(output.slice(0, 2000));
      log(`${name} completed with warnings`);
    }
  }
}

async function generateCoverageReport(log: (msg: string) => void): Promise<void> {
  log("generating coverage report...");
  const reportFiles = [
    "scripts/translation-report.json",
    "scripts/locale-completeness-report.json",
    "scripts/hardcoded-strings-report.json",
  ];

  const coverageReport: Record<string, any> = {
    generatedAt: new Date().toISOString(),
    validators: {},
  };

  for (const rf of reportFiles) {
    if (existsSync(rf)) {
      try {
        const data = JSON.parse(await readFile(rf, "utf-8"));
        const name = path.basename(rf, ".json");
        coverageReport.validators[name] = data;
      } catch {}
    }
  }

  await mkdir("dist", { recursive: true });
  await writeFile("dist/i18n-coverage-report.json", JSON.stringify(coverageReport, null, 2));
  log("coverage report written to dist/i18n-coverage-report.json");
}

async function buildAll() {
  const t0 = Date.now();
  const log = (msg: string) => console.log(`[${((Date.now() - t0) / 1000).toFixed(1)}s] ${msg}`);

  const skipValidation = process.env.SKIP_I18N_VALIDATION === "1";

  if (!skipValidation) {
    log("=== Pre-build i18n validation ===");

    runValidationStep(
      "translation coverage check",
      "node scripts/validate-translations.mjs --warn",
      log,
    );

    runValidationStep(
      "hardcoded string scan",
      "node scripts/scan-hardcoded-strings.mjs --warn",
      log,
    );
  } else {
    log("skipping i18n validation (SKIP_I18N_VALIDATION=1)");
  }

  await rm("dist", { recursive: true, force: true });

  if (!skipValidation) {
    log("scanning for hardcoded strings...");
    let scanConfig: Record<string, any> = {};
    try {
      scanConfig = JSON.parse(await readFile("i18n-scan.config.json", "utf-8"));
    } catch {}
    const scanPassed = runI18nScan({
      quiet: true,
      failOnCritical: scanConfig.failOnCritical ?? false,
      criticalThreshold: scanConfig.criticalThreshold ?? 0,
      totalThreshold: scanConfig.totalThreshold ?? 35000,
    });
    if (!scanPassed) {
      console.error("\n❌ Build aborted: hardcoded string violations exceed thresholds.");
      console.error("   Run 'npm run i18n:scan' for details.\n");
      process.exit(1);
    }
    log("i18n scan passed");
  }

  log("building i18n...");
  await compileI18n();

  if (!skipValidation) {
    runValidationStep(
      "locale file completeness check",
      "node scripts/check-locale-completeness.mjs --warn",
      log,
    );
  }

  log("building server + data (NP batches in parallel)...");
  const lessonsDir = path.resolve("client/src/data/lessons");
  const npBatchFiles = (await readdir(lessonsDir))
    .filter((f: string) => /^np-generated-batch-\d+\.ts$/.test(f))
    .map((f: string) => parseInt(f.match(/np-generated-batch-(\d+)\.ts/)![1], 10))
    .sort((a: number, b: number) => a - b);
  log(`discovered np-generated-batch files: ${npBatchFiles.join(", ")}`);

  await copySeedData();
  log("seed data done");

  await buildLessonsData();
  log("lessons data done");
  await Promise.all(npBatchFiles.map((i) => buildNpBatch(i)));
  log("np batches done");

  await buildServer();
  log("server done");

  if (global.gc) global.gc();

  await viteBuild();
  log("client done");

  log("removing bundled assets...");
  await Promise.all([
    rm("dist/public/videos", { recursive: true, force: true }),
    rm("dist/public/translations", { recursive: true, force: true }),
  ]);

  log("running bundle size report...");
  try {
    execSync("node scripts/report-bundle-size.js", { stdio: "inherit", encoding: "utf-8" });
  } catch (err: any) {
    console.warn("\n⚠️  Bundle size report failed:", err.message || err);
  }

  await generateCoverageReport(log);

  log(`build complete`);
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
