import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile, readdir, readFile as readFileAsync, writeFile, copyFile, unlink, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { gzipSync } from "zlib";
import { compileI18n } from "./compile-i18n";
import { execSync } from "child_process";
import { runI18nScan } from "./scan-hardcoded-strings-lib";

const EXPECTED_BUILD_VERSION = "2026-03-25-FORCE-REBUILD";
const EXPECTED_BUILD_VERSION_LOG = `BUILD_VERSION=${EXPECTED_BUILD_VERSION}`;
import path from "path";

const allowlist = [
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "nanoid",
  "uuid",
  "ws",
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

const SEED_MODULE_PATTERN = /^\.\/(seed-[^/]+|encyclopedia-seed|nclex-rn-hub-seed|certification-question-seed|new-grad-content-seed|new-grad-scenario-routes|seeds\/[^/]+)$/;

const LAZY_ROUTE_MODULES = new Set([
  "clinical-seo-routes", "new-grad-routes",
  "paramedic-seo", "paramedic-questions-api", "paramedic-waveform-routes", "paramedic-exam-routes",
  "pharmtech-routes", "allied-questions-api", "allied-article-routes", "allied-health-article-routes",
  "imaging-seo-routes", "imaging-exam-routes", "imaging-content-pipeline",
  "rrt-pharmacology-api", "seo-quiz-engine", "programmatic-seo-engine", "seo-hub-routes",
  "exam-blueprint-seo-routes", "seo-content-pages", "nursing-questions-api",
  "cross-platform-api", "test-bank-api", "cat-session-api",
  "content-publishing-validator", "exam-resilience-engine", "chaos-testing",
  "encyclopedia-routes", "tutor-routes", "study-coaching-routes",
  "readiness-routes", "exam-planner-routes", "post-exam-routes",
  "applynest-routes", "substitute-content-routes",
  "profession-routes", "profession-practice-questions-routes",
  "question-preview-api", "environment-routes",
  "platform-resilience", "performance", "deployment-protection",
  // Keep memory-monitor in the main bundle (avoid missing dist/memory-monitor.cjs on deploy).
  "memory-middleware", "content-health-gate", "job-queue",
  "entitlement-api", "analytics-events-routes", "translation-audit",
  "startup-data-migrations", "adaptive-engine", "sm2-engine",
  "lesson-content-api", "content-version-service", "taxonomy-normalizer",
  "nursing-question-seeder", "expansion-engine-routes",
  "site-health-routes", "content-health-routes", "content-relationship-service",
]);

const TRANSITIVE_EXTERNALS = [
  "iconv-lite", "tr46", "whatwg-url", "raw-body", "body-parser", "mime-db",
];

async function getExternals() {
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  return allDeps.filter((dep) => !allowlist.includes(dep));
}

async function buildServer(externalizeHeavyModules: boolean, buildProof: string) {
  const externals = await getExternals();
  const plugins: NonNullable<Parameters<typeof esbuild>[0]["plugins"]> = [];
  plugins.push({
    name: "externalize-career-question-data",
    setup(build) {
      build.onResolve({ filter: /\.\.\/client\/src\/data\/career-questions\// }, (args) => ({
        path: args.path,
        external: true,
      }));
    },
  });
  plugins.push({
    name: "externalize-lazy-routes",
    setup(build) {
      build.onResolve({ filter: /^\.\/[a-z]/ }, (args) => {
        const moduleName = args.path.replace(/^\.\//, "");
        if (LAZY_ROUTE_MODULES.has(moduleName)) {
          return { path: `./${moduleName}.cjs`, external: true };
        }
        return null;
      });
    },
  });

  if (externalizeHeavyModules) {
    plugins.push(
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
        name: "externalize-client-data",
        setup(build) {
          build.onResolve({ filter: /\.\.\/client\/src\/data\// }, (args) => {
            if (args.path.includes("lessons/index")) return null;
            return { path: args.path, external: true };
          });
        },
      },
      {
        name: "externalize-seed-modules",
        setup(build) {
          build.onResolve({ filter: SEED_MODULE_PATTERN }, (args) => {
            const baseName = args.path.replace(/^\.\//, "").replace(/\//g, "__");
            return { path: `./${baseName}.cjs`, external: true };
          });
          build.onResolve({ filter: /\.\/seed-data\// }, (args) => {
            const baseName = args.path.replace(/^\.\//, "").replace(/\//g, "__");
            return { path: `./${baseName}.cjs`, external: true };
          });
        },
      },
    );
  }

  return esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: { "process.env.NODE_ENV": '"production"' },
    // Provenance: lets us confirm Render is running the bundle produced by this build.
    banner: { js: `console.log(${JSON.stringify(buildProof)});` },
    minify: true,
    external: [...externals, ...TRANSITIVE_EXTERNALS],
    logLevel: "warning",
    logOverride: { "import-meta": "silent" },
    loader: ASSET_LOADER,
    plugins,
  });
}

