/**
 * Legacy RN-only entry point retained for compatibility.
 *
 * The cardiovascular curriculum is now cross-tier, region-scoped, and includes
 * new lesson creation support. Use the all-tier script so Full/Cram flow and
 * RN/RPN/NP coverage stay atomic:
 *
 *   npx tsx scripts/rewrite-cardiovascular-lessons-all-tiers.ts --dry-run
 *   npx tsx scripts/rewrite-cardiovascular-lessons-all-tiers.ts --create-missing
 *   npx tsx scripts/rewrite-cardiovascular-lessons-all-tiers.ts
 */
throw new Error(
  "RN_ONLY_CARDIOVASCULAR_REMEDIATION_RETIRED: use scripts/rewrite-cardiovascular-lessons-all-tiers.ts so RN/RPN/NP, CA/US, Full flow, Cram flow, and newly added lessons are remediated together.",
);
