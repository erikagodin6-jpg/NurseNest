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
- **Content Engine**: Admin-only editor for structured content, dynamic SEO-optimized pages. Inline lesson editing for admin users on lesson-detail, anatomy, and pre-nursing pages. Admin lesson creator template for uncreated lessons (shows instead of "Lesson Not Found" for admins) with AI content generation and SEO metadata generation. Anatomy page: admin can edit system name, description, and content paragraphs per body system with AI generation (`anatomy-{systemId}` override keys). Pre-nursing page: admin can edit module title/description overrides and add supplemental content paragraphs with AI generation (`prenursing-{moduleId}` override keys). All overrides stored via `/api/lesson-overrides/:id` endpoint. **Admin Custom Modules**: Admin can create new modules/systems on pre-nursing and lessons pages with matching UI structure — stored in `custom_page_modules` table via `/api/custom-modules` endpoints. Each module has title, description, icon, color, image, lessons list, and content paragraphs. **Admin Image Management**: Site-wide image override system — `site_images` table stores `imageKey → url` mappings. `AdminImageOverlay` component wraps images, showing a camera icon on hover for admins. Admins can upload replacement images via object storage or paste URLs. `SiteImagesProvider` context provides `getImageUrl(key, default)` globally. Pre-nursing module card images use key `prenursing-module-{id}`, lesson system card images use `lesson-system-{id}`.
- **Subscription System**: Multiple tiers (Free, RPN/LVN, RN/NCLEX, NP Advanced) with regional pricing.
- **Interactive Labs**: Med Math & Clinical Calculations, Abnormal Lab Interpretation, Clinical Clarity, Clinical Case Simulation, and Medication Mastery Engine.
- **Interactive Clinical Simulators**: Six modules covering First Action Prioritization, Safety & Hazard Detection, IV Complications, Electrolyte & ABG Interpretation, Deteriorating Patient, and Blood Transfusion.
- **Region-Aware Content**: Server-side hostname-based region detection (`server/region.ts`). Content items have `region_scope` field (BOTH, US_ONLY, CA_ONLY). All public content endpoints filter by region. AI content generation is region-aware (uses appropriate terminology/units). Region constants in `shared/constants/` with CA/US exam names and lab values. Protected fields validation blocks AI from modifying exam names/lab values on protected content. RPN/RN content region scope is locked to domain region and cannot be changed after publishing. Admin can create CA/US variants of content using version_key linking. Client pages (home, pricing, navigation) use centralized `shared/constants` for region-specific exam names and designations.
- **Unit Conversion**: Centralized system for CA metric / US imperial switching.
- **Mock Exam Engine**: Timed exams with configurable parameters, question flagging, auto-save, and detailed post-exam reports. Features stratified random sampling from a question pool.
- **Admin Features**: Dashboard for analytics, subscriptions, activity, and a unified Content Engine tab. Admin page layout is locked. Admin preview mode allows viewing as different user tiers.
- **Blog Automation**: OpenAI-powered blog post generation with scholarly source requirements, APA7/MLA citation support, and scheduled publishing.
- **Custom Flashcards**: Users can create, edit, and study personal flashcards, including CSV import and AI accuracy checks. Supports public/private/unlisted visibility, and features starter decks and shareable deck pages.
- **Internationalization (i18n)**: Custom system supporting 15 languages (including RTL), with fallback to English. UI chrome is fully translated, while educational content remains in English.
- **Tier Isolation**: Access is exclusive per tier (RPN, RN, NP); free users see all tabs.
- **CMS Templates**: Quick-create templates for various content types.
- **SEO**: Per-route meta tags injected via Vite `transformIndexHtml` hook in `vite-plugin-meta-images.ts` (calls `injectMeta` from `server/seo-meta.ts`). Includes sitemap.xml, robots.txt, structured data (JSON-LD), and noscript fallback content for crawlers.
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
- **Pre-Nursing Foundations Program**: 16 interactive modules (cell biology, physiology, terminology, pharmacology intro, pathophysiology intro, science foundations, anatomy & physiology, research & statistics, medical terminology, chemistry, microbiology, infection control, fluids & electrolytes, healthcare communication, ethics & legal, study strategies). Data files in `client/src/data/pre-nursing-*.tsx`, rendered in `client/src/pages/pre-nursing.tsx`.
- **CMS Content Integration**: DB-stored lessons (`/api/content/lessons`) appear on the Lessons page as "Additional Lessons" section. Lesson-detail page falls back to DB content when no static content exists. Flashcards page fetches DB flashcard sets from `/api/content/flashcard-sets`.

## Vite Dev Server & SEO — Critical Invariants

### Root Cause (Blank Screen Fix)
Global `res.write`/`res.end` wrapping in Express (the SEO meta interceptor) interfered with Vite's streamed module responses. `/@vite/client` and `/src/*.tsx` were returned as corrupted HTML instead of JS modules, causing every React component import to fail silently.

### Fix
- Removed the global response-wrapping SEO interceptor from `server/index.ts`.
- Moved SEO meta injection into `vite-plugin-meta-images.ts` using Vite's `transformIndexHtml` hook, which only touches HTML responses.
- `main.tsx` uses clean static imports only (no dynamic `import()` wrappers).

### Invariant Rules (DO NOT VIOLATE)
1. **Never intercept/wrap responses** for `/@*`, `/src/*`, `/.vite/*`, `/node_modules/*`, `/vite-hmr`, `/__vite_ping` in dev.
2. **Never globally wrap `res.write`/`res.end`** — this breaks Vite module streaming.
3. In dev, **SEO/meta injection must be HTML-only** via `transformIndexHtml` (string transform, no response monkey-patching).
4. `/@vite/client` must always return `200 text/javascript` — never served by Express SPA fallback.
5. `main.tsx` must use **static imports only** — no dynamic `import("./App")` wrappers.

### Health Check (run if blank screen returns)
- `GET /@vite/client` → should be `200 text/javascript`
- `GET /src/App.tsx` → should be `200 text/javascript` (module)
- If either returns HTML, check middleware ordering or response-wrapping code in `server/index.ts`.
- If "Failed to fetch dynamically imported module" errors appear in console, a middleware is intercepting Vite paths.

### Production SEO
- `transformIndexHtml` runs during dev and at build time, but NOT at runtime in production (Vite is not running).
- Production serves static `dist/` files via Express (`server/static.ts`).
- If per-route dynamic meta is needed in production, add an Express HTML injection step that runs ONLY on HTML navigations with guards: `Accept: text/html` + `Sec-Fetch-Dest: document`, and NEVER wraps module/static file responses.

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