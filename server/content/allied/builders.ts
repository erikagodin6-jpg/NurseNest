import type {
  AlliedAuthoredTopic,
  AlliedLessonMode,
  AuthoredAlliedLesson,
  AuthoredAlliedQuestion,
} from "./types";

const LESSON_MODES: AlliedLessonMode[] = [
  "foundation",
  "workflow",
  "interpretation",
  "safety",
  "case-application",
];

const CONTEXTS = [
  "during an initial encounter",
  "while preparing for a procedure or intervention",
  "when a result or response does not match expectations",
  "during handoff to the next team member",
  "when time pressure is high",
  "after an unexpected finding",
  "while reassessing after an intervention",
  "when deciding whether escalation is required",
  "while checking for a preventable source of error",
  "when choosing the next best step among several plausible actions",
] as const;

function modeTitle(topic: AlliedAuthoredTopic, mode: AlliedLessonMode): string {
  const suffix: Record<AlliedLessonMode, string> = {
    foundation: "Foundations and Core Principles",
    workflow: "Assessment and Workflow",
    interpretation: "Interpretation and Clinical Correlation",
    safety: "Safety, Errors, and Escalation",
    "case-application": "Case Application and Exam Reasoning",
  };
  return `${topic.topic}: ${suffix[mode]}`;
}

function sectionsFor(topic: AlliedAuthoredTopic, mode: AlliedLessonMode) {
  const shared = [
    { sectionTitle: "Bottom Line", content: topic.bottomLine },
    { sectionTitle: "Core Concept", content: topic.coreConcept },
  ];

  if (mode === "foundation") {
    return [
      ...shared,
      { sectionTitle: "Recognition Cues", content: topic.recognition },
      { sectionTitle: "How the Work Fits Together", content: topic.workflow },
      { sectionTitle: "What the Findings Mean", content: topic.interpretation },
      { sectionTitle: "Exam Focus", content: topic.examFocus },
      { sectionTitle: "Rapid Review", content: `${topic.bottomLine} ${topic.examFocus}` },
    ];
  }

  if (mode === "workflow") {
    return [
      ...shared,
      { sectionTitle: "Before You Start", content: topic.recognition },
      { sectionTitle: "Stepwise Workflow", content: topic.workflow },
      { sectionTitle: "Checkpoints That Change the Plan", content: topic.interpretation },
      { sectionTitle: "Do Not Proceed When", content: topic.redFlags },
      { sectionTitle: "Common Workflow Errors", content: topic.commonErrors },
      { sectionTitle: "Exam Focus", content: topic.examFocus },
    ];
  }

  if (mode === "interpretation") {
    return [
      ...shared,
      { sectionTitle: "Pattern Recognition", content: topic.recognition },
      { sectionTitle: "Interpretation Framework", content: topic.interpretation },
      { sectionTitle: "What to Verify Next", content: topic.workflow },
      { sectionTitle: "Discordant or Dangerous Findings", content: topic.redFlags },
      { sectionTitle: "Interpretation Traps", content: topic.commonErrors },
      { sectionTitle: "Exam Focus", content: topic.examFocus },
    ];
  }

  if (mode === "safety") {
    return [
      ...shared,
      { sectionTitle: "Safety-Critical Actions", content: topic.safety },
      { sectionTitle: "Red Flags", content: topic.redFlags },
      { sectionTitle: "Preventable Errors", content: topic.commonErrors },
      { sectionTitle: "Safe Escalation", content: `${topic.workflow} ${topic.safety}` },
      { sectionTitle: "How to Reassess", content: topic.interpretation },
      { sectionTitle: "Exam Focus", content: topic.examFocus },
    ];
  }

  return [
    ...shared,
    {
      sectionTitle: "Case Setup",
      content: `A learner is given a realistic ${topic.careerType} case in ${topic.topic}. The decisive cues are: ${topic.recognition}`,
    },
    { sectionTitle: "Reason Through the Next Step", content: topic.workflow },
    { sectionTitle: "Interpret the Response", content: topic.interpretation },
    { sectionTitle: "Safety Override", content: `${topic.safety} ${topic.redFlags}` },
    { sectionTitle: "Why Plausible Answers Fail", content: topic.commonErrors },
    { sectionTitle: "Exam Takeaway", content: topic.examFocus },
  ];
}

