import Link from "next/link";
import { MarkRecoveryHandledButton } from "@/components/admin/mark-recovery-handled-button";
import { requireAdmin } from "@/lib/auth/guards";
import { prisma } from "@/lib/db";

export default async function AccountRecoveryAdminPage() {
  await requireAdmin();

  const pending = await prisma.accountRecoveryRequest.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "desc" },
    take: 100,
    select: {
      id: true,
      fullName: true,
      details: true,
      countryHint: true,
      tierHint: true,
      last4Hint: true,
      createdAt: true,
    },
  });

  const recentHandled = await prisma.accountRecoveryRequest.findMany({
    where: { status: "HANDLED" },
    orderBy: { handledAt: "desc" },
    take: 20,
    select: {
      id: true,
      fullName: true,
      handledById: true,
      handledAt: true,
      createdAt: true,
    },
  });

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <p className="text-sm">
        <Link className="text-primary underline" href="/admin">
          ← Admin home
        </Link>
      </p>
      <h1 className="mt-4 text-3xl font-bold">Account recovery (support)</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Users who forgot their sign-in email submit details here. Verify identity out-of-band before telling them their email. Do not
        expose raw reset tokens or passwords in tickets.
      </p>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Pending ({pending.length})</h2>
        {pending.length === 0 ? (
          <p className="mt-2 text-sm text-muted">No pending requests.</p>
        ) : (
          <ul className="mt-4 space-y-6">
            {pending.map((row) => (
              <li key={row.id} className="nn-card p-4 text-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs text-muted">{row.id}</p>
                    <p className="mt-1 font-semibold">{row.fullName}</p>
                    <p className="mt-2 whitespace-pre-wrap text-foreground">{row.details}</p>
                    <dl className="mt-2 grid gap-1 text-xs text-muted sm:grid-cols-3">
                      {row.countryHint ? (
                        <div>
                          <dt className="inline font-medium">Country hint: </dt>
                          <dd className="inline">{row.countryHint}</dd>
                        </div>
                      ) : null}
                      {row.tierHint ? (
                        <div>
                          <dt className="inline font-medium">Tier hint: </dt>
                          <dd className="inline">{row.tierHint}</dd>
                        </div>
                      ) : null}
                      {row.last4Hint ? (
                        <div>
                          <dt className="inline font-medium">Last4: </dt>
                          <dd className="inline">{row.last4Hint}</dd>
                        </div>
                      ) : null}
                    </dl>
                    <p className="mt-2 text-xs text-muted">Submitted {row.createdAt.toISOString()}</p>
                  </div>
                  <MarkRecoveryHandledButton id={row.id} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Recently handled</h2>
        {recentHandled.length === 0 ? (
          <p className="mt-2 text-sm text-muted">None yet.</p>
        ) : (
          <ul className="mt-3 space-y-2 text-sm">
            {recentHandled.map((row) => (
              <li key={row.id} className="flex flex-wrap gap-2 border-b border-border py-2">
                <span className="font-mono text-xs">{row.id}</span>
                <span>{row.fullName}</span>
                <span className="text-muted">by {row.handledById ?? "—"}</span>
                <span className="text-muted">{row.handledAt?.toISOString() ?? ""}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
