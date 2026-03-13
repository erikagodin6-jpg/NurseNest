# NurseNest - Complete Nursing Learning Platform

## Overview
NurseNest is an adaptive learning platform designed for nursing and allied health students across 17 career verticals. It offers comprehensive learning resources, advanced exam preparation (e.g., NCLEX, REX-PN), and performance analytics. The platform uses AI for content generation to enhance clinical reasoning, nursing knowledge, and critical thinking, with the goal of improving patient care outcomes through a region-aware and adaptive learning environment. It aims to provide a complete learning solution with significant market potential.

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

### UI/UX Decisions
The platform features a modern React UI with TypeScript, Wouter for routing, shadcn/ui (Radix UI), and Tailwind CSS v4. It supports 20 themes and DM Sans typography. Key interactive components include `ContentGate`, `PauseAndThink`, `ProgressiveDisclosure`, `CuriosityHook`, and `KnowledgeCheck`. A digital product builder offers a Canva-style drag-and-drop interface with AI image and content generation. The design emphasizes premium visuals, dual-tone top bars, and watermarked PDF previews. Exam interfaces maintain a consistent single-column layout, specific text styling, and color-coded answer options.

### Technical Implementations
NurseNest is built with Vite, React, Express 5 on Node.js with TypeScript, utilizing TanStack React Query for server state management via a RESTful API. Authentication uses a 3-tier header chain (Bearer admin JWT, x-username/x-password, x-user-token JWT). Core features include a subscription model with regional pricing, interactive learning modules, a mock exam engine with stratified random sampling, and an admin dashboard. AI integrations (OpenAI) drive blog automation, an Adaptive CAT Engine, Pass Probability Projection, and a Next Best Action Engine. Exam blueprints are database-driven, and content is organized by body system. The system supports NGN question types, partial credit scoring, and a Spaced Repetition System. Content access is tier-based (free, rpn, rn, np, admin).

