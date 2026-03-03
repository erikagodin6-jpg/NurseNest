import type { ExamBlueprint } from "./question-pool";
import type { PooledQuestion } from "./question-pool";

export interface CATResponse {
  itemId: string;
  isCorrect: boolean;
  abilityAtTime: number;
}

export interface CATState {
  abilityEstimate: number;
  standardError: number;
  itemsAdministered: number;
  responses: CATResponse[];
  abilityHistory: number[];
}

export interface DomainBand {
  domain: string;
  level: "Above Passing" | "Near Passing" | "Below Passing";
  correct: number;
  total: number;
  percentage: number;
}

export function initCAT(): CATState {
  return {
    abilityEstimate: 0,
    standardError: 1.0,
    itemsAdministered: 0,
    responses: [],
    abilityHistory: [0],
  };
}

function itemDifficulty(item: PooledQuestion): number {
  const id = item.id;
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash + id.charCodeAt(i)) | 0;
  }
  return ((hash % 300) / 100);
}

function logistic(theta: number, b: number): number {
  const D = 1.7;
  return 1 / (1 + Math.exp(-D * (theta - b)));
}

export function selectNextItem(
  state: CATState,
  remainingItems: PooledQuestion[]
): PooledQuestion | null {
  if (remainingItems.length === 0) return null;

  const scored = remainingItems.map((item) => {
    const b = itemDifficulty(item);
    const dist = Math.abs(state.abilityEstimate - b);
    const jitter = Math.random() * 0.3;
    return { item, score: dist + jitter };
  });

  scored.sort((a, b) => a.score - b.score);

  const topK = Math.min(5, scored.length);
  const pick = Math.floor(Math.random() * topK);
  return scored[pick].item;
}

export function updateAbility(
  state: CATState,
  item: PooledQuestion,
  isCorrect: boolean
): CATState {
  const b = itemDifficulty(item);
  const p = logistic(state.abilityEstimate, b);

  const stepSize = state.standardError * 0.5;
  const delta = isCorrect ? stepSize * (1 - p) : -stepSize * p;
  const newTheta = state.abilityEstimate + delta;

  const info = p * (1 - p);
  const totalInfo =
    state.itemsAdministered > 0
      ? 1 / (state.standardError * state.standardError) + info
      : 1 + info;
  const newSE = 1 / Math.sqrt(totalInfo);

  const newResponse: CATResponse = {
    itemId: item.id,
    isCorrect,
    abilityAtTime: newTheta,
  };

  return {
    abilityEstimate: newTheta,
    standardError: newSE,
    itemsAdministered: state.itemsAdministered + 1,
    responses: [...state.responses, newResponse],
    abilityHistory: [...state.abilityHistory, newTheta],
  };
}

export function shouldStop(
  state: CATState,
  blueprint: ExamBlueprint
): boolean {
  const minQ = (blueprint as any).minQuestions ?? blueprint.totalQuestions;
  const maxQ = (blueprint as any).maxQuestions ?? blueprint.totalQuestions;

  if (state.itemsAdministered >= maxQ) {
    return true;
  }

  if (state.standardError < 0.33 && state.itemsAdministered >= minQ) {
    return true;
  }

  return false;
}

export function getPassFailResult(state: CATState): {
  passed: boolean;
  label: string;
} {
  if (state.abilityEstimate >= 0) {
    return { passed: true, label: "PASS" };
  }
  return { passed: false, label: "FAIL" };
}

export function getDomainBands(
  domainScores: Record<string, { correct: number; total: number }>
): DomainBand[] {
  return Object.entries(domainScores).map(([domain, scores]) => {
    const percentage =
      scores.total > 0 ? Math.round((scores.correct / scores.total) * 100) : 0;

    let level: DomainBand["level"];
    if (percentage >= 65) {
      level = "Above Passing";
    } else if (percentage >= 50) {
      level = "Near Passing";
    } else {
      level = "Below Passing";
    }

    return {
      domain,
      level,
      correct: scores.correct,
      total: scores.total,
      percentage,
    };
  });
}

export function computeScaledScore(
  rawPercentage: number,
  scoreRange: { min: number; max: number; passScore: number }
): { scaledScore: number; passed: boolean } {
  const range = scoreRange.max - scoreRange.min;
  const scaledScore = Math.round(scoreRange.min + (rawPercentage / 100) * range);
  const clamped = Math.max(scoreRange.min, Math.min(scoreRange.max, scaledScore));

  return {
    scaledScore: clamped,
    passed: clamped >= scoreRange.passScore,
  };
}
