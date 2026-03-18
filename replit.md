# NurseNest

### Overview
NurseNest is an adaptive learning platform for nursing and allied health students across 17 specializations. It offers comprehensive educational resources, advanced exam preparation (e.g., NCLEX, REX-PN), and performance analytics. The platform uses AI for content generation to enhance clinical reasoning, nursing knowledge, and critical thinking, aiming to improve patient care outcomes and transform nursing education through technology.

### User Preferences
- Preferred communication style: Simple, everyday language.
- Admin accounts use JWT-based authentication (no hardcoded admin users).
- Copyright must show current year dynamically (uses `new Date().getFullYear()`).
- NO normal lab values on lesson pages - only abnormal clinical findings.
- Content depth: Multi-paragraph cellular/molecular pathophysiology, detailed drug MOA at receptor level.
- Scope enforcement: RPN "monitor/report/administer as ordered," RN protocol-based, NP "order/prescribe".
- Regional content: CA shows CAD prices/Canadian labs, US shows USD/US values.
- NCLEX disclaimer: NurseNest is NOT affiliated with NCLEX, NCSBN, CNO, or any regulatory body.
- Copy protection: content cannot be easily copied/screenshotted.

### System Architecture
NurseNest utilizes a React UI (TypeScript, Wouter, shadcn/ui, Tailwind CSS v4) with an Express 5 backend on Node.js (TypeScript) and Vite. Server state is managed by TanStack React Query via a RESTful API. The UI supports 24 themes, semantic CSS tokens, and DM Sans typography. Data is stored in PostgreSQL with Drizzle ORM.

The platform includes a database-driven subscription model with regional pricing, tier-based plans, Stripe-based lifetime purchases, and free trial usage caps. It features interactive learning modules, a mock exam engine with stratified random sampling, and a comprehensive admin dashboard. AI integrations, routed through a centralized AI Provider Router, power features like blog automation, an Adaptive CAT Engine, Pass Probability Projection, a Next Best Action Engine, an AI Tutoring Assistant, and content generation with quality gates. Exam blueprints are database-driven, content is organized by body system, and supports Next Generation NCLEX (NGN) question types, partial credit scoring, and a Spaced Repetition System. Content access is controlled by user tier.

