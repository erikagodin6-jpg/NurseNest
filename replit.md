# NurseNest - Complete Nursing Learning Platform

### Overview
NurseNest is an adaptive learning platform for nursing and allied health students across 17 career verticals. It provides comprehensive learning resources, advanced exam preparation (e.g., NCLEX, REX-PN), and performance analytics. The platform utilizes AI for content generation to foster clinical reasoning, nursing knowledge, and critical thinking, ultimately aiming to enhance patient care outcomes. NurseNest aspires to be a market-leading, region-aware, and adaptive learning solution with a business vision to transform nursing education through technology, addressing a significant market need for flexible, high-quality, and adaptive learning tools.

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
The NurseNest platform is built with a React UI (TypeScript, Wouter, shadcn/ui, Tailwind CSS v4) and an Express 5 backend on Node.js (TypeScript), utilizing Vite for tooling. TanStack React Query manages server state via a RESTful API. The UI/UX features 24 themes with a centralized semantic CSS token system, DM Sans typography, premium visuals, and interactive components.

Core functionalities include a database-driven subscription model supporting regional pricing (CAD/USD), tier-based plans, lifetime one-time purchases via Stripe, and free trial usage caps. It offers interactive learning modules, a mock exam engine with stratified random sampling, and an admin dashboard. AI integrations power blog automation, an Adaptive CAT Engine, Pass Probability Projection, and a Next Best Action Engine, all routed through a centralized AI Provider Router. Exam blueprints are database-driven, and content is organized by body system, supporting NGN question types, partial credit scoring, and a Spaced Repetition System. Content access is managed by user tier.

