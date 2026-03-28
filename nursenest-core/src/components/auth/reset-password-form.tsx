"use client";

import { useState } from "react";
import Link from "next/link";
import { trackAuthEvent } from "@/lib/observability/client-auth-events";

type Props = { token: string | null; pathPrefix?: string };

export function ResetPasswordForm({ token, pathPrefix = "" }: Props) {
  const p = pathPrefix.replace(/\/$/, "");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    if (!token) return;
    setStatus("loading");
    setError(null);
    const password = String(formData.get("password") ?? "");
    const confirm = String(formData.get("confirm") ?? "");
    if (password !== confirm) {
      setError("Passwords do not match.");
      setStatus("idle");
      return;
    }
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = (await res.json()) as { message?: string; error?: string };
      if (!res.ok) {
        setError(data.message ?? "This link is invalid or has expired.");
        setStatus("error");
        trackAuthEvent("auth_reset_failed", { status: res.status });
        return;
      }
      trackAuthEvent("auth_reset_success", {});
      setStatus("done");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("error");
      trackAuthEvent("auth_reset_failed", { status: 0 });
    }
  }

  if (!token) {
    return (
      <div className="mt-6 space-y-4 text-sm">
        <p>This reset link is missing or invalid. Request a new password reset from the sign-in page.</p>
        <Link className="text-primary underline" href={`${p}/forgot-password`}>
          Request a new reset email
        </Link>
      </div>
    );
  }

  if (status === "done") {
    return (
      <div className="mt-6 space-y-4 text-sm">
        <p>Your password has been updated. You can sign in with your new password.</p>
        <Link
          className="inline-block w-full rounded-xl bg-primary px-4 py-2 text-center font-semibold text-white"
          href={`${p}/login`}
        >
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <form action={onSubmit} className="mt-6 space-y-4">
      <label className="block text-sm font-medium">
        New password
        <input
          className="mt-1 w-full rounded-xl border border-border bg-white px-3 py-2"
          type="password"
          name="password"
          autoComplete="new-password"
          minLength={8}
          required
        />
      </label>
      <label className="block text-sm font-medium">
        Confirm password
        <input
          className="mt-1 w-full rounded-xl border border-border bg-white px-3 py-2"
          type="password"
          name="confirm"
          autoComplete="new-password"
          minLength={8}
          required
        />
      </label>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button
        className="w-full rounded-xl bg-primary px-4 py-2 font-semibold disabled:opacity-60"
        type="submit"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Updating…" : "Update password"}
      </button>
      <p className="text-center text-sm">
        <Link className="text-primary underline" href={`${p}/forgot-password`}>
          Request a new reset email
        </Link>
      </p>
    </form>
  );
}
