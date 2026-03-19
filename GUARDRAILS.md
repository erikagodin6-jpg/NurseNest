# Deployment Performance Guardrails

This document lists every structural guardrail that prevents deployment slowdowns.
Each guardrail has a file location, enforcement mechanism, and description.

---

## 1. Startup Guard

| File | `server/startup-policy.ts` |
|------|---------------------------|
| Mechanism | Centralized `appReady` flag, `startupMemoryGuard()`, `runSeedStep()`, `shouldRunSeeding()`, `shouldStartMonitors()`, `isWorkerRole()`, `shouldSkipSeed()` |
| Description | All startup readiness state and deferred work utilities are centralized here. No heavy seed/import work can execute before `markAppReady()` is called. Memory guards are checked between startup phases. `server/index.ts` imports from this module instead of inlining startup logic. |

## 2. Bundle Guard — No Large JSON Imports

| File | All `server/*.ts` runtime files |
|------|--------------------------------|
| Mechanism | Code pattern — all seed data (exam-questions.json, rrt-questions.json, etc.) is imported only via dynamic `import()` inside seed scripts or behind `shouldRunSeeding()` checks. No top-level static imports of large data files exist in server runtime code. |
| Description | The 9.6MB `exam-questions.json`, 760KB `rrt-questions.json`, and similar files are never statically imported at module parse time. Allied and paramedic question data is loaded lazily via dynamic `import()` on first access. |

## 3. Bundle Guard — Oversized Import Checker

| File | `scripts/check-server-imports.ts` |
|------|-----------------------------------|
| Mechanism | CI script — exits non-zero if any server runtime file statically imports a file exceeding 100KB (configurable via `--threshold-kb`). |
| Description | Scans `server/*.ts` (excluding `scripts/`, `seeds/`, `seed-data/`, `seed-*` files) for static `import`/`require` of files over the threshold. Run with `npx tsx scripts/check-server-imports.ts`. |

## 4. Query Guard — LIMIT Caps on High-Volume Reads

| File | `server/storage.ts` |
|------|---------------------|
| Mechanism | `MAX_QUERY_LIMIT` constant (2000) caps any caller-provided limit. `capLimit()` helper enforces defaults. |
| Methods with enforced limits: |
| - `getNotesByUser()` | LIMIT 1000 |
| - `getTestResults()` | LIMIT 500 |
| - `getScheduledContentDue()` | LIMIT 200 |
| - `getAllContentItems()` | default 500, max 2000 |
| - `getPublishedContent()` | default 500, max 2000 |
| - `getAllLessons()` | default 500, max 2000 |
| - `getAllPricingPlans()` | LIMIT 200 |
| - `getCaseStudyFull()` questions sub-query | LIMIT 500 |
| - `getAllExamQuestions()` | default 500, max 2000 |

## 5. Cache Guard — TTL + Max Size Enforcement

| File | Mechanism | Details |
|------|-----------|---------|
| `server/allied-questions-api.ts` | `MAX_CACHE_ENTRIES` (6), `CACHE_TTL_MS` (10 min), `MAX_TOTAL_CACHED_QUESTIONS` (5000), periodic sweep every 5 min | Proactive eviction via `startCacheSweep()` interval. LRU eviction on capacity. Question count cap enforced. |
| `server/paramedic-questions-api.ts` | `PARAMEDIC_CACHE_TTL_MS` (30 min), `MAX_PARAMEDIC_CACHED_QUESTIONS` (5000) | Single nullable array cache. TTL checked on access. Array length capped at 5000. |
| `server/sitemap/index.ts` | `MAX_SITEMAP_CACHE_ENTRIES` (100), `SITEMAP_CACHE_TTL` | TTL + max-size enforced in `pruneSitemapCache()`. Both are enforced. |
| `server/seo-performance-routes.ts` | Single-entry caches (`contentGrowthCache`, `sitemapCache`, `coverageCache`) with `CACHE_TTL` (5 min) | TTL is enforced on access. Single-entry caches are bounded by definition. |
| `server/memory-monitor.ts` `routeLatencyMap` | `MAX_ROUTE_LATENCY_ENTRIES` (200) | Capped Map, already enforced. |
| `server/memory-monitor.ts` `memoryTrend` | `MAX_TREND_POINTS` (30) | Fixed-size array with splice. |
| `server/job-queue.ts` `jobHandlers` | Registry Map | Fixed set of registered handlers. Not a data cache — OK as-is. |
| `server/auto-containment.ts` `runbookStatuses` | Small fixed Map (4 entries) | Statically initialized. Not a growing cache — OK as-is. |

## 6. Health Guard — Fast /healthz

| File | `server/index.ts` (healthz handler) |
|------|-------------------------------------|
| Mechanism | Comment block + 3-second timeout wrapper. No optional dependencies (Stripe, AI, sitemap, etc.). |
| Description | `/healthz` only checks `isAppReady()` and runs `SELECT 1` against the DB. A `Promise.race` with a 3-second timeout prevents a slow DB from hanging the health check. No optional modules are imported or awaited. |

## 7. Maintenance Isolation — Background Jobs Gated on PROCESS_ROLE

| File | `server/index.ts`, `server/startup-policy.ts` |
|------|-----------------------------------------------|
| Mechanism | `isWorkerRole()` and `shouldStartMonitors()` checks (env vars: `PROCESS_ROLE`, `ENABLE_MONITORS`) |
| Gated systems: |
| - Memory monitor, resource budgets, auto-containment, memory observability | Only start when `PROCESS_ROLE=worker` or `ENABLE_MONITORS=true` |
| - Alerting engine, synthetic monitoring, content integrity audit | Only start when `PROCESS_ROLE=worker` |
| - Content publisher scheduler (60s interval) | Only start when `PROCESS_ROLE=worker` |
| - Reporting scheduler, pipeline scheduler (6h interval) | Only start when `PROCESS_ROLE=worker` |
| - Job queue worker + handlers | Only start when `PROCESS_ROLE=worker` |
| - Seeding (Phase 2 & 3) | Only runs when `PROCESS_ROLE=worker` or `RUN_SEEDING=true` |
| Startup logs clearly indicate what was skipped and why. |

---

## Environment Variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `PROCESS_ROLE` | `web` | Set to `worker` to enable all background jobs, monitors, and seeding |
| `ENABLE_MONITORS` | (unset) | Set to `true` to enable monitors on web processes |
| `RUN_SEEDING` | (unset) | Set to `true` to enable seeding on web processes |
| `ALLIED_CACHE_MAX` | `6` | Max allied question cache entries |
