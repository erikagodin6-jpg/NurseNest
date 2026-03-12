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
- **Paramedic Landing & Hub Pages**: SEO-optimized pages for paramedic careers, including landing pages, exam-specific pages (PCP, ACP, NREMT), and content hubs for lessons, exams, flashcards, and scenarios.
- **SEO Page System**: Dynamically generates landing pages for mock exams, hub pages for nursing certifications, and dedicated pages for medical conditions, medications, and lab values, all with structured data and comprehensive SEO metadata.
- **Paramedic SEO Content Engine**: Manages various SEO content types (Topic, Category, Glossary, Comparison, Study Guides) for paramedic content, supporting internal linking and structured data.
- **MLT Exam Engines**: Offers Canada CSMLS, USA ASCP CAT, Adaptive Practice, and customizable Practice Exam modes, featuring IRT-based ability estimation and CAT stop logic.
- **MLT Lab Image & Microscopy System**: Manages lab image metadata, relational linking to questions/flashcards/lessons, and user drill practice history, including an Admin Image Library.
- **Blog Batch Generator**: Automates blog post generation using OpenAI.
- **MLT Admin Content Studio**: Comprehensive admin interface for managing MLT content (questions, flashcards, lessons) with CRUD, bulk import, validation, and content distribution dashboards.
- **MLT Student Dashboard**: A 9-tab dashboard for MLT candidates covering Overview, Exams, Flashcards, Lessons, Performance, Wrong Answers, and Study Plan, with domain mastery heatmap and remediation actions.
- **Clinical Case Study Engine**: Manages multi-stage clinical case studies with decision points, exhibit data (vitals, labs, notes), various question types, and per-question scoring with partial credit.
- **Blog Batch Generator**: Automates the generation of blog posts via OpenAI with smart scheduling.
- **MLT Admin Content Studio**: Comprehensive admin interface for managing MLT content (questions, flashcards, lessons) with CRUD, bulk import, validation, and content distribution dashboards.
- **Paramedic Bulk Upload Manager**: Admin tool for importing large amounts of paramedic content (questions, flashcards, lessons, scenarios, etc.) via JSON, CSV, or text, with field mapping, validation, and version control.

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
- Total published questions: 7,520+ (RPN=3,017, RN=2,501, NP=2,002) plus prompts3 imports
- Schema: `exam_questions` table with tier, exam, question_type, status, stem, options (jsonb), correct_answer (jsonb int array), rationale, difficulty, body_system, region_scope, stem_hash
- Seed scripts in `script/` use WHERE NOT EXISTS deduplication pattern
- `server/seed-prompts3.ts`: Imports 60 questions from prompts3 file (20 bowtie NCLEX-PN/REx-PN, 30 RRT MCQ → allied_questions, 10 RN NGN mixed types). Triggered via POST /api/admin/questions/seed-prompts3. Uses stem_hash dedup.
- CAT question image coverage via `categoryImageMap` in `client/src/lib/system-images.ts`

### Startup
- Workflow: `npx tsx script/compute-tier-counts.ts && npm run dev`
- `compute-tier-counts.ts` reads lesson files via `fs` (not imports) to avoid @assets/ chain
- Deployment: build=`npm run build`, run=`node ./dist/index.cjs` (autoscale)
