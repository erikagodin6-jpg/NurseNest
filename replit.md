# NurseNest - Complete Nursing Learning Platform

## Overview
NurseNest is an adaptive learning platform for nursing and allied health students across 17 career verticals. It provides comprehensive learning resources, advanced exam preparation (e.g., NCLEX, REX-PN), and performance analytics. The platform utilizes AI for content generation to develop clinical reasoning, nursing knowledge, and critical thinking, with the goal of improving patient care outcomes through a region-aware and adaptive learning environment. NurseNest aims to be a market-leading, complete learning solution.

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
The platform features a modern React UI (TypeScript, Wouter, shadcn/ui, Tailwind CSS v4) and an Express 5 backend on Node.js (TypeScript). Vite is used for tooling, and TanStack React Query manages server state via a RESTful API. The UI/UX includes 20 themes, DM Sans typography, premium visuals, and interactive components. A Canva-style digital product builder with AI-powered content generation is integrated.

Core technical implementations include a database-driven subscription model with regional pricing (CAD/USD), tier-based plans (rpn, rn, np, allied), lifetime one-time purchases via Stripe, and free trial usage caps. The pricing architecture uses a `pricing_plans` DB table with 20 seeded plans. Interactive learning modules, a mock exam engine with stratified random sampling, and an admin dashboard are central features. AI integrations power blog automation, an Adaptive CAT Engine, Pass Probability Projection, and a Next Best Action Engine. Exam blueprints are database-driven, and content is organized by body system, supporting NGN question types, partial credit scoring, and a Spaced Repetition System. Content access is managed by user tier.

Key systems include:
- **Flashcards & Test Bank**: Public Flashcards page (`/flashcards`) with Quizlet-style topic browsing and quick study mode. Tier-specific Test Bank pages (`/rpn/test-bank`, `/rn/test-bank`, `/np/test-bank`, `/{profession}/test-bank`) wrap the Flashcards component with `isTestBank=true` prop for exam-style practice. Legacy `/{profession}/flashcards` routes 302-redirect to test-bank equivalents.
- **Learning Content Systems**: Question Bank, Adaptive Flashcard System, Clinical Vignette Generation Engine, Allied Health Encyclopedia, SEO Lesson Engine, and specialized lesson libraries.
- **Adaptive Learning & Coaching**: Adaptive Learning Engine (v2) for granular progress tracking and spaced repetition. An AI Study Coaching & Course Generation System provides personalized study plans.
- **Exam & Practice Engines**: Mock exam engine with separated CAT Exam (adaptive 85–150 questions with blueprint-aware stopping rules, domain coverage tracking, pass/fail result) and Practice Exam (customizable builder with question count, topics, strict mode) modes. Post-completion review mode shows rationale, clinical pearls, and exam strategies with correct/incorrect indicators and flagged-only filtering. Full session persistence (catState, timerState) to server for resume support. Premium Study Engine for custom practice sessions, and adaptive practice/mastery systems for various allied health professions.
- **AI-Powered Generation & Safety**: AI content generation is manual and admin-triggered via the AI Jobs system, with extensive budget caps, concurrency controls, duplicate protection, and a kill switch. A `ContentQualityGate` service enforces 10 quality rules for all AI-generated content.
- **AI Provider Router & Cost Control Engine**: Centralized AI request routing through pluggable providers (OpenAI, Ollama, vLLM, LM Studio, Anthropic) with built-in cost tracking, rate limiting, and health checks.
- **SEO & Marketing Infrastructure**: Programmatic SEO Engines, NCLEX Question Preview Pages, Multilingual SEO & Translation System, Database-Driven Multi-Domain Sitemap Architecture, and various content hubs (e.g., Allied Health Content Hub).
- **Public Marketing & Conversion Proof System**: Dynamic trust counters and conversion-focused proof blocks display live platform statistics.
- **Analytics & Admin**: Content Analytics Engine and Admin Dashboard provide real-time production data and ROI insights.
- **Offline Capabilities**: An IndexedDB-based Offline Study System for question packs and flashcards.
- **Multi-Profession Framework**: Dynamic system for configuring new healthcare professions with a Universal Question Bank Importer.
- **Production Database Safety**: `EnvironmentAwareContentWriteService` enforces preflight checks, post-write verification, and audit logging.
- **Data Management**: PostgreSQL with Drizzle ORM.
- **Free 1-Day Pass System**: Every new account automatically receives a free 1-day pass. No paid trials. Server-side trial entitlement with fraud detection and audit logging. `FreePassUpgradePrompt` component for upgrade prompts when limits are reached.
- **Central Pricing Config**: `shared/pricing-config.ts` contains tier metadata, duration labels, social proof stats, feature comparison data, and study timeline guidance. Pricing values are authoritative from DB via `/api/pricing/plans`.
- **Pricing Page Architecture**: Modern SaaS-style layout with hero section, social proof metrics, tier selection grid (RPN/RN/NP), feature comparison table, study timeline guidance, trust signals. 6-month plan highlighted as "Most Popular". CTA buttons use "Unlock Full Access" for paid plans and "Start Free" for free tier.
- **Business Health & Subscriber Dashboard**: Admin page for financial summaries (revenue, expenses, break-even), subscriber metrics (total, active, conversion rates), and purchase metrics. Uses a `business_expenses` table for manual entries and integrates AI generation costs.

