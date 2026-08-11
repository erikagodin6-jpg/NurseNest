import { describe, expect, it } from "vitest";
import { validateQuestionUnitVariant } from "./question-unit-conversion";

describe("question unit conversion validation", () => {
  it("validates glucose mg/dL to mmol/L", () => {
    expect(validateQuestionUnitVariant({
      token:"glucose", quantity:"glucose",
      si:{value:10,unit:"mmol/L",display:"10.0 mmol/L"},
      conv:{value:180,unit:"mg/dL",display:"180 mg/dL"},
    }).valid).toBe(true);
  });

  it("rejects an incorrect glucose conversion", () => {
    const result = validateQuestionUnitVariant({
      token:"glucose", quantity:"glucose",
      si:{value:6,unit:"mmol/L",display:"6 mmol/L"},
      conv:{value:180,unit:"mg/dL",display:"180 mg/dL"},
    });
    expect(result.valid).toBe(false);
    expect(result.reason).toBe("lab_conversion_mismatch");
  });

  it("validates creatinine mg/dL to umol/L", () => {
    expect(validateQuestionUnitVariant({
      token:"creatinine", quantity:"creatinine",
      si:{value:88.4,unit:"umol/L",display:"88.4 µmol/L"},
      conv:{value:1,unit:"mg/dL",display:"1.0 mg/dL"},
    }).valid).toBe(true);
  });

  it("validates temperature", () => {
    expect(validateQuestionUnitVariant({
      token:"temp", quantity:"temperature",
      si:{value:38,unit:"°C",display:"38.0 °C"},
      conv:{value:100.4,unit:"°F",display:"100.4 °F"},
    }).valid).toBe(true);
  });

  it("validates kg and lb", () => {
    expect(validateQuestionUnitVariant({
      token:"weight", quantity:"weight",
      si:{value:70,unit:"kg",display:"70 kg"},
      conv:{value:154.3,unit:"lb",display:"154.3 lb"},
    }).valid).toBe(true);
  });

  it("blocks unsupported conversion pairs instead of certifying them", () => {
    const result = validateQuestionUnitVariant({
      token:"unknown", quantity:"unknown_analyte",
      si:{value:1,unit:"unitA",display:"1 unitA"},
      conv:{value:2,unit:"unitB",display:"2 unitB"},
    });
    expect(result.valid).toBe(false);
    expect(result.reason).toBe("unsupported_conversion_pair");
  });
});
