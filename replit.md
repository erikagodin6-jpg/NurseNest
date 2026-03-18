# NurseNest

### Overview
NurseNest is an adaptive learning platform for nursing and allied health students across 17 specializations. It offers comprehensive educational resources, advanced exam preparation (e.g., NCLEX, REX-PN), and performance analytics. The platform uses AI for content generation to enhance clinical reasoning, nursing knowledge, and critical thinking, aiming to improve patient care outcomes and transform nursing education through technology.

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
NurseNest utilizes a React UI (TypeScript, Wouter, shadcn/ui, Tailwind CSS v4) with an Express 5 backend on Node.js (TypeScript) and Vite. Server state is managed by TanStack React Query via a RESTful API. The UI supports 24 themes, semantic CSS tokens, and DM Sans typography. Data is stored in PostgreSQL with Drizzle ORM.

The platform includes a database-driven subscription model with regional pricing, tier-based plans, Stripe-based lifetime purchases, and free trial usage caps. It features interactive learning modules, a mock exam engine with stratified random sampling, and a comprehensive admin dashboard. AI integrations, routed through a centralized AI Provider Router, power features like blog automation, an Adaptive CAT Engine, Pass Probability Projection, a Next Best Action Engine, an AI Tutoring Assistant, and content generation with quality gates. Exam blueprints are database-driven, content is organized by body system, and supports Next Generation NCLEX (NGN) question types, partial credit scoring, and a Spaced Repetition System. Content access is controlled by user tier.

Key architectural features:
- **Learning & Exam Preparation**: Flashcards, Test Bank, Question Bank, Adaptive Flashcard System, Clinical Vignette Generation Engine, and a Mock Exam Engine (CAT & Practice modes). Supports 12+ nursing certifications with over 62,000 practice questions and 1,800+ NGN case sets.
- **AI-Powered Study & Content**: AI Study Coaching & Course Generation, Exam Date AI Study Planner, AI-Powered Generation & Safety system for content creation, context-aware AI Tutoring Assistant, and Bulk Question Bank Orchestrator.
- **Content & SEO Infrastructure**: Allied Health Encyclopedia, SEO Lesson Engine, Programmatic SEO Engines, Multilingual SEO & Translation System, Database-Driven Multi-Domain Sitemap Architecture, Internal Linking Engine, SEO Content Expansion System, Clinical Calculators, Study Guides, Scenarios, and Terminology Hubs.
- **SEO Content Hub Architecture**: Reusable, database-driven hub page system for REx-PN, NCLEX-RN, and NP Exams, featuring structured content, FAQs, internal links, and references.
- **User Experience & Engagement**: Dashboard Lifecycle Command Center, Global Report a Problem System, IndexedDB-based Offline Study System, and LocalStorage-based Popup Suppression System.
- **Multi-Profession Support**: Dynamic framework for configuring new healthcare professions with specialized navigation and content, including question banks for MLT, Surgical Technologist, and Respiratory Therapy.
- **Database Safety & Management**: PostgreSQL with Drizzle ORM, EnvironmentAwareContentWriteService, and a Backup Export & Disaster Recovery System.
- **Unified Pricing Page**: All pricing models are consolidated into a single `/pricing` page with dynamic section tabs.
- **Business & Analytics**: Content Analytics Engine, Admin Dashboard, SEO Performance & Growth Dashboard, Content Coverage Analyzer, Automated Content Growth Engine, Business Health & Subscriber Dashboard, Tier Health Dashboard, Content Integrity Engine Dashboard, and New Grad Analytics Dashboard.
- **Content Integrity Engine**: Automated content scanning, AI auto-repair, pre-publish validation, and scheduled jobs for content quality assurance. Includes a Deep Rationale Upgrade system for structured rationales.
- **Question-Driven SEO Blog Pipeline**: Automated gap analysis and question-driven blog generation with internal linking.
- **Explanation Engine**: Unified structured explanation storage with AI-powered batch generation, quality scoring, and review workflow.
- **Exam Readiness Predictor Engine**: Provides readiness scores, pass probability, percentile benchmarking, and personalized recommendations.
- **Unified Question Schema & Country Adaptation**: `exam_questions` table extended with international fields, supporting filtering by country, language, and licensing body.
- **Multilingual Exam Question Translation Pipeline**: AI-powered batch translation of exam questions into 8 priority languages, leveraging a `content_translations` table.
- **Taxonomy Protection System**: Strict taxonomy validation and normalization layer for content generation.
- **Admin Purchase Notifications**: Real-time email (Resend) and SMS (Twilio) alerts on purchase events, configurable via an admin UI.
- **Content Publishing Audit**: Admin-only system for comprehensive audit reports and quality fixes for published content.
- **Clinical SEO Pages**: Database-driven clinical content pages for SEO across 5 content types (Conditions, Symptoms, Medications, Lab Values, Comparisons).
- **Content Publishing & Live Validation**: Comprehensive 8-section validation system for content, ensuring quality, metadata integrity, and proper access control before publishing.
- **Question Comments & Discussion**: Lightweight discussion system on practice questions, allowing users to comment, vote, and flag content, with admin moderation.

### External Dependencies
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Payment Processing**: Stripe, PayPal SDK
- **AI/Content Generation**: Centralized AI Provider Router (OpenAI, Ollama, vLLM, LM Studio, Anthropic)
- **Object Storage**: Replit Object Storage (Google Cloud Storage)
- **Email**: Resend
- **SMS**: Twilio