async function discoverSeedEntryPoints(): Promise<string[]> {
  const serverDir = "server";
  const entries: string[] = [];
  const topFiles = await readdir(serverDir);
  const seedPattern = /^(seed-.*|encyclopedia-seed|nclex-rn-hub-seed|certification-question-seed|new-grad-content-seed|new-grad-scenario-routes)\.ts$/;
  for (const f of topFiles) {
    if (seedPattern.test(f)) {
      entries.push(`${serverDir}/${f}`);
    }
  }
  if (existsSync(`${serverDir}/seeds`)) {
    const seedsFiles = await readdir(`${serverDir}/seeds`);
    for (const f of seedsFiles) {
      if (f.endsWith(".ts")) {
        entries.push(`${serverDir}/seeds/${f}`);
      }
    }
  }
  if (existsSync(`${serverDir}/seed-data`)) {
    const sdFiles = await readdir(`${serverDir}/seed-data`);
    for (const f of sdFiles) {
      if (f.endsWith(".ts")) {
        entries.push(`${serverDir}/seed-data/${f}`);
      }
    }
  }
  return entries;
}

async function discoverLazyRouteEntryPoints(): Promise<string[]> {
  const entries: string[] = [];
  const topFiles = await readdir("server");
  for (const f of topFiles) {
    const baseName = f.replace(/\.ts$/, "");
    if (f.endsWith(".ts") && LAZY_ROUTE_MODULES.has(baseName)) {
      entries.push(`server/${f}`);
    }
  }
  return entries;
}

