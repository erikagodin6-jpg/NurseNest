# NurseNest - Complete Nursing Learning Platform

## Overview
NurseNest is an adaptive learning platform designed for nursing and allied health students across 17 career verticals. It offers comprehensive learning resources, advanced exam preparation (e.g., NCLEX, REX-PN), and performance analytics. The platform uses AI for content generation to enhance clinical reasoning, nursing knowledge, and critical thinking, with the goal of improving patient care outcomes through a region-aware and adaptive learning environment. It aims to provide a complete learning solution with significant market potential.

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
The platform features a modern React UI with TypeScript, Wouter for routing, shadcn/ui (Radix UI), and Tailwind CSS v4. It supports 20 themes and DM Sans typography. Key interactive components include `ContentGate`, `PauseAndThink`, `ProgressiveDisclosure`, `CuriosityHook`, and `KnowledgeCheck`. A digital product builder offers a Canva-style drag-and-drop interface with AI image and content generation. The design emphasizes premium visuals, dual-tone top bars, and watermarked PDF previews. Exam interfaces maintain a consistent single-column layout, specific text styling, and color-coded answer options.

### Technical Implementations
NurseNest is built with Vite, React, Express 5 on Node.js with TypeScript, utilizing TanStack React Query for server state management via a RESTful API. Authentication uses a 3-tier header chain (Bearer admin JWT, x-username/x-password, x-user-token JWT). Core features include a subscription model with regional pricing, interactive learning modules, a mock exam engine with stratified random sampling, and an admin dashboard. AI integrations (OpenAI) drive blog automation, an Adaptive CAT Engine, Pass Probability Projection, and a Next Best Action Engine. Exam blueprints are database-driven, and content is organized by body system. The system supports NGN question types, partial credit scoring, and a Spaced Repetition System. Content access is tier-based (free, rpn, rn, np, admin).

The platform also includes:
- **Question Bank / Test Bank System**: Supports various modes with JSON import, inline editing, timed exams, and analytics, enforcing content safety by user tier and region. CAT exam questions are reused across three study modes: Adaptive CAT exams, Test Bank study mode (at `/qbank/study`), and Flashcard review. The `flashcard_bank` table serves as the unified enriched question store with `rationale_media` (clinical images), `lesson_links`, and `distractor_rationales`. The `exam-flashcard-mapper.ts` engine syncs `exam_questions` to `flashcard_bank` using content hashing. Admin can trigger re-sync from the Flashcard Studio "Content Reuse" tab.
- **Paramedic EMS Scenario Simulation System**: Interactive simulations with decision points and debriefing.
- **Referral Discount System**: Users generate codes for discounts and earn premium days.
- **Pharmacy Tech Adaptive Practice & Mastery System**: Adaptive practice with difficulty progression and weak area detection.
- **Paramedic & MLT Exam Engines**: Multi-mode exam simulators (CAT, Adaptive, Practice, Drill) with IRT-based ability estimation.
- **MLT Lab Image & Remediation Systems**: Manages lab image metadata and auto-links questions to lessons/flashcards.
- **Medical Imaging Education System**: Exam prep for CAMRT/ARRT, including lessons, positioning guides, physics reviews with interactive visuals, micro-quizzes, and flashcards with spaced repetition. Features an adaptive exam simulator and a Positioning Training Module with interactive overlays and error tracking.
- **Medical Imaging Growth & Marketing Engine**: User acquisition and growth system with email capture, nurture sequences, referral incentives, and an interactive study plan generator.
- **Medical Imaging SEO Architecture**: Programmatic SEO pages and blog articles with content freshness tracking and internal linking.
- **SEO & Performance Optimization**: Server-side og:image/og:url/twitter:image injection via seo-meta.ts, FAQPage JSON-LD on homepage, ItemList/LearningResource structured data on listing pages, expanded robots.txt and sitemap (663+ URLs), dns-prefetch hints, async image decoding. Strategy doc at `docs/seo-marketing-strategy.md`.
- **Medical Imaging Monetization & Paywall System**: Stripe-integrated checkout for imaging products with country-specific pricing, preview limits, and entitlement tracking.
- **Clinical Case Study Engine**: Manages multi-stage clinical case studies with decision points and scoring.
- **Adaptive Flashcard System**: Tier-specific exam-style flashcards with an adaptive review engine and confidence-based scheduling.
- **Adaptive Learning Engine (v2)**: A full adaptive engine with granular per-card tracking, weighted priority scoring, a 5-state mastery model, and spaced repetition. Offers 7 session types and analytics.
- **AI Study Coaching & Course Generation System**: Personalized study coaching with topic mastery scoring, exam readiness scoring, pass probability estimation, and dynamic study plan generation.
- **Programmatic SEO Quiz Engine**: Auto-generates thousands of practice question pages from the exam question database by topic.
- **Offline Study System**: IndexedDB-based offline storage for question packs and flashcard decks with sync capabilities.
- **Push Notification System**: Web Push API integration for study reminders.
- **Mobile Bottom Navigation**: Fixed bottom navigation for mobile with an offline indicator.
- **Multi-Profession Framework**: Dynamic profession management system allowing admins to add/configure new healthcare professions with shared infrastructure.
- **Universal Question Bank Importer**: Bulk question import system supporting CSV, JSON, and XLSX, with validation, duplicate detection, and an audit trail.

### Database Architecture
The platform uses PostgreSQL with Drizzle ORM for database management, configured via `server/db.ts` with separate environment variables for development and production.

## External Dependencies

### Database
- PostgreSQL
- Drizzle ORM

### Payment Processing
- Stripe
- PayPal SDK

### AI/Content Generation
- OpenAI (for blog posts, AI flashcards, lesson content, AI medical images, micro-lectures, and various content pipelines)

### Social Media
- Meta Graph API (for social media scheduling)