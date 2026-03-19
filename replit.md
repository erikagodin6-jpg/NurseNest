# NurseNest

### Overview
NurseNest is an adaptive learning platform designed for nursing and allied health students across 17 specializations. Its primary purpose is to deliver comprehensive educational resources, advanced exam preparation (e.g., NCLEX, REX-PN), and detailed performance analytics. The platform utilizes AI for content generation to foster clinical reasoning, nursing knowledge, and critical thinking, with the ultimate goal of improving patient care outcomes and becoming a leader in health education technology.

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
NurseNest employs a modern web architecture featuring a React frontend (TypeScript, Wouter, shadcn/ui, Tailwind CSS v4) built with Vite, and an Express 5 backend (Node.js, TypeScript). Data management is handled by TanStack React Query via a RESTful API and persisted in PostgreSQL using Drizzle ORM. The UI includes 24 themes, semantic CSS tokens, and DM Sans typography.

Key features encompass a database-driven subscription model with regional pricing, tiered access, Stripe-based lifetime purchases, and free trials. The platform offers interactive learning modules, a mock exam engine utilizing stratified random sampling, and a comprehensive admin dashboard. AI integrations, managed by a centralized AI Provider Router, power functionalities such as blog automation, an Adaptive CAT Engine, Pass Probability Projection, a Next Best Action Engine, an AI Tutoring Assistant, and content generation with quality gates. Exam blueprints are database-driven, content is categorized by body system, and supports Next Generation NCLEX (NGN) question types, partial credit scoring, and a Spaced Repetition System. User access is dynamically controlled by subscription tier.

