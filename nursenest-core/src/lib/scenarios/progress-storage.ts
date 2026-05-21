import type { TerminalOutcome } from "@/lib/scenarios/types";

const STORAGE_KEY = "nursenest:scenario-hub:v1";

export type ScenarioRunLog = {
  scenarioId: string;
  outcome: TerminalOutcome;
  at: string;
  missedPrioritization?: boolean;
  delayedEscalation?: boolean;
};

export type ScenarioHubPersisted = {
  /** Last in-progress position (client-only resume) */
  draft: { scenarioId: string; nodeId: string; vitalsPhase: number; updatedAt: string } | null;
  runs: ScenarioRunLog[];
  /** Derived hint for adaptive UI */
  lastMissedPrioritizationAt: string | null;
};

export const defaultScenarioHubPersisted: ScenarioHubPersisted = {
  draft: null,
  runs: [],
  lastMissedPrioritizationAt: null,
};

function safeParse(raw: string | null): ScenarioHubPersisted {
  if (!raw) return { ...defaultScenarioHubPersisted };
  try {
    const v = JSON.parse(raw) as ScenarioHubPersisted;
    if (!v || typeof v !== "object") return { ...defaultScenarioHubPersisted };
    return {
      draft: v.draft ?? null,
      runs: Array.isArray(v.runs) ? v.runs : [],
      lastMissedPrioritizationAt: v.lastMissedPrioritizationAt ?? null,
    };
  } catch {
    return { ...defaultScenarioHubPersisted };
  }
}

export function readScenarioHub(userKey: string): ScenarioHubPersisted {
  if (typeof window === "undefined") return { ...defaultScenarioHubPersisted };
  return safeParse(window.localStorage.getItem(`${STORAGE_KEY}:${userKey}`));
}

export function writeScenarioHub(userKey: string, data: ScenarioHubPersisted): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(`${STORAGE_KEY}:${userKey}`, JSON.stringify(data));
}

export function appendScenarioRun(
  userKey: string,
  run: ScenarioRunLog,
  clearDraft: boolean,
): ScenarioHubPersisted {
  const cur = readScenarioHub(userKey);
  const runs = [run, ...cur.runs].slice(0, 40);
  const next: ScenarioHubPersisted = {
    draft: clearDraft ? null : cur.draft,
    runs,
    lastMissedPrioritizationAt:
      run.missedPrioritization ? run.at : cur.lastMissedPrioritizationAt,
  };
  writeScenarioHub(userKey, next);
  return next;
}

export function saveDraft(
  userKey: string,
  draft: NonNullable<ScenarioHubPersisted["draft"]>,
): void {
  const cur = readScenarioHub(userKey);
  writeScenarioHub(userKey, { ...cur, draft });
}

export function clearDraft(userKey: string): void {
  const cur = readScenarioHub(userKey);
  writeScenarioHub(userKey, { ...cur, draft: null });
}

export function completionStats(runs: ScenarioRunLog[]): {
  total: number;
  successRate: number;
  byOutcome: Record<TerminalOutcome, number>;
} {
  const byOutcome: Record<TerminalOutcome, number> = {
    success: 0,
    escalation: 0,
    decompensation: 0,
  };
  for (const r of runs) {
    byOutcome[r.outcome] = (byOutcome[r.outcome] ?? 0) + 1;
  }
  const total = runs.length;
  const successRate = total ? Math.round((byOutcome.success / total) * 100) : 0;
  return { total, successRate, byOutcome };
}