Key architectural components and features:
- **Learning & Exam Preparation**: Includes Flashcards, Test Bank, Question Bank, Adaptive Flashcard System, Clinical Vignette Generation Engine, Mock Exam Engine (CAT & Practice modes), and an Adaptive Learning Engine.
- **AI-Powered Study & Content**: Features an AI Study Coaching & Course Generation System, Exam Date AI Study Planner, and an AI-Powered Generation & Safety system for content creation with quality gates.
- **Content & SEO**: Incorporates an Allied Health Encyclopedia, SEO Lesson Engine, Programmatic SEO Engines, Multilingual SEO & Translation System, Database-Driven Multi-Domain Sitemap Architecture, Internal Linking Engine, and an SEO Content Expansion System.
- **User Experience & Engagement**: Provides a Dashboard Lifecycle Command Center for adaptive user guidance and a Global Report a Problem System.
- **Multi-Profession Support**: A dynamic framework allows configuration of new healthcare professions with specific navigation and content, including specialized question banks for MLT, Surgical Technologist, Respiratory Therapy, and dedicated NP Exam Ecosystems.
- **Database Safety & Management**: Utilizes PostgreSQL with Drizzle ORM, supported by an EnvironmentAwareContentWriteService.
- **Business & Analytics**: Features a Content Analytics Engine, Admin Dashboard, SEO Performance & Growth Dashboard, Content Coverage Analyzer, Automated Content Growth Engine, Business Health & Subscriber Dashboard, and a Tier Health Dashboard & Expansion Watchlist (`/admin/tier-health`) showing per-tier question counts, staleness warnings, parsing failure logs, uncategorized question detection, low-volume alerts, ranked expansion watchlist with scoring, and AI question pool monitoring.
- **Offline Capabilities**: An IndexedDB-based Offline Study System for question packs and flashcards.
- **Universal Question Counting Engine**: A build-time manifest generator for public-facing question counts.
- **Specialized Content Modules**: Includes a Medical Imaging Lesson Library, Pharmacy Tech Question Bank, Herbal Supplements & Medication Safety Module, and SI Converter Cluster Pages, all with integrated SEO and specific functionalities.
- **SEO Infrastructure**: Implements 301 Redirect Middleware, structured data generation (Article, Course, MedicalCondition, FAQ schemas), thin content detection for noindexing, sitemap cleanup, and optimized meta title/description generation. Handles server-side status codes for 404s and manages `noindex, follow` for untranslated content.
- **Hero Page & Marketing Architecture**: Uses a centralized `platform-manifest.ts` for all marketing content, rendered by lazy-loaded React components.
- **Adaptive Study Engine**: Provides various study modes (`recommended`, `weak-areas`, `due-review`, `flagged`, `rapid`, `mixed`, `pre-exam`) with distinct routes, supporting free and paid user access.
- **Free Pass System**: Automatic 1-day free pass for new accounts with fraud detection.
- **Exam Follow-Up**: Post-exam follow-up system on the dashboard for result reporting and personalized next steps.
- **Career Question Banks**: Extensive question banks for MLT (Medical Laboratory Technologist), Surgical Technologist, and Respiratory Therapy (RRT) careers, including region-tagged content and calculation-heavy questions.
- **Certification Exam Bank Expansion**: Comprehensive certification exam preparation system at `/certification-exam-prep` covering 11 nursing certifications (BLS, ACLS, PALS, NRP, TNCC, ENPC, CCRN, CEN, OCN, CNOR, CPN). Includes 17,000+ practice questions, 33 mock exams, topic-specific question banks, 4 practice modes (Topic Practice, Algorithm Scenarios, Mixed Practice, Full Mock Exams), timed exam engine with performance breakdown, SATA multi-select question support, premium paywall gating, admin analytics tab, FAQ schema SEO, and multi-language support (EN/FR/ES). Key files: `client/src/data/certification-exam-data.ts`, `client/src/pages/certification-exam-prep-hub.tsx`, `client/src/pages/certification-exam-detail.tsx`, `client/src/pages/certification-practice.tsx`.
- **Herbal Supplements & Medication Safety Module**: Integrates 15 individual herb lessons, a hub overview, a surgery/anesthesia safety lesson, a 75+ question bank, and SEO educational pages.
- **SI Converter Cluster Pages**: 10 SEO content pages forming an internal linking cluster around an SI ↔ Conventional Units Converter hub, featuring educational content, mini converters, reference tables, and FAQ accordion.
- **International Nursing Hub**: Comprehensive SEO section at `/international-nurses` targeting internationally educated nurses (IENs). Includes hub page, 8 destination country pages (`/international-nurses/:country`), 8 migration pathway pages (e.g., `/philippines-to-canada`), 6 exam pages (NCLEX, REx-PN, IELTS, OET, credential assessment, license transfer), 3 country comparison pages, and 10 supporting content cluster pages. All pages use config-driven architecture with teal color scheme, FAQ schema, and breadcrumb navigation. Navigation link in ecosystem bar, sitemap entries, and SEO meta paths registered.
- **SEO Canonical & Indexing Infrastructure**: Shared utility for building canonical URLs, managing indexing policies (`noindex,follow` for utility pages in non-English locales), handling slug generation, and implementing timestamp redirects and hreflang filtering.
- **Popup Suppression System**: LocalStorage-based 24-hour suppression for various modals and toasts.
- **Question Explanation Engine**: Unified structured explanation storage (`question_explanations` table) across all question sources (exam_questions, allied_questions, imaging_questions). Features AI-powered batch generation via OpenAI, quality scoring (clarity/accuracy/depth/usefulness composite), review status workflow (pending/approved/flagged), and migration utility for existing rationale data. API endpoints: GET `/api/explanations/:source/:questionId`, POST `/api/explanations/generate-batch`, GET `/api/explanations/stats`, PATCH `/api/explanations/:id/review`, GET `/api/explanations/low-quality`, POST `/api/explanations/migrate`. `ACTIVE_BUILD_PRIORITY` set to `QUESTION_EXPLANATION_ENGINE` in admin AI config.

### External Dependencies
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Payment Processing**: Stripe, PayPal SDK
- **AI/Content Generation**: Centralized AI Provider Router (supports OpenAI, Ollama, vLLM, LM Studio, Anthropic)
- **Object Storage**: Replit Object Storage (Google Cloud Storage)