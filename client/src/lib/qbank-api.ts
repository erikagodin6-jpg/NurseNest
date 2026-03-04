export interface ServerQuestion {
  id: string;
  tier: string;
  exam: string;
  questionType: string;
  stem: string;
  options: string[];
  bodySystem: string;
  topic: string;
  difficulty: number | null;
  correctAnswer?: number[];
  rationale?: string;
}

export interface QBankResponse {
  questions: ServerQuestion[];
  total: number;
  limit: number;
  offset: number;
  tier: string;
}

export interface ExamSetResponse {
  questions: ServerQuestion[];
  count: number;
  tier: string;
}

export interface AttemptResponse {
  correct: boolean;
  correctAnswer: number[];
  rationale: string;
  bodySystem: string;
}

export interface QBankStats {
  bodySystems: { body_system: string; count: string; tier?: string }[];
  total: number;
  tier: string;
}

function getAuthHeaders(): Record<string, string> {
  try {
    const creds = localStorage.getItem("nursenest-credentials");
    if (creds) {
      const { username, password } = JSON.parse(creds);
      return { "x-username": username, "x-password": password };
    }
  } catch {}
  return {};
}

export async function fetchQBankQuestions(params: {
  limit?: number;
  offset?: number;
  bodySystem?: string;
  shuffle?: boolean;
  tier?: string;
}): Promise<QBankResponse> {
  const query = new URLSearchParams();
  if (params.limit) query.set("limit", String(params.limit));
  if (params.offset) query.set("offset", String(params.offset));
  if (params.bodySystem) query.set("bodySystem", params.bodySystem);
  if (params.shuffle) query.set("shuffle", "true");
  if (params.tier) query.set("tier", params.tier);

  const res = await fetch(`/api/qbank?${query.toString()}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error || "Failed to fetch questions");
  }
  return res.json();
}

export async function fetchExamSet(params: {
  count?: number;
  bodySystems?: string[];
  tier?: string;
}): Promise<ExamSetResponse> {
  const query = new URLSearchParams();
  if (params.count) query.set("count", String(params.count));
  if (params.bodySystems && params.bodySystems.length > 0) {
    query.set("bodySystems", params.bodySystems.join(","));
  }
  if (params.tier) query.set("tier", params.tier);

  const res = await fetch(`/api/qbank/exam-set?${query.toString()}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error || "Failed to fetch exam set");
  }
  return res.json();
}

export async function submitAttempt(questionId: string, selectedOption: number): Promise<AttemptResponse> {
  const res = await fetch("/api/qbank/attempt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ questionId, selectedOption }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error || "Failed to submit answer");
  }
  return res.json();
}

export async function fetchQBankStats(): Promise<QBankStats> {
  const res = await fetch("/api/qbank/stats", {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error || "Failed to fetch stats");
  }
  return res.json();
}

export async function fetchBodySystems(tier?: string): Promise<string[]> {
  const query = tier ? `?tier=${tier}` : "";
  const res = await fetch(`/api/qbank/body-systems${query}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.bodySystems || [];
}
