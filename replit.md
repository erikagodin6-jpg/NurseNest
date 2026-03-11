# NurseNest - Complete Nursing Learning Platform

## Overview
NurseNest is an adaptive learning platform designed for nursing and allied health students across 17 career verticals. Its primary purpose is to deliver comprehensive learning resources, exam preparation (e.g., NCLEX, REX-PN), performance analytics, and AI-powered content generation. The platform aims to improve clinical reasoning, nursing knowledge, and critical thinking, ultimately leading to enhanced patient care outcomes through a region-aware and robust learning environment.

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
The platform utilizes React with TypeScript, Wouter for routing, shadcn/ui with Radix UI, and Tailwind CSS v4, supporting 20 themes and DM Sans typography. Key UI components include `ContentGate`, `PauseAndThink`, `ProgressiveDisclosure`, `CuriosityHook`, and `KnowledgeCheck`. A digital product builder offers a Canva-style editor with drag-and-drop, AI image, and content generation capabilities. The design system incorporates premium visuals, dual-tone top bars, and watermarked PDF previews.

### Technical Implementations
The application is built with Vite, React, and Express 5 on Node.js with TypeScript. Server state is managed by TanStack React Query via a RESTful API. Authentication uses username/password with session management, and a subscription system supports regional pricing. Core features include interactive learning modules, a mock exam engine with stratified random sampling and Strict Exam Mode, and an admin dashboard. AI integrations encompass OpenAI-powered blog automation, custom i18n for 15 languages, an Adaptive CAT Engine, Pass Probability Projection Engine, and Next Best Action Engine. Exam blueprints are database-driven, and content is organized by body system for various nursing levels, incorporating pre/post-test questions. The platform includes a 3-step onboarding process for personalized study plans, admin tools like QBank Factory and Product Generator V2 for AI-driven content generation, and programmatic SEO for practice question pages. It supports NGN question types, a partial credit scoring engine, and a Spaced Repetition System. Content access is controlled via a tier system (free, rpn, rn, np, admin). Other features include 301 redirects, sitemap generation, related articles, Exam Calculator, Quick Study Sessions, and a Study Progress Momentum System. The Lesson Library provides tier-adaptive heroes, featured topics, progress cards, and study time estimates. Clinical Case Studies offer multi-stage scenarios with decision points, and regional measurement adaptation converts units dynamically. A Tester Access System manages invite codes and gathers feedback.

### Feature Specifications
- **Question Bank System**: Supports Admin, Exam, Study, and Browse modes. Features JSON import with extensive validation, inline editing, status toggling, timed exams with shuffling, immediate rationale in study mode, and analytics. Enforces content safety rules based on user tier and region.
- **Paramedic EMS Scenario Simulation System**: Manages interactive paramedic scenarios with detailed dispatch, assessment, decision points, and debriefing. Scenarios are segmented by content domain, profession track, region, visibility, difficulty, and exam relevance. Includes a frontend player and an admin panel for scenario creation and management.
- **Referral Discount System**: Users can generate unique referral codes. Friends receive a 15% discount on their first subscription, and referrers earn 7 free premium days. The system tracks uses and integrates with Stripe for discount application.
- **Beta Tester Access Code Management**: Admin dashboard functionality for generating, managing, and tracking beta invite codes with customizable tiers, usage limits, and durations.
- **Paramedic Landing & Hub Pages**: Dedicated SEO-optimized pages for paramedic careers, including landing pages, exam-specific pages, and content hubs for lessons, exams, flashcards, and scenarios.
- **SEO Page System**: Includes dynamically generated landing pages for mock exams, hub pages for nursing certifications, and dedicated pages for medical conditions, medications, and lab values, all with structured data and comprehensive SEO metadata.
- **Paramedic SEO Content Engine**: Generates and manages various SEO content types (Topic, Category, Glossary, Comparison, Study Guides) for paramedic content, supporting internal linking and structured data.

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

