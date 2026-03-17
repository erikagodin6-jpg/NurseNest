# NurseNest - Complete Nursing Learning Platform

### Overview
NurseNest is an adaptive learning platform designed for nursing and allied health students across 17 career verticals. It offers comprehensive learning resources, advanced exam preparation (e.g., NCLEX, REX-PN), and performance analytics. The platform leverages AI for content generation to enhance clinical reasoning, nursing knowledge, and critical thinking, ultimately improving patient care outcomes. NurseNest aims to be a market-leading, region-aware, and adaptive learning solution, transforming nursing education through technology to meet the significant market demand for flexible, high-quality educational tools.

### User Preferences
- Preferred communication style: Simple, everyday language.
- Admin account: user "erikanim" has tier="admin" with full content access bypass.
- Copyright must show current year dynamically (uses `new Date().getFullYear()`).
- NO normal lab values on lesson pages - only abnormal clinical findings.
- Content depth: Multi-paragraph cellular/molecular pathophysiology, detailed drug MOA at receptor level.
- Scope enforcement: RPN "monitor/report/administer as ordered," RN protocol-based, NP "order/prescribe".
- Regional content: CA shows CAD prices/Canadian labs, US shows USD/US values.
- NCLEX disclaimer: NurseNest is NOT affiliated with NCLEX, NCSBN, CNO, or any regulatory body.
- Copy protection: content cannot be easily copied/screenshotted.

### System Architecture
NurseNest is built with a React UI (TypeScript, Wouter, shadcn/ui, Tailwind CSS v4) and an Express 5 backend on Node.js (TypeScript), utilizing Vite for tooling. TanStack React Query manages server state via a RESTful API. The UI/UX features 24 themes, semantic CSS tokens, DM Sans typography, and interactive components.

Core functionalities include a database-driven subscription model with regional pricing (CAD/USD), tier-based plans, Stripe-based lifetime purchases, and free trial usage caps. It offers interactive learning modules, a mock exam engine with stratified random sampling, and an admin dashboard. AI integrations power blog automation, an Adaptive CAT Engine, Pass Probability Projection, and a Next Best Action Engine, all routed through a centralized AI Provider Router. Exam blueprints are database-driven, content is organized by body system, and supports NGN question types, partial credit scoring, and a Spaced Repetition System. Content access is managed by user tier.

