import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/** Monorepo root (parent of `nursenest-core`). */
export function monorepoRoot(): string {
  const here = dirname(fileURLToPath(import.meta.url));
  return resolve(here, "..", "..");
}

export function legacyPaths(root = monorepoRoot()) {
  return {
    root,
    careerQuestionsJsonDir: join(root, "data", "career-questions"),
    careerQuestionsTsDir: join(root, "client", "src", "data", "career-questions"),
    lessonsDir: join(root, "client", "src", "data", "lessons"),
    questionManifest: join(root, "client", "src", "data", "career-questions", "question-manifest.json"),
    serverSeedData: join(root, "server", "seed-data"),
  };
}
