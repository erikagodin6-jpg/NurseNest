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
- **Frontend Build**: Vite with React plugin
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
- **Admin Features**: Dashboard (`/admin`) for user analytics, subscriptions, activity, content popularity, and blog automation controls.
- **Admin Preview Mode**: Admin users can preview the platform as free/rpn/rn/np users via dropdown in navigation.
- **Inline Lesson Editing**: Admin users can edit lesson content directly on lesson detail pages without navigating to a separate editor. Edits are stored as JSON overrides in `lesson_overrides` table and merged with static TypeScript lesson data at render time. Supports editing all sections: pathophysiology, risk factors, diagnostics, management, nursing actions, lifespan, clinical findings, medications, and exam pearls.
- **Blog Automation**: OpenAI-powered blog post generation with APA7/MLA citation support, auto-scheduler (2x/day for 120 days, then 1x/day for 100 days), admin controls in dashboard.
- **Custom Flashcards**: Users can create, edit, delete, and study their own flashcards stored in PostgreSQL (`user_flashcards` table). Accessible from profile page with flip-card study mode.
- **Tier Isolation**: Access is EXCLUSIVE not hierarchical. RPN users see only RPN content, RN sees only RN, NP sees only NP. Admin sees all. Free/unauthenticated users see all tabs.
- **CMS Templates**: Content editor supports quick-create templates for lessons, flashcard decks, exam questions, and clinical case studies.
- **SEO**: Comprehensive SEO implementation including sitemap.xml, robots.txt, and structured data.

### Pages Overview
- **Core Pages**: Home, Start Free, Anatomy, Lessons, Flashcards, Med Math, Lab Values, Reports, Pricing.
- **User Management**: Login, Profile.
- **Admin Tools**: Admin Dashboard, Content Editor.
- **Dynamic Content**: `/learn/:slug`, `/clinical-clarity`, `/clinical-clarity/:slug`, `/blog`.
- **Legal/Informational**: FAQ, Terms of Use, Privacy Policy, Disclaimer, Subscription Success.

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL.
- **Schema**: `shared/schema.ts` for `users`, `notes`, `test_results`, `user_progress`, `content_items`, `user_flashcards`, `blog_config`, `feature_usage`, `lesson_overrides`.
- **Validation**: Zod schemas generated from Drizzle.

### Content Architecture
- Lesson content is organized as TypeScript modules in `client/src/data/lessons/` by body system, covering over 32 diverse modules.
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