Key architectural features:
- **Learning & Exam Preparation**: Flashcards, Test Bank, Question Bank, Adaptive Flashcard System, Clinical Vignette Generation Engine, and a Mock Exam Engine (CAT & Practice modes). Supports 12+ nursing certifications with over 62,000 practice questions, 1,800+ NGN case sets, flashcards, and mock exams across various NP pathways.
- **AI-Powered Study & Content**: AI Study Coaching & Course Generation, Exam Date AI Study Planner, AI-Powered Generation & Safety system for content creation, context-aware AI Tutoring Assistant, and Bulk Question Bank Orchestrator.
- **Content & SEO Infrastructure**: Allied Health Encyclopedia, SEO Lesson Engine, Programmatic SEO Engines, Multilingual SEO & Translation System, Database-Driven Multi-Domain Sitemap Architecture, Internal Linking Engine with cross-type clinical relationships, SEO Content Expansion System, Clinical Calculators, Study Guides, Scenarios, and Terminology Hubs. Includes structured data generation (Article, Course, MedicalCondition, FAQ schemas), thin content detection, sitemap cleanup, and E-E-A-T trust signals.
- **SEO Content Hub Architecture**: Reusable, database-driven hub page system for REx-PN, NCLEX-RN, and NP Exams, featuring structured content, FAQs, internal links, and references.
- **User Experience & Engagement**: Dashboard Lifecycle Command Center, Global Report a Problem System, IndexedDB-based Offline Study System, and LocalStorage-based Popup Suppression System.
- **Multi-Profession Support**: Dynamic framework for configuring new healthcare professions with specialized navigation and content, including question banks for MLT, Surgical Technologist, Respiratory Therapy, and dedicated NP Exam Ecosystems.
- **Database Safety & Management**: PostgreSQL with Drizzle ORM, EnvironmentAwareContentWriteService, and a consolidated Backup, Export & Restore Framework (`backup-system/`) with real `pg_dump` database dumps, complete content exports, Stripe snapshots, object storage inventories, env variable audits, render payload backups, codebase archives with SHA-256 checksums, integrity verification, actual restore scripts with `--dry-run` support, retention policy (7 daily), and restore testing. All backup operations exposed via admin API routes in `server/backup-routes.ts`. See `RESTORE.md` for recovery procedures.
- **Unified Pricing Page**: All pricing models are consolidated into a single `/pricing` page with dynamic section tabs.
- **Business & Analytics**: Content Analytics Engine, Admin Dashboard, SEO Performance & Growth Dashboard, Content Coverage Analyzer, Automated Content Growth Engine, Business Health & Subscriber Dashboard, Tier Health Dashboard, Content Integrity Engine Dashboard, and New Grad Analytics Dashboard.
- **Content Integrity Engine**: Automated content scanning, AI auto-repair, pre-publish validation, scheduled jobs, audit log with rollback, manual review queue, and a Deep Rationale Upgrade system for structured rationales.
- **Question-Driven SEO Blog Pipeline**: Automated gap analysis and question-driven blog generation with internal linking.
- **Explanation Engine**: Unified structured explanation storage with AI-powered batch generation, quality scoring, and review workflow.
- **Exam Readiness Predictor Engine**: Provides readiness scores, pass probability, percentile benchmarking, weak topic detection, and personalized recommendations.
- **Unified Question Schema & Country Adaptation**: `exam_questions` table extended with international fields, supporting filtering by country, language, and licensing body, with `country-adaptation.ts` for regional data mapping.
- **Multilingual Exam Question Translation Pipeline**: AI-powered batch translation of over 13,000 exam questions into 8 priority languages, leveraging a `content_translations` table with quality checks.
- **Taxonomy Protection System**: Strict taxonomy validation and normalization layer for content generation.
- **Admin Purchase Notifications**: Real-time email (Resend) and SMS (Twilio) alerts on purchase events, configurable via an admin UI.
- **Content Publishing Audit**: Admin-only system for comprehensive audit reports, quality fixes, coverage, and paywall enforcement for published content.
- **Clinical SEO Pages**: Database-driven clinical content pages for SEO across 5 content types (Conditions, Symptoms, Medications, Lab Values, Comparisons).
- **Content Publishing & Live Validation**: Comprehensive 8-section validation system for unpublished content, question metadata, duplicate stems, CAT rationale, exam page routes, flashcard linkage, tier access control, and content integrity. Admin-only APIs for validation, publishing, and duplicate removal. CAT rationale is restricted to admins during active exams.
- **Question Comments & Discussion**: Lightweight discussion system on practice questions, allowing users to comment, vote, and flag content, with admin moderation.
- **Exam Reliability System**: Production-grade exam stability with question validation, pool health checks, quarantine, incident tracking, error boundaries, report buttons, and API normalization.
- **Platform Resilience System**: Enterprise-grade infrastructure providing circuit breakers, feature flags, kill switches, health checks, rate limiting, self-healing triggers, emergency mode, provisional access, and entitlement caching. Includes client-side error boundaries and resilient fetch.
- **PTA Programmatic SEO Content System**: 22 rich educational content pages organized into 4 clusters plus 3 blog-style articles for PTA exam prep. Features embedded practice questions, FAQ accordion, structured data, internal linking, and conversion CTAs.
- **i18n Enforcement & Build Tooling**: Compile script for extracting translations, missing key tracking with reporting, a missing key API, and a fallback overlay for development. Includes build-blocking validation scripts for translation coverage, hardcoded string scanning (AST-based), and locale file completeness, ensuring build aborts on failures. Runtime i18n enforcement replaces silent English fallbacks with `TRANSLATION_UNAVAILABLE_MARKER`; `tSafe()` provides structured `{ text, status, isUnavailable }` for conditional rendering. `TranslationUnavailable` component renders localized fallback UI. Server-side content gating filters untranslated content from listings. Source content versioning marks translations outdated on English changes. Translation publishing lock blocks incomplete translations with admin override (`forcePublish`). Translation helpers (`server/translation-helpers.ts`) provide `getBulkTranslationStatuses()`, `markTranslationsOutdated()`, `checkTranslationCompleteness()` with `SUPPORTED_LANGUAGES` as single source of truth.
- **Exam Resilience Engine**: Production-grade backend resilience for the exam system including pre-publish validation, runtime normalization, versioned backup snapshots (exam_snapshots table), circuit breaker logic (per-exam, 3 failures in 10 min), server-side session recovery (exam_session_state table), static backup payloads (exam_backup_payloads table), and admin monitoring/alerting APIs. Key file: `server/exam-resilience-engine.ts`.
- **Centralized Entitlement Resolver**: Single `resolveEntitlement(userId, productType, productId)` function in `server/entitlements.ts` returns a normalized `EntitlementDecisionObject` with `hasAccess`, `accessSource`, `planId`, `provisional` flag, and more. All middleware (`requireEntitlement`, `requireAnyPremium`) routes through the resolver. Provisional access during billing sync delays uses `entitlement_cache` table with configurable grace window. Decision object attached to `req.entitlement`. Frontend hook `useEntitlement()` fetches from `/api/entitlement/resolve`. DB tables: `entitlement_cache`, `entitlement_decisions`.

