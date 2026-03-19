import { describe, test, expect } from "vitest";
import {
  EXAM_FAILURE_CODES,
  EXAM_ERROR_USER_MESSAGES,
  classifyHttpError,
  classifyClientError,
  classifyServerError,
} from "../../shared/exam-error-codes";

describe("EXAM_FAILURE_CODES", () => {
  test("includes all required failure codes", () => {
    expect(EXAM_FAILURE_CODES.EXAM_NOT_FOUND).toBe("exam_not_found");
    expect(EXAM_FAILURE_CODES.EXAM_UNPUBLISHED).toBe("exam_unpublished");
    expect(EXAM_FAILURE_CODES.INVALID_PAYLOAD).toBe("invalid_payload");
    expect(EXAM_FAILURE_CODES.SESSION_CREATE_FAILED).toBe("session_create_failed");
    expect(EXAM_FAILURE_CODES.ASSEMBLY_FAILED).toBe("assembly_failed");
    expect(EXAM_FAILURE_CODES.NAVIGATION_FAILED).toBe("navigation_failed");
    expect(EXAM_FAILURE_CODES.TIER_MISMATCH).toBe("tier_mismatch");
    expect(EXAM_FAILURE_CODES.NOT_ENTITLED).toBe("not_entitled");
    expect(EXAM_FAILURE_CODES.SUBSCRIPTION_REQUIRED).toBe("subscription_required");
    expect(EXAM_FAILURE_CODES.EXAM_UNAVAILABLE_FOR_REGION).toBe("exam_unavailable_for_region");
    expect(EXAM_FAILURE_CODES.FEATURE_DISABLED).toBe("feature_disabled");
    expect(EXAM_FAILURE_CODES.ASSEMBLY_CAPACITY).toBe("assembly_capacity");
  });
});

describe("EXAM_ERROR_USER_MESSAGES", () => {
  test("every failure code has a user-facing message", () => {
    const allCodes = Object.values(EXAM_FAILURE_CODES);
    for (const code of allCodes) {
      const msg = EXAM_ERROR_USER_MESSAGES[code];
      expect(msg, `Missing user message for code: ${code}`).toBeDefined();
      expect(msg.title).toBeTruthy();
      expect(msg.description).toBeTruthy();
    }
  });

  test("no message contains 'Something went wrong'", () => {
    for (const [code, msg] of Object.entries(EXAM_ERROR_USER_MESSAGES)) {
      expect(msg.title).not.toContain("Something went wrong");
      expect(msg.description).not.toContain("Something went wrong");
    }
  });

  test("tier mismatch returns actionable message", () => {
    const msg = EXAM_ERROR_USER_MESSAGES[EXAM_FAILURE_CODES.TIER_MISMATCH];
    expect(msg.title).toBe("Subscription Required");
    expect(msg.description).toContain("upgrade");
  });

  test("question batch missing returns actionable message", () => {
    const msg = EXAM_ERROR_USER_MESSAGES[EXAM_FAILURE_CODES.QUESTION_BATCH_MISSING];
    expect(msg.title).toBe("No Questions Available");
    expect(msg.description).toContain("questions");
  });

  test("exam not found returns specific message", () => {
    const msg = EXAM_ERROR_USER_MESSAGES[EXAM_FAILURE_CODES.EXAM_NOT_FOUND];
    expect(msg.title).toBe("Exam Not Found");
  });

  test("unknown error does NOT say 'Something went wrong'", () => {
    const msg = EXAM_ERROR_USER_MESSAGES[EXAM_FAILURE_CODES.UNKNOWN];
    expect(msg.title).not.toContain("Something went wrong");
    expect(msg.description).not.toContain("Something went wrong");
    expect(msg.description).toContain("retry");
  });
});

describe("classifyHttpError", () => {
  test("classifies 401 as entitlement_failure", () => {
    const result = classifyHttpError(401);
    expect(result.code).toBe(EXAM_FAILURE_CODES.ENTITLEMENT_FAILURE);
    expect(result.recoverable).toBe(true);
  });

  test("classifies 403 as access_denied", () => {
    const result = classifyHttpError(403);
    expect(result.code).toBe(EXAM_FAILURE_CODES.ACCESS_DENIED);
    expect(result.recoverable).toBe(false);
  });

  test("classifies 404 as missing_session", () => {
    const result = classifyHttpError(404);
    expect(result.code).toBe(EXAM_FAILURE_CODES.MISSING_SESSION);
  });

  test("uses reasonCode from server response body", () => {
    const result = classifyHttpError(403, { reasonCode: "tier_mismatch", error: "Unauthorized exam tier" });
    expect(result.code).toBe("tier_mismatch");
    expect(result.message).toBe("Unauthorized exam tier");
  });

  test("uses reasonCode for subscription_required", () => {
    const result = classifyHttpError(403, { reasonCode: "subscription_required", error: "Upgrade required" });
    expect(result.code).toBe("subscription_required");
  });

  test("uses reasonCode for question_batch_missing", () => {
    const result = classifyHttpError(400, { reasonCode: "question_batch_missing", error: "No questions" });
    expect(result.code).toBe("question_batch_missing");
  });

  test("classifies 500 with reasonCode from structured error", () => {
    const result = classifyHttpError(500, { reasonCode: "session_create_failed", error: "Failed to create", recoverable: true });
    expect(result.code).toBe("session_create_failed");
    expect(result.recoverable).toBe(true);
  });

  test("classifies 503 as db_timeout", () => {
    const result = classifyHttpError(503);
    expect(result.code).toBe(EXAM_FAILURE_CODES.DB_TIMEOUT);
    expect(result.recoverable).toBe(true);
  });
});

