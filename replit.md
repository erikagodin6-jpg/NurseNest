# NurseNest - Complete Nursing Learning Platform

## Overview

NurseNest is an interactive nursing education platform for RPN/LVN, RN, and NP students, offering lessons, flashcards, performance analytics, and exam preparation (NCLEX/REX-PN). It supports both US and Canadian nursing standards, focusing on clinical pathophysiology, medication safety, and condition recognition. The platform aims to be a comprehensive learning tool for aspiring and current nurses.

## User Preferences

Preferred communication style: Simple, everyday language.
- Admin account: user "erikanim" has tier="admin" with full content access bypass
- Copyright must show current year dynamically (uses `new Date().getFullYear()`)
- NO normal lab values on lesson pages - only abnormal clinical findings
- Content depth: Multi-paragraph cellular/molecular pathophysiology, detailed drug MOA at receptor level
- Scope enforcement: RPN "monitor/report/administer as ordered," RN protocol-based, NP "order/prescribe"
- Regional content: CA shows CAD prices/Canadian labs, US shows USD/US values
- NCLEX disclaimer: NurseNest is NOT affiliated with NCLEX, NCSBN, CNO, or any regulatory body
- Copy protection: content cannot be easily copied/screenshotted

## System Architecture

### UI/UX Decisions
- **Framework**: React with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS v4, CSS custom properties for theming
- **Theming**: `next-themes` supporting 20 themes: lavender (default), mint, blush, slate, midnight, ocean, forest, pastel-lavender, pastel-mint, pastel-blush, clinical-light, dark-clinical, neutral-sand, neutral-slate, dark-academia, rose-gold, coral, indigo, teal, berry. Non-pastel themes are fully monotone.
- **Font**: DM Sans from Google Fonts
- **Content Gating**: `ContentGate` component for free/preview/premium content visibility.
- **Engagement**: Interactive components like `PauseAndThink`, `ProgressiveDisclosure`, `CuriosityHook`, `KnowledgeCheck`.

### Technical Implementations
- **Frontend Build**: Vite with React plugin, route-based code splitting via React.lazy()
- **State Management**: TanStack React Query for server state, React useState for local state
- **Path Aliases**: `@/` (client), `@shared/` (shared), `@assets/` (attached assets)
- **Backend**: Express 5 on Node.js with TypeScript
- **API Pattern**: RESTful API with `/api` prefix
- **Authentication**: Simple username/password auth, session in localStorage, admin authentication with server-side verification.
- **Content Engine**: Admin-only editor (`/content-editor`) for structured content with block editor, tagging, SEO, and preview. Dynamic SEO-optimized pages at `/learn/:slug`.
- **Subscription System**: Multiple tiers (Free, RPN/LVN, RN/NCLEX, NP Advanced) with various durations and regional pricing (CAD/USD).
- **Interactive Labs**:
    - **Med Math & Clinical Calculations Lab**: Randomized problems with stepwise solutions.
    - **Abnormal Lab Interpretation Engine**: Scenarios with cluster-based lab presentation and explanations.
    - **Clinical Clarity**: Explanations for "Why does X happen?" topics.
    - **Clinical Case Simulation Platform**: Branching decision cases with vitals, labs, and debriefing.
    - **Medication Mastery Engine**: Mechanism-first drug explorer with receptor/pathway effects.
- **Interactive Clinical Simulators** (6 modules, CA/US unit switching, score tracking, immediate feedback):
    - **First Action Prioritization** (`/first-action-simulator`): 16 tier-scoped scenarios (RPN stable, RN unstable/ICU, NP diagnosis). Paid.
    - **Safety & Hazard Detection** (`/safety-hazard-simulator`): 6 clinical environments with hazard identification. FREE.
    - **IV Complications** (`/iv-complications-simulator`): 8 scenarios (infiltration, extravasation, phlebitis, air embolism, etc.) with two-phase questions. FREE.
    - **Electrolyte & ABG Interpretation** (`/electrolyte-abg-simulator`): 8 electrolyte cases + 6 ABG stepwise analysis cases. Paid.
    - **Deteriorating Patient** (`/deteriorating-patient-simulator`): 6 staged scenarios (sepsis, COPD, hemorrhage, opioid, anaphylaxis, STEMI) with time-to-action scoring. Paid.
    - **Blood Transfusion** (`/blood-transfusion-simulator`): ABO/Rh compatibility, reaction recognition (6 types), intervention decision-making. Paid.
