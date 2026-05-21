import type { ExamTargetTag, ScenarioDefinition } from "@/lib/scenarios/types";

const postOpHypovolemia: ScenarioDefinition = {
  id: "post-op-hypovolemia",
  title: "Post-op floor: subtle hypovolemia",
  summary:
    "A stable-appearing post-op patient drifts toward hypovolemia. Prioritize assessment, trends, and escalation over comfort-only actions.",
  difficulty: "INTERMEDIATE",
  pathwayTags: ["NCLEX_RN", "REX_PN", "NEW_GRAD"],
  estimatedMinutes: 12,
  tags: ["Med-surg", "Prioritization", "Vitals trends", "Safety"],
  startNodeId: "ctx-0600",
  outlineStepLabels: ["Context", "First data", "Prioritization", "Outcome"],
  nodes: {
    "ctx-0600": {
      type: "narrative",
      id: "ctx-0600",
      title: "0600 — nursing handoff",
      body: "POD#1 after laparoscopic cholecystectomy. Patient is AOx4, mild nausea controlled with ondansetron overnight. IV running Lactated Ringer’s. You are assuming care with 4 other patients on the team.",
      vitals: { hr: 88, bpSys: 118, bpDia: 72, rr: 16, spo2: 97, tempC: 36.7, context: "RA, mild pain 3/10" },
      next: "vitals-0800",
    },
    "vitals-0800": {
      type: "narrative",
      id: "vitals-0800",
      title: "0800 — spot check",
      body: "You notice the monitor trending busier than the verbal report. The patient looks tired but is conversing.",
      vitals: { hr: 96, bpSys: 112, bpDia: 68, rr: 18, spo2: 96, tempC: 36.8, context: "RA" },
      vitalsSequence: [
        { hr: 96, bpSys: 112, bpDia: 68, rr: 18, spo2: 96, tempC: 36.8, context: "RA — 08:00" },
        { hr: 104, bpSys: 104, bpDia: 64, rr: 20, spo2: 95, tempC: 36.9, context: "RA — 08:08" },
        { hr: 112, bpSys: 98, bpDia: 60, rr: 22, spo2: 94, tempC: 37.0, context: "RA — 08:16" },
      ],
      next: "dec-priority",
    },
    "dec-priority": {
      type: "decision",
      id: "dec-priority",
      title: "NGN-style prioritization",
      stem: "Which action best balances safety and scope for the next 5 minutes?",
      ngnHint: "Trend beats snapshot; assume orders exist for PRN interventions unless contraindicated.",
      vitalsSequence: [
        { hr: 112, bpSys: 98, bpDia: 60, rr: 22, spo2: 94, tempC: 37.0, context: "Live — 08:16" },
        { hr: 118, bpSys: 92, bpDia: 56, rr: 24, spo2: 93, tempC: 37.1, context: "Live — 08:20" },
      ],
      options: [
        {
          id: "full-assessment-ivf",
          label: "Focused assessment (trends, abdomen, drains/I&O) + notify provider + prepare bolus per protocol/order set",
          next: "term-success",
        },
        {
          id: "antiemetic-only",
          label: "Administer PRN antiemetic and reassess in 1 hour",
          next: "term-decomp",
          flags: { missedPrioritization: true, delayedEscalation: true },
        },
        {
          id: "visitor-comfort",
          label: "Cluster care for comfort; defer vitals to end of shift",
          next: "term-escalation",
          flags: { missedPrioritization: true },
        },
      ],
    },
    "term-success": {
      type: "terminal",
      id: "term-success",
      outcome: "success",
      title: "Stabilized trajectory",
      message:
        "You treated evolving hypoperfusion as a safety problem: trend-aware assessment, early provider loop, and therapy aligned with orders/protocol.",
      rationale:
        "Rising HR with falling BP and increasing RR on room air is a classic pattern for developing hypovolemia or bleeding until proven otherwise. Antiemetics alone do not address perfusion; clustering without data increases delay-to-recognition risk.",
      catNote: "Computer-adaptive exams may suppress rationales during the item; this simulation surfaces teaching after completion by design.",
    },
    "term-decomp": {
      type: "terminal",
      id: "term-decomp",
      outcome: "decompensation",
      title: "Delayed recognition",
      message:
        "Symptoms worsen while comfort measures run without a perfusion-focused assessment. Rapid response is activated from the floor.",
      rationale:
        "When vitals trend away from baseline in a post-op patient, prioritize objective data, bleeding sources, and fluid responsiveness pathways per facility policy — before deferring to PRN comfort orders.",
      catNote: "CAT items may not show rationales until after the exam block; here you get immediate debrief teaching.",
    },
    "term-escalation": {
      type: "terminal",
      id: "term-escalation",
      outcome: "escalation",
      title: "Unplanned escalation",
      message:
        "Without timely reassessment, the patient becomes dizzy with narrowing pulse pressure. Charge nurse steps in to co-manage.",
      rationale:
        "Clustering care is valuable only after stability is verified. Trending vitals + focused assessment protect against silent deterioration on busy assignments.",
    },
  },
};

