# NurseNest - Complete Nursing Learning Platform

## Overview

NurseNest is an interactive nursing education platform for RPN/LVN, RN, and NP students, offering comprehensive learning resources like lessons, flashcards, performance analytics, and NCLEX/REX-PN exam preparation. It supports both US and Canadian nursing standards, focusing on clinical pathophysiology, medication safety, and condition recognition to enhance nurses' knowledge and clinical reasoning.

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
- **Framework & Routing**: React with TypeScript, Wouter for client-side routing.
- **UI Components**: shadcn/ui with Radix UI primitives.
- **Styling**: Tailwind CSS v4, CSS custom properties, and `next-themes` for 20 distinct themes.
- **Typography**: DM Sans from Google Fonts.
- **Content Engagement**: `ContentGate` for access control, and interactive components like `PauseAndThink`, `ProgressiveDisclosure`, `CuriosityHook`, `KnowledgeCheck`.

### Technical Implementations
- **Frontend Build**: Vite with React plugin, route-based code splitting.
- **State Management**: TanStack React Query for server state, React useState for local state.
- **Backend**: Express 5 on Node.js with TypeScript, featuring gzip compression and robust security headers.
- **API Pattern**: RESTful API using `/api` prefix.
- **Authentication**: Username/password, session management in localStorage, server-side admin verification.
- **Content Engine**: Admin-only editor for structured content, dynamic SEO-optimized pages. Supports inline lesson editing, template-based lesson creation with AI content generation and SEO metadata. Admin can manage pre-nursing modules and anatomy content with AI assistance and site-wide image overrides.
- **Lesson Publish Flow**: Admins can publish lessons directly, with immediate view of published content and a dedicated "Edit Lesson" mode.
- **Subscription System**: Multiple tiers (Free, RPN/LVN, RN/NCLEX, NP Advanced) with regional pricing.
- **Interactive Learning**: Includes Med Math, Clinical Calculations, Abnormal Lab Interpretation, Clinical Clarity, Clinical Case Simulation, Medication Mastery Engine, and six interactive clinical simulators.
- **Region-Aware Content**: Server-side hostname-based region detection. Content is filtered by `region_scope` (BOTH, US_ONLY, CA_ONLY). AI content generation is region-aware.
- **Unit Conversion**: Centralized system for CA metric / US imperial switching.
- **Mock Exam Engine**: Timed exams with configurable parameters, question flagging, auto-save, detailed reports, and stratified random sampling.
- **Admin Features**: Dashboard for analytics, subscriptions, activity, and a unified Content Engine. Admin preview mode allows viewing as different user tiers.
- **Blog Automation**: OpenAI-powered blog post generation with scholarly sources and scheduled publishing.
- **Custom Flashcards**: Users can create, edit, and study personal flashcards, with CSV import and AI accuracy checks. Features AI Flashcard Generator.
- **Internationalization (i18n)**: Custom system supporting 15 languages, with full UI translation for French and Spanish.
- **Tier Isolation**: Access is exclusive per tier (RPN, RN, NP), while free users see all tabs.
- **SEO**: Per-route meta tags injected via Vite `transformIndexHtml` hook, sitemap.xml, robots.txt, structured data (JSON-LD).
- **Question of the Day (QOTD)**: Server-side engine for daily questions with an SEO-optimized landing page.
- **Question Bank**: Filterable practice questions with instant rationale and progress tracking.
- **Customizable Learning Dashboard**: User-facing dashboard with draggable, configurable widgets.
- **Exam Date Study Plan Engine**: Backward planning algorithm generates personalized study schedules based on exam date, type, and readiness.
- **Study Workload Calculator**: Dashboard widget showing remaining questions ÷ daily target = projected completion date relative to exam. Displays pace message ("At your current pace, you will complete preparation X days before your exam"), progress bar, remaining/daily target/buffer day stats. Caches in localStorage for weekly recalculation. Backend: `GET /api/study-workload/:userId`.
- **Pass Probability Projection**: Logistic-scaled pass probability calculation based on readiness, question volume, and mock exam averages.
- **Public Diagnostic Exam**: 25-question free diagnostic exam with anonymous attempts and topic breakdowns for registered users.
- **Auscultation Audio Library**: Audio clip management with license enforcement and a quiz mode.

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL.
- **Schema**: Defined in `shared/schema.ts` for various entities.
- **Validation**: Zod schemas generated from Drizzle.

### Content Architecture
- Lesson content is organized into TypeScript modules by body system, supporting pre/post-test questions. 25 core lessons across cardiovascular (10), respiratory (8), and neurological (7) have been expanded to 2000+ words of detailed cellular pathophysiology content.
- Lessons are categorized into RPN/LVN, RN, NP, and Pharmacology tabs.
- Each lesson has 10 content sections: Pathophysiology, Risk Factors, Diagnostics, Management, Nursing Actions, Assessment Findings, Lifespan, Clinical Findings & Red Flags, Pharmacology, and Exam Readiness, all supporting inline admin editing with AI generation.
- Flashcard system includes bookmarking and mastery tracking.
- **Anatomy & Physiology**: Route-based navigation with detail pages for 12 body systems, supporting admin image/content editing.
- **Pre-Nursing Foundations Program**: 27 interactive modules covering foundational nursing science.
- **CMS Content Integration**: DB-stored lessons and flashcard sets are dynamically integrated into the platform.

### Vite Dev Server & SEO — Critical Invariants
- SEO meta injection occurs via Vite's `transformIndexHtml` hook, only affecting HTML responses.
- Critical invariant rules prevent global response wrapping in dev to ensure Vite module streaming functions correctly.

## External Dependencies

### Database
- **PostgreSQL**: Primary database.
- **Drizzle ORM**: Used for database interactions.
- **Stripe**: Integrated for subscription management with corresponding tables.

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
- **Analytics API**: Provides site metrics for admin dashboard.
- **Feedback System**: User-facing feedback and bug reporting.
- **Meta Graph API**: Used for social media scheduling (Facebook, Instagram).
- **OpenAI**: Powers blog post generation and AI flashcard/content generation.