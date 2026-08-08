# Practical Nursing Cram Library

Status: ACTIVE AUTHORING
Scope: Practical-nursing pathways and licensing/registration exams supported by NurseNest

## Purpose

A practical-nursing Cram lesson is a rapid clinical-decision pathway, not a truncated full lesson. Every qualifying full practical-nursing lesson must have a jurisdiction- and exam-scoped Cram counterpart before the pathway can be declared complete.

## Required attachment metadata

Every Cram lesson must include:

- `id` — stable deterministic Cram identifier
- `sourceLessonId` — exact canonical full-lesson identifier
- `countryId` and `countryLabel`
- `examId` and `examLabel`
- `tierId` — practical-nursing designation used by the served pathway
- `title` — learner-facing title without tier labels
- `system`
- `blueprintDomains` — exam/client-needs/competency mapping appropriate to the jurisdiction
- `lifespan`
- `acuity` — routine, urgent, emergent, or mixed
- `bottomLine`
- `recognize`
- `differentiate`
- `assessment`
- `workup`
- `management`
- `medicationSafety`
- `redFlags`
- `counselling`
- `followUp`
- `examTrap`
- `oneLinePearl`
- `sourceBasis`
- `sourceAsOf`
- `localPolicyCheck`

## Authoring rules

1. Full lesson and Cram lesson must teach the same clinical truth at different depth; Cram may compress, never contradict or arbitrarily truncate.
2. Scope statements must match the practical-nursing role in the served jurisdiction. Do not transplant RPN, LPN/LVN, Enrolled Nurse, Nursing Associate, or other role authority across borders.
3. Exam language and blueprint mapping must match the target exam. REx-PN content maps to the REx-PN test plan; U.S. LPN/LVN content maps to the current NCLEX-PN test plan; other pathways map to their current regulator/exam standards.
4. Use local units, spelling, medication availability, public-health rules, professional terminology, escalation pathways, and legal/regulatory framing.
5. Shared physiology may be reused across jurisdictions, but jurisdiction-sensitive claims require a localized version.
6. Medication safety must explain the reason for holding, monitoring, escalating, or teaching—not just name a drug.
7. Every clinically relevant Cram lesson ends with a disposition/escalation decision.
8. Cram lessons must preserve: bottom line, mechanism/pattern, recognition cues, priority actions, diagnostics/monitoring, medication safety, red flags, complications, teaching, exam trap, and rapid recall pearl.
9. Unsupported mnemonics, fake numeric precision, obsolete protocols, and U.S.-only rules presented as universal are prohibited.
10. `sourceLessonId` coverage must be auditable: no pathway is complete while a qualifying full lesson lacks a Cram attachment.

## Source hierarchy

1. Current licensing-exam test plan / regulator standards for the target pathway
2. National/federal clinical guidance for that jurisdiction
3. National specialty-society guidance
4. Provincial/state/territorial health authorities and regulators for local rules
5. High-quality international guidance when no appropriate local guidance exists, with local-policy checks where needed

## Current exam baselines

- Canada RPN: REx-PN test plan, current published plan effective January 4, 2022 (revised) until superseded by the regulator/exam owner.
- United States LPN/LVN: 2026 NCLEX-PN Test Plan, effective April 1, 2026 through March 31, 2029.
- Australia Enrolled Nurse: NMBA Enrolled nurse standards for practice and Ahpra EN examination requirements; monitor the 2026 standards-review outcome before treating proposed revisions as final.

## Publication rule

Clinical authoring and renderer mapping are separate. Preserve clinical semantics while mapping these records into the learner-facing Cram renderer. A Cram file existing in source control is not sufficient completion unless its `sourceLessonId` is mapped and served to the intended learner pathway.
