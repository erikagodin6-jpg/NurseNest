type StoredCreds = { username: string; password: string };

function getStoredCredentials(): StoredCreds | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("nursenest-credentials");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.username || !parsed?.password) return null;
    return { username: String(parsed.username), password: String(parsed.password) };
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
  const creds = getStoredCredentials();
  if (!creds) return "";
  const sp = new URLSearchParams();
  sp.set("username", creds.username);
  sp.set("password", creds.password);
  return sp.toString();
}

export async function adminFetch(
  url: string,
  init: (RequestInit & { body?: any }) = {}
): Promise<Response> {
  const method = (init.method ?? "GET").toUpperCase();
  const creds = getStoredCredentials();

  const isAbsolute = /^https?:\/\//i.test(url);
  const base =
    typeof window !== "undefined" ? window.location.origin : "http://localhost";
  const u = new URL(url, isAbsolute ? undefined : base);

  const headers = new Headers(init.headers ?? {});
  const out: RequestInit = { ...init, method, headers };

  const adminId = getStoredAdminId();

  if (method === "GET" || method === "HEAD") {
    if (creds) {
      u.searchParams.set("username", creds.username);
      u.searchParams.set("password", creds.password);
    } else if (adminId) {
      u.searchParams.set("adminId", adminId);
    }
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

    if (creds) {
      if (bodyObj.username === undefined) bodyObj.username = creds.username;
      if (bodyObj.password === undefined) bodyObj.password = creds.password;
    } else if (adminId) {
      if (bodyObj.adminId === undefined) bodyObj.adminId = adminId;
    }

    if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json");
    out.body = JSON.stringify(bodyObj);
  }

  const finalUrl = isAbsolute ? u.toString() : `${u.pathname}${u.search}`;
  return fetch(finalUrl, out);
}