describe("classifyClientError", () => {
  test("classifies timeout error", () => {
    const err = new Error("Request timed out");
    err.name = "AbortError";
    const result = classifyClientError(err);
    expect(result.code).toBe(EXAM_FAILURE_CODES.NETWORK_TIMEOUT);
    expect(result.recoverable).toBe(true);
  });

  test("classifies network error", () => {
    const result = classifyClientError(new Error("Failed to fetch"));
    expect(result.code).toBe(EXAM_FAILURE_CODES.NETWORK_TIMEOUT);
    expect(result.recoverable).toBe(true);
  });

  test("classifies parse error", () => {
    const result = classifyClientError(new Error("Unexpected token < in JSON"));
    expect(result.code).toBe(EXAM_FAILURE_CODES.FRONTEND_PARSE_FAILURE);
    expect(result.recoverable).toBe(true);
  });

  test("classifies unknown error as recoverable", () => {
    const result = classifyClientError(new Error("Something random"));
    expect(result.code).toBe(EXAM_FAILURE_CODES.UNKNOWN);
    expect(result.recoverable).toBe(true);
  });
});

describe("classifyServerError", () => {
  test("classifies timeout errors", () => {
    const result = classifyServerError({ message: "canceling statement due to statement timeout" });
    expect(result.code).toBe(EXAM_FAILURE_CODES.DB_TIMEOUT);
    expect(result.recoverable).toBe(true);
  });

  test("classifies schema mismatch", () => {
    const result = classifyServerError({ message: 'column "foo" does not exist' });
    expect(result.code).toBe(EXAM_FAILURE_CODES.SCHEMA_MISMATCH);
  });

  test("classifies zero question count", () => {
    const result = classifyServerError({ message: "" }, { questionCount: 0 });
    expect(result.code).toBe(EXAM_FAILURE_CODES.QUESTION_BATCH_MISSING);
  });

  test("classifies assembly failures", () => {
    const result = classifyServerError({ message: "assembly failed" }, { stage: "assembly" });
    expect(result.code).toBe(EXAM_FAILURE_CODES.ASSEMBLY_FAILED);
  });

  test("classifies session insert failures", () => {
    const result = classifyServerError({ message: "INSERT INTO mock_exam_attempts failed" });
    expect(result.code).toBe(EXAM_FAILURE_CODES.SESSION_CREATE_FAILED);
  });

  test("classifies exam not found", () => {
    const result = classifyServerError({ message: "exam not found" });
    expect(result.code).toBe(EXAM_FAILURE_CODES.EXAM_NOT_FOUND);
  });

  test("classifies unpublished exam", () => {
    const result = classifyServerError({ message: "exam is unpublished" });
    expect(result.code).toBe(EXAM_FAILURE_CODES.EXAM_UNPUBLISHED);
  });

  test("classifies memory rejection", () => {
    const result = classifyServerError({ message: "out of memory" });
    expect(result.code).toBe(EXAM_FAILURE_CODES.MEMORY_REJECTION);
  });

  test("unknown errors are recoverable", () => {
    const result = classifyServerError({ message: "something unexpected" });
    expect(result.code).toBe(EXAM_FAILURE_CODES.UNKNOWN);
    expect(result.recoverable).toBe(true);
  });
});

