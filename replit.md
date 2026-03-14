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
- **AI-Powered Generation & Safety**: Includes a Question Bank Expansion Engine and an Allied Health Article Engine for large-scale content generation. An AI Safety & Job Queue System tracks and controls AI spend and operations with an emergency kill switch.
- **Content Quality Enforcement Gates**: Shared `ContentQualityGate` service (`server/content-quality-gate.ts`) enforcing 10 quality rules across all AI-generated questions, flashcards, rationales, and adaptive pool items. Scoring: clinical realism, educational value, stem variety, distractor quality, scenario authenticity, specialty fit (10 professions), new grad relevance, adaptive difficulty, rationale quality, flashcard conciseness/diversity. Batch diversity analysis for structural repetition, answer position bias, format distribution, topic clustering, phrasing similarity. Items below 65% saved as `needs_revision` with structured feedback. DB columns: `quality_scores`, `quality_feedback`, `quality_score` on `exam_questions` and `flashcard_bank`. Admin API: `/api/admin/quality-gate/analyze`, `/flagged`, `/override/:entityType/:id`, `/recheck/:entityType/:id`. Admin UI: "Quality Review" tab in Content Manager. Integrated into `qbank-generator.ts` ingest pipeline.
- **SEO & Marketing Infrastructure**: Features Programmatic SEO Engines (Quiz Engine, Page Expansion Engine), NCLEX Question Preview Pages, a Multilingual SEO & Translation System, and a Database-Driven Multi-Domain Sitemap Architecture. Also includes Allied Health Marketing & SEO Ecosystem, Medical Image SEO System, Lead Capture Funnels, Conversion Funnel System, Career Journey Funnel Pages, Clinical Specialty Hub Pages, and a Nursing SEO Content Hub.
- **Public Marketing & Conversion Proof System**: Dynamic trust counters on homepage fetched from `/api/public/platform-proof` endpoint (15-min cache). Displays live platform stats (questions, flashcards, decks, lessons) with marketing-friendly rounding. Includes conversion-focused proof block, soft competitive positioning section, and skeleton loading states. Stats reflected in `marketing-copy.ts` for track-specific pages (RPN, RN, NP). `PlatformProof` type in `shared/lesson-stats.ts`.
- **Analytics & Admin**: A Content Analytics Engine & Admin Dashboard provides real-time production data, content health audits, and ROI insights. Public aggregate counts at `GET /api/public/platform-proof`.
- **Offline Capabilities**: An IndexedDB-based Offline Study System for question packs and flashcards.
- **Multi-Profession Framework**: A dynamic system for configuring and adding new healthcare professions, supported by a Universal Question Bank Importer.
- **Data Management**: PostgreSQL with Drizzle ORM.

## External Dependencies
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Payment Processing**: Stripe, PayPal SDK
- **AI/Content Generation**: OpenAI
- **Social Media**: Meta Graph API