### Overview
NurseNest is an adaptive learning platform designed for nursing and allied health students across 17 specializations. It offers comprehensive educational resources, advanced exam preparation (e.g., NCLEX, REX-PN), and performance analytics. The platform leverages AI for content generation to enhance clinical reasoning, nursing knowledge, and critical thinking, with the ultimate goal of improving patient care outcomes. NurseNest aims to establish itself as a leading, region-aware, adaptive learning solution, transforming nursing education through technology to address the significant market demand for high-quality educational tools.

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
NurseNest employs a modern web stack featuring a React UI (TypeScript, Wouter, shadcn/ui, Tailwind CSS v4) and an Express 5 backend on Node.js (TypeScript), with Vite for tooling. Server state is managed by TanStack React Query via a RESTful API. The UI offers 24 themes, semantic CSS tokens, DM Sans typography, and interactive components. Data persistence is handled by PostgreSQL with Drizzle ORM.

Core functionalities include a database-driven subscription model with regional pricing, tier-based plans, Stripe-based lifetime purchases, and free trial usage caps. The platform provides interactive learning modules, a mock exam engine with stratified random sampling, and a comprehensive admin dashboard. AI integrations, routed through a centralized AI Provider Router, power features such as blog automation, an Adaptive CAT Engine, Pass Probability Projection, a Next Best Action Engine, an AI Tutoring Assistant, and content generation with quality gates. Exam blueprints are database-driven, content is organized by body system, and supports Next Generation NCLEX (NGN) question types, partial credit scoring, and a Spaced Repetition System. Content access is controlled by user tier.

Key architectural features include:
- **Learning & Exam Preparation**: Flashcards, Test Bank, Question Bank, Adaptive Flashcard System, Clinical Vignette Generation Engine, Mock Exam Engine (CAT & Practice modes), and an Adaptive Learning Engine. Supports 12+ nursing certifications with 62,000+ practice questions across all tiers (RPN: 16,900+, RN: 19,900+, NP: 22,400+ including 9 NP pathways), 1,800+ NGN case sets, 37,800+ flashcards, and 33 mock exams. NP exam pathways include AANP-FNP, ANCC-FNP, AGPCNP, AGACNP, PMHNP, PNP, WHNP, ENP, and CNPLE. NGN Clinical Judgment question engine supports 16 format types with TypeScript types, partial-credit scoring, interactive UI renderers, and CAT engine format diversity balancing.
- **AI-Powered Study & Content**: AI Study Coaching & Course Generation System, Exam Date AI Study Planner, AI-Powered Generation & Safety system for content creation with quality gates, context-aware AI Tutoring Assistant, and Bulk Question Bank Orchestrator for scaling RPN (8K–12K) and RN (12K–18K) question banks with auto-linked flashcards and NGN case-based sets.
- **Content & SEO Infrastructure**: Allied Health Encyclopedia, SEO Lesson Engine, Programmatic SEO Engines, Multilingual SEO & Translation System, Database-Driven Multi-Domain Sitemap Architecture, Internal Linking Engine, SEO Content Expansion System, Clinical Calculators Hub, Nursing Study Guides Hub, Nursing Clinical Scenarios Hub, Medical Abbreviations & Clinical Terminology Hub, Clinical Skills Checklist Library, International Nursing Hub, Healthcare Careers Hub, Healthcare Certifications Hub, Healthcare Policy & Updates Hub, Nurse Salary & Career Guide, and SI Converter Cluster Pages. Includes 301 Redirect Middleware, structured data generation (Article, Course, MedicalCondition, FAQ schemas), thin content detection for noindexing, sitemap cleanup, optimized meta title/description generation, server-side 404s, and `noindex, follow` for untranslated content. E-E-A-T trust signals are implemented with `MedicalReviewBadge`, `MedicalReferences`, and `MedicalReviewJsonLd`.
- **SEO Content Hub Architecture**: Reusable tier-specific hub page system for REx-PN (`/rex-pn/*`), NCLEX-RN (`/nclex-rn/*`), and NP Exam (`/np-exam-prep/*`). Database-driven via `seo_hub_pages` table with JSONB content sections, FAQ items, internal links, and references. Supports page types: condition, lab-value, medication, comparison, strategy, question-bank-landing, study-plan, pharmacology, exam-tips, top-conditions. Features content quality validation for publish gating, MedicalWebPage/Article/FAQPage JSON-LD structured data, CTA component system (above-fold, mid-page, end-of-page variants), practice question previews with locked premium teasers, medically reviewed attribution, table of contents, and automatic sitemap integration. Key files: `shared/schema.ts` (seoHubPages table), `shared/seo-hub-validation.ts`, `server/seo-hub-routes.ts`, `client/src/pages/seo-hub-page.tsx`, `client/src/components/seo-hub-templates.tsx`, `client/src/components/seo-hub-cta.tsx`, `client/src/components/seo-hub-faq.tsx`, `client/src/components/seo-hub-related.tsx`, `client/src/data/seo-hub-links.ts`.
- **User Experience & Engagement**: Dashboard Lifecycle Command Center for adaptive user guidance, Global Report a Problem System, IndexedDB-based Offline Study System, and a LocalStorage-based Popup Suppression System.
- **Multi-Profession Support**: Dynamic framework for configuring new healthcare professions with specialized navigation and content, including question banks for MLT, Surgical Technologist (3,094 CST/CSFA questions across 7 batches with 6 SEO landing pages), Respiratory Therapy, and dedicated NP Exam Ecosystems.
- **Database Safety & Management**: PostgreSQL with Drizzle ORM, EnvironmentAwareContentWriteService, and a comprehensive Backup Export & Disaster Recovery System.
- **Unified Pricing Page**: All pricing (Nursing RPN/RN/NP, Allied Health, Medical Imaging, New Grad) consolidated into a single `/pricing` page with section tabs controlled by `?section=` query param. Legacy pricing routes (`/allied-health/pricing`, `/pricing/allied`, `/medical-imaging/:country/pricing`, `/critical-care/pricing`, `/emergency-nursing/pricing`, `/perioperative/pricing`, `/oncology-nursing/pricing`, `/pediatric-cert/pricing`, `/pharmacology/pricing`, `/allied-health/:careerSlug/pricing`) all redirect to `/pricing` with appropriate section context.
- **Business & Analytics**: Content Analytics Engine, Admin Dashboard, SEO Performance & Growth Dashboard, Content Coverage Analyzer, Automated Content Growth Engine, Business Health & Subscriber Dashboard, Tier Health Dashboard & Expansion Watchlist, Content Integrity Engine Dashboard, and a New Grad Analytics Dashboard. Admin tools for AI Tutor management, explanation engine, and backup systems.
- **Content Integrity Engine**: Automated content scanning, AI auto-repair, pre-publish validation, and scheduled jobs for questions, flashcards, lessons, blogs, and media. Includes audit log with rollback and manual review queue. Deep Rationale Upgrade system for non-CAT questions generates structured rationales with per-distractor breakdowns, correct answer explanations, clinical pearls, and auto-linked flashcards. CAT questions (is_adaptive_eligible=true) are excluded from rationale modifications. Admin endpoints: `/api/admin/content-integrity/rationale-audit` (GET audit stats), `/api/admin/content-integrity/deep-rationale-upgrade` (POST batch upgrade), `/api/admin/content-integrity/repair/deep-rationales` (POST repair only). Repair log types: "rationale_upgraded", "flashcard_generated".
- **Question-Driven SEO Blog Pipeline**: Automated gap analysis comparing question bank topic density against existing blog coverage, with question-driven blog generation that injects internal links to related lessons, flashcards, and practice questions. Admin API at `/api/admin/question-blog-pipeline/`. Core file: `server/question-blog-pipeline.ts`.
- **Explanation Engine**: Unified structured explanation storage with AI-powered batch generation, quality scoring, review workflow, and comprehensive admin tools.
- **Exam Readiness Predictor Engine**: Provides 0-100 readiness scores, pass probability, percentile benchmarking, weak topic detection, and personalized practice recommendations.
- **Unified Question Schema & Country Adaptation**: `exam_questions` table extended with international fields; `shared/country-adaptation.ts` maps country codes to lab unit systems, medication naming, licensing bodies, and exam types. API endpoints support filtering by country, language, and licensing body.
- **Multilingual Exam Question Translation Pipeline**: AI-powered batch translation of 13K+ exam questions into 8 priority languages (English + French, Spanish, Arabic, Hindi, Tagalog, Chinese, Portuguese). Uses `content_translations` table with `content_type='exam_question'`. Translates 13 fields per question: stem, options, rationale, clinicalPearl, examStrategy, scenario, memoryHook, correctAnswerExplanation, incorrectAnswerRationale, distractorRationales, clinicalReasoning, keyTakeaway, mnemonic. Features: admin-triggerable batch runs with tier/exam/body system filtering, resumable progress tracking via `translation_batch_runs` table, medical terminology preservation validation, quality checks, and an admin dashboard tab for coverage analytics. Key files: `server/exam-question-translation-routes.ts`, `client/src/pages/admin-translation-dashboard.tsx` (Exam Questions tab).
- **Taxonomy Protection System**: Strict taxonomy validation and normalization layer for the content generator, ensuring all generated content adheres to a canonical taxonomy. Includes topic normalization with synonym mapping and fuzzy matching.

