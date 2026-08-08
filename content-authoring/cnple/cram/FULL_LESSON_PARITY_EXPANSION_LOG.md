# CNPLE Cram — Full-Lesson Parity Expansion Log

This log records Cram objects added **after** the comprehensive topic-breadth audit because a distinct current canonical `ca-np-cnple` Full lesson requires its own Cram identity.

These additions do not reopen the broad-topic audit. They close one-to-one Full Lesson → Cram parity gaps.

## 2026-08-08

### Mineralocorticoids

- **Cram ID:** `cnple-ca-pharm-025-mineralocorticoids`
- **Cram file:** `36-mineralocorticoids-parity.json`
- **Canonical Full-lesson evidence:** private-core owner-curated package `np-mineralocorticoids-lesson-replacement-2026-07-06-owner-curated`
- **Full lesson:** `Mineralocorticoids`
- **Full lesson slug:** `mineralocorticoids-np`
- **Pathway:** `ca-np-cnple`
- **Observed Full-lesson state:** PUBLISHED, learner-visible, structural public-complete, 47 sections
- **Why a separate Cram is required:** the existing CNPLE Cram estate covers adrenal insufficiency/adrenal crisis and cross-cutting pharmacology, but the learner curriculum also contains a dedicated mineralocorticoid/fludrocortisone Full lesson. One-to-one parity therefore requires a distinct Cram identity rather than treating the broader adrenal lesson as equivalent.
- **Canadian/current source refresh:** Health Canada Drug Product Database (marketed FLORINEF/JAMP fludrocortisone; current product-monograph availability) plus primary-adrenal-insufficiency guideline evidence for mineralocorticoid replacement and adrenal-crisis separation.
- **Clinical distinction preserved:** chronic fludrocortisone replacement for confirmed aldosterone deficiency is not the acute rescue treatment for adrenal crisis; mineralocorticoid replacement must also not be confused with mineralocorticoid-receptor antagonists.
- **Local policy flag:** true.

### Candidates reviewed but not added

- **NP Angina – CNPE (`np-angina-ca-cnpe-np`)** — owner-curated package is publication-eligible but its package still records `learnerVisible: false`; it is therefore not counted as a current canonical learner-facing Full-lesson parity obligation from this evidence alone.
- **Statins (`statins-np`)** — inspected package is a staged replacement candidate and not sufficient evidence of current canonical learner-visible status. A Cram parity object should be added only when the current reverse-coverage audit or learner-visible publication evidence establishes it as an active canonical Full lesson.

## Rule for subsequent entries

Add a parity lesson only when one of the following proves a distinct current Full-lesson identity:

1. the private-core reverse-coverage audit reports an uncovered canonical public-complete `ca-np-cnple` lesson;
2. current repository evidence explicitly establishes a PUBLISHED learner-visible `ca-np-cnple` Full lesson; or
3. a current learner-facing catalogue artifact can be deterministically resolved to one unique Full lesson after redirects/deprecations are removed.

Do **not** add Cram objects merely because a disease or drug is medically plausible. Topic breadth is already audited; parity authoring is identity-driven.
