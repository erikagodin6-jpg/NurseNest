# NurseNest - Complete Nursing Learning Platform

## Overview
NurseNest is an adaptive learning platform designed for nursing and allied health students across 17 career verticals. It offers comprehensive learning resources, advanced exam preparation (e.g., NCLEX, REX-PN), and performance analytics. The platform leverages AI for content generation to develop clinical reasoning, nursing knowledge, and critical thinking, with the ultimate goal of improving patient care outcomes through a region-aware and adaptive learning environment. NurseNest aims to be a complete, market-leading learning solution.

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
The platform is built with a modern React UI (TypeScript, Wouter, shadcn/ui, Tailwind CSS v4) and an Express 5 backend on Node.js (TypeScript). It uses Vite for tooling and TanStack React Query for server state management via a RESTful API. Key UI/UX elements include 20 themes, DM Sans typography, premium visuals, and interactive components like `ContentGate` and `KnowledgeCheck`. An integrated digital product builder offers a Canva-style drag-and-drop interface with AI-powered content generation.

### UI/UX Decisions
The platform features a modern React UI built with TypeScript, Wouter for routing, shadcn/ui (Radix UI), and Tailwind CSS v4. It supports 20 themes, DM Sans typography, premium visuals with dual-tone top bars, and watermarked PDF previews. Key interactive components include `ContentGate`, `PauseAndThink`, `ProgressiveDisclosure`, `CuriosityHook`, and `KnowledgeCheck`. An integrated digital product builder offers a Canva-style drag-and-drop interface with AI-powered image and content generation. Exam interfaces maintain a consistent single-column layout, specific text styling, and color-coded answer options.

### Technical Implementations
NurseNest is built with Vite, React, and Express 5 on Node.js with TypeScript, using TanStack React Query for server state management via a RESTful API. Authentication employs a 3-tier header chain. Core functionalities include a subscription model with regional pricing, interactive learning modules, a mock exam engine with stratified random sampling, and an admin dashboard. AI integrations drive blog automation, an Adaptive CAT Engine, Pass Probability Projection, and a Next Best Action Engine. Exam blueprints are database-driven, and content is organized by body system. The system supports NGN question types, partial credit scoring, and a Spaced Repetition System, with content access managed by user tier (free, rpn, rn, np, admin).

Key systems and engines include:
- **Question Bank / Test Bank System**: Supports various study modes, JSON import, inline editing, timed exams, and analytics, ensuring content safety by user tier and region. Questions are reused across Adaptive CAT exams, Test Bank study, and Flashcard review.
- **Adaptive Flashcard System**: Tier-specific exam-style flashcards with an adaptive review engine and confidence-based scheduling, including AI for content expansion.
- **Clinical Vignette Generation Engine**: Admin-triggered batch generation of clinical vignette-style exam questions across all nursing tiers, with AI for content, image matching, and lesson linking.
- **RRT Bulk Question Generation Pipeline**: AI-powered generation of Canadian CBRC-style RRT licensing exam questions and matching flashcards.
- **Paramedic EMS Scenario Simulation System**: Interactive simulations with decision points.
- **Allied Health Encyclopedia System**: Over 1,500 structured topic entries across 8 professions, including overview, mechanism, clinical relevance, assessment, management, complications, and SEO keywords, with cross-profession links.
- **Adaptive Learning Engine (v2)**: Tracks granular learning progress, uses weighted priority scoring, a 5-state mastery model, and spaced repetition with 7 session types.
- **AI Study Coaching & Course Generation System**: Provides personalized study coaching, topic mastery scoring, exam readiness assessment, and dynamic study plan generation.
- **Programmatic SEO Engines**:
    - **Quiz Engine**: Automatically generates practice question pages from the exam question database.
    - **Page Expansion Engine**: Auto-generates indexable page variants (study-guide, exam-tips, clinical-scenarios, practice-questions, question-detail, flashcard-detail) from existing content across all career tracks, integrating with sitemaps and internal linking.
