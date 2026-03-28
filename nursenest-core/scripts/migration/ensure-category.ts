import type { PrismaClient } from "@prisma/client";
import { slugifyCategory } from "./slugify";

const cache = new Map<string, string>();

export async function ensureCategoryId(prisma: PrismaClient, name: string): Promise<string> {
  const label = name.trim() || "General";
  const slug = slugifyCategory(label);
  const hit = cache.get(slug);
  if (hit) return hit;

  const existing = await prisma.category.findUnique({ where: { slug } });
  if (existing) {
    cache.set(slug, existing.id);
    return existing.id;
  }

  const created = await prisma.category.create({
    data: {
      name: label.slice(0, 200),
      slug: slug.slice(0, 190),
      topicCode: slug.slice(0, 80),
    },
  });
  cache.set(slug, created.id);
  return created.id;
}
