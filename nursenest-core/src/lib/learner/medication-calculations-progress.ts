"use client";

export type MedCalcProgressV1 = {
  version: 1;
  totalCorrect: number;
  totalAttempts: number;
  streak: number;
  /** 0 beginner … 2 stretch */
  difficultyTier: 0 | 1 | 2;
  lastUpdatedIso: string;
};

const STORAGE_KEY = "nursenest_med_calc_progress_v1";

export const MED_CALC_PROGRESS_TODO_BACKEND =
  "TODO: sync medication-calculation drill stats to learner analytics API when available.";

export function loadMedCalcProgress(): MedCalcProgressV1 | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as MedCalcProgressV1;
    if (parsed?.version !== 1) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveMedCalcProgress(next: MedCalcProgressV1): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore quota */
  }
}

export function defaultMedCalcProgress(): MedCalcProgressV1 {
  return {
    version: 1,
    totalCorrect: 0,
    totalAttempts: 0,
    streak: 0,
    difficultyTier: 0,
    lastUpdatedIso: new Date().toISOString(),
  };
}
