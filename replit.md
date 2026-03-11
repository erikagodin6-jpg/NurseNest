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
The platform utilizes React with TypeScript, Wouter for routing, shadcn/ui with Radix UI, and Tailwind CSS v4, supporting 20 themes and DM Sans typography. Key UI components include `ContentGate`, `PauseAndThink`, `ProgressiveDisclosure`, `CuriosityHook`, and `KnowledgeCheck`. A digital product builder offers a Canva-style editor with drag-and-drop, AI image, and content generation capabilities. The design system incorporates premium visuals, dual-tone top bars, and watermarked PDF previews. Global CSS enforces `overflow-x: hidden` on html/body and `box-sizing: border-box` to prevent horizontal scrolling on mobile. Dialogs use `max-h-[90vh]` with `overflow-y-auto` and `w-[calc(100%-2rem)]` for mobile safety. Routes `/signup` and `/register` redirect to `/login` using wouter `<Redirect>` to preserve locale context.

### Technical Implementations
The application is built with Vite, React, and Express 5 on Node.js with TypeScript. Server state is managed by TanStack React Query via a RESTful API. Authentication uses username/password with session management, and a subscription system supports regional pricing. Core features include interactive learning modules, a mock exam engine with stratified random sampling and Strict Exam Mode, and an admin dashboard. AI integrations encompass OpenAI-powered blog automation, custom i18n for 15 languages, an Adaptive CAT Engine, Pass Probability Projection Engine, and Next Best Action Engine. Exam blueprints are database-driven, and content is organized by body system for various nursing levels, incorporating pre/post-test questions. The platform includes a 3-step onboarding process for personalized study plans, admin tools like QBank Factory and Product Generator V2 for AI-driven content generation, and programmatic SEO for practice question pages. It supports NGN question types, a partial credit scoring engine, and a Spaced Repetition System. Content access is controlled via a tier system (free, rpn, rn, np, admin). Other features include 301 redirects, sitemap generation, related articles, Exam Calculator, Quick Study Sessions, Study Progress Momentum System, and a Tester Access System. The Lesson Library provides tier-adaptive heroes, featured topics, progress cards, and study time estimates. Clinical Case Studies offer multi-stage scenarios with decision points, and regional measurement adaptation converts units dynamically.

