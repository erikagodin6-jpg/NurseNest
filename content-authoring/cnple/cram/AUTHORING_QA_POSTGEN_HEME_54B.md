# CNPLE Cram — Post-Generator Hematology Batch 54B Clinical Second Pass

Date: 2026-08-10
Scope: `54b-postgen-hematology-anemia-differential-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact Full identities

- `np-anemia-of-chronic-disease`
- `np-macrocytic-anemia-approach`

These are the two remaining exact lesson slugs present in the committed `generate-np-hematology-catalog.py` source outside 54A. The generator header claims 144 lessons, but the committed source terminates after this small anemia block and comments that topics 6–144 require an absent “extended version.” That header is therefore not used as a parity denominator.

## Clinical corrections

### Anemia of inflammation/chronic disease
PASS. The lesson does not diagnose inflammatory anemia from low serum iron or elevated ferritin alone and explicitly searches for overlapping iron deficiency, CKD, blood loss and marrow disease. ESA therapy is not presented as routine treatment of inflammatory anemia. CKD-associated anemia is routed to KDIGO 2026, where iron/ESA/HIF-PHI/transfusion decisions are individualized to symptoms, CKD context and treatment risk.

### Macrocytic anemia
PASS. Macrocytosis is treated as a diagnostic pattern. The Cram separates megaloblastic from non-megaloblastic mechanisms, uses smear/reticulocyte/history reasoning, protects against missed neurologic B12 deficiency, avoids routine folate testing where not available/indicated, and requires marrow evaluation for persistent macrocytosis with unexplained cytopenias/dysplasia.

## Current source refresh

- BC Guidelines — Iron Deficiency: Diagnosis and Management.
- BC Guidelines — Cobalamin (Vitamin B12) and Folate Deficiency (2023).
- BC Guidelines — Folate Deficiency: Investigation & Management (current BC listing 2026).
- KDIGO 2026 Clinical Practice Guideline for Anemia in CKD, published January 2026.

## Safety gates

- No universal ESA hemoglobin target authored.
- No automatic ESA for non-CKD inflammatory anemia.
- No assumption that normal/elevated ferritin excludes iron deficiency in inflammation.
- No folate-only treatment where clinically important B12 deficiency is plausible.
- Neurologic B12 red flags explicitly dispositioned.
- Required Cram fields present by editorial review; machine parser remains downstream.

## Source-integrity finding

The current hematology generator source does **not** substantiate its “144 lessons” header. Only exact identities recovered from actual topic objects are counted. Future Hematology/Oncology parity must use the actual loaded Full catalogue or another canonical source file, not the generator header.

## Publication boundary

Clinical authoring PASS only. Exact current normalized Full existence/publicComplete state, source anchors, Bottom Line evidence, three eligible Quick Checks, runtime certification, learner rendering, merge and deployment remain fail-closed downstream work.
