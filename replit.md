# NurseNest

### Overview
NurseNest is an adaptive learning platform for nursing and allied health students across 17 specializations. It offers comprehensive educational resources, advanced exam preparation (e.g., NCLEX, REX-PN), and detailed performance analytics. The platform uses AI for content generation to enhance clinical reasoning, nursing knowledge, and critical thinking, aiming to improve patient care outcomes and revolutionize nursing education. The project's vision is to become a leader in health education technology.

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
NurseNest employs a modern web architecture featuring a React frontend (TypeScript, Wouter, shadcn/ui, Tailwind CSS v4) built with Vite, and an Express 5 backend (Node.js, TypeScript). Data is managed via TanStack React Query through a RESTful API and stored in PostgreSQL using Drizzle ORM. The UI includes 24 themes, semantic CSS tokens, and DM Sans typography.

Key features include a database-driven subscription model with regional pricing, tiered access, Stripe-based lifetime purchases, and free trials. The platform offers interactive learning modules, a mock exam engine with stratified random sampling, and a comprehensive admin dashboard. AI integrations, managed by a centralized AI Provider Router, power functionalities such as blog automation, an Adaptive CAT Engine, Pass Probability Projection, a Next Best Action Engine, an AI Tutoring Assistant, and content generation with quality gates. Exam blueprints are database-driven, content is categorized by body system, and supports Next Generation NCLEX (NGN) question types, partial credit scoring, and a Spaced Repetition System. User access is dynamically controlled by subscription tier.

