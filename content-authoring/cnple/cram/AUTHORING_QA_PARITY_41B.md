# CNPLE Cram V2 — Parity Batch 41B Clinical Second Pass

Date: 2026-08-09
Scope: `41b-gi-cirrhosis-pancreas-colon-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity contract

- `np-cirrhosis-complications-management`
- `np-hepatic-encephalopathy-recognition-and-treatment`
- `np-pancreatitis-diagnosis-and-management`
- `np-gallbladder-disease-evaluation-and-management`
- `np-colorectal-cancer-screening-and-surveillance`
- `np-colorectal-polyp-follow-up-guidelines`
- `np-chronic-constipation-evaluation-and-management`
- `np-chronic-diarrhea-workup`
- `np-gi-bleeding-evaluation-and-management`

## Clinical review

PASS across all nine. Cirrhosis care prioritizes acute decompensation and surveillance; ammonia is not used as a stand-alone hepatic-encephalopathy diagnosis; pancreatitis severity follows organ physiology rather than serial lipase; cholangitis is treated as infected obstruction/source-control disease; colorectal screening is separated from symptomatic diagnosis and post-polypectomy surveillance is pathology/exam-quality specific; constipation/diarrhea use mechanism/alarm-driven workups; GI bleeding prioritizes hemodynamics before the initial hemoglobin value.

## Canadian source refresh

Load-bearing source families rechecked on 2026-08-09:

- Canadian hepatology cirrhosis/encephalopathy practice resources and Choosing Wisely Canada Hepatology recommendations.
- Canadian acute pancreatitis and hepatobiliary practice pathways.
- Provincial/territorial colorectal cancer screening and post-polypectomy surveillance programs.
- Choosing Wisely Canada / Canadian Blood Services transfusion stewardship for GI bleeding.

## Authoring gates

- Required Cram fields: present in all nine.
- Screening vs diagnosis and surveillance distinctions: PASS.
- Ammonia/lipase/hemoglobin single-number traps explicitly rejected: PASS.
- Red flags/escalation: present in all nine.

## Publication boundary

Clinical authoring second pass only. Structural JSON/required-field validation, current Full-source anchoring, Bottom Line evidence, three eligible Quick Checks, runtime recipe integrity, learner rendering, merge and deployment remain downstream fail-closed gates.
