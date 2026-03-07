# NurseNest - Complete Nursing Learning Platform

## Overview
NurseNest is an interactive learning platform designed for nursing and allied health students, including RPN/LVN, RN, and NP, as well as 14 other career verticals. It provides comprehensive learning resources, exam preparation for NCLEX, REX-PN, and other allied health exams, performance analytics, and AI-powered content generation. The platform aims to enhance clinical reasoning, improve nursing knowledge, critical thinking, and ultimately, patient care outcomes across various healthcare disciplines by offering a robust, adaptive, and region-aware learning environment.

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
The platform utilizes React with TypeScript, Wouter for routing, shadcn/ui with Radix UI, and Tailwind CSS v4, offering 20 themes and DM Sans typography. Key UI components include `ContentGate`, `PauseAndThink`, `ProgressiveDisclosure`, `CuriosityHook`, and `KnowledgeCheck`. A digital product builder offers a Canva-style editor with drag-and-drop functionality and AI-powered image and content generation. The design system emphasizes premium visuals, dual-tone top bars, and watermarked PDF previews.

### Technical Implementations
The application is built with Vite, React, and Express 5 on Node.js with TypeScript. TanStack React Query manages server state via a RESTful API. Authentication uses username/password with session management. A subscription system supports regional pricing. The system features interactive learning modules, a mock exam engine with detailed reports and stratified random sampling, and a Strict Exam Mode. An admin dashboard provides analytics, content management, and content intelligence, including OpenAI-powered blog automation and a custom i18n system for 15 languages. Advanced features include an Adaptive CAT Engine, Pass Probability Projection Engine, and Next Best Action Engine. Exam blueprints are database-driven. Content is organized by body system for various nursing levels, with pre/post-test questions. A 3-step onboarding process generates personalized study plans. An admin-only QBank Factory and Product Generator V2 facilitate question bank creation and AI-driven content generation. Programmatic SEO practice question pages and an allied health architecture supporting 14 career verticals are also integrated. NGN question types and a partial credit scoring engine are implemented. The lesson content is served via a server-side API to optimize client-side bundle size. SEO optimization includes a 301 redirect system, sitemap generation, and related articles functionality. Access control is managed through a tier system (free, rpn, rn, np, admin).

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
- **OpenAI**: Used for blog posts, AI flashcards, lesson content, AI medical images, micro-lectures, and a 5-step content pipeline.
- **Test Bank Generator**: Ensures strict question count and JSON schema validation.
- **NGN QBank Generator**: Admin batch generation system with multiple prompt templates and strict validation.

### Social Media
- Meta Graph API: For social media scheduling.

## Exam Calculator
- **Component**: `client/src/components/exam-calculator.tsx` — draggable floating panel with arithmetic, memory, keyboard support
- **Integration**: Wired into `exam-console.tsx` replacing disabled calculator button
- **Features**: Basic arithmetic (+, -, x, /), decimal, percentage, clear/backspace, memory (M+/M-/MR/MC), keyboard support

## Spaced Repetition System
- **Schema**: `flashcard_reviews` table — userId, cardId, deckId, response (knew_it/unsure/wrong), interval, easeFactor, nextReviewDate
- **API Routes**: `POST /api/flashcard-review`, `GET /api/flashcard-review-due/:userId`
- **Intervals**: wrong=1 day, unsure=3 days, knew_it=interval * easeFactor (min 7, max 90 days)
- **UI**: 3-tier response buttons in `deck-views.tsx` with next-review-date labels
- **Dashboard Widget**: `ReviewDueWidget` shows due count or "All caught up"

## Quick Study Sessions
- **Page**: `client/src/pages/quick-study.tsx` — 10-minute timed session with 5-7 questions from weak areas
- **API**: `GET /api/quick-study/:userId?tier=rpn` — pulls from exam_questions prioritizing weak body systems
- **Features**: Countdown timer, progress bar, confidence rating, end-of-session summary
- **Dashboard Widget**: `QuickStudyWidget` with "Start Session" button

