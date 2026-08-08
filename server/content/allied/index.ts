import { materializeAlliedLessons, materializeAlliedQuestions } from "./builders";
import { normalizeAlliedAuthoredQuestion } from "./question-contract";
import { alliedTopics01 } from "./topics-01-rrt-paramedic";
import { alliedTopics02 } from "./topics-02-mlt-pharmacy";
import { alliedTopics03 } from "./topics-03-imaging-sonography";
import { alliedTopics04 } from "./topics-04-rehab-surgical";
import { alliedTopics05 } from "./topics-05-behavioral-him";
import { alliedTopics06 } from "./topics-06-advanced-supported-careers";

export const alliedAuthoredTopics = [
  ...alliedTopics01,
  ...alliedTopics02,
  ...alliedTopics03,
  ...alliedTopics04,
  ...alliedTopics05,
  ...alliedTopics06,
];

export const alliedAuthoredLessons = materializeAlliedLessons(alliedAuthoredTopics);
export const alliedAuthoredQuestions = materializeAlliedQuestions(alliedAuthoredTopics).map(normalizeAlliedAuthoredQuestion);

export const ALLIED_AUTHORED_TARGETS = Object.freeze({
  minimumTopics: 126,
  lessonsPerTopic: 5,
  minimumLessons: 630,
  questionsPerTopic: 100,
  minimumQuestions: 12_600,
});

function countBy<T>(rows: T[], getKey: (row: T) => string): Map<string, number> {
  const counts = new Map<string, number>();
  for (const row of rows) {
    const key = getKey(row);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

export function assertAlliedAuthoredEstate(): void {
  const target = ALLIED_AUTHORED_TARGETS;
  if (alliedAuthoredTopics.length < target.minimumTopics) {
    throw new Error(`Allied authored topic floor failed: ${alliedAuthoredTopics.length} < ${target.minimumTopics}`);
  }
  if (alliedAuthoredLessons.length < target.minimumLessons) {
    throw new Error(`Allied authored lesson floor failed: ${alliedAuthoredLessons.length} < ${target.minimumLessons}`);
  }
  if (alliedAuthoredQuestions.length < target.minimumQuestions) {
    throw new Error(`Allied authored question floor failed: ${alliedAuthoredQuestions.length} < ${target.minimumQuestions}`);
  }

  const topicIds = new Set<string>();
  for (const topic of alliedAuthoredTopics) {
    if (topicIds.has(topic.id)) throw new Error(`Duplicate Allied topic id: ${topic.id}`);
    topicIds.add(topic.id);
  }

  const lessonsByTopic = countBy(alliedAuthoredLessons, (lesson) => `${lesson.careerType}\u0000${lesson.topic}`);
  const questionsByTopic = countBy(alliedAuthoredQuestions, (question) => `${question.careerType}\u0000${question.topic}`);

  for (const topic of alliedAuthoredTopics) {
    const key = `${topic.careerType}\u0000${topic.topic}`;
    const lessonCount = lessonsByTopic.get(key) ?? 0;
    const questionCount = questionsByTopic.get(key) ?? 0;
    if (lessonCount !== target.lessonsPerTopic) {
      throw new Error(`${topic.id}: expected ${target.lessonsPerTopic} lessons, found ${lessonCount}`);
    }
    if (questionCount !== target.questionsPerTopic) {
      throw new Error(`${topic.id}: expected ${target.questionsPerTopic} questions, found ${questionCount}`);
    }
  }
}

assertAlliedAuthoredEstate();
