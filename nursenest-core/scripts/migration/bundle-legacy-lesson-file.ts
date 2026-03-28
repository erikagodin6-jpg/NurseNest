import { build } from "esbuild";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { monorepoRoot } from "./repo-paths";

const tmpDir = () => {
  const d = join(monorepoRoot(), "nursenest-core", ".migration-tmp");
  mkdirSync(d, { recursive: true });
  return d;
};

/**
 * Bundle a legacy lesson TS module (under `client/src/data/lessons`) and return
 * merged `lessonId -> content` maps from all exported `*Lessons` records.
 */
export async function loadLegacyLessonFileDirect(absoluteTsPath: string): Promise<Record<string, Record<string, unknown>>> {
  const root = monorepoRoot();
  const stubPath = join(tmpDir(), "asset-url-stub.mjs");
  writeFileSync(stubPath, `export function getAssetUrl(_f) { return ""; }\n`, "utf8");

  const result = await build({
    absWorkingDir: root,
    entryPoints: [absoluteTsPath],
    bundle: true,
    write: false,
    format: "esm",
    platform: "neutral",
    target: "es2022",
    alias: {
      "@/lib/asset-url": stubPath,
    },
  });

  const out = result.outputFiles?.[0]?.text;
  if (!out) throw new Error("esbuild produced no output");

  const tmpFile = join(tmpDir(), `lesson-bundle-${Date.now()}-${Math.random().toString(36).slice(2)}.mjs`);
  writeFileSync(tmpFile, out, "utf8");
  try {
    const mod = await import(pathToFileURL(tmpFile).href);
    const maps: Record<string, Record<string, unknown>> = {};
    for (const [, exp] of Object.entries(mod)) {
      if (!exp || typeof exp !== "object" || Array.isArray(exp)) continue;
      const o = exp as Record<string, unknown>;
      const firstKey = Object.keys(o)[0];
      if (!firstKey) continue;
      const first = o[firstKey];
      if (first && typeof first === "object" && first !== null && "title" in first) {
        for (const [lessonId, content] of Object.entries(o)) {
          maps[lessonId] = content as Record<string, unknown>;
        }
      }
    }
    return maps;
  } finally {
    try {
      rmSync(tmpFile);
    } catch {
      /* ignore */
    }
  }
}
