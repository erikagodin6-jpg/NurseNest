import type { ExamQuestion } from "./types";
import { rexPnRpnAcuteAsthma60 } from "./rexpn-rpn-acute-asthma-60";

type UsScopedExamQuestion = ExamQuestion & {
  id: string;
  countryId: "US";
  countryLabel: "United States";
  examId: "nclex-pn-2026";
  examLabel: "NCLEX-PN";
  examTestPlanVersion: "2026";
  tierId: "lvn";
  tierLabel: "LPN/LVN";
  topicId: "acute-asthma-exacerbation-lpn-lvn";
  unitSystem: "BOTH";
};

/**
 * Clinical-core reuse is intentional. Acute asthma physiology, assessment,
 * bronchodilator response, inhaler technique, and respiratory red flags are
 * transferable. IDs, exam metadata, tier terminology, and the one role-named
 * prioritization stem are localized for the 2026 NCLEX-PN pathway.
 */
export const nclexPnUsLpnAcuteAsthma60: UsScopedExamQuestion[] = rexPnRpnAcuteAsthma60.map((item, index) => ({
  ...item,
  id: `us-nclexpn-lpn-asthma-${String(index + 1).padStart(3, "0")}`,
  countryId: "US",
  countryLabel: "United States",
  examId: "nclex-pn-2026",
  examLabel: "NCLEX-PN",
  examTestPlanVersion: "2026",
  tierId: "lvn",
  tierLabel: "LPN/LVN",
  topicId: "acute-asthma-exacerbation-lpn-lvn",
  unitSystem: "BOTH",
  q: item.q.replace("The RPN receives four clients", "The LPN/LVN receives four clients"),
})) as UsScopedExamQuestion[];

export const nclexPnUsLpnAcuteAsthmaQuestionCount = nclexPnUsLpnAcuteAsthma60.length;
