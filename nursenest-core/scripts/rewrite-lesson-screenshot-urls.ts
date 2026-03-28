/**
 * One-off: replace stale www.nursenest.ca/screenshots/ URLs in Lesson.body with Spaces CDN.
 * Run: `npx tsx scripts/rewrite-lesson-screenshot-urls.ts`
 * Env: DATABASE_URL, optional NEXT_PUBLIC_MARKETING_CDN_BASE (default: nursenest-images Spaces).
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadEnv } from "dotenv";
import { PrismaClient } from "@prisma/client";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
loadEnv({ path: path.join(__dirname, "../.env") });
loadEnv({ path: path.join(__dirname, "../../.env") });

const MARKETING_CDN_BASE =
  process.env.NEXT_PUBLIC_MARKETING_CDN_BASE?.replace(/\/$/, "") ?? "https://nursenest-images.tor1.digitaloceanspaces.com";
const NEW_PREFIX = `${MARKETING_CDN_BASE}/screenshots/`;

const prisma = new PrismaClient();

async function main() {
  const rows = await prisma.lesson.findMany({
    where: { body: { contains: "www.nursenest.ca/screenshots" } },
    select: { id: true, slug: true, body: true },
  });
  let updated = 0;
  for (const row of rows) {
    if (!row.body.includes("nursenest.ca/screenshots")) continue;
    const next = row.body.replace(/https:\/\/www\.nursenest\.ca\/screenshots\//gi, NEW_PREFIX);
    if (next === row.body) continue;
    await prisma.lesson.update({ where: { id: row.id }, data: { body: next } });
    updated += 1;
  }
  console.log(JSON.stringify({ scanned: rows.length, updated, newPrefix: NEW_PREFIX }, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
