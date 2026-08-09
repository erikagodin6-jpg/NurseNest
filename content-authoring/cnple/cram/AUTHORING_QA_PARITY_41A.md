# CNPLE Cram V2 — Parity Batch 41A Clinical Second Pass

Date: 2026-08-09
Scope: `41a-gi-upper-inflammatory-liver-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity contract

- `np-gastroesophageal-reflux-disease-diagnosis-and-management`
- `np-peptic-ulcer-disease-and-h-pylori-management`
- `np-dyspepsia-evaluation-and-management`
- `np-inflammatory-bowel-disease-diagnosis-and-management`
- `np-irritable-bowel-syndrome-diagnosis-and-management`
- `np-celiac-disease-diagnosis-and-management`
- `np-hepatitis-b-and-c-evaluation-and-treatment`
- `np-nonalcoholic-fatty-liver-disease-management`
- `np-alcoholic-liver-disease-evaluation`

## Clinical review

PASS across all nine. GERD/dyspepsia use alarm-feature risk stratification; H. pylori requires eradication confirmation; IBD requires objective inflammation and steroid-sparing maintenance; IBS remains a positive diagnosis with alarm re-entry; celiac testing occurs before gluten withdrawal; HCV exposure is separated from active RNA-positive infection and HBV uses the full serologic/viral pattern; metabolic fatty liver uses fibrosis risk rather than ALT alone; alcohol-related liver disease is managed together with withdrawal/addiction risk rather than moralized abstinence advice.

## Canadian source refresh

Load-bearing source families rechecked on 2026-08-09:

- Canadian Association of Gastroenterology current guideline/resources for dyspepsia, H. pylori, IBS and IBD.
- CASL/AMMI Canada current chronic hepatitis B guidance and PHAC hepatitis C health-professional resources.
- Canadian hepatology metabolic and alcohol-related liver disease practice resources.
- Choosing Wisely Canada gastroenterology/hepatology recommendations.

## Authoring gates

- Required Cram fields: present in all nine.
- Canadian/SI framing: PASS.
- H. pylori test-of-cure preserved: PASS.
- Screening/diagnosis and infection/colonization distinctions: PASS.
- Red flags/escalation: present in all nine.

## Publication boundary

Clinical authoring second pass only. Structural JSON/required-field validation, current Full-source anchoring, Bottom Line evidence, three eligible Quick Checks, runtime recipe integrity, learner rendering, merge and deployment remain downstream fail-closed gates.
