# NurseNest

### Overview
NurseNest is an adaptive learning platform for nursing and allied health students across 17 specializations. It offers comprehensive educational resources, advanced exam preparation (e.g., NCLEX, REX-PN), and detailed performance analytics. The platform utilizes AI for content generation to enhance clinical reasoning, nursing knowledge, and critical thinking, aiming to improve patient care outcomes and revolutionize nursing education. The project aspires to be a leader in health education technology.

### User Preferences
- Preferred communication style: Simple, everyday language.
- Admin accounts use JWT-based authentication (no hardcoded admin users).
- Copyright must show current year dynamically (uses `new Date().getFullYear()`).
- NO normal lab values on lesson pages - only abnormal clinical findings.
- Content depth: Multi-paragraph cellular/molecular pathophysiology, detailed drug MOA at receptor level.
- Scope enforcement: RPN "monitor/report/administer as ordered," RN protocol-based, NP "order/prescribe".
- Regional content: CA shows CAD prices/Canadian labs, US shows USD/US values.
- NCLEX disclaimer: NurseNest is NOT affiliated with NCLEX, NCSBN, CNO, or any regulatory body.
- Copy protection: content cannot be easily copied/screenshotted.

### System Architecture
NurseNest employs a modern web architecture featuring a React frontend (TypeScript, Wouter, shadcn/ui, Tailwind CSS v4) built with Vite, and an Express 5 backend (Node.js, TypeScript). Data is managed via TanStack React Query through a RESTful API and persisted in PostgreSQL using Drizzle ORM. The UI includes 24 themes, semantic CSS tokens, and DM Sans typography.

Key features include a database-driven subscription model with regional pricing, tiered access, Stripe-based lifetime purchases, and free trials. The platform provides interactive learning modules, a mock exam engine with stratified random sampling, and a comprehensive admin dashboard. AI integrations, managed by a centralized AI Provider Router, power blog automation, an Adaptive CAT Engine, Pass Probability Projection, a Next Best Action Engine, an AI Tutoring Assistant, and content generation with quality gates. Exam blueprints are database-driven, content is categorized by body system, and supports Next Generation NCLEX (NGN) question types, partial credit scoring, and a Spaced Repetition System. User access is dynamically controlled by subscription tier.

