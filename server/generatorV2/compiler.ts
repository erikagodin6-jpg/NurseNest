import { storage } from "../storage";

const W = 612;
const H = 792;
const M = 46;
const CONTENT_W = W - M * 2;
const HEADER_H = 30;
const FOOTER_H = 25;
const USABLE_TOP = M + HEADER_H;
const USABLE_BOTTOM = H - M - FOOTER_H;
const USABLE_HEIGHT = USABLE_BOTTOM - USABLE_TOP;

interface CanvasObject {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
  fontSize?: number;
  fontWeight?: string;
  fill?: string;
  fontFamily?: string;
  rotation: number;
  opacity: number;
  zIndex: number;
  textAlign?: string;
  borderRadius?: number;
  items?: string[];
  headers?: string[];
  rows?: string[][];
}

interface CompiledPage {
  id: string;
  title: string;
  objects: CanvasObject[];
  backgroundColor: string;
}

let uidCounter = 0;
function uid(): string {
  return `cv2_${Date.now()}_${++uidCounter}`;
}

const THEME = {
  bg: "#FAFBFF",
  primary: "#4A6FA5",
  accent: "#7BA7BC",
  heading: "#2D3748",
  body: "#4A5568",
  bodyLight: "#718096",
  sectionBg: "#EDF2F7",
  headingFont: "DM Sans",
  bodyFont: "DM Sans",
};

function makeHeader(pageNum: number, title: string, z: number): CanvasObject[] {
  return [
    { id: uid(), type: "rect", x: 0, y: 0, width: W, height: 4, fill: THEME.primary, rotation: 0, opacity: 0.8, zIndex: z++ },
    { id: uid(), type: "rect", x: 0, y: 4, width: W, height: 2, fill: THEME.accent, rotation: 0, opacity: 0.5, zIndex: z++ },
    { id: uid(), type: "text", x: M, y: 12, width: CONTENT_W * 0.7, height: 14, content: title, fontSize: 8, fontWeight: "600", fill: THEME.bodyLight, fontFamily: THEME.bodyFont, rotation: 0, opacity: 0.5, zIndex: z++ },
    { id: uid(), type: "text", x: M + CONTENT_W - 50, y: 12, width: 50, height: 14, content: `${pageNum}`, fontSize: 8, fontWeight: "600", fill: THEME.bodyLight, fontFamily: THEME.bodyFont, rotation: 0, opacity: 0.3, zIndex: z++, textAlign: "right" },
  ];
}

function makeFooter(z: number): CanvasObject[] {
  return [
    { id: uid(), type: "rect", x: 0, y: H - 2, width: W, height: 2, fill: THEME.primary, rotation: 0, opacity: 0.3, zIndex: z++ },
    { id: uid(), type: "text", x: M, y: H - 18, width: CONTENT_W, height: 12, content: "NurseNest - Exam Prep", fontSize: 7, fontWeight: "400", fill: THEME.bodyLight, fontFamily: THEME.bodyFont, rotation: 0, opacity: 0.3, zIndex: z++ },
  ];
}

function estimateTextHeight(text: string, fontSize: number, width: number): number {
  const avgCharWidth = fontSize * 0.5;
  const charsPerLine = Math.floor(width / avgCharWidth);
  const lines = Math.ceil(text.length / Math.max(charsPerLine, 1));
  return lines * (fontSize * 1.4) + 4;
}

function makeCoverPage(title: string, subtitle: string): CompiledPage {
  const objs: CanvasObject[] = [];
  let z = 0;
  objs.push({ id: uid(), type: "rect", x: 0, y: 0, width: W, height: H, fill: THEME.bg, rotation: 0, opacity: 1, zIndex: z++ });
  objs.push({ id: uid(), type: "rect", x: 0, y: 0, width: W, height: 8, fill: THEME.primary, rotation: 0, opacity: 1, zIndex: z++ });
  objs.push({ id: uid(), type: "rect", x: 0, y: 8, width: W, height: 3, fill: THEME.accent, rotation: 0, opacity: 0.6, zIndex: z++ });
  objs.push({ id: uid(), type: "rect", x: M, y: H * 0.3, width: CONTENT_W, height: 120, fill: THEME.sectionBg, borderRadius: 12, rotation: 0, opacity: 1, zIndex: z++ });
  objs.push({ id: uid(), type: "rect", x: M, y: H * 0.3, width: 5, height: 120, fill: THEME.primary, borderRadius: 3, rotation: 0, opacity: 0.9, zIndex: z++ });
  objs.push({ id: uid(), type: "text", x: M + 20, y: H * 0.3 + 20, width: CONTENT_W - 40, height: 40, content: title, fontSize: 28, fontWeight: "bold", fill: THEME.heading, fontFamily: THEME.headingFont, rotation: 0, opacity: 1, zIndex: z++ });
  objs.push({ id: uid(), type: "text", x: M + 20, y: H * 0.3 + 70, width: CONTENT_W - 40, height: 25, content: subtitle, fontSize: 14, fontWeight: "400", fill: THEME.body, fontFamily: THEME.bodyFont, rotation: 0, opacity: 0.8, zIndex: z++ });
  objs.push({ id: uid(), type: "text", x: M, y: H - 80, width: CONTENT_W, height: 20, content: "NurseNest Exam Prep", fontSize: 12, fontWeight: "600", fill: THEME.primary, fontFamily: THEME.headingFont, rotation: 0, opacity: 0.6, zIndex: z++, textAlign: "center" });
  return { id: uid(), title: "Cover", objects: objs, backgroundColor: THEME.bg };
}

