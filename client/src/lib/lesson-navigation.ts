import {
  fundamentalsSystems,
  delegationSystems,
  clinicalScenariosSystems,
  medMathSystems,
  preNursingSystems,
  rpnSystems,
  rnSystems,
  npSystems,
} from "@/pages/lessons";

type LessonNavItem = { id: string; name: string };
type LessonNavResult = {
  prev: LessonNavItem | null;
  next: LessonNavItem | null;
  systemTitle: string;
  systemId: string;
};

const allSystems = [
  ...fundamentalsSystems,
  ...delegationSystems,
  ...clinicalScenariosSystems,
  ...medMathSystems,
  ...preNursingSystems,
  ...rpnSystems,
  ...rnSystems,
  ...npSystems,
];

let navMap: Map<string, LessonNavResult> | null = null;

function buildNavMap(): Map<string, LessonNavResult> {
  if (navMap) return navMap;
  navMap = new Map();
  for (const system of allSystems) {
    const lessons = system.diseases;
    for (let i = 0; i < lessons.length; i++) {
      const lesson = lessons[i];
      if (navMap.has(lesson.id)) continue;
      navMap.set(lesson.id, {
        prev: i > 0 ? { id: lessons[i - 1].id, name: lessons[i - 1].name } : null,
        next: i < lessons.length - 1 ? { id: lessons[i + 1].id, name: lessons[i + 1].name } : null,
        systemTitle: system.title,
        systemId: system.id,
      });
    }
  }
  return navMap;
}

export function getLessonNavigation(lessonId: string): LessonNavResult | null {
  const map = buildNavMap();
  return map.get(lessonId) || null;
}
