# NurseNest - Complete Nursing Learning Platform

## Overview
NurseNest is an adaptive learning platform for nursing and allied health students across 17 career verticals. It provides comprehensive learning resources, advanced exam preparation (e.g., NCLEX, REX-PN), and performance analytics. The platform utilizes AI for content generation to foster clinical reasoning, nursing knowledge, and critical thinking, ultimately aiming to enhance patient care outcomes. NurseNest aspires to be a market-leading, region-aware, and adaptive learning solution with a business vision to transform nursing education through technology, addressing a significant market need for flexible, high-quality, and adaptive learning tools.

## User Preferences
- Preferred communication style: Simple, everyday language.
- Admin account: user "erikanim" has tier="admin" with full content access bypass.
- Copyright must show current year dynamically (uses `new Date().getFullYear()`).
- NO normal lab values on lesson pages - only abnormal clinical findings.
- Content depth: Multi-paragraph cellular/molecular pathophysiology, detailed drug MOA at receptor level.
- Scope enforcement: RPN "monitor/report/administer as ordered," RN protocol-based, NP "order/prescribe".
- Regional content: CA shows CAD prices/Canadian labs, US shows USD/US values.
- NCLEX disclaimer: NurseNest is NOT affiliated with NCLEX, NCSBN, CNO, or any regulatory body.
- Copy protection: content cannot be easily copied/screenshotted.

## System Architecture
The NurseNest platform is built with a React UI (TypeScript, Wouter, shadcn/ui, Tailwind CSS v4) and an Express 5 backend on Node.js (TypeScript), utilizing Vite for tooling. TanStack React Query manages server state via a RESTful API. The UI/UX features 24 themes with a centralized semantic CSS token system, DM Sans typography, premium visuals, and interactive components, with theme preference persisted to the user profile. A Canva-style digital product builder with AI-powered content generation is integrated.

Core functionalities include a database-driven subscription model with regional pricing (CAD/USD), tier-based plans, lifetime one-time purchases via Stripe, and free trial usage caps. It offers interactive learning modules, a mock exam engine with stratified random sampling, and an admin dashboard. AI integrations power blog automation, an Adaptive CAT Engine, Pass Probability Projection, and a Next Best Action Engine, all routed through a centralized AI Provider Router. Exam blueprints are database-driven, and content is organized by body system, supporting NGN question types, partial credit scoring, and a Spaced Repetition System. Content access is managed by user tier.

Key architectural components and features:
- **Learning & Exam Preparation**: Includes Flashcards, Test Bank, Question Bank, Adaptive Flashcard System, Clinical Vignette Generation Engine, Mock Exam Engine (CAT & Practice modes), and an Adaptive Learning Engine.
- **AI-Powered Study & Content**: Features an AI Study Coaching & Course Generation System, Exam Date AI Study Planner, and an AI-Powered Generation & Safety system for content creation with quality gates.
- **Content & SEO**: Incorporates an Allied Health Encyclopedia, SEO Lesson Engine, Programmatic SEO Engines, Multilingual SEO & Translation System, Database-Driven Multi-Domain Sitemap Architecture, Internal Linking Engine, and an SEO Content Expansion System.
- **User Experience & Engagement**: Provides a Dashboard Lifecycle Command Center for adaptive user guidance and a Global Report a Problem System.
- **Medical Imaging Lesson Library**: A comprehensive library with 60+ lessons across 11 modules, region-tagged for ARRT (USA) and CAMRT (Canada), including quizzes and SEO metadata.
- **Pharmacy Tech Question Bank**: Contains 1,515 client-side questions with PTCB/PEBC certification tagging, supporting adaptive engine filtering and practice exams.
- **Multi-Profession Support**: A dynamic framework allows configuration of new healthcare professions with specific navigation and content, including an echocardiography path aligned with ARDMS RDCS-AE, CCI RCS, and CSCT Cardiac Sonography certifications.
- **NP Exam Ecosystem**: Structured preparation for AANP, ANCC, and Canadian NP exams with separate question banks and domain mapping. US and Canadian NP questions are strictly separated.
- **New Grad Resources**: Dedicated hubs for certifications and clinical references, including a "New Grad Survival Guide" with a hybrid paywall model for premium tools.
- **Unified Certification Hub & Cluster Architecture**: A single authoritative hub at `/nursing-certifications` covering various emergency and specialty certifications, with dedicated prep/renewal pages and bidirectional linking.
- **Database Safety & Management**: Utilizes PostgreSQL with Drizzle ORM, supported by an EnvironmentAwareContentWriteService.
- **Business & Analytics**: Features a Content Analytics Engine, Admin Dashboard, SEO Performance & Growth Dashboard, Content Coverage Analyzer, Automated Content Growth Engine, and a Business Health & Subscriber Dashboard.
- **Offline Capabilities**: An IndexedDB-based Offline Study System for question packs and flashcards.
- **Free Pass System**: Automatic 1-day free pass for new accounts with fraud detection.
- **Exam Follow-Up**: Post-exam follow-up system on the dashboard for result reporting and personalized next steps.
- **Career Question Banks**: Extensive question banks for MLT (Medical Laboratory Technologist), Surgical Technologist, and Respiratory Therapy (RRT) careers, including region-tagged content and calculation-heavy questions.
- **Herbal Supplements & Medication Safety Module**: Integrates 15 individual herb lessons, a hub overview, a surgery/anesthesia safety lesson, a 75+ question bank, and SEO educational pages.
- **SI Converter Cluster Pages**: 10 SEO content pages forming an internal linking cluster around an SI ↔ Conventional Units Converter hub, featuring educational content, mini converters, reference tables, and FAQ accordion.
- **SEO Canonical & Indexing Infrastructure**: Shared utility for building canonical URLs, managing indexing policies (`noindex,follow` for utility pages in non-English locales), handling slug generation, and implementing timestamp redirects and hreflang filtering.

