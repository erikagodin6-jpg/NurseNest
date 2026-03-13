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
- **Adaptive Learning Engine (v2)**: Tracks learning progress at a granular level, uses weighted priority scoring, a 5-state mastery model, and spaced repetition with 7 session types.
- **AI Study Coaching & Course Generation System**: Provides personalized study coaching, topic mastery scoring, exam readiness assessment, and dynamic study plan generation.
- **Programmatic SEO Quiz Engine**: Automatically generates practice question pages from the exam question database.
- **Multilingual SEO & Translation System**: Manages server-rendered hreflang/canonical tags, locale-aware meta injection, translation completeness auditing, and multilingual sitemap generation.
- **Lesson Title Canonicalization System**: Standardizes lesson naming across the platform using a `lesson_aliases` table and a Title Canonicalizer Engine that strips prefixes, corrects spelling, and resolves abbreviations.
- **SEO & Performance Optimization**: Implements server-side SEO meta injection, JSON-LD structured data, expanded robots.txt and sitemap, dns-prefetch, async image decoding, and optimized image assets.

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
- OpenAI (for blog posts, AI flashcards, lesson content, AI medical images, micro-lectures, and various content pipelines)

### Social Media
- Meta Graph API (for social media scheduling)