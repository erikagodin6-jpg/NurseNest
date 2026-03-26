import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(req: Request) {
  const signature = (await headers()).get("stripe-signature");
  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 400 });
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