The platform also includes:
- **Question Bank / Test Bank System**: Supports various modes with JSON import, inline editing, timed exams, and analytics, enforcing content safety by user tier and region. CAT exam questions are reused across three study modes: Adaptive CAT exams, Test Bank study mode (at `/qbank/study`), and Flashcard review. The `flashcard_bank` table serves as the unified enriched question store with `rationale_media` (clinical images), `lesson_links`, and `distractor_rationales`. The `exam-flashcard-mapper.ts` engine syncs `exam_questions` to `flashcard_bank` using content hashing. Admin can trigger re-sync from the Flashcard Studio "Content Reuse" tab.
- **Paramedic EMS Scenario Simulation System**: Interactive simulations with decision points and debriefing.
- **Referral Discount System**: Users generate codes for discounts and earn premium days.
- **Pharmacy Tech Adaptive Practice & Mastery System**: Adaptive practice with difficulty progression and weak area detection.
- **Paramedic & MLT Exam Engines**: Multi-mode exam simulators (CAT, Adaptive, Practice, Drill) with IRT-based ability estimation.
- **MLT Lab Image & Remediation Systems**: Manages lab image metadata and auto-links questions to lessons/flashcards.
- **Medical Imaging Education System**: Exam prep for CAMRT/ARRT, including lessons, positioning guides, physics reviews with interactive visuals, micro-quizzes, and flashcards with spaced repetition. Features an adaptive exam simulator and a Positioning Training Module with interactive overlays and error tracking.
- **Medical Imaging Growth & Marketing Engine**: User acquisition and growth system with email capture, nurture sequences, referral incentives, and an interactive study plan generator.
- **Medical Imaging SEO Architecture**: Programmatic SEO pages and blog articles with content freshness tracking and internal linking.
- **SEO & Performance Optimization**: Server-side og:image/og:url/twitter:image injection via seo-meta.ts, FAQPage JSON-LD on homepage, ItemList/LearningResource structured data on listing pages, expanded robots.txt and sitemap (663+ URLs), dns-prefetch hints, async image decoding. Strategy doc at `docs/seo-marketing-strategy.md`. Homepage images optimized: 8 screenshots converted from bundled JPG imports to WebP with responsive srcset (480w/768w/1200w/full + 160w/240w thumbnails) served from `client/public/screenshots/`. Build script at `scripts/optimize-images.cjs`. Non-composited `animate-pulse` replaced with GPU-composited `skeleton-pulse` class (opacity-only keyframes with prefers-reduced-motion support). Global `overflow-x: hidden` on html/body prevents mobile horizontal scroll.
- **Medical Imaging Monetization & Paywall System**: Stripe-integrated checkout for imaging products with country-specific pricing, preview limits, and entitlement tracking.
- **RN Lesson Content Audit System**: Admin panel at `/admin/rn-lesson-audit` for auditing and repairing RN-tier lesson content. Scans both static TypeScript lesson files (`client/src/data/lessons/`) and dynamic `content_items` DB records. Classifies lessons as Complete/Placeholder/Weak/Broken using the `isPlaceholder()` logic. Features batch AI-powered repair via OpenAI, status filters, slug mismatch detection, and direct links to lesson view/editor. Publishing validation rules prevent blank/incomplete lessons from being published (minimum word count, required title/slug). Content editor shows inline warnings when lessons are incomplete.
- **Clinical Case Study Engine**: Manages multi-stage clinical case studies with decision points and scoring.
- **Adaptive Flashcard System**: Tier-specific exam-style flashcards with an adaptive review engine and confidence-based scheduling. Content expansion system (`server/content-expansion-job.ts`) generates exam questions via OpenAI with automatic flashcard mapping, image/lesson linking, and duplicate detection via stem hashes. Baseline counts: rpn=3186, rn=3351, np=2135. After expansion: rpn=3829(+643), rn=3951(+600), np=2846(+711), totaling ~1,954 new questions with matching flashcards (10,858 total exam questions, 10,271 total flashcards).
- **Question Bank Expansion Engine** (`server/qbank-expansion-engine.ts`): Large-scale AI-powered question generation targeting 3,700 new questions (1,000 RPN/LVN + 1,500 RN/NCLEX + 1,200 NP Advanced) across 16 nursing domains with 35/45/20% easy/moderate/hard difficulty distribution. Features: MD5 stem-hash duplicate prevention, atomic question+flashcard DB transactions, CAT exam compatibility tagging via `tags` text[] array (domain, mastery_category, difficulty_level), media library image attachment via IMAGE_KEYWORD_MAP, tier-specific lesson link injection, batch-of-50 processing with progress logging to `generation_events`. Admin API routes in `server/expansion-engine-routes.ts`: `POST /api/admin/expansion-engine/start` (single tier), `POST /api/admin/expansion-engine/start-full` (all 3 tiers), `GET /api/admin/expansion-engine/status`, `GET /api/admin/expansion-engine/summary/:tier`.
- **Clinical Vignette Generation Engine**: Admin-triggered batch generation system (`server/clinical-vignette-generator.ts`) that produces clinical vignette-style exam questions across all nursing tiers: RPN/LVN (1,000), RN/NCLEX (1,500), NP AANP/ANCC (1,200), and Canadian CNPLE (800). Questions are distributed across 16 clinical domains with 35/45/20 difficulty split (easy/moderate/hard). Each question auto-generates a matching flashcard_bank entry. Features: production DB verification via getProdPool, stem hash deduplication, IMAGE_KEYWORD_MAP image matching, LESSON_KEYWORD_MAP lesson linking, mastery_category tagging, exam_domain classification, batch processing (50/batch) with progress logging, backfill logic, and final summary report. Admin endpoints: `/api/admin/clinical-vignette/{distribution,verify-db,start,status,report,reset}`.
- **Adaptive Learning Engine (v2)**: A full adaptive engine with granular per-card tracking, weighted priority scoring, a 5-state mastery model, and spaced repetition. Offers 7 session types and analytics.
- **AI Study Coaching & Course Generation System**: Personalized study coaching with topic mastery scoring, exam readiness scoring, pass probability estimation, and dynamic study plan generation.
- **Programmatic SEO Quiz Engine**: Auto-generates thousands of practice question pages from the exam question database by topic.
- **Offline Study System**: IndexedDB-based offline storage for question packs and flashcard decks with sync capabilities.
- **Push Notification System**: Web Push API integration for study reminders.
- **Mobile Bottom Navigation**: Fixed bottom navigation for mobile with an offline indicator.
- **Multi-Profession Framework**: Dynamic profession management system allowing admins to add/configure new healthcare professions with shared infrastructure.
- **Universal Question Bank Importer**: Bulk question import system supporting CSV, JSON, and XLSX, with validation, duplicate detection, and an audit trail.
- **Multilingual SEO & Translation System**: Server-rendered hreflang/canonical tags with locale-aware meta injection, translation completeness auditing (95% threshold for indexing), multilingual sitemap generation (only indexable locales), /index.html deduplication (301 redirects), DB content translation guard, admin Translation Coverage Dashboard (`/admin/translation-coverage`), admin SEO Inspector (`/admin/seo-inspector`), and pre-deploy validation script (`scripts/validate-seo.ts`). Key files: `server/translation-audit.ts`, `server/seo-meta.ts`.
- **Translation Coverage Dashboard**: Admin tool at `/admin/translations` for auditing translation completeness across 14 locales. Scans UI keys (i18n-en.ts vs i18n-translations.ts), DB content (content_items, exam_questions), and JSON lesson translations. Uses a weighted scoring model (metadata 10%, headings 10%, primary_body 40%, supporting 20%, ui_chrome 10%, forms 5%, structured_data 5%). Features per-locale/content-type breakdowns, filtering, bulk actions (mark_draft/mark_ready/remove_sitemap/apply_noindex), detail inspector with field-level issues, sitemap/noindex controls with admin override, and CSV/JSON export. Backend: `server/translation-audit-engine.ts`, `server/translation-audit-routes.ts`. DB tables: `translation_audits`, `translation_audit_issues`.

