export const EXAM_FAILURE_CODES = {
  ENTITLEMENT_FAILURE: "entitlement_failure",
  MISSING_SESSION: "missing_session",
  CORRUPTED_SESSION: "corrupted_session",
  QUESTION_BATCH_MISSING: "question_batch_missing",
  DB_TIMEOUT: "db_timeout",
  OVERSIZED_PAYLOAD: "oversized_payload",
  MEMORY_REJECTION: "memory_rejection",
  MALFORMED_QUESTION: "malformed_question",
  FRONTEND_PARSE_FAILURE: "frontend_parse_failure",
  STALE_RESUME_POINTER: "stale_resume_pointer",
  SCHEMA_MISMATCH: "schema_mismatch",
  NETWORK_TIMEOUT: "network_timeout",
  ACCESS_DENIED: "access_denied",
  EXAM_NOT_FOUND: "exam_not_found",
  EXAM_UNPUBLISHED: "exam_unpublished",
  INVALID_PAYLOAD: "invalid_payload",
  SESSION_CREATE_FAILED: "session_create_failed",
  ASSEMBLY_FAILED: "assembly_failed",
  NAVIGATION_FAILED: "navigation_failed",
  TIER_MISMATCH: "tier_mismatch",
  NOT_ENTITLED: "not_entitled",
  SUBSCRIPTION_REQUIRED: "subscription_required",
  EXAM_UNAVAILABLE_FOR_REGION: "exam_unavailable_for_region",
  FEATURE_DISABLED: "feature_disabled",
  ASSEMBLY_CAPACITY: "assembly_capacity",
  UNKNOWN: "unknown",
} as const;

