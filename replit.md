# NurseNest - Complete Nursing Learning Platform

## Overview

NurseNest is a nursing education platform targeting RPN/LVN, RN, and NP students. It provides interactive lessons organized by body system (cardiovascular, respiratory, neurological, etc.), flashcards with quiz-style questions, and performance analytics/reports. The platform supports both US and Canadian nursing standards with a region toggle. Content covers clinical pathophysiology, medication safety, NCLEX/REX-PN exam preparation, and condition recognition patterns.

The app is a full-stack TypeScript monorepo with a React frontend, Express backend, and PostgreSQL database using Drizzle ORM. Content (lessons, flashcards) is organized as TypeScript data modules in `client/src/data/lessons/`. The storage layer uses `DatabaseStorage` backed by PostgreSQL via Drizzle.

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

### Frontend Architecture
- **Framework**: React with TypeScript (no RSC/server components)
- **Routing**: Wouter (lightweight client-side router)
- **State Management**: TanStack React Query for server state, React useState for local state
- **UI Components**: shadcn/ui (new-york style) with Radix UI primitives
- **Styling**: Tailwind CSS v4 with `@tailwindcss/vite` plugin, CSS custom properties for theming
- **Theming**: `next-themes` library with `data-theme` attribute. Supports themes: lavender (default), mint, blush, slate, midnight, ocean, forest
- **Font**: DM Sans from Google Fonts
- **Build Tool**: Vite with React plugin
- **Path Aliases**: `@/` → `client/src/`, `@shared/` → `shared/`, `@assets/` → `attached_assets/`

### Pages
- `/` - Home (marketing/landing page with CTAs linking to /start-free)
- `/start-free` - Conversion-focused landing page with content previews, pain points, value propositions
- `/anatomy` - Free Anatomy & Physiology content (10 body systems)
- `/lessons` - Lesson catalog organized by body system with tabs for RPN and RN tracks
- `/lessons/:id` - Individual lesson detail with pathophysiology, medications, clinical pearls, pre/post tests
- `/flashcards` - Interactive flashcard system with question and term card types, bookmarking, scoring
- `/med-math` - Med Math & Clinical Calculations Lab (dosage, IV flow rate, weight-based, infusion, pediatric calculations with unlimited randomized problems and stepwise solutions)
- `/lab-values` - Abnormal Lab Interpretation Engine (12 clinical scenarios across 6 categories with cluster-based lab presentation, mechanism explanations, quiz challenges)
- `/reports` - Performance analytics dashboard (proficiency by body system, study recommendations)
- `/pricing` - Subscription plans with CAD/USD toggle, monthly/3-month/6-month/yearly options, trial passes, Stripe + PayPal payment options
- `/login` - Authentication page (login/register)
- `/profile` - User profile with subscription management
- `/admin` - Admin dashboard (admin-only) with user analytics, subscriptions, activity tracking
- `/content-editor` - Content Engine admin editor (admin-only) for creating structured content with block editor, tagging, SEO fields, preview
- `/learn/:slug` - Dynamic SEO-optimized content pages rendered from Content Engine items with structured data
- `/clinical-clarity` - Clinical Clarity index page with search, category/system filtering, difficulty badges, topic cards (15 "Why does X happen?" topics)
- `/clinical-clarity/:slug` - Clinical Clarity detail pages with mechanism chains, misconception corrections, clinical relevance, pause-and-think prompts, related lesson links, full SEO (FAQPage, Article, BreadcrumbList)
- `/case-simulations` - Clinical Case Simulation Platform with branching decision engine, progressive disclosure of vitals/labs, consequence explanations, debriefing (3 seed cases: sepsis, MI, DKA)
- `/medication-mastery` - Medication Mastery Engine: mechanism-first drug explorer with receptor/pathway effects, side effect reasoning, drug interactions, nursing considerations (8 seed medications)
- `/faq` - Frequently asked questions with legally-safe content
- `/terms` - Terms of Use (comprehensive legal page)
- `/privacy` - Privacy Policy
- `/disclaimer` - Educational Disclaimer
- `/subscription/success` - Post-checkout success page

