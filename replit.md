# NurseNest - Complete Nursing Learning Platform

## Overview

NurseNest is an interactive nursing education platform designed for RPN/LVN, RN, and NP students. It provides comprehensive learning resources, including lessons, flashcards, performance analytics, and exam preparation for NCLEX/REX-PN. The platform supports both US and Canadian nursing standards, with a strong focus on clinical pathophysiology, medication safety, and condition recognition. Its core purpose is to serve as a complete educational tool for current and aspiring nurses, enhancing their knowledge and clinical reasoning skills.

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
- **Content Engine**: Admin-only editor for structured content, dynamic SEO-optimized pages. Inline lesson editing for admin users.
- **Subscription System**: Multiple tiers (Free, RPN/LVN, RN/NCLEX, NP Advanced) with regional pricing.
- **Interactive Labs**: Med Math & Clinical Calculations, Abnormal Lab Interpretation, Clinical Clarity, Clinical Case Simulation, and Medication Mastery Engine.
- **Interactive Clinical Simulators**: Six modules covering First Action Prioritization, Safety & Hazard Detection, IV Complications, Electrolyte & ABG Interpretation, Deteriorating Patient, and Blood Transfusion.
- **Unit Conversion**: Centralized system for CA metric / US imperial switching.
- **Mock Exam Engine**: Timed exams with configurable parameters, question flagging, auto-save, and detailed post-exam reports. Features stratified random sampling from a question pool.
- **Admin Features**: Dashboard for analytics, subscriptions, activity, and a unified Content Engine tab. Admin page layout is locked. Admin preview mode allows viewing as different user tiers.
- **Blog Automation**: OpenAI-powered blog post generation with scholarly source requirements, APA7/MLA citation support, and scheduled publishing.
- **Custom Flashcards**: Users can create, edit, and study personal flashcards, including CSV import and AI accuracy checks. Supports public/private/unlisted visibility, and features starter decks and shareable deck pages.
- **Internationalization (i18n)**: Custom system supporting 15 languages (including RTL), with fallback to English. UI chrome is fully translated, while educational content remains in English.
- **Tier Isolation**: Access is exclusive per tier (RPN, RN, NP); free users see all tabs.
- **CMS Templates**: Quick-create templates for various content types.
- **SEO**: Comprehensive implementation including sitemap.xml, robots.txt, and structured data.
- **Question of the Day (QOTD)**: Server-side engine for daily questions with an SEO-optimized landing page.
- **Question Bank**: Filterable practice questions with instant rationale and progress tracking.
- **Social Media Scheduler**: Admin-managed scheduling for Facebook and Instagram via Meta Graph API.
- **Customizable Learning Dashboard**: User-facing dashboard with draggable, configurable widgets for personalized learning.

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL.
- **Schema**: Defined in `shared/schema.ts` for various entities like users, notes, progress, content items, and user-generated content.
- **Validation**: Zod schemas generated from Drizzle.

### Content Architecture
- Lesson content is organized into TypeScript modules by body system, supporting pre/post-test questions.
- Lessons are categorized into RPN/LVN, RN, NP, and Pharmacology tabs.
- Flashcard system includes bookmarking and mastery tracking.

## External Dependencies

### Database
- **PostgreSQL**: Primary database.
- **Drizzle ORM**: Used for database interactions.
- **Stripe**: Schema includes `stripe.products`, `stripe.prices`, `stripe.subscriptions` tables.

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
- **Page View Tracker**: Custom hook `use-page-tracker.ts` for comprehensive analytics.
- **Analytics API**: Provides site metrics for admin dashboard.
- **Feedback System**: User-facing page and admin management for feedback, feature requests, and bug reports.
- **Meta Graph API**: Used for social media scheduling (Facebook, Instagram).
- **OpenAI**: Powers blog post generation.