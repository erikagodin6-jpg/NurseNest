# NurseNest - Complete Nursing Learning Platform

## Overview
NurseNest is an adaptive learning platform designed for nursing and allied health students across 17 career verticals. Its primary purpose is to provide comprehensive learning resources, advanced exam preparation (e.g., NCLEX, REX-PN), and performance analytics. The platform leverages AI for content generation to develop clinical reasoning, nursing knowledge, and critical thinking, ultimately aiming to improve patient care outcomes. NurseNest strives to be a market-leading, region-aware, and adaptive learning solution.

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
The platform is built with a React UI (TypeScript, Wouter, shadcn/ui, Tailwind CSS v4) and an Express 5 backend on Node.js (TypeScript). Vite is used for tooling, and TanStack React Query manages server state via a RESTful API. The UI/UX features 24 themes (including Pastel Lilac, Lavender Dream, Soft Sage, Dark Mode) with a centralized semantic CSS token system (`--theme-page-bg`, `--theme-nav-*`, `--theme-card-*`, `--theme-input-*`, `--theme-*-text`, etc.), DM Sans typography, premium visuals, and interactive components. Theme preference is persisted to user profile (`users.preferred_theme` column) via `POST /api/user/:userId/theme`. A Canva-style digital product builder with AI-powered content generation is integrated.

Core features include a database-driven subscription model with regional pricing (CAD/USD), tier-based plans (rpn, rn, np, allied), lifetime one-time purchases via Stripe, and free trial usage caps. Interactive learning modules, a mock exam engine with stratified random sampling, and an admin dashboard are central. AI integrations power blog automation, an Adaptive CAT Engine, Pass Probability Projection, and a Next Best Action Engine. Exam blueprints are database-driven, and content is organized by body system, supporting NGN question types, partial credit scoring, and a Spaced Repetition System. Content access is managed by user tier.