export const EXAM_ERROR_USER_MESSAGES: Record<string, { title: string; description: string }> = {
  [EXAM_FAILURE_CODES.ENTITLEMENT_FAILURE]: { title: "Authentication Required", description: "Please log in to start an exam." },
  [EXAM_FAILURE_CODES.MISSING_SESSION]: { title: "Session Not Found", description: "This exam session could not be found. It may have expired." },
  [EXAM_FAILURE_CODES.CORRUPTED_SESSION]: { title: "Session Issue", description: "This exam session has a data issue. Please start a new exam." },
  [EXAM_FAILURE_CODES.QUESTION_BATCH_MISSING]: { title: "No Questions Available", description: "No questions are available for this exam configuration. Try a different tier or body system." },
  [EXAM_FAILURE_CODES.DB_TIMEOUT]: { title: "Temporarily Unavailable", description: "The server is busy. Please wait a moment and try again." },
  [EXAM_FAILURE_CODES.OVERSIZED_PAYLOAD]: { title: "Exam Too Large", description: "This exam configuration is too large. A lighter version will be loaded." },
  [EXAM_FAILURE_CODES.MEMORY_REJECTION]: { title: "Server Busy", description: "The server is under heavy load. Please try again in a moment." },
  [EXAM_FAILURE_CODES.MALFORMED_QUESTION]: { title: "Question Data Issue", description: "Some questions have data issues. A corrected version is being prepared." },
  [EXAM_FAILURE_CODES.FRONTEND_PARSE_FAILURE]: { title: "Loading Error", description: "The exam data could not be loaded. Please refresh and try again." },
  [EXAM_FAILURE_CODES.STALE_RESUME_POINTER]: { title: "Resume Position Changed", description: "Your exam position was out of sync. It has been corrected." },
  [EXAM_FAILURE_CODES.SCHEMA_MISMATCH]: { title: "System Update in Progress", description: "A system update is being applied. Please retry in a moment." },
  [EXAM_FAILURE_CODES.NETWORK_TIMEOUT]: { title: "Connection Issue", description: "The request timed out. Please check your connection and try again." },
  [EXAM_FAILURE_CODES.ACCESS_DENIED]: { title: "Access Denied", description: "You do not have permission to access this exam." },
  [EXAM_FAILURE_CODES.EXAM_NOT_FOUND]: { title: "Exam Not Found", description: "This exam could not be found. It may have been removed or is no longer available." },
  [EXAM_FAILURE_CODES.EXAM_UNPUBLISHED]: { title: "Exam Unavailable", description: "This exam is not currently published. Please choose a different exam." },
  [EXAM_FAILURE_CODES.INVALID_PAYLOAD]: { title: "Invalid Request", description: "The exam request was invalid. Please refresh the page and try again." },
  [EXAM_FAILURE_CODES.SESSION_CREATE_FAILED]: { title: "Unable to Start Exam", description: "The exam session could not be created. Please retry in a moment." },
  [EXAM_FAILURE_CODES.ASSEMBLY_FAILED]: { title: "Exam Preparation Failed", description: "The exam questions could not be assembled. Please try again." },
  [EXAM_FAILURE_CODES.NAVIGATION_FAILED]: { title: "Navigation Error", description: "Could not navigate to the exam. Please try again from the exam list." },
  [EXAM_FAILURE_CODES.TIER_MISMATCH]: { title: "Subscription Required", description: "This exam requires a higher subscription tier. Please upgrade your plan." },
  [EXAM_FAILURE_CODES.NOT_ENTITLED]: { title: "Subscription Required", description: "This feature requires a paid subscription. Please upgrade your plan." },
  [EXAM_FAILURE_CODES.SUBSCRIPTION_REQUIRED]: { title: "Upgrade Required", description: "This exam feature requires a paid subscription. Please upgrade your plan to access the question bank." },
  [EXAM_FAILURE_CODES.EXAM_UNAVAILABLE_FOR_REGION]: { title: "Not Available in Your Region", description: "This exam is not available in your region. Please choose a different exam." },
  [EXAM_FAILURE_CODES.FEATURE_DISABLED]: { title: "Temporarily Disabled", description: "This feature is temporarily disabled for maintenance. Please try again later." },
  [EXAM_FAILURE_CODES.ASSEMBLY_CAPACITY]: { title: "Server Busy", description: "Too many exams are being prepared. Please wait a moment and try again." },
  [EXAM_FAILURE_CODES.UNKNOWN]: { title: "Unable to Start Exam", description: "An unexpected issue occurred. Please retry — if it persists, contact support." },
};

export type ExamFailureCode = typeof EXAM_FAILURE_CODES[keyof typeof EXAM_FAILURE_CODES];

export interface ClassifiedExamError {
  code: ExamFailureCode;
  message: string;
  recoverable: boolean;
  httpStatus?: number;
  details?: Record<string, any>;
  timestamp: string;
}

export function classifyHttpError(status: number, body?: any): ClassifiedExamError {
  const now = new Date().toISOString();

  if (body?.reasonCode) {
    return {
      code: body.reasonCode as ExamFailureCode,
      message: body.error || body.message || "Server error",
      recoverable: body.recoverable ?? status < 500,
      httpStatus: status,
      details: body.details,
      timestamp: now,
    };
  }

  switch (status) {
    case 401:
      return { code: EXAM_FAILURE_CODES.ENTITLEMENT_FAILURE, message: "Authentication required", recoverable: true, httpStatus: status, timestamp: now };
    case 403:
      return { code: EXAM_FAILURE_CODES.ACCESS_DENIED, message: "Access denied", recoverable: false, httpStatus: status, timestamp: now };
    case 404:
      return { code: EXAM_FAILURE_CODES.MISSING_SESSION, message: "Exam session not found", recoverable: false, httpStatus: status, timestamp: now };
    case 409:
      return { code: EXAM_FAILURE_CODES.STALE_RESUME_POINTER, message: body?.error || "Session state conflict", recoverable: true, httpStatus: status, timestamp: now };
    case 413:
      return { code: EXAM_FAILURE_CODES.OVERSIZED_PAYLOAD, message: body?.error || "Payload too large", recoverable: true, httpStatus: status, timestamp: now };
    case 422:
      return { code: EXAM_FAILURE_CODES.CORRUPTED_SESSION, message: body?.error || "Invalid session data", recoverable: true, httpStatus: status, timestamp: now };
    case 503:
      return { code: EXAM_FAILURE_CODES.DB_TIMEOUT, message: "Service temporarily unavailable", recoverable: true, httpStatus: status, timestamp: now };
    default:
      if (status >= 500) {
        return { code: EXAM_FAILURE_CODES.UNKNOWN, message: body?.error || `Server error: ${status}`, recoverable: true, httpStatus: status, timestamp: now };
      }
      return { code: EXAM_FAILURE_CODES.UNKNOWN, message: body?.error || `Error: ${status}`, recoverable: false, httpStatus: status, timestamp: now };
  }
}