### Admin Purchase Notifications
Real-time email (Resend) and SMS (Twilio) alerts on purchase events. Triggered from Stripe webhook handler in `server/index.ts`. Core files:
- `server/admin-notifications.ts` — notification engine with per-channel dedup, email templates, SMS formatting
- `server/notification-routes.ts` — admin-protected API routes (GET/PUT settings, POST test, GET log)
- `server/resend-client.ts` — Resend integration client
- `server/twilio-client.ts` — Twilio integration client
- `client/src/pages/admin-notifications.tsx` — admin settings UI at `/admin/notifications`
- `notification_log` table in DB for delivery tracking

Events: new_subscription, subscription_cancelled, payment_failed, lifetime_purchase, trial_started.
Default recipients: erikagodin6@gmail.com (email), +16132198982 (SMS). Configurable via admin settings.

### Content Publishing Audit
Admin-only content audit system at `server/content-audit-report.ts` with two endpoints:
- `GET /api/admin/content-audit` — Comprehensive audit report: tier counts vs targets, data quality (missing rationale/body_system/exam/topic), flashcard coverage & linkage, exam breakdown, body system breakdown, format breakdown, CAT behavior verification, paywall enforcement status.
- `POST /api/admin/content-audit/fix-quality` — Atomically marks published questions with missing required fields (rationale, body_system, exam) as draft using a DB transaction.
Both endpoints require admin authentication via `requireAdmin`.

### External Dependencies
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Payment Processing**: Stripe, PayPal SDK
- **AI/Content Generation**: Centralized AI Provider Router (supports OpenAI, Ollama, vLLM, LM Studio, Anthropic)
- **Object Storage**: Replit Object Storage (Google Cloud Storage)
- **Email**: Resend (transactional email via Replit integration)
- **SMS**: Twilio (SMS via Replit integration)