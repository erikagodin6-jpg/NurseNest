import { defineConfig } from "drizzle-kit";
import { execSync } from "child_process";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL, ensure the database is provisioned");
}

try {
  execSync("node scripts/pre-migration-fix.cjs", {
    stdio: "inherit",
    env: process.env as Record<string, string>,
  });
} catch (e: any) {
  console.error("[drizzle.config] pre-migration fix warning:", e.message);
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
