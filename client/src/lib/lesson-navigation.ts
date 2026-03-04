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

type TierSystems = typeof rpnSystems;

const tierSystemGroups: { tier: string; systems: TierSystems }[] = [
  { tier: "free", systems: [...preNursingSystems, ...fundamentalsSystems, ...delegationSystems, ...clinicalScenariosSystems, ...medMathSystems] as TierSystems },
  { tier: "rpn", systems: rpnSystems },
  { tier: "rn", systems: rnSystems },
  { tier: "np", systems: npSystems },
];

let navMap: Map<string, LessonNavResult> | null = null;
let tierMap: Map<string, string> | null = null;

function flattenSystems(systems: TierSystems): { id: string; name: string; systemTitle: string; systemId: string }[] {
  const flat: { id: string; name: string; systemTitle: string; systemId: string }[] = [];
  for (const system of systems) {
    for (const lesson of system.diseases) {
      flat.push({ id: lesson.id, name: lesson.name, systemTitle: system.title, systemId: system.id });
    }
  }
  return flat;
}

function buildMaps(): void {
  if (navMap && tierMap) return;
  navMap = new Map();
  tierMap = new Map();

  for (const group of tierSystemGroups) {
    const allLessons = flattenSystems(group.systems);

    for (let i = 0; i < allLessons.length; i++) {
      const lesson = allLessons[i];
      if (navMap.has(lesson.id)) continue;

      tierMap.set(lesson.id, group.tier);

      const prev = i > 0 ? { id: allLessons[i - 1].id, name: allLessons[i - 1].name } : null;
      const next = i < allLessons.length - 1 ? { id: allLessons[i + 1].id, name: allLessons[i + 1].name } : null;

      navMap.set(lesson.id, {
        prev,
        next,
        systemTitle: lesson.systemTitle,
        systemId: lesson.systemId,
      });
    }
  }
}

export function getLessonNavigation(lessonId: string): LessonNavResult | null {
  buildMaps();
  return navMap!.get(lessonId) || null;
}

export function getLessonTier(lessonId: string): string {
  buildMaps();
  return tierMap!.get(lessonId) || "rpn";
}
