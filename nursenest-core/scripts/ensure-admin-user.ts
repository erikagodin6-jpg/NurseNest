/**
 * One-off: upsert an ADMIN user (bcrypt password, same cost as signup).
 *
 * Usage (from nursenest-core, with DATABASE_URL set):
 *   BOOTSTRAP_ADMIN_EMAIL=you@example.com BOOTSTRAP_ADMIN_PASSWORD='your-secure-password' npx tsx scripts/ensure-admin-user.ts
 *
 * Do not commit real passwords. Rotate after first login.
 */
import { hash } from "bcryptjs";
import { PrismaClient, type CountryCode, type TierCode } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.BOOTSTRAP_ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.BOOTSTRAP_ADMIN_PASSWORD ?? "";
  const name = process.env.BOOTSTRAP_ADMIN_NAME?.trim() || "Admin";
  const country = (process.env.BOOTSTRAP_ADMIN_COUNTRY as CountryCode) || "US";
  const tier = (process.env.BOOTSTRAP_ADMIN_TIER as TierCode) || "RN";

  if (!email || !email.includes("@")) {
    console.error("Set BOOTSTRAP_ADMIN_EMAIL to a valid email.");
    process.exit(1);
  }
  if (password.length < 8) {
    console.error("Set BOOTSTRAP_ADMIN_PASSWORD (min 8 characters).");
    process.exit(1);
  }

  const passwordHash = await hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      passwordHash,
      role: "ADMIN",
      name,
      country,
      tier,
    },
    create: {
      email,
      name,
      passwordHash,
      role: "ADMIN",
      country,
      tier,
    },
  });

  console.log("Admin user ready:", user.email, "role=", user.role);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
