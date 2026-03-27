import { auth } from "@/lib/auth";
import { resolveEntitlement } from "@/lib/entitlements/resolve-entitlement";

export default async function DashboardPage() {
  const session = await auth();
  const entitlement = await resolveEntitlement((session?.user as any)?.id || "");

  return (
    <main className="space-y-5">
      <h1 className="text-3xl font-bold">Learner dashboard</h1>
      <section className="nn-card p-6">
        <h2 className="text-xl font-semibold">Access Status</h2>
        <p className="mt-2 text-sm text-muted">Server-side entitlement check:</p>
        <p className="mt-2">
          {entitlement.hasAccess ? "Active access" : "No active access"} ({entitlement.reason})
        </p>
      </section>
    </main>
  );
}
