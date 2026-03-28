"use client";

import { useState } from "react";
import Link from "next/link";
import { trackAuthEvent } from "@/lib/observability/client-auth-events";

const GENERIC =
  "If an account exists for that email, a reset link has been sent. Check your inbox and spam folder.";

export function ForgotPasswordForm({ pathPrefix = "" }: { pathPrefix?: string }) {
  const p = pathPrefix.replace(/\/$/, "");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setStatus("loading");
    setMessage(null);
    const email = String(formData.get("email") ?? "");
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      let data: { message?: string } = {};
      try {
        data = (await res.json()) as { message?: string };
      } catch {
        trackAuthEvent("auth_forgot_password_client_error", { reason: "bad_json" });
        setStatus("error");
        setMessage("We couldn’t complete that request. Check your connection and try again.");
        return;
      }
      setMessage(data.message ?? GENERIC);
      setStatus("done");
    } catch {
      trackAuthEvent("auth_forgot_password_client_error", { reason: "network" });
      setStatus("error");
      setMessage("Something went wrong. Check your connection and try again.");
    }
  }

  return (
    <div className="mt-6 space-y-4">
      {status === "done" ? (
        <p className="text-sm text-foreground">{message ?? GENERIC}</p>
      ) : (
        <form action={onSubmit} className="space-y-4">
          <label className="block text-sm font-medium">
            Email
            <input
              className="mt-1 w-full rounded-xl border border-border bg-white px-3 py-2"
              type="email"
              name="email"
              autoComplete="email"
              required
              disabled={status === "loading"}
            />
          </label>
          {status === "error" && message ? <p className="text-sm text-red-600">{message}</p> : null}
          <button
            className="w-full rounded-xl bg-primary px-4 py-2 font-semibold disabled:opacity-60"
            type="submit"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Sending…" : "Send reset link"}
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
