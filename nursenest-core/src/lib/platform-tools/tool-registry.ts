/**
 * Code-first feature registry for restored legacy tools (calculators, helpers, simulators, utilities).
 * No Prisma reads required for routing or hub listing — single source of truth in this module.
 *
 * Disable quickly: set `enabled: false` on an entry and deploy, or use env flags in `tool-flags.ts`.
 */

export type ToolCategory =
  | "med_math"
  | "infusion"
  | "lab"
  | "acid_base"
  | "phlebotomy"
  | "simulation"
  | "exploration"
  | "utility";

/** High-level UX / analytics grouping */
export type ToolType = "calculator" | "helper" | "simulator" | "content_linked_utility";

/** How the client loads the module — keep non-core tools out of the main shell bundle */
export type ToolLoadStrategy = "lazy_dynamic" | "lazy_route" | "server_static";

/** Product lifecycle — rollout without DB */
export type ToolLifecycleStatus = "live" | "beta" | "planned" | "retired";

/** Whether a code module exists in this repo for `/tools/:slug` */
export type ToolImplementation = "shipped" | "planned" | "none";

export type ToolRegistryEntry = {
  /** Stable id for flags, analytics, and logs (e.g. `nurse.tool.dose_per_kg`) */
  featureKey: string;
  /** Short English name for ops / dashboards */
  name: string;
  category: ToolCategory;
  /** URL segment under `/tools/` or absolute path for future app-only surfaces */
  slug: string;
  /** Canonical path (default tools live under marketing) */
  route: string;
  /** Product intent: off = hidden even when flags allow (kill-switch in code) */
  enabled: boolean;
  /** If true, omit from public marketing hub; gate in learner/premium later */
  premiumOnly: boolean;
  /** If false, emit noindex in metadata and omit from sitemap */
  seoIndexable: boolean;
  toolType: ToolType;
  loadStrategy: ToolLoadStrategy;
  /** PostHog / product prefix — no PII */
  analyticsKey: string;
  /** Lifecycle for staged rollout */
  status: ToolLifecycleStatus;
  /** Bump when behavior or copy contract changes */
  version: string;
  implementation: ToolImplementation;
  titleKey: string;
  descriptionKey: string;
  legacySource?: string;
  notes?: string;
};

/**
 * Full inventory: legacy SPA paths mapped to registry rows.
 * Simple calculators stay code-only — no DB rows for rendering.
 */
