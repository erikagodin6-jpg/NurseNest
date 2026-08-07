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
  "while preparing for a procedure",
  "during a routine quality check",
  "when a result does not match the clinical picture",
  "during handoff to the next team member",
  "when time pressure is high",
  "after an unexpected finding",
  "while reassessing a patient after an intervention",
  "when deciding whether escalation is required",
  "while reviewing documentation before finalizing the record",
  "during an exam-style case with several plausible choices",
  "when a learner must distinguish a priority from a secondary task",
  "when equipment or process performance is uncertain",
  "while checking for a preventable source of error",
  "when a subtle deterioration cue appears",
  "after receiving a borderline or discordant result",
  "while communicating a safety-critical finding",
  "when choosing the next best step rather than the final diagnosis",
  "when deciding whether the current workflow can safely continue",
  "while comparing a normal pattern with a dangerous exception",
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

type Dimension = "bottomLine" | "recognition" | "workflow" | "interpretation" | "safety";

const DIMENSIONS: Array<{ key: Dimension; label: string; cognitive: "understanding" | "application" | "analysis" }> = [
  { key: "bottomLine", label: "central principle", cognitive: "understanding" },
  { key: "recognition", label: "most important recognition cue", cognitive: "analysis" },
  { key: "workflow", label: "best next workflow step", cognitive: "application" },
  { key: "interpretation", label: "best interpretation", cognitive: "analysis" },
  { key: "safety", label: "safest priority action", cognitive: "application" },
];

function answerPool(topic: AlliedAuthoredTopic, key: Dimension): string[] {
  const keyed: Record<Dimension, string> = {
    bottomLine: topic.bottomLine,
    recognition: topic.recognition,
    workflow: topic.workflow,
    interpretation: topic.interpretation,
    safety: topic.safety,
  };
  const distractorCandidates = [
    topic.commonErrors,
    topic.examFocus,
    topic.redFlags,
    topic.coreConcept,
    ...Object.entries(keyed).filter(([candidate]) => candidate !== key).map(([, value]) => value),
  ];
  const unique = [...new Set(distractorCandidates.filter((value) => value !== keyed[key]))];
  return [keyed[key], ...unique.slice(0, 3)];
}

function rotate<T>(items: T[], offset: number): T[] {
  const n = offset % items.length;
  return items.slice(n).concat(items.slice(0, n));
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
        const stem = `A ${topic.careerType} learner is working ${context} on a case involving ${topic.topic}. Which option best represents the ${dimension.label} for this situation?`;
        const distractorRationales: Record<string, string> = {};

        rotated.forEach((option, optionIndex) => {
          if (optionIndex !== correctIndex) {
            distractorRationales[String(optionIndex)] = `This statement may describe a related part of ${topic.topic}, but it does not answer the question's requested ${dimension.label}. Choosing it would blur the distinction between the immediate decision target and a secondary consideration.`;
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
          rationale: `${canonical[0]} This is the best answer because the item asks specifically for the ${dimension.label}. In ${topic.topic}, the decision must stay anchored to the profession's role, the available cues, and the safety implications. ${topic.examFocus}`,
          correctAnswerExplanation: `The keyed answer directly addresses the ${dimension.label}: ${canonical[0]}`,
          distractorRationales,
          clinicalPearl: `${topic.bottomLine} ${topic.safety}`,
          difficulty: dimension.cognitive === "understanding" ? 2 : dimension.cognitive === "application" ? 3 : 4,
          cognitiveLevel: dimension.cognitive,
          tags: [topic.careerType, topic.category, topic.topic, topic.examTag],
        });
      }
    }
  }

  return questions;
}
