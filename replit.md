# NurseNest - Complete Nursing Learning Platform

## Overview
NurseNest is an interactive learning platform for RPN/LVN, RN, and NP nursing students, offering comprehensive resources like lessons, flashcards, performance analytics, and exam prep for NCLEX and REX-PN. It supports both US and Canadian nursing standards, focusing on clinical pathophysiology, medication safety, and condition recognition to enhance clinical reasoning. Key features include a digital study marketplace, AI-powered content generation for medical images and micro-lectures, and a dual-path exam system. The platform aims to improve nursing knowledge, critical thinking, and ultimately, patient care outcomes by providing a robust and adaptive learning environment. It has expanded into a multi-career allied health exam prep platform, supporting 14 different career verticals.

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
The platform uses React with TypeScript, Wouter for routing, shadcn/ui with Radix UI, and Tailwind CSS v4, providing 20 themes and DM Sans typography. Engaging components include `ContentGate`, `PauseAndThink`, `ProgressiveDisclosure`, `CuriosityHook`, and `KnowledgeCheck`. A digital product builder offers a Canva-style editor with drag-and-drop, AI image lab, multi-page AI content pagination, and AI bundle/test bank generators. It features a premium design system with Canva-quality visuals, dual-tone top bars, and watermarked PDF previews.

### Technical Implementations
The application is built with Vite, React, and Express 5 on Node.js with TypeScript. TanStack React Query manages server state via a RESTful API. Authentication uses username/password with session management. An admin-only content engine supports AI generation and internal linking. The subscription system includes regional pricing. Interactive learning modules cover Med Math, Clinical Calculations, Abnormal Lab Interpretation, Clinical Case Simulation, and Medication Mastery. Content is region-aware with server-side detection. A mock exam engine offers timed exams with detailed reports and stratified random sampling, including a Strict Exam Mode. Admin features include a dashboard for analytics, content management, and content intelligence. Additional features encompass OpenAI-powered blog automation, custom flashcards with AI checks, a custom i18n system for 15 languages, an Adaptive CAT Engine, a Pass Probability Projection Engine, and a Next Best Action Engine. Exam blueprints are database-driven. The system also includes a free diagnostic SEO funnel, a study workload calculator, and an AI Medical Image Generator. A dual-path exam system supports REx-PN and NCLEX-RN. Drizzle ORM with PostgreSQL is used, with schemas defined in `shared/schema.ts` and Zod for validation.

Lessons are organized by body system (RPN/LVN, RN, NP, Pharmacology) with pre/post-test questions, each containing 10 content sections with inline admin editing and AI generation. A flashcard system includes bookmarking and mastery tracking. Anatomy & Physiology detail pages cover 12 body systems.
A 3-step onboarding process leads to a personalized study plan. An admin-only QBank Factory enables creation, management, and publishing of question banks. The Product Generator V2 provides an isolated, chunked, and resumable question generation pipeline with AI prompt hardening and JSON response cleaning. Programmatic SEO practice question pages and a nursing glossary with 110+ terms are integrated. An exit-intent signup modal and a "Share Your Score" social card are also implemented. Quiz rationale access is gated for anonymous users.

The system supports a multi-career allied health architecture, with career configurations in `shared/careers.ts` and career-specific question banks. The allied health subdomain (`allied.nursenest.ca`) operates with a separate frontend shell, content pipeline, and DB tables for blueprints, questions, flashcards, and a revision queue. Store admin features include document upload to Replit Object Storage and watermarked PDF preview generation. Specific sections for REx-PN Exam Prep and a Pharmacology Crash Course are included. NGN question types and a partial credit scoring engine are implemented. Allied exam blueprints for 10 professions are configured.

## External Dependencies

### Database
- PostgreSQL
- Drizzle ORM

### Payment Processing
- Stripe (including Stripe Checkout)
- PayPal SDK

### Key npm Dependencies
- **UI**: shadcn/ui, Radix UI primitives, Lucide icons
- **Forms**: `react-hook-form`, `@hookform/resolvers`, Zod
- **Dates**: `date-fns`

