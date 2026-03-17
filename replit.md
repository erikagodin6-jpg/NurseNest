### Overview
NurseNest is an adaptive learning platform for nursing and allied health students across 17 career verticals. It provides comprehensive learning resources, advanced exam preparation (e.g., NCLEX, REX-PN), and performance analytics. The platform utilizes AI for content generation to enhance clinical reasoning, nursing knowledge, and critical thinking, aiming to improve patient care outcomes. NurseNest aspires to be a market-leading, region-aware, and adaptive learning solution, transforming nursing education through technology to meet the significant market demand for flexible, high-quality educational tools.

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

### System Architecture
NurseNest is built with a React UI (TypeScript, Wouter, shadcn/ui, Tailwind CSS v4) and an Express 5 backend on Node.js (TypeScript), using Vite for tooling. TanStack React Query manages server state via a RESTful API. The UI/UX features 24 themes, semantic CSS tokens, DM Sans typography, and interactive components. The database is PostgreSQL with Drizzle ORM.

Core functionalities include a database-driven subscription model with regional pricing (CAD/USD), tier-based plans, Stripe-based lifetime purchases, and free trial usage caps. It offers interactive learning modules, a mock exam engine with stratified random sampling, and an admin dashboard. AI integrations, routed through a centralized AI Provider Router, power blog automation, an Adaptive CAT Engine, Pass Probability Projection, a Next Best Action Engine, an AI Tutoring Assistant, and content generation with quality gates. Exam blueprints are database-driven, content is organized by body system, and supports NGN question types, partial credit scoring, and a Spaced Repetition System. Content access is managed by user tier.

