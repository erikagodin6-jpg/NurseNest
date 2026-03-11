# NurseNest - Complete Nursing Learning Platform

## Overview
NurseNest is an adaptive learning platform for nursing and allied health students across 17 career verticals. It provides comprehensive learning resources, exam preparation (e.g., NCLEX, REX-PN), performance analytics, and AI-powered content generation. The platform aims to enhance clinical reasoning, nursing knowledge, and critical thinking, ultimately improving patient care outcomes through a region-aware and robust learning environment.

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
The platform uses React with TypeScript, Wouter for routing, shadcn/ui with Radix UI, and Tailwind CSS v4, supporting 20 themes and DM Sans typography. Key UI components include `ContentGate`, `PauseAndThink`, `ProgressiveDisclosure`, `CuriosityHook`, and `KnowledgeCheck`. A digital product builder offers a Canva-style editor with drag-and-drop, AI image, and content generation. The design system features premium visuals, dual-tone top bars, and watermarked PDF previews. Global CSS enforces `overflow-x: hidden` and `box-sizing: border-box`. Dialogs are designed for mobile safety.

### Technical Implementations
Built with Vite, React, and Express 5 on Node.js with TypeScript, the application uses TanStack React Query for server state management via a RESTful API. Authentication is username/password-based with session management, and a subscription system supports regional pricing. Core features include interactive learning modules, a mock exam engine with stratified random sampling and Strict Exam Mode, and an admin dashboard. AI integrations include OpenAI for blog automation, custom i18n for 15 languages, an Adaptive CAT Engine, Pass Probability Projection Engine, and Next Best Action Engine. Exam blueprints are database-driven, and content is organized by body system for various nursing levels, incorporating pre/post-test questions. The platform includes a 3-step onboarding process for personalized study plans, admin tools for AI-driven content generation (QBank Factory, Product Generator V2), and programmatic SEO for practice question pages. It supports NGN question types, a partial credit scoring engine, and a Spaced Repetition System. Content access is controlled via a tier system (free, rpn, rn, np, admin).

### Feature Specifications
- **Question Bank System**: Supports Admin, Exam, Study, and Browse modes with JSON import, inline editing, status toggling, timed exams, and analytics. Enforces content safety rules based on user tier and region.
- **Paramedic EMS Scenario Simulation System**: Manages interactive paramedic scenarios with detailed dispatch, assessment, decision points, and debriefing. Scenarios are segmented by content domain, profession track, region, visibility, difficulty, and exam relevance.
- **Referral Discount System**: Users generate unique referral codes for friends to receive a 15% discount, and referrers earn 7 free premium days. The system tracks usage and integrates with Stripe.
- **Beta Tester Access Code Management**: Admin dashboard functionality for generating, managing, and tracking beta invite codes with customizable tiers, usage limits, and durations.
- **Paramedic Landing & Hub Pages**: Dedicated SEO-optimized pages for paramedic careers, including landing pages, exam-specific pages (PCP, ACP, NREMT), and content hubs for lessons, exams, flashcards, and scenarios.
- **SEO Page System**: Dynamically generates landing pages for mock exams, hub pages for nursing certifications, and dedicated pages for medical conditions, medications, and lab values, all with structured data and comprehensive SEO metadata.
- **Paramedic SEO Content Engine**: Generates and manages various SEO content types (Topic, Category, Glossary, Comparison, Study Guides) for paramedic content, supporting internal linking and structured data.
- **MLT Exam Engines**: Provides four modes: Canada CSMLS Exam, USA ASCP CAT Exam, Adaptive Practice, and customizable Practice Exam, featuring IRT-based ability estimation and CAT stop logic.
- **MLT Lab Image & Microscopy System**: Manages lab image metadata, relational linking to questions/flashcards/lessons, and user drill practice history, including an Admin Image Library.
- **Blog Batch Generator**: Automates the generation of blog posts via OpenAI.
- **MLT Admin Content Studio**: Comprehensive admin interface for managing MLT content (questions, flashcards, lessons) with CRUD operations, bulk import, validation, and content distribution dashboards.
- **MLT Student Dashboard**: A 9-tab dashboard for MLT certification candidates covering Overview, Exams, Flashcards, Lessons, Performance, Wrong Answers, and Study Plan, with domain mastery heatmap and remediation actions.
- **Clinical Case Study Engine**: Manages multi-stage clinical case studies with decision points, exhibit data (vitals, labs, notes), various question types, and per-question scoring with partial credit.

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