export function classifyClientError(error: Error): ClassifiedExamError {
  const now = new Date().toISOString();
  const msg = error.message || "";

  if (error.name === "AbortError" || msg.includes("timeout") || msg.includes("timed out")) {
    return { code: EXAM_FAILURE_CODES.NETWORK_TIMEOUT, message: "Request timed out", recoverable: true, timestamp: now };
  }
  if (msg.includes("Failed to fetch") || msg.includes("NetworkError") || msg.includes("net::")) {
    return { code: EXAM_FAILURE_CODES.NETWORK_TIMEOUT, message: "Network error", recoverable: true, timestamp: now };
  }
  if (msg.includes("JSON") || msg.includes("parse") || msg.includes("Unexpected token")) {
    return { code: EXAM_FAILURE_CODES.FRONTEND_PARSE_FAILURE, message: "Failed to parse response", recoverable: true, timestamp: now };
  }
  if (msg.includes("out of memory") || msg.includes("allocation")) {
    return { code: EXAM_FAILURE_CODES.MEMORY_REJECTION, message: "Memory limit exceeded", recoverable: true, timestamp: now };
  }
  if (msg.includes("schema") || msg.includes("column") || msg.includes("does not exist")) {
    return { code: EXAM_FAILURE_CODES.SCHEMA_MISMATCH, message: "Data schema mismatch", recoverable: true, timestamp: now };
  }
  if (msg.includes("oversized") || msg.includes("payload too large") || msg.includes("entity too large") || msg.includes("413")) {
    return { code: EXAM_FAILURE_CODES.OVERSIZED_PAYLOAD, message: "Response payload too large", recoverable: true, timestamp: now };
  }
  if (msg.includes("malformed") || msg.includes("invalid question") || msg.includes("missing options") || msg.includes("missing correct")) {
    return { code: EXAM_FAILURE_CODES.MALFORMED_QUESTION, message: "Malformed question data", recoverable: true, timestamp: now };
  }
  if (msg.includes("stale") || msg.includes("resume pointer") || msg.includes("currentQuestion") || msg.includes("out of range")) {
    return { code: EXAM_FAILURE_CODES.STALE_RESUME_POINTER, message: "Stale resume position", recoverable: true, timestamp: now };
  }

  return { code: EXAM_FAILURE_CODES.UNKNOWN, message: msg || "Unknown error", recoverable: true, timestamp: now };
}

