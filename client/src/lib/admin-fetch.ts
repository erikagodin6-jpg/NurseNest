function getStoredApiKey(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem("nursenest-admin-api-key");
  } catch {
    return null;
  }
}

function getStoredAdminId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("nursenest-user");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.tier === "admin" && parsed?.id) return String(parsed.id);
  } catch {}
  return null;
}

export function getAdminParams(): string {
  return "";
}

export async function adminFetch(
  url: string,
  init: (RequestInit & { body?: any }) = {}
): Promise<Response> {
  const method = (init.method ?? "GET").toUpperCase();
  const apiKey = getStoredApiKey();
  const adminId = getStoredAdminId();

  const isAbsolute = /^https?:\/\//i.test(url);
  const base =
    typeof window !== "undefined" ? window.location.origin : "http://localhost";
  const u = new URL(url, isAbsolute ? undefined : base);

  const headers = new Headers(init.headers ?? {});
  if (apiKey) {
    headers.set("Authorization", `Bearer ${apiKey}`);
  }
  if (adminId) {
    headers.set("x-admin-id", adminId);
  }

  const out: RequestInit = { ...init, method, headers };

  if (method === "GET" || method === "HEAD") {
    delete (out as any).body;
  } else {
    let bodyObj: any = {};

    if (init.body !== undefined && init.body !== null) {
      if (typeof init.body === "string") {
        try {
          bodyObj = JSON.parse(init.body);
        } catch {
          bodyObj = { payload: init.body };
        }
      } else if (typeof init.body === "object") {
        bodyObj = init.body;
      } else {
        bodyObj = { payload: init.body };
      }
    }

    if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json");
    out.body = JSON.stringify(bodyObj);
  }

  const finalUrl = isAbsolute ? u.toString() : `${u.pathname}${u.search}`;
  return fetch(finalUrl, out);
}