Core architectural components and design patterns emphasize:
- **Learning & Exam Preparation**: Flashcards, Test/Question Bank, Adaptive Flashcard System, Clinical Vignette Generation, Mock Exam Engine (CAT & Practice modes) with an Exam Reliability System.
- **AI-Powered Study & Content**: AI Study Coaching & Course Generation, Exam Date AI Study Planner, context-aware AI Tutoring Assistant, and Bulk Question Bank Orchestrator.
- **Content & SEO Infrastructure**: Allied Health Encyclopedia, SEO Lesson Engine, Programmatic SEO, Multilingual SEO & Translation, Database-Driven Multi-Domain Sitemap, Internal Linking, and structured data generation.
- **User Experience & Engagement**: Dashboard Lifecycle Command Center, Global Report a Problem System, IndexedDB-based Offline Study, and LocalStorage-based Popup Suppression.
- **Multi-Profession Support**: Dynamic framework for new healthcare professions with specialized navigation and content.
- **Database Safety & Management**: PostgreSQL with Drizzle ORM, EnvironmentAwareContentWriteService, and a comprehensive Backup, Export & Restore Framework.
- **Content Integrity Engine**: Automated scanning, AI auto-repair, pre-publish validation, and manual review queue.
- **Explanation Engine**: Unified structured explanation storage with AI-powered batch generation and review.
- **Exam Readiness Predictor Engine**: Provides readiness scores, pass probability, and personalized recommendations.
- **Unified Question Schema & Country Adaptation**: `exam_questions` table extended for international fields, filtered by country, language, and licensing body.
- **Multilingual Content Management**: AI-powered batch translation of content with dedicated translation tables and build-blocking validation.
- **Taxonomy Protection System**: Strict taxonomy validation and normalization for content generation.
- **Content Publishing Audit**: Admin system for audit reports, quality fixes, coverage, and paywall enforcement, with an 8-section validation for unpublished content.
- **Cross-Platform REST API**: Dedicated route files for test banks, CAT exam sessions, enhanced mock exam and lesson endpoints. All endpoints enforce auth, entitlement/tier gating, write to `unified_question_history`, log analytics events to `analytics_events`, and include idempotency protections.
- **Subscription & Entitlement System**: Dedicated `user_subscriptions` table with comprehensive plan details. Auth endpoints manage user authentication and entitlements. Stripe webhooks update subscription status.
- **Platform Resilience System**: Enterprise-grade infrastructure providing circuit breakers, feature flags, kill switches, health checks, rate limiting, load shedding, self-healing, emergency mode, and entitlement caching. Includes scope isolation, progressive degradation, graceful timeout, stuck state detection, and performance/scale protection. An Ops Dashboard provides a single-screen platform health overview.
- **Memory Protection & Auto-Recovery System**: RSS-based memory monitoring with configurable thresholds. All in-memory stores are hard-capped. Health check uses RSS. Load shedding middleware blocks bulk AI POSTs and caps list pagination under pressure. AI concurrency limited to 2 concurrent operations with 45s timeout and 512KB body limit. Response size limiter caps JSON responses. Cleanup sweeps prune stale sessions and caches. Emergency mode has a 10-min re-activation cooldown. Memory hysteresis requires 60s below 80% critical threshold before deactivation. Synthetic monitoring auto-pauses during emergency/protection mode. Non-essential heavy routes return 503 during emergency mode. Heavy workloads are deferred to the background job queue.
- **Alert Flood Prevention & Scaling Safety**: Global AlertCoordinator centralizes alert email sending with deduplication, severity escalation, and a global rate limit. Concurrency limiters cap heavy routes. Core user flows are protected from load shedding. Request payload size limited to 2MB.
- **Production Incident Monitoring System**: Unified monitoring and alerting via `server/incident-monitor.ts` with structured `logIncident()`, unique IDs, deduplication, affected-user tracking, severity escalation, DB persistence, and notification hooks.
- **Incident System & Correlation Engine**: Structured incident management with CRUD operations, timeline tracking, and a correlation engine that scores recent changes against incident start times. Auto-detects incidents from resilience events.
- **Performance Protection System**: Production-grade performance instrumentation providing per-route response time metrics, slow DB query logging, server-side in-memory TTL caching, statement-level query timeouts, route priority tiers for load shedding, and an admin performance dashboard.
- **Deployment Protection & Self-Healing**: Blue-green deployment health gate with post-deploy monitoring, configurable monitoring window, and auto-rollback alerts. A deploy freeze mechanism activates on instability. Periodic self-healing checks run.
- **Cross-Platform Auth API**: Unified JWT-based auth for web and mobile with consistent response shape. Login supports username or email. Registration returns JWT token. All auth endpoints return the same canonical user object including: profile fields, onboarding state, subscription/tier info, entitlement map, and free-tier usage summary. Dedicated `POST /api/me/onboarding` endpoint accepts user preferences. Answer submission endpoints increment free-tier usage counters.
- **Admin Security**: JWT-only admin auth, role-based access control, CSRF protection, rate limiting, re-auth/confirmation tokens for sensitive operations, and enhanced audit logging.
- **Last-Known-Good Content Versioning**: Immutable versioning system for premium content with automatic failover and admin restore.
- **Release Gate API**: Pre-deploy and pre-publish safety checks with override audit logging.
- **Content Health Score Engine**: 0-100 scoring engine with per-dimension breakdown for content items.
- **VIP Subscriber Prioritization**: Middleware that prioritizes paid subscriber requests under high load.
- **Chaos Testing & Disaster Recovery**: Configurable chaos engine with 15 failure scenarios (including memory pressure, slow exam, invalid content injection, slow DB, unavailable worker, failed alerts, API timeout), DR readiness scoring, backup restore dry-run, and manifest generation.
- **Production Recurrence Prevention System**: Resource budget enforcement (payload size, memory growth, route latency, concurrent jobs, exam batch size), architecture boundary enforcement (web vs job queue), auto-containment runbooks (memory pressure, exam flow failure, invalid content quarantine, alert flood grouping), post-deploy smoke tests with rollback/freeze recommendations, content quality gates (blank stems, missing answers, tier consistency, minimum items, language checks), nightly integrity audit with auto-quarantine, enhanced alert hygiene (per-type cooldowns, incident grouping, dedup windows, operator summaries), and expanded observability dashboard with Resilience tab.
- **Admin Reliability Dashboard**: Unified reliability monitoring dashboard with summary stats and actionable controls.
- **Data Migration & Auto-Cleanup System**: Versioned migration framework with up/down SQL scripts, dry-run preview, validation checks, automatic rollback, and scheduled auto-cleanup jobs.
- **Observability, Telemetry & Revenue Protection**: Behavioral telemetry service, time-travel debugging, and a revenue protection dashboard.
- **Exam Load Failure Recovery Pipeline**: Multi-stage client-side recovery for exam loading failures, with server-side incident storage and per-question error boundaries.
- **Subscriber Rescue & Refund Prevention**: Admin tools for subscriber retention including communication template management, rescue actions, and a refund prevention dashboard.
- **Cross-Platform Subscription & Entitlement Sync System**: Unified subscription management with a canonical `subscriptions` table, mobile-ready entitlement API, idempotent webhook processing, structured `entitlement_events` analytics, email normalization, billing refresh/restore endpoints, and expanded admin tooling.
- **Cross-Platform Learning System API**: Unified `/api/v1/` REST API shared by website and mobile app. Covers test banks, CAT/adaptive exams (start/answer/pause/resume/results), mock exams (list/start/answer/complete/history), lessons (list/detail/progress/bookmarks), dashboard summary, analytics event logging, and question history. Uses entitlement checks, idempotency keys, auto-created tables, and integrates with the dashboard via `DashboardSummaryContext`.
- **Startup Stabilization**: All seed operations removed from the server startup path; seeds run only on-demand via admin endpoint or CLI. Startup path is lightweight. Content pipeline has memory guards and structured logging. Schema sync has exponential backoff retry.
- **Worker Process Separation**: Background work fully isolated into `server/worker.ts` via `PROCESS_ROLE=worker` env var. Web process (`PROCESS_ROLE=web`) only serves HTTP requests. Worker includes graceful shutdown, memory monitoring, QBank scheduler, and all job handlers.
- **Bounded In-Memory Caches**: All in-memory Maps use `BoundedMap` with LRU eviction and optional TTL, with defined caps for various components.
- **Three-Tier Load Shedding**: Implements Warning (70% RSS), Protection (80%), and Critical (90%) tiers to manage system load and preserve core user paths.
- **Paginated Exam Delivery**: `server/exam-delivery.ts` provides a paginated exam API for starting, retrieving questions, getting rationales, answering, and submitting exams.
- **Byte-Size Bounded Cache**: `server/performance.ts` memoryCache has LRU eviction with entry count and byte-size caps.
- **Memory Observability**: `server/memory-observability.ts` provides 30s ring buffer trend tracking, per-route heap/RSS deltas, RSS baseline drift detection, top memory routes summary, and production sizing recommendations.
- **Enhanced Critical Mode**: Memory monitor clears performance cache and stops synthetic monitoring when entering critical mode. Job queue skips poll cycles when memory pressure is active.
- **Lazy NurseNest Lite**: Prebuilt payloads are lazily initialized on first access.
- **Frontend Bundle Optimization**: Admin routes are lazy-loaded, vendor chunking is expanded, route error boundaries are implemented, module preloading is enabled, and bundle size is monitored with a 500KB chunk size warning.

### External Dependencies
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Payment Processing**: Stripe, PayPal SDK
- **AI/Content Generation**: Centralized AI Provider Router (integrating OpenAI, Ollama, vLLM, LM Studio, Anthropic)
- **Object Storage**: Replit Object Storage
- **Email**: Resend
- **SMS**: Twilio