Key architectural components and features:
- **Learning & Exam Preparation**: Includes Flashcards, Test Bank, Question Bank, Adaptive Flashcard System, Clinical Vignette Generation Engine, Mock Exam Engine (CAT & Practice modes), and an Adaptive Learning Engine.
- **AI-Powered Study & Content**: Features an AI Study Coaching & Course Generation System, Exam Date AI Study Planner, and an AI-Powered Generation & Safety system for content creation with quality gates.
- **Content & SEO**: Incorporates an Allied Health Encyclopedia, SEO Lesson Engine, Programmatic SEO Engines, Multilingual SEO & Translation System, Database-Driven Multi-Domain Sitemap Architecture, Internal Linking Engine, and an SEO Content Expansion System.
- **User Experience & Engagement**: Provides a Dashboard Lifecycle Command Center for adaptive user guidance and a Global Report a Problem System.
- **Multi-Profession Support**: A dynamic framework allows configuration of new healthcare professions with specific navigation and content, including specialized question banks for MLT, Surgical Technologist, Respiratory Therapy, and dedicated NP Exam Ecosystems.
- **Database Safety & Management**: Utilizes PostgreSQL with Drizzle ORM, supported by an EnvironmentAwareContentWriteService.
- **Business & Analytics**: Features a Content Analytics Engine, Admin Dashboard, SEO Performance & Growth Dashboard, Content Coverage Analyzer, Automated Content Growth Engine, Business Health & Subscriber Dashboard, and a Tier Health Dashboard & Expansion Watchlist (`/admin/tier-health`) showing per-tier question counts, staleness warnings, parsing failure logs, uncategorized question detection, low-volume alerts, ranked expansion watchlist with scoring, and AI question pool monitoring.
- **Offline Capabilities**: An IndexedDB-based Offline Study System for question packs and flashcards.
- **Universal Question Counting Engine**: A build-time manifest generator for public-facing question counts.
- **Specialized Content Modules**: Includes a Medical Imaging Lesson Library, Pharmacy Tech Question Bank, Herbal Supplements & Medication Safety Module, and SI Converter Cluster Pages, all with integrated SEO and specific functionalities.
- **SEO Infrastructure**: Implements 301 Redirect Middleware, structured data generation (Article, Course, MedicalCondition, FAQ schemas), thin content detection for noindexing, sitemap cleanup, and optimized meta title/description generation. Handles server-side status codes for 404s and manages `noindex, follow` for untranslated content.
- **E-E-A-T Trust Signals**: `MedicalReviewBadge` (reviewer credentials, last-reviewed date, editorial statement) and `MedicalReferences` (topic-aware citations from WHO, CDC, NIH, RNAO + specialty-specific refs) components on lesson, SEO lesson, certification exam, and profession hub pages. `MedicalReviewJsonLd` renders MedicalWebPage JSON-LD structured data with author, reviewedBy, medicalAudience, and publisher fields. Key files: `client/src/components/medical-review-badge.tsx`, `client/src/components/medical-references.tsx`.
- **Hero Page & Marketing Architecture**: Uses a centralized `platform-manifest.ts` for all marketing content, rendered by lazy-loaded React components.
- **Adaptive Study Engine**: Provides various study modes (`recommended`, `weak-areas`, `due-review`, `flagged`, `rapid`, `mixed`, `pre-exam`) with distinct routes, supporting free and paid user access.
- **Free Pass System**: Automatic 1-day free pass for new accounts with fraud detection.
- **Exam Follow-Up**: Post-exam follow-up system on the dashboard for result reporting and personalized next steps.
- **Certification Exam Prep Hub**: Comprehensive certification exam preparation at `/certification-exam-prep` covering 11 nursing certifications (BLS, ACLS, PALS, NRP, TNCC, ENPC, CCRN, CEN, OCN, CPN, CNOR). Features 500+ certification-specific practice questions across `certification-banks.ts` and `cert-banks-expanded.ts`, four practice modes (Topic Practice, Algorithm Scenarios, Mixed Practice, Full Mock Exams), 3 mock exams per certification, individual authority pages for each certification at `/certifications/{slug}-prep`, dynamic question counting, FAQ accordion, and `cert-question-generator.ts` utility system. ACTIVE_BUILD_PRIORITY = "CERTIFICATION_EXAM_EXPANSION" in admin config.
- **Career Question Banks**: Extensive question banks for MLT (Medical Laboratory Technologist), Surgical Technologist, and Respiratory Therapy (RRT) careers, including region-tagged content and calculation-heavy questions.
- **Certification Exam Bank Expansion**: Comprehensive certification exam preparation system at `/certification-exam-prep` covering 11 nursing certifications (BLS, ACLS, PALS, NRP, TNCC, ENPC, CCRN, CEN, OCN, CNOR, CPN). Includes 17,000+ practice questions, 33 mock exams, topic-specific question banks, 4 practice modes (Topic Practice, Algorithm Scenarios, Mixed Practice, Full Mock Exams), timed exam engine with performance breakdown, SATA multi-select question support, premium paywall gating, admin analytics tab, FAQ schema SEO, and multi-language support (EN/FR/ES). Key files: `client/src/data/certification-exam-data.ts`, `client/src/pages/certification-exam-prep-hub.tsx`, `client/src/pages/certification-exam-detail.tsx`, `client/src/pages/certification-practice.tsx`.
- **Herbal Supplements & Medication Safety Module**: Integrates 15 individual herb lessons, a hub overview, a surgery/anesthesia safety lesson, a 75+ question bank, and SEO educational pages.
- **SI Converter Cluster Pages**: 10 SEO content pages forming an internal linking cluster around an SI ↔ Conventional Units Converter hub, featuring educational content, mini converters, reference tables, and FAQ accordion.
- **International Nursing Hub**: Comprehensive SEO section at `/international-nurses` targeting internationally educated nurses (IENs). Includes hub page, 8 destination country pages (`/international-nurses/:country`), 8 migration pathway pages (e.g., `/philippines-to-canada`), 6 exam pages (NCLEX, REx-PN, IELTS, OET, credential assessment, license transfer), 3 country comparison pages, and 10 supporting content cluster pages. All pages use config-driven architecture with teal color scheme, FAQ schema, and breadcrumb navigation. Navigation link in ecosystem bar, sitemap entries, and SEO meta paths registered.
- **SEO Canonical & Indexing Infrastructure**: Shared utility for building canonical URLs, managing indexing policies (`noindex,follow` for utility pages in non-English locales), handling slug generation, and implementing timestamp redirects and hreflang filtering.
- **Popup Suppression System**: LocalStorage-based 24-hour suppression for various modals and toasts.
- **Question Explanation Engine**: Unified structured explanation storage (`question_explanations` table) across all question sources (exam_questions, allied_questions, imaging_questions). Features AI-powered batch generation via OpenAI, quality scoring (clarity/accuracy/depth/usefulness composite), review status workflow (pending/approved/flagged), and migration utility for existing rationale data. API endpoints: GET `/api/explanations/:source/:questionId`, POST `/api/explanations/generate-batch`, GET `/api/explanations/stats`, PATCH `/api/explanations/:id/review`, GET `/api/explanations/low-quality`, POST `/api/explanations/migrate`.
- **Explanation Engine (Frontend)**: Structured post-answer explanations via `ExplanationPanel` component (`client/src/components/explanation-panel.tsx`). Shows correct answer rationale, distractor rationales, clinical context, key takeaway, and expandable sections (clinical pearls, mnemonics, exam strategy, step-by-step reasoning). Learning Mode (3rd QBank mode) auto-reveals explanations on answer selection. Deep explanation content gated behind premium tiers using `hasAccess()`. Promotional CTAs added to TrackLandingPage, hero-proof-showcase, career-exams-page, and np-exam-hub.
- **Explanation Engine Admin Tools & Analytics** (`/admin/explanations`): Admin dashboard with three tabs — Dashboard (summary stats: coverage %, quality distribution, missing counts by source, recent explanations, batch generation triggers), Review Queue (filterable list by status/source/quality/generator with inline editing, approve/flag/reset actions, related content viewer and auto-linker), and Roadmap (`CONTENT_EXPANSION_ROADMAP` config with ranked priorities). API endpoints: GET `/api/admin/explanations/dashboard`, GET `/api/admin/explanations/review-queue`, PATCH `/api/admin/explanations/:id`, GET `/api/admin/explanations/:id/related`, POST `/api/admin/explanations/:id/link-related`, GET `/api/admin/content-expansion-roadmap`, POST `/api/admin/explanations/batch-generate-by-career`. Related content engine auto-links questions (same topic), lessons, and flashcards. Explanation coverage metrics added to `/api/admin/diagnostics`. Key files: `client/src/pages/admin-explanations.tsx`, `server/routes.ts`, `server/storage.ts`, `shared/schema.ts`.
- **Exam Readiness Predictor Engine**: Comprehensive readiness prediction and benchmarking backend. Produces 0-100 readiness score with four tiers (Early Preparation, Developing, Almost Ready, Exam Ready) using practice tests, adaptive performance, topic accuracy, flashcard retention, and difficulty progression. Features pass probability estimation, percentile benchmarking against anonymized peer data (scoped by exam type: RN, RPN, NP, certification), weak topic detection with resource links, personalized practice recommendations, weekly readiness snapshots (`readiness_history` table), benchmark profiles (`benchmark_profiles` table), and recommendation caching (`practice_recommendations` table). Paywall-aware: free users get score/tier only; premium users get full analysis. Admin endpoints for analytics and benchmark recomputation. Key files: `server/readiness-engine.ts`, `server/readiness-routes.ts`. API endpoints: GET `/api/readiness/:userId`, GET `/api/readiness/:userId/history`, GET `/api/readiness/:userId/benchmarks`, GET `/api/readiness/:userId/recommendations`, POST `/api/readiness/snapshot`, GET `/api/admin/readiness/analytics`, GET `/api/admin/readiness/config`, POST `/api/admin/readiness/recompute-benchmarks`.
- **Nursing Licensing Exams Hub**: SEO content hub at `/nursing-licensing-exams` with detail pages for 7 exams (NCLEX, REx-PN, NMC CBT, AHPRA, Prometric, IELTS for Nurses, OET for Nurses). Each detail page at `/nursing-licensing-exams/:slug` includes key facts, exam format, eligibility, preparation tips, FAQ accordion, and structured data. Data file: `client/src/data/licensing-exams-data.ts`. Pages: `client/src/pages/nursing-licensing-exams-hub.tsx`, `client/src/pages/licensing-exam-detail.tsx`.
- **Nurse Salary & Career Guide**: SEO content hub at `/nurse-salary-guide` with 4 country subpages (`/nurse-salary-canada`, `/nurse-salary-united-states`, `/nurse-salary-united-kingdom`, `/nurse-salary-australia`). Features comparison tables, specialty salary breakdowns, experience-based salary data, career outlook, and FAQ sections. Data file: `client/src/data/nurse-salary-data.ts`. Pages: `client/src/pages/nurse-salary-guide-hub.tsx`, `client/src/pages/nurse-salary-country.tsx`.
- **AI Tutoring Assistant**: Context-aware AI tutor powered by OpenAI (gpt-4o-mini) with floating chat widget embedded on practice question, flashcard, study guide, and mock exam pages. Features SSE streaming responses, safety guardrails (no clinical advice — exam prep only), i18n support (EN/FR/ES), free-tier daily limits (5/day), and premium unlimited access. Uses `tutor_conversations` and `tutor_messages` tables for chat history, and `feature_usage` table for atomic rate limiting. API endpoints: POST `/api/tutor/conversations`, GET `/api/tutor/conversations/:id/messages`, POST `/api/tutor/conversations/:id/messages` (SSE streaming), GET `/api/tutor/usage`. Key files: `server/tutor-routes.ts`, `client/src/components/ai-tutor-widget.tsx`. `ACTIVE_BUILD_PRIORITY` set to `AI_TUTORING_ASSISTANT` in admin AI config.
- **AI Tutor Admin Controls & Analytics**: Admin panel "Tutor Management" tab with system prompt configuration, safety filter category toggles, daily free-tier limit settings, usage analytics dashboard (daily/weekly/monthly questions, top topics, explanation types, tier usage), conversation review interface (browse/filter/flag conversations), and a development roadmap panel (Competitive Study Leaderboards, Group Study Rooms, Daily Study Streaks, Exam Countdown Tracker). Backend routes in `server/tutor-admin-routes.ts`, frontend in `client/src/pages/admin-tutor.tsx`, schema tables `tutor_admin_config` and `tutor_conversations` in `shared/schema.ts`.
- **Backup & Export System**: Full project backup system with CLI scripts (`npm run backup:full`, `backup:db`, `backup:assets`, `export:deployment`, `backup:validate`) and admin UI at `/admin/backups`. Creates timestamped zip archives, database snapshots, asset copies, and deployment packages with DEPLOYMENT_README.md. Backup history and validation logging stored in `/backups/logs/`.

