# NurseNest - Complete Nursing Learning Platform

## Overview
NurseNest is an interactive and adaptive learning platform designed for nursing and allied health students across 17 career verticals (RPN/LVN, RN, NP, etc.). It provides comprehensive learning resources, exam preparation for NCLEX, REX-PN, and other allied health exams, performance analytics, and AI-powered content generation. The platform aims to enhance clinical reasoning, improve nursing knowledge, and critical thinking to ultimately improve patient care outcomes through a robust and region-aware learning environment.

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
The application is built with Vite, React, and Express 5 on Node.js with TypeScript. TanStack React Query manages server state via a RESTful API. Authentication uses username/password with session management. A subscription system supports regional pricing. Core features include interactive learning modules, a mock exam engine with stratified random sampling and Strict Exam Mode, and an admin dashboard for analytics and content management. AI integration includes OpenAI-powered blog automation, custom i18n for 15 languages, an Adaptive CAT Engine, Pass Probability Projection Engine, and Next Best Action Engine. Exam blueprints are database-driven. Content is organized by body system for various nursing levels, with pre/post-test questions. A 3-step onboarding process generates personalized study plans. Admin tools like QBank Factory and Product Generator V2 facilitate AI-driven content generation. Programmatic SEO practice question pages and an allied health architecture support 14 career verticals. NGN question types and a partial credit scoring engine are implemented. Lesson content is served via a server-side API for client-side optimization. SEO features include 301 redirects, sitemap generation, and related articles. Access control uses a tier system (free, rpn, rn, np, admin). The platform also includes a Spaced Repetition System with a `flashcard_reviews` schema, an Exam Calculator, Quick Study Sessions pulling from weak areas, and a Study Progress Momentum System tracking streaks, goals, confidence, and exam readiness. The Lesson Library features tier-adaptive heroes, featured topics, progress cards, and study time estimates. Clinical Case Studies provide multi-stage scenarios with decision points. Regional measurement adaptation dynamically converts content units based on user region (e.g., US vs. CA). A Tester Access System manages invite codes and gathers feedback.

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

## Lesson Content Batches
- **Batches A-C**: Foundation lessons (original), blood transfusion reactions
- **Batch D**: Cardiac & vascular emergencies (12 lessons)
- **Batch E**: Respiratory & procedural emergencies (12 lessons)
- **Batch F**: Obstetric complications (12 lessons)
- **Batch G**: Mental health & behavioral (12 lessons)
- **Batch H**: Pharmacology clinical applications (12 lessons)
- **Batch I**: Pediatric conditions & congenital disorders - trisomy 21, hypospadias, duchenne MD, VP shunt (12 lessons)
- **Batch J**: STI & infectious disease - chlamydia, syphilis, bacterial meningitis, prostate cancer (12 lessons)
- **Batch K**: GI, hepatic & renal - pancreatitis, cirrhosis, CKD, tonsillectomy (12 lessons)
- **Batch L**: Neurological - Alzheimer, Guillain-Barre, myasthenia gravis, newborn of diabetic mother (12 lessons)
- **Batch M**: Musculoskeletal & oncology - gout, osteoporosis, compartment syndrome, rheumatoid arthritis (12 lessons)
- **Batch N**: Vestibular & balance disorders - BPPV, Meniere's disease, labyrinthitis, Ramsay-Hunt syndrome (12 lessons)
- **Batch O**: ENT & upper airway - rhinosinusitis, pharyngitis/strep, otitis externa, papilledema (12 lessons)
- **Batch P**: Stress physiology & men's health advanced - HPA axis/cortisol, male infertility, BPH/TURP advanced, hearing loss differential (12 lessons)
- **Tier counts**: free=569 rpn=521 rn=223 np=300 total=1,613 questions=3,915

## OSCE Skills Practice
- **Route**: `/osce-skills`
- **Total**: 69 interactive skill stations with step-ordering exercises
- **Categories (13)**: Core Skills (5), Assessment (6), Procedure (14), Drain & Tube Care (4), Hygiene (1), Acute Care (11), Maternal & Newborn (5), Pediatric (5), Mental Health (4), Communication (5), Geriatric Care (3), Community Health (3), Critical Care (4)
- **Data files**: `osce-skills-data.ts` (9), `osce-skills-data-2.ts` (4), `osce-skills-data-3.ts` (11), `osce-skills-data-4.ts` (11), `osce-skills-data-5.ts` (10), `osce-skills-data-6.ts` (9), `osce-skills-data-7.ts` (15)
- **Page**: `client/src/pages/osce-skills.tsx`
- **Enriched fields**: examLevel, timeLimit, candidateInstructions, patientActorScript, examinerChecklist, criticalFailCriteria, examinerQuestions, teachingPoints
- **Features**: Category filtering (13 tabs), step ordering exercise, pass/fail scoring (70% + all critical steps), review mode with rationales, examiner checklist, examiner questions, teaching points, critical fail criteria, standardized patient scripts

