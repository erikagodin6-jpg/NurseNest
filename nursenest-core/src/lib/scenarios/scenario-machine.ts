import type { ScenarioDefinition, ScenarioNode, ScenarioRunFlags, TerminalOutcome } from "@/lib/scenarios/types";
import { getScenarioById } from "@/lib/scenarios/catalog";

export type PlayingState = {
  phase: "playing";
  scenarioId: string;
  nodeId: string;
  vitalsPhase: number;
  flags: ScenarioRunFlags;
  history: string[];
};

export type CompleteState = {
  phase: "complete";
  scenarioId: string;
  nodeId: string;
  outcome: TerminalOutcome;
  flags: ScenarioRunFlags;
  history: string[];
};

export type ScenarioMachineState = PlayingState | CompleteState;

export type ScenarioMachineEvent =
  | { type: "CONTINUE" }
  | { type: "CHOOSE"; optionId: string }
  | { type: "ADVANCE_VITALS" }
  | { type: "RESET"; scenarioId: string };

function mergeFlags(base: ScenarioRunFlags, add?: Partial<ScenarioRunFlags>): ScenarioRunFlags {
  return {
    missedPrioritization: base.missedPrioritization || add?.missedPrioritization,
    delayedEscalation: base.delayedEscalation || add?.delayedEscalation,
  };
}

function maxVitalsPhases(node: ScenarioNode): number {
  if (node.type === "terminal") return 0;
  const seq = node.vitalsSequence;
  if (seq?.length) return Math.max(0, seq.length - 1);
  return 0;
}

function getNode(scenario: ScenarioDefinition, nodeId: string): ScenarioNode | undefined {
  return scenario.nodes[nodeId];
}

export function initMachine(scenarioId: string): ScenarioMachineState | null {
  const scenario = getScenarioById(scenarioId);
  if (!scenario) return null;
  return {
    phase: "playing",
    scenarioId,
    nodeId: scenario.startNodeId,
    vitalsPhase: 0,
    flags: {},
    history: [scenario.startNodeId],
  };
}

/**
 * Pure reducer for branching OSCE flow. Vitals phase advances independently so UI can simulate time.
 */
export function scenarioReducer(
  state: ScenarioMachineState,
  event: ScenarioMachineEvent,
  scenario: ScenarioDefinition,
): ScenarioMachineState {
  if (event.type === "RESET") {
    return initMachine(event.scenarioId) ?? state;
  }

  if (state.phase === "complete") {
    return state;
  }

  const node = getNode(scenario, state.nodeId);
  if (!node) return state;

  if (event.type === "ADVANCE_VITALS") {
    const cap = maxVitalsPhases(node);
    return {
      ...state,
      vitalsPhase: Math.min(state.vitalsPhase + 1, cap),
    };
  }

  if (event.type === "CONTINUE") {
    if (node.type !== "narrative") return state;
    const nextId = node.next;
    const nextNode = getNode(scenario, nextId);
    if (!nextNode) return state;
    if (nextNode.type === "terminal") {
      return {
        phase: "complete",
        scenarioId: state.scenarioId,
        nodeId: nextNode.id,
        outcome: nextNode.outcome,
        flags: state.flags,
        history: [...state.history, nextId],
      };
    }
    return {
      ...state,
      nodeId: nextId,
      vitalsPhase: 0,
      history: [...state.history, nextId],
    };
  }

  if (event.type === "CHOOSE") {
    if (node.type !== "decision") return state;
    const opt = node.options.find((o) => o.id === event.optionId);
    if (!opt) return state;
    const nextFlags = mergeFlags(state.flags, opt.flags);
    const nextId = opt.next;
    const nextNode = getNode(scenario, nextId);
    if (!nextNode) return state;
    if (nextNode.type === "terminal") {
      return {
        phase: "complete",
        scenarioId: state.scenarioId,
        nodeId: nextNode.id,
        outcome: nextNode.outcome,
        flags: nextFlags,
        history: [...state.history, nextId],
      };
    }
    return {
      phase: "playing",
      scenarioId: state.scenarioId,
      nodeId: nextId,
      vitalsPhase: 0,
      flags: nextFlags,
      history: [...state.history, nextId],
    };
  }

  return state;
}

/** Apply reducer using catalog lookup — convenience for tests/UI. */
export function reduceScenarioState(
  state: ScenarioMachineState,
  event: ScenarioMachineEvent,
): ScenarioMachineState {
  const scenario = getScenarioById(state.scenarioId);
  if (!scenario) return state;
  return scenarioReducer(state, event, scenario);
}
