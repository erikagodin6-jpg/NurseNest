import type { ExamQuestion } from "./types";
import { rexPnRpnAcutePyelonephritis60 } from "./rexpn-rpn-acute-pyelonephritis-60";

type UsScopedExamQuestion = ExamQuestion & {
  id: string;
  countryId: "US";
  countryLabel: "United States";
  examId: "nclex-pn-2026";
  examLabel: "NCLEX-PN";
  examTestPlanVersion: "2026";
  tierId: "lvn";
  tierLabel: "LPN/LVN";
  topicId: "acute-pyelonephritis-lpn-lvn";
  unitSystem: "BOTH";
};

/**
 * Shared clinical-core adaptation. Upper-UTI pathophysiology, sepsis/obstruction
 * red flags, specimen collection, renal monitoring, pregnancy risk, and
 * antimicrobial safety are transferable. Country/exam/tier IDs are unique,
 * and role-named prioritization language is localized to LPN/LVN.
 */
export const nclexPnUsLpnAcutePyelonephritis60: UsScopedExamQuestion[] = rexPnRpnAcutePyelonephritis60.map((item, index) => ({
  ...item,
  id: `us-nclexpn-lpn-pyelo-${String(index + 1).padStart(3, "0")}`,
  countryId: "US",
  countryLabel: "United States",
  examId: "nclex-pn-2026",
  examLabel: "NCLEX-PN",
  examTestPlanVersion: "2026",
  tierId: "lvn",
  tierLabel: "LPN/LVN",
  topicId: "acute-pyelonephritis-lpn-lvn",
  unitSystem: "BOTH",
  q: item.q.replace("The RPN receives four clients", "The LPN/LVN receives four clients"),
})) as UsScopedExamQuestion[];

export const nclexPnUsLpnAcutePyelonephritisQuestionCount = nclexPnUsLpnAcutePyelonephritis60.length;
