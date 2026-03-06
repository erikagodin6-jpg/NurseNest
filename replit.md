# NurseNest - Complete Nursing Learning Platform

## Overview
NurseNest is an interactive learning platform designed for nursing and allied health students, including RPN/LVN, RN, and NP, as well as 14 other career verticals. It provides comprehensive learning resources, exam preparation for NCLEX, REX-PN, and other allied health exams, performance analytics, and AI-powered content generation. The platform aims to enhance clinical reasoning, improve nursing knowledge, critical thinking, and ultimately, patient care outcomes across various healthcare disciplines by offering a robust, adaptive, and region-aware learning environment.

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
The platform utilizes React with TypeScript, Wouter for routing, shadcn/ui with Radix UI, and Tailwind CSS v4, offering 20 themes and DM Sans typography. Key UI components include `ContentGate`, `PauseAndThink`, `ProgressiveDisclosure`, `CuriosityHook`, and `KnowledgeCheck`. A digital product builder offers a Canva-style editor with drag-and-drop functionality and AI-powered image and content generation. The design system emphasizes premium visuals, dual-tone top bars, and watermarked PDF previews.

### Technical Implementations
The application is built with Vite, React, and Express 5 on Node.js with TypeScript. TanStack React Query manages server state via a RESTful API. Authentication uses username/password with session management. A subscription system supports regional pricing. The system features interactive learning modules, a mock exam engine with detailed reports and stratified random sampling, and a Strict Exam Mode. An admin dashboard provides analytics, content management, and content intelligence, including OpenAI-powered blog automation and a custom i18n system for 15 languages. Advanced features include an Adaptive CAT Engine, Pass Probability Projection Engine, and Next Best Action Engine. Exam blueprints are database-driven. Content is organized by body system for various nursing levels, with pre/post-test questions. A 3-step onboarding process generates personalized study plans. An admin-only QBank Factory and Product Generator V2 facilitate question bank creation and AI-driven content generation. Programmatic SEO practice question pages and an allied health architecture supporting 14 career verticals are also integrated. NGN question types and a partial credit scoring engine are implemented. The lesson content is served via a server-side API to optimize client-side bundle size. SEO optimization includes a 301 redirect system, sitemap generation, and related articles functionality. Access control is managed through a tier system (free, rpn, rn, np, admin).

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

## Lesson Content Status
- **Total lessons**: 1,299+ across all tiers
- **RPN (430 lessons)**: 100% complete - all fields populated with scope-appropriate content
- **RN (301 lessons)**: 100% complete - all fields populated with scope-appropriate content  
- **NP (1,037 lessons)**: 100% complete - all 841 cellular placeholders replaced with NP-level pathophysiology content (March 2026). Content organized by clinical domain with topic-specific advanced pathophysiology, differential diagnosis, diagnostic criteria, and prescribing rationale.
- **Free tier (489 lessons)**: Complete
- Content files: 115+ TypeScript files in `client/src/data/lessons/`
- NP lessons with JSON-quoted keys (np-clinical-units.ts, respiratory-missing-np.ts) use `"title"` format vs unquoted `title:` in batch files

## Regional Measurement Adaptation
- **Module**: `server/region-adapt-content.ts` — server-side unit conversion applied at the lesson content API level
- **Integration**: `server/lesson-content-api.ts` `/api/lessons/content/:slug` endpoint calls `adaptLessonContent(lesson, region)` before sending response
- **Region detection**: `req.region` set by middleware in `server/region.ts` based on hostname (`.ca` → "CA", default → "US")
- **Baseline**: All lesson content is authored in US units (mg/dL, °F, mEq/L, g/dL, cells/µL, lbs)
- **Canadian conversions**: Context-aware keyword matching (30/50/80-char windows) to identify lab type before applying correct conversion factor
  - Glucose: mg/dL → mmol/L (×0.0555)
  - Creatinine: mg/dL → µmol/L (×88.4)
  - BUN: mg/dL → mmol/L (×0.357)
  - Calcium: mg/dL → mmol/L (×0.25)
  - Bilirubin: mg/dL → µmol/L (×17.1)
  - Hemoglobin/Albumin: g/dL → g/L (×10)
  - Temperature: °F → °C
  - Electrolytes: mEq/L → mmol/L (1:1)
  - WBC: cells/µL → ×10⁹/L (÷1000)
  - Weight: lbs → kg (×0.4536)