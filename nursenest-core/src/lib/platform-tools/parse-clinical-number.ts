/** Shared parsing for calculator inputs — returns undefined if invalid or empty. */

export function parsePositiveNumber(raw: string): number | undefined {
  const t = raw.trim();
  if (t === "") return undefined;
  const n = Number.parseFloat(t.replace(",", "."));
  if (!Number.isFinite(n) || n <= 0) return undefined;
  return n;
}

export function parseNonNegativeNumber(raw: string): number | undefined {
  const t = raw.trim();
  if (t === "") return undefined;
  const n = Number.parseFloat(t.replace(",", "."));
  if (!Number.isFinite(n) || n < 0) return undefined;
  return n;
}

export function parseAnyNumber(raw: string): number | undefined {
  const t = raw.trim();
  if (t === "") return undefined;
  const n = Number.parseFloat(t.replace(",", "."));
  if (!Number.isFinite(n)) return undefined;
  return n;
}
