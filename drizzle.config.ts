import { execSync } from "child_process";
import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL, ensure the database is provisioned");
}

try {
  execSync("node scripts/pre-migration-fix.cjs", {
    stdio: "inherit",
    env: process.env,
  });
} catch (e) {
  console.error("[drizzle.config] pre-migration fix warning:", (e as Error).message);
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
