/**
 * One-off: set Prisma User.role = ADMIN for a user matched by email.
 *
 * Usage (production):
 *   DATABASE_URL="postgresql://..." npx tsx scripts/grant-admin-by-email.ts user@example.com
 * Or:
 *   GRANT_ADMIN_EMAIL=user@example.com npx tsx scripts/grant-admin-by-email.ts
 *
 * Does not print passwords or tokens. Minimal output (user id + confirmation).
 */
import { config } from "dotenv";
import { UserRole } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

config({ path: ".env.local" });
config({ path: ".env" });

const prisma = new PrismaClient();

async function main() {
  const raw = process.argv[2] ?? process.env.GRANT_ADMIN_EMAIL ?? "";
  const email = String(raw).trim().toLowerCase();
  if (!email || !email.includes("@")) {
    console.error("Usage: npx tsx scripts/grant-admin-by-email.ts <email>");
    process.exit(1);
  }

  const existing = await prisma.user.findUnique({
    where: { email },
    select: { id: true, role: true },
  });

  if (!existing) {
    console.error("No user found for that email.");
    process.exit(2);
  }

  if (existing.role === UserRole.ADMIN) {
    console.log(`OK: user already role ADMIN (id=${existing.id}).`);
    return;
  }

  await prisma.user.update({
    where: { id: existing.id },
    data: { role: UserRole.ADMIN },
  });

  console.log(`OK: role set to ADMIN (id=${existing.id}). Sign in again if the session still shows LEARNER.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
