export type QuestionType = "mcq" | "sata" | "ordered" | "fill-in-blank" | "hot-spot" | "bowtie";

export interface ExamQuestion {
  q: string;
  o: string[];
  a: number;
  ca?: number[];
  co?: number[];
  cv?: string;
  hc?: string;
  ht?: string;
  r: string;
  t?: QuestionType;
  s: string;
  dr?: string[];
  image?: string;
}

export interface BowtieQuestion {
  id: string;
  scenario: string;
  centerOptions: string[];
  centerCorrect: number;
  leftFindings: string[];
  leftCorrect: number[];
  leftSelectCount: number;
  rightActions: string[];
  rightCorrect: number[];
  rightSelectCount: number;
  rationale: {
    condition: string;
    findings: string;
    actions: string;
  };
  bodySystem: string;
  tier: string;
}

export type Difficulty = 1 | 2 | 3;
export type BloomLevel = "recall" | "understanding" | "application" | "analysis";
export type BankCourse = "anatomy" | "pre-nursing" | "bls" | "pals" | "acls" | "nrp" | "tncc" | "enpc" | "rn";

export interface BankQuestion {
  id: string;
  course: BankCourse;
  topic: string;
  subtopic: string;
  stem: string;
  options: string[];
  correctAnswer?: number;
  correctAnswers?: number[];
  correctOrder?: number[];
  type: QuestionType;
  rationaleCorrect: string;
  rationaleIncorrect: string[];
  difficulty: Difficulty;
  bloomLevel: BloomLevel;
  clinicalCorrelation: string;
  references: string[];
  tags: string[];
  estimatedTimeSeconds: number;
}

export interface ExamForm {
  examId: string;
  title: string;
  course: BankCourse;
  timeLimitMinutes: number;
  passMark: number;
  blueprintSummary: Record<string, number>;
  sections: { topic: string; n: number }[];
  questionIds: string[];
}