### AI/Content Generation
- **OpenAI**: Used for blog posts, AI flashcards, lesson content, AI medical images (gpt-image-1), and micro-lectures.
- **5-Step Content Pipeline**: A multi-step AI pipeline for cohesive content generation.
- **Test Bank Generator**: Ensures strict question count and JSON schema validation.
- **NGN QBank Generator**: Admin batch generation system at `/admin/qbank/ngn-generator` with 5 prompt templates (ngn_batch_v1, allied_batch_v1, cnpe_v1, np_us_v1, np_seo_v1), strict validation engine, dry-run previews, scheduling, and DB ingestion. Files: `server/qbank-generator.ts`, `server/qbank-scheduler.ts`, `server/prompts/qbank-templates.ts`, `client/src/pages/admin-ngn-generator.tsx`. DB tables: `qbank_prompt_templates`, `qbank_generation_runs`, `qbank_generation_schedules`. Uses `adminFetch` for auth.

### Free Trial Funnel
- **50-Question Trial**: Unauthenticated users can take a free trial (1 per exam per IP/device per 30 days). Routes: `/trial`, `/trial/session/:id`, `/trial/results/:id`, `/trial/upgrade`. Server: `server/trial.ts` with `setupTrialRoutes(app)`. DB: `trial_sessions` table. Client pages: `trial-landing.tsx`, `trial-session.tsx`, `trial-results.tsx`, `trial-upgrade.tsx`. Uses `ExamConsoleLayout` component from `client/src/components/exam-console.tsx`.
- **Premium Exam Console** (`client/src/components/exam-console.tsx`): 2-column layout (60% question, 40% exhibit/notes), sticky top bar with timer/progress/flag, keyboard shortcuts (1-5 select, N/P navigate, F flag, H highlight, ? shortcuts), ExhibitViewer with zoom/pan/fullscreen, strike-through on right-click, text highlighting, question navigator grid, mobile responsive.

### Autopilot Control Center
- **Admin Dashboard** (`/admin/autopilot`): 14-tab admin dashboard controlling all automation engines. File: `client/src/pages/admin-autopilot.tsx`. Server: `server/autopilot.ts` with `setupAutopilotRoutes(app)`.
- **Tabs**: Overview, Schedules, Publishing Queue, Keyword Discovery, Blog Engine, Practice SEO Engine, Question Factory, Visual Factory, Pinterest Scheduler, Auto Expansion, Course Builder, Lifecycle Email, Performance Dashboard, Settings.
- **DB Tables**: `autopilot_engines`, `autopilot_jobs`, `publishing_queue`, `autopilot_schedules`.
- **10 Engines**: blog_engine, question_factory, visual_factory, practice_seo, pinterest_scheduler, social_media, course_builder, lifecycle_email, auto_expansion, keyword_discovery. Auto-seeded on first API call.
- **Publishing Queue**: Content approval workflow (draft -> pending_review -> approved -> published/rejected).
- **Content Generators** (`server/content-generators.ts`): 5 live generators that call OpenAI (gpt-4o) when autopilot jobs are triggered:
  - `generateNursingPage()`: Master prompt for 1500-2500 word nursing study pages (intro, concept explanation, clinical assessment, nursing interventions, tables, exam traps, clinical pearls, 10+ practice questions with rationales, infographic recommendations, SEO metadata)
  - `generatePracticeQuestionPage()`: Master prompt for 25-question practice banks (MC, SATA, case-based) with 300+ word rationales, auto-validation, difficulty distribution
  - `generateAlliedHealthPage()`: Master prompt for 1500-2200 word allied health study pages — supports 5 careers: Pharmacy Tech (PTCB/ExCPT), Respiratory Therapy (RRT/TMC), Paramedic/EMS (NREMT), MLT (ASCP), Radiology (ARRT). Structure: intro, role scope, core concepts, clinical workflow, safety considerations, exam traps, clinical pearls, 10+ practice questions, infographic recommendation, SEO metadata
  - `generateVisualDiagram()`: Visual content specification generator (anatomy, pathophysiology, drug mechanisms, lab values)
  - `generatePracticeSEOPage()`: SEO-optimized practice question pages with FAQ schema and keyword targeting
  - `generateCourseContent()`: Complete course outlines with modules, lessons, quizzes, and learning outcomes
- **Job Processing**: `processAutopilotJob()` in `server/autopilot.ts` dispatches jobs to generators asynchronously. Blog engine routes to `generateNursingPage` by default, or `generateAlliedHealthPage` when `payload.contentType === "allied_health"`. Jobs update status (queued -> running -> completed/failed) and results feed into Publishing Queue for admin review.
- **Blog Engine Tab UI**: Content type toggle (Nursing / Allied Health) switches between nursing exam selector (NCLEX-RN, NCLEX-PN, REx-PN, CNPE) and allied health career selector (Pharmacy Tech, Respiratory Therapy, Paramedic/EMS, MLT, Radiology). Both share topic, keyword, and word count fields.
- Uses `adminFetch` for auth. OpenAI via `AI_INTEGRATIONS_OPENAI_API_KEY`/`AI_INTEGRATIONS_OPENAI_BASE_URL`.

