# NurseNest - Complete Nursing Learning Platform

## Overview
NurseNest is an adaptive learning platform designed for nursing and allied health students across 17 career verticals. It offers comprehensive learning resources, advanced exam preparation for certifications like NCLEX and REX-PN, and robust performance analytics. The platform leverages AI for content generation and aims to significantly enhance clinical reasoning, nursing knowledge, and critical thinking skills, thereby improving patient care outcomes through a region-aware and adaptive learning environment.

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
The platform utilizes React with TypeScript, Wouter for routing, shadcn/ui with Radix UI, and Tailwind CSS v4, offering 20 themes and DM Sans typography. Key UI components like `ContentGate`, `PauseAndThink`, `ProgressiveDisclosure`, `CuriosityHook`, and `KnowledgeCheck` are central to the learning experience. A digital product builder facilitates content creation with a Canva-style drag-and-drop interface, AI image, and content generation. The design system features premium visuals, dual-tone top bars, and watermarked PDF previews. Global CSS ensures `overflow-x: hidden` and `box-sizing: border-box`, with dialogs optimized for mobile safety.

### Technical Implementations
Built with Vite, React, and Express 5 on Node.js with TypeScript, the application uses TanStack React Query for server state management via a RESTful API. Authentication is managed through a 3-tier header chain: Bearer admin JWT, x-username/x-password credentials, and a 30-day expiring x-user-token JWT. A centralized `getAuthHeaders()` in `client/src/lib/qbank-api.ts` handles fallback, validated by `resolveAuthUser()` in `server/admin-auth.ts`. The system includes a subscription model with regional pricing, interactive learning modules, a mock exam engine with stratified random sampling and Strict Exam Mode, and an admin dashboard. AI integrations (OpenAI) support blog automation, an Adaptive CAT Engine, Pass Probability Projection, and Next Best Action Engine. Exam blueprints are database-driven, content is organized by body system for various nursing levels, and includes pre/post-test questions. A 3-step onboarding process personalizes study plans. Admin tools (QBank Factory, Product Generator V2) enable AI-driven content generation and programmatic SEO for practice question pages. It supports NGN question types, partial credit scoring, and a Spaced Repetition System. Content access is tier-based (free, rpn, rn, np, admin).

### Feature Specifications
- **Question Bank System**: Supports Admin, Exam, Study, and Browse modes with JSON import, inline editing, status toggling, timed exams, and analytics, enforcing content safety rules by user tier and region.
- **Paramedic EMS Scenario Simulation System**: Manages interactive paramedic scenarios with detailed dispatch, assessment, decision points, and debriefing, segmented by content domain, profession track, region, visibility, difficulty, and exam relevance.
- **Referral Discount System**: Users generate unique referral codes for friends (15% discount) and earn 7 free premium days for successful referrals, integrated with Stripe.
- **Beta Tester Access Code Management**: Admin functionality for generating, managing, and tracking beta invite codes with customizable tiers, usage limits, and durations.
- **Pharmacy Tech Adaptive Practice & Mastery System**: Intelligent adaptive practice at `/pharmacy-technician/adaptive-practice` with difficulty progression (1-5 scale), per-category mastery tracking (Beginner/Developing/Proficient/Advanced), weak area detection, study recommendations linking to lessons/flashcards/exams, post-session analytics with difficulty progression charts, and a mastery dashboard. Uses `pharmtech_adaptive_sessions` and `pharmtech_mastery_history` DB tables. Server engine in `server/pharmtech-adaptive-engine.ts`, routes in `server/pharmtech-routes.ts`.
- **Paramedic Landing & Hub Pages**: SEO-optimized pages for paramedic careers, including landing pages, exam-specific pages (PCP, ACP, NREMT), and content hubs for lessons, exams, flashcards, and scenarios. Region-aware with CA/US toggle (RegionSelector component).
- **Paramedic Regional System**: ParamedicRegionProvider context with localStorage persistence. Supports CA (mmol/L, COPR/PCP/ACP tracks) and US (mg/dL, NREMT tracks) regions. RegionSelector and RegionNotesCallout components show region-specific content across all paramedic pages.
- **Paramedic Question SEO Pages**: Programmatic question practice pages at /paramedic/questions (index) and /paramedic/questions/:topicSlug (100 topic pages). 500 questions across 10 categories, 5 free interactive questions per topic with rationales, locked remaining questions as conversion CTAs. Backend API at /api/paramedic/question-topics. Integrated into sitemap and cross-linked from all paramedic SEO pages.
- **SEO Page System**: Dynamically generates landing pages for mock exams, hub pages for nursing certifications, and dedicated pages for medical conditions, medications, and lab values, all with structured data and comprehensive SEO metadata.
- **Paramedic SEO Content Engine**: Manages various SEO content types (Topic, Category, Glossary, Comparison, Study Guides) for paramedic content, supporting internal linking and structured data. PracticeQuestionsLink component cross-links to question practice pages.
- **MLT Exam Engines**: Offers Canada CSMLS, USA ASCP CAT, Adaptive Practice, and customizable Practice Exam modes, featuring IRT-based ability estimation and CAT stop logic.
- **MLT Lab Image & Microscopy System**: Manages lab image metadata, relational linking to questions/flashcards/lessons, and user drill practice history, including an Admin Image Library.
- **MLT Remediation & Content Linking Engine**: Auto-links questions to lessons and flashcards using a weighted relevance scoring engine (discipline, topic, subtopic, blueprintCategory, tags, difficulty, countryTrack, examTrack). Shows "Review This Topic" panels when students answer wrong in tutor/completed exams, provides personalized dashboard recommendation panels (Recommended Next Lesson, Review Flashcards, Retry Weakest Topics, Based on Last Exam), supports admin manual content-link overrides via `mlt_content_links` table, and tracks remediation analytics in `mlt_remediation_analytics` table. Routes in `server/mlt-remediation-routes.ts`, engine in `server/mlt-remediation-engine.ts`.
- **Paramedic Exam Simulator Engine**: Full multi-mode (Practice/Exam/Adaptive/Drill) exam simulator with server-side question selection from `allied_questions`, blueprint-weighted question distribution (NREMT/COPR-PCP/COPR-ACP), IRT-style adaptive difficulty, session persistence in `paramedic_exam_sessions`, and results analytics with domain breakdown and attempt history.
- **Clinical Case Study Engine**: Manages multi-stage clinical case studies with decision points, exhibit data (vitals, labs, notes), various question types, and per-question scoring with partial credit.
- **Blog Batch Generator**: Automates the generation of blog posts via OpenAI with smart scheduling.
- **MLT Admin Content Studio**: Comprehensive admin interface for managing MLT content (questions, flashcards, lessons) with CRUD, bulk import, validation, and content distribution dashboards.
- **MLT Student Dashboard**: A 9-tab dashboard for MLT candidates covering Overview, Exams, Flashcards, Lessons, Performance, Wrong Answers, and Study Plan, with domain mastery heatmap and remediation actions.
- **Paramedic Bulk Upload Manager**: Admin tool for importing large amounts of paramedic content (questions, flashcards, lessons, scenarios, etc.) via JSON, CSV, or text, with field mapping, validation, and version control.
- **Paramedic ECG/Waveform Library**: SVG-based ECG strip and cardiac monitor rendering system with 25 seeded rhythm types (NSR, AFib, VTach, VFib, heart blocks, STEMI patterns, capnography). Browsable library at `/paramedic/ecg-library` with search/filter, detail views with monitor toggle. Admin CRUD at `/admin/paramedic-waveforms`. DB table: `paramedic_waveform_assets`. Auto-seeded on startup.
- **CAT Exam Flashcard System**: Converts 7,375 published exam questions from `exam_questions` table into premium flashcard-style study cards in `flashcard_bank` table. Features structured rationale (correct answer explanation, per-distractor rationales, clinical takeaway, exam pearl), matched infographic images, lesson links, and full study UI with progress tracking, bookmarking, mastered cards, and resume support. Auto-synced on startup via `server/exam-flashcard-mapper.ts`. Premium-only, tier-filtered (rpn/rn/np). API: `/api/flashcard-bank?sourceType=cat_exam`, `/api/flashcard-bank/counts`.

