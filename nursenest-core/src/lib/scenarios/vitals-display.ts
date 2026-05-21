import type { ScenarioNode, VitalsSnapshot } from "@/lib/scenarios/types";

export function vitalsForNode(node: ScenarioNode, phase: number): VitalsSnapshot | undefined {
  if (node.type === "terminal") return undefined;
  const seq = node.vitalsSequence;
  if (seq?.length) return seq[Math.min(Math.max(phase, 0), seq.length - 1)];
  return node.vitals;
}
