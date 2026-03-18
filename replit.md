### Overview
NurseNest is an adaptive learning platform for nursing and allied health students across 17 specializations. It provides comprehensive educational resources, advanced exam preparation (e.g., NCLEX, REX-PN), and performance analytics. The platform utilizes AI for content generation to enhance clinical reasoning, nursing knowledge, and critical thinking, aiming to improve patient care outcomes and address the significant market demand for high-quality educational tools. NurseNest aims to be a leading, region-aware, adaptive learning solution, transforming nursing education through technology.

### User Preferences
- Preferred communication style: Simple, everyday language.
- Admin account: user "erikanim" has tier="admin" with full content access bypass.
- Copyright must show current year dynamically (uses `new Date().getFullYear()`).
- NO normal lab values on lesson pages - only abnormal clinical findings.
- Content depth: Multi-paragraph cellular/molecular pathophysiology, detailed drug MOA at receptor level.
- Scope enforcement: RPN "monitor/report/administer as ordered," RN protocol-based, NP "order/prescribe".
- Regional content: CA shows CAD prices/Canadian labs, US shows USD/US values.
- NCLEX disclaimer: NurseNest is NOT affiliated with NCLEX, NCSBN, CNO, or any regulatory body.
- Copy protection: content cannot be easily copied/screenshotted.

### System Architecture
NurseNest is built with a React UI (TypeScript, Wouter, shadcn/ui, Tailwind CSS v4) and an Express 5 backend on Node.js (TypeScript), using Vite. Server state is managed by TanStack React Query via a RESTful API. Data persistence uses PostgreSQL with Drizzle ORM.

The platform includes a database-driven subscription model with regional pricing, tier-based plans, Stripe-based lifetime purchases, and free trial usage caps. It offers interactive learning modules, a mock exam engine, and an admin dashboard. AI integrations, managed by a centralized AI Provider Router, power features like blog automation, an Adaptive CAT Engine, Pass Probability Projection, a Next Best Action Engine, an AI Tutoring Assistant, and content generation with quality gates. Exam blueprints are database-driven, supporting Next Generation NCLEX (NGN) question types, partial credit scoring, and a Spaced Repetition System. Content access is controlled by user tier.

Key architectural features include:
- **Learning & Exam Preparation**: Flashcards, Test Bank, Question Bank, Adaptive Flashcard System, Clinical Vignette Generation Engine, Mock Exam Engine (CAT & Practice modes), and an Adaptive Learning Engine. It supports 12+ nursing certifications with over 62,000 practice questions, 1,800+ NGN case sets, 37,800+ flashcards, and 33 mock exams across various NP pathways.
- **AI-Powered Study & Content**: AI Study Coaching & Course Generation System, Exam Date AI Study Planner, AI-Powered Generation & Safety system for content creation, context-aware AI Tutoring Assistant, and a Bulk Question Bank Orchestrator.
- **Content & SEO Infrastructure**: Features an Allied Health Encyclopedia, SEO Lesson Engine, Programmatic SEO, Multilingual SEO & Translation, Database-Driven Multi-Domain Sitemap, Internal Linking Engine with cross-type clinical relationships (medication↔lab-value↔condition) and synonym-aware matching, SEO Content Expansion, Clinical Calculators, and various content hubs (e.g., Nursing Study Guides, Clinical Scenarios, REx-PN Content Hub). It implements 301 Redirect Middleware, structured data generation (Article, Course, MedicalCondition, FAQ schemas), thin content detection, sitemap cleanup, and E-E-A-T trust signals.
- **SEO Content Hub Architecture**: Reusable, database-driven hub page system for REx-PN, NCLEX-RN, and NP Exams, supporting various content types with JSONB sections, FAQs, internal links, and references. It includes content quality validation, structured data, CTA components, practice question previews, medical review attribution, and automatic sitemap integration.
- **User Experience & Engagement**: Dashboard Lifecycle Command Center, Global Report a Problem System, IndexedDB-based Offline Study System, and a LocalStorage-based Popup Suppression System.
- **Multi-Profession Support**: Dynamic framework for configuring new healthcare professions with specialized navigation and content, including question banks for MLT, Surgical Technologist, Respiratory Therapy, and dedicated NP Exam Ecosystems.
- **Database Safety & Management**: PostgreSQL with Drizzle ORM, EnvironmentAwareContentWriteService, and a Backup Export & Disaster Recovery System.
- **Unified Pricing Page**: Consolidates all pricing into a single `/pricing` page with section tabs, redirecting legacy pricing routes.
- **Business & Analytics**: Content Analytics Engine, Admin Dashboard, SEO Performance & Growth Dashboard, Content Coverage Analyzer, Automated Content Growth Engine, Business Health & Subscriber Dashboard, Tier Health Dashboard, Content Integrity Engine Dashboard, and a New Grad Analytics Dashboard. Admin tools for AI Tutor management and backup systems.
- **Content Integrity Engine**: Automated content scanning, AI auto-repair, pre-publish validation, and scheduled jobs for content. Includes an audit log with rollback and a manual review queue. It also features a Deep Rationale Upgrade system for non-CAT questions.
- **Question-Driven SEO Blog Pipeline**: Automated gap analysis and question-driven blog generation with internal linking to related content.
- **Explanation Engine**: Unified structured explanation storage with AI-powered batch generation, quality scoring, and a review workflow.
- **Exam Readiness Predictor Engine**: Provides readiness scores, pass probability, percentile benchmarking, weak topic detection, and personalized recommendations.
- **Unified Question Schema & Country Adaptation**: `exam_questions` table extended with international fields, and `country-adaptation.ts` maps country codes to specific regional data.
- **Multilingual Exam Question Translation Pipeline**: AI-powered batch translation of over 13,000 exam questions into 8 priority languages, preserving medical terminology and featuring quality checks and an admin dashboard.
- **Taxonomy Protection System**: Strict taxonomy validation and normalization for content generation, including topic normalization with synonym mapping.
- **Admin Purchase Notifications**: Real-time email (Resend) and SMS (Twilio) alerts on purchase events, configured via the admin dashboard.
- **Content Publishing Audit**: Admin-only content audit system providing reports on content quality, coverage, and paywall enforcement, with an option to fix quality issues.
- **Clinical SEO Pages**: Database-driven clinical content pages for SEO across 5 types (Conditions, Symptoms, Medications, Lab Values, Comparisons), each featuring medical review badges, references, structured data, practice questions, and breadcrumbs.
- **Question Comments & Discussion**: Lightweight, flat-thread discussion system for practice questions, allowing users to post, vote, and flag comments, with admin moderation.