Core architectural components and design patterns emphasize:
- **Learning & Exam Preparation**: Features like Flashcards, Test/Question Bank, Adaptive Flashcard System, Clinical Vignette Generation, and a Mock Exam Engine (CAT & Practice modes) with an Exam Reliability System.
- **AI-Powered Study & Content**: AI Study Coaching & Course Generation, Exam Date AI Study Planner, AI-Powered Generation & Safety, context-aware AI Tutoring Assistant, and Bulk Question Bank Orchestrator.
- **Content & SEO Infrastructure**: Allied Health Encyclopedia, SEO Lesson Engine, Programmatic SEO, Multilingual SEO & Translation, Database-Driven Multi-Domain Sitemap, Internal Linking, and structured data generation.
- **User Experience & Engagement**: Dashboard Lifecycle Command Center, Global Report a Problem System, IndexedDB-based Offline Study, and LocalStorage-based Popup Suppression.
- **Multi-Profession Support**: A dynamic framework to support new healthcare professions with specialized navigation and content.
- **Database Safety & Management**: PostgreSQL with Drizzle ORM, EnvironmentAwareContentWriteService, and a comprehensive Backup, Export & Restore Framework.
- **Content Integrity Engine**: Automated scanning, AI auto-repair, pre-publish validation, and manual review queue to maintain content quality.
- **Explanation Engine**: Unified structured explanation storage with AI-powered batch generation and review.
- **Exam Readiness Predictor Engine**: Provides readiness scores, pass probability, and personalized recommendations.
- **Unified Question Schema & Country Adaptation**: `exam_questions` table extended for international fields, filtered by country, language, and licensing body.
- **Multilingual Content Management**: AI-powered batch translation of content with dedicated translation tables and build-blocking validation.
- **Taxonomy Protection System**: Strict taxonomy validation and normalization for content generation.
- **Content Publishing Audit**: Admin system for audit reports, quality fixes, coverage, and paywall enforcement, with an 8-section validation for unpublished content.
- **Clinical SEO Pages**: Database-driven clinical content pages for SEO.
- **Question Comments & Discussion**: Lightweight discussion system on practice questions with admin moderation.
- **Exam Reliability System**: Production-grade exam stability with question validation, pool health checks, quarantine, incident tracking, error boundaries, and API normalization.
- **Ops Foundation & Audit Infrastructure**: Unified operational data layer with audit logging service for all operator actions. Role-based admin permissions via `requireAdminRole()` middleware. CSRF protection on all admin mutation endpoints. Structured audit entries for sensitive platform operations.
- **Cross-Platform REST API**: Dedicated route files for test banks (`server/test-bank-api.ts`) and CAT exam sessions (`server/cat-session-api.ts`), plus enhanced mock exam and lesson endpoints in `server/cross-platform-api.ts`. All endpoints enforce auth, entitlement/tier gating, write to `unified_question_history`, log analytics events to `analytics_events`, and include idempotency protections. Test bank endpoints at `/api/test-banks/...`, CAT endpoints at `/api/cat-exams/...`, V1 endpoints at `/api/v1/...`.
- **Subscription & Entitlement System**: Dedicated `user_subscriptions` table with comprehensive plan details. Auth endpoints manage user authentication and entitlements. Stripe webhooks update subscription status.
- **Platform Resilience System**: Enterprise-grade infrastructure providing circuit breakers, feature flags, kill switches, health checks, rate limiting, load shedding, self-healing, emergency mode, and entitlement caching. Includes scope isolation, progressive degradation, graceful timeout, stuck state detection, and performance/scale protection. An Ops Dashboard provides a single-screen platform health overview.
- **Memory Protection & Auto-Recovery System**: RSS-based memory monitoring with configurable thresholds. Load shedding middleware blocks bulk AI POSTs and caps list pagination under pressure. Response size limiter caps JSON responses. Cleanup sweeps prune stale sessions and caches. Frontend uses staleTime/gcTime for queryClient, auto-retries on 503, and an incident banner.
- **Production Incident Monitoring System**: Unified monitoring and alerting via `server/incident-monitor.ts` with structured `logIncident()`, unique IDs, deduplication, affected-user tracking, severity escalation, DB persistence, and notification hooks. An Admin Incident Center provides an overview.
- **Incident System & Correlation Engine**: Structured incident management with CRUD operations, timeline tracking, and a correlation engine that scores recent changes against incident start times. Auto-detects incidents from resilience events.
- **Performance Protection System**: Production-grade performance instrumentation providing per-route response time metrics, slow DB query logging, server-side in-memory TTL caching, statement-level query timeouts, route priority tiers for load shedding, and an admin performance dashboard. Non-critical UI elements are deferred.
- **Deployment Protection & Self-Healing**: Blue-green deployment health gate with post-deploy monitoring, configurable monitoring window, and auto-rollback alerts. A deploy freeze mechanism activates on instability. Periodic self-healing checks run for cache corruption, schema drift, and missing backups.
- **Schema Versioning**: All content types include a `schema_version` field. Version-aware normalizers handle legacy formats. A migration utility upgrades old records.
- **Substitute Content Engine**: Automatically finds and offers the closest equivalent premium resource when primary content is unavailable, logging all substitution events.
- **Multilingual Content Schema (Phase 1)**: Per-content-type translation tables with `translation_status_enum` and `source_version` tracking. English content backfilled as `approved`.
- **Multilingual Admin Audit & Completeness Tooling (Phase 3)**: Admin-facing tools for managing multilingual content lifecycle using per-content-type translation tables.
- **i18n Enforcement & Build Tooling**: Compile script for extracting translations, missing key tracking with reporting, a missing key API, and a fallback overlay for development. Build-blocking validation scripts ensure translation coverage and prevent hardcoded strings. Runtime i18n enforcement replaces silent English fallbacks with `TRANSLATION_UNAVAILABLE_MARKER`.
- **Exam Resilience Engine**: Production-grade backend resilience for the exam system including pre-publish validation, runtime normalization, versioned backup snapshots, circuit breaker logic, server-side session recovery, static backup payloads, and admin monitoring/alerting APIs.
- **Cross-Platform Session Sync**: Dashboard "Continue Where You Left Off" widget surfaces in-progress sessions from `/api/session-checkpoint/active`. RecommendedWidget uses `/api/study-recommendations` instead of local computation. Lesson quiz completion persists to `/api/progress`. QBank exam detects prior checkpoints on load. StudyStreakWidget uses server streak data only.
- **Centralized Entitlement Resolver**: Single function `resolveEntitlement(userId, productType, productId)` returns a normalized `EntitlementDecisionObject` handling all access sources.
- **Access Delivery Orchestrator**: Middleware factory `createAccessDeliveryOrchestrator()` wraps content delivery endpoints with an automatic fallback chain (primary → safe fallback → last-known-good → backup snapshot → substitute equivalent → static fallback).
- **Content Fault Isolation**: Component-level error boundaries (`ContentItemBoundary`, `WidgetBoundary`, `MediaBoundary`) and `SafeList`/`SafeRender` utilities prevent cascading failures.
- **Content-Type Fallback Renderers**: Complete fallback chains for every major content type (CAT, Flashcard, Lesson, Download).
- **Runtime Language Safety & Monitoring**: Language isolation middleware enforces per-request language scoping on all API responses. Structured logging tracks validation failures and language mismatches.
- **Content Failover & Backup Pipeline**: Ensures no paying user sees blank/broken content via a 4-tier fallback delivery chain.
- **Abuse & Rate Limiting Protection**: Centralized abuse detection middleware with tiered escalation, IP/UA bot heuristics, and reusable rate limiter factory.
- **Content Validation, Versioning & Quarantine System**: Three interconnected systems for content reliability: Publish-Time Validation Pipeline, Snapshot & Versioning System, and Content Quarantine System.
- **Incident Correlation & Weekly Resilience Report**: Automatic "what changed?" incident correlation with change tracking (deploys, content publishes, feature flags, kill switches, config changes, schema migrations) and confidence-scored correlation matching.
- **Content Publishing & Live Validation**: Comprehensive 8-section validation system (`server/content-publishing-validator.ts`) for unpublished content, metadata, duplicates, CAT rationale, exam page routes, flashcard linkage, tier access control, and content integrity.
- **Publish-Time Validation Gate & Backup Artifact Generation**: Strict publish-gate pipeline (`server/publish-gate.ts`) validates content and generates backup artifacts (safe JSON, static HTML, downloadable) at publish time.
- **Cross-Platform Auth API**: Unified JWT-based auth for web and mobile with consistent response shape via `buildAuthUserResponse()` helper (`server/auth-response.ts`). Email is optional (nullable) — system accounts and legacy users may have NULL email. New registrations collect email but it's not enforced at the schema level. Login supports username or email. Registration returns JWT token. All auth endpoints (login, register, me, profile) return the same canonical user object including: profile fields, onboarding state (`onboardingCompleted`, `studyGoal`, `dailyStudyTime`, `examType`), subscription/tier info, entitlement map, and free-tier usage summary (`questionsUsed`, `flashcardsUsed`, `catExamsUsed`). Dedicated `POST /api/me/onboarding` endpoint accepts `{role, country, examType, studyGoal, dailyStudyTime}`, validates with Zod, persists atomically, and sets `onboardingCompleted=true`. Answer submission endpoints (test-results, qotd, flashcard-session) increment free-tier usage counters and return updated usage in response. Clean 401 JSON for expired/invalid tokens. Endpoints also cover token refresh, logout, entitlements, profile management, and password recovery. Users table has `study_goal`, `daily_study_time`, `exam_type`, `role`, `onboarding_completed` columns.
- **Admin Security**: JWT-only admin auth, role-based access control (`super_admin`, `content_admin`, `support_admin`, `analytics_viewer`), CSRF protection, rate limiting, re-auth/confirmation tokens for sensitive operations, and enhanced audit logging.
- **Last-Known-Good Content Versioning**: Immutable versioning system for premium content with automatic failover and admin restore.
- **Release Gate API**: Pre-deploy and pre-publish safety checks with override audit logging.
- **Content Health Score Engine**: 0-100 scoring engine with per-dimension breakdown for content items.
- **VIP Subscriber Prioritization**: Middleware that prioritizes paid subscriber requests under high load.
- **Chaos Testing & Disaster Recovery**: Configurable chaos engine with failure scenarios, DR readiness scoring, backup restore dry-run, and manifest generation.
- **Admin Reliability Dashboard**: Unified reliability monitoring dashboard with summary stats and actionable controls.
- **Data Migration & Auto-Cleanup System**: Versioned migration framework with up/down SQL scripts, dry-run preview, validation checks, automatic rollback, and scheduled auto-cleanup jobs.
- **Observability, Telemetry & Revenue Protection**: Behavioral telemetry service, time-travel debugging, and a revenue protection dashboard.
- **Exam Load Failure Recovery Pipeline**: Multi-stage client-side recovery for exam loading failures, with server-side incident storage and per-question error boundaries.
- **Subscriber Rescue & Refund Prevention**: Admin tools for subscriber retention including communication template management, rescue actions, and a refund prevention dashboard.
- **Cross-Platform Subscription & Entitlement Sync System**: Unified subscription management with a canonical `subscriptions` table, mobile-ready entitlement API, idempotent webhook processing, structured `entitlement_events` analytics, email normalization, billing refresh/restore endpoints, and expanded admin tooling.
- **Cross-Platform Learning System API**: Unified `/api/v1/` REST API (`server/cross-platform-api.ts`) shared by website and mobile app. Covers test banks, CAT/adaptive exams (start/answer/pause/resume/results), mock exams (list/start/answer/complete/history), lessons (list/detail/progress/bookmarks), dashboard summary, analytics event logging, and question history. Uses entitlement checks, idempotency keys, auto-created tables (`test_bank_collections`, `unified_question_history`, `lesson_bookmarks`, `analytics_events`, `test_bank_progress`), and integrates with the dashboard via `DashboardSummaryContext`. Safe mode whitelists all v1 read/write paths.

### External Dependencies
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Payment Processing**: Stripe, PayPal SDK
- **AI/Content Generation**: Centralized AI Provider Router (integrating OpenAI, Ollama, vLLM, LM Studio, Anthropic)
- **Object Storage**: Replit Object Storage
- **Email**: Resend
- **SMS**: Twilio