## Study Progress Momentum System
- **Study Streak**: Tracked in `user_stats.study_streak` and `user_stats.last_study_date`
- **Daily Goals**: `daily_study_goals` table — lessons/questions/minutes targets and completion tracking
- **Confidence Ratings**: `confidence_ratings` table — "very_confident", "somewhat", "guessing" per question
- **Review Queue**: `review_queue` table — auto-populated from low-confidence and incorrect answers
- **Weak Area Detection**: API computes from confidence_ratings grouped by body_system/topic where accuracy < 70%
- **Exam Readiness Score**: Computed from accuracy (40%), confidence (30%), coverage (30%)
- **Dashboard Integration**: `StudyMomentumPanel` component shows streak, readiness, review due, daily goals, weak areas
- **Confidence Modal**: `ConfidenceRatingModal` component for post-question confidence capture
- **API Routes**: `/api/daily-goals/:userId`, `/api/confidence-rating`, `/api/review-queue/:userId`, `/api/weak-areas/:userId`, `/api/exam-readiness/:userId`

## Lesson Library Redesign
- **Tier-Adaptive Hero**: `lesson-library-hero.tsx` — RPN/RN/NP-specific headlines, stats, CTAs
- **Featured Topics**: `featured-topics.tsx` — "Most Tested" topics per tier with difficulty and study time
- **Progress Card**: `lesson-progress-card.tsx` — progress ring, continue where you left off, estimated remaining time
- **Tier CTA**: `lesson-library-cta.tsx` — tier-specific 4-step "How NurseNest Helps You Pass" + final CTA
- **Study Time Estimates**: Clock icon + estimated minutes on each lesson card based on difficulty level

## Homepage Hero
- **Headline**: "Pass Your Nursing Licensing Exam With Confidence" — covers ALL exam tiers
- **Subheadline**: Mentions RPN, RN, NP + REx-PN, NCLEX-RN, NP certification
- **CTAs**: "Start Studying Free" → /register, "Try Practice Questions" → /free-practice
- **Proof Metrics**: Dynamic lesson count, question count, 12 body systems, Adaptive exam simulator
- **Value Pills**: Exam-Aligned Lessons, Clear Pathophysiology Explanations, Realistic Practice Questions, Track Your Study Progress
- **Trust Statement**: "Trusted by nursing students preparing for REx-PN, NCLEX-RN, and NP certification exams."

## Topic Mastery Dashboard Widget
- **Widget**: `TopicMasteryWidget` in `dashboard.tsx` — shows per-body-system accuracy as horizontal progress bars
- **API**: `GET /api/topic-mastery/:userId` — aggregates confidence_ratings by body_system
- **Color coding**: green >=70%, amber 50-69%, red <50%
- **Registration**: Added to WIDGET_COMPONENTS, WIDGET_ICONS (BarChart), WIDGET_I18N_KEYS, DEFAULT_WIDGETS

## Clinical Case Studies
- **Data**: `client/src/data/clinical-cases.ts` — 9 clinical cases total (3 original + 6 new)
- **New cases**: Postpartum Hemorrhage, Pediatric Respiratory Emergency, Hyperkalemia Emergency, Acute MI with Complications, Anaphylaxis Management, Acute Ischemic Stroke Decision
- **Structure**: ClinicalCase interface with 2-3 stages each, vitals/labs/assessmentFindings, 3 decisions per stage with isOptimal flag and mechanismExplanation
- **Body systems**: Reproductive, Respiratory (pediatric), Renal, Cardiovascular, Immune, Neurological

## Exam Question Bank
- **Total questions**: 3,722+ across all tiers (database)
- **RPN**: 1,644 questions (REX-PN) — cardiovascular, respiratory, neuro/gi/endo, peds/heme/pharm, expansion A-E
- **RN**: 939 questions (NCLEX-RN) — med-surg, pharmacology, expansion A-D (sepsis, shock, critical care, delegation, maternal, mental health, oncology, infection control)
- **NP**: 1,139 questions (AANP) — pharmacology, clinical management, expansion A-B, 55 exam batches
- **Question format**: `{q, o[], a, r, s}` — stem, options, correct answer index, rationale, body system
- **Migration script**: `script/migrate-questions-to-db.ts` — deduplicates via stem_hash
- **Exam chrome color**: CSS variable `--exam-chrome-color: #C7B8FF` in `:root` for top/bottom exam bars

