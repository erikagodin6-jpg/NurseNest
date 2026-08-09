import { describe, expect, it } from "vitest";
import { auditQuestionPublicationContract, isPublicationReady } from "./question-publication-contract";

function completeQuestion() {
  return {
    id: "ca-rn-cardio-q-0001",
    tier: "rn",
    exam: "NCLEX-RN",
    question_type: "MCQ",
    stem: "A client has symptomatic bradycardia. Which action should the nurse take first?",
    options: [
      { id: "opt-atropine", label: "A", text: "Prepare to administer atropine as ordered" },
      { id: "opt-ambulate", label: "B", text: "Ambulate the client in the hallway" },
      { id: "opt-fluid", label: "C", text: "Encourage unrestricted oral fluids" },
      { id: "opt-discharge", label: "D", text: "Prepare the client for discharge" },
    ],
    correct_answer: "opt-atropine",
    rationale: "Symptomatic bradycardia with poor perfusion requires prompt treatment while the nurse continues monitoring and escalation according to the clinical context.",
    correct_answer_explanation: "Atropine is an appropriate first-line medication for clinically significant symptomatic bradycardia when ordered and indicated.",
    distractor_rationales: {
      "opt-ambulate": "Ambulation can worsen symptoms and does not correct hemodynamically significant bradycardia.",
      "opt-fluid": "Oral fluids do not address the immediate conduction problem or symptomatic low heart rate.",
      "opt-discharge": "Discharge is unsafe while the client has unresolved symptomatic bradycardia requiring treatment and reassessment.",
    },
    hint: "Prioritize the intervention that addresses the unstable physiologic problem rather than comfort or discharge tasks.",
    why_this_matters: "Failure to recognize and treat symptomatic bradycardia can lead to worsening hypotension, altered mental status, ischemia, or cardiac arrest.",
    clinical_pearl: "Treat the patient, not the monitor: bradycardia becomes urgent when it causes poor perfusion or instability.",
    mnemonic: "",
    country_code: "US",
    country_labels: ["United States"],
    region_scope: "US",
    licensing_body: "NCSBN",
    language_code: "en",
    unit_system_support: { supported: ["SI", "CONV"], default: "SI" },
    unit_variants: [],
    body_system: "Cardiovascular",
    topic: "Bradycardia",
    tags: ["bradycardia", "priority"],
    difficulty: 3,
  };
}