### Lesson Title Canonicalization System
Standardizes lesson naming across the platform so every medical topic has one canonical title. Key components:
- **`lesson_aliases` table**: Maps old titles/slugs/abbreviations to canonical lesson IDs/slugs. Schema in `shared/schema.ts`, migration in `server/ensure-schema.ts`.
- **Title Canonicalizer Engine** (`server/title-canonicalizer.ts`): Strips tier prefixes (RN, NP, RPN, LVN, NCLEX), removes filler words (overview, lesson, guide, etc.), enforces title case, corrects spelling errors, resolves medical abbreviations (PE → Pulmonary Embolism, SVT → Supraventricular Tachycardia, etc.), generates canonical slugs.
- **Title Validation**: Rejects titles with banned words on content creation/update (enforced in POST/PUT `/api/content` routes). Bypassable with `forcePublish`.
- **Alias Resolution**: Search endpoint (`/api/lessons/search`) queries `lesson_aliases` for abbreviation/old-title matches. Lesson content endpoint resolves old slugs via aliases.
- **SEO**: Page titles use "Canonical Title | NurseNest" format without tier prefixes. Breadcrumbs strip tier labels on both client and server.
- **Admin APIs**: `GET /api/admin/canonicalize/preview` (dry-run), `POST /api/admin/canonicalize/run` (execute migration), `POST /api/admin/canonicalize/flashcards` (update flashcard references), `GET /api/admin/canonicalize/validate-title` (validate any title).

### RRT Bulk Question Generation Pipeline
AI-powered bulk generation of Canadian CBRC-style RRT (Registered Respiratory Therapist) licensing exam questions. Features:
- **13 RRT Domains**: Airway Management, Oxygen Therapy, ABG Interpretation, Mechanical Ventilation, Pulmonary Function Testing, Neonatal & Pediatric Respiratory Care, Critical Care Respiratory Therapy, Cardiopulmonary Physiology, Aerosol & Medication Delivery, Sleep & Noninvasive Ventilation, Emergency Respiratory Care, Patient Assessment, Infection Control & Equipment
- **Difficulty Distribution**: Easy 35% / Moderate 45% / Hard 20%
- **API Endpoints**: `POST /api/allied/pipeline/rrt-bulk-generate` (trigger), `GET /api/allied/pipeline/rrt-bulk-status/:batchId` (monitor)
- **Question Format**: Clinical vignette-style with ABG values, ventilator settings, PFT data, and detailed rationales (600+ words)
- **Auto-generates**: Matching flashcards (definition, clinical_decision, red_flag types) for each approved question
- **Status**: Questions inserted as `status='approved'` with `career_type='rrt'` in `allied_questions` table
- **Lesson Links**: Maps to 10 RRT lesson slugs (airway-management-rrt, oxygen-delivery-systems-rrt, abg-interpretation-rrt, etc.)
- **Key Files**: `server/allied-pipeline.ts` (RRT bulk functions), `server/scripts/trigger-rrt-bulk-generation.ts` (blueprint setup), `shared/careers.ts` (domain config)

### Database Architecture
The platform uses PostgreSQL with Drizzle ORM for database management, configured via `server/db.ts` with separate environment variables for development and production.

## External Dependencies

### Database
- PostgreSQL
- Drizzle ORM

### Payment Processing
- Stripe
- PayPal SDK

### AI/Content Generation
- OpenAI (for blog posts, AI flashcards, lesson content, AI medical images, micro-lectures, and various content pipelines)

### Social Media
- Meta Graph API (for social media scheduling)