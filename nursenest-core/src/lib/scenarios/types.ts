export type ExamTargetTag = "NCLEX_RN" | "REX_PN" | "NP" | "NEW_GRAD";

export type ScenarioDifficulty = "FOUNDATION" | "INTERMEDIATE" | "ADVANCED";

export type VitalsSnapshot = {
  hr: number;
  bpSys: number;
  bpDia: number;
  rr: number;
  spo2: number;
  tempC: number;
  /** Optional monitor context, e.g. "Room air" */
  context?: string;
};

export type ScenarioRunFlags = {
  missedPrioritization?: boolean;
  delayedEscalation?: boolean;
};

export type TerminalOutcome = "success" | "escalation" | "decompensation";

export type ScenarioNarrativeNode = {
  type: "narrative";
  id: string;
  title: string;
  body: string;
  /** Optional vitals strip while reading context */
  vitals?: VitalsSnapshot;
  vitalsSequence?: VitalsSnapshot[];
  next: string;
};

export type ScenarioDecisionOption = {
  id: string;
  label: string;
  next: string;
  /** Machine flags — drive remediation recommendations */
  flags?: Partial<ScenarioRunFlags>;
};

export type ScenarioDecisionNode = {
  type: "decision";
  id: string;
  title: string;
  stem: string;
  ngnHint?: string;
  vitals?: VitalsSnapshot;
  vitalsSequence?: VitalsSnapshot[];
  options: ScenarioDecisionOption[];
};

export type ScenarioTerminalNode = {
  type: "terminal";
  id: string;
  outcome: TerminalOutcome;
  title: string;
  message: string;
  /** Post-scenario teaching — distinct from CAT “no rationale during item” */
  rationale: string;
  catNote?: string;
};

export type ScenarioNode = ScenarioNarrativeNode | ScenarioDecisionNode | ScenarioTerminalNode;

export type ScenarioDefinition = {
  id: string;
  title: string;
  summary: string;
  difficulty: ScenarioDifficulty;
  pathwayTags: ExamTargetTag[];
  estimatedMinutes: number;
  tags: string[];
  startNodeId: string;
  nodes: Record<string, ScenarioNode>;
  /** Labels for the premium stepper (stable across branches) */
  outlineStepLabels: string[];
};