describe("question publication contract", () => {
  it("accepts a complete option-id based question", () => {
    const q = completeQuestion();
    expect(auditQuestionPublicationContract(q).filter(issue => issue.severity === "blocking")).toEqual([]);
    expect(isPublicationReady(q)).toBe(true);
  });

  it("requires serving tier", () => {
    const q = completeQuestion();
    q.tier = "";
    const issue = auditQuestionPublicationContract(q).find(item => item.code === "missing_tier");
    expect(issue?.severity).toBe("blocking");
  });

  it("rejects legacy string options without stable option ids", () => {
    const q = completeQuestion();
    q.options = q.options.map(option => option.text) as any;
    const issues = auditQuestionPublicationContract(q);
    expect(issues.some(issue => issue.code === "missing_option_ids")).toBe(true);
    expect(issues.some(issue => issue.code === "unstable_or_unresolved_answer_contract")).toBe(true);
  });

  it("requires four distinct options for ordinary single-answer MCQs", () => {
    const q = completeQuestion();
    q.options = q.options.slice(0, 3) as any;
    expect(auditQuestionPublicationContract(q).some(issue => issue.code === "insufficient_mcq_distractors")).toBe(true);

    const q2 = completeQuestion();
    q2.options[3].text = q2.options[2].text;
    expect(auditQuestionPublicationContract(q2).some(issue => issue.code === "duplicate_distractor_text")).toBe(true);
  });

  it("requires exactly one keyed answer for single-answer MCQs", () => {
    const q = completeQuestion();
    q.correct_answer = ["opt-atropine", "opt-fluid"] as any;
    expect(auditQuestionPublicationContract(q).some(issue => issue.code === "invalid_single_answer_cardinality")).toBe(true);
  });

  it("requires a rationale for every incorrect stable option id", () => {
    const q = completeQuestion();
    delete (q.distractor_rationales as any)["opt-fluid"];
    const issues = auditQuestionPublicationContract(q);
    expect(issues.some(issue => issue.field === "distractor_rationales.opt-fluid")).toBe(true);
  });

  it("blocks generator-template options and tautological rationales", () => {
    const q = completeQuestion();
    q.id = "ib-rn-000000";
    q.stem = "Based on the following clinical findings, identify the most likely diagnosis.";
    q.options = [
      { id: "ib-a", text: "Primary Cardiology diagnosis" },
      { id: "ib-b", text: "Cardiology differential 1" },
      { id: "ib-c", text: "Cardiology differential 2" },
      { id: "ib-d", text: "Unrelated diagnosis" },
    ] as any;
    q.correct_answer = "ib-a";
    q.rationale = "The findings are consistent with the primary cardiology diagnosis based on characteristic clinical presentation.";
    q.correct_answer_explanation = q.rationale;
    q.distractor_rationales = {
      "ib-b": "This differential is not the best answer for the presented findings and should not be selected.",
      "ib-c": "This differential is not the best answer for the presented findings and should not be selected.",
      "ib-d": "This unrelated diagnosis does not explain the presented clinical findings and should not be selected.",
    } as any;
    const codes = auditQuestionPublicationContract(q).map(issue => issue.code);
    expect(codes).toContain("templated_option_text");
    expect(codes).toContain("templated_question_stem");
    expect(codes).toContain("templated_rationale");
    expect(codes).toContain("templated_correct_answer_explanation");
    expect(isPublicationReady(q)).toBe(false);
  });

  it("does not depend on display labels or option order", () => {
    const q = completeQuestion();
    q.options = [q.options[2], q.options[0], q.options[3], q.options[1]].map((option, index) => ({ ...option, label: String.fromCharCode(65 + index) })) as any;
    expect(auditQuestionPublicationContract(q).filter(issue => issue.severity === "blocking")).toEqual([]);
  });

  it("preserves and validates ordered-response stable answer sequence", () => {
    const q = completeQuestion();
    q.id = "rn-order-001";
    q.question_type = "ORDERED_RESPONSE";
    q.stem = "Place the actions in the correct sequence for the procedure.";
    q.options = [
      { id: "step-a", label: "A", text: "Perform the initial safety assessment" },
      { id: "step-b", label: "B", text: "Prepare the required equipment" },
      { id: "step-c", label: "C", text: "Complete the intervention" },
      { id: "step-d", label: "D", text: "Reassess the patient response" },
    ] as any;
    q.correct_answer = ["step-a", "step-b", "step-c", "step-d"] as any;
    q.rationale = "The sequence begins with safety assessment, proceeds through preparation and intervention, and finishes with reassessment to confirm the patient's response and identify complications.";
    q.correct_answer_explanation = "The ordered answer preserves the dependency between assessment, preparation, intervention, and post-intervention reassessment.";
    q.distractor_rationales = {} as any;
    q.topic = "Procedure Sequencing";
    q.tags = ["ordered-response", "procedure"];
    expect(auditQuestionPublicationContract(q).filter(issue => issue.severity === "blocking")).toEqual([]);

    q.correct_answer = ["step-a", "step-c", "step-d"] as any;
    expect(auditQuestionPublicationContract(q).some(issue => issue.code === "incomplete_ordered_answer_sequence")).toBe(true);

    q.correct_answer = ["step-a", "step-b", "step-b", "step-d"] as any;
    expect(auditQuestionPublicationContract(q).some(issue => issue.code === "duplicate_ordered_answer_id")).toBe(true);
  });

  it("requires structured SI and conventional variants when measurements are actually convertible", () => {
    const q = completeQuestion();
    q.stem = "A client's blood glucose is 180 mg/dL. Which interpretation is most appropriate?";
    q.unit_system_support = { supported: ["CONV"], default: "CONV" } as any;
    const issues = auditQuestionPublicationContract(q);
    expect(issues.some(issue => issue.code === "missing_si_conv_support")).toBe(true);
    expect(issues.some(issue => issue.code === "missing_unit_variants")).toBe(true);

    q.unit_system_support = { supported: ["SI", "CONV"], default: "SI" } as any;
    q.unit_variants = [{ token: "glucose_1", quantity: "glucose", si: { value: 10, unit: "mmol/L", display: "10.0 mmol/L" }, conv: { value: 180, unit: "mg/dL", display: "180 mg/dL" } }] as any;
    expect(auditQuestionPublicationContract(q).filter(issue => issue.code.startsWith("missing_si") || issue.code === "missing_unit_variants" || issue.code === "malformed_unit_variant")).toEqual([]);
  });

  it("does not require fake SI/CONV variants for invariant units like mmHg", () => {
    const q = completeQuestion();
    q.stem = "The client's blood pressure is 88/52 mmHg. Which action is the priority?";
    expect(auditQuestionPublicationContract(q).some(issue => issue.code === "missing_si_conv_support")).toBe(false);
  });

  it("requires explicit country or global scope", () => {
    const q = completeQuestion(); q.country_code = ""; q.region_scope = "";
    expect(auditQuestionPublicationContract(q).some(issue => issue.code === "missing_country_scope")).toBe(true);
  });

  it("requires explicit labels for ambiguous BOTH scope", () => {
    const q = completeQuestion(); q.country_code = ""; q.region_scope = "BOTH"; q.country_labels = [];
    expect(auditQuestionPublicationContract(q).some(issue => issue.code === "missing_country_labels")).toBe(true);
    q.country_labels = ["Canada", "United States"];
    expect(auditQuestionPublicationContract(q).some(issue => issue.code === "missing_country_labels")).toBe(false);
  });

  it("requires language, hint, Why This Matters and pearl as blocking publication fields", () => {
    const q = completeQuestion(); q.language_code = ""; q.hint = ""; q.why_this_matters = ""; q.clinical_pearl = "";
    const issues = auditQuestionPublicationContract(q);
    for (const code of ["missing_language_code", "missing_hint", "missing_why_this_matters", "missing_clinical_pearl"]) expect(issues.find(i => i.code === code)?.severity).toBe("blocking");
    expect(isPublicationReady(q)).toBe(false);
  });

  it("keeps mnemonic optional but validates it when supplied", () => {
    const q = completeQuestion(); q.mnemonic = "";
    expect(auditQuestionPublicationContract(q).some(issue => issue.code === "weak_mnemonic")).toBe(false);
    q.mnemonic = "x";
    expect(auditQuestionPublicationContract(q).some(issue => issue.code === "weak_mnemonic")).toBe(true);
  });
});
