import { getPracticalNursingPneumothoraxCram } from "./respiratory-practical-nursing-pneumothorax-cram";
import { respiratoryPracticalNursingPneumothoraxFullLessons } from "./respiratory-practical-nursing-pneumothorax-full";
import { rpnCaPneumothoraxPublishedBank, pnUsPneumothoraxPublishedBank } from "../exam-questions/practical-nursing-pneumothorax-published";

type Q = (typeof rpnCaPneumothoraxPublishedBank)[number] | (typeof pnUsPneumothoraxPublishedBank)[number];
const cells: Array<{ countryCode: "CA" | "US"; regionScope: "CAN" | "US"; exam: "REX-PN" | "NCLEX-PN"; fullLessonKey: string; questions: readonly Q[] }> = [
  { countryCode: "CA", regionScope: "CAN", exam: "REX-PN", fullLessonKey: "pneumothorax-rpn-ca-2026", questions: rpnCaPneumothoraxPublishedBank },
  { countryCode: "US", regionScope: "US", exam: "NCLEX-PN", fullLessonKey: "pneumothorax-pn-us-2026", questions: pnUsPneumothoraxPublishedBank },
];
function normalize(value: string) { return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " "); }
const ids = new Set<string>();
const fingerprints = new Map<string, string>();
export const practicalNursingPneumothoraxCoverageMatrix = cells.map((cell) => {
  const label = `${cell.countryCode}:${cell.exam}:Pneumothorax`;
  if (!respiratoryPracticalNursingPneumothoraxFullLessons[cell.fullLessonKey]) throw new Error(`PN_PTX_FULL_MISSING:${label}`);
  const cram = getPracticalNursingPneumothoraxCram(cell.countryCode);
  if (!cram || cram.fullLessonKey !== cell.fullLessonKey || cram.regionScope !== cell.regionScope || cram.exam !== cell.exam) throw new Error(`PN_PTX_CRAM_SCOPE_INVALID:${label}`);
  if (cell.questions.length !== 20) throw new Error(`PN_PTX_COUNT_INVALID:${label}/${cell.questions.length}`);
  const stems = new Set<string>();
  const distribution = [0, 0, 0, 0];
  for (const question of cell.questions) {
    if (ids.has(question.id)) throw new Error(`PN_PTX_DUPLICATE_ID:${question.id}`);
    ids.add(question.id);
    const stem = normalize(question.stem);
    if (stems.has(stem)) throw new Error(`PN_PTX_DUPLICATE_STEM:${label}/${question.id}`);
    stems.add(stem);
    const fingerprint = `${stem}::${question.options.map(normalize).join("||")}`;
    const prior = fingerprints.get(fingerprint);
    if (prior) throw new Error(`PN_PTX_UNCHANGED_CROSS_COUNTRY_COPY:${question.id}/${prior}`);
    fingerprints.set(fingerprint, question.id);
    if (question.servingTier !== "rpn" || question.exam !== cell.exam || question.countryCode !== cell.countryCode || question.regionScope !== cell.regionScope || question.bodySystem !== "Respiratory" || question.topic !== "Pneumothorax" || question.questionType !== "multiple_choice") throw new Error(`PN_PTX_SCOPE_INVALID:${label}/${question.id}`);
    if (question.options.length !== 4 || question.optionRationales.length !== 4 || question.correctAnswer < 0 || question.correctAnswer > 3 || !question.correctAnswerExplanation.trim() || question.optionRationales.some((rationale) => !rationale.trim())) throw new Error(`PN_PTX_ANSWER_CONTRACT_INVALID:${label}/${question.id}`);
    if (question.difficulty > 4 || !question.clinicalReasoning.trim() || !question.clinicalPearl.trim() || !question.keyTakeaway.trim() || question.references.length < 2) throw new Error(`PN_PTX_METADATA_INVALID:${label}/${question.id}`);
    if (new Set(question.options.map(normalize)).size !== 4) throw new Error(`PN_PTX_DUPLICATE_OPTIONS:${label}/${question.id}`);
    distribution[question.correctAnswer] += 1;
  }
  if (distribution.join(",") !== "5,5,5,5") throw new Error(`PN_PTX_BALANCE_INVALID:${label}/${distribution.join(",")}`);
  return { tier: "rpn" as const, countryCode: cell.countryCode, exam: cell.exam, bodySystem: "Respiratory" as const, topic: "Pneumothorax" as const, fullLessonKey: cell.fullLessonKey, fullLessonPresent: true as const, cramLessonPresent: true as const, qualifyingQuestionCount: 20 as const, questionDeficit: 0 as const, cramDeficit: 0 as const, answerPositionCounts: distribution };
});
export const practicalNursingPneumothoraxCoverageSummary = { cells: practicalNursingPneumothoraxCoverageMatrix.length, totalQualifyingQuestions: practicalNursingPneumothoraxCoverageMatrix.reduce((total, cell) => total + cell.qualifyingQuestionCount, 0), totalQuestionDeficit: 0, totalCramDeficit: 0 };
if (practicalNursingPneumothoraxCoverageSummary.cells !== 2 || practicalNursingPneumothoraxCoverageSummary.totalQualifyingQuestions !== 40) throw new Error(`PN_PTX_SUMMARY_INVALID:${JSON.stringify(practicalNursingPneumothoraxCoverageSummary)}`);