Key systems include:
- **Flashcards & Test Bank**: Public flashcards and tier-specific test banks for exam-style practice.
- **Learning Content Systems**: Question Bank, Adaptive Flashcard System, Clinical Vignette Generation Engine, Allied Health Encyclopedia, SEO Lesson Engine, and specialized lesson libraries.
- **Adaptive Learning & Coaching**: An Adaptive Learning Engine for progress tracking and spaced repetition, and an AI Study Coaching & Course Generation System for personalized study plans.
- **Exam Date AI Study Planner**: Personalized exam prep command center with study phase engine (Foundation/Practice/Timed Review/Final Review), pacing targets, AI recommendations, weekly plan generation, intensity levels (light/balanced/intensive), "Plan Without a Date" fallback, and tier-aware content mapping. Backend in `server/exam-planner-engine.ts` and `server/exam-planner-routes.ts`, schema in `shared/schema.ts` (`exam_planner_settings` table), dashboard widget in `client/src/pages/dashboard.tsx` (StudyWorkloadWidget), full plan view in `client/src/pages/study-plan.tsx`, sidebar widget in `client/src/components/study-plan-widget.tsx`.
- **Dashboard Lifecycle Command Center**: Adaptive card at the top of the dashboard that replaces multiple independent widgets (welcome, study_streak, exam_readiness, pass_probability, study_workload, weak_topics). Resolves one of 8 lifecycle states based on user profile: No Exam Date, Exam Upcoming, Exam Approaching Soon, Awaiting Results, Passed, Did Not Pass, Postponed, New Grad Active. Each state shows integrated messaging combining countdown, momentum/streak, readiness, and phase data with appropriate CTAs. Tier-aware and responsive. State engine in `client/src/lib/lifecycle-state.ts`, component in `client/src/components/command-center.tsx`. Schema fields: `exam_result_status`, `exam_followup_completed`, `exam_postponed`, `career_stage`, `new_grad_resources_activated` on `exam_planner_settings` table.
- **Exam & Practice Engines**: Mock exam engine with CAT Exam and Practice Exam modes, offering post-completion review and full session persistence.
- **AI-Powered Generation & Safety**: Admin-triggered AI content generation with budget caps, concurrency controls, duplicate protection, and a kill switch. A `ContentQualityGate` enforces 10 quality rules.
- **AI Provider Router & Cost Control Engine**: Centralized AI request routing through pluggable providers with cost tracking, rate limiting, and health checks.
- **SEO & Marketing Infrastructure**: Programmatic SEO Engines, NCLEX Question Preview Pages, Multilingual SEO & Translation System (FR/ES/DE/TH + 12 others), Database-Driven Multi-Domain Sitemap Architecture, Internal Linking Engine, and various content hubs. Includes server-side locale detection and comprehensive SEO audit tools. An SEO Content Expansion System (`server/seo-content-pages.ts`) provides 25 Priority 1 content pages across 6 clusters (`/nursing/*`, `/allied-health/*`, `/certifications/*`, `/new-grad/*`, `/career-guides/*`, `/compare/*`) with reusable template rendering (`client/src/pages/seo-landing-page.tsx`), automatic internal linking, FAQ/breadcrumb/article structured data, and sitemap inclusion. API: `GET /api/seo-content/:cluster/:pageSlug`, `GET /api/seo-content-index`, `POST /api/admin/seo-content/seed`.
- **Public Marketing & Conversion Proof System**: Dynamic trust counters and conversion-focused proof blocks displaying live platform statistics.
- **Analytics & Admin**: Content Analytics Engine and Admin Dashboard for real-time production data and ROI.
- **SEO Performance & Growth Dashboard**: Admin page for tracking search engine visibility, content growth, indexed pages, and search performance.
- **Content Coverage Analyzer**: Admin dashboard for analyzing content coverage, identifying gaps, and facilitating AI auto-generation of missing content with quality controls.
- **Automated Content Growth Engine**: Unified scheduler for automated content generation across all content types, with configurable cadences, content gap analysis, automated quality validation, and an admin approval workflow.
- **Exam Question Translation System**: Translates exam questions into 14 non-English languages using AI, with graceful English fallback and admin tools for translation management.
- **Offline Capabilities**: An IndexedDB-based Offline Study System for question packs and flashcards.
- **Multi-Profession Framework**: Dynamic system for configuring new healthcare professions. Allied Health pages are unified into the main NurseNest shell (single-app architecture, no hostname-based branching). Allied pages use `AlliedNavigation` (teal-branded with career dropdown) and `AlliedFooter` instead of the nursing Navigation/Footer. The `AlliedLayout` wraps catch-all allied routes, while profession authority hub pages (`profession-authority-hub.tsx`) conditionally use allied vs nursing nav/footer based on the profession slug. `AlliedSubNav` provides career-specific sub-navigation with ecosystem-aware feature sets (new careers show Study/Flashcards/Exams/Career Guide, legacy careers show QBank/Mock Exams/Flashcards/Study Plan/Sims/Tools). Empty content modules show polished "Coming Soon" fallback states via `ComingSoonFallback` component.
- **Allied Health Career Ecosystems**: Four career ecosystems under `/allied-health/` with full hub + 4 sub-pages each: Occupational Therapy Assistant (OTA, NBCOT COTA, slug: `occupational-therapy-assistant`), Physical Therapist Assistant / Physiotherapy Assistant (PTA, NPTE-PTA, slug: `physiotherapy-assistant`), Surgical Technologist (Surg Tech, CST/TS-C, slug: `surgical-technologist`), and Health Information Management (HIM, RHIT/RHIA/CCS, slug: `health-info-mgmt`). Each has hub page, `/study`, `/flashcards`, `/exams`, `/career-guide` sub-pages with profession-specific content, SEO metadata, structured data, breadcrumbs, and cross-links. Data files: `career-subpage-data.ts`, `profession-hub-data.ts`. Components: `career-study-page.tsx`, `career-flashcards-page.tsx`, `career-exams-page.tsx`, `career-guide-subpage.tsx`. Career configs in `shared/careers.ts`.
- **Production Database Safety**: `EnvironmentAwareContentWriteService` enforces preflight checks, post-write verification, and audit logging.
- **Data Management**: PostgreSQL with Drizzle ORM.
- **Free 1-Day Pass System**: Automatic 1-day free pass for new accounts, with server-side trial entitlement and fraud detection.
- **Central Pricing Config**: `shared/pricing-config.ts` contains tier metadata, duration labels, social proof, feature comparison, and study timeline guidance.
- **Pricing Page Architecture**: Modern SaaS-style layout with hero section, social proof, tier selection, feature comparison, and trust signals.
- **Business Health & Subscriber Dashboard**: Admin page for financial summaries, subscriber metrics, and purchase metrics.
- **Site Health & Integrity System**: Admin dashboard with broken link crawler, missing content detection, SEO metadata auditor, and auto-repair capabilities.
- **New Grad Certifications Hub**: Dedicated `/newgrad/certifications` hub for hospital certifications (ACLS, BLS, PALS, TNCC, NRP, CEN, CCRN) with individual detail pages at `/newgrad/certifications/:slug`. Old routes `/new-grad/certifications/*` redirect to new paths.
- **Exam Completion Follow-Up System**: After a user's exam date passes (24+ hours), a follow-up modal appears on the dashboard asking "How Did Your Exam Go?" with four paths: Passed (confetti + NEWGRAD20 coupon + New Grad resources link), Waiting (supportive message + light review), Didn't Pass (weak area selection + targeted study plan), Postponed (update exam date). Responses stored in `exam_followup_responses` table. Dashboard cards replace exam countdown based on result status. API: `/api/exam-followup/status/:userId`, `/api/exam-followup/:userId`, `POST /api/exam-followup/submit`.

