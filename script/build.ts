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
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "nanoid",
  "uuid",
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
    logOverride: { "import-meta": "silent" },
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
    logOverride: { "import-meta": "silent" },
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
    external: [...externals, "../client/src/data/lessons/index", "tr46", "whatwg-url"],
    logLevel: "warning",
    logOverride: { "import-meta": "silent" },
    loader: ASSET_LOADER,
    plugins: [
      {
        name: "redirect-lessons-data",
        setup(build) {
          build.onResolve({ filter: /\.\.\/client\/src\/data\/lessons\/index$/ }, () => ({
            path: "./lessons-data.cjs",
            external: true,
          }));
        },
      },
      {
        name: "externalize-dynamic-imports",
        setup(build) {
          const dynamicExternalPatterns = [
            /\.\/seed-[^/]+$/,
            /\.\/seeds\/[^/]+$/,
            /\.\/seed-data\/[^/]+$/,
            /\.\/encyclopedia-seed$/,
            /\.\/startup-data-migrations$/,
            /\.\/alerting-engine$/,
            /\.\/synthetic-monitoring$/,
            /\.\/content-integrity-audit$/,
            /\.\/reporting-scheduler$/,
            /\.\/content-pipeline$/,
            /\.\/schema-validation$/,
            /\.\/content-versioning-quarantine$/,
            /\.\/ensure-schema$/,
            /\.\/exam-flashcard-mapper$/,
            /\.\/exam-delivery$/,
            /\.\/prompts\/qbank-templates$/,
            /\.\/publish-gate$/,
            /\.\/memory-monitor$/,
            /\.\/memory-observability$/,
            /\.\/resource-budgets$/,
            /\.\/auto-containment$/,
            /\.\/qbank-scheduler$/,
            /\.\.\/client\/src\/data\//,
            /\.\.\/\.\.\/client\/src\/data\//,
            /\.\/new-grad-content-seed$/,
            /\.\/data\/nclex-rn-hub-content$/,
            /\.\/certification-question-seed$/,
            /\.\/nursing-question-seeder$/,
          ];
          for (const pattern of dynamicExternalPatterns) {
            build.onResolve({ filter: pattern }, (args) => {
              if (args.kind === "dynamic-import" || args.kind === "require-call") {
                return { path: args.path, external: true };
              }
              return undefined;
            });
          }
        },
      },
    ],
  });
}

async function buildExternalizedModules() {
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];

  const serverDir = path.resolve("server");
  const entryPoints: string[] = [];

  async function collectTsFiles(dir: string, prefix: string) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory() && (entry.name === "seeds" || entry.name === "data" || entry.name === "prompts" || entry.name === "seed-data")) {
        await collectTsFiles(fullPath, prefix + entry.name + "/");
      } else if (entry.isFile() && entry.name.endsWith(".ts") && !entry.name.endsWith(".d.ts")) {
        const rel = prefix + entry.name;
        if (
          rel.startsWith("seed-") ||
          rel.startsWith("seeds/") ||
          rel.startsWith("seed-data/") ||
          rel === "encyclopedia-seed.ts" ||
          rel === "startup-data-migrations.ts" ||
          rel === "alerting-engine.ts" ||
          rel === "synthetic-monitoring.ts" ||
          rel === "content-integrity-audit.ts" ||
          rel === "reporting-scheduler.ts" ||
          rel === "content-pipeline.ts" ||
          rel === "schema-validation.ts" ||
          rel === "content-versioning-quarantine.ts" ||
          rel === "ensure-schema.ts" ||
          rel === "exam-flashcard-mapper.ts" ||
          rel === "exam-delivery.ts" ||
          rel.startsWith("prompts/") ||
          rel === "publish-gate.ts" ||
          rel === "memory-monitor.ts" ||
          rel === "memory-observability.ts" ||
          rel === "resource-budgets.ts" ||
          rel === "auto-containment.ts" ||
          rel === "qbank-scheduler.ts" ||
          rel === "new-grad-content-seed.ts" ||
          rel.startsWith("data/") ||
          rel === "certification-question-seed.ts" ||
          rel === "nursing-question-seeder.ts"
        ) {
          entryPoints.push(fullPath);
        }
      }
    }
  }

  await collectTsFiles(serverDir, "");

  if (entryPoints.length === 0) return;

  const dynamicPatterns = [
    /\.\/seed-[^/]+$/,
    /\.\/seeds\/[^/]+$/,
    /\.\/seed-data\/[^/]+$/,
    /\.\/encyclopedia-seed$/,
    /\.\/startup-data-migrations$/,
    /\.\/alerting-engine$/,
    /\.\/synthetic-monitoring$/,
    /\.\/content-integrity-audit$/,
    /\.\/reporting-scheduler$/,
    /\.\/content-pipeline$/,
    /\.\/schema-validation$/,
    /\.\/content-versioning-quarantine$/,
    /\.\/ensure-schema$/,
    /\.\/exam-flashcard-mapper$/,
    /\.\/exam-delivery$/,
    /\.\/prompts\/qbank-templates$/,
    /\.\/publish-gate$/,
    /\.\/memory-monitor$/,
    /\.\/memory-observability$/,
    /\.\/resource-budgets$/,
    /\.\/auto-containment$/,
    /\.\/qbank-scheduler$/,
    /\.\.\/client\/src\/data\//,
    /\.\.\/\.\.\/client\/src\/data\//,
    /\.\/new-grad-content-seed$/,
    /\.\/data\/nclex-rn-hub-content$/,
    /\.\/certification-question-seed$/,
    /\.\/nursing-question-seeder$/,
  ];

  await esbuild({
    entryPoints,
    platform: "node",
    bundle: true,
    format: "cjs",
    outdir: "dist",
    outbase: "server",
    define: { "process.env.NODE_ENV": '"production"' },
    minify: true,
    external: [...allDeps, "tr46", "whatwg-url", "../client/src/data/lessons/index"],
    logLevel: "warning",
    logOverride: { "import-meta": "silent" },
    loader: ASSET_LOADER,
    plugins: [
      {
        name: "redirect-lessons-data",
        setup(build) {
          build.onResolve({ filter: /\.\.\/client\/src\/data\/lessons\/index$/ }, () => ({
            path: "./lessons-data.cjs",
            external: true,
          }));
        },
      },
      {
        name: "externalize-cross-refs",
        setup(build) {
          for (const pattern of dynamicPatterns) {
            build.onResolve({ filter: pattern }, (args) => {
              if (args.kind === "dynamic-import" || args.kind === "require-call") {
                return { path: args.path, external: true };
              }
              return undefined;
            });
          }
        },
      },
    ],
  });
}

async function buildClientDataModules() {
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];

  const clientDataFiles: string[] = [];
  const dataDir = path.resolve("client/src/data");

  async function collectClientData(dir: string) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await collectClientData(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(".ts") && !entry.name.endsWith(".d.ts")) {
        clientDataFiles.push(fullPath);
      }
    }
  }

  await collectClientData(dataDir);
  if (clientDataFiles.length === 0) return;

  await esbuild({
    entryPoints: clientDataFiles,
    platform: "node",
    bundle: false,
    format: "cjs",
    outdir: "client/src/data",
    outbase: "client/src/data",
    define: { "process.env.NODE_ENV": '"production"' },
    minify: true,
    logLevel: "warning",
    logOverride: { "import-meta": "silent" },
    loader: ASSET_LOADER,
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

  await buildExternalizedModules();
  log("externalized modules done");

  await buildClientDataModules();
  log("client data modules done");

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