## MLT Platform
The MLT (Medical Laboratory Technology) section provides country-specific exam preparation for CSMLS (Canada) and ASCP (USA) certifications. Key files:
- `shared/mlt-taxonomy.ts`: All 16 lab disciplines, subdisciplines, blueprint categories, difficulty/cognitive levels, country/exam tracks
- `shared/schema.ts`: MLT-specific tables — `mlt_questions`, `mlt_flashcards`, `mlt_lessons`, `mlt_study_plans`
- `client/src/allied/pages/mlt-landing.tsx`: Main `/mlt` landing page with country selection
- `client/src/allied/pages/mlt-country-page.tsx`: All `/mlt/{canada|usa}/{page}` sub-routes
- `client/src/allied/pages/mlt-blog.tsx`: Blog structure at `/mlt/blog` and `/mlt/blog/:slug`
- Routes registered in `client/src/allied/allied-routes.tsx`

## Lesson Library Architecture
- All lesson data is in static TS files under `client/src/data/lessons/`
- `safeMerge()` in `index.ts` deduplicates at merge time; `isPlaceholder()` filters generic/template content
- Tier derived from slug suffix: `-rpn`, `-rn`, `-np`, or `"general"`
- System cards in `lessons.tsx` show lesson count badges and progress bars (completed/total)
- Lesson counts: free=564, rpn=521, rn=244, np=316, total=1645 (as of Mar 2026)
- DB exam questions: rpn=2141, rn=1493, np=1638, total=5272 (as of Mar 2026); 3604 published, 1668 needs_review
- Question Bank modes: Study (immediate rationale, filters) and Exam (timer, randomized Q/A, hidden rationale until submit, performance summary)
- Question status values: "published", "draft", "disabled" (soft-disable), "archived", "needs_review"
- Safety rules enforced server-side: LVN users never see REx-PN, Canadian RPN never see NCLEX-PN, region_scope filtering (US/CAN/BOTH)
- Region mapping: users.region "CA" → region_scope "CAN"; users.region "US" → region_scope "US"
- Admin batch import: `/api/admin/qbank/import` accepts batch-keyed JSON `{ "batch_name": [...] }`
- Filter options endpoint: `/api/qbank/filter-options` returns exams, categories, difficulties, topics for a tier
- Login flow stores credentials in localStorage("nursenest-credentials") for QBank API auth
- Question files in `client/src/data/exam-questions/`: rpn-expansion-[a-h], rn-expansion-[a-i], np-expansion-[a-e], pn-us-batch-01, rn-us-batch-01, np-us-batch-01, rpn-cases-01, rn-cases-01, np-cases-01, cnple-batch-[01-03], us-cases-01, plus 56 np-exam-batch files
- **Question Bank Import Pipeline**: Admin page at `/admin/qbank/import` for bulk JSON import of questions
  - Accepts JSON format: `{question, option_a-d, correct_answer (A/B/C/D), rationale, category, difficulty, exam, country, question_type, client_needs, topic}`
  - Supports grouped JSON formats (object-of-arrays) and single question objects
  - Validation: required fields, answer key, difficulty, exam type, country, duplicate detection via stem hash
  - Maps exams to tiers: NCLEX-PN/REx-PN→rpn, NCLEX-RN→rn, AANP/ANCC→np
  - POST /api/admin/qbank/import with autoPublish flag
  - Returns detailed report: inserted, skipped (duplicates), validation errors, insert errors
- **Question Bank Management**: Admin page at `/admin/qbank/manage` for individual question editing and status management
  - Search/filter questions by tier (RPN/RN/NP) and status (published/archived/draft)
  - Edit individual question fields: stem, options, correct answer, rationale, difficulty, body system, topic, exam, region
  - Toggle question status (published/archived) without deletion
  - Analytics tab with breakdowns by category, difficulty, exam type, region, and status