### Study Path Generator
- **Study Plan Page** (`/study-plan`): Full plan view with week cards, progress tracking, remediation focus. File: `client/src/pages/study-plan.tsx`.
- **Study Plan Widget**: Compact dashboard widget. File: `client/src/components/study-plan-widget.tsx`.
- **Server**: `server/study-path.ts` with `setupStudyPathRoutes(app)`. Endpoints: POST `/api/study-plan/generate`, GET `/api/study-plan/:userId`, POST `/api/study-plan/:id/update-progress`, GET `/api/admin/study-plans/analytics`.
- **Integration**: Trial results page links to study plan via "View Study Plan" button.

### Social Media
- Meta Graph API: For social media scheduling.

### Lesson Content Pipeline
- **Content Standard**: 1500+ words per lesson; RPN scope = monitor/report/administer; pathophysiology, risk factors, condition-specific meds (3), clinical quiz questions (3), 7 clinical pearls.
- **Injection Scripts**: `script/inject-batch-*.ts` replace placeholder content in `generated-batch-*.ts` files. 30+ injection scripts created.
- **ALL RPN LESSONS COMPLETE**: 1,119 total lessons with 2,563 questions. Zero remaining RPN placeholders. All 228+ RPN lessons written with real clinical content covering: GI, Renal, Endocrine, Infection, HEENT/Skin, Heme/Fluids, Assessment, Cardiac/Emergency, OB/Oncology, Neuro/Wound, EOL/Neonatal, Grief/Screening, Respiratory/Occupational, Derm/Pediatric, Community/Legal, IV Therapy, Maternity, Psych/Metabolic, Pain/Mobility, Pharmacology, Palliative, Wound Care, and more.
- **safeMerge pattern**: Real content files are listed BEFORE generated-batch files in `index.ts`, so real content overrides placeholders.
- **Bug Fix Applied**: React hooks violation in `lesson-detail.tsx` fixed - 8 hooks moved above early return at line ~1790 to ensure consistent hook call order.

### Performance: Lesson Content API
- **Server-Side Lesson API** (`server/lesson-content-api.ts`): Serves lesson content via REST API instead of bundling 15MB+ of lesson data into client JavaScript.
  - GET `/api/lessons/meta` - lightweight metadata (id, title, tier, category) for all lessons
  - GET `/api/lessons/content/:slug` - full lesson content for a single lesson
  - GET `/api/lessons/search?q=term` - search lessons by title/id
  - GET `/api/lessons/count` - lesson and question counts
- **Impact**: Main JS bundle reduced from 15.5MB to 76KB (99.5% reduction). Lesson content loads on-demand when a specific lesson page is visited.
- **Changed Files**: lesson-detail.tsx (fetches from API), global-search.tsx (uses search API), profile.tsx (removed contentMap dep), exam-practice-landing.tsx (slug-based titles), seo-utils.ts (type-only import), getI18n.ts (accepts base lesson parameter), subscribe.tsx (static counts).

### SEO: /learn Page Optimization
- **301 Redirect System** (`server/index.ts`): `LEARN_REDIRECTS` map handles old/bad slugs. Matched via middleware before routes.
  - `oxygenation-vs-ventilation-critical-differences` -> `oxygenation-vs-ventilation-clinical-distinction` (duplicate consolidated)
  - `create-more-posts-about-hyperkalemia` -> `hyperkalemia-nursing-guide` (prompt leak slug fixed)
  - `test-publish-flow-1772145129698` -> `/blog` (test content deleted)
- **Sitemap**: /learn pages only include English URLs (no fake 15-locale expansion). Quality gate: content_length > 5000 chars. Redirected slugs excluded.
- **noindex**: Non-English /learn pages get `<meta name="robots" content="noindex, follow">` via SEO component. Since no real translations exist, this prevents thin/duplicate indexing.
- **Related Articles**: `GET /api/content/slug/:slug/related` scores candidates by category match, tag overlap, and title word similarity. Top 4 shown at bottom of each /learn page. Quality filter: only content >= 5000 chars.
- **SEO Component**: `client/src/components/seo.tsx` supports `noindex` prop. Canonical URLs strip locale prefix. Hreflang tags auto-generated for supported locales.

### Access Control / Paywalls
- Tier system: free, rpn, rn, np, admin.