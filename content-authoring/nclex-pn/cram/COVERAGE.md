# U.S. PN / NCLEX-PN Cram Coverage

Status: ACTIVE AUTHORING
Baseline date: 2026-08-07
Authored Cram lessons: 240
Locale: United States
Level: PN / LPN / LVN entry-level practice
Exam alignment: 2026 NCLEX-PN Test Plan

## Current baseline

The library now contains 240 distinct authored Cram lessons spanning every NCLEX-PN Client Needs area and major practical-nursing clinical domains. Authoring depth includes chronic and emergency cardiovascular care, respiratory deterioration and airborne TB, renal/urologic care, common GI and endocrine disorders, maternal/fetal complications, pediatric emergencies, neuromuscular respiratory-risk disorders, psychopharmacologic emergencies, hematologic clotting disorders, oncology metabolic/compressive emergencies, and increasingly granular medication-class safety.

The first 100 lessons established the production baseline. Authoring has continued beyond that count. No numeric milestone by itself is a declaration of complete coverage.

## Production denominator and open families

The 2026-08-05 practical-nursing production audit measured `us-lpn-nclex-pn` at **1,177 learner-reachable full lessons** after catalogue recovery. Across the two PN pathways, Cram derivation was possible for only **277 of 2,613 lessons (10.6%)**, leaving **2,244 PN-family lessons** in the `PN-015-cram-safety-gap` family. The same audit identified **320 pharmacology lessons** missing required medication-teaching elements and recommended remediating that higher-clinical-risk family first.

The newest 60 lessons after the 180 checkpoint intentionally target that measured pharmacology family. They now cover high-risk diabetes/thyroid agents, psychotropics, analgesics, acid suppression, cardiovascular agents, antibiotic classes, respiratory controller/rescue therapy, antithrombotics, emergency cardiac medications, neurologic agents, GI motility/antiemetic therapy, modern diabetes agents, dementia medications, osteoporosis therapy, opioid reversal, anaphylaxis treatment, and obstetric oxytocin safety. These are authored Cram source objects; they are not counted as resolved production rows until stable serving-row lineage is established.

## Completion gate

The U.S. PN Cram estate is complete only when all of the following are true:

1. Every applicable full U.S. PN/LPN/LVN lesson has exactly one corresponding high-quality Cram lesson or an explicitly documented reason that no separate Cram lesson is appropriate.
2. The full-lesson-to-Cram mapping uses stable identifiers and does not depend on title similarity alone.
3. No Canadian REx-PN scope, legislation, medication availability, measurement convention, or exam assumptions are silently reused for the U.S. pathway.
4. Every Cram lesson contains a real bottom line, recognition cues, prioritized actions, monitoring, medication safety when relevant, complications, red flags, teaching, a PN/LVN scope or delegation note, an exam trap, a rapid-review pearl, source basis, and source date.
5. State-variable nursing scope, mandatory reporting, consent, public-health, IV therapy, medication administration, and delegation rules are marked with `statePolicyCheck: true` rather than presented as universal U.S. law.
6. Duplicate or near-duplicate lessons are merged or differentiated by a clinically meaningful decision pathway.
7. High-risk clinical claims are refreshed against current authoritative U.S. guidance before publication.
8. Topics outside entry-level PN/LPN/LVN scope are framed around recognition, monitoring, safe implementation, communication, and escalation rather than autonomous diagnosis or prescribing.

## Serving-scope finding

The production pathway is `us-lpn-nclex-pn`. The production entitlement model identifies the American practical-nurse learner as `country=US`, `tier=LVN_LPN`. Serving lessons are restricted to published `US_ONLY` or `BOTH` content plus the applicable `lvn`, `free`, and `general` tiers. The older TypeScript `contentMap` is a mixed RN/RPN/NP/general collection and cannot by itself prove American PN coverage.

## Reconciliation work still required

The remaining coverage phase must inventory the current serving U.S. PN full-lesson estate, extract its stable lesson/topic identifiers, compare them with this Cram library, and produce three sets: `MATCHED`, `MISSING_CRAM`, and `NOT_APPLICABLE_TO_US_PN`. Every `MISSING_CRAM` item must then be authored and quality-reviewed before coverage can be called complete.

Do not convert the current lesson count into a completion claim until that reconciliation reaches zero unexplained gaps.
