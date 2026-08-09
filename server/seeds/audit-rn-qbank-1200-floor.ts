import { pool } from "../storage";
import {
  RN_CANONICAL_SYSTEMS,
  RN_CLIENT_NEEDS_CATEGORIES,
  RN_QBANK_MINIMUM_PER_REGION,
  normalizeRnClientNeedsCategory,
  normalizeRnSystem,
  type RnCanonicalSystem,
  type RnClientNeedsCategory,
} from "./rn-qbank-1200-contract";

type Region = "CAN" | "US";
type Row = {
  body_system: string | null;
  topic: string | null;
  domain: string | null;
  region_scope: string | null;
  stem: string;
};

type RegionSets = Record<Region, Set<string>>;
const regionSets = (): RegionSets => ({ CAN: new Set<string>(), US: new Set<string>() });

function addAccessible(sets: RegionSets, regionScope: string | null, key: string) {
  if (regionScope === "BOTH") {
    sets.CAN.add(key);
    sets.US.add(key);
  } else if (regionScope === "CAN") {
    sets.CAN.add(key);
  } else if (regionScope === "US") {
    sets.US.add(key);
  }
}

function deficit(count: number) {
  return Math.max(0, RN_QBANK_MINIMUM_PER_REGION - count);
}

async function main() {
  const reportOnly = process.argv.includes("--report-only");

  const result = await pool.query<Row>(`
    SELECT
      body_system,
      topic,
      domain,
      region_scope,
      lower(regexp_replace(trim(stem), '\\s+', ' ', 'g')) AS stem
    FROM exam_questions
    WHERE tier = 'rn'
      AND exam = 'NCLEX-RN'
      AND status = 'published'
      AND stem IS NOT NULL
      AND trim(stem) <> ''
  `);

  const systems = new Map<RnCanonicalSystem, RegionSets>(
    RN_CANONICAL_SYSTEMS.map((system) => [system, regionSets()]),
  );
  const categories = new Map<RnClientNeedsCategory, RegionSets>(
    RN_CLIENT_NEEDS_CATEGORIES.map((category) => [category, regionSets()]),
  );

  const unmappedSystems = new Map<string, number>();
  const unmappedDomains = new Map<string, number>();
  const invalidRegionScopes = new Map<string, number>();
  let unroutedPublished = 0;

  for (const row of result.rows) {
    const scope = row.region_scope;
    if (scope !== "BOTH" && scope !== "CAN" && scope !== "US") {
      unroutedPublished++;
      const label = scope ?? "NULL";
      invalidRegionScopes.set(label, (invalidRegionScopes.get(label) ?? 0) + 1);
      // Do not credit rows that the learner qbank region filter cannot reliably serve.
      continue;
    }

    const system = normalizeRnSystem(row.body_system, row.topic);
    if (system) {
      addAccessible(systems.get(system)!, scope, row.stem);
    } else {
      const label = `${row.body_system ?? "NULL"} :: ${row.topic ?? "NULL"}`;
      unmappedSystems.set(label, (unmappedSystems.get(label) ?? 0) + 1);
    }

    const category = normalizeRnClientNeedsCategory(row.domain);
    if (category) {
      addAccessible(categories.get(category)!, scope, row.stem);
    } else {
      const label = row.domain ?? "NULL";
      unmappedDomains.set(label, (unmappedDomains.get(label) ?? 0) + 1);
    }
  }

  const systemLedger = RN_CANONICAL_SYSTEMS.map((system) => {
    const sets = systems.get(system)!;
    return {
      system,
      canadaAccessible: sets.CAN.size,
      canadaDeficit: deficit(sets.CAN.size),
      usAccessible: sets.US.size,
      usDeficit: deficit(sets.US.size),
      pass: sets.CAN.size >= RN_QBANK_MINIMUM_PER_REGION && sets.US.size >= RN_QBANK_MINIMUM_PER_REGION,
    };
  });

  const categoryLedger = RN_CLIENT_NEEDS_CATEGORIES.map((category) => {
    const sets = categories.get(category)!;
    return {
      category,
      canadaAccessible: sets.CAN.size,
      canadaDeficit: deficit(sets.CAN.size),
      usAccessible: sets.US.size,
      usDeficit: deficit(sets.US.size),
      pass: sets.CAN.size >= RN_QBANK_MINIMUM_PER_REGION && sets.US.size >= RN_QBANK_MINIMUM_PER_REGION,
    };
  });

  const systemFailures = systemLedger.filter((row) => !row.pass);
  const categoryFailures = categoryLedger.filter((row) => !row.pass);

  const report = {
    contract: {
      tier: "rn",
      exam: "NCLEX-RN",
      minimumUniquePublishedQuestionsPerRegionPerSystem: RN_QBANK_MINIMUM_PER_REGION,
      minimumUniquePublishedQuestionsPerRegionPerClientNeedsCategory: RN_QBANK_MINIMUM_PER_REGION,
      canadaServingPool: "CAN + BOTH",
      usServingPool: "US + BOTH",
      uniqueness: "normalized question stem within each system/category serving pool",
      unroutedRowsCredited: false,
    },
    publishedRowsScanned: result.rows.length,
    unroutedPublished,
    systems: systemLedger,
    clientNeedsCategories: categoryLedger,
    largestSystemDeficits: [...systemLedger]
      .sort((a, b) => Math.max(b.canadaDeficit, b.usDeficit) - Math.max(a.canadaDeficit, a.usDeficit))
      .slice(0, 10),
    unmappedSystemLabels: [...unmappedSystems.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 30)
      .map(([label, count]) => ({ label, count })),
    unmappedDomainLabels: [...unmappedDomains.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 30)
      .map(([label, count]) => ({ label, count })),
    invalidRegionScopes: [...invalidRegionScopes.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([regionScope, count]) => ({ regionScope, count })),
    pass: systemFailures.length === 0 && categoryFailures.length === 0,
  };

  console.log(JSON.stringify(report, null, 2));

  if (!reportOnly && !report.pass) {
    const systemSummary = systemFailures
      .map((row) => `${row.system}[CA-${row.canadaDeficit},US-${row.usDeficit}]`)
      .join(", ");
    const categorySummary = categoryFailures
      .map((row) => `${row.category}[CA-${row.canadaDeficit},US-${row.usDeficit}]`)
      .join(", ");
    throw new Error(
      `RN_QBANK_1200_FLOOR_NOT_MET systems=${systemSummary || "none"} categories=${categorySummary || "none"}`,
    );
  }
}

main().then(() => process.exit(0)).catch((error) => {
  console.error(error);
  process.exit(1);
});
