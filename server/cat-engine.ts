const DIFFICULTY_SCALING: Record<number, number> = {
  1: 0.5,
  2: 0.8,
  3: 1.0,
  4: 1.3,
  5: 1.6,
};

const EXPECTED_ACCURACY: Record<number, [number, number]> = {
  1: [0.80, 0.90],
  2: [0.65, 0.80],
  3: [0.50, 0.65],
  4: [0.35, 0.50],
  5: [0.20, 0.35],
};

export interface QuestionResponse {
  questionId: string;
  difficulty: number;
  correct: boolean;
  timeSpent: number;
  blueprintCategory?: string;
  discriminationIndex?: number;
}

export interface AbilityEstimate {
  ability: number;
  confidenceInterval: number;
  trajectory: number[];
  stabilityIndex: number;
  questionCount: number;
  earlyStop: boolean;
  antiGamingFlags: string[];
}

export function computeAbilityEstimate(responses: QuestionResponse[]): AbilityEstimate {
  let ability = 0;
  const trajectory: number[] = [0];
  const antiGamingFlags: string[] = [];

  const questionAttempts = new Map<string, number>();
  let fastGuessCount = 0;

  for (const r of responses) {
    const count = (questionAttempts.get(r.questionId) || 0) + 1;
    questionAttempts.set(r.questionId, count);

    if (count > 2) continue;

    if (r.timeSpent < 5) {
      fastGuessCount++;
      if (fastGuessCount > 5) {
        antiGamingFlags.push("fast_guessing_pattern");
      }
      continue;
    }

    const scale = DIFFICULTY_SCALING[r.difficulty] || 1.0;
    if (r.correct) {
      ability += scale;
    } else {
      ability -= scale;
    }
    trajectory.push(ability);
  }

  if (responses.length < 50) {
    antiGamingFlags.push("below_minimum_items");
  }

  const recentTrajectory = trajectory.slice(-10);
  const mean = recentTrajectory.reduce((a, b) => a + b, 0) / recentTrajectory.length;
  const variance = recentTrajectory.reduce((a, b) => a + (b - mean) ** 2, 0) / recentTrajectory.length;
  const stabilityIndex = Math.max(0, 1 - Math.sqrt(variance) / 5);

  const difficulties = responses.map(r => r.difficulty);
  const difficultySpread = Math.max(...difficulties) - Math.min(...difficulties);
  const confidenceInterval = Math.max(0.5, 3 - (responses.length * 0.02) - (difficultySpread * 0.3));

  const earlyStop = responses.length >= 75 && confidenceInterval < 1.0 && stabilityIndex > 0.7;

  return { ability, confidenceInterval, trajectory, stabilityIndex, questionCount: responses.length, earlyStop, antiGamingFlags };
}

export interface CandidateItem {
  id: string;
  difficulty: number;
  blueprintCategory: string;
  discriminationIndex: number;
  attemptCount: number;
  exposureCount: number;
  isCaseSet: boolean;
}

export function selectNextItem(
  currentAbility: number,
  candidates: CandidateItem[],
  answeredCategories: Record<string, number>,
  blueprintWeights: Record<string, number>,
  totalAnswered: number,
  lastCaseSetIndex: number
): CandidateItem | null {
  if (candidates.length === 0) return null;

  const scored = candidates.map(item => {
    const abilityNorm = Math.abs(currentAbility);
    const targetDiff = Math.min(5, Math.max(1, Math.round(3 + currentAbility / 2)));
    const proximityScore = 1 - Math.abs(item.difficulty - targetDiff) / 4;

    const catWeight = blueprintWeights[item.blueprintCategory] || 0.1;
    const catAnswered = answeredCategories[item.blueprintCategory] || 0;
    const catTarget = catWeight * totalAnswered;
    const blueprintBalance = catTarget > 0 ? Math.max(0, 1 - catAnswered / Math.max(catTarget, 1)) : 0.5;

    const discWeight = Math.min(1, (item.discriminationIndex || 0.3) / 0.5);

    const exposurePenalty = Math.min(1, (item.exposureCount || 0) / 10);

    let caseBonus = 0;
    if (item.isCaseSet && totalAnswered - lastCaseSetIndex >= 15) {
      caseBonus = 0.2;
    }

    const score = proximityScore * 0.4 + blueprintBalance * 0.3 + discWeight * 0.2 - exposurePenalty * 0.1 + caseBonus;

    return { item, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.item || null;
}

export function checkDifficultyCalibration(
  difficultyStats: { level: number; correct: number; total: number }[]
): { level: number; actualPercent: number; expectedLow: number; expectedHigh: number; deviation: boolean; suggestedAdjustment: string }[] {
  return difficultyStats.map(stat => {
    const actualPercent = stat.total > 0 ? stat.correct / stat.total : 0;
    const [expectedLow, expectedHigh] = EXPECTED_ACCURACY[stat.level] || [0.5, 0.65];
    const deviation = actualPercent < expectedLow - 0.05 || actualPercent > expectedHigh + 0.05;
    let suggestedAdjustment = "none";
    if (actualPercent > expectedHigh + 0.05) suggestedAdjustment = "increase_difficulty_weight";
    if (actualPercent < expectedLow - 0.05) suggestedAdjustment = "decrease_difficulty_weight";
    return { level: stat.level, actualPercent: Math.round(actualPercent * 100), expectedLow: expectedLow * 100, expectedHigh: expectedHigh * 100, deviation, suggestedAdjustment };
  });
}