- **Exam Mode Answer Shuffling**: Answer options are randomly shuffled per-question in exam sessions while preserving correct answer tracking (Fisher-Yates shuffle with original index mapping)
- **Study Mode Filters**: Question bank study mode supports filtering by body system, difficulty level (1-5), exam type, and topic via server-side filtering
- **QBank Filter API**: GET `/api/qbank/filters?tier=rpn` returns available filter options (body systems, difficulty levels, exams, topics) for the selected tier
- **QBank Analytics API**: GET `/api/admin/qbank/analytics?tier=rpn` returns category/difficulty/exam/region/status breakdowns (parameterized SQL, no injection risk)
- Content publishing: Admin Content Manager at `/admin/content-manager` for bulk publish/unpublish/archive/delete of exam questions and flashcard bank items
- Deployment build includes `npx tsx script/migrate-questions-to-db.ts` to sync questions to production DB
- Hero stats now include exam_questions count (rpnExamQ, rnExamQ, npExamQ, totalExamQ in breakdown)
- QBank generator supports `autoPublish` flag to insert questions as 'published' directly
- Exam blueprints: REX-PN (CA), NCLEX-PN (US), NCLEX-RN (US), NCLEX-RN-CA (CA), CNPLE (CA), AANP (US), ANCC (US), plus readiness exams with CA variants
- DB tables `allied_lessons` and `content_items` are empty; all content is static TS

## Question Bank System
- **DB Tables**: `question_bank` (questions with MCQ options, correct answer, rationale, category, difficulty, exam_type, country, topic, client_needs, status) and `question_bank_results` (per-user session results with category/difficulty breakdowns)
- **Validation**: `server/question-bank-validation.ts` — 19 validation rules including non-empty checks, enum validation, country↔exam consistency (NCLEX-PN↔US, REx-PN↔CA), duplicate detection
- **Safety Rules**: LVN users (region=US) see NCLEX-PN/US questions only; RPN users (region=CA) see REx-PN/CA questions only
- **Modes**: Admin (`/admin/question-bank`), Exam (`/qbank/exam`), Study (`/qbank/study`), Browse (`/qbank/browse`)
- **Admin**: JSON import with validation feedback, inline edit, enable/disable toggle, filtering by country/exam type/status/category
- **Exam Mode**: Timed, randomized questions with shuffled answers, question navigator with flagging, detailed results with pass/fail and category breakdown
- **Study Mode**: One-at-a-time practice with immediate rationale feedback, session statistics
- **Browse**: Question preview with expandable answer reveal, analytics tab with category distribution and performance stats
- **API Routes**: `/api/question-bank/items`, `/api/question-bank/import`, `/api/question-bank/exam`, `/api/question-bank/study`, `/api/question-bank/results`, `/api/question-bank/analytics`, `/api/question-bank/admin/all`
- **Auth**: Admin routes use `requireAdmin`, user routes use `resolveAuthUser` with `nursenest-credentials` localStorage

## Paramedic EMS Scenario Simulation System
- **Database**: `paramedic_scenarios` table with fields for dispatch info, scene description, scene safety, primary/secondary assessment, vital signs (JSONB), patient history (JSONB), decision points (JSONB array with choices and correct answers), correct interventions, common errors, debrief, learning objectives, and related lesson slugs
- **Segmentation**: contentDomain (paramedic), professionTrack (PCP/ACP/NREMT/EMT/General), region, visibilityTier, difficulty (1-5), examRelevance
- **API routes** (`server/allied-scenarios.ts`): CRUD endpoints at `/api/allied/scenarios`, fetch by slug at `/api/allied/scenarios/by-slug/:slug`, categories list, admin listing with search/filter, status toggle (publish/unpublish/archive)
- **Frontend scenario player** (`client/src/allied/pages/paramedic-scenario-player.tsx`): Stepwise progressive reveal through Dispatch → Scene → Primary Assessment → Vitals → Secondary Assessment → History → Decision Points → Debrief. Decision points lock after answering with correct/incorrect feedback. Debrief shows score, clinical summary, learning objectives, correct interventions, common errors, and related lessons.
- **Scenarios hub** (`client/src/allied/pages/paramedic-scenarios-hub.tsx`): Lists published scenarios with category/track/difficulty filters
- **Admin panel** (`client/src/allied/components/scenario-admin.tsx`): Create, edit, preview, publish/unpublish, delete scenarios with visual decision point editor (mark correct answers). Accessible via "Scenarios" tab in allied admin dashboard
- **Routes**: `/careers/paramedic/scenarios` (hub), `/careers/paramedic/scenarios/:slug` (player)

