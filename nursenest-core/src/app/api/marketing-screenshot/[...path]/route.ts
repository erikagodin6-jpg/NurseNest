import { NextResponse } from "next/server";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Readable } from "node:stream";

export const runtime = "nodejs";

/** Only flat keys under screenshots/ (matches generated marketing asset keys). */
const ALLOWED_KEY = /^screenshots\/[a-zA-Z0-9._-]+\.(webp|png|jpe?g|svg)$/;

function contentTypeForKey(key: string): string {
  const ext = key.split(".").pop()?.toLowerCase();
  if (ext === "webp") return "image/webp";
  if (ext === "png") return "image/png";
  if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
  if (ext === "svg") return "image/svg+xml";
  return "application/octet-stream";
}

export async function GET(_request: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  if (!path?.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const key = path.join("/");
  if (!ALLOWED_KEY.test(key)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const accessKeyId = process.env.SPACES_KEY?.trim();
  const secretAccessKey = process.env.SPACES_SECRET?.trim();
  const region = process.env.SPACES_REGION?.trim();
  const bucket = process.env.SPACES_BUCKET?.trim();

  if (!accessKeyId || !secretAccessKey || !region || !bucket) {
    return NextResponse.json(
      { error: "Marketing screenshot proxy is not configured (missing SPACES_*)." },
      { status: 503 },
    );
  }

  const endpoint =
    process.env.SPACES_ENDPOINT?.trim() || `https://${region}.digitaloceanspaces.com`;

  const client = new S3Client({
    region,
    endpoint,
    credentials: { accessKeyId, secretAccessKey },
    forcePathStyle: false,
  });

  try {
    const out = await client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
    const body = out.Body;
    if (!body) {
      return NextResponse.json({ error: "Empty object" }, { status: 404 });
    }

    const headers = new Headers();
    headers.set("Content-Type", contentTypeForKey(key));
    headers.set("Cache-Control", "public, max-age=86400, stale-while-revalidate=604800");

    const stream = body as unknown as Readable;
    const web = Readable.toWeb(stream);
    return new Response(web as unknown as BodyInit, { status: 200, headers });
  } catch (e) {
    console.error("[marketing-screenshot]", key, e);
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