## Asset Storage
- **Object Storage**: All images (PNG/JPG/WebP/SVG) and media (MP4) are stored in Replit Object Storage bucket `replit-objstore-482be09b-b392-43d4-9116-a0189fbcd2e6` under the `public/` prefix.
- **Asset URLs**: Use `getAssetUrl(filename)` from `client/src/lib/asset-url.ts` which returns `/api/assets/{filename}`. The Express route at `GET /api/assets/:filename` streams files from object storage with immutable caching headers.
- **Upload Script**: `scripts/upload-from-list.ts` uploads referenced assets to object storage. `scripts/upload-assets.ts` uploads all assets from source directories.
- **Migration**: ES module `import` statements for images were replaced with `getAssetUrl()` calls. String paths like `/attached_assets/...` and `/videos/...` were also migrated.

## Stripe Integration
- **Credential Resolution**: `server/stripeClient.ts` resolves Stripe keys via: (1) Replit connector API (environment-aware: development/production), then (2) env vars (`STRIPE_SECRET_KEY` + `STRIPE_PUBLISHABLE_KEY`). Production validates keys are live (sk_live_/pk_live_).
- **Price Maps**: `stripe-price-map.json` (test mode, 24 prices), `stripe-price-map-live.json` (live mode, created when live prices are synced). Falls back to inline `price_data` if no matching map exists.
- **Checkout Flow**: `/api/stripe/create-checkout` in `server/routes.ts`. Uses `getUncachableStripeClient()` for all Stripe API calls. Supports subscription (monthly/3-month/6-month/yearly), lifetime one-time, and add-on purchases.
- **Webhook**: Managed webhook via `stripe-replit-sync`, raw body parsing before `express.json()`.
- **Required Secrets**: `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`.

## Entitlement System
- **Server-side source of truth**: `server/entitlements.ts` — All premium access decisions on the server go through this module. Provides `requireEntitlement(feature)` middleware, `requireAnyPremium()` middleware, `checkEntitlement(user, feature)`, and `getUserEntitlements(user)`.
- **Client-side source of truth**: `client/src/lib/entitlements.ts` — Frontend access checks (UX-only, not a security boundary).
- **Admin diagnostic endpoint**: `GET /api/admin/entitlement-debug` — Returns user role, subscription tier, tester/trial status, and full computed entitlements map. Supports `?userId=` to inspect other users.
- **Test coverage**: `server/__tests__/entitlements.test.ts` — Unit tests for free/paid/admin/tester access scenarios.
- **Audit summary**: `ENTITLEMENT_AUDIT.md` — Documents hardened routes, remaining risk areas, and out-of-scope systems (imaging monetization).
- **Note**: Imaging monetization (`server/imaging-monetization-routes.ts`) uses a separate entitlement model and is intentionally not under this system.

## External Dependencies
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Payment Processing**: Stripe (for subscriptions and one-time purchases), PayPal SDK
- **AI/Content Generation**: Centralized AI Provider Router (supports OpenAI, Ollama, vLLM, LM Studio, Anthropic)
- **Social Media**: Meta Graph API
- **Object Storage**: Replit Object Storage (Google Cloud Storage via sidecar)
