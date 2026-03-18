# NurseNest

### Overview
NurseNest is an adaptive learning platform for nursing and allied health students across 17 specializations. Its main goal is to provide comprehensive educational resources, advanced exam preparation (e.g., NCLEX, REX-PN), and detailed performance analytics. The platform uses AI for content generation to foster clinical reasoning, deepen nursing knowledge, and enhance critical thinking, aiming to improve patient care outcomes and revolutionize nursing education. The long-term vision is to establish NurseNest as a leader in health education technology with significant market potential.

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
NurseNest employs a modern web architecture. The frontend is built with React (TypeScript, Wouter, shadcn/ui, Tailwind CSS v4) and Vite, while the backend is an Express 5 application on Node.js (TypeScript). Server state management utilizes TanStack React Query via a RESTful API. Data is persisted using PostgreSQL with Drizzle ORM. The UI supports 24 themes, semantic CSS tokens, and DM Sans typography.

The platform includes a database-driven subscription model with regional pricing, tiered access, Stripe-based lifetime purchases, and free trial management. Key features include interactive learning modules, a mock exam engine using stratified random sampling, and a comprehensive admin dashboard. AI integrations, managed through a centralized AI Provider Router, power features like blog automation, an Adaptive CAT Engine, Pass Probability Projection, a Next Best Action Engine, an AI Tutoring Assistant, and content generation with integrated quality gates. Exam blueprints are database-driven, content is categorized by body systems, and the system supports Next Generation NCLEX (NGN) question types, partial credit scoring, and a Spaced Repetition System. User access to content is dynamically controlled by their subscription tier.