- **Unit Conversion System**: Centralized in `client/src/lib/unit-conversion.ts` for CA metric / US imperial switching (temp, weight, glucose, creatinine, hemoglobin, vitals).
- **Mock Exam Engine**: Timed mock exams at `/mock-exams` with configurable tier (RPN/RN/NP), exam length (25/75/100/150), question flagging, pause/resume timer, question navigator, auto-save every 10s, post-exam report with score ring, body system breakdown, weak area analysis, question review with rationale, and score trend across attempts. Pages: `mock-exams.tsx`, `mock-exam-session.tsx`, `mock-exam-report.tsx`. Question pool from `client/src/lib/question-pool.ts` using stratified random sampling. Data stored in `mock_exam_attempts` table.
- **Admin Features**: Dashboard (`/admin`) for user analytics, subscriptions, activity, and unified Content Engine tab (combines content analytics, blog automation, content creation with type selector, tier quick-toggle, scheduling, and post management). **LAYOUT LOCKED** - see `.local/admin-layout-lock.md`. The admin page layout (tabs, ordering, existing controls) is frozen. New features can be added but nothing existing may be removed, reordered, or redesigned.
- **Admin Preview Mode**: Admin users can preview the platform as free/rpn/rn/np users via dropdown in navigation.
- **Inline Lesson Editing**: Admin users can edit lesson content directly on lesson detail pages without navigating to a separate editor. Edits are stored as JSON overrides in `lesson_overrides` table and merged with static TypeScript lesson data at render time. Supports editing all sections: pathophysiology, risk factors, diagnostics, management, nursing actions, lifespan, clinical findings, medications, and exam pearls.
- **Blog Automation**: OpenAI-powered blog post generation requiring peer-reviewed scholarly sources from last 5 years (2021-2026), APA7/MLA citation support with DOI URLs, minimum 6 references per post. Auto-scheduler (2x/day for 120 days, then 1x/day for 100 days), admin controls in Content Engine tab. Batch generation mode (up to 20 topics at once) with publishing queue scheduling (1 post/day starting from chosen date). Queue management UI shows scheduled posts with reschedule and publish-now controls.
- **Custom Flashcards**: Users can create, edit, delete, and study their own flashcards stored in PostgreSQL (`user_flashcards` table). Accessible from profile page with flip-card study mode.
- **i18n System**: 15 languages supported (en, fr, tl, hi, es, zh, ar, ko, pt, pa, vi, ht, ur, ja, fa). RTL support for Arabic, Urdu, Farsi. All language blocks have complete key parity with English. Home page fully internationalized with ~90 translation keys covering hero, features, stats, "What's New", secondary features, differentiators, free learning section, email capture, and CTAs. Other pages (lessons, flashcards, pricing, navigation) also use t() calls. New keys fall back to English when not yet translated for a language.
- **Tier Isolation**: Access is EXCLUSIVE not hierarchical. RPN users see only RPN content, RN sees only RN, NP sees only NP. Admin sees all. Free/unauthenticated users see all tabs.
- **CMS Templates**: Content editor supports quick-create templates for lessons, flashcard decks, exam questions, and clinical case studies.
- **SEO**: Comprehensive SEO implementation including sitemap.xml, robots.txt, and structured data. Domain: www.nursenest.ca.
- **Question of the Day (QOTD)**: Server-side daily question engine (`server/qotd-engine.ts`) with day-based rotation from 20 sample questions. SEO-optimized landing page at `/question-of-the-day` with email capture for subscribers. Database tables: `qotd_history`, `email_subscribers`.
- **Question Bank**: Standalone practice question page at `/question-bank` with tier/body-system filtering, instant rationale display, and progress tracking.
- **Social Media Scheduler**: Admin-managed social post scheduling for Facebook and Instagram via Meta Graph API. Meta OAuth connect flow for linking FB Page + IG Business account (stores long-lived page tokens in `social_connections` table). Publish Now button for instant posting. Admin UI tab with connection status, post creation, scheduling, and management. Cron endpoint protected by `SOCIAL_CRON_SECRET`. Database tables: `social_posts`, `social_connections`.
- **Flashcard Deck System**: Full Quizlet-style deck system with Learn/Test study modes. Users create decks with cards, CSV bulk import, AI accuracy check. Public/private/unlisted visibility. Save/duplicate/report public decks. Free tier: 50 total cards, upgraded deck: 300 cards ($2.99 CAD Stripe checkout), premium: unlimited. Study sessions tracked in `study_sessions` table. Admin moderation for reported decks. Database tables: `flashcard_decks`, `deck_flashcards`, `study_sessions`, `deck_reports`, `saved_decks`. **Starter decks**: 6 free public decks auto-seeded on startup (Cardiac Medications, Electrolyte Imbalances, Infection Control & PPE, Vital Signs & Assessment, Diabetes Management, Maternal & Newborn Essentials) owned by 'system' user. **Shareable deck pages**: Each deck has a slug-based shareable URL at `/flashcards/deck/:slug` with full SEO (LearningResource structured data, breadcrumbs, OG tags), copy link button, and native share API support. Share/copy link bar also appears in the DeckView within the flashcards page.
- **Customizable Learning Dashboard**: User-facing dashboard at `/dashboard` with 9 draggable widget types (welcome, progress, recommended, recent_lessons, quick_links, exam_stats, study_streak, flashcard_review, clinical_tools). Users can reorder via drag-and-drop or up/down buttons, show/hide, add/remove widgets and save layout to database. Accessible from user dropdown menu. Full SEO (breadcrumbs, WebPage structured data, meta tags). Database table: `dashboard_widgets`.

