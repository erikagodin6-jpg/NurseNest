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

export async function adminFetch(url: string, init: RequestInit & { body?: any } = {}): Promise<Response> {
  const creds = getStoredCredentials();
  const method = (init.method || "GET").toUpperCase();
  const headers = new Headers(init.headers || {});

  const out: RequestInit = {
    ...init,
    method,
    credentials: "include",
    headers,
  };

  if (method === "GET" || method === "HEAD") {
    delete (out as any).body;
    if (creds) {
      const separator = url.includes("?") ? "&" : "?";
      url = `${url}${separator}username=${encodeURIComponent(creds.username)}&password=${encodeURIComponent(creds.password)}`;
    }
  } else if (init.body !== undefined) {
    let bodyObj: any;
    if (typeof init.body === "string") {
      try {
        bodyObj = JSON.parse(init.body);
      } catch {
        bodyObj = {};
      }
    } else {
      bodyObj = init.body;
    }
    if (creds) {
      bodyObj.username = bodyObj.username || creds.username;
      bodyObj.password = bodyObj.password || creds.password;
    }
    out.body = JSON.stringify(bodyObj);
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
  } else if (creds) {
    out.body = JSON.stringify({ username: creds.username, password: creds.password });
    headers.set("Content-Type", "application/json");
  }

  return fetch(url, out);
}
