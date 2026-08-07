import type { LessonContent } from "./types";
import { rpnContentBatch044Lessons } from "./rpn-content-batch-044";
import { rpnContentBatch045Lessons } from "./rpn-content-batch-045";
import { rpnContentBatch046Lessons } from "./rpn-content-batch-046";
import { rpnContentBatch047Lessons } from "./rpn-content-batch-047";
import { rpnContentBatch048Lessons } from "./rpn-content-batch-048";
import { rpnContentBatch049Lessons } from "./rpn-content-batch-049";
import { rpnContentBatch050Lessons } from "./rpn-content-batch-050";
import { rpnContentBatch051Lessons } from "./rpn-content-batch-051";
import { rpnContentBatch052Lessons } from "./rpn-content-batch-052";
import { rpnContentBatch053Lessons } from "./rpn-content-batch-053";
import { rpnContentBatch054Lessons } from "./rpn-content-batch-054";
import { rpnContentBatch055Lessons } from "./rpn-content-batch-055";
import { rpnContentBatch056Lessons } from "./rpn-content-batch-056";
import { rpnContentBatch057Lessons } from "./rpn-content-batch-057";

/**
 * REx-PN / Canadian practical-nursing expansion aggregator.
 * Imported by the canonical lesson content map so new RPN batches are learner-reachable.
 */
export const rpnExtraBank: Record<string, LessonContent> = {
  ...rpnContentBatch044Lessons,
  ...rpnContentBatch045Lessons,
  ...rpnContentBatch046Lessons,
  ...rpnContentBatch047Lessons,
  ...rpnContentBatch048Lessons,
  ...rpnContentBatch049Lessons,
  ...rpnContentBatch050Lessons,
  ...rpnContentBatch051Lessons,
  ...rpnContentBatch052Lessons,
  ...rpnContentBatch053Lessons,
  ...rpnContentBatch054Lessons,
  ...rpnContentBatch055Lessons,
  ...rpnContentBatch056Lessons,
  ...rpnContentBatch057Lessons,
};
