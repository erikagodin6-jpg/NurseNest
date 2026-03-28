import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

/** Allowed object key prefixes in the marketing bucket (screens + brand marks). */
const ALLOW_PREFIXES = ["screenshots/", "brand/", "branding/"] as const;

function isAllowedKey(key: string): boolean {
  if (key.includes("..")) return false;
  return ALLOW_PREFIXES.some((p) => key.startsWith(p));
}

function getS3Client(): S3Client | null {
  const accessKeyId = process.env.SPACES_KEY?.trim();
  const secretAccessKey = process.env.SPACES_SECRET?.trim();
  if (!accessKeyId || !secretAccessKey) return null;

  const region = process.env.SPACES_REGION?.trim() || "tor1";
  const endpoint =
    process.env.SPACES_ENDPOINT?.trim() || `https://${region}.digitaloceanspaces.com`;

  return new S3Client({
    endpoint,
    region: "us-east-1",
    credentials: { accessKeyId, secretAccessKey },
    forcePathStyle: false,
  });
}

function contentTypeForKey(key: string): string {
  const lower = key.toLowerCase();
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".gif")) return "image/gif";
  if (lower.endsWith(".svg")) return "image/svg+xml";
  return "application/octet-stream";
}

/**
 * Streams marketing images from DigitalOcean Spaces (private bucket safe).
 * Path must start with `screenshots/`, `brand/`, or `branding/` — matches keys in `nursenest-images`.
 */
export async function GET(
  _req: Request,
  ctx: { params: Promise<{ path: string[] }> },
): Promise<Response> {
  const { path: segments } = await ctx.params;
  const key = segments.map((s) => decodeURIComponent(s)).join("/");

  if (!isAllowedKey(key)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const bucket = process.env.SPACES_BUCKET?.trim() || "nursenest-images";
  const client = getS3Client();

  if (!client) {
    return NextResponse.json(
      {
        error: "Marketing asset proxy not configured",
        hint: "Set SPACES_KEY and SPACES_SECRET on the server, or set NEXT_PUBLIC_MARKETING_USE_SPACES_PROXY=false and make the Space public.",
      },
      { status: 503 },
    );
  }

  try {
    const out = await client.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      }),
    );

    const body = out.Body;
    if (!body) {
      return NextResponse.json({ error: "Empty object" }, { status: 502 });
    }

    const ct = out.ContentType || contentTypeForKey(key);
    const buf = await body.transformToByteArray();

    return new NextResponse(Buffer.from(buf), {
      status: 200,
      headers: {
        "Content-Type": ct,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (e: unknown) {
    const name = (e as { name?: string })?.name;
    const status = (e as { $metadata?: { httpStatusCode?: number } })?.$metadata?.httpStatusCode;
    if (name === "NoSuchKey" || name === "NotFound" || status === 404) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    console.error("[marketing-assets]", key, e);
    return NextResponse.json({ error: "Upstream error" }, { status: 502 });
  }
}
