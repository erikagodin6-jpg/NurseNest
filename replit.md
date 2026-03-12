# NurseNest - Complete Nursing Learning Platform

## Overview
NurseNest is an adaptive learning platform for nursing and allied health students across 17 career verticals. Its primary purpose is to provide comprehensive learning resources, advanced exam preparation (e.g., NCLEX, REX-PN), and robust performance analytics. The platform utilizes AI for content generation to enhance clinical reasoning, nursing knowledge, and critical thinking, ultimately aiming to improve patient care outcomes through a region-aware and adaptive learning environment.

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
The platform uses React with TypeScript, Wouter for routing, shadcn/ui with Radix UI, and Tailwind CSS v4, supporting 20 themes and DM Sans typography. Key UI components like `ContentGate`, `PauseAndThink`, `ProgressiveDisclosure`, `CuriosityHook`, and `KnowledgeCheck` drive the learning experience. A digital product builder offers a Canva-style drag-and-drop interface with AI image and content generation. The design system emphasizes premium visuals, dual-tone top bars, and watermarked PDF previews. Question and exam interfaces follow a consistent design language with a single-column layout, specific text styling, and color-coded answer options.

### Technical Implementations
Built with Vite, React, Express 5 on Node.js with TypeScript, NurseNest uses TanStack React Query for server state management via a RESTful API. Authentication employs a 3-tier header chain (Bearer admin JWT, x-username/x-password, x-user-token JWT). Key features include a subscription model with regional pricing, interactive learning modules, a mock exam engine with stratified random sampling, and an admin dashboard. AI integrations (OpenAI) power blog automation, an Adaptive CAT Engine, Pass Probability Projection, and Next Best Action Engine. Exam blueprints are database-driven, content is organized by body system, and a 3-step onboarding process personalizes study plans. Admin tools (QBank Factory, Product Generator V2) facilitate AI-driven content generation and programmatic SEO. The system supports NGN question types, partial credit scoring, and a Spaced Repetition System. Content access is tier-based (free, rpn, rn, np, admin).

