import { createHash, randomBytes } from "crypto";

/** URL-safe single-use token (opaque). */
export function generateOpaqueToken(): string {
  return randomBytes(32).toString("base64url");
}

/** Store only this in the database; never log the raw token. */
export function hashTokenForStorage(raw: string): string {
  return createHash("sha256").update(raw, "utf8").digest("hex");
}