### External Dependencies
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Payment Processing**: Stripe, PayPal SDK
- **AI/Content Generation**: Centralized AI Provider Router (supports OpenAI, Ollama, vLLM, LM Studio, Anthropic)
- **Object Storage**: Replit Object Storage (Google Cloud Storage)

## Critical Build Notes
- **DO NOT use manual chunk splitting (`manualChunks`) in vite.config.ts.** React 19 uses an `Activity` export that causes module initialization race conditions when React, ReactDOM, and dependent libraries (Radix UI, etc.) are split into separate vendor chunks. Vite's default code splitting handles initialization order correctly.
- **Build command**: `npm run build` — outputs to `dist/public` for client, `dist/index.cjs` for server. Uses `NODE_OPTIONS=--max-old-space-size=4096` to prevent OOM crashes. Build phases run sequentially to minimize memory peaks.
- **Deployment**: build: `["npm","run","build"]`, run: `["node","./dist/index.cjs"]`

## Herbal Supplements & Medication Safety Module
- **15 individual herb lessons** + 1 hub overview + 1 surgery/anesthesia safety lesson in `client/src/data/lessons/herbal-supplements.ts`
- **75+ question bank** in `client/src/data/lessons/herbal-supplements-questions.ts`
- **5 SEO educational pages** in `client/src/data/seo-herbal-supplements.ts` with `SeoHerbalPage` interface
- **Hub page component**: `client/src/pages/herbal-supplements-hub.tsx` — organized by interaction category (bleeding risk, CNS depressants, CYP450, special populations)
- **SEO page component**: `client/src/pages/herbal-supplement-page.tsx` — renders SEO herbal guides with FAQ structured data
- **Routes**: `/herbal-supplements` (hub), `/herbal-supplements/:slug` (SEO pages), individual lessons via `/lessons/:id`
- **Navigation**: All 15 herbs + hub + question bank listed in pharmacology-rn section of lessons.tsx
- **Sitemap**: 5 SEO pages + hub registered in `server/sitemap/main-site.ts`
- **Lesson IDs**: herbal-supplements-hub, st-johns-wort, ginkgo-biloba, garlic-supplement, ginseng-supplement, echinacea-supplement, valerian-root, kava-supplement, saw-palmetto, black-cohosh, evening-primrose-oil, melatonin-supplement, chamomile-supplement, turmeric-curcumin, omega-3-fatty-acids, cranberry-supplement, surgery-anesthesia-herbal-safety, herbal-supplements-question-bank