## External Dependencies

### Database
- PostgreSQL
- Drizzle ORM

### Payment Processing
- Stripe
- PayPal SDK

### Key npm Dependencies
- **UI**: shadcn/ui, Radix UI primitives, Lucide icons
- **Forms**: `react-hook-form`, `@hookform/resolvers`, Zod
- **Dates**: `date-fns`

### AI/Content Generation
- OpenAI: Utilized for blog posts, AI flashcards, lesson content, AI medical images, micro-lectures, and a 5-step content pipeline.
- Test Bank Generator: Ensures strict question count and JSON schema validation.
- NGN QBank Generator: Admin batch generation system with multiple prompt templates and strict validation.

### Social Media
- Meta Graph API: For social media scheduling.

## Critical Development Notes

### @assets/ Import Restriction
The `@assets/` alias is a Vite-only resolve alias that works in client builds but NOT in server-side `tsx` execution. Files in `client/src/data/lessons/` are dynamically imported by `server/lesson-content-api.ts` at runtime via `tsx`. **Never add `@assets/` imports to lesson data files** — this will crash the server.

### Exam Question Bank
- Total published questions: 8,106 (RPN=3,017, RN=2,855, NP=2,002, RRT=232)
- Schema: `exam_questions` table with tier, exam, question_type, status, stem, options (jsonb), correct_answer (jsonb int array), rationale, difficulty, body_system, region_scope, stem_hash
- Seed file: `server/seed-data/exam-questions.json` (all 8,106 questions exported from dev DB)
- Seed function: `server/seed-exam-questions.ts` runs at startup, uses stem_hash+exam dedup
- Digital Products: 54 active products with 18,420 total store questions
- Digital Products seed: `server/seed-data/digital-products.json` + `server/seed-digital-products.ts`, runs at startup via slug dedup
- Both seeds run automatically on every startup (dev and production), ensuring dev→prod parity
- `server/seed-prompts3.ts`: Imports 60 questions from prompts3 file. Triggered via POST /api/admin/questions/seed-prompts3. Uses stem_hash dedup.
- CAT question image coverage via `categoryImageMap` in `client/src/lib/system-images.ts`

### Startup
- Workflow: `npx tsx script/compute-tier-counts.ts && npm run dev`
- `compute-tier-counts.ts` reads lesson files via `fs` (not imports) to avoid @assets/ chain
- Deployment: build=`npm run build`, run=`node ./dist/index.cjs` (autoscale)
