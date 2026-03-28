import { readFileSync } from "node:fs";
import type { ExamFamily, TierCode } from "@prisma/client";

export type TierExam = { tier: TierCode; examFamily: ExamFamily };

/** Build map: `basename` without extension (e.g. rrt-questions-batch1) -> tier + exam family */
export function buildManifestFileMap(manifestPath: string): Map<string, TierExam> {
  const raw = JSON.parse(readFileSync(manifestPath, "utf8")) as {
    static?: Record<
      string,
      Record<
        string,
        {
          files?: string[];
        }
      >
    >;
  };
  const m = new Map<string, TierExam>();
  const staticRoot = raw.static;
  if (!staticRoot) return m;

  for (const [bucket, bucketObj] of Object.entries(staticRoot)) {
    for (const [groupKey, group] of Object.entries(bucketObj)) {
      const files = group.files;
      if (!files) continue;
      const mapped = mapGroupToTierExam(bucket, groupKey);
      for (const f of files) {
        const base = f.replace(/\.tsx?$/i, "").replace(/\.[jt]s$/, "");
        m.set(base, mapped);
      }
    }
  }
  return m;
}

function mapGroupToTierExam(bucket: string, groupKey: string): TierExam {
  if (bucket === "nursing") {
    if (groupKey === "rpn") return { tier: "RPN", examFamily: "NCLEX_PN" };
    if (groupKey === "rn") return { tier: "RN", examFamily: "NCLEX_RN" };
    if (groupKey === "np") return { tier: "NP", examFamily: "NP" };
    return { tier: "RN", examFamily: "GENERIC" };
  }
  if (bucket === "nursingCert") {
    return { tier: "RN", examFamily: "GENERIC" };
  }
  if (bucket === "alliedHealth") {
    return { tier: "ALLIED", examFamily: "ALLIED" };
  }
  return { tier: "RN", examFamily: "GENERIC" };
}

/** Fallback when manifest has no entry (filename-based). */
export function inferTierExamFromFilename(base: string): TierExam {
  const b = base.toLowerCase();
  if (b.startsWith("rpn-") || b.includes("-rpn-") || b.endsWith("-rpn")) return { tier: "RPN", examFamily: "NCLEX_PN" };
  if (b.startsWith("rex-pn") || b.includes("rex-pn")) return { tier: "RPN", examFamily: "REX_PN" };
  if (b.startsWith("lvn") || b.startsWith("pn-") || b.includes("nclex-pn")) return { tier: "LVN_LPN", examFamily: "NCLEX_PN" };
  if (b.startsWith("np-") || b.includes("-np-") || b.endsWith("-np")) return { tier: "NP", examFamily: "NP" };
  if (b.startsWith("rn-") || b.includes("-rn-")) return { tier: "RN", examFamily: "NCLEX_RN" };
  if (
    b.startsWith("rrt-") ||
    b.startsWith("mlt-") ||
    b.startsWith("paramedic-") ||
    b.startsWith("pharmacy-") ||
    b.startsWith("pta-") ||
    b.startsWith("ota-") ||
    b.startsWith("imaging-") ||
    b.startsWith("social-worker-") ||
    b.startsWith("surgical-technologist-") ||
    b.startsWith("sonography-") ||
    b.startsWith("psychotherapist-") ||
    b.startsWith("perioperative-") ||
    b.startsWith("cardiac-sonographer-") ||
    b.startsWith("health-info-") ||
    b.startsWith("emergency-nursing-")
  ) {
    return { tier: "ALLIED", examFamily: "ALLIED" };
  }
  return { tier: "RN", examFamily: "GENERIC" };
}

export function resolveTierExam(manifest: Map<string, TierExam>, fileBase: string): TierExam {
  return manifest.get(fileBase) ?? inferTierExamFromFilename(fileBase);
}