## SI Converter Cluster Pages
- **10 SEO content pages** forming an internal linking cluster around the SI ↔ Conventional Units Converter hub (`/si-to-conventional-units-converter`)
- **Data config**: `client/src/data/conversion-cluster-data.ts` — all page content, FAQs, reference charts, conversion examples, and internal links
- **Shared component**: `client/src/pages/conversion-cluster-page.tsx` — renders educational content, mini converter, reference table, FAQ accordion, JSON-LD structured data (MedicalWebPage + FAQPage)
- **Wrapper**: `client/src/pages/conversion-cluster-wrapper.tsx` — resolves URL slug to page data
- **Slugs**: canadian-vs-american-lab-values, glucose-mmol-l-to-mg-dl, creatinine-umol-l-to-mg-dl, hemoglobin-g-l-to-g-dl, bilirubin-umol-l-to-mg-dl, calcium-mmol-l-to-mg-dl, urea-to-bun-conversion-nursing, cholesterol-triglyceride-unit-conversion, kg-to-lb-nursing, celsius-to-fahrenheit-nursing
- **SEO meta**: All 10 pages registered in `server/seo-meta.ts`
- **Sitemap**: All 10 pages registered in `server/sitemap/main-site.ts` with priority 0.7
- **Internal linking**: Hub page links down to all 10 cluster pages via "In-Depth Conversion Guides" section; each cluster page links back to hub and to related cluster pages