### Content Publishing & Live Validation
Comprehensive validation system at `server/content-publishing-validator.ts` with 8-section validation:
1. **Unpublished Content**: Finds approved questions/flashcards ready for publishing, bulk-updates them (supports dry-run mode)
2. **Question Metadata**: Validates rationale (non-CAT), body_system, topic, options count, correct_answer, exam tag matching TIER_EXAM_MAP
3. **Duplicate Stems**: Detects exact duplicate stems and content_hash duplicates, optionally disables them
4. **CAT Rationale**: Verifies CAT-eligible questions don't expose rationale during active exams (exam-set endpoint uses `mode` param)
5. **Exam Page Routes**: Checks all tier/topic/exam/flashcard routes have published content (not empty states)
6. **Flashcard Linkage**: Validates deck-card relationships, orphaned cards, tier assignments, flashcard_bank entries
7. **Tier Access Control**: Programmatically verifies canUserAccessTier, getAllowedExamTiers, getAllowedContentTiers hierarchies
8. **Content Integrity**: Runs lightweight content scan via content-integrity-scanner
API endpoints (all admin-only):
- `POST /api/admin/content-publishing/validate` — Full 8-section validation (supports `dryRun`, `removeDuplicates`, `sections[]`)
- `POST /api/admin/content-publishing/publish-approved` — Bulk publish all approved content
- `POST /api/admin/content-publishing/remove-duplicates` — Find and disable duplicate stems/hashes
- `GET /api/admin/content-publishing/tier-check` — Verify tier access control hierarchy
- `GET /api/admin/content-publishing/cat-rationale-check` — Verify CAT exam rationale behavior
- `GET /api/admin/content-publishing/route-check` — Check exam page routes for content
- `GET /api/admin/content-publishing/summary` — Content status summary by tier/status
CAT rationale fix: `server/qbank-api.ts` exam-set endpoint only includes rationale/correctAnswerExplanation/distractorRationales for admin users. Non-admin users never receive rationale in exam-set responses regardless of query params — rationale is only available through `POST /api/qbank/attempt` after answer submission.

### PTA Programmatic SEO Content System
22 rich educational content pages organized into 4 content clusters (Conditions, Exercises, Anatomy & Movement, Modalities & Protocols) plus 3 blog-style SEO articles for PTA exam prep. Each content page features:
- Embedded practice questions (first 3 free, remaining locked/blurred with conversion CTA)
- FAQ accordion with FAQPage structured data
- Article + EducationalOrganization + BreadcrumbList structured data
- Internal linking engine (RelatedTopicsBlock) connecting pages across clusters
- Mid-page and end-page conversion CTAs to practice questions and pricing
- Cluster navigation badges and content exploration sections

