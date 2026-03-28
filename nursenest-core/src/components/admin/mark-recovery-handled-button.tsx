"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function MarkRecoveryHandledButton({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/account-recovery-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "mark_handled" }),
      });
      if (res.ok) router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      className="rounded-lg border border-border bg-white px-3 py-1.5 text-sm font-medium hover:bg-black/5 disabled:opacity-50"
      disabled={busy}
      onClick={onClick}
    >
      {busy ? "…" : "Mark handled"}
    </button>
  );
}
