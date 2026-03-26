import { NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@/lib/auth";
import { priceMap } from "@/lib/stripe/pricing-map";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(req: Request) {
  const session = await auth();
  const userId = (session?.user as any)?.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const country = body.country as "CA" | "US";
  const tier = body.tier as "RPN" | "LVN_LPN" | "RN" | "NP";
  const duration = body.duration as "monthly" | "3-month" | "6-month" | "yearly";

  const price = priceMap.find((p) => p.country === country && p.tier === tier && p.duration === duration);
  if (!price) {
    return NextResponse.json({ error: "Plan unavailable" }, { status: 400 });
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: price.priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/app?checkout=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?checkout=cancelled`,
    metadata: { userId, country, tier, duration },
  });

  return NextResponse.json({ url: checkoutSession.url });
}
