# NurseNest - Complete Nursing Learning Platform

## Overview
NurseNest is an adaptive learning platform for nursing and allied health students across 17 career verticals. It provides comprehensive learning resources, advanced exam preparation (e.g., NCLEX, REX-PN), and performance analytics. The platform utilizes AI for content generation to develop clinical reasoning, nursing knowledge, and critical thinking, with the aim of improving patient care outcomes through a region-aware and adaptive learning environment. NurseNest's vision is to be a complete, market-leading learning solution.

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
The platform features a modern React UI (TypeScript, Wouter, shadcn/ui, Tailwind CSS v4) and an Express 5 backend on Node.js (TypeScript). Vite is used for tooling, and TanStack React Query manages server state via a RESTful API. The UI/UX includes 20 themes, DM Sans typography, premium visuals, and interactive components like `ContentGate` and `KnowledgeCheck`. An integrated digital product builder offers a Canva-style drag-and-drop interface with AI-powered content generation.

The core technical implementation includes a subscription model with regional pricing, interactive learning modules, a mock exam engine with stratified random sampling, and an admin dashboard. AI integrations drive blog automation, an Adaptive CAT Engine, Pass Probability Projection, and a Next Best Action Engine. Exam blueprints are database-driven, and content is organized by body system. The system supports NGN question types, partial credit scoring, and a Spaced Repetition System. Content access is managed by user tier (free, rpn, rn, np, admin).

Key systems and engines include:
- **Question Bank / Test Bank System**: Supports various study modes, JSON import, inline editing, timed exams, and analytics, ensuring content safety by user tier and region.
- **Adaptive Flashcard System**: Tier-specific, exam-style flashcards with an adaptive review engine and confidence-based scheduling.
- **Clinical Vignette Generation Engine**: Admin-triggered batch generation of clinical vignette-style exam questions across all nursing tiers, with AI for content, image matching, and lesson linking.
- **Allied Health Encyclopedia System**: Over 1,500 structured topic entries across 8 professions, including an automated cross-profession knowledge graph linking.
- **Adaptive Learning Engine (v2)**: Tracks granular learning progress, uses weighted priority scoring, a 5-state mastery model, and spaced repetition.
- **AI Study Coaching & Course Generation System**: Provides personalized study coaching, topic mastery scoring, exam readiness assessment, and dynamic study plan generation.
- **Programmatic SEO Engines**: Includes a Quiz Engine and a Page Expansion Engine for auto-generating indexable page variants and practice question pages.
- **Multilingual SEO & Translation System**: Manages server-rendered hreflang/canonical tags, locale-aware meta injection, and multilingual sitemap generation.
- **Lesson Title Canonicalization System**: Standardizes lesson naming using aliases.
- **Cross-Platform Analytics Tracking**: Tracks user flow between platform sections (`exam_prep`, `new_grad`, `career_tools`, `allied_health`) and transition events.
- **New Grad Career Platform**: A multi-profession career hub with resources and lead capture.
- **Premium Study Engine**: Backend APIs for question bookmarks, custom practice sessions, unified adaptive question selection, enhanced streak tracking, and detailed mock exam reports.
- **Adaptive Practice & Mastery Systems**: Tailored for Pharmacy Tech, Paramedic, and MLT.
- **Medical Imaging Education System**: Exam prep for CAMRT/ARRT, including lessons, positioning guides, micro-quizzes, and an adaptive exam simulator.
- **Clinical Case Study Engine**: Manages multi-stage clinical case studies with decision points and scoring.
- **Question Bank Expansion Engine**: Large-scale AI-powered question generation across nursing domains, with duplicate prevention and CAT exam compatibility.
- **Email Marketing Network**: Cross-platform email subscription categories with contextual signup forms and preference management.
- **Offline Study System**: IndexedDB-based offline storage for question packs and flashcard decks with sync capabilities.
- **Multi-Profession Framework**: Dynamic system for adding and configuring new healthcare professions.
- **Universal Question Bank Importer**: Bulk question import supporting CSV, JSON, and XLSX.
- **Allied Health Marketing & SEO Ecosystem**: Comprehensive marketing infrastructure across 8 allied health professions, including SEO blog templates, authority pages, and social media content.
- **Lead Capture Funnels**: Contextual lead capture forms (`InlineLeadCapture`, `EndOfContentLeadCapture`, `StickyLeadBanner`, `BlogInlineLeadCapture`) for different lead magnet types, capturing profession context.
- **Conversion Funnel System**: Reusable components (`ConversionFunnel`, `InlinePracticePreview`, `MockExamTeaser`) integrated across various content types for user conversion.
- **Career Journey Funnel Pages**: Guided pathway pages walking users through the student-to-professional pipeline, with generic and profession-specific variants.
- **Clinical Specialty Hub Pages**: 16 individual specialty hub pages (ICU, Pediatric ICU, NICU, Med-Surg, Orthopedics, Mental Health, Nephrology, Labor & Delivery, Postpartum, Neurology, Palliative Care, Trauma, Public Health, Community Nursing, Long-Term Care, Rehabilitation) with matching SEO landing pages, structured data, and FAQ sections.

The platform utilizes PostgreSQL with Drizzle ORM for database management.

## External Dependencies
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Payment Processing**: Stripe, PayPal SDK
- **AI/Content Generation**: OpenAI
- **Social Media**: Meta Graph API
