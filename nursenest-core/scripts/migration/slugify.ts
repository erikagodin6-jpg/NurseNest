export function slugifyCategory(name: string): string {
  const s = name
    .trim()
    .toLowerCase()
    .replace(/[''`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return s || "uncategorized";
}

export function safeLessonSlug(id: string): string {
  const s = id
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return s.slice(0, 180) || "lesson";
}