### Feature Specifications
The platform incorporates several specialized systems:
- **Question Bank System**: Supports various modes (Admin, Exam, Study, Browse) with JSON import, inline editing, timed exams, and analytics, enforcing content safety by user tier and region.
- **Paramedic EMS Scenario Simulation System**: Interactive simulations with dispatch, assessment, decision points, and debriefing, categorized by domain, profession, region, and difficulty.
- **Referral Discount System**: Users generate codes for discounts and earn premium days.
- **Beta Tester Access Code Management**: Admin functionality for managing beta invite codes.
- **Pharmacy Tech Adaptive Practice & Mastery System**: Adaptive practice with difficulty progression, mastery tracking, weak area detection, and study recommendations.
- **Paramedic & MLT Exam Engines**: Offers multi-mode exam simulators (CAT, Adaptive, Practice, Drill) with IRT-based ability estimation, blueprint-weighted question distribution, and session persistence.
- **MLT Lab Image & Remediation Systems**: Manages lab image metadata and auto-links questions to lessons/flashcards based on a weighted relevance scoring engine.
- **Medical Imaging Education System**: Comprehensive exam prep for CAMRT and ARRT certifications, including lessons, positioning guides, physics reviews with interactive visuals (kVp visualizer, mAs simulator, inverse square law, attenuation layers, SID/magnification), micro-quizzes with progress tracking, flashcards with spaced repetition (Easy/Medium/Hard rating + due-date ordering), AI content pipeline for generating physics topics and flashcards, SEO landing pages with FAQ schema markup, practice exams, and an adaptive exam simulator with difficulty adjustment, blueprint-balanced question selection, timed sessions, question flagging, auto-save/resume, and detailed post-exam analytics with readiness bands. The Positioning Training Module features step-by-step learning mode (8-step wizard), interactive label overlays (CR, IR, landmarks, shielding, collimation, rotation), positioning error trainer with score tracking, quiz mode with multiple question types, image comparison (correct vs incorrect), and full admin CRUD. Routes: `/medical-imaging/:country/positioning` (listing) and `/medical-imaging/:country/positioning/:projectionSlug` (detail). Schema: `imaging_positioning_entries` with slug, country, bodyRegion, learningSteps/positioningErrors/quizQuestions/labelOverlays as JSONB. Includes a full Radiography Image & Diagram Library with 10 asset categories, artifact image library, comparison image sets, anatomy identification library, physics visuals, and an image brief tracking system (admin at `/admin/image-library`).
- **Medical Imaging Growth & Marketing Engine**: User acquisition and growth system with email capture (`imaging_leads` table), automated nurture sequences (`imaging_nurture_sequences`, `imaging_nurture_enrollments`), referral incentive system (`imaging_referrals` with 3/5/10 thresholds for flashcards/exams/premium), marketing analytics dashboard (`/admin/imaging-marketing`), interactive study plan generator (`/medical-imaging/study-plan-generator`), radiography readiness quiz (`/radiography-readiness-quiz` with 15 questions across Basic Knowledge, Positioning, Artifact Recognition), marketing event tracking (`imaging_marketing_events`), content discovery carousels, and community share links. API routes in `server/imaging-growth-routes.ts`.
- **Medical Imaging SEO Architecture**: Programmatic SEO pages (`imaging_seo_pages` table) and blog/educational articles (`imaging_blog_articles` table) with content freshness tracking (publishedAt, lastReviewedAt, nextReviewAt). Internal linking engine filters by country/topic/tags and never cross-links between countries. Discovery modules on country pillar pages surface popular topics, beginner resources, and exam readiness tools. SEO traffic entry landing pages at `/radiography-practice-questions`, `/radiography-positioning-guide`, `/radiography-artifact-recognition` with JSON-LD schema markup and FAQ sections. Blog system at `/medical-imaging/blog` with index and detail views. Sitemap automation generates 100+ imaging URLs dynamically from DB. Country separation strictly enforced: Canada=CAMRT, USA=ARRT, never mixed. API routes in `server/imaging-seo-routes.ts`, SEO meta tags in `server/seo-meta.ts`.
- **Medical Imaging Monetization & Paywall System**: Complete monetization system with Stripe-integrated checkout for imaging products (study packs, exam bundles, subscriptions). Features country-specific pricing pages (`/medical-imaging/:country/pricing`), a study pack store (`/medical-imaging/store`), user account area with purchase history and entitlements (`/medical-imaging/account`), paywall/free preview system with configurable limits per content type (questions, flashcards, exams, positioning, physics), entitlement tracking, premium upgrade CTAs throughout the imaging section, and admin product/preview config management in the admin panel. Schema tables: `imaging_products`, `imaging_entitlements`, `imaging_purchases`, `imaging_preview_config`. Server routes in `server/imaging-monetization-routes.ts`.
- **Clinical Case Study Engine**: Manages multi-stage clinical case studies with decision points, exhibit data, and scoring.
- **Blog Batch Generator**: Automates blog post generation via OpenAI.
- **Admin Content Studios & Student Dashboards**: Dedicated interfaces for content management and student progress tracking for MLT and Paramedic modules.
- **Paramedic ECG/Waveform Library**: SVG-based rendering system for ECG strips and cardiac monitor waveforms.
- **CAT Exam Flashcard System**: Converts published exam questions into premium flashcards with structured rationales, images, and lesson links, supporting progress tracking and bookmarking.
- **Adaptive Exam Flashcard System**: Tier-specific exam-style flashcard system with adaptive review engine. Prioritized card queue (review_queue → weak areas → SRS-due → fresh questions). Two modes: Learn (immediate rationale reveal) and Test (answer first, then reveal). Confidence ratings (Guessing/Somewhat/Confident) feed SRS scheduling and review queue. Session summary shows accuracy by body system, confidence distribution, weak area identification, and lesson recommendations. Admin exam question manager with tier/topic/difficulty/body-system filters and content completeness indicators. API endpoints: `/api/adaptive-flashcard-session/:userId`, `/api/flashcard-session/answer`, `/api/flashcard-session/summary`, `/api/admin/exam-questions`.
- **Adaptive Clinical Study Engine**: Premium flashcard engine with 6 study modes (Learn, Test, Rapid Review, Weak Areas, Before-Exam Cram, Spaced Repetition), confidence-based repetition (confident/unsure/guess), per-user mastery profiles by topic, spaced repetition with confidence-weighted intervals, performance dashboard with analytics, and advanced filtering by topic/difficulty/type. Auth-gated API routes at `/api/adaptive/*`. Schema: `user_card_responses`, `user_mastery_profiles` tables. Engine: `server/adaptive-engine.ts`. UI: `client/src/components/adaptive-study.tsx` integrated into flashcards page as "adaptive" view state.
- **SEO Page System**: Dynamically generates SEO-optimized landing pages and content hubs with structured data.
- **Multi-Profession Framework**: Dynamic profession management system (`professions` table) allowing admins to add/configure/launch new healthcare professions with shared infrastructure. Each profession supports configurable modules (lessons, flashcards, practice exams, adaptive exams, image assets, SEO pages, study packs), custom branding, exam names, domains, and tiers. Quick-add templates for common professions (Radiography, Respiratory Therapy, Pharmacy Tech, Paramedic, MLT, Sonography, Nursing). Admin UI at `/admin/professions`. Public profession hub pages at `/profession/:slug`.
- **Universal Question Bank Importer**: Bulk question import system supporting CSV, JSON, and XLSX file uploads (`question_bank_imports` and `question_bank_import_rows` tables). Features include: validation engine checking for missing fields, invalid values, duplicate IDs, broken image references; validation report with errors, warnings, row numbers, and suggested fixes; import preview showing sample rows and parsed fields; duplicate detection with skip/replace/variant options; import execution pipeline with audit trail; import history. Admin UI at `/admin/universal-import`. Supported question types: single_best_answer, multiple_response, image_interpretation, case_based, comparison, sequencing, drag_and_drop.

### USA ARRT Content Library
A complete USA radiography (ARRT) content library has been seeded via `script/seed-usa-arrt-*.ts` scripts (29 files, orchestrated by `script/seed-usa-arrt-all.ts`). Content includes: 1,209 MCQ practice questions across 5 ARRT domains, 234 flashcards, 80 positioning drill entries, 40 artifact recognition questions, 20 case studies, 38 lessons, 25 SEO page blueprints, and 120 image briefs. All content is tagged `country='usa'`, `exam='arrt'`, `status='published'`. Duplicate-checking guards prevent re-insertion on subsequent runs. Key DB schema notes: `imaging_case_studies` has no country/exam_type columns; `image_assets` uses title/description/modality/body_part/tags (not seo_* fields); positioning `sid` column is varchar(50).

### Database Architecture
The system uses PostgreSQL with Drizzle ORM. A centralized `server/db.ts` module manages database connections, utilizing separate environment variables for development and production. Seed scripts ensure data parity across environments.

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
- OpenAI: Utilized for blog posts, AI flashcards, lesson content, AI medical images, micro-lectures, and various content generation pipelines (Test Bank, NGN QBank, MLT Question Pipeline).

### Social Media
- Meta Graph API: For social media scheduling.