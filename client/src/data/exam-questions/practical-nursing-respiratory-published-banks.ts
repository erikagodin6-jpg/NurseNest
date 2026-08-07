import { rpnCaAsthmaRexpnBankBatch1 } from "./rpn-ca-asthma-rexpn-bank-batch1";
import { pnUsAsthmaNclexBankBatch1 } from "./pn-us-asthma-nclex-bank-batch1";
import { rpnCaCopdRexpnBankBatch1 } from "./rpn-ca-copd-rexpn-bank-batch1";
import { pnUsCopdNclexBankBatch1 } from "./pn-us-copd-nclex-bank-batch1";
import { rpnCaPneumoniaRexpnBankBatch1 } from "./rpn-ca-pneumonia-rexpn-bank-batch1";
import { pnUsPneumoniaNclexBankBatch1 } from "./pn-us-pneumonia-nclex-bank-batch1";

type FourOptions = readonly [string, string, string, string];
type RebalanceableQuestion = {
  id: string;
  options: FourOptions;
  optionRationales: FourOptions;
  correctAnswer: number;
};

function rebalanceQuestion<T extends RebalanceableQuestion>(question: T, targetCorrectIndex: number): T {
  if (targetCorrectIndex < 0 || targetCorrectIndex > 3) {
    throw new Error(`PN_RESPIRATORY_REBALANCE_TARGET_INVALID: ${question.id}/${targetCorrectIndex}`);
  }
  if (question.correctAnswer < 0 || question.correctAnswer > 3) {
    throw new Error(`PN_RESPIRATORY_REBALANCE_SOURCE_ANSWER_INVALID: ${question.id}/${question.correctAnswer}`);
  }

  const originalIndices = [0, 1, 2, 3];
  const distractorIndices = originalIndices.filter((index) => index !== question.correctAnswer);
  const reorderedIndices = [...distractorIndices];
  reorderedIndices.splice(targetCorrectIndex, 0, question.correctAnswer);

  const options = reorderedIndices.map((index) => question.options[index]) as unknown as [string, string, string, string];
  const optionRationales = reorderedIndices.map((index) => question.optionRationales[index]) as unknown as [string, string, string, string];

  return {
    ...question,
    options,
    optionRationales,
    correctAnswer: targetCorrectIndex
  };
}

function rebalanceBank<T extends RebalanceableQuestion>(bank: readonly T[], label: string): T[] {
  const rebalanced = bank.map((question, index) => rebalanceQuestion(question, index % 4));
  const distribution = [0, 0, 0, 0];
  const ids = new Set<string>();

  for (const question of rebalanced) {
    if (ids.has(question.id)) throw new Error(`PN_RESPIRATORY_REBALANCE_DUPLICATE_ID: ${label}/${question.id}`);
    ids.add(question.id);
    distribution[question.correctAnswer] += 1;

    if (question.options.length !== 4 || question.optionRationales.length !== 4) {
      throw new Error(`PN_RESPIRATORY_REBALANCE_CARDINALITY_INVALID: ${label}/${question.id}`);
    }
  }

  const expectedBase = Math.floor(rebalanced.length / 4);
  const expectedCeiling = Math.ceil(rebalanced.length / 4);
  if (distribution.some((count) => count < expectedBase || count > expectedCeiling)) {
    throw new Error(`PN_RESPIRATORY_REBALANCE_DISTRIBUTION_INVALID: ${label}/${distribution.join(",")}`);
  }

  return rebalanced;
}

export const rpnCaAsthmaRexpnPublishedBank = rebalanceBank(
  rpnCaAsthmaRexpnBankBatch1,
  "CA/REX-PN/Asthma"
);
export const pnUsAsthmaNclexPublishedBank = rebalanceBank(
  pnUsAsthmaNclexBankBatch1,
  "US/NCLEX-PN/Asthma"
);
export const rpnCaCopdRexpnPublishedBank = rebalanceBank(
  rpnCaCopdRexpnBankBatch1,
  "CA/REX-PN/COPD"
);
export const pnUsCopdNclexPublishedBank = rebalanceBank(
  pnUsCopdNclexBankBatch1,
  "US/NCLEX-PN/COPD"
);
export const rpnCaPneumoniaRexpnPublishedBank = rebalanceBank(
  rpnCaPneumoniaRexpnBankBatch1,
  "CA/REX-PN/Community-Acquired Pneumonia"
);
export const pnUsPneumoniaNclexPublishedBank = rebalanceBank(
  pnUsPneumoniaNclexBankBatch1,
  "US/NCLEX-PN/Community-Acquired Pneumonia"
);

export const practicalNursingRespiratoryPublishedBanks = {
  "CA:REX-PN:Asthma": rpnCaAsthmaRexpnPublishedBank,
  "US:NCLEX-PN:Asthma": pnUsAsthmaNclexPublishedBank,
  "CA:REX-PN:COPD": rpnCaCopdRexpnPublishedBank,
  "US:NCLEX-PN:COPD": pnUsCopdNclexPublishedBank,
  "CA:REX-PN:Community-Acquired Pneumonia": rpnCaPneumoniaRexpnPublishedBank,
  "US:NCLEX-PN:Community-Acquired Pneumonia": pnUsPneumoniaNclexPublishedBank
} as const;

for (const [key, bank] of Object.entries(practicalNursingRespiratoryPublishedBanks)) {
  if (bank.length !== 20) throw new Error(`PN_RESPIRATORY_PUBLISHED_BANK_COUNT_INVALID: ${key}/${bank.length}`);
  const distribution = [0, 0, 0, 0];
  bank.forEach((question) => {
    distribution[question.correctAnswer] += 1;
  });
  if (distribution.join(",") !== "5,5,5,5") {
    throw new Error(`PN_RESPIRATORY_PUBLISHED_ANSWER_BALANCE_INVALID: ${key}/${distribution.join(",")}`);
  }
}
