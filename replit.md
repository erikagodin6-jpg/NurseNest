# NurseNest - Complete Nursing Learning Platform

## Overview

NurseNest is an interactive learning platform for RPN/LVN, RN, and NP students, offering comprehensive resources like lessons, flashcards, performance analytics, and exam preparation for NCLEX and REX-PN. It supports both US and Canadian nursing standards, focusing on clinical pathophysiology, medication safety, and condition recognition to improve clinical reasoning. The platform aims to be a leading educational tool for nursing professionals, enhancing their knowledge and ultimately improving patient care outcomes.

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
- **Framework & Styling**: React with TypeScript, Wouter for routing, shadcn/ui with Radix UI, Tailwind CSS v4, `next-themes` (20 themes), and DM Sans typography.
- **Content Engagement**: `ContentGate` for access control, interactive components (`PauseAndThink`, `ProgressiveDisclosure`, `CuriosityHook`, `KnowledgeCheck`).

### Technical Implementations
- **Frontend & Backend**: Vite with React, Express 5 on Node.js with TypeScript.
- **State Management**: TanStack React Query for server state.
- **API**: RESTful API.
- **Authentication**: Username/password with session management.
- **Content Engine**: Admin-only editor with AI generation for structured, SEO-optimized lessons, anatomy, and pre-nursing modules. Includes internal linking.
- **Publishing**: Admins can publish lessons immediately.
- **Subscription System**: Multiple tiers with regional pricing.
- **Interactive Learning**: Med Math, Clinical Calculations, Abnormal Lab Interpretation, Clinical Case Simulation, Medication Mastery Engine, and six clinical simulators.
- **Region-Aware Content**: Server-side detection filters content by `region_scope` (BOTH, US_ONLY, CA_ONLY) and supports regional AI content generation and unit conversion.
- **Mock Exam Engine**: Timed exams with configurable parameters, question flagging, auto-save, detailed reports, and stratified random sampling. Includes a Strict Exam Mode.
- **Admin Features**: Dashboard for analytics, subscriptions, content management, and preview modes. QC Dashboard.
- **Blog Automation**: OpenAI-powered blog post generation with scholarly sources and scheduled publishing.
- **Custom Flashcards**: User-creatable with CSV import, AI accuracy checks, and AI generation.
- **Internationalization (i18n)**: Custom system for 15 languages, including language-prefixed URL routing, hreflang, RTL support, and browser detection.
- **Multilingual SEO**: 1,170 SEO pages, Admin SEO Dashboard, AI-powered localization, per-language sitemaps, and JSON-LD schemas.
- **Dynamic Content Translation**: Language middleware, `getTranslatedFields()` helper, source hash comparison for stale translations.
- **Admin Translation Dashboard**: Coverage matrix, missing/stale translation detection, bulk actions, side-by-side editor.
- **Content Intelligence Dashboard**: Blueprint coverage heatmap, difficulty calibration, SEO keyword gaps, content ROI.
- **Adaptive CAT Engine**: IRT-style ability estimation, composite item selection, confidence interval stop rule.
- **Pass Probability Projection Engine**: Composite scoring model with logistic transform, anti-gaming, confidence bands, risk categories, and improvement simulator.
- **Next Best Action Engine**: Recommends top 3 actions with estimated probability lift.
- **Upgrade Funnel**: Event logging, admin metrics, rate-limited upgrade modals at high-intent trigger points.
- **Exam Blueprints**: Database-driven blueprints for various nursing exams.
- **Free Diagnostic SEO Funnel**: Public SEO-optimized landing pages with CTA to diagnostic exams.
- **Study Workload Calculator**: Dashboard widget for projected completion date.
- **Revenue Intelligence Dashboard**: Conversion funnels, study pack revenue, pricing offers.
- **Language ROI Scoring Engine**: Scores languages for prioritization.
- **SEO Health Check Engine**: Audits for hreflang, meta descriptions, word count, orphan pages, sitemap completeness.
- **Public Diagnostic Exam**: 25-question free diagnostic exam with anonymous attempts and topic breakdowns.
- **Auscultation Audio Library**: Manages audio clips with licensing and quiz modes.

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL.
- **Schema**: Defined in `shared/schema.ts`.
- **Validation**: Zod schemas.