export const TOOL_REGISTRY: readonly ToolRegistryEntry[] = [
  {
    featureKey: "nurse.tool.dose_per_kg",
    name: "Dose from mg/kg",
    category: "med_math",
    slug: "dose-per-kg",
    route: "/tools/dose-per-kg",
    enabled: true,
    premiumOnly: false,
    seoIndexable: true,
    toolType: "calculator",
    loadStrategy: "lazy_dynamic",
    analyticsKey: "tool_dose_per_kg",
    status: "live",
    version: "1.0.0",
    implementation: "shipped",
    titleKey: "tools.dosePerKg.title",
    descriptionKey: "tools.dosePerKg.description",
    legacySource: "client/src/pages/med-math.tsx",
    notes: "mg/kg × weight",
  },
  {
    featureKey: "nurse.tool.infusion_ml_hr",
    name: "Infusion rate (mL/hr)",
    category: "infusion",
    slug: "infusion-ml-hr",
    route: "/tools/infusion-ml-hr",
    enabled: true,
    premiumOnly: false,
    seoIndexable: true,
    toolType: "calculator",
    loadStrategy: "lazy_dynamic",
    analyticsKey: "tool_infusion_ml_hr",
    status: "live",
    version: "1.0.0",
    implementation: "shipped",
    titleKey: "tools.infusionMlHr.title",
    descriptionKey: "tools.infusionMlHr.description",
    legacySource: "client/src/pages/med-math.tsx",
  },
  {
    featureKey: "nurse.tool.iv_drip_rate",
    name: "IV drip rate (gtt/min)",
    category: "infusion",
    slug: "iv-drip",
    route: "/tools/iv-drip",
    enabled: true,
    premiumOnly: false,
    seoIndexable: true,
    toolType: "calculator",
    loadStrategy: "lazy_dynamic",
    analyticsKey: "tool_iv_drip",
    status: "live",
    version: "1.0.0",
    implementation: "shipped",
    titleKey: "tools.ivDrip.title",
    descriptionKey: "tools.ivDrip.description",
    legacySource: "client/src/pages/med-math.tsx",
  },
  {
    featureKey: "nurse.tool.unit_conversion",
    name: "Unit conversion",
    category: "med_math",
    slug: "units",
    route: "/tools/units",
    enabled: true,
    premiumOnly: false,
    seoIndexable: true,
    toolType: "calculator",
    loadStrategy: "lazy_dynamic",
    analyticsKey: "tool_units",
    status: "live",
    version: "1.0.0",
    implementation: "shipped",
    titleKey: "tools.units.title",
    descriptionKey: "tools.units.description",
    legacySource: "client/src/pages/si-conventional-converter.tsx",
  },
  {
    featureKey: "nurse.tool.lab_reference",
    name: "Common lab reference",
    category: "lab",
    slug: "lab-reference",
    route: "/tools/lab-reference",
    enabled: true,
    premiumOnly: false,
    seoIndexable: true,
    toolType: "helper",
    loadStrategy: "lazy_dynamic",
    analyticsKey: "tool_lab_reference",
    status: "live",
    version: "1.0.0",
    implementation: "shipped",
    titleKey: "tools.labReference.title",
    descriptionKey: "tools.labReference.description",
    legacySource: "client/src/pages/lab-values.tsx, lab-value-page.tsx",
    notes: "Static ranges in code — not DB-backed rows",
  },
  {
    featureKey: "nurse.tool.abg_helper",
    name: "ABG pattern helper",
    category: "acid_base",
    slug: "abg",
    route: "/tools/abg",
    enabled: true,
    premiumOnly: false,
    seoIndexable: true,
    toolType: "helper",
    loadStrategy: "lazy_dynamic",
    analyticsKey: "tool_abg",
    status: "live",
    version: "1.0.0",
    implementation: "shipped",
    titleKey: "tools.abg.title",
    descriptionKey: "tools.abg.description",
    legacySource: "legacy ABG teaching / electrolyte pages",
  },
  {
    featureKey: "nurse.tool.order_of_draw",
    name: "Order of blood draw",
    category: "phlebotomy",
    slug: "order-of-draw",
    route: "/tools/order-of-draw",
    enabled: true,
    premiumOnly: false,
    seoIndexable: true,
    toolType: "helper",
    loadStrategy: "lazy_dynamic",
    analyticsKey: "tool_order_of_draw",
    status: "planned",
    version: "0.0.0",
    implementation: "planned",
    titleKey: "tools.orderOfDraw.title",
    descriptionKey: "tools.orderOfDraw.description",
    legacySource: "client/src/pages/order-of-the-draw.tsx",
    notes: "Ship as static diagram + copy; enable when module lands",
  },
  {
    featureKey: "nurse.tool.med_math_suite",
    name: "Med math suite (legacy)",
    category: "med_math",
    slug: "med-math-suite",
    route: "/tools/med-math-suite",
    enabled: false,
    premiumOnly: true,
    seoIndexable: false,
    toolType: "calculator",
    loadStrategy: "lazy_dynamic",
    analyticsKey: "tool_med_math_suite",
    status: "planned",
    version: "0.0.0",
    implementation: "none",
    titleKey: "tools.medMathSuite.title",
    descriptionKey: "tools.medMathSuite.description",
    legacySource: "client/src/pages/med-math.tsx",
    notes: "Defer — prefer thin per-route calculators",
  },
  {
    featureKey: "nurse.tool.anatomy_explorer",
    name: "Anatomy explorer",
    category: "exploration",
    slug: "anatomy-explorer",
    route: "/tools/anatomy-explorer",
    enabled: false,
    premiumOnly: true,
    seoIndexable: false,
    toolType: "content_linked_utility",
    loadStrategy: "lazy_route",
    analyticsKey: "tool_anatomy",
    status: "planned",
    version: "0.0.0",
    implementation: "none",
    titleKey: "tools.anatomyExplorer.title",
    descriptionKey: "tools.anatomyExplorer.description",
    legacySource: "client/src/pages/anatomy.tsx",
    notes: "Heavy assets — defer",
  },
  {
    featureKey: "nurse.sim.iv_complications",
    name: "IV complications simulator",
    category: "simulation",
    slug: "iv-complications-simulator",
    route: "/app/simulations/iv-complications",
    enabled: false,
    premiumOnly: true,
    seoIndexable: false,
    toolType: "simulator",
    loadStrategy: "lazy_route",
    analyticsKey: "sim_iv_complications",
    status: "planned",
    version: "0.0.0",
    implementation: "none",
    titleKey: "tools.ivComplicationsSim.title",
    descriptionKey: "tools.ivComplicationsSim.description",
    legacySource: "client/src/pages/iv-complications-simulator.tsx",
    notes: "Persist attempts in Prisma when built — not public /tools",
  },
  {
    featureKey: "nurse.sim.safety_hazard",
    name: "Safety hazard simulator",
    category: "simulation",
    slug: "safety-hazard-simulator",
    route: "/app/simulations/safety-hazard",
    enabled: false,
    premiumOnly: true,
    seoIndexable: false,
    toolType: "simulator",
    loadStrategy: "lazy_route",
    analyticsKey: "sim_safety_hazard",
    status: "planned",
    version: "0.0.0",
    implementation: "none",
    titleKey: "tools.safetyHazardSim.title",
    descriptionKey: "tools.safetyHazardSim.description",
    legacySource: "client/src/pages/safety-hazard-simulator.tsx",
  },
  {
    featureKey: "nurse.sim.electrolyte_abg",
    name: "Electrolyte / ABG simulator",
    category: "simulation",
    slug: "electrolyte-abg-simulator",
    route: "/app/simulations/electrolyte-abg",
    enabled: false,
    premiumOnly: true,
    seoIndexable: false,
    toolType: "simulator",
    loadStrategy: "lazy_route",
    analyticsKey: "sim_electrolyte_abg",
    status: "planned",
    version: "0.0.0",
    implementation: "none",
    titleKey: "tools.electrolyteAbgSim.title",
    descriptionKey: "tools.electrolyteAbgSim.description",
    legacySource: "client/src/pages/electrolyte-abg-simulator.tsx",
    notes: "Planned — persistence may use Prisma when shipped",
  },
  {
    featureKey: "nurse.sim.probability",
    name: "Probability simulator",
    category: "simulation",
    slug: "probability-simulator",
    route: "/app/simulations/probability",
    enabled: false,
    premiumOnly: true,
    seoIndexable: false,
    toolType: "simulator",
    loadStrategy: "lazy_route",
    analyticsKey: "sim_probability",
    status: "retired",
    version: "0.0.0",
    implementation: "none",
    titleKey: "tools.probabilitySim.title",
    descriptionKey: "tools.probabilitySim.description",
    legacySource: "client/src/pages/probability-simulator.tsx",
    notes: "Retired unless product revives",
  },
];

