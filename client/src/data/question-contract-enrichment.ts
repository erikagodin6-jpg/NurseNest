import { QUESTION_CONTRACT_ENRICHMENT as GENERATED_QUESTION_CONTRACT_ENRICHMENT } from "./question-contract-enrichment.generated";
import { CURATED_QUESTION_CONTRACT_ENRICHMENT } from "./question-contract-enrichment.curated";

export type { QuestionContractEnrichment } from "./question-contract-enrichment.generated";

// Curated clinical editorial work takes precedence over machine-generated batches.
export const QUESTION_CONTRACT_ENRICHMENT = {
  ...GENERATED_QUESTION_CONTRACT_ENRICHMENT,
  ...CURATED_QUESTION_CONTRACT_ENRICHMENT,
};
