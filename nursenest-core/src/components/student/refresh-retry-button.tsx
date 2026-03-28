"use client";

import { useRouter } from "next/navigation";

/** For server-rendered surfaces when entitlement or data resolution fails transiently. */
export function RefreshRetryButton({ label = "Try again" }: { label?: string }) {
  const router = useRouter();
  return (
    <button
      type="button"
      className="mt-3 rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-50"
      onClick={() => router.refresh()}
    >
      {label}
    </button>
  );
}
