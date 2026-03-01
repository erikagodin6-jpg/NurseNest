# NurseNest - Complete Nursing Learning Platform

## Overview
NurseNest is an interactive learning platform for RPN/LVN, RN, and NP students, offering comprehensive resources like lessons, flashcards, performance analytics, and exam preparation for NCLEX and REX-PN. It supports both US and Canadian nursing standards, focusing on clinical pathophysiology, medication safety, and condition recognition to enhance clinical reasoning. The platform features a digital study marketplace, AI-powered content generation for medical images and micro-lectures, and a dual-path exam system, aiming to improve nursing knowledge and patient care outcomes.

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
The platform uses React with TypeScript, Wouter for routing, shadcn/ui with Radix UI, and Tailwind CSS v4, supporting 20 themes with DM Sans typography. Content engagement is enhanced through `ContentGate` and interactive components like `PauseAndThink`, `ProgressiveDisclosure`, `CuriosityHook`, and `KnowledgeCheck`. A digital product builder offers a Canva-style editor with drag-and-drop, multi-select, undo/redo, 30 brand kit themes, AI image lab, multi-page AI content pagination, object grouping, and AI bundle/test bank generators. The platform incorporates a premium design system with Canva-quality visuals, dual-tone top bars, accent strips, decorative elements, and 20+ Google Fonts. A watermarked preview system generates PDF previews for digital products.

### Technical Implementations
The frontend and backend are built with Vite, React, and Express 5 on Node.js with TypeScript. TanStack React Query manages server state via a RESTful API. Authentication uses username/password with session management. An admin-only content engine supports AI generation and internal linking. A subscription system includes regional pricing. Interactive learning modules cover Med Math, Clinical Calculations, Abnormal Lab Interpretation, Clinical Case Simulation, Medication Mastery Engine, and six clinical simulators. Content is region-aware, with server-side detection and filtering. A mock exam engine provides timed exams with detailed reports and stratified random sampling, including a Strict Exam Mode. Admin features include a dashboard for analytics, content management, QC, and content intelligence. Other features include OpenAI-powered blog automation, custom flashcards with AI checks, a custom i18n system for 15 languages with multilingual SEO (1,170 pages), an Adaptive CAT Engine for ability estimation, a Pass Probability Projection Engine, and a Next Best Action Engine. Exam blueprints are database-driven. The system also includes a free diagnostic SEO funnel, a study workload calculator, revenue intelligence, language ROI scoring, SEO health checks, a public diagnostic exam, an auscultation audio library, an AI Medical Image Generator, and a MicroLecture Generator. A dual-path exam system supports REx-PN and NCLEX-RN, with user downloads and education pathways.

### Data Storage
The system uses Drizzle ORM with PostgreSQL, with schemas defined in `shared/schema.ts` and Zod for validation.

### Content Architecture
Lessons are organized by body system (RPN/LVN, RN, NP, Pharmacology) with pre/post-test questions. Each lesson contains 10 content sections with inline admin editing and AI generation. A flashcard system includes bookmarking and mastery tracking. Anatomy & Physiology detail pages cover 12 body systems. There are 27 interactive Pre-Nursing Foundations Program modules.

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
- **5-Step Content Pipeline**: A multi-step AI pipeline (`/api/ai/generate-pipeline`) for cohesive content generation in Guided Mode, covering strategy, page architecture, structured content generation, exam authority enhancement, and QA. Includes section validation with retry logic.
- **Test Bank Generator**: (`/api/ai/generate-test-bank`) ensures strict question count and JSON schema validation, with retry logic and audit checks before export or publishing.

### QBank Factory + Exam Factory (Admin)
- Admin QBank Factory (`/admin/qbank-factory`) allows creating, managing, and publishing question banks with configurable parameters like topic mix, difficulty, and question types. It includes a persistent audit panel and export gates. The Exam Factory tab enables generating multiple exam forms with specific lengths and rationales.

### Diagnostic Assessment System
- A 30-question mixed blueprint diagnostic exam (`/diagnostic-assessment`) provides AI-powered results, study plans, and domain/topic breakdown charts.

### User Stats + Study Groups
- User statistics (`/api/user-stats/:userId`) track progress and domain breakdown. Study groups can be created/joined, and remediation banks can be generated from weak topics.

### Friend System + Peer Comparison
- Includes tables for friend requests and connections, with per-question analytics for difficulty and user performance.

### Site Analytics & Feedback System
- Custom page view tracker, analytics API, and a feedback system.

### Social Media
- Meta Graph API: For social media scheduling.