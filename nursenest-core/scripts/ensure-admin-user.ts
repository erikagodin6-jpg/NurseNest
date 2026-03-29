/**
 * Idempotent: upserts by email (single row). bcrypt cost 12 — same as signup / Credentials auth.
 * Uses DATABASE_URL from the environment (same as Prisma CLI / Next.js `prisma` client).
 *
 * Update path: passwordHash, role ADMIN, optional username; does not change country/tier/subscription fields.
 * Create path: sets defaults for country/tier only for new rows.
 *
 *   BOOTSTRAP_ADMIN_EMAIL=you@example.com BOOTSTRAP_ADMIN_PASSWORD='…' BOOTSTRAP_ADMIN_USERNAME=handle npx tsx scripts/ensure-admin-user.ts
 */
import { hash } from "bcryptjs";
import { PrismaClient, type CountryCode, type Prisma, type TierCode } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.BOOTSTRAP_ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.BOOTSTRAP_ADMIN_PASSWORD ?? "";
  const nameFromEnv = process.env.BOOTSTRAP_ADMIN_NAME?.trim();
  const country = (process.env.BOOTSTRAP_ADMIN_COUNTRY as CountryCode) || "US";
  const tier = (process.env.BOOTSTRAP_ADMIN_TIER as TierCode) || "RN";
  const usernameRaw = process.env.BOOTSTRAP_ADMIN_USERNAME?.trim();
  const username = usernameRaw ? usernameRaw.toLowerCase() : null;

  if (!email || !email.includes("@")) {
    console.error("Set BOOTSTRAP_ADMIN_EMAIL to a valid email.");
    process.exit(1);
  }
  if (password.length < 8) {
    console.error("Set BOOTSTRAP_ADMIN_PASSWORD (min 8 characters).");
    process.exit(1);
  }

  if (username) {
    const holder = await prisma.user.findUnique({ where: { username }, select: { id: true, email: true } });
    if (holder && holder.email !== email) {
      console.error(`Username "${username}" is already taken by another account (${holder.email}).`);
      process.exit(1);
    }
  }

  const passwordHash = await hash(password, 12);

  const existing = await prisma.user.findUnique({ where: { email }, select: { id: true } });

  const updateData: Prisma.UserUpdateInput = {
    passwordHash,
    role: "ADMIN",
  };
  if (username !== null) {
    updateData.username = username;
  }
  if (nameFromEnv) {
    updateData.name = nameFromEnv;
  }

  const createData = {
    email,
    name: nameFromEnv || "Admin",
    passwordHash,
    role: "ADMIN" as const,
    country,
    tier,
    username: username ?? undefined,
  };

  const user = existing
    ? await prisma.user.update({
        where: { email },
        data: updateData,
      })
    : await prisma.user.create({ data: createData });

  console.log("Admin user ready:", user.email, "username=", user.username ?? "(none)", "role=", user.role);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