## Clinical Case Simulations
- **Base cases (7)**: sepsis-progression, chest-pain-mi, dka-management, postpartum-hemorrhage, pediatric-respiratory-emergency, anaphylaxis-management, stroke-thrombolytic
- **Batch 2 (7)**: gi-bleed-management, copd-exacerbation, hyperkalemia-emergency, hip-fracture-elderly, acute-pancreatitis, pulmonary-embolism, meningitis-assessment
- **Batch 3 (6)**: heart-failure-acute, burns-management, opioid-overdose, diabetic-foot-ulcer, preeclampsia-management, sickle-cell-crisis
- **Batch 4 (6)**: pneumothorax-tension, thyroid-storm, spinal-cord-injury, pediatric-dehydration, blood-transfusion-reaction, acute-mi-stemi
- **Batch 5 (6)**: addisonian-crisis, status-epilepticus, c-diff-colitis, chest-tube-management, psychiatric-emergency, neonatal-distress
- **Total**: 32 clinical case simulations
- Types extracted to `client/src/data/clinical-case-types.ts` to avoid circular imports

## Medication Mastery
- **Total**: 60 medications (8 original + 52 new across 4 batches)
- **Batch A** (13): Cardiovascular & Respiratory — amlodipine, digoxin, amiodarone, nitroglycerin, dopamine, epinephrine, atropine, adenosine, clopidogrel, albuterol, ipratropium, fluticasone, montelukast
- **Batch B** (13): Neurological & Psychiatric — phenytoin, levetiracetam, lorazepam, haloperidol, sertraline, lithium, naloxone, sumatriptan, donepezil, carbidopa-levodopa, gabapentin, quetiapine, diazepam
- **Batch C** (13): Endocrine, GI, Anti-infective — metformin, glipizide, prednisone, hydrocortisone, omeprazole, ondansetron, metoclopramide, vancomycin, gentamicin, ciprofloxacin, metronidazole, fluconazole, acyclovir
- **Batch D** (13): Renal, Pain, Blood, Maternity — spironolactone, hydrochlorothiazide, mannitol, enoxaparin, alteplase, acetaminophen, ibuprofen, ketorolac, fentanyl, hydromorphone, magnesium-sulfate, oxytocin, terbutaline
- **Body systems**: Cardiovascular, Respiratory, Neurological, Endocrine, Renal, Hematology, Musculoskeletal, GI, Anti-infective, Maternity

## ABG/Electrolyte Simulator
- **Total**: 64 cases (33 electrolyte + 31 ABG)
- **Original**: 8 electrolyte + 6 ABG = 14 cases inline in electrolyte-abg-simulator.tsx
- **Electrolyte Batch 1** (13): hypophosphatemia, hyperphosphatemia, hypokalemia-diuretic, hypernatremia-diabetes-insipidus, hyponatremia-siadh, hypercalcemia-malignancy, hypocalcemia-parathyroidectomy, hypermagnesemia-renal, hypomagnesemia-alcoholism, metabolic-acidosis-ckd, hyperkalemia-crush-injury, hyponatremia-exercise, hypocalcemia-pancreatitis
- **Electrolyte Batch 2** (12): hyperkalemia-ace-inhibitor, hypokalemia-vomiting, hypernatremia-tube-feeding, hyponatremia-heart-failure, hypercalcemia-thiazide, hypocalcemia-massive-transfusion, hyperchloremia, hypochloremia, hypokalemia-insulin-dka, tumor-lysis-syndrome, milk-alkali-syndrome, hypernatremia-lithium
- **ABG Batch 1** (13): acute-asthma, pe-hyperventilation, salicylate-toxicity, renal-tubular-acidosis, methanol-ingestion, chronic-vomiting-abg, opioid-overdose-abg, ards-abg, liver-failure-abg, near-drowning, post-surgical-abg, high-altitude, vent-settings-abg
- **ABG Batch 2** (12): ethylene-glycol, copd-acute-on-chronic, burns-inhalation, massive-transfusion-abg, guillain-barre-abg, diabetic-mixed, pyloric-stenosis, pneumonia-abg, cyanide-poisoning, addisons-crisis-abg, pregnancy-abg, malignant-hyperthermia
- Data files: `client/src/data/electrolyte-cases-batch-{1,2}.ts`, `client/src/data/abg-cases-batch-{1,2}.ts`

## Lesson Tier Differentiation
- **RPN tab**: fundamentalsSystems + delegationSystems + clinicalScenariosSystems + medMathSystems + rpnNonPharm
- **RN tab**: clinicalScenariosSystems + medMathSystems + rnNonPharm (no fundamentals/delegation)
- **NP tab**: medMathSystems + npNonPharm (no fundamentals/delegation/clinical scenarios)
- **Duplicate removal**: 38 lesson IDs that appeared in both rpnSystems and rnSystems were removed from rnSystems
- **Fallback removed**: Tier-suffix content fallback in index.ts was removed to prevent placeholder content from showing base content