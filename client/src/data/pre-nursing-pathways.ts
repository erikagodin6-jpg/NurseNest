export type PreNursingPathwayId =
  | "core-foundations"
  | "canada-admissions"
  | "us-admissions"
  | "nursing-school-readiness";

export type PreNursingModuleId =
  | "study-strategies"
  | "terminology"
  | "medical-terminology"
  | "chemistry"
  | "cell-biology"
  | "science-foundations"
  | "microbiology"
  | "anatomy-physiology"
  | "physiology"
  | "pathophysiology"
  | "infection-control"
  | "fluids-electrolytes"
  | "pharmacology"
  | "communication"
  | "ethics-legal"
  | "research-statistics"
  | "health-assessment"
  | "nutrition-foundations"
  | "cultural-competency"
  | "inflammation"
  | "cellular-injury"
  | "oxygenation"
  | "diagnostics"
  | "healthcare-structure"
  | "research-reading"
  | "human-factors"
  | "atp-pathway";

export type PreNursingAssessmentKind =
  | "diagnostic"
  | "module-check"
  | "cumulative"
  | "readiness";

export interface PreNursingQualityFloor {
  minimumLessonsPerModule: number;
  minimumQuestionsPerModule: number;
  minimumInteractiveChecksPerLesson: number;
  minimumCumulativeAssessmentsPerPathway: number;
  requireBeginnerExplanation: boolean;
  requireWorkedExamplesWhereApplicable: boolean;
  requirePerOptionRationales: boolean;
}

export interface PreNursingPathwayPhase {
  id: string;
  title: string;
  purpose: string;
  moduleIds: PreNursingModuleId[];
  exitCompetencies: string[];
  assessmentKinds: PreNursingAssessmentKind[];
}

export interface PreNursingPathway {
  id: PreNursingPathwayId;
  title: string;
  shortTitle: string;
  audience: string;
  promise: string;
  countryScope: "global" | "CA" | "US";
  recommendedWeeks: number;
  phases: PreNursingPathwayPhase[];
  capstone: {
    title: string;
    description: string;
    minimumQuestions: number;
  };
}

/**
 * Authoring floor for the premium Pre-Nursing product.
 *
 * Existing modules may temporarily sit below these numbers while the library is
 * being expanded. New work should move modules toward these floors rather than
 * create small one-off topic fragments.
 */
export const PRE_NURSING_QUALITY_FLOOR: PreNursingQualityFloor = {
  minimumLessonsPerModule: 12,
  minimumQuestionsPerModule: 120,
  minimumInteractiveChecksPerLesson: 3,
  minimumCumulativeAssessmentsPerPathway: 3,
  requireBeginnerExplanation: true,
  requireWorkedExamplesWhereApplicable: true,
  requirePerOptionRationales: true,
};

