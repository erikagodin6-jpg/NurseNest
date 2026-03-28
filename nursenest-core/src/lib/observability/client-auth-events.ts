"use client";

import { initPosthogClient, trackClientEvent } from "@/lib/observability/posthog-client";

/**
 * Client-side auth/recovery/exam signals (no passwords, no full email).
 * Enable `NEXT_PUBLIC_POSTHOG_KEY` in production for funnel visibility.
 */
export function trackAuthEvent(
  event:
    | "auth_login_attempt"
    | "auth_login_failed"
    | "auth_login_success"
    | "auth_signup_failed"
    | "auth_signup_success"
    | "auth_forgot_password_client_error"
    | "auth_recovery_request_client_error"
    | "auth_recovery_request_submitted"
    | "auth_reset_failed"
    | "auth_reset_success"
    | "exam_start_failed"
    | "exam_start_paywall"
    | "exam_start_unauthorized"
    | "exam_session_recover_failed"
    | "exam_submit_failed",
  props?: Record<string, string | number | boolean | undefined>,
): void {
  initPosthogClient();
  trackClientEvent(event, props);
}