## Referral Discount System
- Users table has `referral_code` (unique, format NN-REF-XXXXXX), `referral_uses`, `referred_by`, `referral_discount_used` columns
- Storage methods: `generateReferralCode`, `getUserByReferralCode`, `incrementReferralUses`, `setReferredBy`, `markReferralDiscountUsed`
- API routes: `GET /api/referral/my-code`, `POST /api/referral/generate`, `POST /api/referral/validate`
- Referral code auto-generated when: tester access granted via admin, or user registers with valid invite code
- Registration (`POST /api/auth/register`) accepts optional `referralCode` param, links `referredBy` and increments referrer's uses
- **Referral rewards**: Friend gets 15% off first subscription (Stripe coupon `percent_off: 15`, requires exact match). Referrer gets 7 free premium days (`testerAccess=true`, expiry extended/stacked).
- Stripe checkout applies 15% "once" coupon for users with `referredBy` set and `referralDiscountUsed` is false; marked as used after successful payment in verify-session
- `/refer` page shows code, share link (`nursenest.ca/signup?ref=CODE`), copy buttons, 3-column referral stats (friends referred, 15% discount, premium days earned), 4-step how-it-works
- `/signup?ref=CODE` redirects to `/login` preserving query params; App.tsx captures `ref` into sessionStorage before locale redirect
- Login page reads `ref` from URL or sessionStorage fallback, pre-fills referral code input on registration tab

## Beta Tester Access Code Management (Admin Dashboard)
- Admin dashboard tab "Beta Testers" at `/admin?tab=beta-testers`
- Uses existing `tester_invite_codes` table and API routes (`GET/POST/PATCH/DELETE /api/admin/tester/invite-codes`)
- Generate codes (format NN-BETA-XXXXXX, auto-generated or custom), set tier/maxUses/duration/notes
- Batch code generation: `POST /api/admin/tester/invite-codes/batch` (count, tier, maxUses, durationDays, notes), up to 500 codes at once
- `usedBy` tracking: `tester_invite_codes.used_by` stores user ID on redemption
- View all codes with usage progress bars, copy to clipboard, activate/deactivate, delete, "Redeemed" indicator
- View active beta testers table with username, tier, invite code used, referral code, referral count, expiry, status
- View tester feedback with category, severity, title, description, and status badges

## Paramedic Landing & Hub Pages
- Dedicated paramedic routes under `/paramedic` (separate from generic `/careers/paramedic`)
- **Landing page**: `/paramedic` — 10-section conversion page (hero, who-this-is-for, pain points, features, topics, study path, free preview, exam pathways, trust, final CTA)
- **Exam-specific pages**: `/paramedic/pcp` (PCP Canada), `/paramedic/acp` (Advanced Care), `/paramedic/nremt` (US National Registry)
- **Hub pages**: `/paramedic/lessons`, `/paramedic/exams`, `/paramedic/flashcards`, `/paramedic/scenarios`, `/paramedic/practice-exams`
- Reusable conversion components in `client/src/allied/pages/paramedic/components.tsx`: HeroCTA, StudyPathSteps, TrackCard, PainPointCard, FeatureCard, TopicCategoryCard, FreePreviewBlock, ExamPathCard, TrustBlock, FinalCTASection, FAQSection, ContentCard, FilterChip, HubHero
- All pages have unique SEO metadata (title, description, keywords, OG tags, canonical URLs, structured data)
- Pages pull real content from `paramedic-questions.ts` (500 questions, 10 categories) and `paramedic-lessons.ts` (10 lessons)
- NurseNest brand colors: soft lavender/purple gradients, teal accents, clinical white
- Routes registered in `client/src/allied/allied-routes.tsx` before career wildcard routes