/** @deprecated Use TOOL_REGISTRY */
export const TOOL_DEFINITIONS = TOOL_REGISTRY;

/** @deprecated Use ToolRegistryEntry */
export type ToolDefinition = ToolRegistryEntry;

/** Slugs with a lazy-loaded module in `tool-async-imports.ts` — keep in sync with shipped `/tools/*` rows */
export const IMPLEMENTED_TOOL_SLUGS = [
  "dose-per-kg",
  "infusion-ml-hr",
  "iv-drip",
  "units",
  "lab-reference",
  "abg",
] as const;

export type ImplementedToolSlug = (typeof IMPLEMENTED_TOOL_SLUGS)[number];

export function getToolBySlug(slug: string): ToolRegistryEntry | undefined {
  return TOOL_REGISTRY.find((t) => t.slug === slug);
}

export function getToolByFeatureKey(featureKey: string): ToolRegistryEntry | undefined {
  return TOOL_REGISTRY.find((t) => t.featureKey === featureKey);
}

/** Public marketing hub: live, shipped, `/tools/*`, not premium-only, enabled in registry */
export function hubTools(): readonly ToolRegistryEntry[] {
  return TOOL_REGISTRY.filter(
    (t) =>
      t.enabled &&
      t.status === "live" &&
      t.implementation === "shipped" &&
      t.route.startsWith("/tools/") &&
      !t.premiumOnly,
  );
}

/** Entries safe to list in sitemap (SEO + flags applied separately) */
export function toolsForSitemap(): readonly ToolRegistryEntry[] {
  return hubTools().filter((t) => t.seoIndexable);
}