function renderContentBlocksToPages(
  blocks: any[],
  sectionTitle: string,
  startPageNum: number,
): CompiledPage[] {
  const pages: CompiledPage[] = [];
  let currentObjects: CanvasObject[] = [];
  let curY = USABLE_TOP;
  let z = 10;
  let pageNum = startPageNum;

  function flushPage() {
    const objs = [
      { id: uid(), type: "rect" as const, x: 0, y: 0, width: W, height: H, fill: THEME.bg, rotation: 0, opacity: 1, zIndex: 0 },
      ...makeHeader(pageNum, sectionTitle, 1),
      ...currentObjects,
      ...makeFooter(900),
    ];
    pages.push({ id: uid(), title: `${sectionTitle} p${pageNum}`, objects: objs, backgroundColor: THEME.bg });
    currentObjects = [];
    curY = USABLE_TOP;
    z = 10;
    pageNum++;
  }

  function ensureSpace(needed: number) {
    if (curY + needed > USABLE_BOTTOM) flushPage();
  }

  for (const block of blocks) {
    const bType = block.type || "paragraph";
    const content = block.content || "";

    if (bType === "heading") {
      const h = 22;
      ensureSpace(h + 8);
      currentObjects.push({
        id: uid(), type: "text", x: M, y: curY, width: CONTENT_W, height: h,
        content, fontSize: 14, fontWeight: "bold", fill: THEME.heading,
        fontFamily: THEME.headingFont, rotation: 0, opacity: 1, zIndex: z++,
      });
      curY += h + 6;
    } else if (bType === "paragraph") {
      const h = estimateTextHeight(content, 9, CONTENT_W);
      ensureSpace(Math.min(h, 40));
      currentObjects.push({
        id: uid(), type: "text", x: M, y: curY, width: CONTENT_W, height: h,
        content, fontSize: 9, fontWeight: "400", fill: THEME.body,
        fontFamily: THEME.bodyFont, rotation: 0, opacity: 1, zIndex: z++,
      });
      curY += h + 4;
    } else if (bType === "bullets" && Array.isArray(block.items)) {
      for (const item of block.items) {
        const bulletText = `  - ${item}`;
        const h = estimateTextHeight(bulletText, 9, CONTENT_W - 15);
        ensureSpace(Math.min(h, 20));
        currentObjects.push({
          id: uid(), type: "text", x: M + 10, y: curY, width: CONTENT_W - 15, height: h,
          content: bulletText, fontSize: 9, fontWeight: "400", fill: THEME.body,
          fontFamily: THEME.bodyFont, rotation: 0, opacity: 1, zIndex: z++,
        });
        curY += h + 2;
      }
      curY += 4;
    } else if (bType === "callout" || bType === "pearl") {
      const h = estimateTextHeight(content, 9, CONTENT_W - 30) + 12;
      ensureSpace(h + 8);
      const variant = block.variant || (bType === "pearl" ? "info" : "warning");
      const bgColor = variant === "warning" ? "#FFF5F5" : "#F0FFF4";
      const borderColor = variant === "warning" ? "#E53E3E" : "#38A169";
      currentObjects.push({
        id: uid(), type: "rect", x: M, y: curY, width: CONTENT_W, height: h,
        fill: bgColor, borderRadius: 6, rotation: 0, opacity: 1, zIndex: z++,
      });
      currentObjects.push({
        id: uid(), type: "rect", x: M, y: curY, width: 3, height: h,
        fill: borderColor, borderRadius: 2, rotation: 0, opacity: 0.9, zIndex: z++,
      });
      currentObjects.push({
        id: uid(), type: "text", x: M + 12, y: curY + 6, width: CONTENT_W - 24, height: h - 12,
        content, fontSize: 9, fontWeight: "500", fill: THEME.body,
        fontFamily: THEME.bodyFont, rotation: 0, opacity: 1, zIndex: z++,
      });
      curY += h + 6;
    } else if (bType === "table" && Array.isArray(block.headers) && Array.isArray(block.rows)) {
      const colCount = block.headers.length;
      const colW = CONTENT_W / colCount;
      const rowH = 18;
      const totalH = (1 + block.rows.length) * rowH + 4;
      ensureSpace(Math.min(totalH, 60));
      currentObjects.push({
        id: uid(), type: "rect", x: M, y: curY, width: CONTENT_W, height: rowH,
        fill: THEME.primary, borderRadius: 0, rotation: 0, opacity: 0.1, zIndex: z++,
      });
      for (let c = 0; c < colCount; c++) {
        currentObjects.push({
          id: uid(), type: "text", x: M + c * colW + 4, y: curY + 2, width: colW - 8, height: rowH - 4,
          content: block.headers[c], fontSize: 8, fontWeight: "bold", fill: THEME.heading,
          fontFamily: THEME.bodyFont, rotation: 0, opacity: 1, zIndex: z++,
        });
      }
      curY += rowH;
      for (const row of block.rows) {
        ensureSpace(rowH);
        for (let c = 0; c < Math.min(row.length, colCount); c++) {
          currentObjects.push({
            id: uid(), type: "text", x: M + c * colW + 4, y: curY + 2, width: colW - 8, height: rowH - 4,
            content: row[c] || "", fontSize: 8, fontWeight: "400", fill: THEME.body,
            fontFamily: THEME.bodyFont, rotation: 0, opacity: 1, zIndex: z++,
          });
        }
        curY += rowH;
      }
      curY += 6;
    }
  }

  if (currentObjects.length > 0) flushPage();
  return pages;
}

