import type { ExamFamily, TierCode } from "@prisma/client";

export function inferLessonTierAndExam(fileBase: string): { tier: TierCode; examFamily: ExamFamily } {
  const b = fileBase.toLowerCase();
  if (
    b.includes("rrt-") ||
    b.includes("mlt-") ||
    b.includes("paramedic") ||
    b.includes("pharmacy-tech") ||
    b.includes("pta-") ||
    b.includes("ota-") ||
    b.includes("imaging") ||
    b.includes("social-worker") ||
    b.includes("surgical-tech") ||
    b.includes("sonography") ||
    b.includes("psychotherapist") ||
    b.includes("perioperative") ||
    b.includes("allied")
  ) {
    return { tier: "ALLIED", examFamily: "ALLIED" };
  }
  if (b.includes("rpn-") || b.startsWith("rpn") || b.includes("-rpn")) return { tier: "RPN", examFamily: "GENERIC" };
  if (b.includes("np-") || b.includes("np-") || b.startsWith("np")) return { tier: "NP", examFamily: "NP" };
  if (b.includes("lvn") || b.includes("lpn")) return { tier: "LVN_LPN", examFamily: "NCLEX_PN" };
  return { tier: "RN", examFamily: "GENERIC" };
}
