# NurseNest - Complete Nursing Learning Platform

## Overview
NurseNest is an adaptive learning platform designed for nursing and allied health students across 17 career verticals. Its primary purpose is to provide comprehensive learning resources, advanced exam preparation (e.g., NCLEX, REX-PN), and performance analytics. The platform leverages AI for content generation to develop clinical reasoning, nursing knowledge, and critical thinking, ultimately aiming to improve patient care outcomes through a region-aware and adaptive learning environment. NurseNest aspires to be a market-leading, complete learning solution.

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
The platform is built with a modern React UI (TypeScript, Wouter, shadcn/ui, Tailwind CSS v4) and an Express 5 backend on Node.js (TypeScript). Vite handles tooling, and TanStack React Query manages server state via a RESTful API. UI/UX features 20 themes, DM Sans typography, premium visuals, and interactive components like `ContentGate` and `KnowledgeCheck`. A Canva-style digital product builder with AI-powered content generation is integrated.

Core technical implementations include a subscription model with regional pricing, interactive learning modules, a mock exam engine with stratified random sampling, and an admin dashboard. AI integrations power blog automation, an Adaptive CAT Engine, Pass Probability Projection, and a Next Best Action Engine. Exam blueprints are database-driven, and content is organized by body system. The system supports NGN question types, partial credit scoring, and a Spaced Repetition System. Content access is managed by user tier (free, rpn, rn, np, admin).

Key systems and engines:
- **Learning Content Systems**: Includes a Question Bank, Adaptive Flashcard System, Clinical Vignette Generation Engine, Allied Health Encyclopedia, SEO Lesson Engine, and Physical Therapy/Perioperative Nursing Lesson Libraries.
- **Adaptive Learning & Coaching**: An Adaptive Learning Engine (v2) tracks granular progress and implements spaced repetition. An AI Study Coaching & Course Generation System provides personalized study plans and readiness assessments.
- **Exam & Practice Engines**: Features a mock exam engine, a Premium Study Engine for custom practice sessions, and adaptive practice/mastery systems tailored for various allied health professions. A Free Adaptive Demo Exam is publicly available.
- **AI-Powered Generation & Safety**: All AI content generation is fully manual and admin-triggered via the AI Jobs system (`/admin/ai-jobs`). No automatic/scheduled AI generation runs. The system supports 10 job types (exam questions, CAT questions, flashcards, lessons, blog posts, qbank, allied, rationale/lesson image linking, conversion), 7 tiers (RN/NCLEX, RPN/LVN, NP, allied health, emergency nursing, imaging, new grad), 3 model tiers (cheapest/balanced/premium), batch size enforcement, duplicate protection, dry run mode, budget caps (daily/weekly/monthly/per-job), kill switch, concurrency controls (one job at a time), max 3 retries, and comprehensive budget event logging. All previously auto-starting schedulers (content-scheduler, qbank-scheduler, allied-automations, social-content) are disabled.
- **Content Quality Enforcement Gates**: Shared `ContentQualityGate` service (`server/content-quality-gate.ts`) enforcing 10 quality rules across all AI-generated questions, flashcards, rationales, and adaptive pool items. Scoring: clinical realism, educational value, stem variety, distractor quality, scenario authenticity, specialty fit (10 professions), new grad relevance, adaptive difficulty, rationale quality, flashcard conciseness/diversity. Batch diversity analysis for structural repetition, answer position bias, format distribution, topic clustering, phrasing similarity. Items below 65% saved as `needs_revision` with structured feedback. DB columns: `quality_scores`, `quality_feedback`, `quality_score` on `exam_questions` and `flashcard_bank`. Admin API: `/api/admin/quality-gate/analyze`, `/flagged`, `/override/:entityType/:id`, `/recheck/:entityType/:id`. Admin UI: "Quality Review" tab in Content Manager. Integrated into `qbank-generator.ts` ingest pipeline.
- **AI Provider Router & Cost Control Engine**: Centralized AI request routing through pluggable providers (OpenAI, Ollama, vLLM, LM Studio, Anthropic) with circuit breaker, per-provider rate limiting, exponential backoff retry, health checks, global kill switch, daily/monthly budget enforcement, and cost tracking. All generators route through `server/ai-provider-router.ts`. Admin dashboard at `/admin/ai-ops`.
- **SEO & Marketing Infrastructure**: Features Programmatic SEO Engines (Quiz Engine, Page Expansion Engine), NCLEX Question Preview Pages, a Multilingual SEO & Translation System, and a Database-Driven Multi-Domain Sitemap Architecture. Also includes Allied Health Marketing & SEO Ecosystem, Medical Image SEO System, Lead Capture Funnels, Conversion Funnel System, Career Journey Funnel Pages, Clinical Specialty Hub Pages, and a Nursing SEO Content Hub.
- **Public Marketing & Conversion Proof System**: Dynamic trust counters on homepage fetched from `/api/public/platform-proof` endpoint (15-min cache). Displays live platform stats (questions, flashcards, decks, lessons) with marketing-friendly rounding. Includes conversion-focused proof block, soft competitive positioning section, and skeleton loading states. Stats reflected in `marketing-copy.ts` for track-specific pages (RPN, RN, NP). `PlatformProof` type in `shared/lesson-stats.ts`.
- **Analytics & Admin**: A Content Analytics Engine & Admin Dashboard provides real-time production data, content health audits, and ROI insights. Public aggregate counts at `GET /api/public/platform-proof`.
- **Offline Capabilities**: An IndexedDB-based Offline Study System for question packs and flashcards.
- **Multi-Profession Framework**: A dynamic system for configuring and adding new healthcare professions, supported by a Universal Question Bank Importer.
- **Production Database Safety & Environment-Aware Publishing System**: Centralized `EnvironmentAwareContentWriteService` enforcing preflight checks, post-write verification, and full audit logging for all content writes, with explicit environment targeting and confirmation.
- **Data Management**: PostgreSQL with Drizzle ORM.