function renderQuestionsToPages(
  questions: any[],
  startPageNum: number,
): { questionPages: CompiledPage[]; rationalePages: CompiledPage[] } {
  const questionPages: CompiledPage[] = [];
  const rationalePages: CompiledPage[] = [];
  let qObjs: CanvasObject[] = [];
  let rObjs: CanvasObject[] = [];
  let qY = USABLE_TOP;
  let rY = USABLE_TOP;
  let qZ = 10;
  let rZ = 10;
  let qPageNum = startPageNum;
  let rPageNum = 1;

  function flushQPage() {
    const objs = [
      { id: uid(), type: "rect" as const, x: 0, y: 0, width: W, height: H, fill: THEME.bg, rotation: 0, opacity: 1, zIndex: 0 },
      ...makeHeader(qPageNum, "Practice Questions", 1),
      ...qObjs,
      ...makeFooter(900),
    ];
    questionPages.push({ id: uid(), title: `Questions p${qPageNum}`, objects: objs, backgroundColor: THEME.bg });
    qObjs = [];
    qY = USABLE_TOP;
    qZ = 10;
    qPageNum++;
  }

  function flushRPage() {
    const objs = [
      { id: uid(), type: "rect" as const, x: 0, y: 0, width: W, height: H, fill: THEME.bg, rotation: 0, opacity: 1, zIndex: 0 },
      ...makeHeader(rPageNum, "Answer Key & Rationales", 1),
      ...rObjs,
      ...makeFooter(900),
    ];
    rationalePages.push({ id: uid(), title: `Rationales p${rPageNum}`, objects: objs, backgroundColor: THEME.bg });
    rObjs = [];
    rY = USABLE_TOP;
    rZ = 10;
    rPageNum++;
  }

  for (const q of questions) {
    const stemHeight = estimateTextHeight(q.stem || "", 9, CONTENT_W - 20);
    const choicesHeight = (Array.isArray(q.choices) ? q.choices.length : 4) * 14;
    const totalQHeight = 16 + stemHeight + choicesHeight + 8;

    if (qY + Math.min(totalQHeight, 50) > USABLE_BOTTOM) flushQPage();

    qObjs.push({
      id: uid(), type: "text", x: M, y: qY, width: 25, height: 14,
      content: `Q${q.idx}.`, fontSize: 8, fontWeight: "bold", fill: THEME.primary,
      fontFamily: THEME.bodyFont, rotation: 0, opacity: 1, zIndex: qZ++,
    });
    qObjs.push({
      id: uid(), type: "text", x: M + 4, y: qY + 1, width: 40, height: 10,
      content: `[${q.type}]`, fontSize: 6, fontWeight: "500", fill: THEME.accent,
      fontFamily: THEME.bodyFont, rotation: 0, opacity: 0.7, zIndex: qZ++,
    });
    qY += 14;

    qObjs.push({
      id: uid(), type: "text", x: M + 10, y: qY, width: CONTENT_W - 15, height: stemHeight,
      content: q.stem || "", fontSize: 9, fontWeight: "400", fill: THEME.body,
      fontFamily: THEME.bodyFont, rotation: 0, opacity: 1, zIndex: qZ++,
    });
    qY += stemHeight + 4;

    const choices = Array.isArray(q.choices) ? q.choices : [];
    for (const choice of choices) {
      const label = typeof choice === "object" ? choice.label : "";
      const text = typeof choice === "object" ? choice.text : String(choice);
      if (qY + 14 > USABLE_BOTTOM) flushQPage();
      qObjs.push({
        id: uid(), type: "text", x: M + 18, y: qY, width: CONTENT_W - 25, height: 12,
        content: `${label}) ${text}`, fontSize: 8, fontWeight: "400", fill: THEME.body,
        fontFamily: THEME.bodyFont, rotation: 0, opacity: 1, zIndex: qZ++,
      });
      qY += 13;
    }
    qY += 8;

    const correctAnswers = Array.isArray(q.correctAnswers) ? q.correctAnswers.join(", ") : "";
    const rationale = typeof q.rationale === "object" ? q.rationale : {};
    const rationaleText = rationale.correctReasoning || "";
    const pearl = q.examPearl || "";
    const rHeight = 20 + estimateTextHeight(rationaleText, 8, CONTENT_W - 25) + (pearl ? 18 : 0) + 10;

    if (rY + Math.min(rHeight, 40) > USABLE_BOTTOM) flushRPage();

    rObjs.push({
      id: uid(), type: "text", x: M, y: rY, width: CONTENT_W, height: 14,
      content: `Q${q.idx}. Correct: ${correctAnswers}`, fontSize: 9, fontWeight: "bold", fill: THEME.primary,
      fontFamily: THEME.bodyFont, rotation: 0, opacity: 1, zIndex: rZ++,
    });
    rY += 16;

    const rTextH = estimateTextHeight(rationaleText, 8, CONTENT_W - 15);
    rObjs.push({
      id: uid(), type: "text", x: M + 8, y: rY, width: CONTENT_W - 15, height: rTextH,
      content: rationaleText, fontSize: 8, fontWeight: "400", fill: THEME.body,
      fontFamily: THEME.bodyFont, rotation: 0, opacity: 1, zIndex: rZ++,
    });
    rY += rTextH + 4;

    if (pearl) {
      rObjs.push({
        id: uid(), type: "text", x: M + 8, y: rY, width: CONTENT_W - 15, height: 14,
        content: `Exam Pearl: ${pearl}`, fontSize: 7, fontWeight: "500", fill: THEME.accent,
        fontFamily: THEME.bodyFont, rotation: 0, opacity: 0.8, zIndex: rZ++,
      });
      rY += 16;
    }
    rY += 6;
  }

  if (qObjs.length > 0) flushQPage();
  if (rObjs.length > 0) flushRPage();

  return { questionPages, rationalePages };
}