### Content Architecture
- Lessons organized by body system, supporting pre/post-test questions, categorized into RPN/LVN, RN, NP, and Pharmacology.
- Each lesson includes 10 content sections (Pathophysiology, Risk Factors, Diagnostics, Management, Nursing Actions, Assessment Findings, Lifespan, Clinical Findings & Red Flags, Pharmacology, Exam Readiness) with inline admin editing and AI generation.
- Flashcard system with bookmarking and mastery tracking.
- Anatomy & Physiology detail pages for 12 body systems.
- 27 interactive Pre-Nursing Foundations Program modules.
- CMS content is dynamically integrated.

## External Dependencies

### Database
- **PostgreSQL**
- **Drizzle ORM**

### Payment Processing
- **Stripe**
- **PayPal SDK**

### Key npm Dependencies
- **UI**: shadcn/ui, Radix UI primitives, Lucide icons.
- **Forms**: `react-hook-form`, `@hookform/resolvers`, Zod.
- **Dates**: `date-fns`.

### Interactive Learning Data Modules
- `client/src/data/clinical-confusions.ts`
- `client/src/data/clinical-cases.ts`
- `client/src/data/medications.ts`

### Site Analytics & Feedback System
- **Custom Page View Tracker**
- **Analytics API**
- **Feedback System**

### AI/Content Generation
- **OpenAI**: For blog posts, AI flashcards, and lesson content generation.
- **Meta Graph API**: For social media scheduling.

### Daily Content Generation Pipeline
- **Engine**: `server/content-pipeline.ts` for AI-powered exam question and flashcard generation with clinical verification.
- **Scheduler**: `server/content-scheduler.ts` runs daily.

### Freemium Flashcard System
- **Stripe Checkout**: For Pro Plan upgrades.

### Seed Data
- `server/seed-study-decks.ts`: Auto-seeds public flashcard decks.
- `server/seed-seo-clusters.ts`: Auto-seeds pillar hub pages.

### SEO Configuration
- `server/seo-title-map.ts` and `client/src/data/seo-title-map.ts`: Optimized meta titles/descriptions.
- `client/src/data/internal-links.ts`: Contextual internal link map.

### AI Safety System
- `server/ai-safety.ts`: Runtime safety controls for AI generation.

### AI Batch Generation System
- Admin endpoints for generating exam questions and flashcards in batches.

### Digital Study Marketplace
- **DB Tables**: `digital_products`, `product_purchases`, `coupon_codes` in `shared/schema.ts`.
- **Public Pages**: `/shop` (product listing with filters), `/shop/:slug` (product detail).
- **API**: Public product listing, Stripe checkout, fulfillment, secure downloads, coupon validation.
- **Admin**: Full CRUD for products, sales data at `/api/admin/shop/*`.
- **Store Nav**: Added to desktop nav, mobile nav, and footer with i18n key `nav.store`.

### AI Medical Image Generator
- **Admin UI**: In Content Engine tab of admin page, generates medical illustrations via `gpt-image-1`.
- **API**: `POST /api/admin/generate-image`, `GET /api/admin/generated-images`, `DELETE /api/admin/generated-images/:filename`.
- **Storage**: Images saved to `attached_assets/generated_images/`, served via static route.
- **Image Library**: Browse, copy URL, regenerate, delete generated images.

### MicroLecture Generator
- **Admin UI**: In Content Engine tab, generates AI-powered micro-lectures with narration script, 8-15 slides, and flashcards.
- **API**: `POST /api/admin/generate-microlecture`, `GET /api/admin/microlectures`, `DELETE /api/admin/microlectures/:id`, `PUT /api/admin/microlectures/:id/publish`.
- **DB Table**: `generated_micro_lectures` in `shared/schema.ts`.
- **Tier-scoped**: Generates RPN/RN/NP-specific content with appropriate scope depth.

### Digital Product Builder (Admin)
- **Route**: `/admin/product-builder` and `/admin/product-builder/:id`.
- **DB Tables**: `design_projects`, `design_pages`, `design_assets`, `exported_files` in `shared/schema.ts`.
- **Canvas Editor**: Drag-and-drop designer with text, shapes, images; snap-to-grid, undo/redo, layers panel, multi-page support.
- **API**: Full CRUD for design projects, pages, and assets at `/api/admin/design-*`.
- **Autosave**: Canvas state auto-saved every 2 seconds.

### My Downloads / Post-Purchase Flow
- **Profile**: "My Purchases" section shows purchased products with download buttons and remaining count.
- **Shop Product**: Detects `?purchased=true` and shows download button instead of Buy Now.
- **API**: `GET /api/shop/my-purchases`, `GET /api/shop/download/:purchaseId`.

### Featured Study Resources (Homepage)
- Fetches featured products from `/api/shop/products` and displays up to 4 on homepage.
- Only shows section when products exist.