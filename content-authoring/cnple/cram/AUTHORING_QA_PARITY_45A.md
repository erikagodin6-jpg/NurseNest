# CNPLE Cram V2 — Parity Batch 45A Clinical Second Pass

Date: 2026-08-09
Scope: `45a-msk-rheumatology-spine-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity contract

- `np-osteoarthritis-diagnosis-and-management`
- `np-rheumatoid-arthritis-diagnosis-and-management`
- `np-gout-and-pseudogout-diagnosis-and-treatment`
- `np-systemic-lupus-erythematosus-diagnosis-and-management`
- `np-polymyalgia-rheumatica-diagnosis-and-treatment`
- `np-fibromyalgia-diagnosis-and-management`
- `np-low-back-pain-evaluation-and-management`
- `np-neck-pain-evaluation-and-management`
- `np-shoulder-pain-differential-diagnosis`

All IDs are literal slugs emitted by the canonical NP parity generator.

## Clinical review

- **OA:** PASS. Primarily clinical diagnosis; imaging is selective and treatment is function/exercise/risk-aware rather than radiograph-driven.
- **RA:** PASS. Objective inflammatory synovitis and early DMARD/rheumatology pathway are central; NSAID/steroid symptom control does not replace disease modification.
- **Gout/CPPD:** PASS. Crystal disease does not exclude septic arthritis. Arthrocentesis/culture remains required when infection risk is meaningful; urate prevention is separated from acute flare therapy.
- **SLE:** PASS. ANA is supportive, not diagnostic alone. Nephritis, neuropsychiatric disease, severe cytopenia, thrombosis and cardiopulmonary organ disease are explicit escalation pathways.
- **PMR:** PASS. Every presentation/follow-up screens for giant-cell arteritis; visual symptoms/jaw claudication trigger immediate GCA treatment/referral rather than waiting for perfect confirmation.
- **Fibromyalgia:** PASS. Nociplastic pain is separated from inflammatory/destructive disease; extensive autoimmune testing, immunosuppression and chronic opioid escalation are rejected.
- **Low back pain:** PASS. Cauda equina, infection, fracture, cancer and progressive deficit drive imaging/escalation. Routine imaging/bed rest are rejected for uncomplicated nonspecific pain.
- **Neck pain:** PASS. Radiculopathy is separated from myelopathy and vascular/infectious/traumatic red flags. Routine imaging is not used in uncomplicated mechanical pain.
- **Shoulder pain:** PASS. Active/passive ROM, strength, cervical and referred-disease localization precede MRI. Septic/dislocated/neurovascular and cardiopulmonary causes are explicit.

## Canadian source refresh

Load-bearing sources rechecked on 2026-08-09:

- Canadian Rheumatology Association current clinical guideline/position resources.
- Arthritis Society Canada current OA, SLE, inflammatory arthritis and medication resources.
- Arthritis Society Canada Fibromyalgia resource, reviewed/updated April 2026.
- Canadian evidence-informed primary-care low-back/neck-pain and Choosing Wisely Canada imaging principles.

## Authoring gates

- Required Cram fields: present in all nine.
- Canadian/SI framing: PASS.
- Hot-joint/septic-arthritis safety: PASS.
- GCA vision-risk safety: PASS.
- Low-value imaging/lab avoidance: PASS.
- Red flags/escalation: present in all nine.

## Publication boundary

Clinical authoring second pass only. Manifest registration, exact current Full-source anchoring, Bottom Line evidence, exactly three eligible Quick Checks, runtime recipe integrity, learner rendering, merge and deployment remain downstream fail-closed gates.
