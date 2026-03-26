import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  country: z.enum(["CA", "US"]),
  tier: z.enum(["RPN", "LVN_LPN", "RN", "NP"]),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const exists = await prisma.user.findUnique({
    where: { email: parsed.data.email.toLowerCase() },
    select: { id: true },
  });
  if (exists) {
    return NextResponse.json({ error: "Email already in use" }, { status: 409 });
  }

  const passwordHash = await hash(parsed.data.password, 12);
  await prisma.user.create({
    data: {
      email: parsed.data.email.toLowerCase(),
      name: parsed.data.name,
      passwordHash,
      country: parsed.data.country,
      tier: parsed.data.tier,
      role: "LEARNER",
    },
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
