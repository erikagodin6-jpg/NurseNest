# NurseNest - Complete Nursing Learning Platform

## Overview
NurseNest is an adaptive learning platform for nursing and allied health students across 17 career verticals. It provides comprehensive learning resources, exam preparation (NCLEX, REX-PN, etc.), performance analytics, and AI-powered content generation. The platform aims to enhance clinical reasoning, nursing knowledge, and critical thinking to improve patient care outcomes through a robust and region-aware learning environment.

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
The platform uses React with TypeScript, Wouter for routing, shadcn/ui with Radix UI, and Tailwind CSS v4, supporting 20 themes and DM Sans typography. Key UI components include `ContentGate`, `PauseAndThink`, `ProgressiveDisclosure`, `CuriosityHook`, and `KnowledgeCheck`. A digital product builder provides a Canva-style editor with drag-and-drop, AI image, and content generation. The design system features premium visuals, dual-tone top bars, and watermarked PDF previews.

### Technical Implementations
The application is built with Vite, React, and Express 5 on Node.js with TypeScript. TanStack React Query manages server state via a RESTful API. Authentication uses username/password with session management. A subscription system supports regional pricing. Core features include interactive learning modules, a mock exam engine with stratified random sampling and Strict Exam Mode, and an admin dashboard for analytics and content management. AI integration includes OpenAI-powered blog automation, custom i18n for 15 languages, an Adaptive CAT Engine, Pass Probability Projection Engine, and Next Best Action Engine. Exam blueprints are database-driven. Content is organized by body system for various nursing levels, with pre/post-test questions. A 3-step onboarding process generates personalized study plans. Admin tools like QBank Factory and Product Generator V2 facilitate AI-driven content generation. Programmatic SEO practice question pages and an allied health architecture support 14 career verticals. NGN question types and a partial credit scoring engine are implemented. Lesson content is served via a server-side API for client-side optimization. SEO features include 301 redirects, sitemap generation, and related articles. Access control uses a tier system (free, rpn, rn, np, admin). The platform also includes a Spaced Repetition System, an Exam Calculator, Quick Study Sessions pulling from weak areas, and a Study Progress Momentum System. The Lesson Library features tier-adaptive heroes, featured topics, progress cards, and study time estimates. Clinical Case Studies provide multi-stage scenarios with decision points. Regional measurement adaptation dynamically converts content units based on user region. A Tester Access System manages invite codes and gathers feedback.

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
- **OpenAI**: Used for blog posts, AI flashcards, lesson content, AI medical images, micro-lectures, and a 5-step content pipeline.
- **Test Bank Generator**: Ensures strict question count and JSON schema validation.
- **NGN QBank Generator**: Admin batch generation system with multiple prompt templates and strict validation.

### Social Media
- Meta Graph API: For social media scheduling.

## Lesson Library Architecture
- All lesson data is in static TS files under `client/src/data/lessons/`
- `safeMerge()` in `index.ts` deduplicates at merge time; `isPlaceholder()` filters generic/template content
- Tier derived from slug suffix: `-rpn`, `-rn`, `-np`, or `"general"`
- System cards in `lessons.tsx` show lesson count badges and progress bars (completed/total)
- Lesson counts: free=564, rpn=521, rn=244, np=316, total=1645 (as of Mar 2026)
- DB exam questions: rpn=1985, rn=1437, np=1587, total=5009 (as of Mar 2026)
- Question files in `client/src/data/exam-questions/`: rpn-expansion-[a-g], rn-expansion-[a-h], np-expansion-[a-d], pn-us-batch-01, rn-us-batch-01, np-us-batch-01, rpn-cases-01, rn-cases-01, np-cases-01, cnple-batch-[01-03], us-cases-01, plus 56 np-exam-batch files
- Exam blueprints: REX-PN (CA), NCLEX-PN (US), NCLEX-RN (US), NCLEX-RN-CA (CA), CNPLE (CA), AANP (US), ANCC (US), plus readiness exams with CA variants
- DB tables `allied_lessons` and `content_items` are empty; all content is static TS

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

## SEO Page System
- **Exam Landing Pages**: `/nclex-rn/mock-exam`, `/nclex-pn/mock-exam`, `/rex-pn/mock-exam`, `/canada-np/mock-exam`, `/us-np/mock-exam` — reusable `exam-landing.tsx` with interactive sample questions, FAQ, structured data (FAQPage, Article, EducationalOccupationalCredential)
- **Exam Hub Pages**: `/nclex-rn`, `/nclex-pn`, `/canada-np`, `/us-np` — reusable `exam-hub.tsx` with internal linking grids, key stats, cross-links (note: `/rex-pn` uses existing `RexPnHub`)
- **Condition Pages**: `/conditions/:slug` (7: hypertension, diabetes, asthma, copd, heart-failure, sepsis, pneumonia) — `condition-page.tsx` with MedicalCondition structured data
- **Medication Pages**: `/medications/:slug` (5: metformin, lisinopril, warfarin, insulin, amiodarone) — `medication-page.tsx` with Drug structured data
- **Lab Value Pages**: `/lab-values/:slug` (5: sodium, potassium, troponin, creatinine, inr) — `lab-value-page.tsx`
- Data files: `client/src/data/seo-exam-data.ts`, `seo-conditions.ts`, `seo-medications.ts`, `seo-lab-values.ts`
- All pages in sitemap.xml and server-side meta injection (seo-meta.ts)

## Blog Batch Generator
- `POST /api/blog/generate-batch` generates blog posts via OpenAI (gpt-4o-mini, 16k tokens)
- Frontend sends topics one-at-a-time to avoid HTTP timeout (each post takes ~30s)
- Schedule dates pre-computed on frontend and passed via `overrideDates` to preserve postsPerDay/smartSchedule semantics
- Smart schedule mode fetches occupied days from `/api/blog/occupied-days` and fills free days only