async function buildExternalModules(entries: string[], label: string) {
  if (entries.length === 0) return;
  const externals = await getExternals();

  const BATCH_SIZE = 8;
  for (let i = 0; i < entries.length; i += BATCH_SIZE) {
    const batch = entries.slice(i, i + BATCH_SIZE);
    await Promise.all(
      batch.map((entry) => {
        const baseName = entry
          .replace(/^server\//, "")
          .replace(/\.ts$/, "")
          .replace(/\//g, "__");
        return esbuild({
          entryPoints: [entry],
          platform: "node",
          bundle: true,
          format: "cjs",
          outfile: `dist/${baseName}.cjs`,
          define: { "process.env.NODE_ENV": '"production"' },
          minify: true,
          external: [...externals, ...TRANSITIVE_EXTERNALS],
          logLevel: "warning",
          logOverride: { "import-meta": "silent" },
          loader: ASSET_LOADER,
          alias: CLIENT_ALIAS,
        });
      })
    );
  }
  console.log(`  Built ${entries.length} ${label} into dist/`);
}

async function buildSeedModules() {
  return buildExternalModules(await discoverSeedEntryPoints(), "seed modules");
}

async function buildLazyRouteModules() {
  return buildExternalModules(await discoverLazyRouteEntryPoints(), "lazy route modules");
}

async function buildClientDataModules() {
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

  const externals = await getExternals();

  await esbuild({
    entryPoints: clientDataFiles,
    platform: "node",
    bundle: false,
    format: "cjs",
    // Emit outside src so Vite/Rollup resolve .ts, not shadowing CJS siblings
    outdir: "dist/client-data-cjs",
    outbase: "client/src/data",
    define: { "process.env.NODE_ENV": '"production"' },
    minify: true,
    logLevel: "warning",
    logOverride: { "import-meta": "silent" },
    loader: ASSET_LOADER,
  });
  console.log(`  Built ${clientDataFiles.length} client data modules`);
}

/** Remove stale CJS emit files that sit next to .ts/.tsx and break Vite resolution. */
async function removeShadowingJsNextToTs(rootDir: string) {
  async function walk(dir: string) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        await walk(full);
      } else if (e.isFile() && e.name.endsWith(".js")) {
        const base = e.name.slice(0, -3);
        const ts = path.join(dir, `${base}.ts`);
        const tsx = path.join(dir, `${base}.tsx`);
        if (existsSync(ts) || existsSync(tsx)) {
          await unlink(full);
        }
      }
    }
  }
  await walk(rootDir);
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
  const timing = (phase: string, start: number) =>
    console.log(`[deploy-timing] ${phase}_s=${((Date.now() - start) / 1000).toFixed(2)}`);
  const isProduction = process.env.NODE_ENV === "production";
  const runHeavyBuildTasks = process.env.RUN_HEAVY_BUILD_TASKS === "1";
  const target = process.env.BUILD_TARGET || "all";

  // Build freshness proof for Render deploy debugging.
  let gitSha = "unknown";
  try {
    gitSha = execSync("git rev-parse HEAD", { encoding: "utf-8" }).trim();
  } catch {}
  log(`[build-freshness] git_sha=${gitSha} build_started_at=${new Date().toISOString()}`);

  const buildProof = `FRESH_BUILD_PROOF=${gitSha}:${new Date().toISOString()}`;

  // Always wipe dist so the output bundle can't be stale.
  // Also clear common bundler caches that could otherwise make artifacts linger.
  await rm("dist", { recursive: true, force: true });
  await rm("node_modules/.cache", { recursive: true, force: true });
  await rm("node_modules/.vite", { recursive: true, force: true });
  await rm("node_modules/.esbuild", { recursive: true, force: true });

  const skipValidation = isProduction || process.env.SKIP_I18N_VALIDATION === "1";
  const skipI18nCompile = isProduction || process.env.SKIP_I18N_COMPILE === "1";
  const skipBuildReports = isProduction || process.env.SKIP_BUILD_REPORTS === "1";

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

  if (target === "all" || target === "client") {
    const i18nCompileT = Date.now();
    if (skipI18nCompile) {
      const enPath = path.resolve("client/public/i18n/en.json");
      if (!existsSync(enPath)) {
        console.error(
          "[build] SKIP_I18N_COMPILE=1 but client/public/i18n/en.json is missing. Commit i18n JSON or run a full build without SKIP_I18N_COMPILE.",
        );
        process.exit(1);
      }
      log("skipping i18n compile (production deploy path)");
    } else {
      log("building i18n...");
      await compileI18n();
    }
    timing("i18n_compile", i18nCompileT);
  }

  if (!skipValidation) {
    runValidationStep(
      "locale file completeness check",
      "node scripts/check-locale-completeness.mjs --warn",
      log,
    );
  }

  if (target === "all" || target === "server") {
    const serverT = Date.now();
    log(`building server (required, RUN_HEAVY_BUILD_TASKS=${runHeavyBuildTasks ? "1" : "0"})...`);
    await buildServer(runHeavyBuildTasks, buildProof);
    timing("server_esbuild", serverT);

    // Post-build proof: fail hard if dist/index.cjs is missing or outdated.
    const distIndexPath = path.resolve("dist/index.cjs");
    if (!existsSync(distIndexPath)) {
      throw new Error(`[build] dist/index.cjs missing after server build (${distIndexPath})`);
    }
    const distIndex = await readFile(distIndexPath, "utf-8");
    if (!distIndex.includes(EXPECTED_BUILD_VERSION_LOG)) {
      throw new Error(
        `[build] dist/index.cjs is missing expected build proof (${EXPECTED_BUILD_VERSION_LOG}). ` +
          `This usually means the bundle wasn't rebuilt from the current source.`,
      );
    }
    // Signature checks to ensure we bundled current DB + storage logic.
    if (!distIndex.includes("selected_db_target=production_prod_url")) {
      throw new Error(`[build] dist/index.cjs missing DB target marker selected_db_target=production_prod_url`);
    }
    if (!distIndex.includes("[Storage] getAllUsers hit safety limit of")) {
      throw new Error(`[build] dist/index.cjs missing storage marker string`);
    }

    const lazyRoutesT = Date.now();
    await buildLazyRouteModules();
    timing("build_lazy_route_modules_required", lazyRoutesT);
  }

  if ((target === "all" || target === "heavy") && runHeavyBuildTasks) {
    const heavyT = Date.now();
    log("running heavy build tasks (seed/lesson/data artifacts)...");

    const copySeedT = Date.now();
    await copySeedData();
    timing("copy_seed_data", copySeedT);

    const lessonsT = Date.now();
    await buildLessonsData();
    timing("build_lessons_data", lessonsT);

    const lessonsDir = path.resolve("client/src/data/lessons");
    const npBatchFiles = (await readdir(lessonsDir))
      .filter((f: string) => /^np-generated-batch-\d+\.ts$/.test(f))
      .map((f: string) => parseInt(f.match(/np-generated-batch-(\d+)\.ts/)![1], 10))
      .sort((a: number, b: number) => a - b);
    log(`discovered np-generated-batch files: ${npBatchFiles.join(", ")}`);

    const npBatchT = Date.now();
    await Promise.all(npBatchFiles.map((i) => buildNpBatch(i)));
    timing("build_np_batches", npBatchT);

    const seedModulesT = Date.now();
    await buildSeedModules();
    timing("build_seed_modules", seedModulesT);

    const clientDataT = Date.now();
    await buildClientDataModules();
    timing("build_client_data_modules", clientDataT);

    timing("heavy_tasks_total", heavyT);
  } else if (target === "all" || target === "heavy") {
    log("skipping heavy build tasks (RUN_HEAVY_BUILD_TASKS != 1)");
  }

  if (global.gc) global.gc();

  await removeShadowingJsNextToTs(path.resolve("client/src"));
  log("pruned shadowing .js next to TS sources under client/src");

  if (target === "all" || target === "client") {
    const viteT = Date.now();
    await viteBuild();
    log("client done");
    timing("vite_client", viteT);
  }

  log("removing bundled assets...");
  await Promise.all([
    rm("dist/public/videos", { recursive: true, force: true }),
    rm("dist/public/translations", { recursive: true, force: true }),
  ]);

  if ((target === "all" || target === "client") && !skipBuildReports) {
    log("running bundle size report...");
    try {
      execSync("node scripts/report-bundle-size.js", { stdio: "inherit", encoding: "utf-8" });
    } catch (err: any) {
      console.warn("\n⚠️  Bundle size report failed:", err.message || err);
    }

    await generateCoverageReport(log);
  } else if (target === "all" || target === "client") {
    log("skipping bundle report + i18n coverage artifact (production deploy path)");
  }

  timing("build_total", t0);
  log(`build complete`);
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
