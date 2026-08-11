import { describe, expect, it } from "vitest";
import { canonicalOptions, correctAnswerIds, gradeQuestionAttempt, learnerQuestionPayload, renderUnitPreference, reviewQuestionPayload } from "./question-serving-contract";

const row = {
  id: "q-glucose-001",
  stem: "A glucose level is 100 mg/dL. Which response is best?",
  options: [
    { id: "q-glucose-001:opt:a", text: "Observe", label: "A" },
    { id: "q-glucose-001:opt:b", text: "Treat hypoglycemia", label: "B" },
  ],
  correct_answer: ["q-glucose-001:opt:a"],
  distractor_rationales: { "q-glucose-001:opt:b": "This value is not hypoglycemic, so immediate glucose treatment is not indicated." },
  rationale: "A glucose value near the normal fasting range does not by itself require emergency treatment.",
  correct_answer_explanation: "Observation is appropriate because the displayed value is not hypoglycemic.",
  hint: "Decide whether the value actually meets a treatment threshold before intervening.",
  why_this_matters: "Incorrect treatment of a normal value can expose the patient to avoidable hyperglycemia and obscure the real problem.",
  clinical_pearl: "Treat the patient and threshold, not a number in isolation.",
  unit_system_support: { supported: ["SI","CONV"], default: "SI" },
  unit_variants: [{ token:"glucose_1", quantity:"glucose", si:{value:5.6,unit:"mmol/L",display:"5.6 mmol/L"}, conv:{value:100,unit:"mg/dL",display:"100 mg/dL"} }],
  tier:"rn", exam:"NCLEX-RN", country_code:"US", body_system:"Endocrine", topic:"Glucose", difficulty:2,
};

describe("question serving contract", () => {
  it("grades stable ids", () => {
    expect(gradeQuestionAttempt(row,"q-glucose-001:opt:a").correct).toBe(true);
    expect(gradeQuestionAttempt(row,"q-glucose-001:opt:b").correct).toBe(false);
  });

  it("accepts legacy index and label submissions during migration", () => {
    expect(gradeQuestionAttempt(row,0).correct).toBe(true);
    expect(gradeQuestionAttempt(row,"A").correct).toBe(true);
    expect(gradeQuestionAttempt(row,1).correct).toBe(false);
  });

  it("preserves option ids when order changes", () => {
    const shuffled = { ...row, options:[row.options[1],row.options[0]] };
    expect(correctAnswerIds(shuffled)).toEqual(["q-glucose-001:opt:a"]);
    expect(gradeQuestionAttempt(shuffled,"q-glucose-001:opt:a").correct).toBe(true);
  });

  it("switches display units without changing ids or grading", () => {
    const si = renderUnitPreference(row,"SI");
    const conv = renderUnitPreference(row,"CONV");
    expect(si.stem).toContain("5.6 mmol/L");
    expect(conv.stem).toContain("100 mg/dL");
    expect(si.options.map(o=>o.id)).toEqual(conv.options.map(o=>o.id));
    expect(gradeQuestionAttempt(row,"q-glucose-001:opt:a").correct).toBe(true);
  });

  it("does not leak answers in learner payload", () => {
    const payload:any = learnerQuestionPayload(row,"SI");
    expect(payload.correctAnswer).toBeUndefined();
    expect(payload.correctAnswerIds).toBeUndefined();
    expect(payload.rationale).toBeUndefined();
    expect(payload.options[0].id).toBeTruthy();
  });

  it("returns full tutor review metadata after an attempt", () => {
    const payload:any = reviewQuestionPayload(row,"q-glucose-001:opt:b","CONV");
    expect(payload.correct).toBe(false);
    expect(payload.selectedDistractorRationale).toContain("not hypoglycemic");
    expect(payload.hint).toBeTruthy();
    expect(payload.whyThisMatters).toBeTruthy();
    expect(payload.clinicalPearl).toBeTruthy();
  });

  it("normalizes primitive legacy options deterministically", () => {
    const legacy = { id:"legacy-1", options:["Alpha","Beta"], correct_answer:[0] };
    const first = canonicalOptions(legacy);
    const second = canonicalOptions(legacy);
    expect(first.map(o=>o.id)).toEqual(second.map(o=>o.id));
    expect(first.every(o=>o.id.length > 5)).toBe(true);
  });
});
