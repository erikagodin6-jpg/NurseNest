# NurseNest - Complete Nursing Learning Platform

## Overview
NurseNest is an adaptive learning platform for nursing and allied health students across 17 career verticals. It provides comprehensive learning resources, advanced exam preparation (e.g., NCLEX, REX-PN), and performance analytics. The platform utilizes AI for content generation to foster clinical reasoning, nursing knowledge, and critical thinking, ultimately aiming to improve patient care outcomes through a region-aware and adaptive learning environment. The project seeks to be a complete learning solution with significant market potential.

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
The platform features a modern React UI built with TypeScript, Wouter for routing, shadcn/ui (Radix UI), and Tailwind CSS v4. It supports 20 themes, DM Sans typography, and emphasizes premium visuals with dual-tone top bars and watermarked PDF previews. Key interactive components include `ContentGate`, `PauseAndThink`, `ProgressiveDisclosure`, `CuriosityHook`, and `KnowledgeCheck`. An integrated digital product builder offers a Canva-style drag-and-drop interface with AI-powered image and content generation. Exam interfaces maintain a consistent single-column layout, specific text styling, and color-coded answer options.

### Technical Implementations
NurseNest is built with Vite, React, Express 5 on Node.js with TypeScript, using TanStack React Query for server state management via a RESTful API. Authentication employs a 3-tier header chain. Core functionalities include a subscription model with regional pricing, interactive learning modules, a mock exam engine with stratified random sampling, and an admin dashboard. AI integrations drive features like blog automation, an Adaptive CAT Engine, Pass Probability Projection, and a Next Best Action Engine. Exam blueprints are database-driven, and content is organized by body system. The system supports NGN question types, partial credit scoring, and a Spaced Repetition System, with content access managed by user tier (free, rpn, rn, np, admin).

