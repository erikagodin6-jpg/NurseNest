import { PrismaClient } from "@prisma/client";
import { assertValidDatabaseUrl } from "@/lib/env/validate-database-url";

assertValidDatabaseUrl();

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

/**
 * Connection pool sizing: prefer `DATABASE_URL` query params, e.g.
 * `postgresql://...?connection_limit=15&pool_timeout=20` (values depend on host + traffic).
 * Prisma does not set a universal default; tune alongside your Postgres max_connections.
 */
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