Core architectural components and design patterns include:
- **Learning & Exam Preparation**: Flashcards, Test/Question Bank, Adaptive Flashcard System, Clinical Vignette Generation, and a Mock Exam Engine (CAT & Practice modes) with an Exam Reliability System.
- **AI-Powered Study & Content**: AI Study Coaching & Course Generation, Exam Date AI Study Planner, AI-Powered Generation & Safety, context-aware AI Tutoring Assistant, and Bulk Question Bank Orchestrator.
- **Content & SEO Infrastructure**: Allied Health Encyclopedia, SEO Lesson Engine, Programmatic SEO, Multilingual SEO & Translation with build-blocking validation, Database-Driven Multi-Domain Sitemap, Internal Linking, and structured data generation.
- **User Experience & Engagement**: Dashboard Lifecycle Command Center, Global Report a Problem System, IndexedDB-based Offline Study, and LocalStorage-based Popup Suppression.
- **Multi-Profession Support**: Dynamic framework for new healthcare professions with specialized navigation and content.
- **Database Safety & Management**: PostgreSQL with Drizzle ORM, EnvironmentAwareContentWriteService, and a comprehensive Backup, Export & Restore Framework.
- **Content Integrity Engine**: Automated scanning, AI auto-repair, pre-publish validation, and manual review queue.
- **Explanation Engine**: Unified structured explanation storage with AI-powered batch generation and review.
- **Exam Readiness Predictor Engine**: Provides readiness scores, pass probability, and personalized recommendations.
- **Unified Question Schema & Country Adaptation**: `exam_questions` table extended for international fields, filtered by country, language, and licensing body.
- **Multilingual Content Management**: AI-powered batch translation of content with dedicated translation tables and build-blocking validation for coverage.
- **Taxonomy Protection System**: Strict taxonomy validation and normalization for content generation.
- **Content Publishing Audit**: Admin system for audit reports, quality fixes, coverage, and paywall enforcement, with an 8-section validation for unpublished content.
- **Clinical SEO Pages**: Database-driven clinical content pages for SEO.
- **Question Comments & Discussion**: Lightweight discussion system on practice questions with admin moderation.
- **Exam Reliability System**: Production-grade exam stability with question validation, pool health checks, quarantine, incident tracking, and error boundaries.
- **Ops Foundation & Audit Infrastructure**: Unified operational data layer with audit logging for all operator actions and role-based admin permissions. CSRF protection on admin mutation endpoints.
- **Subscription & Entitlement System**: Dedicated `user_subscriptions` table, JWT-based auth endpoints returning user, subscription, and entitlements. Stripe webhooks update subscription status.
- **Platform Resilience System**: Circuit breakers, feature flags, kill switches, health checks, rate limiting, load shedding, self-healing, emergency mode, and entitlement caching, with an Ops Dashboard.
- **Memory Protection & Auto-Recovery System**: RSS-based memory monitoring, load shedding for bulk AI POSTs, response size limiter, and client-side query caching with auto-retries.
- **Production Incident Monitoring System**: Unified monitoring and alerting via `server/incident-monitor.ts` with structured logging, deduplication, affected-user tracking, severity escalation, and Admin Incident Center.
- **Incident System & Correlation Engine**: Structured incident management with CRUD, timeline tracking, and correlation engine.
- **Performance Protection System**: Per-route response time metrics, slow DB query logging, server-side TTL caching, query timeouts, route priority tiers for load shedding, and admin performance dashboard.
- **Deployment Protection & Self-Healing**: Blue-green deployment health gate with post-deploy monitoring, auto-rollback alerts, and deploy freeze mechanism. Periodic self-healing checks for cache corruption, schema drift, and backups.
- **Schema Versioning**: `schema_version` field for all content types with version-aware normalizers and migration utilities.
- **Substitute Content Engine**: Automatically finds closest equivalent premium resource when primary content is unavailable.
- **Multilingual Content Schema & Admin Tooling**: Per-content-type translation tables with `translation_status_enum` tracking, admin tools for managing translation lifecycle, and i18n enforcement with build-blocking validation.
- **Exam Resilience Engine**: Production-grade backend resilience for the exam system with pre-publish validation, runtime normalization, versioned backup snapshots, circuit breaker logic, and server-side session recovery.
- **Cross-Platform Session Sync**: Dashboard "Continue Where You Left Off" widget surfaces in-progress sessions from `/api/session-checkpoint/active`. RecommendedWidget uses `/api/study-recommendations` instead of local computation. Lesson quiz completion persists to `/api/progress`. QBank exam detects prior checkpoints on load. StudyStreakWidget uses server streak data only.
- **Centralized Entitlement Resolver**: Single function `resolveEntitlement()` for all access sources.
- **Access Delivery Orchestrator**: Middleware factory `createAccessDeliveryOrchestrator()` for content delivery with automatic fallback chains.
- **Content Fault Isolation**: Component-level error boundaries and `SafeList`/`SafeRender` utilities prevent cascading failures.
- **Content-Type Fallback Renderers**: Complete fallback chains for major content types.
- **Runtime Language Safety & Monitoring**: Language isolation middleware enforces per-request language scoping on API responses.
- **Content Failover & Backup Pipeline**: 4-tier fallback delivery chain to prevent blank/broken content.
- **Abuse & Rate Limiting Protection**: Centralized abuse detection middleware with tiered escalation and reusable rate limiter factory.
- **Content Validation, Versioning & Quarantine System**: Publish-Time Validation Pipeline, Snapshot & Versioning System, and Content Quarantine System.
- **Incident Correlation & Weekly Resilience Report**: Automatic "what changed?" incident correlation with change tracking.
- **Content Publishing & Live Validation**: 8-section validation for unpublished content, metadata, and integrity.
- **Publish-Time Validation Gate & Backup Artifact Generation**: Strict publish-gate pipeline validating content and generating backup artifacts.
- **Cross-Platform Auth API**: Unified JWT-based auth for web/mobile supporting email/username login, password reset, and profile management.
- **Admin Security**: JWT-only admin auth, role-based access control, CSRF protection, rate limiting, and enhanced audit logging.
- **Last-Known-Good Content Versioning**: Immutable versioning for premium content with automatic failover.
- **Release Gate API**: Pre-deploy and pre-publish safety checks.
- **Content Health Score Engine**: 0-100 scoring engine with per-dimension breakdown.
- **VIP Subscriber Prioritization**: Middleware prioritizing paid subscriber requests under high load.
- **Chaos Testing & Disaster Recovery**: Configurable chaos engine with failure scenarios and DR readiness scoring.
- **Admin Reliability Dashboard**: Unified reliability monitoring dashboard.
- **Data Migration & Auto-Cleanup System**: Versioned migration framework with dry-run, validation, auto-rollback, and scheduled cleanup.
- **Observability, Telemetry & Revenue Protection**: Behavioral telemetry, time-travel debugging, and revenue protection dashboard.
- **Exam Load Failure Recovery Pipeline**: Multi-stage client-side recovery for exam loading failures.
- **Subscriber Rescue & Refund Prevention**: Admin tools for subscriber retention.
- **Cross-Platform Subscription & Entitlement Sync System**: Unified subscription management with mobile-ready API, webhook processing, and analytics.

### External Dependencies
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Payment Processing**: Stripe, PayPal SDK
- **AI/Content Generation**: Centralized AI Provider Router (integrating OpenAI, Ollama, vLLM, LM Studio, Anthropic)
- **Object Storage**: Replit Object Storage
- **Email**: Resend
- **SMS**: Twilio