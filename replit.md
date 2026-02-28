# NurseNest - Complete Nursing Learning Platform

## Overview

NurseNest is an interactive learning platform designed for RPN/LVN, RN, and NP students, offering comprehensive resources like lessons, flashcards, performance analytics, and exam preparation for NCLEX and REX-PN. It supports both US and Canadian nursing standards, with a strong focus on clinical pathophysiology, medication safety, and condition recognition to improve clinical reasoning. The platform aims to be a leading educational tool for nursing professionals, enhancing their knowledge and ultimately improving patient care outcomes.

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
- **Framework & Styling**: React with TypeScript, Wouter for routing, shadcn/ui with Radix UI primitives, Tailwind CSS v4, `next-themes` for 20 themes, and DM Sans typography.
- **Content Engagement**: `ContentGate` for access control, interactive components like `PauseAndThink`, `ProgressiveDisclosure`, `CuriosityHook`, `KnowledgeCheck`.

### Technical Implementations
- **Frontend & Backend**: Vite with React for frontend, Express 5 on Node.js with TypeScript for backend.
- **State Management**: TanStack React Query for server state.
- **API**: RESTful API.
- **Authentication**: Username/password with session management.
- **Content Engine**: Admin-only editor with AI generation for structured, SEO-optimized lessons, anatomy, and pre-nursing modules. Includes internal linking suggestions.
- **Publishing**: Admins can publish lessons with immediate visibility.
- **Subscription System**: Multiple tiers with regional pricing.
- **Interactive Learning**: Features Med Math, Clinical Calculations, Abnormal Lab Interpretation, Clinical Case Simulation, Medication Mastery Engine, and six clinical simulators.
- **Region-Aware Content**: Server-side hostname detection filters content by `region_scope` (BOTH, US_ONLY, CA_ONLY) and supports regional AI content generation and unit conversion.
- **Mock Exam Engine**: Timed exams with configurable parameters, question flagging, auto-save, detailed reports, and stratified random sampling.
- **Admin Features**: Dashboard for analytics, subscriptions, content management, and preview modes.
- **Blog Automation**: OpenAI-powered blog post generation with scholarly sources and scheduled publishing.
- **Custom Flashcards**: User-creatable flashcards with CSV import, AI accuracy checks, and AI generation.
- **Internationalization (i18n)**: Custom system for 15 languages, including language-prefixed URL routing, hreflang, RTL support, and browser language detection. Static lesson translations are managed via committed JSON files.
- **Multilingual SEO**: 1,170 SEO pages, Admin SEO Dashboard for coverage and localization, AI-powered localization, per-language sitemaps, and JSON-LD schemas.
- **Dynamic Content Translation**: Language middleware, `getTranslatedFields()` helper for content API responses, and source hash comparison for stale translations.
- **Admin Translation Dashboard**: Coverage matrix, detection of missing/stale translations, bulk actions, and side-by-side editor.
- **Content Intelligence Dashboard**: Blueprint coverage heatmap, difficulty calibration, SEO keyword gaps, and content ROI.
- **Adaptive CAT Engine**: IRT-style ability estimation, composite item selection, and confidence interval stop rule.
- **Pass Probability Projection Engine**: Composite scoring model with logistic transform, anti-gaming protections, confidence bands, risk categories, and an improvement simulator.
- **Next Best Action Engine**: Recommends top 3 actions with estimated probability lift.
- **Upgrade Funnel**: Event logging, admin metrics, and rate-limited upgrade modals at high-intent trigger points.
- **Exam Blueprints**: Database-driven blueprints for various nursing exams.
- **Free Diagnostic SEO Funnel**: Public SEO-optimized landing pages with CTA to diagnostic exams.
- **Admin QC Dashboard**: Monitors content quality, meta descriptions, and orphan pages.
- **Study Workload Calculator**: Dashboard widget for projected completion date based on daily targets.
- **Revenue Intelligence Dashboard**: Conversion funnels, study pack revenue, and pricing offers.
- **Language ROI Scoring Engine**: Scores languages for prioritization based on nursing population, immigration, search demand, competition, and monetization.
- **SEO Health Check Engine**: Audits for hreflang, meta descriptions, word count, orphan pages, and sitemap completeness.
- **Strict Exam Mode**: Mock exam toggle enforcing no backtracking, no answer changes, unpausable timer, and tab switch tracking.
- **Public Diagnostic Exam**: 25-question free diagnostic exam with anonymous attempts and topic breakdowns.
- **Auscultation Audio Library**: Manages audio clips with licensing and quiz modes.

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL.
- **Schema**: Defined in `shared/schema.ts`.
- **Validation**: Zod schemas.

### Content Architecture
- Lessons are organized by body system, supporting pre/post-test questions, and categorized into RPN/LVN, RN, NP, and Pharmacology tabs.
- Each lesson includes 10 content sections (Pathophysiology, Risk Factors, Diagnostics, Management, Nursing Actions, Assessment Findings, Lifespan, Clinical Findings & Red Flags, Pharmacology, Exam Readiness) with inline admin editing and AI generation.
- Flashcard system with bookmarking and mastery tracking.
- Anatomy & Physiology detail pages for 12 body systems.
- 27 interactive Pre-Nursing Foundations Program modules.
- CMS content is dynamically integrated.

## External Dependencies

### Database
- **PostgreSQL**: Primary database.
- **Drizzle ORM**: For database interactions.
- **Stripe**: For subscription management.

### Key npm Dependencies
- **UI**: shadcn/ui, Radix UI primitives, Lucide icons.
- **Forms**: `react-hook-form`, `@hookform/resolvers`, Zod.
- **Dates**: `date-fns`.
- **Payments**: Stripe SDK, @paypal/paypal-server-sdk.

### Interactive Learning Data Modules
- `client/src/data/clinical-confusions.ts`: Clinical Clarity topics.
- `client/src/data/clinical-cases.ts`: Clinical case simulations.
- `client/src/data/medications.ts`: Medication profiles.

### Site Analytics & Feedback System
- **Page View Tracker**: Custom hook for analytics.
- **Analytics API**: For site metrics.
- **Feedback System**: User feedback and bug reporting.
- **Meta Graph API**: For social media scheduling.
- **OpenAI**: For blog post generation, AI flashcards, and content generation.

### Daily Content Generation Pipeline
- **Engine**: `server/content-pipeline.ts` — AI-powered exam question and flashcard generation with clinical verification.
- **Scheduler**: `server/content-scheduler.ts` — Runs daily at 02:00 America/Toronto.
- **6 Banks**: RPN/RN/NP × exam_questions/flashcards. Threshold: 4,000 per bank. High rate (100/day) below threshold, low rate (25/day) above.
- **Topic Distribution**: Weighted rotation across 14 body systems, max 15% per topic per run.
- **Clinical Verification Gate**: AI checks for unsafe dosing, wrong ranges, scope errors, hallucinations. Items go to `needs_review` status.
- **Admin Dashboard**: `/admin/pipeline` — Overview, question/flashcard review with approve/reject/bulk actions, job history.
- **Schema Tables**: `flashcard_bank`, `generation_jobs`, `verification_reports`, `ai_cache`.
- **API Endpoints**: `/api/admin/pipeline/*`, `/api/admin/qbank/*`, `/api/admin/flashcard-bank/*`.