Key systems and engines include:
- **Question Bank / Test Bank System**: Supports various study modes, JSON import, inline editing, timed exams, and analytics, ensuring content safety by user tier and region. Questions are reused across Adaptive CAT exams, Test Bank study, and Flashcard review, unified via the `flashcard_bank` table.
- **Adaptive Flashcard System**: Tier-specific exam-style flashcards with an adaptive review engine and confidence-based scheduling. Includes an AI-powered content expansion system for generating new exam questions and flashcards.
- **Clinical Vignette Generation Engine**: An admin-triggered batch system for generating clinical vignette-style exam questions across all nursing tiers, incorporating AI for content creation, image matching, and lesson linking.
- **RRT Bulk Question Generation Pipeline**: An AI-powered pipeline for generating Canadian CBRC-style RRT licensing exam questions across 13 domains, auto-generating matching flashcards.
- **Paramedic EMS Scenario Simulation System**: Interactive simulations with decision points and debriefing.
- **Allied Health Encyclopedia System**: 1,500+ structured topic entries across 8 professions (paramedic, RRT, MLT, diagnostic imaging, OT, social work, psychotherapy, addictions counseling). Each entry includes overview, mechanism, clinical relevance, signs/symptoms, assessment, management, complications, clinical pearls, exam pitfalls, FAQ, and SEO keywords. Cross-profession links connect 600+ overlapping topics. API at `/api/encyclopedia/*`.
- **Adaptive Learning Engine (v2)**: Tracks learning progress at a granular level, uses weighted priority scoring, a 5-state mastery model, and spaced repetition with 7 session types.
- **AI Study Coaching & Course Generation System**: Provides personalized study coaching, topic mastery scoring, exam readiness assessment, and dynamic study plan generation.
- **Programmatic SEO Quiz Engine**: Automatically generates practice question pages from the exam question database. Nursing-specific topic pages at `/:tier/questions/:topicSlug` (rpn, rn, np) with API at `/api/nursing/question-topics/:tier/:topicSlug`. Index pages at `/:tier/questions`. Career marketing pages at `/how-to-become-a-nurse/:track`. All wired into sitemap, SEO meta, and breadcrumbs. Key files: `server/nursing-questions-api.ts`, `client/src/pages/nursing-question-seo-page.tsx`, `client/src/pages/nursing-career-pages.tsx`.
- **Programmatic SEO Page Expansion Engine**: Auto-generates indexable page variants (study-guide, exam-tips, clinical-scenarios, practice-questions, question-detail, flashcard-detail) from existing lessons, questions, and flashcard decks across all allied health career tracks. Includes sitemap integration (per-type XML sitemaps), internal linking graph, sibling navigation, FAQ sections, and an admin dashboard at `/admin/programmatic-seo`. DB table: `programmatic_pages`. Engine: `server/programmatic-seo-engine.ts`. Frontend: `client/src/pages/programmatic-seo-page.tsx`.
- **Multilingual SEO & Translation System**: Manages server-rendered hreflang/canonical tags, locale-aware meta injection, translation completeness auditing, and multilingual sitemap generation.
- **Lesson Title Canonicalization System**: Standardizes lesson naming across the platform using a `lesson_aliases` table and a Title Canonicalizer Engine that strips prefixes, corrects spelling, and resolves abbreviations.
- **SEO & Performance Optimization**: Implements server-side SEO meta injection, JSON-LD structured data (MedicalCondition on `/conditions/:slug` and `/medications/:slug`, JobPosting on `/career-development/:slug` and `/new-grad/career/:path`, EducationalOrganization on major landing pages), expanded robots.txt and sitemap, dns-prefetch, async image decoding, and optimized image assets. Cross-platform internal linking engine (`server/seo-engine.ts`) connects nursing and allied health content across 8 topic areas via `/api/cross-platform-related`. `CrossPlatformRelatedContent` component in `client/src/components/related-resources.tsx`. Admin SEO audit dashboard tab at `/admin/seo` with page-by-page audit results. Global mobile CSS prevents horizontal overflow.
- **Allied Health Encyclopedia System**: Profession-specific clinical knowledge encyclopedias across 8 allied health professions (paramedic, respiratory therapy, MLT, imaging, social work, psychotherapy, addictions, occupational therapy). Features structured topic pages with overview, mechanism/physiology, clinical relevance, signs/symptoms, assessment methods, management, complications, clinical pearls, exam pitfalls, and FAQ sections. Includes JSON-LD Article/FAQPage schemas, breadcrumbs, SEO meta tags, cross-profession linking, and admin interface for CRUD/bulk import. DB tables: `encyclopedia_topics`, `encyclopedia_entries` (lazy-created via `ensureEncyclopediaTables()`). Routes: `/encyclopedia` (landing), `/:profession-encyclopedia` (hub per profession), `/encyclopedia/:profession/:slug` (entry). Admin API: `GET/POST/PUT/DELETE /api/admin/encyclopedia/entries`, `POST /api/admin/encyclopedia/bulk-import` (max 200). Public API: `GET /api/encyclopedia/:profession`, `GET /api/encyclopedia/:profession/:slug`. Key files: `server/encyclopedia-routes.ts`, `client/src/pages/encyclopedia-entry.tsx`, `client/src/pages/encyclopedia-hub.tsx`, `client/src/pages/encyclopedia-landing.tsx`.
- **New Grad Career Platform**: Multi-profession career hub supporting 9+ healthcare professions (Nursing RPN/RN, Paramedic, Respiratory Therapy, MLT, Diagnostic Imaging, Occupational Therapy, Social Work, Psychotherapy, Addictions Counseling). Features profession hub pages, first-year guides, clinical skills guides, unit guides, career development paths, and clinical scenarios. Includes lead capture with email subscription, testimonial sections, social share cards, and internal linking components. Also includes reusable `NewGradGuide` template and marketing funnel components (`ChecklistGate`, `FlashcardCTA`, `PracticeQuestionCTA`). Routes: `/new-grad`, `/new-grad/:profession`, `/new-grad/:profession-first-year-guide`, `/new-grad/clinical-skills/:skill`, `/new-grad/unit-guide/:unit`, `/new-grad/career/:path`, `/new-grad/scenario/:slug`. Data config in `shared/new-grad-professions.ts`. DB tables: `new_grad_guides`, `new_grad_testimonials`, `lead_capture_downloads`. Key template files: `client/src/pages/new-grad/profession-data.ts`, `client/src/pages/new-grad/profession-hub.tsx`, `client/src/pages/new-grad/new-grad-guide-template.tsx`, `client/src/components/marketing-cta.tsx`.
- **Clinical Skills Content Pages (Section 6)**: 18 comprehensive clinical skills guides targeting high-intent search queries from healthcare students and new graduates. Hub page at `/clinical-skills` with search, category filtering (core, safety, communication, assessment, specialized), and skill cards. Individual guide pages at `/clinical-skills/:slug` with sticky TOC, "Why It Matters" section, multi-section content with clinical tips, common mistakes, best practices, interactive practice scenarios with answer checking and rationale, FAQ with structured data, related guides, and CTAs. Data file: `client/src/data/clinical-skills-guides.ts`. Pages: `client/src/pages/clinical-skills-hub.tsx`, `client/src/pages/clinical-skills-guide.tsx`. Topics include: medication administration, patient communication, vital signs assessment, infection control, wound care, pain management, fall prevention, patient safety protocols, blood glucose monitoring, IV therapy, discharge planning, teamwork/delegation, ethical decision-making, SBAR/shift report, managing multiple patients, handling emergencies, documentation, shift organization, prioritizing busy shifts. Categories expanded in `shared/new-grad-professions.ts` CLINICAL_SKILLS_CATEGORIES.
- **Paramedic Lesson Content Library**: AI-generated paramedic lessons with structured content blocks and SEO metadata, linked to flashcard decks and related lessons.
- **Referral Discount System**: Mechanism for users to generate discounts and earn premium access.
- **Pharmacy Tech Adaptive Practice & Mastery System**: Adaptive practice with difficulty progression and weak area detection.
- **Paramedic & MLT Exam Engines**: Multi-mode exam simulators (CAT, Adaptive, Practice, Drill) with IRT-based ability estimation.
- **MLT Lab Image & Remediation Systems**: Manages lab image metadata and links questions to lessons/flashcards.
- **Medical Imaging Education System**: Exam prep for CAMRT/ARRT, including lessons, positioning guides, physics reviews, micro-quizzes, flashcards with spaced repetition, an adaptive exam simulator, and a Positioning Training Module.
- **Medical Imaging Growth & Marketing Engine**: User acquisition and growth system with email capture, referral incentives, and study plan generation.
- **Medical Imaging SEO Architecture**: Programmatic SEO pages, blog articles with content freshness, and internal linking.
- **Medical Imaging Monetization & Paywall System**: Stripe-integrated checkout with country-specific pricing and entitlement tracking.
- **RN Lesson Content Audit System**: Admin panel for auditing and repairing RN-tier lesson content, with AI-powered repair and publishing validation.
- **Clinical Case Study Engine**: Manages multi-stage clinical case studies with decision points and scoring.
- **Question Bank Expansion Engine**: Large-scale AI-powered question generation across nursing domains, including duplicate prevention, atomic question+flashcard transactions, and CAT exam compatibility tagging.
- **ICU/CCRN Critical Care Content**: Over 1,500 ICU-level exam questions covering 6 CCRN domains, generated via AI, with a mix of MCQ and SATA.
- **Offline Study System**: IndexedDB-based offline storage for question packs and flashcard decks with sync capabilities.
- **Push Notification System**: Web Push API for study reminders.
- **Mobile Bottom Navigation**: Fixed bottom navigation for mobile with an offline indicator.
- **Multi-Profession Framework**: Dynamic profession management system for adding/configuring new healthcare professions.
- **Universal Question Bank Importer**: Bulk question import system supporting CSV, JSON, and XLSX, with validation and duplicate detection.
- **Translation Coverage Dashboard**: Admin tool for auditing translation completeness across locales for UI, DB content, and lessons.
- **Allied Health Marketing & SEO Ecosystem**: Comprehensive marketing infrastructure across all 8 allied health professions (Pharmacy Tech, RRT, Paramedic, MLT, Medical Imaging, Ultrasound, PTA, OTA). Includes long-tail SEO blog topic templates (10 per profession), authority pages (Top 100 Questions, Study Guide, Ultimate Guide), profession-specific email capture, social media content templates (Instagram/TikTok/Pinterest/LinkedIn), A/B-ready conversion CTAs, structured data (EducationalOrganization/Course/FAQPage), analytics tracking, and an admin progress dashboard at `/admin/allied-marketing`.

### Database Architecture
The platform utilizes PostgreSQL with Drizzle ORM for database management, configured with separate environment variables for development and production.

## External Dependencies

### Database
- PostgreSQL
- Drizzle ORM

### Payment Processing
- Stripe
- PayPal SDK

### AI/Content Generation
- OpenAI (for blog posts, AI flashcards, lesson content, AI medical images, micro-lectures, adaptive engines, and various content pipelines)

### Social Media
- Meta Graph API (for social media scheduling)
