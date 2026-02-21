export type QuestionType = "mcq" | "sata" | "ordered" | "fill-in-blank" | "hot-spot";

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
}
