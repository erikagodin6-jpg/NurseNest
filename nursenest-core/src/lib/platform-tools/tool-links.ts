/**
 * Stable URL paths for lessons, blogs, and study guides to deep-link into tools.
 * Prefix with `withMarketingLocale(locale, path)` when building localized links.
 */
export const TOOL_PATHS = {
  hub: "/tools",
  dosePerKg: "/tools/dose-per-kg",
  infusionMlHr: "/tools/infusion-ml-hr",
  ivDrip: "/tools/iv-drip",
  units: "/tools/units",
  labReference: "/tools/lab-reference",
  abg: "/tools/abg",
} as const;