Key architectural components and features:
- **Learning & Exam Preparation**: Includes Flashcards, Test Bank, Question Bank, Adaptive Flashcard System, Clinical Vignette Generation Engine, Mock Exam Engine (CAT & Practice modes), and an Adaptive Learning Engine. Comprehensive certification exam preparation for 11 nursing certifications with 17,000+ practice questions and 33 mock exams. NGN Clinical Judgment question engine supports 16 format types (DRAG_DROP_CLOZE, DRAG_DROP_RATIONALE, DROPDOWN_CLOZE, DROPDOWN_RATIONALE, DROPDOWN_TABLE, MATRIX_SINGLE, MATRIX_MULTI, MULTI_RESPONSE_GROUPING, TREND, HIGHLIGHT_TEXT, BOWTIE, CASE_STUDY_SERIES, LAB_INTERPRETATION, IMAGE_HOTSPOT, CALCULATION_NUMERIC, MATCHING_GRID) with TypeScript types, partial-credit scoring, interactive UI renderers, and CAT engine format diversity balancing.
- **AI-Powered Study & Content**: Features an AI Study Coaching & Course Generation System, Exam Date AI Study Planner, AI-Powered Generation & Safety system for content creation with quality gates, and a context-aware AI Tutoring Assistant.
- **Content & SEO**: Incorporates an Allied Health Encyclopedia, SEO Lesson Engine, Programmatic SEO Engines, Multilingual SEO & Translation System, Database-Driven Multi-Domain Sitemap Architecture, Internal Linking Engine, SEO Content Expansion System, Clinical Calculators Hub (7 interactive calculators), Nursing Study Guides Hub (5 long-form guides), Nursing Clinical Scenarios Hub (5 interactive case studies), Medical Abbreviations & Clinical Terminology Hub (`/medical-abbreviations-for-nurses` with 25 abbreviations), Clinical Skills Checklist Library (`/nursing-skill-checklists` with 5 procedure checklists), International Nursing Hub, Healthcare Careers Hub, Healthcare Certifications Hub, Healthcare Policy & Updates Hub, Nurse Salary & Career Guide, and SI Converter Cluster Pages.
- **Category Hub Pages & Topic Clusters**: 6 nursing category hub pages (`/cardiology-nursing`, `/respiratory-nursing`, `/endocrine-nursing`, `/neurology-nursing`, `/electrolytes-nursing`, `/pharmacology-nursing`) with bidirectional linking to topic cluster pages, FAQ schema markup, related hubs cross-linking, and SEO meta. Data: `shared/category-hub-data.ts`. Component: `client/src/pages/category-hub-page.tsx`.
- **User Experience & Engagement**: Provides a Dashboard Lifecycle Command Center for adaptive user guidance, a Global Report a Problem System, and an IndexedDB-based Offline Study System.
- **Multi-Profession Support**: A dynamic framework allows configuration of new healthcare professions with specific navigation and content, including specialized question banks for MLT, Surgical Technologist, Respiratory Therapy, and dedicated NP Exam Ecosystems. OTA (NBCOT COTA) and PTA (NPTE-PTA) hub pages include 5 authority sections: What's Included, Who This Is For, How the Bank Works, Practice Strategy, and FAQ. `ACTIVE_BUILD_PRIORITY` and `CONTENT_EXPANSION_ROADMAP` constants in `shared/careers.ts` track build priorities and expansion planning, exposed in the admin dashboard.
- **Database Safety & Management**: Utilizes PostgreSQL with Drizzle ORM and an EnvironmentAwareContentWriteService, alongside a comprehensive Backup Export & Disaster Recovery System.
- **Business & Analytics**: Features a Content Analytics Engine, Admin Dashboard, SEO Performance & Growth Dashboard, Content Coverage Analyzer, Automated Content Growth Engine, Business Health & Subscriber Dashboard, and a Tier Health Dashboard & Expansion Watchlist with detailed metrics. Admin tools for AI Tutor management, explanation engine, and backup systems.
- **Offline Capabilities**: IndexedDB-based Offline Study System for question packs and flashcards.
- **Universal Question Counting Engine**: Build-time manifest generator for public-facing question counts.
- **Specialized Content Modules**: Medical Imaging Lesson Library, Pharmacy Tech Question Bank, Herbal Supplements & Medication Safety Module, SI Converter Cluster Pages.
- **SEO Infrastructure**: 301 Redirect Middleware, structured data generation (Article, Course, MedicalCondition, FAQ schemas), thin content detection for noindexing, sitemap cleanup, optimized meta title/description generation, server-side 404s, `noindex, follow` for untranslated content.
- **E-E-A-T Trust Signals**: `MedicalReviewBadge` (reviewer bio, credentials, LinkedIn, link to /medical-review-team) and `MedicalReferences` (topic-aware citations) on all educational pages. `MedicalReviewJsonLd` for structured data. Dedicated `/medical-review-team` page. Footer links to medical review team.
- **Hero Page & Marketing Architecture**: Centralized `platform-manifest.ts` for marketing content rendered by lazy-loaded React components.
- **Adaptive Study Engine**: Provides various study modes (`recommended`, `weak-areas`, `due-review`, `flagged`, `rapid`, `mixed`, `pre-exam`) with distinct routes, supporting free and paid user access.
- **Free Pass System**: Automatic 1-day free pass for new accounts with fraud detection.
- **Exam Follow-Up**: Post-exam follow-up system on the dashboard for result reporting and personalized next steps.
- **Certification Exam Prep Hub**: Comprehensive preparation for 11 nursing certifications, including 17,000+ practice questions, 33 mock exams, four practice modes, timed exam engine, and premium paywall gating.
- **Career Question Banks**: Extensive question banks for MLT, Surgical Technologist, and Respiratory Therapy.
- **Question Generation Pipeline**: Industrial-strength pipeline for scaling question banks, blueprint-weighted, with duplicate detection and quality scoring.
- **International Nursing Hub**: SEO section targeting internationally educated nurses (IENs) with country, pathway, and exam pages.
- **SEO Canonical & Indexing Infrastructure**: Shared utility for building canonical URLs, managing indexing policies, slug generation, timestamp redirects, and hreflang filtering.
- **Popup Suppression System**: LocalStorage-based 24-hour suppression for modals and toasts.
- **Explanation Engine**: Unified structured explanation storage with AI-powered batch generation, quality scoring, review workflow, and comprehensive admin tools for management and analytics. Frontend via `ExplanationPanel` component with rationales, clinical context, key takeaways, and expandable sections.
- **Exam Readiness Predictor Engine**: Comprehensive readiness prediction and benchmarking backend, providing 0-100 readiness scores, pass probability, percentile benchmarking, weak topic detection, and personalized practice recommendations.
- **Nursing Licensing Exams Hub**: SEO content hub with detail pages for 7 exams.
- **Nurse Salary & Career Guide**: SEO content hub with country-specific salary breakdowns and career outlook.
- **AI Tutoring Assistant**: Context-aware AI tutor powered by OpenAI (gpt-4o-mini) with floating chat widget, SSE streaming, safety guardrails, i18n support, and tier-based limits.
- **AI Tutor Admin Controls & Analytics**: Admin panel for system prompt configuration, safety filters, usage analytics, conversation review, and development roadmap.
- **Backup & Export System**: Full project backup system with CLI scripts and admin UI for timestamped zip archives, database snapshots, asset copies, and deployment packages.
- **Healthcare Careers Hub**: SEO career exploration section with detail pages for 12 professions.
- **Healthcare Certifications Hub**: SEO certifications database with detail pages for 10 certifications.
- **Healthcare Policy & Updates Hub**: Hub at `/healthcare-policy-and-updates` with 4 policy sub-pages (licensing changes, international recruitment, exam updates, regulatory changes). Article + FAQ structured data, breadcrumbs, and cross-links.
- **Unified Question Schema & Country Adaptation**: `exam_questions` table extended with international fields; `shared/country-adaptation.ts` maps country codes to lab unit systems, medication naming, licensing bodies, and exam types. API endpoints support filtering by country, language, and licensing body.
- **Multilingual Translation System**: Supports 20 languages for UI strings and content, with build-time validation and AI batch translation scripts. Configures hreflang tags.
- **Vite Build Configuration**: Avoids manual chunk splitting in `vite.config.ts` due to React 19 `Activity` export issues. Build command `npm run build` uses `NODE_OPTIONS=--max-old-space-size=4096`.

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

