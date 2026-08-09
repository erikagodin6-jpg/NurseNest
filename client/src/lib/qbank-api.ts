export interface QBankOption {
  id: string;
  text: string;
  label?: string;
}

export interface ServerQuestion {
  id: string;
  tier: string;
  exam: string;
  questionType: string;
  stem: string;
  /** Legacy display surface; server may still return primitive strings during cutover. */
  options: Array<string | QBankOption>;
  /** Canonical stable options when the v2 serving contract is available. */
  optionObjects?: QBankOption[];
  correctAnswer?: Array<number | string> | number | string;
  correctAnswerIds?: string[];
  bodySystem: string;
  topic: string;
  subtopic?: string;
  difficulty: number | null;
  regionScope?: string;
  countryCode?: string;
  countryLabels?: string[];
  languageCode?: string;
  rationale?: string;
  scenario?: string;
  clinicalPearl?: string;
  examStrategy?: string;
  hint?: string;
  whyThisMatters?: string;
  memoryHook?: string;
  mnemonic?: string;
  frameworkUsed?: string;
  clinicalTrap?: string;
  correctAnswerExplanation?: string;
  distractorRationales?: Record<string, string>;
  unitSystemSupport?: { supported?: string[]; default?: string };
  unitVariants?: any[];
  optionContractVersion?: number;
  publicationContractVersion?: number;
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
  /** Compatibility answer payload; stable IDs are authoritative when present. */
  correctAnswer?: Array<number | string> | number | string;
  correctAnswerIds?: string[];
  rationale: string;
  correctAnswerExplanation?: string | null;
  distractorRationales?: Record<string, string> | null;
  clinicalPearl?: string | null;
  hint?: string | null;
  whyThisMatters?: string | null;
  mnemonic?: string | null;
  bodySystem: string;
}

export interface QBankStats {
  bodySystems: { body_system: string; count: string; tier?: string }[];
  total: number;
  tier: string;
}

export function getAuthHeaders(): Record<string, string> {
  try {
    const expiresAt = localStorage.getItem("nn_admin_expires_at");
    const token = localStorage.getItem("nn_admin_access_token");
    if (token && (!expiresAt || Date.now() < Number(expiresAt))) {
      return { "Authorization": `Bearer ${token}` };
    }
  } catch {}
  try {
    const creds = localStorage.getItem("nursenest-credentials");
    if (creds) {
      const { username, password } = JSON.parse(creds);
      if (username && password) {
        return { "x-username": username, "x-password": password };
      }
    }
  } catch {}
  try {
    const userToken = localStorage.getItem("nursenest-user-token");
    if (userToken) return { "x-user-token": userToken };
  } catch {}
  try {
    const stored = localStorage.getItem("nursenest-user");
    if (stored) {
      const { id } = JSON.parse(stored);
      if (id) return { "x-user-id": id };
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
  exam?: string;
  difficulty?: string;
  topic?: string;
  region?: string;
}): Promise<ExamSetResponse> {
  const query = new URLSearchParams();
  if (params.count) query.set("count", String(params.count));
  if (params.bodySystems && params.bodySystems.length > 0) {
    query.set("bodySystems", params.bodySystems.join(","));
  }
  if (params.tier) query.set("tier", params.tier);
  if (params.exam) query.set("exam", params.exam);
  if (params.difficulty) query.set("difficulty", params.difficulty);
  if (params.topic) query.set("topic", params.topic);
  if (params.region) query.set("region", params.region);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  let res: Response;
  try {
    res = await fetch(`/api/qbank/exam-set?${query.toString()}`, {
      headers: getAuthHeaders(),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    if (res.status === 403) {
      throw new Error("Upgrade required — this exam feature requires a paid subscription.");
    }
    if (res.status === 401) {
      throw new Error("Authentication required — please log in to access exam questions.");
    }
    throw new Error(err.error || "Failed to fetch exam set");
  }
  return res.json();
}

export interface FilterOptions {
  exams: string[];
  categories: string[];
  difficulties: { value: number; label: string }[];
  topics: string[];
  tier: string;
}

export async function fetchFilterOptions(tier?: string): Promise<FilterOptions> {
  const query = tier ? `?tier=${tier}` : "";
  const res = await fetch(`/api/qbank/filter-options${query}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    return { exams: [], categories: [], difficulties: [], topics: [], tier: tier || "" };
  }
  return res.json();
}

/**
 * Submit a stable option ID whenever available. Numeric index is retained only for
 * temporary compatibility with questions that have not completed the v2 serving cutover.
 */
export async function submitAttempt(questionId: string, selectedOption: string | number): Promise<AttemptResponse> {
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

export async function fetchQBankStats(tier?: string): Promise<QBankStats> {
  const query = tier ? `?tier=${tier}` : "";
  const res = await fetch(`/api/qbank/stats${query}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error || "Failed to fetch stats");
  }
  return res.json();
}

export interface InternationalExamStats {
  exam: string;
  countryCode: string;
  licensingBody: string;
  total: number;
  mockEligible: number;
  domains: { domain: string; count: number }[];
}

export async function fetchInternationalStats(): Promise<Record<string, InternationalExamStats>> {
  const res = await fetch("/api/qbank/international-stats");
  if (!res.ok) return {};
  const data = await res.json();
  return data.stats || {};
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