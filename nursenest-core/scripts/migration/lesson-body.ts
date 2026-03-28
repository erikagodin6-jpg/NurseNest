/**
 * Serialize legacy LessonContent (loosely typed) into a single markdown body for Prisma `Lesson.body`.
 */
export function lessonContentToMarkdown(lessonId: string, c: Record<string, unknown>): string {
  const title = String(c.title ?? lessonId);
  const parts: string[] = [`# ${title}`, ""];

  const cellular = c.cellular;
  if (typeof cellular === "string") {
    parts.push(cellular);
  } else if (cellular && typeof cellular === "object") {
    const cell = cellular as { title?: string; content?: string };
    if (cell.title || cell.content) {
      parts.push(`## ${cell.title ?? "Overview"}`, "", String(cell.content ?? ""));
    }
  }

  const pushList = (heading: string, key: string) => {
    const v = c[key];
    if (!Array.isArray(v) || v.length === 0) return;
    parts.push("", `## ${heading}`, "");
    for (const item of v) parts.push(`- ${String(item)}`);
  };

  pushList("Risk factors", "riskFactors");
  pushList("Diagnostics", "diagnostics");
  pushList("Management", "management");
  pushList("Nursing actions", "nursingActions");
  pushList("Assessment findings", "assessmentFindings");

  const signs = c.signs;
  if (signs) {
    parts.push("", "## Signs & symptoms", "");
    if (Array.isArray(signs)) {
      for (const s of signs) parts.push(`- ${String(s)}`);
    } else if (typeof signs === "object") {
      const sg = signs as { left?: string[]; right?: string[] };
      if (sg.left?.length) {
        parts.push("### Concerning for stability", "");
        for (const s of sg.left) parts.push(`- ${s}`);
      }
      if (sg.right?.length) {
        parts.push("", "### Concerning for deterioration", "");
        for (const s of sg.right) parts.push(`- ${s}`);
      }
    }
  }

  const meds = c.medications;
  if (Array.isArray(meds) && meds.length > 0) {
    parts.push("", "## Medications", "");
    for (const med of meds) {
      if (med && typeof med === "object") {
        const m = med as Record<string, string>;
        const line = [m.name, m.type, m.action, m.pearl].filter(Boolean).join(" — ");
        if (line) parts.push(`- ${line}`);
      }
    }
  }

  const pearls = c.pearls;
  if (Array.isArray(pearls) && pearls.length) {
    parts.push("", "## Clinical pearls", "");
    for (const p of pearls) parts.push(`- ${String(p)}`);
  }

  const lifespan = c.lifespan;
  if (lifespan && typeof lifespan === "object") {
    const ls = lifespan as { title?: string; content?: string };
    parts.push("", `## ${ls.title ?? "Lifespan considerations"}`, "", String(ls.content ?? ""));
  }

  const image = c.image;
  if (typeof image === "string" && image.length > 0) {
    parts.push("", `![illustration](${image})`, "");
  }

  const quiz = c.quiz;
  if (Array.isArray(quiz) && quiz.length > 0) {
    parts.push("", "## Practice questions (embedded in legacy lesson)", "");
    let i = 1;
    for (const q of quiz) {
      if (q && typeof q === "object") {
        const qq = q as { question?: string };
        parts.push(`${i}. ${String(qq.question ?? "")}`);
        i++;
      }
    }
    parts.push("", "_Review items may also appear in the global question bank._");
  }

  return parts.join("\n").trim();
}

export function summaryFromBody(body: string, title: string): string {
  const plain = body.replace(/[#*_`]/g, " ").replace(/\s+/g, " ").trim();
  if (plain.length <= 320) return plain || title;
  return `${plain.slice(0, 317)}…`;
}
