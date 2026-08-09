# U.S. PN / NCLEX-PN Cram Library

Status: ACTIVE AUTHORING
Locale: United States
Exam: NCLEX-PN
Level: Entry-level practical/vocational nursing (LPN/LVN)
Authored checkpoint: 444 Cram lessons

## Purpose

These are not shortened textbook chapters. Each Cram lesson is a rapid nursing-decision pathway for NCLEX-PN clinical judgment, prioritization, safety, delegation/assignment awareness, medication safety, and recognition of changes requiring escalation.

The library is authored against the current NCSBN NCLEX-PN test plan and U.S. entry-level LPN/LVN scope. It must not assume RN assessment authority, independent medical diagnosis, independent prescribing, or jurisdiction-specific tasks that may exceed practical/vocational nursing scope.

The numeric authoring checkpoint is not a production-completion claim. Production completion requires stable reconciliation against the learner-reachable `us-lpn-nclex-pn` full-lesson estate and zero unexplained `MISSING_CRAM` rows. Aggregate audit/source counts and sample slugs do not by themselves prove that a newly authored topic closes a serving production row.

## Cram lesson contract

Every lesson must contain:

- `id` — stable deterministic identifier
- `title` — learner-facing topic title
- `system` — primary body-system or professional-practice grouping
- `clientNeeds` — NCLEX-PN Client Needs category/subcategory mapping
- `clinicalJudgment` — relevant NCSBN clinical judgment functions
- `lifespan` — applicable ages/stages
- `acuity` — routine, urgent, emergent, or mixed
- `bottomLine` — 1–3 sentences stating the most important nursing decision
- `recognize` — high-yield cues and expected/abnormal patterns
- `priorities` — ordered nursing priorities within PN scope
- `assessMonitor` — focused observations, measurements, and trend monitoring
- `interventions` — scope-appropriate nursing actions and collaborative care
- `medicationSafety` — administration checks, adverse effects, hold/escalation cues, antidotes or monitoring when relevant
- `complications` — likely or high-risk complications and earliest warning cues
- `redFlags` — findings requiring immediate RN/provider/rapid-response/EMS escalation as appropriate
- `teaching` — practical patient/family education
- `delegationScope` — what the PN may do, what must be escalated, and common assignment/delegation traps without asserting state-specific law as universal
- `examTrap` — tempting but unsafe/incorrect NCLEX-PN choice
- `oneLinePearl` — last-second recall line
- `sourceBasis` — authoritative U.S. source(s) supporting clinical claims
- `sourceAsOf` — source review date
- `statePolicyCheck` — `true` when nurse practice acts, facility policy, medication administration authority, IV therapy, delegation, pronouncement, or other scope issues vary by state

## Authoring rules

1. Use the 2026 NCLEX-PN test plan as the exam blueprint.
2. Keep nursing actions within entry-level LPN/LVN scope and explicitly escalate unstable, newly complex, or diagnostically uncertain presentations.
3. Never teach a state-variable scope rule as universal U.S. law. Mark `statePolicyCheck: true` when applicable.
4. Emphasize safety, infection prevention, medication administration, basic care/comfort, focused data collection, reinforcement of teaching, trend recognition, and timely reporting.
5. Preserve RN/provider collaboration: do not rewrite RN-level comprehensive assessment, care-plan initiation, triage, independent teaching, or medical decision-making as PN autonomous functions.
6. For prioritization, unstable/acute changes outrank routine tasks; airway/breathing/circulation, severe neurologic change, hemorrhage, sepsis, anaphylaxis, hypoglycemia, and medication toxicity require rapid escalation.
7. Medication lessons must distinguish expected effects from serious adverse reactions and include clinically relevant hold/report parameters rather than memorized drug lists alone.
8. Include pediatrics, maternity/newborn, adult, older adult, mental health, rehabilitation, long-term care, and community settings across the library.
9. Use U.S. units and conventions where they are standard in NCLEX-PN preparation, while teaching conversions when clinically necessary.
10. Avoid obsolete protocols, unsupported mnemonics, fake precision, blanket oxygen administration, and other legacy exam-prep shortcuts that conflict with current practice.

## Source hierarchy

1. NCSBN NCLEX-PN Test Plan and clinical judgment framework
2. Federal U.S. sources such as CDC, FDA, HHS, OSHA, and CMS when applicable
3. National specialty organizations and evidence-based U.S. guidelines (for example AHA, ADA, ACOG, AAP)
4. State boards of nursing or facility policy for jurisdiction-variable scope issues

## Publication rule

Clinical authoring remains separate from rendering/integration code. Do not dilute or alter clinical meaning merely to satisfy a UI extractor; adapt the serving layer or perform an explicit schema migration instead.
