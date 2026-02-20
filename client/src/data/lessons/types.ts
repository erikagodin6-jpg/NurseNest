export type QuizQuestion = { question: string; options: string[]; correct: number; rationale: string };

export type LessonContent = {
  title: string;
  cellular: { title: string; content: string };
  riskFactors?: string[];
  diagnostics?: string[];
  management?: string[];
  nursingActions?: string[];
  signs: { left: string[]; right: string[] };
  medications: { name: string; type: string; action: string; sideEffects: string; contra: string; pearl: string }[];
  pearls: string[];
  lifespan?: { title: string; content: string };
  quiz: QuizQuestion[];
  preTest?: QuizQuestion[];
  postTest?: QuizQuestion[];
  image?: string;
};
