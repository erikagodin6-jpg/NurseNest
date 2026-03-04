import jwt from "jsonwebtoken";
import { pool } from "./storage";

const JWT_SECRET = () => process.env.ADMIN_JWT_SECRET || "fallback-dev-secret-change-me";
const SERVER_API_KEY = () => process.env.ADMIN_API_KEY || "";
const TOKEN_EXPIRY_SECONDS = 1800;

export interface AdminTokenPayload {
  sub: string;
  username: string;
  role: "admin";
  iat: number;
  exp: number;
}

export function signAdminToken(adminId: string, username: string): { accessToken: string; expiresInSeconds: number } {
  const payload = { sub: adminId, username, role: "admin" as const };
  const accessToken = jwt.sign(payload, JWT_SECRET(), { expiresIn: TOKEN_EXPIRY_SECONDS });
  return { accessToken, expiresInSeconds: TOKEN_EXPIRY_SECONDS };
}

export function verifyAdminToken(token: string): AdminTokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET()) as AdminTokenPayload;
    if (decoded.role !== "admin") return null;
    return decoded;
  } catch {
    return null;
  }
}

export async function requireAdmin(req: any, res: any): Promise<any> {
  const authHeader = String(req.headers?.["authorization"] || "");
  if (authHeader.startsWith("Bearer ")) {
    const token = authHeader.slice(7).trim();

    const decoded = verifyAdminToken(token);
    if (decoded) {
      const r = await pool.query("SELECT * FROM users WHERE id = $1 AND tier = 'admin'", [decoded.sub]);
      if (r.rows[0]) return r.rows[0];
    }

    const serverKey = SERVER_API_KEY();
    if (serverKey && token === serverKey) {
      const adminId = String(req.headers?.["x-admin-id"] || "");
      if (adminId) {
        const r = await pool.query("SELECT * FROM users WHERE id = $1 AND tier = 'admin'", [adminId]);
        if (r.rows[0]) return r.rows[0];
      }
      const r = await pool.query("SELECT * FROM users WHERE tier = 'admin' LIMIT 1");
      if (r.rows[0]) return r.rows[0];
    }
  }

  const username = String(req.body?.username || req.query?.username || "");
  const password = String(req.body?.password || req.query?.password || "");
  if (username && password) {
    const r = await pool.query("SELECT * FROM users WHERE username = $1 AND password = $2 AND tier = 'admin'", [username, password]);
    if (r.rows[0]) return r.rows[0];
  }

  const adminId = String(req.headers?.["x-admin-id"] || req.body?.adminId || req.query?.adminId || "");
  if (adminId) {
    const r = await pool.query("SELECT * FROM users WHERE id = $1 AND tier = 'admin'", [adminId]);
    if (r.rows[0]) return r.rows[0];
  }

  res.status(401).json({ error: "Unauthorized" });
  return null;
}

export async function requireInternal(req: any, res: any): Promise<boolean> {
  const authHeader = String(req.headers?.["authorization"] || "");
  if (authHeader.startsWith("Bearer ")) {
    const token = authHeader.slice(7).trim();
    const serverKey = SERVER_API_KEY();
    if (serverKey && token === serverKey) return true;
  }
  res.status(401).json({ error: "Unauthorized" });
  return false;
}

export async function requireInternalOrAdmin(req: any, res: any): Promise<any> {
  const authHeader = String(req.headers?.["authorization"] || "");
  if (authHeader.startsWith("Bearer ")) {
    const token = authHeader.slice(7).trim();

    const serverKey = SERVER_API_KEY();
    if (serverKey && token === serverKey) {
      const adminId = String(req.headers?.["x-admin-id"] || "");
      if (adminId) {
        const r = await pool.query("SELECT * FROM users WHERE id = $1 AND tier = 'admin'", [adminId]);
        if (r.rows[0]) return r.rows[0];
      }
      const r = await pool.query("SELECT * FROM users WHERE tier = 'admin' LIMIT 1");
      if (r.rows[0]) return r.rows[0];
      return { id: "internal", username: "system", tier: "admin" };
    }

    const decoded = verifyAdminToken(token);
    if (decoded) {
      const r = await pool.query("SELECT * FROM users WHERE id = $1 AND tier = 'admin'", [decoded.sub]);
      if (r.rows[0]) return r.rows[0];
    }
  }

  const adminId = String(req.headers?.["x-admin-id"] || "");
  if (adminId) {
    const r = await pool.query("SELECT * FROM users WHERE id = $1 AND tier = 'admin'", [adminId]);
    if (r.rows[0]) return r.rows[0];
  }

  res.status(401).json({ error: "Unauthorized" });
  return null;
}
