export interface CareerQuestion {
    id: string;
    stem: string;
    options: string[];
    correctIndex: number;
    rationale: string;
    difficulty: number;
    category: string;
    topic: string;
  }

  export const socialWorkerQuestions: CareerQuestion[] = [];
