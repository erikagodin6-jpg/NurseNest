import test from "node:test";
import assert from "node:assert/strict";
import { initMachine, reduceScenarioState, scenarioReducer } from "@/lib/scenarios/scenario-machine";
import { getScenarioById } from "@/lib/scenarios/catalog";

test("initMachine returns playing state at start node", () => {
  const s = initMachine("post-op-hypovolemia");
  assert.ok(s);
  assert.equal(s?.phase, "playing");
  assert.equal(s?.nodeId, "ctx-0600");
  assert.equal(s?.vitalsPhase, 0);
});

test("CONTINUE advances narrative", () => {
  let s = initMachine("post-op-hypovolemia")!;
  s = reduceScenarioState(s, { type: "CONTINUE" });
  assert.equal(s.phase, "playing");
  if (s.phase === "playing") assert.equal(s.nodeId, "vitals-0800");
});

test("CHOOSE correct path reaches success terminal", () => {
  let s = initMachine("post-op-hypovolemia")!;
  s = reduceScenarioState(s, { type: "CONTINUE" });
  s = reduceScenarioState(s, { type: "CONTINUE" });
  assert.equal(s.phase, "playing");
  if (s.phase !== "playing") throw new Error("expected playing");
  s = reduceScenarioState(s, { type: "CHOOSE", optionId: "full-assessment-ivf" });
  assert.equal(s.phase, "complete");
  if (s.phase === "complete") {
    assert.equal(s.outcome, "success");
    assert.equal(s.flags.missedPrioritization, undefined);
  }
});

test("CHOOSE comfort-only path sets remediation flags", () => {
  let s = initMachine("post-op-hypovolemia")!;
  s = reduceScenarioState(s, { type: "CONTINUE" });
  s = reduceScenarioState(s, { type: "CONTINUE" });
  s = reduceScenarioState(s, { type: "CHOOSE", optionId: "antiemetic-only" });
  assert.equal(s.phase, "complete");
  if (s.phase === "complete") {
    assert.equal(s.outcome, "decompensation");
    assert.equal(s.flags.missedPrioritization, true);
    assert.equal(s.flags.delayedEscalation, true);
  }
});

test("ADVANCE_VITALS caps at sequence length", () => {
  const scenario = getScenarioById("post-op-hypovolemia")!;
  let s = initMachine("post-op-hypovolemia")!;
  s = reduceScenarioState(s, { type: "CONTINUE" }); // vitals-0800 (3-point vitals sequence)
  if (s.phase !== "playing") throw new Error("expected playing");
  s = scenarioReducer(s, { type: "ADVANCE_VITALS" }, scenario);
  if (s.phase !== "playing") throw new Error("expected playing");
  assert.equal(s.vitalsPhase, 1);
  s = scenarioReducer(s, { type: "ADVANCE_VITALS" }, scenario);
  assert.equal(s.vitalsPhase, 2);
  s = scenarioReducer(s, { type: "ADVANCE_VITALS" }, scenario);
  assert.equal(s.vitalsPhase, 2);
});

test("RESET returns fresh machine", () => {
  let s = initMachine("chest-pain-triage")!;
  s = reduceScenarioState(s, { type: "RESET", scenarioId: "chest-pain-triage" });
  if (s.phase === "playing") {
    assert.equal(s.nodeId, "ctx-triage");
    assert.deepEqual(s.flags, {});
  }
});