## External Dependencies
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

## SEO Soft 404 Fix
- **Server-side status codes**: Both `server/vite.ts` (dev) and `server/static.ts` (prod) now return HTTP 404 for unknown/non-existent pages instead of always returning 200
- **Content existence check**: `checkContentExists()` in `server/seo-meta.ts` validates paths against known static routes, dynamic prefix routes with DB verification for `/learn/`, `/lessons/`, `/blog/`, `/clinical-clarity/` slugs
- **Untranslated content**: Non-English locale paths for `/learn/`, `/blog/`, `/clinical-clarity/` pages get `noindex, follow` robots tag and canonical URL pointing to the English version
- **Sitemap cleanup**: Language sitemaps (`server/sitemap/language-sitemaps.ts`) only include `/learn/` and `/blog/` URLs for the English locale; non-English locale sitemaps exclude these untranslated pages
- **Neurovascular assessment**: `/learn/neurovascular-assessment-explained-clearly` seeded in `content_items` table with comprehensive 6 P's nursing assessment content (~13K chars)

## Hero Page & Marketing Architecture
- **Platform Manifest**: `shared/platform-manifest.ts` — central data source for all marketing content (nursing tiers, certifications, allied health careers, supported countries/languages, platform features)
- **Hero Components** (all lazy-loaded from `client/src/components/`):
  - `hero-platform-stats.tsx` — 8-stat grid (questions, flashcards, lessons, exams, countries, languages)
  - `hero-features-grid.tsx` — 10-feature grid using PLATFORM_FEATURES from manifest
  - `hero-global-coverage.tsx` — country flags + language tags panels
  - `hero-nursing-tiers.tsx` — 3-column tier cards (RPN/RN/NP) with live progress bars from platform-proof API
  - `hero-certifications.tsx` — certification prep cards grid (BLS, ACLS, PALS, etc.)
  - `hero-allied-health.tsx` — pre-nursing, new grad, and allied health career cards
  - `hero-expansion-tracker.tsx` — question bank growth tracker with progress bars
- All components are integrated into `client/src/pages/home.tsx` using `LazySection + Suspense` for performance

## Popup Suppression System
- **Utility**: `client/src/lib/popup-suppression.ts` — `shouldShowPopup(id)`, `suppressPopup(id)`, `clearPopupSuppression(id)`
- **Mechanism**: localStorage-based 24-hour suppression per popup ID
- **Integrated popups**: exit_intent, upgrade_modal, upgrade_prompt, pwa_install
- **Excluded (forceShow/critical)**: exam-followup-modal (clinical), exam-session-guard (safety)
- **UI**: "Don't show again today" checkbox in exit-intent and upgrade modals; "Not today" in upgrade prompt toast
- **PWA**: Layered — 24h suppression + existing 7-day dismiss both apply

## RN Question Bank Expansion — Batch 2
- **Engine**: `server/rn-batch2-expansion-engine.ts` — Dedicated expansion engine for 7 RN categories
- **Categories**: Maternal/Newborn (~100), Pediatrics (~100), Mental Health (~80), Leadership/Delegation (~80), Critical Care (~50), Community Health (~50), Emergency Nursing (~50)
- **Total target**: 510 questions with companion flashcards, image matching, and lesson links
- **API Routes** (admin-only, in `server/expansion-engine-routes.ts`):
  - `POST /api/admin/expansion-engine/rn-batch2/start` — Run full batch 2 expansion
  - `POST /api/admin/expansion-engine/rn-batch2/start-category` — Run single category (`{ category, targetCount }`)
  - `GET /api/admin/expansion-engine/rn-batch2/status` — Check batch 2 status and counts
- **Features**: AI-generated via OpenAI, duplicate detection (stem hash + similarity check), auto-tagging, image matching, lesson link injection, flashcard bank companion cards

## Adaptive Study Engine
- Routes: `/study` (hub with all mode tiles) and `/study/:mode` (auto-starts a specific mode)
- Mode slugs: `recommended`, `weak-areas`, `due-review`, `flagged`, `rapid`, `mixed`, `pre-exam`
- Tiles navigate to `/study/{slug}` on click, with per-tile loading spinners and error banners
- Exit Session / Back to Study Modes navigates back to `/study`
- Free users: only `recommended` and `rapidReview` modes are unlocked
