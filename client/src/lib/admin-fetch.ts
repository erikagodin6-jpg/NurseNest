const CREDS_KEY = "nursenest-credentials";

interface StoredCredentials {
  username: string;
  password: string;
}

export function getStoredCredentials(): StoredCredentials | null {
  try {
    const stored = localStorage.getItem(CREDS_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    if (parsed.username && parsed.password) return parsed;
    return null;
  } catch {
    return null;
  }
}

export function getAdminParams(extra?: Record<string, string>): string {
  const creds = getStoredCredentials();
  const params = new URLSearchParams();
  if (creds) {
    params.set("username", creds.username);
    params.set("password", creds.password);
  }
  if (extra) {
    Object.entries(extra).forEach(([k, v]) => params.set(k, v));
  }
  const str = params.toString();
  return str ? `?${str}` : "";
}

export async function adminFetch(url: string, options?: RequestInit): Promise<Response> {
  const creds = getStoredCredentials();
  const headers: Record<string, string> = {
    ...(options?.headers as Record<string, string> || {}),
  };

  if (options?.method && options.method !== "GET" && creds) {
    headers["Content-Type"] = headers["Content-Type"] || "application/json";
    if (options.body && typeof options.body === "string") {
      try {
        const body = JSON.parse(options.body);
        body.username = body.username || creds.username;
        body.password = body.password || creds.password;
        options = { ...options, body: JSON.stringify(body) };
      } catch {}
    }
  }

  return fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });
}