export async function compileGeneration(generationId: string): Promise<CompiledPage[]> {
  const gen = await storage.getProductGeneration(generationId);
  if (!gen) throw new Error("Generation not found");

  const topic = gen.topic || "Nursing Exam Prep";
  const template = gen.template || "question_pack";
  const allPages: CompiledPage[] = [];

  const cover = makeCoverPage(
    topic,
    `${gen.examTarget?.toUpperCase() || "REx-PN"} Practice - ${gen.createdCount} Questions`,
  );
  allPages.push(cover);

  if (template === "cram_guide" || template === "hybrid") {
    const contentBlocks = await storage.getContentBlocks(generationId);
    let pageNum = 2;
    for (const block of contentBlocks) {
      const sectionTitle = block.sectionKey.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());
      const sectionPages = renderContentBlocksToPages(
        Array.isArray(block.blocks) ? block.blocks : [],
        sectionTitle,
        pageNum,
      );
      allPages.push(...sectionPages);
      pageNum += sectionPages.length;
    }
  }

  if (template === "question_pack" || template === "hybrid") {
    const questions = await storage.getGeneratedQuestions(generationId);
    const startPage = allPages.length + 1;
    const { questionPages, rationalePages } = renderQuestionsToPages(questions, startPage);
    allPages.push(...questionPages);
    allPages.push(...rationalePages);
  }

  await storage.createGenerationEvent({
    generationId,
    eventType: "compiled",
    payload: { totalPages: allPages.length, template },
  });

  return allPages;
}