## SEO Page System
- **Exam Landing Pages**: `/nclex-rn/mock-exam`, `/nclex-pn/mock-exam`, `/rex-pn/mock-exam`, `/canada-np/mock-exam`, `/us-np/mock-exam` — reusable `exam-landing.tsx` with interactive sample questions, FAQ, structured data (FAQPage, Article, EducationalOccupationalCredential)
- **Exam Hub Pages**: `/nclex-rn`, `/nclex-pn`, `/canada-np`, `/us-np` — reusable `exam-hub.tsx` with internal linking grids, key stats, cross-links (note: `/rex-pn` uses existing `RexPnHub`)
- **Condition Pages**: `/conditions/:slug` (7: hypertension, diabetes, asthma, copd, heart-failure, sepsis, pneumonia) — `condition-page.tsx` with MedicalCondition structured data
- **Medication Pages**: `/medications/:slug` (5: metformin, lisinopril, warfarin, insulin, amiodarone) — `medication-page.tsx` with Drug structured data
- **Lab Value Pages**: `/lab-values/:slug` (5: sodium, potassium, troponin, creatinine, inr) — `lab-value-page.tsx`
- Data files: `client/src/data/seo-exam-data.ts`, `seo-conditions.ts`, `seo-medications.ts`, `seo-lab-values.ts`
- All pages in sitemap.xml and server-side meta injection (seo-meta.ts)

## Paramedic SEO Content Engine
- 5 content types: Topic Pages, Category Pages, Glossary Entries, Comparison Pages, Study Guides
- DB tables: `paramedic_topic_pages`, `paramedic_category_pages`, `paramedic_glossary_entries`, `paramedic_comparison_pages`, `paramedic_study_guides`
- All tables enforce `contentDomain = 'paramedic'` at query level
- Public routes: `/paramedic/topic/:slug`, `/paramedic/category/:slug`, `/paramedic/glossary/:slug`, `/paramedic/compare/:slug`, `/paramedic/study-guide/:slug`, `/paramedic/exam-prep/:slug`
- Admin: Paramedic SEO Manager at `/admin/paramedic-seo` with CRUD, SEO validation, internal link previews
- API: `/api/paramedic-seo/{type}` (admin CRUD), `/api/paramedic-seo/public/{type}/:slug` (public fetch)
- Internal linking engine: auto-connects topics↔categories, topics↔glossary, cornerstone content, sibling topics
- Sitemap: Published pages included via `generateAlliedSitemapAsync()` and `/api/paramedic-seo/sitemap-urls`
- Structured data: Article, FAQPage, BreadcrumbList, DefinedTerm, ItemList schemas
- SEO components in `client/src/allied/components/paramedic-seo-components.tsx`
- Server routes in `server/paramedic-seo.ts`

## Blog Batch Generator
- `POST /api/blog/generate-batch` generates blog posts via OpenAI (gpt-4o-mini, 16k tokens)
- Frontend sends topics one-at-a-time to avoid HTTP timeout (each post takes ~30s)
- Schedule dates pre-computed on frontend and passed via `overrideDates` to preserve postsPerDay/smartSchedule semantics
- Smart schedule mode fetches occupied days from `/api/blog/occupied-days` and fills free days only

### MLT Admin Content Studio
- **Route**: `/admin/mlt` with sub-routes for questions, flashcards, lessons, import, seo, publish
- **API**: All routes under `/api/admin/mlt/*` in `server/mlt-admin-routes.ts`
- **Features**: Question CRUD with full metadata, bulk import (JSON/CSV/structured text), import validation with Jaccard duplicate detection (>70% similarity threshold), import history with rollback, content distribution dashboard, flashcard/lesson CRUD, SEO panel, publish status bar
- **DB**: Uses existing `allied_questions`, `allied_flashcards`, `allied_lessons` tables filtered by `career_type='mlt'`, plus `mlt_import_history` table for tracking imports
- **Disciplines**: 10 MLT domains (Hematology, Clinical Chemistry, Microbiology, Blood Banking, Urinalysis, Immunology/Serology, Molecular Diagnostics, Lab Operations, Quality Assurance, Body Fluids)
- **Frontend**: `client/src/allied/pages/mlt-admin.tsx` — single-page tabbed interface with URL-derived tab state
