# NurseNest - Complete Nursing Learning Platform

## Overview
NurseNest is an adaptive learning platform for nursing and allied health students across 17 career verticals. It provides comprehensive learning resources, exam preparation (NCLEX, REX-PN, etc.), performance analytics, and AI-powered content generation. The platform aims to enhance clinical reasoning, nursing knowledge, and critical thinking to improve patient care outcomes through a robust and region-aware learning environment.

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
The platform uses React with TypeScript, Wouter for routing, shadcn/ui with Radix UI, and Tailwind CSS v4, supporting 20 themes and DM Sans typography. Key UI components include `ContentGate`, `PauseAndThink`, `ProgressiveDisclosure`, `CuriosityHook`, and `KnowledgeCheck`. A digital product builder provides a Canva-style editor with drag-and-drop, AI image, and content generation. The design system features premium visuals, dual-tone top bars, and watermarked PDF previews.

### Technical Implementations
The application is built with Vite, React, and Express 5 on Node.js with TypeScript. TanStack React Query manages server state via a RESTful API. Authentication uses username/password with session management. A subscription system supports regional pricing. Core features include interactive learning modules, a mock exam engine with stratified random sampling and Strict Exam Mode, and an admin dashboard for analytics and content management. AI integration includes OpenAI-powered blog automation, custom i18n for 15 languages, an Adaptive CAT Engine, Pass Probability Projection Engine, and Next Best Action Engine. Exam blueprints are database-driven. Content is organized by body system for various nursing levels, with pre/post-test questions. A 3-step onboarding process generates personalized study plans. Admin tools like QBank Factory and Product Generator V2 facilitate AI-driven content generation. Programmatic SEO practice question pages and an allied health architecture support 14 career verticals. NGN question types and a partial credit scoring engine are implemented. Lesson content is served via a server-side API for client-side optimization. SEO features include 301 redirects, sitemap generation, and related articles. Access control uses a tier system (free, rpn, rn, np, admin). The platform also includes a Spaced Repetition System, an Exam Calculator, Quick Study Sessions pulling from weak areas, and a Study Progress Momentum System. The Lesson Library features tier-adaptive heroes, featured topics, progress cards, and study time estimates. Clinical Case Studies provide multi-stage scenarios with decision points. Regional measurement adaptation dynamically converts content units based on user region. A Tester Access System manages invite codes and gathers feedback.

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
- **OpenAI**: Used for blog posts, AI flashcards, lesson content, AI medical images, micro-lectures, and a 5-step content pipeline.
- **Test Bank Generator**: Ensures strict question count and JSON schema validation.
- **NGN QBank Generator**: Admin batch generation system with multiple prompt templates and strict validation.

### Social Media
- Meta Graph API: For social media scheduling.

## Lesson Library Architecture
- All lesson data is in static TS files under `client/src/data/lessons/`
- `safeMerge()` in `index.ts` deduplicates at merge time; `isPlaceholder()` filters generic/template content
- Tier derived from slug suffix: `-rpn`, `-rn`, `-np`, or `"general"`
- System cards in `lessons.tsx` show lesson count badges and progress bars (completed/total)
- Lesson counts: free=564, rpn=521, rn=224, np=302, total=1611, questions=3921 (as of Mar 2026)
- DB tables `allied_lessons` and `content_items` are empty; all content is static TS