"use client";

import { useState } from "react";
import Link from "next/link";
import { trackAuthEvent } from "@/lib/observability/client-auth-events";

const GENERIC =
  "If your information matches our records, our team will follow up by email. This may take one to two business days.";

export function ForgotEmailForm({ pathPrefix = "" }: { pathPrefix?: string }) {
  const p = pathPrefix.replace(/\/$/, "");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setStatus("loading");
    setMessage(null);
    const fullName = String(formData.get("fullName") ?? "");
    const details = String(formData.get("details") ?? "");
    const countryHint = String(formData.get("countryHint") ?? "");
    const tierHint = String(formData.get("tierHint") ?? "");
    const last4Hint = String(formData.get("last4Hint") ?? "");
    try {
      const res = await fetch("/api/account/recovery-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, details, countryHint, tierHint, last4Hint }),
      });
      if (!res.ok) {
        trackAuthEvent("auth_recovery_request_client_error", { reason: `http_${res.status}` });
        setStatus("error");
        setMessage("We couldn’t submit your request right now. Please try again in a few minutes.");
        return;
      }
      trackAuthEvent("auth_recovery_request_submitted", {});
      setStatus("done");
    } catch {
      trackAuthEvent("auth_recovery_request_client_error", { reason: "network" });
      setStatus("error");
      setMessage("Network error. Check your connection and try again.");
    }
  }

  return (
    <div className="mt-6 space-y-4">
      {status === "done" ? (
        <p className="text-sm text-foreground">{GENERIC}</p>
      ) : (
        <form action={onSubmit} className="space-y-4">
          <label className="block text-sm font-medium">
            Full name (as on your account)
            <input
              className="mt-1 w-full rounded-xl border border-border bg-white px-3 py-2"
              type="text"
              name="fullName"
              autoComplete="name"
              required
              minLength={2}
              disabled={status === "loading"}
            />
          </label>
          <label className="block text-sm font-medium">
            Anything that helps us verify you
            <br />
            <span className="font-normal text-muted">
              e.g. subscription or order reference, approximate signup date, country, role, or last 4 digits of your card if you used
              one.
            </span>
            <textarea
              className="mt-1 min-h-[120px] w-full rounded-xl border border-border bg-white px-3 py-2"
              name="details"
              required
              minLength={10}
              disabled={status === "loading"}
            />
          </label>
          <label className="block text-sm font-medium">
            Country / region (optional)
            <input className="mt-1 w-full rounded-xl border border-border bg-white px-3 py-2" type="text" name="countryHint" disabled={status === "loading"} />
          </label>
          <label className="block text-sm font-medium">
            Role / tier hint (optional)
            <input className="mt-1 w-full rounded-xl border border-border bg-white px-3 py-2" type="text" name="tierHint" disabled={status === "loading"} />
          </label>
          <label className="block text-sm font-medium">
            Last 4 digits of payment card (optional)
            <input
              className="mt-1 w-full rounded-xl border border-border bg-white px-3 py-2"
              type="text"
              name="last4Hint"
              maxLength={4}
              pattern="[0-9]{0,4}"
              inputMode="numeric"
              disabled={status === "loading"}
            />
          </label>
          {status === "error" && message ? <p className="text-sm text-red-600">{message}</p> : null}
          <button
            className="w-full rounded-xl bg-primary px-4 py-2 font-semibold disabled:opacity-60"
            type="submit"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Submitting…" : "Submit request"}
          </button>
        </form>
      )}
      <p className="text-center text-sm">
        <Link className="text-primary underline" href={`${p}/login`}>
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
