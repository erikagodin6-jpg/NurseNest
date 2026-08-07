# U.S. NCLEX-PN Cram Library

Status: ACTIVE AUTHORING
Locale: United States
Exam: NCLEX-PN
Level: Entry-level Licensed Practical/Vocational Nurse (LPN/LVN)
Serving tier: `rpn` with U.S. locale mapping to LPN/LVN

## Purpose

These are not shortened RN lessons and they are not generic textbook summaries. A U.S. PN Cram lesson is a rapid bedside decision pathway for the entry-level LPN/LVN: recognize cues, collect focused data, identify immediate threats, carry out authorized/ordered nursing care, administer and monitor medications safely, reassess the response, reinforce teaching, and report/escalate meaningful changes.

The clinical-authoring layer is separate from the renderer. Do not weaken or rewrite clinical meaning merely to satisfy a UI extractor; adapt the mapping/integration layer instead.

## Cram lesson contract

Every lesson must contain:

- `id` — stable deterministic identifier beginning `nclex-pn-us-`
- `title` — learner-facing title without tier boilerplate
- `system` — primary body system or professional-practice grouping
- `clientNeeds` — one or more 2026 NCLEX-PN Client Needs categories/subcategories
- `clinicalJudgmentSteps` — applicable NCSBN Clinical Judgment Measurement Model steps
- `bottomLine` — the bedside decision the learner must remember
- `recognize` — high-yield cues and pattern-recognition findings
- `assess` — focused PN-level data collection and reassessment priorities
- `actions` — safe prioritized nursing actions, including authorized emergency actions and ordered/protocol-driven care
- `diagnostics` — what ordered tests mean for bedside care, preparation, monitoring, and critical-result escalation; never imply independent medical diagnosis
- `medicationSafety` — indication, pre-administration checks, adverse effects, response monitoring, hold/clarify/escalate cues, and patient teaching when relevant
- `redFlags` — findings requiring rapid response, emergency response, RN/provider notification, transfer, or higher level of care
- `teaching` — reinforcement of the established teaching plan, self-care, prevention, return precautions, and adherence
- `scopeAndDelegation` — the PN/LVN boundary being tested; state Nurse Practice Act and employer policy control when scope varies
- `examTrap` — a tempting but unsafe, out-of-scope, delayed, or lower-priority NCLEX-PN answer
- `oneLinePearl` — last-second recall line
- `sourceBasis` — authoritative sources supporting the lesson
- `sourceAsOf` — source review date/year
- `statePolicyCheck` — `true` where state law/regulation, mandatory reporting, IV therapy scope, delegation authority, pronouncement, medication authority, or facility policy can materially change the action

## Authoring rules

1. Scope to entry-level LPN/LVN practice, not RN or APRN authority.
2. Never imply independent medical diagnosis, prescribing, or universal authority for IV push medications, blood products, central-line procedures, triage, delegation, initial comprehensive assessment, or care-plan ownership when those powers vary by state/employer.
3. When the patient is unstable, the lesson must make escalation explicit. Do not bury deterioration under routine tasks.
4. Use the clinical-judgment sequence when applicable: recognize cues -> analyze cues -> prioritize hypotheses -> generate solutions -> take action -> evaluate outcomes.
5. Assessment language should emphasize focused data collection, baseline comparison, trend recognition, and reassessment of response.
6. Medication sections must explain what to check before administration, what adverse effect matters most, and what response requires holding/clarifying/escalating under the applicable order/policy.
7. Diagnostic sections teach why an ordered test matters and what the nurse does with the result; they do not turn the PN into the diagnosing clinician.
8. Use U.S. terminology, medication naming, conventional units where U.S. exams commonly use them, and SI values when clinically standard or necessary to interpret the result.
9. Separate expected findings from dangerous findings. Every clinically meaningful lesson should answer “what changes the priority?”
10. Include lifespan-specific differences in adult, older-adult, maternity/newborn, pediatric, and adolescent content rather than applying adult assumptions universally.
11. Use trauma-informed, culturally responsive, disability-aware, non-stigmatizing language. Do not encode stereotypes as clinical risk factors.
12. No obsolete nursing myths, unsupported mnemonics, fake precision, routine oxygen without indication, routine clamping of chest tubes, Homan sign, aspiration of every IM injection, or other legacy teaching that conflicts with current evidence.
13. Jurisdiction-sensitive legal/scope statements use `statePolicyCheck: true` and direct the learner to the state Nurse Practice Act, board rules, and employer policy rather than inventing one national LPN scope.
14. Content can share underlying physiology with RN lessons, but the PN Cram decision path must be independently authored for PN-level actions and escalation.

## Core Cram flow

For serving/rendering, project each lesson in this order:

1. Bottom Line
2. Recognize It Fast
3. Focused Assessment
4. First Priorities
5. Diagnostics You Need to Understand
6. Medication Safety
7. Red Flags: Escalate
8. Patient Teaching
9. Scope / Delegation Check
10. Exam Trap
11. One-Line Pearl

Empty medication or diagnostic sections may be omitted only when genuinely not applicable; do not fabricate content to fill a box.

## Source hierarchy

1. NCSBN 2026 NCLEX-PN Test Plan and NCSBN clinical-judgment framework
2. U.S. federal agencies: CDC, FDA, NIH, OSHA, CMS, HHS as applicable
3. Current U.S. specialty-society guidelines and evidence-based professional standards
4. State boards of nursing / Nurse Practice Acts for jurisdiction-specific PN/LVN scope questions
5. High-quality international guidance only when no suitable U.S. source exists and the recommendation is applicable in the United States

## Publication rule

Clinical authoring and serving integration are separate gates. A lesson is not considered live merely because the authoring JSON exists. Publication requires mapping to the canonical lesson record, validation of the Cram projection, U.S. locale/tier routing, and learner-surface verification.
