# NurseNest - Complete Nursing Learning Platform

## Overview
NurseNest is an adaptive learning platform for nursing and allied health students across 17 career verticals. It provides comprehensive learning resources, advanced exam preparation (e.g., NCLEX, REX-PN), and robust performance analytics. The platform leverages AI for content generation to enhance clinical reasoning, nursing knowledge, and critical thinking, with a focus on improving patient care outcomes through a region-aware and adaptive learning environment. It aims to deliver a complete learning solution with a strong market presence.

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
The platform features a modern UI built with React, TypeScript, Wouter for routing, shadcn/ui with Radix UI, and Tailwind CSS v4, supporting 20 themes and DM Sans typography. Key interactive components like `ContentGate`, `PauseAndThink`, `ProgressiveDisclosure`, `CuriosityHook`, and `KnowledgeCheck` are central to the learning experience. A digital product builder provides a Canva-style drag-and-drop interface with AI image and content generation. The design emphasizes premium visuals, dual-tone top bars, and watermarked PDF previews. Exam interfaces maintain a consistent single-column layout, specific text styling, and color-coded answer options.

### Technical Implementations
NurseNest is built with Vite, React, Express 5 on Node.js with TypeScript, utilizing TanStack React Query for server state management via a RESTful API. Authentication uses a 3-tier header chain (Bearer admin JWT, x-username/x-password, x-user-token JWT). Core features include a subscription model with regional pricing, interactive learning modules, a mock exam engine with stratified random sampling, and an admin dashboard. AI integrations (OpenAI) drive blog automation, an Adaptive CAT Engine, Pass Probability Projection, and a Next Best Action Engine. Exam blueprints are database-driven, and content is organized by body system. The system supports NGN question types, partial credit scoring, and a Spaced Repetition System. Content access is tier-based (free, rpn, rn, np, admin).

Key specialized systems include:
- **Question Bank System**: Supports various modes with JSON import, inline editing, and analytics.
- **Paramedic EMS Scenario Simulation System**: Interactive simulations with decision points and debriefing.
- **Adaptive Practice & Mastery Systems**: Tailored for various professions (e.g., Pharmacy Tech, MLT, Paramedic) with difficulty progression, mastery tracking, and weak area detection.
- **Medical Imaging Education System**: Comprehensive exam prep for CAMRT/ARRT with lessons, positioning guides, physics reviews, micro-quizzes, and an adaptive exam simulator. It includes a robust image and diagram library.
- **Medical Imaging Growth & Marketing Engine**: Manages user acquisition, nurture sequences, referral incentives, and marketing analytics.
- **Medical Imaging SEO Architecture**: Implements programmatic SEO, internal linking, and country-specific content separation.
- **Medical Imaging Monetization & Paywall System**: Integrates Stripe for country-specific pricing, product stores, and entitlement management.
- **Clinical Case Study Engine**: Manages multi-stage case studies with decision points.
- **Adaptive Flashcard & Clinical Study Engines**: Provides multiple study modes, confidence-based repetition, and performance analytics with spaced repetition (SM-2 algorithm).
- **Multi-Profession Framework**: Allows dynamic addition and configuration of new healthcare professions with shared infrastructure and custom branding.
- **AI Study Coaching & Course Generation System**: Personalized study coaching with topic mastery scoring (0-40% weak, 41-65% developing, 66-85% proficient, 86-100% mastery), exam readiness scoring, pass probability estimation, custom practice session generator (50% weak/30% moderate/20% strong topic weighting), dynamic study plan generator based on exam date and hours/week, spaced repetition flashcard review (SM-2 algorithm), weak area alerts, motivation features (streaks, milestones), and AI course generation from exam blueprints. Admin aggregate analytics dashboard shows student performance distributions. Schema tables: `student_study_profiles`, `topic_mastery_scores`, `spaced_repetition_cards`, `weak_area_alerts`, `study_milestones`, `generated_courses`, `accuracy_trends`, `custom_practice_sessions`. Engine: `server/study-coaching-engine.ts`. Routes: `server/study-coaching-routes.ts`. Student UI at `/study-coach`. Admin analytics at `/admin/study-analytics`.
- **Universal Question Bank Importer**: Supports bulk import of questions from various formats with validation, preview, and history features.

### Database Architecture
The platform uses PostgreSQL with Drizzle ORM for database management. A centralized `server/db.ts` module handles connections, with separate environment variables for development and production.

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
- OpenAI: Utilized for blog posts, AI flashcards, lesson content, AI medical images, micro-lectures, and various content generation pipelines.

### Social Media
- Meta Graph API: For social media scheduling.