import type { DifficultyBand } from "@prisma/client";

export function numToDifficulty(n?: number): DifficultyBand | undefined {
  if (typeof n !== "number" || Number.isNaN(n)) return undefined;
  if (n <= 2) return "FOUNDATION";
  if (n === 3) return "INTERMEDIATE";
  return "ADVANCED";
}
