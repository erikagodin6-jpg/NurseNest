# NurseNest - Complete Nursing Learning Platform

## Overview
NurseNest is an adaptive learning platform for nursing and allied health students across 17 career verticals. It provides comprehensive learning resources, advanced exam preparation (e.g., NCLEX, REX-PN), and performance analytics. The platform utilizes AI for content generation to foster clinical reasoning, nursing knowledge, and critical thinking, ultimately aiming to enhance patient care outcomes. NurseNest aspires to be a market-leading, region-aware, and adaptive learning solution.

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
The platform features a React UI (TypeScript, Wouter, shadcn/ui, Tailwind CSS v4) and an Express 5 backend on Node.js (TypeScript), with Vite for tooling. TanStack React Query manages server state via a RESTful API. The UI/UX includes 24 themes with a centralized semantic CSS token system, DM Sans typography, premium visuals, and interactive components. Theme preference is persisted to the user profile. A Canva-style digital product builder with AI-powered content generation is integrated.

Core features include a database-driven subscription model with regional pricing (CAD/USD), tier-based plans, lifetime one-time purchases via Stripe, and free trial usage caps. It offers interactive learning modules, a mock exam engine with stratified random sampling, and an admin dashboard. AI integrations power blog automation, an Adaptive CAT Engine, Pass Probability Projection, and a Next Best Action Engine. Exam blueprints are database-driven, and content is organized by body system, supporting NGN question types, partial credit scoring, and a Spaced Repetition System. Content access is managed by user tier.

Key systems:
- **Learning & Exam Preparation**: Flashcards, Test Bank, Question Bank, Adaptive Flashcard System, Clinical Vignette Generation Engine, Mock Exam Engine (CAT & Practice modes), and an Adaptive Learning Engine.
- **AI-Powered Study & Content**: AI Study Coaching & Course Generation System, Exam Date AI Study Planner, and an AI-Powered Generation & Safety system for content creation with quality gates. An AI Provider Router handles AI requests.
- **Content & SEO**: Allied Health Encyclopedia, SEO Lesson Engine, Programmatic SEO Engines, Multilingual SEO & Translation System, Database-Driven Multi-Domain Sitemap Architecture, Internal Linking Engine, and an SEO Content Expansion System.
- **User Experience & Engagement**: Dashboard Lifecycle Command Center provides adaptive user guidance. A Global Report a Problem System allows users to report issues.
- **Medical Imaging Lesson Library**: Comprehensive radiography lesson library with 60+ lessons across 11 modules (positioning, physics, radiation safety, image production, patient care, equipment, radiographic anatomy, image interpretation, contrast media, quality control, emergency procedures). All lessons are region-tagged for ARRT (USA) and CAMRT (Canada) with distinct regulatory terminology. Lessons include quizzes, key concepts, and SEO metadata. Data stored in `imaging_physics_topics` table with category-based filtering.
- **Pharmacy Tech Question Bank**: 1,515 client-side questions across 6 batch files (pharmacy-tech-questions, extended, batch2, batch3, batch4, pebc) with PTCB/PEBC certification tagging. DB-seeded questions include 202 PTCB + 20 PEBC with cert_context column. 7 practice exams including PEBC Practice Exam. Adaptive engine supports cert_context filtering. Questions route supports `?cert=PTCB|PEBC` filtering.
- **Multi-Profession Support**: A dynamic Multi-Profession Framework allows configuration of new healthcare professions, including specific navigation and content for Allied Health careers. The cardiac sonographer path includes 8 core echocardiography lessons (Cardiac Anatomy, Cardiac Physiology, Echo Imaging Views, Doppler Ultrasound, Valvular Disease Assessment, Congenital Heart Defects, Cardiomyopathies, Hemodynamics) aligned to ARDMS RDCS-AE, CCI RCS, and Canadian CSCT Cardiac Sonography certifications, with RDCS-AE/CCI-RCS/CSCT-CARDIAC exam blueprints in the CAT engine.
- **NP Exam Ecosystem**: Structured NP exam preparation with central hub (`/np/exams`), dedicated AANP (`/np/aanp-exam`), ANCC (`/np/ancc-exam`), and Upcoming Canadian NP (`/np/upcoming-canada-np-exam`) pages. Question bank pools tagged as NP_CORE_BANK, AANP_BANK, ANCC_BANK, CANADA_NP_BANK with lesson-to-exam-domain mapping. Data layer in `client/src/lib/np-exam-ecosystem.ts`, pages in `client/src/pages/np-exam-pages.tsx`. US and Canadian NP questions are never mixed.
- **New Grad Resources**: Dedicated hubs for New Grad Certifications and Clinical References with detailed content and interactive elements. Includes a "New Grad Survival Guide" landing page (`/newgrad/survival-guide`) organizing content into 4 categories (Clinical Emergencies, Shift Survival, Communication & Documentation, Professional Growth). Clinical reference lessons include quick reference summary boxes, related lesson links, and category assignments. **Hybrid paywall model**: Free users browse career guides and certification overviews; premium tools (full question banks, mock exams, flashcards, brain sheets, templates, interview bank) are gated behind role-based entitlements (`new_grad_toolkit`, `certification_prep`). Entitlements engine in `server/entitlements.ts`; frontend uses `useNewGradEntitlements()` hook from `premium-cta.tsx`. `full_access` and `admin` tiers bypass all gates.
- **Emergency Certification Prep & Renewal Hub**: 12 dedicated pages for 6 emergency certifications (BLS, ACLS, PALS, NRP, TNCC, ENPC). Each cert has a prep page at `/certifications/{slug}-prep` (hero, audience, overview, core concepts, study roadmap, lessons, flashcards, practice questions, exam simulations, CTA, analytics preview) and a renewal page at `/certifications/{slug}-renewal-prep` (renewal expectations, skills refreshers, algorithm reviews, common mistakes, mock exams, condensed resources). ENPC (Emergency Nursing Pediatric Course) was added as a new certification. 13 question banks created in `client/src/data/exam-questions/certification-banks.ts` (6 prep + 6 renewal + 1 shared core). Content data in `client/src/data/certification-prep-content.ts`. All pages linked from newgrad certifications hub and nursing certifications hub.
- **Database Safety & Management**: PostgreSQL with Drizzle ORM, supported by an EnvironmentAwareContentWriteService.
- **Business & Analytics**: Content Analytics Engine, Admin Dashboard, SEO Performance & Growth Dashboard, Content Coverage Analyzer, Automated Content Growth Engine, and a Business Health & Subscriber Dashboard.
- **Offline Capabilities**: An IndexedDB-based Offline Study System for question packs and flashcards.
- **Free Pass System**: Automatic 1-day free pass for new accounts with fraud detection.
- **Exam Follow-Up**: Post-exam follow-up system on the dashboard for result reporting and personalized next steps.

