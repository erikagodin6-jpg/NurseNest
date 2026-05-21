/**
 * Delivery surface for exam items.
 * - `practice`: tutor-friendly review surfaces may appear (future / gated elsewhere).
 * - `cat`: licensure simulation — no rationales during the attempt; post-submit report only.
 */
export type ExamDeliveryMode = "practice" | "cat";

export const EXAM_DELIVERY_CAT: ExamDeliveryMode = "cat";
export const EXAM_DELIVERY_PRACTICE: ExamDeliveryMode = "practice";

export function isCatDelivery(mode: ExamDeliveryMode): boolean {
  return mode === "cat";
}
