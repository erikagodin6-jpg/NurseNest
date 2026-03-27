import { auth } from "@/lib/auth";
import { resolveEntitlementForPage } from "@/lib/entitlements/resolve-entitlement-for-page";

export default async function DashboardPage() {
  const session = await auth();
  const userId = (session?.user as { id?: string })?.id ?? "";
  const entitlement = await resolveEntitlementForPage(userId);

  if (entitlement === "error") {
    return (
      <main className="space-y-5">
        <h1 className="text-3xl font-bold">Learner dashboard</h1>
        <section className="nn-card p-6">
          <h2 className="text-xl font-semibold">Access Status</h2>
          <p className="mt-2 text-sm text-muted">Subscription status could not be loaded. Refresh the page.</p>
        </section>
      </main>
    );
  }

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