### Pages Overview
- **Core Pages**: Home, Start Free, Anatomy, Lessons, Flashcards, Med Math, Lab Values, Reports, Pricing.
- **User Management**: Login, Profile.
- **Admin Tools**: Admin Dashboard, Content Editor.
- **Dynamic Content**: `/learn/:slug`, `/clinical-clarity`, `/clinical-clarity/:slug`, `/blog`.
- **Practice & Assessment**: `/question-of-the-day` (QOTD with email capture), `/question-bank` (filterable practice questions).
- **Legal/Informational**: FAQ, Terms of Use, Privacy Policy, Disclaimer, Subscription Success.

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL.
- **Schema**: `shared/schema.ts` for `users`, `notes`, `test_results`, `user_progress`, `content_items`, `user_flashcards`, `blog_config`, `feature_usage`, `lesson_overrides`, `mock_exam_attempts`, `qotd_history`, `email_subscribers`, `social_posts`.
- **Validation**: Zod schemas generated from Drizzle.

### Content Architecture
- Lesson content is organized as TypeScript modules in `client/src/data/lessons/` by body system, covering over 35 diverse modules including reproductive health (reproductive.ts, reproductive-rpn.ts, reproductive-np.ts).
- Lessons page has 4 tabs: RPN/LVN, RN, NP, Pharmacology. Fundamentals and Delegation content merged into each tier tab.
- Pharmacology lessons collected from all tiers into a separate tab with tier sub-sections.
- Flashcard system supports bookmarking (flagged for review) and mastery tracking via localStorage.
- Type definitions in `client/src/data/lessons/types.ts` support pre/post-test questions.

## External Dependencies

### Database
- **PostgreSQL**: Accessed via `DATABASE_URL`.
- **Drizzle ORM**: Used for database interactions.
- **Stripe schema**: `stripe.products`, `stripe.prices`, `stripe.subscriptions` tables.

### Key npm Dependencies
- **UI**: shadcn/ui, Radix UI primitives, Lucide icons.
- **Forms**: `react-hook-form`, `@hookform/resolvers`, Zod.
- **Dates**: `date-fns`.
- **Payments**: Stripe SDK, @paypal/paypal-server-sdk.

### Interactive Learning Data Modules
- `client/src/data/clinical-confusions.ts`: Clinical Clarity topics.
- `client/src/data/clinical-cases.ts`: Clinical case simulations.
- `client/src/data/medications.ts`: Medication profiles.

### Reusable Components
- `client/src/components/content-gate.tsx`: For content visibility and cross-linking.
- `client/src/components/engagement.tsx`: Interactive learning elements.

### Site Analytics & Feedback System
- **Page View Tracker**: `client/src/hooks/use-page-tracker.ts` - auto-tracks page views, session ID, duration, device/browser/OS, referrer, UTM params, pricing views, checkout intents. Uses `navigator.sendBeacon` for reliable duration tracking on page unload.
- **Analytics API**: `GET /api/admin/site-analytics?days=30` returns comprehensive metrics (total views, unique sessions, avg duration, top pages/referrers, device/browser/OS breakdowns, UTM sources, daily views, conversion rate).
- **Feedback System**: User-facing page at `/feedback` for submitting feedback, feature requests, bug reports, and questions with category tagging and upvoting. Admin manages feedback via Feedback tab in admin dashboard with status/priority controls.
- **Admin Dashboard Tabs**: "Site Analytics" and "Feedback" tabs added to `/admin` for reviewing site traffic data and managing user feedback.
- **Database Tables**: `page_views` and `user_feedback` in `shared/schema.ts`.