### Backend Architecture
- **Framework**: Express 5 on Node.js with TypeScript (tsx for dev, esbuild for production)
- **API Pattern**: RESTful API with `/api` prefix (routes defined in `server/routes.ts`)
- **Server Entry**: `server/index.ts` creates HTTP server, registers routes, sets up Vite dev middleware or serves static files
- **Admin API**: POST `/api/admin/analytics` requires username/password authentication and admin tier verification
- **Stripe Integration**: Checkout sessions, billing portal, subscription management via `server/stripeClient.ts`
- **PayPal Integration**: PayPal Web SDK via `server/paypal.ts`, optional payment method alongside Stripe (requires PAYPAL_CLIENT_ID/PAYPAL_CLIENT_SECRET)
- **Content Engine API**: CRUD endpoints for content items (`/api/content`), admin-authenticated writes, public reads limited to published content

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` - shared between client and server
- **Tables**: `users` (with tier/subscription/stripe fields), `notes`, `test_results`, `user_progress`, `content_items` (Content Engine)
- **Storage Interface**: `server/storage.ts` with `DatabaseStorage` implementation using Drizzle
- **Admin Methods**: `getAllUsers()` (excludes passwords), `getAllTestResults()`, `getAllProgress()`, `getAllNotes()`
- **Validation**: Zod schemas generated from Drizzle schema via `drizzle-zod`

### Content Architecture
- Lesson content organized in `client/src/data/lessons/` as TypeScript modules per body system
- 25+ lesson module files covering: cardiovascular, respiratory, neurological, GI, renal, endocrine, hematology, pediatrics, neonatal, maternity, procedures, pharmacology, skin infections, assessment, infection control, advanced NP, emergency, mental health, orthopedic, oncology, OB medications, pediatric infections, poisoning, eye/ear, GI advanced
- Type definitions in `client/src/data/lessons/types.ts` with support for preTest/postTest question arrays
- Content follows Master Prompt Template standards with cellular/molecular depth

### Subscription System
- **Tiers**: Free, RPN/LVN ($29.99 CAD/mo), RN/NCLEX ($39.99 CAD/mo), NP Advanced ($49.99 CAD/mo), Admin
- **Duration options**: Monthly, 3-month (10% savings), 6-month (15% savings), Yearly (20% savings)
- **Trial passes**: 1-day ($4.99 CAD), 3-day ($9.99 CAD) - single use, limited access
- **Region pricing**: CAD for CA region, USD for US region
- **Stripe**: Checkout sessions for payment, billing portal for management
- **Admin bypass**: tier="admin" gets full content access

### Authentication
- Simple username/password auth stored in PostgreSQL
- Session stored in localStorage (`nursenest-user`, `nursenest-credentials`)
- Admin authentication via POST with credential verification server-side

### Build System
- **Dev**: `npm run dev` runs tsx to start Express with Vite middleware
- **Build**: `npm run build` runs `script/build.ts` which builds client with Vite and server with esbuild
- **Production**: `npm start` runs the bundled `dist/index.cjs`

## External Dependencies

### Database
- **PostgreSQL** via `DATABASE_URL` environment variable
- **Drizzle ORM** for query building and schema management
- **Stripe schema**: `stripe.products`, `stripe.prices`, `stripe.subscriptions` tables

### Key npm Dependencies
- **UI**: Full shadcn/ui component library with Radix UI primitives, Lucide icons
- **Forms**: `react-hook-form` with `@hookform/resolvers` and Zod validation
- **Dates**: `date-fns`
- **Payments**: Stripe SDK, @paypal/paypal-server-sdk

### Interactive Learning Data Modules
- `client/src/data/clinical-confusions.ts` - 15 Clinical Clarity topics with mechanism chains, misconceptions, clinical relevance
- `client/src/data/clinical-cases.ts` - 3 clinical case simulations with branching decisions, vitals, labs, debriefing
- `client/src/data/medications.ts` - 8 medication profiles with receptor-level MOA, side effect mechanisms, interactions

### Reusable Components
- `client/src/components/content-gate.tsx` - ContentGate (free/preview/premium visibility), InternalLinkCard, CrossLinkBanner for content gating and cross-linking
- `client/src/components/engagement.tsx` - PauseAndThink, ProgressiveDisclosure, CuriosityHook, KnowledgeCheck interactive engagement components

## Recent Changes
- Added daily usage limits (10 questions/day free) for Lab Interpretation and Med Math with paywall + add-on subscriptions ($9.99/mo each or $14.99/mo bundle)
- feature_usage table tracks per-user per-feature daily question counts; full subscribers and admins get unlimited access
- Built Clinical Clarity system: 15 "Why does X happen?" topics with mechanism chains, misconceptions, clinical relevance, full SEO
- Built Clinical Case Simulation Platform: 3 branching decision cases (sepsis, MI, DKA) with vitals, labs, consequence explanations, debriefing
- Built Medication Mastery Engine: 8 medications with receptor-level MOA, side effect reasoning, drug interactions, nursing considerations
- Built Content Visibility Engine: ContentGate, InternalLinkCard, CrossLinkBanner components for content gating and cross-linking
- Built engagement mechanics: PauseAndThink, ProgressiveDisclosure, CuriosityHook, KnowledgeCheck reusable components
- Added Clinical Clarity, Case Simulations, and Medication Mastery to desktop/mobile navigation
- Built Med Math & Clinical Calculations Lab with 5 categories (50 problem templates), stepwise solutions, safety alerts
- Built Abnormal Lab Interpretation Engine with 12 clinical scenarios across 6 categories, cluster-based presentation, mechanism explanations
- Added PayPal payment integration alongside Stripe (server SDK, API routes, pricing page UI)
- Implemented milestone-based upgrade prompts with cognitive-progression framing (tracks lesson views, test scores, study streaks)
- Built Content Engine: schema, CRUD API, admin editor at /content-editor with block editor, tagging, SEO, preview
- Built SEO page generator at /learn/:slug with structured data, breadcrumbs, related content
- Added Med Math and Lab Interpretation links to desktop/mobile navigation
- Content API endpoints secured: public reads limited to published content, draft/review content requires admin auth
- Added admin dashboard at /admin with user analytics, subscription distribution, activity tracking, content popularity
- Created Start for Free landing page with conversion-focused copy, pain points, value propositions, content previews
- Added Terms of Use, Privacy Policy, Educational Disclaimer pages
- Implemented comprehensive SEO: sitemap.xml, robots.txt, structured data (LearningResource, FAQPage, CollectionPage, BreadcrumbList)
- Added Educational Integrity statement component across platform
- Added admin link in navigation (desktop + mobile) visible only to admin users