## Build Optimization
- **i18n UI translations**: 20 language files compiled from `client/src/lib/i18n-*.ts` to `client/public/i18n/*.json` and loaded via `fetch()` at runtime. The TS source files remain as the source of truth; regenerate JSON with `npx tsx script/compile-i18n.ts`.
- **Lesson content translations**: Served from `client/public/translations/*.json` via `fetch()` (done in Task #480).
- **Career question data**: Barrel export in `client/src/data/career-questions/index.ts` uses dynamic `import()` only — no static re-exports of individual question modules.
- **Lesson data files** (343 files, 318K lines): Located in `client/src/data/lessons/` but NOT imported by any client code — only consumed server-side via `server/lesson-content-api.ts` dynamic import. Vite does not process them.
- **Vite manualChunks**: vendor-icons (lucide-react), vendor-charts (recharts/d3), vendor-radix, vendor-motion.

## NP Advanced Pathophysiology Expansion
- **New Lessons**: `client/src/data/lessons/np-patho-expansion.ts` — NP-level leukemia and sickle cell disease lessons, registered in `index.ts` via `safeMerge`.
- **New Flashcards**: `client/src/data/flashcards-np-patho.ts` — 215 advanced clinical flashcards covering Diabetes, Adrenal, Thyroid, HPA Axis, Stroke, Seizures, Headaches, Delirium/Dementia, HF, Cardiogenic Shock, ACS, Leukemia, Sickle Cell, Men's Health (ED, Testosterone, BPH, Prostatitis). Registered in `flashcards.tsx` allCards useMemo.
- **Exam Question Batches**: `np-exam-batch-63.ts` through `np-exam-batch-72.ts` — 317 exam questions + CAT questions across Endocrine, Neurology, Cardiology, Hematology, Men's Health, and Stress Physiology domains. Migration script updated (`i <= 72`).

## External Dependencies
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Payment Processing**: Stripe, PayPal SDK
- **AI/Content Generation**: Centralized AI Provider Router (supports OpenAI, Ollama, vLLM, LM Studio, Anthropic)
- **Object Storage**: Replit Object Storage (Google Cloud Storage)