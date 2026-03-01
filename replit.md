# NurseNest - Complete Nursing Learning Platform

## Overview

NurseNest is an interactive learning platform designed for RPN/LVN, RN, and NP students. It provides comprehensive learning resources, including lessons, flashcards, performance analytics, and exam preparation for NCLEX and REX-PN. The platform supports both US and Canadian nursing standards, with a strong focus on clinical pathophysiology, medication safety, and condition recognition to enhance clinical reasoning. NurseNest aims to be a leading educational tool, improving nursing knowledge and ultimately contributing to better patient care outcomes. It includes features like a digital study marketplace, AI-powered content generation for medical images and micro-lectures, and a dual-path exam system for REx-PN and NCLEX-RN.

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
- **Content Engagement**: Utilizes `ContentGate` for access control and interactive components like `PauseAndThink`, `ProgressiveDisclosure`, `CuriosityHook`, and `KnowledgeCheck`.
- **Digital Product Builder**: Streamlined single-flow creation (Store "Create Product" -> Guided Mode form -> auto-creates project on compile, topic auto-syncs to project title and publish form). Canva-style editor with drag-and-drop, multi-select, undo/redo, brand kit (30 themes -- 15 original bright: Soft Clinical, Structured Academic, Bold Modern, Minimal Clean, Blush Rose, Lavender Dream, Sage Wellness, Sky Breeze, Peach Glow, Cotton Candy, Ivory Clinical, Mint Ward, Snow Minimal, Blush Academic, Nordic Frost; 5 dark: Charcoal Clinical, Navy Medical, Deep Teal, Neon Contrast, Matte Scholar; Paper & Ink; 6 pastel-on-white: Pastel Lilac, Pastel Mint, Pastel Blush, Pastel Sky, Pastel Peach, Pastel Lemon; 4 color-on-white: Coral on White, Ocean on White, Emerald on White, Indigo on White), AI image lab, and various export formats. Includes multi-page AI content pagination, object grouping, AI bundle generator (cram+qbank+flashcards+listing in one click), and AI test bank generator with configurable question counts (10-75), difficulty levels, question types (MC/SATA/ordered-response), preview, JSON/CSV export, and direct marketplace publishing. **AI Prompt fields** in both Guided Mode and Canvas Mode allow users to write detailed natural-language instructions (not just a topic name) — the AI uses these as custom instructions alongside exam tier/region/template settings. Server uses dedicated `"guided"` mode with matching system prompt for Guided Mode compilation. **Premium Design System**: All compiled pages feature a Canva-quality visual language — dual-tone top bars (primary + accent), left sidebar accent strips, decorative corner circles, branded footers with page numbers. Headings use 3 visual styles (L1: card with accent bar, L2: accent underline, L3: vertical bar). Callout boxes use left accent bars with badge labels. Bullet lists have rounded dot indicators with subtle backgrounds. Tables have rounded container borders. Cover pages feature layered backgrounds, double-border frames, scattered decorations, and edge accent strips. Chapter dividers show ghost section numbers. TOC uses numbered cards. Summary pages include checklist items with a confidence-check block. 20+ Google Fonts with per-theme font pairings (Playfair Display, Montserrat, Space Grotesk, Quicksand, Sora, etc.).
- **Watermarked Preview System**: Generates and streams watermarked PDF previews for digital products.