export const PRE_NURSING_PATHWAYS: PreNursingPathway[] = [
  {
    id: "core-foundations",
    title: "Pre-Nursing Core Foundations",
    shortTitle: "Core Foundations",
    audience:
      "Learners starting from little or no health-science background who want a guided prerequisite-to-nursing foundation.",
    promise:
      "Build the language, science, anatomy, physiology, and disease-process foundations needed to enter nursing coursework with confidence.",
    countryScope: "global",
    recommendedWeeks: 16,
    phases: [
      {
        id: "learn-how-to-learn",
        title: "Start Here: Learn How to Learn Nursing",
        purpose:
          "Establish durable study habits and teach the language used throughout health-science courses before increasing cognitive load.",
        moduleIds: ["study-strategies", "terminology", "medical-terminology"],
        exitCompetencies: [
          "Break unfamiliar medical terms into prefix, root, combining vowel, and suffix components.",
          "Use retrieval practice, spaced repetition, interleaving, and error review intentionally.",
          "Translate common clinical language into plain language without losing meaning.",
        ],
        assessmentKinds: ["diagnostic", "module-check"],
      },
      {
        id: "science-language",
        title: "Science Language for Nursing",
        purpose:
          "Teach chemistry, cell biology, energy, transport, genetics, and homeostasis as connected ideas rather than isolated prerequisite facts.",
        moduleIds: [
          "science-foundations",
          "chemistry",
          "cell-biology",
          "atp-pathway",
          "physiology",
        ],
        exitCompetencies: [
          "Explain diffusion, osmosis, filtration, and active transport using clinical examples.",
          "Relate acids, bases, electrolytes, and concentration gradients to normal physiology.",
          "Explain ATP production and why oxygen and perfusion matter to cellular function.",
          "Connect homeostatic feedback loops to vital signs and common physiologic disturbances.",
        ],
        assessmentKinds: ["module-check", "cumulative"],
      },
      {
        id: "body-systems",
        title: "Anatomy & Physiology by Body System",
        purpose:
          "Build a system-by-system mental model of normal structure and function before introducing abnormal physiology.",
        moduleIds: ["anatomy-physiology", "oxygenation", "fluids-electrolytes", "nutrition-foundations"],
        exitCompetencies: [
          "Trace blood flow, ventilation, gas exchange, filtration, digestion, and neurologic signalling at a beginner level.",
          "Identify major organs, landmarks, planes, and directional terms.",
          "Explain how organ systems cooperate to maintain oxygenation, perfusion, fluid balance, and nutrition.",
        ],
        assessmentKinds: ["module-check", "cumulative"],
      },
      {
        id: "disease-bridge",
        title: "Bridge from Normal Physiology to Disease",
        purpose:
          "Introduce cellular injury, inflammation, infection, and common pathophysiologic patterns without assuming prior nursing knowledge.",
        moduleIds: [
          "cellular-injury",
          "inflammation",
          "microbiology",
          "infection-control",
          "pathophysiology",
        ],
        exitCompetencies: [
          "Differentiate infection, inflammation, tissue injury, hypoxia, ischemia, and necrosis.",
          "Explain how common disease processes disrupt normal physiology.",
          "Recognize basic transmission routes and the rationale for standard infection-prevention practices.",
        ],
        assessmentKinds: ["module-check", "cumulative"],
      },
    ],
    capstone: {
      title: "Core Foundations Readiness Exam",
      description:
        "A cumulative beginner-to-moderate assessment covering terminology, science, anatomy, physiology, microbiology, and introductory pathophysiology.",
      minimumQuestions: 150,
    },
  },
  {
    id: "canada-admissions",
    title: "Canadian Nursing Admissions Preparation",
    shortTitle: "Canada Admissions",
    audience:
      "Applicants to Canadian practical-nursing, BScN, bridging, or other nursing programs who need prerequisite review and school-specific admissions preparation.",
    promise:
      "Strengthen prerequisite science, quantitative reasoning, reading, communication, and situational-judgment foundations while keeping school-specific requirements explicit.",
    countryScope: "CA",
    recommendedWeeks: 12,
    phases: [
      {
        id: "ca-prerequisite-refresh",
        title: "Prerequisite Science Refresh",
        purpose:
          "Rebuild the science most likely to be assumed by nursing programs before moving into admissions-style application questions.",
        moduleIds: [
          "science-foundations",
          "chemistry",
          "cell-biology",
          "anatomy-physiology",
          "physiology",
          "microbiology",
        ],
        exitCompetencies: [
          "Solve prerequisite-level biology and chemistry questions without relying on memorized nursing shortcuts.",
          "Interpret basic graphs, tables, ratios, units, and physiologic relationships.",
          "Explain core body-system function in clear language.",
        ],
        assessmentKinds: ["diagnostic", "module-check", "cumulative"],
      },
      {
        id: "ca-professional-readiness",
        title: "Communication & Professional Readiness",
        purpose:
          "Prepare learners for interviews, written responses, and situational-judgment tasks without implying that one admissions process applies to every Canadian school.",
        moduleIds: [
          "communication",
          "cultural-competency",
          "ethics-legal",
          "human-factors",
          "healthcare-structure",
        ],
        exitCompetencies: [
          "Identify respectful, patient-centred communication choices.",
          "Explain confidentiality, consent, boundaries, equity, and accountability at an introductory level.",
          "Respond to situational prompts using safety, professionalism, empathy, and escalation principles.",
        ],
        assessmentKinds: ["module-check", "readiness"],
      },
      {
        id: "ca-evidence-literacy",
        title: "Reading, Evidence & Quantitative Literacy",
        purpose:
          "Build the comprehension and numerical reasoning needed for prerequisite courses and school-specific screening assessments.",
        moduleIds: ["research-reading", "research-statistics", "study-strategies"],
        exitCompetencies: [
          "Identify claims, evidence, bias, variables, and basic study-design features.",
          "Interpret percentages, proportions, simple probability, tables, and graphs.",
          "Summarize a health-science passage accurately and distinguish inference from stated fact.",
        ],
        assessmentKinds: ["module-check", "cumulative", "readiness"],
      },
    ],
    capstone: {
      title: "Canadian Admissions Readiness Set",
      description:
        "A mixed prerequisite and professional-readiness assessment designed to be paired with the applicant's actual school requirements rather than presented as a national admissions exam.",
      minimumQuestions: 160,
    },
  },
  {
    id: "us-admissions",
    title: "U.S. Nursing Admissions Preparation",
    shortTitle: "U.S. Admissions",
    audience:
      "Applicants to U.S. ADN, BSN, PN/LVN, and bridge programs preparing for prerequisite testing or common nursing-school entrance assessments.",
    promise:
      "Build the reading, math, science, English-language, and health-science foundations commonly tested before nursing-school entry.",
    countryScope: "US",
    recommendedWeeks: 12,
    phases: [
      {
        id: "us-science",
        title: "Admissions Science",
        purpose:
          "Develop test-ready mastery of anatomy, physiology, biology, chemistry, and scientific reasoning while preserving conceptual understanding.",
        moduleIds: [
          "science-foundations",
          "chemistry",
          "cell-biology",
          "anatomy-physiology",
          "physiology",
          "microbiology",
        ],
        exitCompetencies: [
          "Answer integrated anatomy and physiology questions from first principles.",
          "Apply basic chemistry, genetics, cell biology, and microbiology concepts.",
          "Interpret scientific scenarios, tables, and simple experimental results.",
        ],
        assessmentKinds: ["diagnostic", "module-check", "cumulative"],
      },
      {
        id: "us-reading-language",
        title: "Reading & Language for Health Sciences",
        purpose:
          "Strengthen comprehension, vocabulary, sentence meaning, and evidence interpretation using health-science material.",
        moduleIds: ["terminology", "medical-terminology", "research-reading", "communication"],
        exitCompetencies: [
          "Identify main ideas, supporting details, purpose, tone, and logical inference.",
          "Use context and word structure to interpret unfamiliar health-science vocabulary.",
          "Distinguish relevant from irrelevant information in a short passage or scenario.",
        ],
        assessmentKinds: ["module-check", "cumulative"],
      },
      {
        id: "us-quantitative",
        title: "Quantitative & Medication-Math Readiness",
        purpose:
          "Bridge general arithmetic into the ratios, conversions, units, and proportional reasoning learners will later use in nursing calculations.",
        moduleIds: ["fluids-electrolytes", "research-statistics", "pharmacology"],
        exitCompetencies: [
          "Work accurately with fractions, decimals, percentages, ratios, proportions, and unit conversions.",
          "Set up dimensional-analysis style problems before formal dosage-calculation instruction.",
          "Check answers for magnitude, units, and plausibility.",
        ],
        assessmentKinds: ["module-check", "readiness"],
      },
    ],
    capstone: {
      title: "U.S. Admissions Readiness Set",
      description:
        "A mixed reading, quantitative, science, and language assessment that can support common entrance-exam preparation while remaining adaptable to the learner's school's required test.",
      minimumQuestions: 170,
    },
  },
  {
    id: "nursing-school-readiness",
    title: "Nursing-School Readiness Bridge",
    shortTitle: "School Readiness",
    audience:
      "Accepted students and first-semester learners who want to enter nursing school already comfortable with clinical language, basic assessment, safety, and medication concepts.",
    promise:
      "Bridge prerequisite knowledge into the way nursing courses organize information: assessment, safety, communication, medication thinking, and early clinical judgment.",
    countryScope: "global",
    recommendedWeeks: 10,
    phases: [
      {
        id: "clinical-language",
        title: "Clinical Language & Healthcare Context",
        purpose:
          "Make charts, orders, handoffs, healthcare roles, and basic clinical vocabulary less cognitively expensive before formal nursing courses begin.",
        moduleIds: [
          "medical-terminology",
          "healthcare-structure",
          "communication",
          "cultural-competency",
          "ethics-legal",
        ],
        exitCompetencies: [
          "Read a simple patient scenario without being derailed by basic terminology.",
          "Differentiate introductory concepts of consent, confidentiality, scope, accountability, and teamwork.",
          "Use structured communication and recognize when information is incomplete or unsafe.",
        ],
        assessmentKinds: ["diagnostic", "module-check"],
      },
      {
        id: "assessment-safety",
        title: "Assessment, Safety & Human Factors",
        purpose:
          "Introduce observation, vital-sign thinking, infection prevention, human factors, and early escalation concepts without teaching beyond pre-nursing scope.",
        moduleIds: [
          "health-assessment",
          "infection-control",
          "human-factors",
          "diagnostics",
          "oxygenation",
          "fluids-electrolytes",
        ],
        exitCompetencies: [
          "Describe what basic vital signs and common observations represent physiologically.",
          "Recognize obvious safety threats and explain why reassessment or escalation may be needed.",
          "Separate data collection from diagnosis and independent nursing decision-making.",
        ],
        assessmentKinds: ["module-check", "cumulative"],
      },
      {
        id: "medication-thinking",
        title: "Medication Thinking Before Pharmacology",
        purpose:
          "Build a mental model for medications, routes, effects, adverse effects, timing, and safety before learners face dense drug-class memorization.",
        moduleIds: ["pharmacology", "physiology", "pathophysiology", "nutrition-foundations"],
        exitCompetencies: [
          "Differentiate indication, mechanism, therapeutic effect, side effect, adverse effect, contraindication, and interaction.",
          "Explain why route, organ function, timing, and monitoring affect medication safety.",
          "Use physiology to reason about medication effects instead of memorizing isolated lists.",
        ],
        assessmentKinds: ["module-check", "cumulative", "readiness"],
      },
    ],
    capstone: {
      title: "First-Semester Nursing Readiness Exam",
      description:
        "A cumulative pre-course assessment of clinical language, safety, assessment foundations, medication thinking, and applied prerequisite science.",
      minimumQuestions: 150,
    },
  },
];

export const PRE_NURSING_MODULE_IDS = Array.from(
  new Set(PRE_NURSING_PATHWAYS.flatMap((pathway) => pathway.phases.flatMap((phase) => phase.moduleIds))),
);

export function getPreNursingPathway(id: string | undefined): PreNursingPathway {
  return (
    PRE_NURSING_PATHWAYS.find((pathway) => pathway.id === id) ??
    PRE_NURSING_PATHWAYS[0]
  );
}

export function getPreNursingPathwayContentTargets(pathway: PreNursingPathway) {
  const uniqueModules = new Set(pathway.phases.flatMap((phase) => phase.moduleIds));
  return {
    modules: uniqueModules.size,
    minimumLessons: uniqueModules.size * PRE_NURSING_QUALITY_FLOOR.minimumLessonsPerModule,
    minimumQuestions: uniqueModules.size * PRE_NURSING_QUALITY_FLOOR.minimumQuestionsPerModule,
    minimumCumulativeAssessments:
      PRE_NURSING_QUALITY_FLOOR.minimumCumulativeAssessmentsPerPathway,
    capstoneQuestions: pathway.capstone.minimumQuestions,
  };
}
