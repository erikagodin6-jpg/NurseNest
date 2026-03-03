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
- **DB Tables**: `autopilot_engines`, `autopilot_jobs`, `publishing_queue`, `autopilot_schedules`, `lifecycle_emails`, `blog_clusters`, `practice_pages`, `visual_assets`, `pinterest_pins`.
- **10 Engines**: blog_engine, question_factory, visual_factory, practice_seo, pinterest_scheduler, social_media, course_builder, lifecycle_email, auto_expansion, keyword_discovery. Auto-seeded on first API call.
- **Publishing Queue**: Content approval workflow (draft -> pending_review -> approved -> published/rejected).
- Uses `adminFetch` for auth.

### Study Path Generator
- **Study Plan Page** (`/study-plan`): Full plan view with week cards, progress tracking, remediation focus. File: `client/src/pages/study-plan.tsx`.
- **Study Plan Widget**: Compact dashboard widget. File: `client/src/components/study-plan-widget.tsx`.
- **Server**: `server/study-path.ts` with `setupStudyPathRoutes(app)`. Endpoints: POST `/api/study-plan/generate`, GET `/api/study-plan/:userId`, POST `/api/study-plan/:id/update-progress`, GET `/api/admin/study-plans/analytics`.
- **Integration**: Trial results page links to study plan via "View Study Plan" button.

### Social Media
- Meta Graph API: For social media scheduling.

### Access Control / Paywalls
- Tier system: free, rpn, rn, np, admin.