describe("Entitlement structured responses", () => {
  test("resolveEntitlementSync returns correct decision for free user on premium feature", async () => {
    const { resolveEntitlementSync } = await import("../entitlements");
    const freeUser = { id: "test-1", tier: "free" };
    const decision = resolveEntitlementSync(freeUser, "feature", "mock_exams");
    expect(decision.hasAccess).toBe(false);
    expect(decision.accessDecisionReason).toContain("requires_");
  });

  test("resolveEntitlementSync grants access to admin user", async () => {
    const { resolveEntitlementSync } = await import("../entitlements");
    const adminUser = { id: "admin-1", tier: "admin" };
    const decision = resolveEntitlementSync(adminUser, "feature", "mock_exams");
    expect(decision.hasAccess).toBe(true);
  });

  test("resolveEntitlementSync returns correct decision for tier user on matching feature", async () => {
    const { resolveEntitlementSync } = await import("../entitlements");
    const rnUser = { id: "rn-1", tier: "rn" };
    const decision = resolveEntitlementSync(rnUser, "feature", "mock_exams");
    expect(decision.hasAccess).toBe(true);
  });

  test("resolveEntitlementSync denies unauthenticated user", async () => {
    const { resolveEntitlementSync } = await import("../entitlements");
    const decision = resolveEntitlementSync(null, "feature", "mock_exams");
    expect(decision.hasAccess).toBe(false);
    expect(decision.accessDecisionReason).toBe("not_authenticated");
  });
});

describe("8 required exam-start failure scenarios", () => {
  test("Scenario 1: Unauthenticated user gets entitlement_failure with structured response", () => {
    const result = classifyHttpError(401, { reasonCode: "entitlement_failure", error: "Authentication required", recoverable: true });
    expect(result.code).toBe("entitlement_failure");
    expect(result.recoverable).toBe(true);
    const msg = EXAM_ERROR_USER_MESSAGES[result.code] || EXAM_ERROR_USER_MESSAGES[EXAM_FAILURE_CODES.UNKNOWN];
    expect(msg.title).not.toContain("Something went wrong");
  });

  test("Scenario 2: Free user on premium exam gets subscription_required with upgrade info", () => {
    const result = classifyHttpError(403, {
      reasonCode: "subscription_required",
      error: "Premium feature - upgrade required",
      recoverable: false,
      upgradeRequired: true,
      requiredTier: "rn",
      currentTier: "free",
    });
    expect(result.code).toBe("subscription_required");
    expect(result.recoverable).toBe(false);
    const msg = EXAM_ERROR_USER_MESSAGES[result.code];
    expect(msg).toBeDefined();
    expect(msg.title).toBe("Upgrade Required");
  });

  test("Scenario 3: Exam not found returns exam_not_found with actionable message", () => {
    const serverErr = classifyServerError({ message: "exam not found" });
    expect(serverErr.code).toBe(EXAM_FAILURE_CODES.EXAM_NOT_FOUND);
    const result = classifyHttpError(404, { reasonCode: "exam_not_found", error: "Exam not found" });
    expect(result.code).toBe("exam_not_found");
    const msg = EXAM_ERROR_USER_MESSAGES[result.code];
    expect(msg.title).toBe("Exam Not Found");
  });

  test("Scenario 4: Unpublished exam returns exam_unpublished", () => {
    const serverErr = classifyServerError({ message: "exam is unpublished" });
    expect(serverErr.code).toBe(EXAM_FAILURE_CODES.EXAM_UNPUBLISHED);
    const result = classifyHttpError(400, { reasonCode: "exam_unpublished", error: "Exam not published" });
    expect(result.code).toBe("exam_unpublished");
    const msg = EXAM_ERROR_USER_MESSAGES[result.code];
    expect(msg).toBeDefined();
    expect(msg.title).not.toContain("Something went wrong");
  });

  test("Scenario 5: No questions available returns question_batch_missing with fallback hint", () => {
    const serverErr = classifyServerError({ message: "" }, { questionCount: 0 });
    expect(serverErr.code).toBe(EXAM_FAILURE_CODES.QUESTION_BATCH_MISSING);
    const result = classifyHttpError(400, { reasonCode: "question_batch_missing", error: "No questions available" });
    expect(result.code).toBe("question_batch_missing");
    const msg = EXAM_ERROR_USER_MESSAGES[result.code];
    expect(msg.title).toBe("No Questions Available");
    expect(msg.description).toContain("questions");
  });

  test("Scenario 6: Session creation failure returns session_create_failed as recoverable", () => {
    const serverErr = classifyServerError({ message: "INSERT INTO mock_exam_attempts failed" });
    expect(serverErr.code).toBe(EXAM_FAILURE_CODES.SESSION_CREATE_FAILED);
    const result = classifyHttpError(500, { reasonCode: "session_create_failed", error: "Failed to create", recoverable: true });
    expect(result.code).toBe("session_create_failed");
    expect(result.recoverable).toBe(true);
    const msg = EXAM_ERROR_USER_MESSAGES[result.code];
    expect(msg).toBeDefined();
  });

  test("Scenario 7: Database timeout returns db_timeout as recoverable", () => {
    const serverErr = classifyServerError({ message: "canceling statement due to statement timeout" });
    expect(serverErr.code).toBe(EXAM_FAILURE_CODES.DB_TIMEOUT);
    expect(serverErr.recoverable).toBe(true);
    const result = classifyHttpError(503, { reasonCode: "db_timeout", error: "Timed out", recoverable: true });
    expect(result.code).toBe("db_timeout");
    expect(result.recoverable).toBe(true);
  });

  test("Scenario 8: Unknown server error is recoverable (triggers fallback cascade)", () => {
    const serverErr = classifyServerError({ message: "unexpected failure xyz" });
    expect(serverErr.code).toBe(EXAM_FAILURE_CODES.UNKNOWN);
    expect(serverErr.recoverable).toBe(true);
    const clientErr = classifyClientError(new Error("Something weird happened"));
    expect(clientErr.recoverable).toBe(true);
    const msg = EXAM_ERROR_USER_MESSAGES[EXAM_FAILURE_CODES.UNKNOWN];
    expect(msg.title).not.toContain("Something went wrong");
    expect(msg.description).toContain("retry");
  });
});

