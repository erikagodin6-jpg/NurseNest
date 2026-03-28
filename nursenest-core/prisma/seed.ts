import { hash } from "bcryptjs";
import { ContentStatus } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const fundamentals = await prisma.category.upsert({
    where: { slug: "fundamentals" },
    update: {},
    create: { name: "Fundamentals", slug: "fundamentals", topicCode: "fundamentals" },
  });

  await prisma.lesson.createMany({
    data: [
      {
        title: "CA RPN Fluid Balance",
        slug: "ca-rpn-fluid-balance",
        summary: "Essential fluid and electrolyte foundations.",
        body: "Sample lesson content for CA RPN.",
        country: "CA",
        tier: "RPN",
        status: ContentStatus.PUBLISHED,
        categoryId: fundamentals.id,
      },
      {
        title: "US LVN/LPN Infection Control",
        slug: "us-lvn-infection-control",
        summary: "Practical infection prevention for NCLEX-PN style prep.",
        body: "Sample lesson content for US LVN/LPN.",
        country: "US",
        tier: "LVN_LPN",
        status: ContentStatus.PUBLISHED,
        categoryId: fundamentals.id,
      },
      {
        title: "RN Clinical Prioritization",
        slug: "rn-clinical-prioritization",
        summary: "Prioritization and delegation essentials.",
        body: "Sample lesson content for RN.",
        country: "CA",
        tier: "RN",
        status: ContentStatus.PUBLISHED,
        categoryId: fundamentals.id,
      },
      {
        title: "NP Differential Diagnosis Foundations",
        slug: "np-differential-diagnosis",
        summary: "Structured clinical reasoning for NP pathways.",
        body: "Sample lesson content for NP.",
        country: "US",
        tier: "NP",
        status: ContentStatus.PUBLISHED,
        categoryId: fundamentals.id,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.question.createMany({
    data: [
      {
        stem: "A client with dehydration has BP 88/54. Which action is priority?",
        rationale: "Restore intravascular volume promptly and reassess perfusion.",
        options: ["Start isotonic fluids", "Encourage oral fluids only", "Restrict sodium", "Delay intervention"],
        answerKey: ["Start isotonic fluids"],
        questionType: "MCQ",
        country: "CA",
        tier: "RPN",
        status: ContentStatus.PUBLISHED,
        categoryId: fundamentals.id,
      },
      {
        stem: "Select all findings consistent with hypoglycemia.",
        rationale: "Sweating, tremor, confusion, and tachycardia are typical signs.",
        options: ["Diaphoresis", "Bradycardia", "Confusion", "Tremor"],
        answerKey: ["Diaphoresis", "Confusion", "Tremor"],
        questionType: "SATA",
        country: "US",
        tier: "RN",
        status: ContentStatus.PUBLISHED,
        categoryId: fundamentals.id,
      },
      {
        stem: "A CA hospital unit is short-staffed. Which duty aligns with RN scope first?",
        rationale: "Prioritize safe patient assignments and escalate staffing per policy.",
        options: ["Accept all additional patients alone", "Delegate assessments to unlicensed staff without supervision", "Report unsafe staffing and stabilize current assignments", "Leave the unit"],
        answerKey: ["Report unsafe staffing and stabilize current assignments"],
        questionType: "MCQ",
        country: "CA",
        tier: "RN",
        status: ContentStatus.PUBLISHED,
        categoryId: fundamentals.id,
      },
    ],
    skipDuplicates: true,
  });

  const exam = await prisma.exam.create({
    data: { title: "Core Readiness Exam", country: "CA", tier: "RN", status: ContentStatus.PUBLISHED },
  });

  const adminHash = await hash("AdminPass123!", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@nursenest.ca" },
    update: {},
    create: {
      email: "admin@nursenest.ca",
      name: "NurseNest Admin",
      passwordHash: adminHash,
      role: "ADMIN",
      country: "CA",
      tier: "RN",
    },
  });

  await prisma.subscription.upsert({
    where: { stripeSubscriptionId: "seed-sub-admin" },
    update: { status: "ACTIVE" },
    create: {
      userId: admin.id,
      stripeSubscriptionId: "seed-sub-admin",
      stripeCustomerId: "seed-customer-admin",
      status: "ACTIVE",
    },
  });

  await prisma.examAttempt.create({
    data: {
      userId: admin.id,
      examId: exam.id,
      score: 8,
      total: 10,
    },
  });
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
