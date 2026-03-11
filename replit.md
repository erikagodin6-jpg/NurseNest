# NurseNest - Complete Nursing Learning Platform

## Overview
NurseNest is an adaptive learning platform designed for nursing and allied health students across 17 career verticals. Its primary purpose is to deliver comprehensive learning resources, exam preparation (e.g., NCLEX, REX-PN), performance analytics, and AI-powered content generation. The platform aims to improve clinical reasoning, nursing knowledge, and critical thinking, ultimately leading to enhanced patient care outcomes through a region-aware and robust learning environment.

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
The platform utilizes React with TypeScript, Wouter for routing, shadcn/ui with Radix UI, and Tailwind CSS v4, supporting 20 themes and DM Sans typography. Key UI components include `ContentGate`, `PauseAndThink`, `ProgressiveDisclosure`, `CuriosityHook`, and `KnowledgeCheck`. A digital product builder offers a Canva-style editor with drag-and-drop, AI image, and content generation capabilities. The design system incorporates premium visuals, dual-tone top bars, and watermarked PDF previews.

### Technical Implementations
The application is built with Vite, React, and Express 5 on Node.js with TypeScript. Server state is managed by TanStack React Query via a RESTful API. Authentication uses username/password with session management, and a subscription system supports regional pricing. Core features include interactive learning modules, a mock exam engine with stratified random sampling and Strict Exam Mode, and an admin dashboard. AI integrations encompass OpenAI-powered blog automation, custom i18n for 15 languages, an Adaptive CAT Engine, Pass Probability Projection Engine, and Next Best Action Engine. Exam blueprints are database-driven, and content is organized by body system for various nursing levels, incorporating pre/post-test questions. The platform includes a 3-step onboarding process for personalized study plans, admin tools like QBank Factory and Product Generator V2 for AI-driven content generation, and programmatic SEO for practice question pages. It supports NGN question types, a partial credit scoring engine, and a Spaced Repetition System. Content access is controlled via a tier system (free, rpn, rn, np, admin). Other features include 301 redirects, sitemap generation, related articles, Exam Calculator, Quick Study Sessions, Study Progress Momentum System, and a Tester Access System. The Lesson Library provides tier-adaptive heroes, featured topics, progress cards, and study time estimates. Clinical Case Studies offer multi-stage scenarios with decision points, and regional measurement adaptation converts units dynamically.

### Feature Specifications
- **Question Bank System**: Supports Admin, Exam, Study, and Browse modes with JSON import, inline editing, status toggling, timed exams, and analytics. Enforces content safety rules based on user tier and region.
- **Paramedic EMS Scenario Simulation System**: Manages interactive paramedic scenarios with detailed dispatch, assessment, decision points, and debriefing. Scenarios are segmented by content domain, profession track, region, visibility, difficulty, and exam relevance. Includes a frontend player and an admin panel for scenario creation and management.
- **Referral Discount System**: Users can generate unique referral codes. Friends receive a 15% discount on their first subscription, and referrers earn 7 free premium days. The system tracks uses and integrates with Stripe for discount application.
- **Beta Tester Access Code Management**: Admin dashboard functionality for generating, managing, and tracking beta invite codes with customizable tiers, usage limits, and durations.
- **Paramedic Landing & Hub Pages**: Dedicated SEO-optimized pages for paramedic careers, including landing pages, exam-specific pages (PCP, ACP, NREMT), and content hubs for lessons, exams, flashcards, and scenarios.
- **SEO Page System**: Includes dynamically generated landing pages for mock exams, hub pages for nursing certifications, and dedicated pages for medical conditions, medications, and lab values, all with structured data and comprehensive SEO metadata.
- **Paramedic SEO Content Engine**: Generates and manages various SEO content types (Topic, Category, Glossary, Comparison, Study Guides) for paramedic content, supporting internal linking and structured data.
- **MLT Exam Engines**: Provides four modes: Canada CSMLS Exam, USA ASCP CAT Exam, Adaptive Practice (with smart remediation), and customizable Practice Exam. Features IRT-based ability estimation, CAT stop logic, and anti-gaming detection.
- **MLT Lab Image & Microscopy System**: Manages lab image metadata, relational linking to questions/flashcards/lessons, and user drill practice history. Includes an Admin Image Library for upload and metadata editing, and various image drill modes.
- **Blog Batch Generator**: Automates the generation of blog posts via OpenAI.
- **MLT Admin Content Studio**: A comprehensive admin interface for managing MLT content (questions, flashcards, lessons) with CRUD operations, bulk import, import validation, and content distribution dashboards.
- **MLT Student Dashboard**: A 9-tab dashboard (`/dashboard/mlt`) for MLT certification candidates covering Overview, Canada (CSMLS), USA (ASCP), Exams, Flashcards, Lessons, Performance, Wrong Answers, and Study Plan. Features domain mastery heatmap, radar chart, wrong answer notebook with 4 one-click remediation actions (Review Lesson, Study Flashcards, Retry Similar, Adaptive Drill), conversion gating/locked overlays for free users, study streak/time tracking, upgrade banners, and study plan viewer with weekly schedule and checkpoints. Routes: `/dashboard/mlt/*`.
- **MLT SEO Landing Pages**: SEO-optimized pages for MLT certification keywords at `/mlt/exam-prep`, `/mlt/study-guide`, `/mlt/mock-exam`, `/mlt/flashcard-prep`, `/mlt/canada/practice-questions`, `/mlt/usa/practice-questions`. Includes FAQ schema (JSON-LD), Course structured data, internal linking, and CTAs.
- **MLT Analytics Tracking**: Client-side analytics utility (`client/src/allied/mlt-analytics.ts`) tracking page views, quiz/lesson/flashcard/exam start/complete, conversion events, and upgrade prompt interactions. Events stored in `mlt_analytics_events` table via `/api/mlt/analytics/event` POST endpoint. Uses `navigator.sendBeacon` with JSON Blob for reliable tracking.

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
- OpenAI: Used for blog posts, AI flashcards, lesson content, AI medical images, micro-lectures, and a 5-step content pipeline.
- Test Bank Generator: Ensures strict question count and JSON schema validation.
- NGN QBank Generator: Admin batch generation system with multiple prompt templates and strict validation.

### Social Media
- Meta Graph API: For social media scheduling.