### Feature Specifications
- **Question Bank System**: Supports Admin, Exam, Study, and Browse modes with JSON import, inline editing, status toggling, timed exams, and analytics. Enforces content safety rules based on user tier and region.
- **Paramedic EMS Scenario Simulation System**: Manages interactive paramedic scenarios with detailed dispatch, assessment, decision points, and debriefing. Scenarios are segmented by content domain, profession track, region, visibility, difficulty, and exam relevance. Includes a frontend player and an admin panel for scenario creation and management.
- **Referral Discount System**: Users can generate unique referral codes. Friends receive a 15% discount on their first subscription, and referrers earn 7 free premium days. The system tracks uses and integrates with Stripe for discount application.
- **Beta Tester Access Code Management**: Admin dashboard functionality for generating, managing, and tracking beta invite codes with customizable tiers, usage limits, and durations.
- **Paramedic Landing & Hub Pages**: Dedicated SEO-optimized pages for paramedic careers, including landing pages, exam-specific pages (PCP, ACP, NREMT), and content hubs for lessons, exams, flashcards, and scenarios.
- **SEO Page System**: Includes dynamically generated landing pages for mock exams, hub pages for nursing certifications, and dedicated pages for medical conditions, medications, and lab values, all with structured data and comprehensive SEO metadata. Breadcrumb JSON-LD is centralized in the `SEO` component (`client/src/components/seo.tsx`) — it auto-generates breadcrumbs from the current path or accepts an explicit `breadcrumbs` prop. The `BreadcrumbNav` component is UI-only (no JSON-LD injection). The `additionalStructuredData` prop auto-filters out `BreadcrumbList` entries as a safety guard.
- **Paramedic SEO Content Engine**: Generates and manages various SEO content types (Topic, Category, Glossary, Comparison, Study Guides) for paramedic content, supporting internal linking and structured data.
- **MLT Exam Engines**: Provides four modes: Canada CSMLS Exam, USA ASCP CAT Exam, Adaptive Practice (with smart remediation), and customizable Practice Exam. Features IRT-based ability estimation, CAT stop logic, and anti-gaming detection.
- **MLT Lab Image & Microscopy System**: Manages lab image metadata, relational linking to questions/flashcards/lessons, and user drill practice history. Includes an Admin Image Library for upload and metadata editing, and various image drill modes.
- **Blog Batch Generator**: Automates the generation of blog posts via OpenAI.
- **MLT Admin Content Studio**: A comprehensive admin interface for managing MLT content (questions, flashcards, lessons) with CRUD operations, bulk import, import validation, and content distribution dashboards.
- **MLT Student Dashboard**: A 9-tab dashboard (`/dashboard/mlt`) for MLT certification candidates covering Overview, Canada (CSMLS), USA (ASCP), Exams, Flashcards, Lessons, Performance, Wrong Answers, and Study Plan. Features domain mastery heatmap, radar chart, wrong answer notebook with 4 one-click remediation actions (Review Lesson, Study Flashcards, Retry Similar, Adaptive Drill), conversion gating/locked overlays for free users, study streak/time tracking, upgrade banners, and study plan viewer with weekly schedule and checkpoints. Routes: `/dashboard/mlt/*`.
- **MLT SEO Landing Pages**: SEO-optimized pages for MLT certification keywords at `/mlt/exam-prep`, `/mlt/study-guide`, `/mlt/mock-exam`, `/mlt/flashcard-prep`, `/mlt/canada/practice-questions`, `/mlt/usa/practice-questions`. Includes FAQ schema (JSON-LD), Course structured data, internal linking, and CTAs.
- **MLT Analytics Tracking**: Client-side analytics utility (`client/src/allied/mlt-analytics.ts`) tracking page views, quiz/lesson/flashcard/exam start/complete, conversion events, and upgrade prompt interactions. Events stored in `mlt_analytics_events` table via `/api/mlt/analytics/event` POST endpoint. Uses `navigator.sendBeacon` with JSON Blob for reliable tracking.

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

## Pharmacy Technician Section (Allied)
- **Database tables**: `pharmtech_lessons`, `pharmtech_flashcard_decks`, `pharmtech_flashcards`, `pharmtech_questions`, `pharmtech_exams`, `pharmtech_exam_attempts` — all with UUID primary keys
- **Backend API**: `server/pharmtech-routes.ts` — public endpoints at `/api/pharmtech/*`, admin CRUD at `/api/admin/pharmtech/*` with `requireAdmin` middleware
- **Frontend pages**: 7 pages under `client/src/allied/pages/pharmtech-*.tsx` — hub, lessons (library+detail), flashcards (decks+flipcard), exams (list+timed/tutor modes+review), practice questions, study guide, admin
- **Routes**: Registered in `client/src/allied/allied-routes.tsx` under `/pharmacy-technician/...`
- **Seed data**: `server/pharmtech-seed.ts` — 10 lessons, 8 flashcard decks (101 cards), 202 questions, 6 exams
- **Access control**: Free users get 10 practice questions (server-side LIMIT), Pro users get full access. Exams/flashcards/lessons are publicly available
- **Branding**: Green/emerald color scheme (`green-600`, `emerald-50`) for pharmacy tech content
- **Exam modes**: Timed mode (countdown timer, navigator panel, flagging), Tutor mode (rationale shown after each answer)
- **Admin**: Content manager at `/admin/allied-content/pharmacy-technician` with publish/unpublish and delete for all content types

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