## External Dependencies
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Payment Processing**: Stripe, PayPal SDK
- **AI/Content Generation**: Centralized AI Provider Router (supports OpenAI, Ollama, vLLM, LM Studio, Anthropic)
- **Social Media**: Meta Graph API

## 24-Hour Free Trial Subscription System
A server-side trial entitlement system enabling one 24-hour free trial per user for a selected subscription tier (rpn/rn/np). Key components:

- **Schema**: `trial_entitlements` table tracks trial state, consumption, fraud flags; `email_verification_codes` table for email verification flow; `emailVerifiedAt` field added to `users` table.
- **Routes** (in `server/trial-subscription.ts`):
  - `POST /api/auth/send-verification` – sends 6-digit email verification code
  - `POST /api/auth/verify-email` – verifies email with code
  - `POST /api/trial-sub/activate` – initiates trial (creates Stripe customer + SetupIntent)
  - `POST /api/trial-sub/confirm` – confirms trial after payment method setup (creates Stripe subscription with 1-day trial)
  - `GET /api/trial-sub/status` – returns trial state and consumption counters
  - `POST /api/trial-sub/cancel` – cancels active trial
  - `GET /api/trial-sub/consumption` – returns detailed consumption data
  - `GET /api/admin/trial-entitlements` – admin list of all trial entitlements
  - `GET /api/admin/trial-entitlements/analytics` – admin trial analytics
- **Middleware**: `requireTrialOrPaid()` validates trial or paid subscription on premium content requests; `requireTrialConsumption(contentType)` enforces per-content-type limits.
- **Fraud Detection**: Blocks duplicate trials by verified email, Stripe payment fingerprint, device fingerprint hash (configurable max attempts), and IP volume (configurable window).
- **Stripe Webhook**: Handles `customer.subscription.updated` and `customer.subscription.deleted` events for trial subscriptions (metadata `isTrial=true`).
- **Rate Limiting**: Applied to signup, login, trial activation, and content fetch endpoints.
- **Audit Logging**: All trial events (initiation, activation, fraud blocks, consumption limits, cancellation) logged to `audit_logs` table with `entity_type='trial_entitlement'`.
- **Environment Variables**: `TRIAL_DURATION_HOURS` (default 24), `TRIAL_MAX_QUESTIONS` (50), `TRIAL_MAX_FLASHCARDS` (30), `TRIAL_MAX_LESSONS` (5), `TRIAL_MAX_MOCK_EXAMS` (2), `TRIAL_DEVICE_MAX_ATTEMPTS` (3), `TRIAL_IP_MAX_ATTEMPTS` (5), `TRIAL_IP_WINDOW_HOURS` (24).