Key files:
- `client/src/allied/data/pta-seo-content-data.ts` — Content data for all 22 pages + 3 blog pages
- `client/src/allied/pages/pta-seo-content-page.tsx` — Template components (PtaSeoContentPage + PtaBlogPage)
- Routes: `/allied-health/physiotherapy-assistant/guide/:slug` with PtaGuideRouter dispatching to content or blog template
- Sitemap: 25 URLs registered in `server/sitemap/allied-site.ts` under `generateAlliedSeoLanding()`

### i18n Enforcement & Build Tooling
- **Compile Script** (`script/compile-i18n.ts`): Regex-based source parser that extracts translations from all 20 language TS files and produces JSON files in `client/public/i18n/`. Integrated into the build pipeline via `script/build.ts`.
- **Missing Key Tracking**: `t()` function in `client/src/lib/i18n.tsx` reports missing translation keys to `POST /api/i18n/missing-keys` via debounced batched requests. In dev mode, non-English fallback content is wrapped in `[brackets]` for visibility.
- **Missing Key API**: `POST /api/i18n/missing-keys` (rate-limited, unauthenticated) accepts batched missing key reports. `GET` and `DELETE` endpoints require admin auth. Server: `server/i18n-missing-keys-routes.ts`.
- **Fallback Overlay** (`client/src/components/i18n-fallback-overlay.tsx`): Dev-mode component that wraps translated text with a red dashed border when `isFallback()` returns true.
- **AST Hardcoded String Scanner** (`script/scan-hardcoded-strings.ts` + `script/scan-hardcoded-strings-lib.ts`): AST-based scanner using TypeScript Compiler API that parses all frontend `.tsx`/`.ts` files and identifies hardcoded user-facing strings not wrapped in `t()`. Violations are classified into severity tiers: CRITICAL (buttons, headings, CTAs), HIGH (cards, labels, tooltips, placeholders), MEDIUM (metadata, secondary UI), LOW (logs). Each violation includes file path, line/column, the offending string, severity, and an auto-fix suggestion. Configurable via `i18n-scan.config.json` (thresholds, output path). Integrated into production build pipeline (`script/build.ts`). Pre-commit hook script at `script/i18n-precommit.sh`. Run via: `npx tsx script/scan-hardcoded-strings.ts [--no-fail] [--json] [--output path] [--threshold N]`.
- **`translationStatus(key)`**: New i18n context function returning `"translated" | "fallback" | "missing"` for granular status checking.

### Admin Security
- **Authentication**: JWT-only admin auth via `server/admin-auth.ts`. All x-admin-id header/body/query bypasses and plaintext password comparisons removed. Passwords hashed with bcrypt (12 rounds) with automatic migration from plaintext on login.
- **Admin Roles**: `super_admin`, `content_admin`, `support_admin`, `analytics_viewer` — enforced via `requireAdminRole()` middleware. `super_admin` bypasses role checks.
- **CSRF Protection**: Double-submit cookie pattern on all `/api/admin` state-changing routes. Token set on admin login, validated via `x-csrf-token` header.
- **Rate Limiting**: In-memory rate limiter on `/api/admin` routes (100 req/min per admin). Login rate limit (5 attempts/15 min per IP).
- **Re-auth & Confirmation Tokens**: Single-use re-auth tokens (5 min TTL) for sensitive ops. Single-use confirmation tokens (5 min TTL) for destructive actions.
- **Audit Logging**: Structured `logAdminAudit()` for admin actions with IP, action, and metadata.
- **JWT Secret**: `ADMIN_JWT_SECRET` env var required in production. Dev uses Repl-specific fallback.

### External Dependencies
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Payment Processing**: Stripe, PayPal SDK
- **AI/Content Generation**: Centralized AI Provider Router (OpenAI, Ollama, vLLM, LM Studio, Anthropic)
- **Object Storage**: Replit Object Storage (Google Cloud Storage)
- **Email**: Resend
- **SMS**: Twilio
