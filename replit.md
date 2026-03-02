# NurseNest - Complete Nursing Learning Platform

## Overview
NurseNest is an interactive learning platform designed for RPN/LVN, RN, and NP nursing students. It offers comprehensive learning resources including lessons, flashcards, performance analytics, and exam preparation for NCLEX and REX-PN. The platform supports both US and Canadian nursing standards, with a strong focus on clinical pathophysiology, medication safety, and condition recognition to improve clinical reasoning. Key features include a digital study marketplace, AI-powered content generation for medical images and micro-lectures, and a dual-path exam system. The project's vision is to enhance nursing knowledge, critical thinking, and ultimately, patient care outcomes.

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
The platform utilizes React with TypeScript, Wouter for routing, shadcn/ui with Radix UI, and Tailwind CSS v4, offering 20 themes and DM Sans typography. Interactive components like `ContentGate`, `PauseAndThink`, `ProgressiveDisclosure`, `CuriosityHook`, and `KnowledgeCheck` enhance engagement. A digital product builder provides a Canva-style editor with drag-and-drop, multi-select, undo/redo, 30 brand kit themes, AI image lab, multi-page AI content pagination, object grouping, and AI bundle/test bank generators. It features a premium design system with Canva-quality visuals, dual-tone top bars, accent strips, decorative elements, and 20+ Google Fonts, along with a watermarked PDF preview system for digital products.

### Technical Implementations
The frontend and backend are built with Vite, React, and Express 5 on Node.js with TypeScript. TanStack React Query manages server state via a RESTful API. Authentication uses username/password with session management. An admin-only content engine supports AI generation and internal linking. The subscription system includes regional pricing. Interactive learning modules cover Med Math, Clinical Calculations, Abnormal Lab Interpretation, Clinical Case Simulation, Medication Mastery Engine, and six clinical simulators. Content is region-aware with server-side detection. A mock exam engine offers timed exams with detailed reports and stratified random sampling, including a Strict Exam Mode. Admin features include a dashboard for analytics, content management, QC, and content intelligence. Additional features encompass OpenAI-powered blog automation, custom flashcards with AI checks, a custom i18n system for 15 languages with multilingual SEO, an Adaptive CAT Engine, a Pass Probability Projection Engine, and a Next Best Action Engine. Exam blueprints are database-driven. The system also includes a free diagnostic SEO funnel, a study workload calculator, revenue intelligence, language ROI scoring, SEO health checks, a public diagnostic exam, an auscultation audio library, an AI Medical Image Generator, and a MicroLecture Generator. A dual-path exam system supports REx-PN and NCLEX-RN, providing user downloads and education pathways.
The system uses Drizzle ORM with PostgreSQL, with schemas defined in `shared/schema.ts` and Zod for validation.
Lessons are organized by body system (RPN/LVN, RN, NP, Pharmacology) with pre/post-test questions. Each lesson contains 10 content sections with inline admin editing and AI generation. A flashcard system includes bookmarking and mastery tracking. Anatomy & Physiology detail pages cover 12 body systems. There are 27 interactive Pre-Nursing Foundations Program modules.
Exam question banks are standalone files in `client/src/data/exam-questions/` using the `ExamQuestion` interface `{ q, o, a, r, s }`. These are integrated into `client/src/lib/question-pool.ts` and are categorized by RPN, RN, and NP tiers with specific question counts and topics. NP questions use Canadian/SI units.
A 3-step onboarding process (Goal/Timeline, Domain Comfort Ratings, 12-question Knowledge Check) leads to a personalized study plan.
An admin-only QBank Factory (`/admin/qbank-factory`) enables creating, managing, and publishing question banks with configurable parameters, audit trails, and export gates. The Exam Factory tab generates multiple exam forms.
The Product Generator V2 (`/admin/generator-v2`) provides an isolated, chunked, and resumable question generation pipeline with server-enforced minimums (250 questions), various templates, multi-topic support, and tier-aware AI prompts. It includes AI prompt hardening against instruction echoing, a chunk retry system, JSON response cleaning, and 18 print-ready PDF themes. Questions can be reviewed and edited with validation, and an auto-listing feature generates product details for publishing with tiered pricing and bundle creation.
SEO silo pages (`/nclex-rn-practice-questions`, etc.) serve as rich content hubs with keyword targeting, live question bank stats, CTAs, related lessons, flashcard sections, internal links, FAQ JSON-LD, and Course JSON-LD. A Diagnostic Assessment System offers a 30-question mixed blueprint exam with AI-powered results. User statistics, study groups, friend system, peer comparison, site analytics, and a feedback system are also integrated.

## External Dependencies

### Database
- PostgreSQL
- Drizzle ORM

### Payment Processing
- Stripe (including Stripe Checkout)
- PayPal SDK

### Key npm Dependencies
- **UI**: shadcn/ui, Radix UI primitives, Lucide icons
- **Forms**: `react-hook-form`, `@hookform/resolvers`, Zod
- **Dates**: `date-fns`

### AI/Content Generation
- **OpenAI**: Used for blog posts, AI flashcards, lesson content, AI medical images (gpt-image-1), and micro-lectures.
- **5-Step Content Pipeline**: A multi-step AI pipeline (`/api/ai/generate-pipeline`) for cohesive content generation.
- **Test Bank Generator**: (`/api/ai/generate-test-bank`) ensures strict question count and JSON schema validation.

### Social Media
- Meta Graph API: For social media scheduling.