const chestPainTriage: ScenarioDefinition = {
  id: "chest-pain-triage",
  title: "Chest pressure in ambulatory setting",
  summary:
    "Differentiate immediate risks in chest discomfort with cardiac risk factors. NP-aligned differential thinking without over-stepping local protocol.",
  difficulty: "ADVANCED",
  pathwayTags: ["NP", "NCLEX_RN"],
  estimatedMinutes: 14,
  tags: ["Cardiovascular", "Triage", "Diagnostics", "Communication"],
  startNodeId: "ctx-triage",
  outlineStepLabels: ["Presentation", "Risk stratification", "Next test", "Disposition"],
  nodes: {
    "ctx-triage": {
      type: "narrative",
      id: "ctx-triage",
      title: "Triage intake",
      body: "52-year-old with substernal pressure x40 minutes, diaphoretic, history HTN + hyperlipidemia. Appears anxious but speaks full sentences.",
      vitals: { hr: 102, bpSys: 156, bpDia: 92, rr: 18, spo2: 96, tempC: 36.9, context: "RA" },
      next: "dec-first",
    },
    "dec-first": {
      type: "decision",
      id: "dec-first",
      title: "First nursing actions",
      stem: "You are initiating the nursing process in a clinic with onsite ECG capability. What is the best immediate pairing?",
      vitalsSequence: [
        { hr: 102, bpSys: 156, bpDia: 92, rr: 18, spo2: 96, tempC: 36.9, context: "RA — intake" },
        { hr: 108, bpSys: 148, bpDia: 88, rr: 20, spo2: 95, tempC: 36.9, context: "RA — +6 min" },
      ],
      options: [
        {
          id: "ecg-aspirin-provider",
          label: "12-lead ECG now + aspirin per protocol + activate provider + continuous monitoring prep",
          next: "term-success-np",
        },
        {
          id: "morphine-first",
          label: "Morphine for comfort first; schedule ECG after lunch volume",
          next: "term-escalation-np",
          flags: { missedPrioritization: true, delayedEscalation: true },
        },
        {
          id: "drive-home",
          label: "Reassure and send home with GI cocktail trial",
          next: "term-decomp-np",
          flags: { missedPrioritization: true },
        },
      ],
    },
    "term-success-np": {
      type: "terminal",
      id: "term-success-np",
      outcome: "success",
      title: "Time-sensitive pathway",
      message:
        "You prioritized rule-out MI workflow: rapid ECG, antiplatelet where appropriate, provider activation, and monitoring — aligned with clinic ACS precautions.",
      rationale:
        "Typical ACS symptoms with risk factors warrant immediate objective ischemia assessment. Analgesia may be adjunctive but must not delay ECG and escalation when red flags exist.",
    },
    "term-escalation-np": {
      type: "terminal",
      id: "term-escalation-np",
      outcome: "escalation",
      title: "Protocol rescue",
      message:
        "A colleague initiates ECG while you stabilize monitoring. The provider arrives to co-sign time-sensitive orders.",
      rationale:
        "Opioids can mask symptoms and delay diagnosis; they are not the first-line answer when ACS is in the differential and ECG capacity is available.",
    },
    "term-decomp-np": {
      type: "terminal",
      id: "term-decomp-np",
      outcome: "decompensation",
      title: "High-risk disposition",
      message:
        "Without immediate ischemia workup, the patient deteriorates in the waiting area. EMS transfer is initiated emergently.",
      rationale:
        "Chest pressure with diaphoresis and risk factors should not be dismissed as benign reflux without appropriate diagnostics and monitoring.",
    },
  },
};

const ALL: ScenarioDefinition[] = [postOpHypovolemia, chestPainTriage];

export function listScenarioDefinitions(): ScenarioDefinition[] {
  return ALL;
}

export function getScenarioById(id: string): ScenarioDefinition | undefined {
  return ALL.find((s) => s.id === id);
}

export function scenariosForExamTarget(target: ExamTargetTag | null): ScenarioDefinition[] {
  if (!target) return ALL;
  return ALL.filter((s) => s.pathwayTags.includes(target));
}
