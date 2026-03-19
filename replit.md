# NurseNest

### Overview
NurseNest is an adaptive learning platform for nursing and allied health students across 17 specializations. It provides comprehensive educational resources, advanced exam preparation (e.g., NCLEX, REX-PN), and detailed performance analytics. The platform leverages AI for content generation to enhance clinical reasoning, nursing knowledge, and critical thinking, with the goal of improving patient care outcomes and revolutionizing nursing education and becoming a leader in health education technology.

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
NurseNest utilizes a modern web architecture consisting of a React frontend (TypeScript, Wouter, shadcn/ui, Tailwind CSS v4) with Vite, and an Express 5 backend (Node.js, TypeScript). Data is managed via TanStack React Query through a RESTful API and stored in PostgreSQL using Drizzle ORM. The UI features 24 themes, semantic CSS tokens, and DM Sans typography.

Key features include a database-driven subscription model with regional pricing, tiered access, Stripe-based lifetime purchases, and free trials. The platform offers interactive learning modules, a mock exam engine with stratified random sampling, and a comprehensive admin dashboard. AI integrations, managed by a centralized AI Provider Router, power functionalities such as blog automation, an Adaptive CAT Engine, Pass Probability Projection, a Next Best Action Engine, an AI Tutoring Assistant, and content generation with quality gates. Exam blueprints are database-driven, content is categorized by body system, and supports Next Generation NCLEX (NGN) question types, partial credit scoring, and a Spaced Repetition System. User access is dynamically controlled by subscription tier.

Core architectural components and design patterns emphasize:
- **Learning & Exam Preparation**: Flashcards, Test/Question Bank, Adaptive Flashcard System, Clinical Vignette Generation, and a Mock Exam Engine (CAT & Practice modes) with an Exam Reliability System.
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
- **Memory Protection & Auto-Recovery System**: RSS-based memory monitoring with configurable thresholds (env vars: MEMORY_WARNING_MB, MEMORY_PROTECTION_MB, MEMORY_CRITICAL_MB). All in-memory stores are hard-capped: metrics ring buffer (2000), alert/audit/event logs (100 each), rate limit store (1000), pageview tracking (1000), memory cache (200), entitlement cache (500), spike log (30), slow queries (50), abuse trackers (500), request trackers (500), i18n missing keys (500), VIP shed events (50). Health check uses RSS (not heapUsed/heapTotal ratio). Response body logging only retains 500-char snippets (not full objects). Load shedding middleware blocks bulk AI POSTs and caps list pagination under pressure. Response size limiter caps JSON responses. Cleanup sweeps prune stale sessions and caches. Frontend uses staleTime/gcTime for queryClient, auto-retries on 503, and an incident banner.
- **Production Incident Monitoring System**: Unified monitoring and alerting via `server/incident-monitor.ts` with structured `logIncident()`, unique IDs, deduplication, affected-user tracking, severity escalation, DB persistence, and notification hooks. An Admin Incident Center provides an overview.
- **Incident System & Correlation Engine**: Structured incident management with CRUD operations, timeline tracking, and a correlation engine that scores recent changes against incident start times. Auto-detects incidents from resilience events.
- **Performance Protection System**: Production-grade performance instrumentation providing per-route response time metrics, slow DB query logging, server-side in-memory TTL caching, statement-level query timeouts, route priority tiers for load shedding, and an admin performance dashboard. Non-critical UI elements are deferred.
- **Deployment Protection & Self-Healing**: Blue-green deployment health gate with post-deploy monitoring, configurable monitoring window, and auto-rollback alerts. A deploy freeze mechanism activates on instability. Periodic self-healing checks run for cache corruption, schema drift, and missing backups.
- **Cross-Platform Auth API**: Unified JWT-based auth for web and mobile with consistent response shape via `buildAuthUserResponse()` helper. Login supports username or email. Registration returns JWT token. All auth endpoints (login, register, me, profile) return the same canonical user object including: profile fields, onboarding state, subscription/tier info, entitlement map, and free-tier usage summary. Dedicated `POST /api/me/onboarding` endpoint accepts user preferences, validates, persists, and sets `onboardingCompleted=true`. Answer submission endpoints increment free-tier usage counters and return updated usage in response. Clean 401 JSON for expired/invalid tokens. Endpoints also cover token refresh, logout, entitlements, profile management, and password recovery.
- **Admin Security**: JWT-only admin auth, role-based access control, CSRF protection, rate limiting, re-auth/confirmation tokens for sensitive operations, and enhanced audit logging.
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
- **Cross-Platform Learning System API**: Unified `/api/v1/` REST API shared by website and mobile app. Covers test banks, CAT/adaptive exams (start/answer/pause/resume/results), mock exams (list/start/answer/complete/history), lessons (list/detail/progress/bookmarks), dashboard summary, analytics event logging, and question history. Uses entitlement checks, idempotency keys, auto-created tables, and integrates with the dashboard via `DashboardSummaryContext`.

- **Startup Stabilization**: All seed operations (20+ seeders) removed from the server startup path. Seeds now run only on-demand via `POST /api/admin/run-seeds` (admin-auth-protected) or `npx tsx scripts/run-seeds.ts` CLI. Startup path is lightweight: DB connect, schema sync (with deadlock retry), data migrations, route registration, HTTP listen. The 6-hour content pipeline has memory guards (skips if heap > 1400MB) and structured logging. Schema sync (`ensureSchemaSync`) has exponential backoff retry for deadlock/lock-timeout errors. Deploy script (`scripts/deploy-build-fast.sh`) no longer runs pre-migration SQL fixes at build time — the email backfill is now a guarded one-time migration in `startup-data-migrations.ts`.

### Frontend Bundle Optimization
- **Admin Route Separation**: All admin routes (~120+) are lazy-loaded via `client/src/admin-routes.tsx`, wrapped in error boundaries. Regular users never download admin code.
- **Vendor Chunking**: Expanded manual chunks in `vite.config.ts` for recharts/d3, zod, date-fns, react-day-picker, react-hook-form, jspdf/html2canvas, dompurify/marked, wouter, cmdk, embla-carousel, panels, next-themes, vaul, and styling libs.
- **Route Error Boundaries**: `client/src/components/route-error-boundary.tsx` wraps admin and allied route groups with user-friendly fallback UI.
- **Module Preloading**: Re-enabled with polyfill for selective preloading of lazy chunks.
- **Bundle Monitoring**: `scripts/report-bundle-size.js` reports top 10 largest chunks with 500KB warning threshold.
- **Chunk Size Warning**: Lowered to 500KB (from default 500KB).

### External Dependencies
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Payment Processing**: Stripe, PayPal SDK
- **AI/Content Generation**: Centralized AI Provider Router (integrating OpenAI, Ollama, vLLM, LM Studio, Anthropic)
- **Object Storage**: Replit Object Storage
- **Email**: Resend
- **SMS**: Twilio