- **Multilingual SEO & Translation System**: Manages server-rendered hreflang/canonical tags, locale-aware meta injection, translation auditing, and multilingual sitemap generation.
- **Lesson Title Canonicalization System**: Standardizes lesson naming using aliases and a Title Canonicalizer Engine.
- **SEO & Performance Optimization**: Implements server-side SEO meta injection, JSON-LD structured data, expanded robots.txt and sitemap, dns-prefetch, async image decoding, optimized image assets, and a cross-platform internal linking engine. Includes an admin SEO audit dashboard.
- **New Grad Career Platform**: Multi-profession career hub for 9+ healthcare professions, featuring profession hub pages, first-year guides, clinical skills guides, unit guides, career development paths, and clinical scenarios, with lead capture and marketing components.
- **Clinical Skills Content Pages**: 18 comprehensive clinical skills guides with search, category filtering, interactive practice scenarios, FAQs, and CTAs.
- **Paramedic Lesson Content Library**: AI-generated paramedic lessons with structured content, SEO metadata, and links to flashcards/related lessons.
- **Referral Discount System**: Enables users to generate discounts and earn premium access.
- **Adaptive Practice & Mastery Systems**: For Pharmacy Tech, Paramedic, and MLT, offering adaptive practice with difficulty progression and weak area detection.
- **Medical Imaging Education System**: Exam prep for CAMRT/ARRT, including lessons, positioning guides, physics reviews, micro-quizzes, flashcards, an adaptive exam simulator, and a Positioning Training Module.
- **Medical Imaging Growth & Marketing Engine**: User acquisition and growth system with email capture, referral incentives, and study plan generation.
- **Medical Imaging Monetization & Paywall System**: Stripe-integrated checkout with country-specific pricing and entitlement tracking.
- **RN Lesson Content Audit System**: Admin panel for auditing and repairing RN-tier lesson content, with AI-powered repair and publishing validation.
- **Clinical Case Study Engine**: Manages multi-stage clinical case studies with decision points and scoring.
- **Question Bank Expansion Engine**: Large-scale AI-powered question generation across nursing domains, including duplicate prevention, atomic question+flashcard transactions, and CAT exam compatibility tagging.
- **ICU/CCRN Critical Care Content**: Over 1,500 ICU-level exam questions covering 6 CCRN domains, generated via AI.
- **Email Marketing Network**: Cross-platform email subscription categories (exam_prep, new_grad_tips, job_alerts, general) with contextual signup forms, section-aware exit intent modal, and a subscriber preference center page.
- **Offline Study System**: IndexedDB-based offline storage for question packs and flashcard decks with sync capabilities.
- **Multi-Profession Framework**: Dynamic profession management system for adding/configuring new healthcare professions.
- **Universal Question Bank Importer**: Bulk question import system supporting CSV, JSON, and XLSX, with validation and duplicate detection.
- **Translation Coverage Dashboard**: Admin tool for auditing translation completeness across locales for UI, DB content, and lessons.
- **Allied Health Marketing & SEO Ecosystem**: Comprehensive marketing infrastructure across all 8 allied health professions (Pharmacy Tech, RRT, Paramedic, MLT, Medical Imaging, Ultrasound, PTA, OTA). Includes long-tail SEO blog topic templates (10 per profession), authority pages (Top 100 Questions, Study Guide, Ultimate Guide), profession-specific email capture, social media content templates (Instagram/TikTok/Pinterest/LinkedIn), A/B-ready conversion CTAs, structured data (EducationalOrganization/Course/FAQPage), analytics tracking, and an admin progress dashboard at `/admin/allied-marketing`.
- **Lead Capture Funnels**: Contextual lead capture forms across marketing and content pages. Three reusable components (`InlineLeadCapture`, `EndOfContentLeadCapture`, `StickyLeadBanner`, `BlogInlineLeadCapture`) in `client/src/components/lead-capture.tsx`. Supports three lead magnet types: study_guide, practice_questions, mock_exam. Captures profession context and source page. Integrated across profession hub, exam hub, nursing hub, NP exam hub, medical imaging hub, NCLEX-RN guide, REX-PN guide, blog listing, and individual blog post pages. Data stored in `email_subscribers` table with `lead_magnet_type` and `profession_context` columns, flowing through `/api/subscribe` endpoint.

### Database Architecture
The platform utilizes PostgreSQL with Drizzle ORM for database management.

## External Dependencies

### Database
- PostgreSQL
- Drizzle ORM

### Payment Processing
- Stripe
- PayPal SDK

### AI/Content Generation
- OpenAI (for content generation, adaptive engines, and various content pipelines)

### Social Media
- Meta Graph API (for social media scheduling)
- Social Content Automation Engine (for multi-platform content generation)