## Career Question Banks
- **Surgical Technologist**: 1502 questions across 6 files (`client/src/data/career-questions/surgical-technologist-questions*.ts`), covering 8 domains (Sterile Technique, OR Protocols, Instrumentation, Procedures, Positioning, Infection Prevention, Anesthesia, Complications). Region-tagged (US: 125, CA: 108, BOTH: 1269). Also seeded in `exam_questions` DB table with `career_type='surgicalTechnologist'`. Seed script: `script/seed-surgical-tech-questions.ts`.

## External Dependencies
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Payment Processing**: Stripe, PayPal SDK
- **AI/Content Generation**: Centralized AI Provider Router (supports OpenAI, Ollama, vLLM, LM Studio, Anthropic)
- **Object Storage**: Replit Object Storage (Google Cloud Storage)

## Critical Build Notes
- **DO NOT use manual chunk splitting (`manualChunks`) in vite.config.ts.** React 19 uses an `Activity` export that causes module initialization race conditions when React, ReactDOM, and dependent libraries (Radix UI, etc.) are split into separate vendor chunks. Vite's default code splitting handles initialization order correctly.
- **Build command**: `npm run build` — outputs to `dist/public` for client, `dist/index.cjs` for server.
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

## Adaptive Study Engine
- Routes: `/study` (hub with all mode tiles) and `/study/:mode` (auto-starts a specific mode)
- Mode slugs: `recommended`, `weak-areas`, `due-review`, `flagged`, `rapid`, `mixed`, `pre-exam`
- Tiles navigate to `/study/{slug}` on click, with per-tile loading spinners and error banners
- Exit Session / Back to Study Modes navigates back to `/study`
- Free users: only `recommended` and `rapidReview` modes are unlocked