export function materializeAlliedLessons(topics: AlliedAuthoredTopic[]): AuthoredAlliedLesson[] {
  return topics.flatMap((topic) =>
    LESSON_MODES.map((mode, index) => ({
      id: `allied-${topic.id}-${mode}`,
      slug: `${topic.id}-${mode}`,
      careerType: topic.careerType,
      examTag: topic.examTag,
      regionScope: topic.regionScope,
      category: topic.category,
      topic: topic.topic,
      mode,
      title: modeTitle(topic, mode),
      summary: `${topic.bottomLine} This lesson develops the ${mode.replace("-", " ")} layer of the topic for ${topic.examTag}.`,
      objectives: [
        `Explain the core concept of ${topic.topic}`,
        `Recognize the cues that change decisions in ${topic.topic}`,
        `Apply a safe ${topic.careerType} workflow`,
        `Interpret findings without falling for common exam traps`,
      ],
      estimatedMinutes: 14 + index * 2,
      difficulty: (index < 2 ? 2 : index < 4 ? 3 : 4) as 2 | 3 | 4,
      sections: sectionsFor(topic, mode),
      glossary: topic.glossary,
      status: "published" as const,
    })),
  );
}

type Dimension =
  | "bottomLine"
  | "coreConcept"
  | "recognition"
  | "workflow"
  | "interpretation"
  | "safety"
  | "redFlags"
  | "commonErrors"
  | "examFocus"
  | "glossary";

type DimensionConfig = {
  key: Dimension;
  label: string;
  cognitive: "understanding" | "application" | "analysis";
};

const DIMENSIONS: DimensionConfig[] = [
  { key: "bottomLine", label: "central practice principle", cognitive: "understanding" },
  { key: "coreConcept", label: "mechanism or core concept", cognitive: "understanding" },
  { key: "recognition", label: "recognition pattern", cognitive: "analysis" },
  { key: "workflow", label: "best next workflow sequence", cognitive: "application" },
  { key: "interpretation", label: "best interpretation", cognitive: "analysis" },
  { key: "safety", label: "safest priority action", cognitive: "application" },
  { key: "redFlags", label: "finding that most clearly warrants escalation", cognitive: "analysis" },
  { key: "commonErrors", label: "preventable error or exam trap", cognitive: "analysis" },
  { key: "examFocus", label: "exam-relevant decision rule", cognitive: "application" },
  { key: "glossary", label: "most accurate terminology statement", cognitive: "understanding" },
];

function glossaryStatement(topic: AlliedAuthoredTopic): string {
  return topic.glossary
    .map(({ term, definition }) => `${term}: ${definition}`)
    .join(" ");
}

function keyedStatements(topic: AlliedAuthoredTopic): Record<Dimension, string> {
  return {
    bottomLine: topic.bottomLine,
    coreConcept: topic.coreConcept,
    recognition: topic.recognition,
    workflow: topic.workflow,
    interpretation: topic.interpretation,
    safety: topic.safety,
    redFlags: topic.redFlags,
    commonErrors: topic.commonErrors,
    examFocus: topic.examFocus,
    glossary: glossaryStatement(topic),
  };
}

function answerPool(topic: AlliedAuthoredTopic, key: Dimension): string[] {
  const keyed = keyedStatements(topic);
  const distractorPriority: Record<Dimension, Dimension[]> = {
    bottomLine: ["coreConcept", "workflow", "examFocus", "recognition"],
    coreConcept: ["interpretation", "bottomLine", "workflow", "commonErrors"],
    recognition: ["redFlags", "interpretation", "commonErrors", "safety"],
    workflow: ["safety", "examFocus", "recognition", "interpretation"],
    interpretation: ["coreConcept", "recognition", "workflow", "commonErrors"],
    safety: ["workflow", "redFlags", "commonErrors", "examFocus"],
    redFlags: ["recognition", "safety", "commonErrors", "interpretation"],
    commonErrors: ["workflow", "safety", "examFocus", "coreConcept"],
    examFocus: ["bottomLine", "workflow", "commonErrors", "interpretation"],
    glossary: ["coreConcept", "recognition", "examFocus", "bottomLine"],
  };
  const candidates = distractorPriority[key]
    .map((candidate) => keyed[candidate])
    .filter((value) => value !== keyed[key]);
  const unique = [...new Set(candidates)];
  if (unique.length < 3) {
    for (const value of Object.values(keyed)) {
      if (value !== keyed[key] && !unique.includes(value)) unique.push(value);
      if (unique.length === 3) break;
    }
  }
  return [keyed[key], ...unique.slice(0, 3)];
}