## SEO Technical Infrastructure
- **301 Redirect Middleware**: `server/seo-redirects.ts` — detects timestamp-suffix duplicate URLs (pattern `-\d{10,13}`) on `/lessons/:slug` and `/learn/:slug` across all locale prefixes, strips suffix and 301 redirects to canonical slug. Also handles known bad slug redirects in single-hop resolution.
- **Structured Data**: Lesson pages emit Article, Course, MedicalCondition, and FAQ JSON-LD schemas. `seo-lesson-detail.tsx` includes Article schema via `buildArticleSD()`. `lesson-detail.tsx` uses `buildLessonFaqFromContent()` + `buildFaqStructuredData()` for content-derived FAQs.
- **Thin Content Detection**: `isLessonThinContent()` in `client/src/lib/seo-utils.ts` flags lessons with placeholder/incomplete content for noindex. `content-page.tsx` applies noindex for pages with <100 words or <2 content blocks.
- **Sitemap Cleanup**: `server/sitemap/main-site.ts` and `server/sitemap/language-sitemaps.ts` filter out timestamp-suffix duplicate slugs and thin content from lesson and blog sitemaps.
- **Meta Optimization**: `generateLessonSeoTitle()` and `generateLessonSeoDescription()` in `client/src/lib/seo-utils.ts` produce exam-relevance-focused titles and descriptions.

## Multilingual Translation System
- **20 languages**: en, fr, es, tl, hi, zh, zh-tw, ar, ko, pt, pa, vi, ht, ur, ja, fa, de, th, tr, id
- **UI strings**: All i18n-*.ts source files in `client/src/lib/`, compiled to JSON via `npx tsx script/compile-i18n.ts`
- **Content**: Lesson content translations in `client/src/data/translations/{lang}.json` (~614 lessons per language)
- **Build-time validation**: `node scripts/validate-translations.mjs --fail-on-threshold` — exits non-zero if any language is below 95% UI coverage
- **Translation scripts**:
  - `scripts/translate-ui-strings.mjs` — AI batch translator for UI strings (uses modelfarm GPT-4o-mini)
  - `scripts/translate-content-titles.mjs` — AI batch translator for lesson content
  - `scripts/convert-zhtw-fast.mjs` — Character-level Simplified→Traditional Chinese conversion
  - `scripts/validate-translations.mjs` — Audit script with coverage report
- **Hreflang**: Configured in `server/translation-audit.ts` getHreflangCode() for all 20 languages
- **High-EN-borrowing languages**: Filipino (tl), Indonesian (id), Haitian Creole (ht) have relaxed untranslated detection thresholds

## Adaptive Study Engine
- Routes: `/study` (hub with all mode tiles) and `/study/:mode` (auto-starts a specific mode)
- Mode slugs: `recommended`, `weak-areas`, `due-review`, `flagged`, `rapid`, `mixed`, `pre-exam`
- Tiles navigate to `/study/{slug}` on click, with per-tile loading spinners and error banners
- Exit Session / Back to Study Modes navigates back to `/study`
- Free users: only `recommended` and `rapidReview` modes are unlocked