export function classifyServerError(error: any, context?: { attemptId?: string; questionCount?: number; stage?: string }): ClassifiedExamError {
  const now = new Date().toISOString();
  const msg = typeof error === "string" ? error : (error?.message || "");

  if (msg.includes("timeout") || msg.includes("canceling statement") || error?.code === "57014") {
    return { code: EXAM_FAILURE_CODES.DB_TIMEOUT, message: "Database query timed out", recoverable: true, timestamp: now, details: context };
  }
  if (msg.includes("column") && msg.includes("does not exist")) {
    return { code: EXAM_FAILURE_CODES.SCHEMA_MISMATCH, message: "Database schema mismatch", recoverable: true, timestamp: now, details: context };
  }
  if (msg.includes("out of memory") || msg.includes("allocation")) {
    return { code: EXAM_FAILURE_CODES.MEMORY_REJECTION, message: "Server memory limit exceeded", recoverable: true, timestamp: now, details: context };
  }
  if (context?.questionCount === 0) {
    return { code: EXAM_FAILURE_CODES.QUESTION_BATCH_MISSING, message: "No questions available for exam", recoverable: true, timestamp: now, details: context };
  }
  if (msg.includes("oversized") || msg.includes("payload too large") || msg.includes("entity too large")) {
    return { code: EXAM_FAILURE_CODES.OVERSIZED_PAYLOAD, message: "Response payload too large", recoverable: true, timestamp: now, details: context };
  }
  if (msg.includes("malformed") || msg.includes("invalid question") || msg.includes("missing options") || msg.includes("missing correct")) {
    return { code: EXAM_FAILURE_CODES.MALFORMED_QUESTION, message: "Malformed question data detected", recoverable: true, timestamp: now, details: context };
  }
  if (msg.includes("stale") || msg.includes("resume pointer") || msg.includes("out of range")) {
    return { code: EXAM_FAILURE_CODES.STALE_RESUME_POINTER, message: "Stale resume pointer", recoverable: true, timestamp: now, details: context };
  }
  if (msg.includes("not found") || msg.includes("no rows") || error?.code === "EXAM_NOT_FOUND") {
    return { code: EXAM_FAILURE_CODES.EXAM_NOT_FOUND, message: "Exam not found", recoverable: false, timestamp: now, details: context };
  }
  if (msg.includes("unpublished") || msg.includes("inactive") || error?.code === "EXAM_UNPUBLISHED") {
    return { code: EXAM_FAILURE_CODES.EXAM_UNPUBLISHED, message: "Exam is not published", recoverable: false, timestamp: now, details: context };
  }
  if (msg.includes("INSERT") || msg.includes("insert") || msg.includes("violates") || (context?.stage === "session_insert")) {
    return { code: EXAM_FAILURE_CODES.SESSION_CREATE_FAILED, message: "Failed to create exam session", recoverable: true, timestamp: now, details: context };
  }
  if (msg.includes("assembly") || msg.includes("assemble") || (context?.stage === "assembly")) {
    return { code: EXAM_FAILURE_CODES.ASSEMBLY_FAILED, message: "Exam assembly failed", recoverable: true, timestamp: now, details: context };
  }

  return { code: EXAM_FAILURE_CODES.UNKNOWN, message: msg || "Internal server error", recoverable: true, timestamp: now, details: context };
}

export const RECOVERY_STAGES = {
  CLEAR_CACHE: "clear_cache",
  CALL_RECOVERY: "call_recovery",
  FRESH_REHYDRATION: "fresh_rehydration",
  SAFE_EXIT: "safe_exit",
} as const;

export type RecoveryStage = typeof RECOVERY_STAGES[keyof typeof RECOVERY_STAGES];

export interface RecoveryProgress {
  stage: RecoveryStage;
  stageIndex: number;
  totalStages: number;
  message: string;
}

export function getRecoveryStageInfo(stage: RecoveryStage): RecoveryProgress {
  const stages: { stage: RecoveryStage; message: string }[] = [
    { stage: RECOVERY_STAGES.CLEAR_CACHE, message: "Clearing stale data..." },
    { stage: RECOVERY_STAGES.CALL_RECOVERY, message: "Recovering session from server..." },
    { stage: RECOVERY_STAGES.FRESH_REHYDRATION, message: "Rebuilding exam session..." },
    { stage: RECOVERY_STAGES.SAFE_EXIT, message: "Preparing safe options..." },
  ];

  const idx = stages.findIndex(s => s.stage === stage);
  return {
    stage,
    stageIndex: idx >= 0 ? idx : 0,
    totalStages: stages.length,
    message: stages[idx]?.message || "Recovering...",
  };
}