### Content Publishing & Live Validation
Comprehensive validation system at `server/content-publishing-validator.ts` with 8-section validation:
1. **Unpublished Content**: Finds approved questions/flashcards ready for publishing, bulk-updates them (supports dry-run mode)
2. **Question Metadata**: Validates rationale (non-CAT), body_system, topic, options count, correct_answer, exam tag matching TIER_EXAM_MAP
3. **Duplicate Stems**: Detects exact duplicate stems and content_hash duplicates, optionally disables them
4. **CAT Rationale**: Verifies CAT-eligible questions don't expose rationale during active exams (exam-set endpoint uses `mode` param)
5. **Exam Page Routes**: Checks all tier/topic/exam/flashcard routes have published content (not empty states)
6. **Flashcard Linkage**: Validates deck-card relationships, orphaned cards, tier assignments, flashcard_bank entries
7. **Tier Access Control**: Programmatically verifies canUserAccessTier, getAllowedExamTiers, getAllowedContentTiers hierarchies
8. **Content Integrity**: Runs lightweight content scan via content-integrity-scanner
API endpoints (all admin-only):
- `POST /api/admin/content-publishing/validate` — Full 8-section validation (supports `dryRun`, `removeDuplicates`, `sections[]`)
- `POST /api/admin/content-publishing/publish-approved` — Bulk publish all approved content
- `POST /api/admin/content-publishing/remove-duplicates` — Find and disable duplicate stems/hashes
- `GET /api/admin/content-publishing/tier-check` — Verify tier access control hierarchy
- `GET /api/admin/content-publishing/cat-rationale-check` — Verify CAT exam rationale behavior
- `GET /api/admin/content-publishing/route-check` — Check exam page routes for content
- `GET /api/admin/content-publishing/summary` — Content status summary by tier/status
CAT rationale fix: `server/qbank-api.ts` exam-set endpoint only includes rationale/correctAnswerExplanation/distractorRationales for admin users. Non-admin users never receive rationale in exam-set responses regardless of query params — rationale is only available through `POST /api/qbank/attempt` after answer submission.

### PTA Programmatic SEO Content System
22 rich educational content pages organized into 4 content clusters (Conditions, Exercises, Anatomy & Movement, Modalities & Protocols) plus 3 blog-style SEO articles for PTA exam prep. Each content page features:
- Embedded practice questions (first 3 free, remaining locked/blurred with conversion CTA)
- FAQ accordion with FAQPage structured data
- Article + EducationalOrganization + BreadcrumbList structured data
- Internal linking engine (RelatedTopicsBlock) connecting pages across clusters
- Mid-page and end-page conversion CTAs to practice questions and pricing
- Cluster navigation badges and content exploration sections

Key files:
- `client/src/allied/data/pta-seo-content-data.ts` — Content data for all 22 pages + 3 blog pages
- `client/src/allied/pages/pta-seo-content-page.tsx` — Template components (PtaSeoContentPage + PtaBlogPage)
- Routes: `/allied-health/physiotherapy-assistant/guide/:slug` with PtaGuideRouter dispatching to content or blog template
- Sitemap: 25 URLs registered in `server/sitemap/allied-site.ts` under `generateAlliedSeoLanding()`

### External Dependencies
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Payment Processing**: Stripe, PayPal SDK
- **AI/Content Generation**: Centralized AI Provider Router (supports OpenAI, Ollama, vLLM, LM Studio, Anthropic)
- **Object Storage**: Replit Object Storage (Google Cloud Storage)
- **Email**: Resend
- **SMS**: Twilio