## Unified Question Schema & Country Adaptation
- **exam_questions table** extended with international/global fields: `country_code`, `region_code`, `licensing_body`, `language_code`, `cognitive_level`, `question_format`, `is_scenario`, `is_mock_exam_eligible`, `is_adaptive_eligible`, `is_flashcard_source`, `is_study_guide_linked`, `is_tutor_ready`, `correct_answer_explanation`, `incorrect_answer_rationale`, `clinical_reasoning`, `key_takeaway`, `mnemonic`, `reference_source`, `lab_unit_variant`, `medication_naming_variant`, `case_context`, `vitals`, `labs`, `images`, `scenario_id`, `blueprint_weight`
- **Country Adaptation Constants**: `shared/country-adaptation.ts` maps country codes (CA, US, GB, AU) to lab unit systems, medication naming conventions, licensing bodies, exam types, and lab reference ranges
- **API Filtering**: QBank endpoints (`/api/qbank`, `/api/qbank/filters`) support `country_code`, `language_code`, `licensing_body` query params
- **Admin endpoints**: GET/PATCH `/api/admin/qbank/question/:id` expose all unified schema fields

## Expansion Roadmap Dashboard & Content Manifests
- **Admin Tab**: "Expansion Roadmap" tab in admin dashboard at `/admin?tab=expansion-roadmap`
- **GLOBAL_CONTENT_EXPANSION_ROADMAP**: 5-phase expansion plan constant in `client/src/config/expansion-roadmap.ts` covering Core Nursing Tiers, Allied Health Expansion, Nursing Certification Exams, Global/Multilingual Expansion, and Advanced Features
- **Content Inventory API**: `GET /api/admin/content-inventory` returns live database aggregations by tier, exam, country, language, topic, format, status, plus allied health career breakdowns, mock exam counts, scenario counts, lesson counts, flashcard deck/card counts, explanation counts, and blueprint gaps
- **Manifest Dashboard**: Sub-tabs for Overview, Tiers, Exams, Countries, Topics, Formats with drill-down inventory bars
- **Thin-Bank Detection**: Flags any exam/tier/topic below 1,200 absolute floor or 2,500 flagship threshold
- **Blueprint Coverage Analysis**: Shows which exam blueprint domains have insufficient question coverage relative to their weight
- **Next-Priority Recommendations**: AI-gap-based recommendation engine identifying highest-impact content areas to build next, ordered by impact severity and roadmap phase
- **AI Pool Tracking**: AI-generated/draft questions tracked separately from published validated inventory
- Key files: `client/src/config/expansion-roadmap.ts`, `client/src/pages/admin-expansion-roadmap.tsx`, `server/routes.ts`

## Adaptive Study Engine
- Routes: `/study` (hub with all mode tiles) and `/study/:mode` (auto-starts a specific mode)
- Mode slugs: `recommended`, `weak-areas`, `due-review`, `flagged`, `rapid`, `mixed`, `pre-exam`
- Tiles navigate to `/study/{slug}` on click, with per-tile loading spinners and error banners
- Exit Session / Back to Study Modes navigates back to `/study`
- Free users: only `recommended` and `rapidReview` modes are unlocked
