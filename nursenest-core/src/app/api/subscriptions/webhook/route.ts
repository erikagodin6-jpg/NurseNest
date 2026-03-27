import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { prisma } from "@/lib/db";

/** Dynamic import so Next build (collect page data) never loads Stripe without a key. */
async function getStripeClient(): Promise<Stripe | null> {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) return null;
  const { default: Stripe } = await import("stripe");
  return new Stripe(key);
}

export async function POST(req: Request) {
  const signature = (await headers()).get("stripe-signature");
  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 400 });
  }

  const stripe = await getStripeClient();
  if (!stripe) {
    return NextResponse.json({ error: "Billing unavailable" }, { status: 503 });
  }

  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    if (userId) {
      await prisma.subscription.upsert({
        where: { stripeSubscriptionId: String(session.subscription ?? "") },
        update: { status: "ACTIVE" },
        create: {
          userId,
          status: "ACTIVE",
          stripeSubscriptionId: String(session.subscription ?? ""),
          stripeCustomerId: String(session.customer ?? ""),
        },
      });
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    await prisma.subscription.updateMany({
      where: { stripeSubscriptionId: subscription.id },
      data: { status: "CANCELLED" },
    });
  }

  return NextResponse.json({ ok: true });
}