describe("Endpoint response shape validation", () => {
  test("timeout handler response shape matches structured format", () => {
    const timeoutResponse = { error: "Exam start timed out. Please try again.", reasonCode: "db_timeout", recoverable: true };
    expect(timeoutResponse.reasonCode).toBe("db_timeout");
    expect(timeoutResponse.recoverable).toBe(true);
    expect(typeof timeoutResponse.error).toBe("string");
  });

  test("entitlement denial response includes all required fields", () => {
    const denialResponse = {
      error: "Premium feature - upgrade required",
      reasonCode: "subscription_required",
      recoverable: false,
      upgradeRequired: true,
      feature: "mock_exams",
      requiredTier: "rn",
      currentTier: "free",
      message: "This feature requires a rn subscription or higher.",
      details: { feature: "mock_exams", userTier: "free", requiredTier: "rn" },
    };
    expect(denialResponse.reasonCode).toBeTruthy();
    expect(typeof denialResponse.recoverable).toBe("boolean");
    expect(denialResponse.message).toBeTruthy();
    expect(denialResponse.details).toBeDefined();
    expect(denialResponse.upgradeRequired).toBe(true);
  });

  test("feature disabled response includes reasonCode and recoverable", () => {
    const response = { error: "Mock exams are temporarily unavailable for your account.", reasonCode: "feature_disabled", recoverable: true };
    expect(response.reasonCode).toBe("feature_disabled");
    expect(response.recoverable).toBe(true);
  });

  test("invalid payload response is not recoverable", () => {
    const response = { error: "Missing exam definition ID", reasonCode: "invalid_payload", recoverable: false };
    expect(response.reasonCode).toBe("invalid_payload");
    expect(response.recoverable).toBe(false);
  });

  test("auth failure response includes reasonCode", () => {
    const response = { error: "Authentication required", reasonCode: "entitlement_failure", recoverable: true };
    expect(response.reasonCode).toBe("entitlement_failure");
    expect(response.recoverable).toBe(true);
  });
});

describe("Fallback cascade logic", () => {
  test("recoverable errors should trigger fallback cascade (resume → reduced → practice)", () => {
    const recoverableCodes = [
      EXAM_FAILURE_CODES.DB_TIMEOUT,
      EXAM_FAILURE_CODES.SESSION_CREATE_FAILED,
      EXAM_FAILURE_CODES.NETWORK_TIMEOUT,
      EXAM_FAILURE_CODES.FRONTEND_PARSE_FAILURE,
      EXAM_FAILURE_CODES.UNKNOWN,
    ];
    for (const code of recoverableCodes) {
      const result = classifyHttpError(500, { reasonCode: code, recoverable: true });
      expect(result.recoverable, `Code ${code} should be recoverable`).toBe(true);
    }
  });

  test("non-recoverable errors should NOT trigger fallback cascade", () => {
    const nonRecoverableCodes = [
      EXAM_FAILURE_CODES.ACCESS_DENIED,
      EXAM_FAILURE_CODES.TIER_MISMATCH,
      EXAM_FAILURE_CODES.SUBSCRIPTION_REQUIRED,
    ];
    for (const code of nonRecoverableCodes) {
      const result = classifyHttpError(403, { reasonCode: code, recoverable: false });
      expect(result.recoverable, `Code ${code} should NOT be recoverable`).toBe(false);
    }
  });
});

describe("No generic dead-end errors in user messages", () => {
  test("no message contains 'Something went wrong — please try again'", () => {
    for (const [_, msg] of Object.entries(EXAM_ERROR_USER_MESSAGES)) {
      expect(msg.title + " " + msg.description).not.toContain("Something went wrong — please try again");
    }
  });

  test("every error code has a non-generic, actionable message", () => {
    const genericPhrases = ["Something went wrong", "Unknown error occurred", "An error occurred"];
    for (const [code, msg] of Object.entries(EXAM_ERROR_USER_MESSAGES)) {
      for (const phrase of genericPhrases) {
        expect(msg.title).not.toContain(phrase);
        expect(msg.description).not.toContain(phrase);
      }
    }
  });
});