## Lesson Content Status
- **Total lessons**: 1,422+ across all tiers (3,374 questions)
- **RPN (569 lessons)**: 100% complete - all fields populated with scope-appropriate content
- **RN (458 lessons)**: 100% complete - all fields populated with scope-appropriate content  
- **NP (236 lessons)**: 100% complete - all cellular placeholders replaced with NP-level pathophysiology content
- **Free tier (569 lessons)**: Complete
- **Batch 107**: Critical Care & Emergency (13 lessons)
- **Batch 108**: Pharmacology Classes (15 lessons)
- **Batch 109**: Renal/Neuro/Respiratory (13 lessons)
- **Batch 110**: Maternal/Pediatric/Mental Health (18 lessons)
- **Batch 111**: Infection Control/Algorithms/Overviews (26 lessons)
- Content files: 120+ TypeScript files in `client/src/data/lessons/`
- NP lessons with JSON-quoted keys (np-clinical-units.ts, respiratory-missing-np.ts) use `"title"` format vs unquoted `title:` in batch files

## Regional Measurement Adaptation
- **Module**: `server/region-adapt-content.ts` — server-side unit conversion applied at the lesson content API level
- **Integration**: `server/lesson-content-api.ts` `/api/lessons/content/:slug` endpoint calls `adaptLessonContent(lesson, region)` before sending response
- **Region detection**: `req.region` set by middleware in `server/region.ts` based on hostname (`.ca` → "CA", default → "US")
- **Baseline**: All lesson content is authored in US units (mg/dL, °F, mEq/L, g/dL, cells/µL, lbs)
- **Canadian conversions**: Context-aware keyword matching (30/50/80-char windows) to identify lab type before applying correct conversion factor
  - Glucose: mg/dL → mmol/L (×0.0555)
  - Creatinine: mg/dL → µmol/L (×88.4)
  - BUN: mg/dL → mmol/L (×0.357)
  - Calcium: mg/dL → mmol/L (×0.25)
  - Bilirubin: mg/dL → µmol/L (×17.1)
  - Hemoglobin/Albumin: g/dL → g/L (×10)
  - Temperature: °F → °C
  - Electrolytes: mEq/L → mmol/L (1:1)
  - WBC: cells/µL → ×10⁹/L (÷1000)
  - Weight: lbs → kg (×0.4536)

## Tester Access System
- **Schema**: `testerAccess` (boolean), `testerExpiry` (timestamp), `testerInviteCode` (text) on users table
- **Invite Codes**: `tester_invite_codes` table — code, maxUses, usedCount, expiresAt, notes, tier, isActive
- **Feedback**: `tester_feedback` table — userId, username, category, title, description, pageUrl, severity, status, adminResponse
- **Registration**: Invite code field on registration form; valid codes grant tester access + tier for 30 days
- **Middleware**: `requireAnyPaidTier()` and `requireExactTier()` in admin-auth.ts extended with `isActiveTester()` check
- **Frontend**: `hasAccess()` in auth.tsx returns true for active testers; `canAccessTier()` in access.ts accepts optional testerAccess/testerExpiry params
- **Banner**: `TesterBanner` component renders globally in App.tsx for active testers with feedback dialog
- **Admin APIs**: CRUD at `/api/admin/tester/invite-codes`, `/api/admin/tester/users`, `/api/admin/tester/feedback`
- **User APIs**: `POST /api/tester/feedback`, `GET /api/tester/feedback`, `POST /api/tester/validate-code`

## Trust & Credibility Pages
- **About Page**: `/about` — Founder bio (Erika Godin, RN), editorial standards, platform stats, timeline, values
- **Contact**: `/contact` — Support form with categories, email support@nursenest.ca
- **Terms**: `/terms` — Full terms of use, Ontario governing law
- **Privacy**: `/privacy` — PIPEDA-compliant privacy policy
- **FAQ**: `/faq` — i18n accordion with structured data
- **Footer**: About NurseNest link added to Resources column
- **SEO**: All trust pages in sitemap and seo-meta.ts staticPages