Core architectural components and design patterns include:
- **Learning & Exam Preparation**: Flashcards, Test Bank, Question Bank, Adaptive Flashcard System, Clinical Vignette Generation Engine, and a Mock Exam Engine (CAT & Practice modes) supporting multiple nursing certifications, with an Exam Reliability System.
- **AI-Powered Study & Content**: AI Study Coaching & Course Generation, Exam Date AI Study Planner, AI-Powered Generation & Safety system, context-aware AI Tutoring Assistant, and Bulk Question Bank Orchestrator.
- **Content & SEO Infrastructure**: Allied Health Encyclopedia, SEO Lesson Engine, Programmatic SEO Engines, Multilingual SEO & Translation System, Database-Driven Multi-Domain Sitemap Architecture, Internal Linking Engine, and structured data generation.
- **User Experience & Engagement**: Dashboard Lifecycle Command Center, Global Report a Problem System, IndexedDB-based Offline Study System, and LocalStorage-based Popup Suppression System.
- **Multi-Profession Support**: Dynamic framework for new healthcare professions with specialized navigation and content.
- **Database Safety & Management**: PostgreSQL with Drizzle ORM, EnvironmentAwareContentWriteService, and a comprehensive Backup, Export & Restore Framework.
- **Content Integrity Engine**: Automated scanning, AI auto-repair, pre-publish validation, and manual review queue.
- **Explanation Engine**: Unified structured explanation storage with AI-powered batch generation, quality scoring, and review workflow.
- **Exam Readiness Predictor Engine**: Provides readiness scores, pass probability, and personalized recommendations.
- **Unified Question Schema & Country Adaptation**: `exam_questions` table extended for international fields, filtering by country, language, and licensing body.
- **Multilingual Exam Question Translation Pipeline**: AI-powered batch translation of exam questions into multiple languages.
- **Taxonomy Protection System**: Strict taxonomy validation and normalization layer for content generation.
- **Admin Purchase Notifications**: Real-time email and SMS alerts on purchase events.
- **Content Publishing Audit**: Admin-only system for audit reports, quality fixes, coverage, and paywall enforcement for published content, including an 8-section validation system for unpublished content.
- **Clinical SEO Pages**: Database-driven clinical content pages for SEO.
- **Question Comments & Discussion**: Lightweight discussion system on practice questions, allowing users to comment, vote, and flag content, with admin moderation.
- **Exam Reliability System**: Production-grade exam stability with question validation, pool health checks, quarantine, incident tracking, and error boundaries.
- **Ops Foundation & Audit Infrastructure**: Unified operational data layer with audit logging service for all operator actions. Role-based admin permissions via `requireAdminRole()` middleware. CSRF protection on all admin mutation endpoints.
- **Platform Resilience System**: Enterprise-grade infrastructure providing circuit breakers, feature flags, kill switches, health checks, rate limiting, load shedding, self-healing, emergency mode, and provisional access.
- **Memory Protection & Auto-Recovery System**: RSS-based memory monitoring with configurable thresholds, load shedding middleware, response size limiter, and cleanup sweeps.
- **Production Incident Monitoring System**: Unified monitoring and alerting via `server/incident-monitor.ts` with structured `logIncident()`, unique IDs, deduplication, affected-user tracking, severity escalation, DB persistence, and notification hooks.
- **Incident System & Correlation Engine**: Structured incident management with CRUD operations, timeline tracking, and a correlation engine that scores recent changes against incident start times.
- **Ops Audit & Permissions**: Enhanced `audit_logs` table, `logAuditAction` utility, and role-based permissions middleware with server-side enforcement.
- **Performance Protection System**: Production-grade performance instrumentation providing per-route response time metrics, slow DB query logging, server-side in-memory TTL caching, statement-level query timeouts, and route priority tiers for load shedding.
- **Deployment Protection & Self-Healing**: Blue-green deployment health gate with post-deploy monitoring, configurable monitoring window, and auto-rollback alerts. Periodic self-healing checks.
- **Schema Versioning**: All content types include a `schema_version` field, with version-aware normalizers and a migration utility.
- **PTA Programmatic SEO Content System**: Rich educational content pages for PTA exam prep with embedded practice questions, FAQ accordion, structured data, internal linking, and conversion CTAs.
- **Substitute Content Engine**: Automatically finds and offers the closest equivalent premium resource when primary content is unavailable, with event logging and configurable rules.
- **Multilingual Content Schema (Phase 1)**: Per-content-type translation tables with `translation_status_enum`, `source_version` tracking, and unique constraints.
- **i18n Enforcement & Build Tooling**: Compile script for extracting translations, missing key tracking, missing key API, and a fallback overlay for development. Includes build-blocking validation scripts for translation coverage and hardcoded string scanning.
- **Exam Resilience Engine**: Production-grade backend resilience for the exam system including pre-publish validation, runtime normalization, versioned backup snapshots, circuit breaker logic, server-side session recovery, and static backup payloads.
- **Centralized Entitlement Resolver**: Single `resolveEntitlement()` function to determine user access based on various sources (subscription, bundle, one-time purchase, etc.).
- **Access Delivery Orchestrator**: Middleware factory `createAccessDeliveryOrchestrator()` that wraps content delivery endpoints with an automatic fallback chain (primary → safe fallback → last-known-good → backup snapshot → substitute equivalent → static fallback).
- **Content Fault Isolation**: Component-level error boundaries (`ContentItemBoundary`, `WidgetBoundary`, `MediaBoundary`) and `SafeList`/`SafeRender` utilities to prevent view crashes from malformed sub-components.
- **Content-Type Fallback Renderers**: Complete fallback chains for every major content type (e.g., `CATFixedFormBackup`, `FlashcardDownloadBackup`).
- **Runtime Language Safety & Monitoring**: Language isolation middleware, structured logging for validation failures, and an admin dashboard for language health.
- **Content Failover & Backup Pipeline**: Ensures no paying user sees blank/broken content by generating verified render payloads at publish time and using a 4-tier fallback delivery chain.
- **Abuse & Rate Limiting Protection**: Centralized abuse detection middleware with tiered escalation, IP/UA bot heuristics, structured `security_audit_logs`, and reusable rate limiter factory.
- **Content Validation, Versioning & Quarantine System**: Three interconnected systems: Publish-Time Validation Pipeline, Snapshot & Versioning System, and Content Quarantine System for content reliability.
- **Incident Correlation & Weekly Resilience Report**: Automatic incident correlation via `server/incident-correlation.ts` with change tracking and confidence-scored correlation matching.
- **Content Publishing & Live Validation**: Comprehensive 8-section validation system (`server/content-publishing-validator.ts`) for unpublished content, metadata, duplicates, CAT rationale, exam routes, flashcard linkage, tier access control, and content integrity.
- **Publish-Time Validation Gate & Backup Artifact Generation**: Strict `publish-gate` pipeline (`server/publish-gate.ts`) that validates and generates backup artifacts (JSON render payload, static HTML, downloadable backup) at publish time, ensuring last-known-good preservation.
- **Admin Security**: JWT-only admin auth, role-based access control, CSRF protection, rate limiting, re-authentication and confirmation tokens for sensitive operations, and enhanced audit logging.
- **Chaos Testing & Disaster Recovery**: Configurable chaos engine with 8 failure scenarios, DR readiness scoring, backup restore dry-runs, and an admin DR dashboard.
- **Admin Reliability Dashboard**: Unified reliability monitoring with 8 tabs, summary stats, and actionable controls for managing content, entitlements, and backups.
- **Data Migration & Auto-Cleanup System**: Versioned migration framework with dry-run preview, rollback, audit logging, and scheduled auto-cleanup jobs.
- **Observability, Telemetry & Revenue Protection**: Behavioral telemetry service, session recordings for time-travel debugging, and a revenue protection dashboard to track and address checkout failures and access issues.
- **Exam Load Failure Recovery Pipeline**: Multi-stage client-side recovery for exam loading failures, classifying reasons and offering 4-stage recovery, with server-side incident storage and per-question error boundaries.
- **Subscriber Rescue & Refund Prevention**: Admin tools for subscriber retention including communication template management, rescue actions, affected subscriber tracking, and a refund prevention dashboard.

### External Dependencies
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Payment Processing**: Stripe, PayPal SDK
- **AI/Content Generation**: Centralized AI Provider Router (integrating OpenAI, Ollama, vLLM, LM Studio, Anthropic)
- **Object Storage**: Replit Object Storage
- **Email**: Resend
- **SMS**: Twilio