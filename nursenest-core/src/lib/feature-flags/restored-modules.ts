/**
 * Staged rollout for restored legacy surfaces. All flags default to **safe / current behavior**
 * when unset so production stays stable without extra env.
 *
 * | Env | Purpose |
 * |-----|---------|
 * | `NEXT_PUBLIC_FEATURE_CLINICAL_TOOLS` | Master switch for `/tools` hub and tool routes |
 * | `NEXT_PUBLIC_FEATURE_LEGACY_MARKETING_HOME` | Reserved: heavy legacy homepage sections (not wired yet) |
 * | `NEXT_PUBLIC_FEATURE_CLINICAL_SIMULATORS` | Future: simulator routes (default off until shipped) |
 */

function isEnvTruthy(v: string | undefined): boolean {
  const s = v?.trim().toLowerCase();
  return s === "1" || s === "true" || s === "on" || s === "yes";
}

function isEnvFalsy(v: string | undefined): boolean {
  const s = v?.trim().toLowerCase();
  return s === "0" || s === "false" || s === "off" || s === "no";
}

/** When false, `/tools` returns 404; sitemap omits tool URLs. Default: enabled. */
export function isClinicalToolsSurfaceEnabled(): boolean {
  const raw = process.env.NEXT_PUBLIC_FEATURE_CLINICAL_TOOLS;
  if (isEnvFalsy(raw)) return false;
  return true;
}

/**
 * Reserved for swapping the marketing homepage to a lighter variant when `false`.
 * Not wired to routing yet — export exists for staged rollout without one-shot edits.
 * Default: enabled (current `HomeRestoredClient` behavior).
 */
export function isLegacyMarketingHomeHeavyEnabled(): boolean {
  const raw = process.env.NEXT_PUBLIC_FEATURE_LEGACY_MARKETING_HOME;
  if (isEnvFalsy(raw)) return false;
  return true;
}

/** Simulators default off until a dedicated route exists and is audited. */
export function isClinicalSimulatorSurfaceEnabled(): boolean {
  return isEnvTruthy(process.env.NEXT_PUBLIC_FEATURE_CLINICAL_SIMULATORS);
}
