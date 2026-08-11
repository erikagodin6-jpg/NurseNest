import { describe, expect, it } from "vitest";
import { canonicalQuestionType, usesFlatOptions, validateInteractionContract } from "./question-interaction-contract";

describe("question interaction contract", () => {
  it("normalizes only certified question types", () => {
    expect(canonicalQuestionType("multiple-choice")).toBe("MCQ");
    expect(canonicalQuestionType("matrix_multi")).toBe("MATRIX");
    expect(canonicalQuestionType("case_study_series")).toBe("NGN_CASE");
    expect(canonicalQuestionType("HANDOFF_REVIEW")).toBeNull();
    expect(canonicalQuestionType("DELEGATION_ASSIGNMENT")).toBeNull();
  });

  it("identifies flat option contracts", () => {
    expect(usesFlatOptions("MCQ")).toBe(true);
    expect(usesFlatOptions("SATA")).toBe(true);
    expect(usesFlatOptions("ORDERED_RESPONSE")).toBe(true);
    expect(usesFlatOptions("BOWTIE")).toBe(false);
  });

  it("accepts a stable Bow-Tie payload", () => {
    const issues = validateInteractionContract({
      questionType: "BOWTIE",
      interactionPayload: {
        conditionOptions: [
          { id:"condition-1", text:"Pulmonary edema" },
          { id:"condition-2", text:"Pneumothorax" },
        ],
        actionOptions: [
          { id:"action-1", text:"Apply oxygen" },
          { id:"action-2", text:"Reassess breath sounds" },
          { id:"action-3", text:"Encourage ambulation" },
        ],
        monitorOptions: [
          { id:"monitor-1", text:"Oxygen saturation" },
          { id:"monitor-2", text:"Work of breathing" },
        ],
        slots: { conditions:1, actions:2, monitors:2 },
      },
    });
    expect(issues).toEqual([]);
  });

  it("rejects primitive Bow-Tie choices", () => {
    const issues = validateInteractionContract({
      questionType:"BOWTIE",
      interactionPayload:{
        conditionOptions:["A","B"],
        actionOptions:["C","D"],
        monitorOptions:["E","F"],
        slots:{conditions:1,actions:1,monitors:1},
      },
    });
    expect(issues.some(i=>i.code === "positional_interaction_choice")).toBe(true);
  });

  it("requires stable matrix row and column ids", () => {
    const issues = validateInteractionContract({
      questionType:"MATRIX_MULTI",
      interactionPayload:{
        rows:[{id:"r1",text:"Finding 1"},{text:"Finding 2"}],
        columns:[{id:"c1",text:"Expected"},{id:"c2",text:"Unexpected"}],
        answerKey:{r1:["c1"],r2:["c2"]},
      },
    });
    expect(issues.some(i=>i.code === "missing_matrix_row_id")).toBe(true);
  });

  it("requires case exhibit and subquestion identities", () => {
    const issues = validateInteractionContract({
      questionType:"CASE_STUDY_SERIES",
      interactionPayload:{
        tabs:[{id:"tab-vitals",title:"Vitals"},{id:"tab-labs",title:"Labs"}],
        subQuestions:[{id:"case-q1",stem:"Which finding is most concerning?"}],
      },
    });
    expect(issues).toEqual([]);
  });

  it("requires cloze blank and choice ids", () => {
    const issues = validateInteractionContract({
      questionType:"DROPDOWN_CLOZE",
      interactionPayload:{
        textTemplate:"The client is at risk for {{blank1}}.",
        blanks:[{
          id:"blank1",
          options:[{id:"choice-a",text:"hypoglycemia"},{id:"choice-b",text:"hypernatremia"}],
        }],
      },
    });
    expect(issues).toEqual([]);
  });
});
