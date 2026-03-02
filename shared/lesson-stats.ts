export interface HeroStats {
  rpnLessons: number;
  rnLessons: number;
  npLessons: number;
  freeLessons: number;
  totalLessons: number;
  paidLessons: number;
  questionCount: number;
  storeQuestionCount: number;
  storeProductCount: number;
  lastUpdatedISO: string;
  breakdown?: {
    rpnStatic: number;
    rnStatic: number;
    npStatic: number;
    freeStatic: number;
    rpnDb: number;
    rnDb: number;
    npDb: number;
    freeDb: number;
  };
}