## MLT Lab Image & Microscopy System
- **DB Tables**: `mlt_lab_images` (image metadata with 16 image types across 12 disciplines), `mlt_lab_image_links` (relational linking to questions/flashcards/lessons), `mlt_image_drill_attempts` (user drill practice history)
- **Admin Image Library**: `/admin/mlt/images` — upload, metadata editing, discipline/tag/stain-type assignment, approval status (exam/lesson/flashcard/public), search/filter, bulk operations
- **Image Types**: hematology_cell_morphology, microbiology_gram_stain, microbiology_colony_morphology, urinalysis_sediment, urinalysis_chemical, blood_bank_reactions, blood_bank_antibody_panel, clinical_chemistry_qc, clinical_chemistry_electrophoresis, coagulation, parasitology, mycology, body_fluid_analysis, immunology_serology, molecular_diagnostics, specimen_processing
- **Disciplines**: hematology, microbiology, urinalysis, blood_banking, clinical_chemistry, coagulation, parasitology, mycology, body_fluids, immunology, molecular, specimen_processing
- **Components**: `LabImageViewer` (zoom, pan, fullscreen, mobile responsive, keyboard accessible, skeleton loading), `AnnotatedImageViewer` (pin markers, tooltips, numbered callouts, show/hide toggle, exam mode hidden annotations), `SideBySideViewer`, `ImageLayout` (single/side-by-side/stacked/image-plus-table)
- **Image Drill Modes**: `/mlt/image-drill` and `/careers/mlt/image-drill` — 10 drill types (identify_cell, identify_organism, identify_crystal, identify_cast, identify_artifact, identify_stain, identify_colony, identify_reaction, qc_issue, specimen_rejection)
- **API Routes**: `GET/POST/PATCH/DELETE /api/mlt/lab-images`, `POST /api/mlt/lab-images/upload`, `POST /api/mlt/lab-images/bulk-update`, `GET/POST/DELETE /api/mlt/lab-image-links`, `GET /api/mlt/lab-images/meta`, `GET /api/mlt/image-drill/images`, `POST /api/mlt/image-drill/attempt`, `GET /api/mlt/image-drill/history`
- **Upload**: Multer-based with file type validation (JPEG, PNG, WebP, TIFF), 20MB size limit, object storage integration
- **Seeded**: 12 placeholder lab image records with rich metadata (cells, organisms, crystals, casts, QC charts) for admin replacement

## Clinical Case Study Engine
- **DB Tables**: `case_studies` (id, title, tier, difficulty, body_system, category, scenario_intro, status, region_scope, timestamps), `case_study_steps` (id, case_id, step_number, clinical_update_text, exhibit_data JSONB), `case_study_questions` (id, case_step_id, question_text, question_type, answer_options JSONB, correct_answer JSONB, rationale, points)
- **Question types**: multiple_choice, multiple_response, bowtie, priority, drag_drop, fill_blank
- **Exhibit data**: JSONB with optional keys: vitals, labs, notes, medications, orders — displayed in tabbed clinical panel
- **Scoring**: Per-question scoring with partial credit for SATA/multiple_response types, total case study score display
- **Student page**: `/clinical-case-studies` — lists published case studies, step-by-step progression with clinical exhibits, question rendering, and final score summary
- **Admin page**: `/admin/case-studies` — Case Study Builder: create/edit case studies, add/reorder steps with exhibit data (JSON), add questions per step, publish/draft toggle
- **API routes**: `/api/case-studies` (GET list, POST create), `/api/case-studies/:id` (GET, PATCH, DELETE), `/api/case-studies/:id/full` (GET full case with steps and questions), `/api/case-studies/:id/steps` (GET, POST), `/api/case-study-steps/:id` (PATCH, DELETE), `/api/case-study-steps/:id/questions` (GET, POST), `/api/case-study-questions/:id` (PATCH, DELETE)
- **Region/unit rules**: Canadian tiers use SI units in exhibit data; US tiers use US units — admin configures per-case via regionScope and exhibit data values

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