### Technical Implementations
- **Frontend & Backend**: Vite with React, Express 5 on Node.js with TypeScript.
- **State Management**: TanStack React Query for server state.
- **API**: RESTful API for all functionalities.
- **Authentication**: Username/password with session management.
- **Content Engine**: Admin-only editor supporting AI generation for lessons, anatomy, and pre-nursing modules, with internal linking and immediate publishing.
- **Subscription System**: Multiple tiers with regional pricing.
- **Interactive Learning**: Includes Med Math, Clinical Calculations, Abnormal Lab Interpretation, Clinical Case Simulation, Medication Mastery Engine, and six clinical simulators.
- **Region-Aware Content**: Server-side detection and filtering by `region_scope` (BOTH, US_ONLY, CA_ONLY), supporting regional AI content generation and unit conversion.
- **Mock Exam Engine**: Timed exams with configurable parameters, question flagging, auto-save, detailed reports, and stratified random sampling, including a Strict Exam Mode.
- **Admin Features**: Dashboard for analytics, subscriptions, content management, QC, and content intelligence (blueprint coverage, difficulty calibration, SEO keyword gaps).
- **Blog Automation**: OpenAI-powered blog post generation with scholarly sources and scheduled publishing.
- **Custom Flashcards**: User-creatable with CSV import, AI accuracy checks, and AI generation.
- **Internationalization (i18n)**: Custom system for 15 languages, including language-prefixed URL routing, hreflang, RTL support, and browser detection.
- **Multilingual SEO**: 1,170 SEO pages, Admin SEO Dashboard, AI-powered localization, per-language sitemaps, and JSON-LD schemas.
- **Dynamic Content Translation**: Language middleware and `getTranslatedFields()` for managing translations.
- **Adaptive CAT Engine**: IRT-style ability estimation, composite item selection, and confidence interval stop rule.
- **Pass Probability Projection Engine**: Composite scoring model with logistic transform, anti-gaming, and improvement simulator.
- **Next Best Action Engine**: Recommends top 3 actions with estimated probability lift.
- **Upgrade Funnel**: Event logging and rate-limited upgrade modals.
- **Exam Blueprints**: Database-driven blueprints for various nursing exams.
- **Free Diagnostic SEO Funnel**: Public SEO-optimized landing pages with CTA to diagnostic exams.
- **Study Workload Calculator**: Dashboard widget for projected completion date.
- **Revenue Intelligence Dashboard**: Conversion funnels and study pack revenue.
- **Language ROI Scoring Engine**: Scores languages for prioritization.
- **SEO Health Check Engine**: Audits for hreflang, meta descriptions, word count, orphan pages, and sitemap completeness.
- **Public Diagnostic Exam**: 25-question free diagnostic exam with anonymous attempts and topic breakdowns.
- **Auscultation Audio Library**: Manages audio clips with licensing and quiz modes.
- **AI Medical Image Generator**: Admin UI for generating medical illustrations via `gpt-image-1`, with image storage and library management.
- **MicroLecture Generator**: Admin UI for generating AI-powered micro-lectures with narration scripts and slides, supporting tier-scoped content.
- **Dual-Path Exam System**: Dedicated sections and hub pages for CA (REx-PN) and US (NCLEX-RN) exam preparations.
- **My Downloads / Post-Purchase Flow**: User profile section for purchased digital products with download capabilities.
- **Education Pathways**: `/pathways` page detailing step-by-step curricula for Pre-Nursing, RPN/LPN, RN, and NP, with smart progression indicators and exam alignment.

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL.
- **Schema**: Defined in `shared/schema.ts`.
- **Validation**: Zod schemas.

### Content Architecture
- Lessons organized by body system, categorized by RPN/LVN, RN, NP, and Pharmacology, with pre/post-test questions.
- Each lesson includes 10 content sections (e.g., Pathophysiology, Pharmacology, Exam Readiness) with inline admin editing and AI generation.
- Flashcard system with bookmarking and mastery tracking.
- Anatomy & Physiology detail pages for 12 body systems.
- 27 interactive Pre-Nursing Foundations Program modules.
- CMS content dynamically integrated.

## External Dependencies

### Database
- **PostgreSQL**
- **Drizzle ORM**

### Payment Processing
- **Stripe** (including Stripe Checkout for upgrades)
- **PayPal SDK**

### Key npm Dependencies
- **UI**: shadcn/ui, Radix UI primitives, Lucide icons.
- **Forms**: `react-hook-form`, `@hookform/resolvers`, Zod.
- **Dates**: `date-fns`.

### AI/Content Generation
- **OpenAI**: For blog posts, AI flashcards, lesson content, AI medical images (gpt-image-1), and micro-lectures.
- **5-Step Content Pipeline** (`/api/ai/generate-pipeline`): Guided Mode uses a multi-step AI pipeline for cohesive bundle generation (visual cohesion is handled by the theme/rendering system):
  1. **Strategy Controller** - Defines target audience, pain points, transformation, narrative arc, clinical priority framework, visual motif
  2. **Page Architect** - Creates structured page map with objectives, exam takeaways, visual emphasis, reasoning focus
  3. **Structured Content Engine** - Generates design-block content (headings, bullets, tables, callouts) with clinical pearls, exam traps, rapid recall. Section prompts enforce minimum 8 blocks with 6+ substantive (bullets/table/callout/paragraph). Generic titles auto-inject high-yield condition inventory. Title-only/divider-only output explicitly forbidden.
  4. **Exam Authority Enhancer** - Injects exam-specific framing: priority ladders, decision algorithms, "If you see X think Y" statements
  5. **QA Flow Check** - Audits for redundancy, logical flow, difficulty escalation, tone consistency, clinical accuracy
  - **Section validation**: Server counts substantive vs non-substantive blocks; pass requires blocks>=3, chars>=400, substantive>=4. Client mirrors this with same logic before compile. Failed sections retry up to 2x with repair prompt that includes specific failure reasons.
  - Falls back to single-prompt generation (`/api/ai/generate-content` with mode "guided") if pipeline content step fails

### Site Analytics & Feedback System
- **Custom Page View Tracker**
- **Analytics API**
- **Feedback System**

### Social Media
- **Meta Graph API**: For social media scheduling.