function rotate<T>(items: T[], offset: number): T[] {
  const n = offset % items.length;
  return items.slice(n).concat(items.slice(0, n));
}

function stemFor(topic: AlliedAuthoredTopic, dimension: DimensionConfig, context: string): string {
  const preface: Record<Dimension, string> = {
    bottomLine: "The learner must identify the principle that should anchor the entire decision.",
    coreConcept: "The learner is asked to explain why the observed pattern or intervention behaves as it does.",
    recognition: "Several findings are present, but only one statement captures the pattern that should drive recognition.",
    workflow: "The immediate issue is stable enough for an ordered next-step decision rather than a blind emergency action.",
    interpretation: "The available data could be misread if the learner focuses on one value or observation in isolation.",
    safety: "The case contains competing priorities and the learner must protect the patient, client, specimen, record, or procedure first.",
    redFlags: "The learner must decide which feature changes the situation from routine management to escalation.",
    commonErrors: "A colleague proposes several shortcuts; the learner must recognize the choice most likely to create a preventable error.",
    examFocus: "The scenario is written in the style of the relevant certification examination and asks for the decision rule that best separates plausible answers.",
    glossary: "The learner needs to use discipline-specific terminology accurately before applying it to the case.",
  };
  return `A ${topic.careerType} learner is working ${context} on a case involving ${topic.topic}. ${preface[dimension.key]} Which option best represents the ${dimension.label}?`;
}

export function materializeAlliedQuestions(topics: AlliedAuthoredTopic[]): AuthoredAlliedQuestion[] {
  const questions: AuthoredAlliedQuestion[] = [];

  for (const topic of topics) {
    for (let dimensionIndex = 0; dimensionIndex < DIMENSIONS.length; dimensionIndex++) {
      const dimension = DIMENSIONS[dimensionIndex];
      const canonical = answerPool(topic, dimension.key);

      for (let contextIndex = 0; contextIndex < CONTEXTS.length; contextIndex++) {
        const context = CONTEXTS[contextIndex];
        const rotated = rotate(canonical, (contextIndex + dimensionIndex) % canonical.length);
        const correctIndex = rotated.indexOf(canonical[0]);
        const id = `allied-q-${topic.id}-${dimension.key}-${String(contextIndex + 1).padStart(2, "0")}`;
        const stem = stemFor(topic, dimension, context);
        const distractorRationales: Record<string, string> = {};

        rotated.forEach((_option, optionIndex) => {
          if (optionIndex !== correctIndex) {
            distractorRationales[String(optionIndex)] = `This option contains information relevant to ${topic.topic}, but it answers a different decision layer than the requested ${dimension.label}. On ${topic.examTag}, a plausible related fact is still incorrect when it fails to resolve the exact priority, mechanism, pattern, or safety question being asked.`;
          }
        });

        questions.push({
          id,
          careerType: topic.careerType,
          examTag: topic.examTag,
          regionScope: topic.regionScope,
          category: topic.category,
          topic: topic.topic,
          stem,
          options: rotated,
          correctIndex,
          rationale: `${canonical[0]} This is the best answer because it directly resolves the requested ${dimension.label} in ${topic.topic}. The item deliberately includes adjacent truths as distractors, so the learner must distinguish the exact decision target rather than select a statement merely because it is clinically or professionally related. ${topic.examFocus}`,
          correctAnswerExplanation: `The keyed option directly addresses the ${dimension.label} for ${topic.topic}: ${canonical[0]}`,
          distractorRationales,
          clinicalPearl: `${topic.bottomLine} ${topic.safety}`,
          difficulty: dimension.cognitive === "understanding" ? 2 : dimension.cognitive === "application" ? 3 : 4,
          cognitiveLevel: dimension.cognitive,
          tags: [topic.careerType, topic.category, topic.topic, topic.examTag, dimension.key],
        });
      }
    }
  }

  return questions;
}
