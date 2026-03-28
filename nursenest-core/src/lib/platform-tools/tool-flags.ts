import { isClinicalToolsSurfaceEnabled } from "@/lib/feature-flags/restored-modules";
import { getToolBySlug } from "@/lib/platform-tools/tool-registry";

/**
 * Per-tool disable list (comma-separated slugs).
 * `NEXT_PUBLIC_TOOLS_DISABLED=dose-per-kg,abg`
 *
 * Also returns false when `NEXT_PUBLIC_FEATURE_CLINICAL_TOOLS` is off (master switch),
 * or when the registry row has `enabled: false` (code kill-switch).
 */
export function isToolSlugEnabled(slug: string): boolean {
  if (!isClinicalToolsSurfaceEnabled()) return false;
  const entry = getToolBySlug(slug);
  if (entry && !entry.enabled) return false;
  const raw = process.env.NEXT_PUBLIC_TOOLS_DISABLED?.trim();
  if (!raw) return true;
  const blocked = new Set(
    raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  );
  return !blocked.has(slug);
}
