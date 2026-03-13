import { Redirect } from "wouter";

const CLUSTER_CAREER_MAP: Record<string, string> = {
  rrt: "rrt",
  "social-work": "social-worker",
  psychotherapy: "psychotherapist",
  addictions: "addictions-counsellor",
  "occupational-therapy": "occupational-therapy",
  paramedic: "paramedic",
  mlt: "mlt",
  imaging: "imaging",
  "pharmacy-technician": "pharmacy-tech",
};

interface ClusterRedirectProps {
  profession: string;
  clusterType: "lessons" | "practice-questions" | "flashcards" | "mock-exam" | "study-guide";
}

export default function ProfessionClusterRedirect({ profession, clusterType }: ClusterRedirectProps) {
  const careerSlug = CLUSTER_CAREER_MAP[profession] || profession;

  const redirectMap: Record<string, string> = {
    lessons: `/qbank?career=${careerSlug}&view=lessons`,
    "practice-questions": `/qbank?career=${careerSlug}`,
    flashcards: `/careers/${careerSlug}/flashcards`,
    "mock-exam": `/careers/${careerSlug}/mock-exams`,
    "study-guide": `/careers/${careerSlug}/study-plan`,
  };

  const target = redirectMap[clusterType] || `/careers/${careerSlug}`;
  return <Redirect to={target} />;
}
