import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "@/lib/auth";
import { useLocation, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft, Plus, Trash2, Save, FileText, Image, Type, Square, Circle,
  Layers, Download, Copy, ShoppingCart, Loader2, Grid3X3, Sparkles,
  AlignLeft, AlignCenter, AlignRight, AlignVerticalJustifyCenter,
  Wand2, Shield, AlertTriangle, CheckCircle, LayoutTemplate, Palette,
  Crown, BookOpen, Zap, Target, Brain, ChevronDown, ChevronRight as ChevronR,
  ImagePlus, Star, Award, ClipboardCheck, Lock, Unlock, SwatchBook,
  ZoomIn, ZoomOut, Maximize, Minimize, Move, Group, Ungroup,
  ArrowUp, ArrowDown, ChevronsUp, ChevronsDown, Paintbrush
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { adminFetch } from "@/lib/admin-fetch";

interface DesignProject {
  id: string;
  title: string;
  slug: string;
  type: string;
  pageSize: string;
  orientation: string;
  createdAt: string;
  updatedAt: string;
  pages?: DesignPage[];
  assets?: DesignAsset[];
}

interface DesignPage {
  id: string;
  projectId: string;
  pageNumber: number;
  canvasJson: any;
  backgroundColor: string;
}

interface DesignAsset {
  id: string;
  projectId: string;
  assetType: string;
  url: string;
  width?: number;
  height?: number;
}


interface ThemeConfig {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  sectionBg: string;
  sectionBgAlt: string;
  headingFont: string;
  bodyFont: string;
  headingColor: string;
  bodyColor: string;
  bodyColorLight: string;
  dangerColor: string;
  successColor: string;
  warningColor: string;
  dividerColor: string;
  badgeBg: string;
  badgeText: string;
  tableBorderColor: string;
  tableRowEven: string;
  tableRowOdd: string;
  pearlBg: string;
  pearlBorder: string;
  flagBg: string;
  flagBorder: string;
  coverBg: string;
  coverBgOverlay: string;
}

const THEMES: ThemeConfig[] = [
  {
    id: "soft-clinical",
    name: "Soft Clinical",
    primaryColor: "#7c3aed",
    secondaryColor: "#06b6d4",
    accentColor: "#f59e0b",
    backgroundColor: "#ffffff",
    sectionBg: "#f8fafc",
    sectionBgAlt: "#f1f5f9",
    headingFont: "Inter",
    bodyFont: "Inter",
    headingColor: "#1e293b",
    bodyColor: "#334155",
    bodyColorLight: "#64748b",
    dangerColor: "#ef4444",
    successColor: "#10b981",
    warningColor: "#ca8a04",
    dividerColor: "#e2e8f0",
    badgeBg: "#7c3aed",
    badgeText: "#ffffff",
    tableBorderColor: "#e2e8f0",
    tableRowEven: "#f8fafc",
    tableRowOdd: "#f1f5f9",
    pearlBg: "#ede9fe",
    pearlBorder: "#7c3aed",
    flagBg: "#fef2f2",
    flagBorder: "#ef4444",
    coverBg: "#7c3aed",
    coverBgOverlay: "#6d28d9",
  },
  {
    id: "structured-academic",
    name: "Structured Academic",
    primaryColor: "#1e40af",
    secondaryColor: "#0f766e",
    accentColor: "#b45309",
    backgroundColor: "#ffffff",
    sectionBg: "#f0f4f8",
    sectionBgAlt: "#e8edf2",
    headingFont: "Georgia",
    bodyFont: "Inter",
    headingColor: "#0f172a",
    bodyColor: "#1e293b",
    bodyColorLight: "#475569",
    dangerColor: "#b91c1c",
    successColor: "#047857",
    warningColor: "#92400e",
    dividerColor: "#cbd5e1",
    badgeBg: "#1e40af",
    badgeText: "#ffffff",
    tableBorderColor: "#cbd5e1",
    tableRowEven: "#f0f4f8",
    tableRowOdd: "#e2e8f0",
    pearlBg: "#dbeafe",
    pearlBorder: "#1e40af",
    flagBg: "#fef2f2",
    flagBorder: "#b91c1c",
    coverBg: "#1e40af",
    coverBgOverlay: "#1e3a8a",
  },
  {
    id: "bold-modern",
    name: "Bold Modern",
    primaryColor: "#dc2626",
    secondaryColor: "#7c3aed",
    accentColor: "#eab308",
    backgroundColor: "#fafafa",
    sectionBg: "#f5f5f5",
    sectionBgAlt: "#e5e5e5",
    headingFont: "Inter",
    bodyFont: "Inter",
    headingColor: "#171717",
    bodyColor: "#262626",
    bodyColorLight: "#525252",
    dangerColor: "#dc2626",
    successColor: "#16a34a",
    warningColor: "#d97706",
    dividerColor: "#d4d4d4",
    badgeBg: "#dc2626",
    badgeText: "#ffffff",
    tableBorderColor: "#d4d4d4",
    tableRowEven: "#fafafa",
    tableRowOdd: "#f5f5f5",
    pearlBg: "#fef2f2",
    pearlBorder: "#dc2626",
    flagBg: "#fef9c3",
    flagBorder: "#d97706",
    coverBg: "#171717",
    coverBgOverlay: "#dc2626",
  },
  {
    id: "minimal-clean",
    name: "Minimal Clean",
    primaryColor: "#0f172a",
    secondaryColor: "#64748b",
    accentColor: "#0ea5e9",
    backgroundColor: "#ffffff",
    sectionBg: "#fafafa",
    sectionBgAlt: "#f5f5f5",
    headingFont: "Inter",
    bodyFont: "Inter",
    headingColor: "#0f172a",
    bodyColor: "#374151",
    bodyColorLight: "#6b7280",
    dangerColor: "#dc2626",
    successColor: "#059669",
    warningColor: "#d97706",
    dividerColor: "#e5e7eb",
    badgeBg: "#0f172a",
    badgeText: "#ffffff",
    tableBorderColor: "#e5e7eb",
    tableRowEven: "#fafafa",
    tableRowOdd: "#f5f5f5",
    pearlBg: "#f0f9ff",
    pearlBorder: "#0ea5e9",
    flagBg: "#fef2f2",
    flagBorder: "#dc2626",
    coverBg: "#0f172a",
    coverBgOverlay: "#1e293b",
  },
  {
    id: "blush-rose",
    name: "Blush Rose",
    primaryColor: "#be185d",
    secondaryColor: "#e879a0",
    accentColor: "#f9a8d4",
    backgroundColor: "#fffbfc",
    sectionBg: "#fdf2f8",
    sectionBgAlt: "#fce7f3",
    headingFont: "Inter",
    bodyFont: "Inter",
    headingColor: "#831843",
    bodyColor: "#4a044e",
    bodyColorLight: "#9d4e8a",
    dangerColor: "#e11d48",
    successColor: "#059669",
    warningColor: "#d97706",
    dividerColor: "#fbcfe8",
    badgeBg: "#be185d",
    badgeText: "#ffffff",
    tableBorderColor: "#fbcfe8",
    tableRowEven: "#fdf2f8",
    tableRowOdd: "#fce7f3",
    pearlBg: "#fdf2f8",
    pearlBorder: "#e879a0",
    flagBg: "#fff1f2",
    flagBorder: "#e11d48",
    coverBg: "#9d174d",
    coverBgOverlay: "#be185d",
  },
  {
    id: "lavender-dream",
    name: "Lavender Dream",
    primaryColor: "#7e22ce",
    secondaryColor: "#a78bfa",
    accentColor: "#c4b5fd",
    backgroundColor: "#fdfcff",
    sectionBg: "#f5f3ff",
    sectionBgAlt: "#ede9fe",
    headingFont: "Inter",
    bodyFont: "Inter",
    headingColor: "#581c87",
    bodyColor: "#3b0764",
    bodyColorLight: "#7c3aed",
    dangerColor: "#dc2626",
    successColor: "#059669",
    warningColor: "#d97706",
    dividerColor: "#ddd6fe",
    badgeBg: "#7e22ce",
    badgeText: "#ffffff",
    tableBorderColor: "#ddd6fe",
    tableRowEven: "#f5f3ff",
    tableRowOdd: "#ede9fe",
    pearlBg: "#f5f3ff",
    pearlBorder: "#a78bfa",
    flagBg: "#fef2f2",
    flagBorder: "#dc2626",
    coverBg: "#6b21a8",
    coverBgOverlay: "#7e22ce",
  },
  {
    id: "sage-wellness",
    name: "Sage Wellness",
    primaryColor: "#166534",
    secondaryColor: "#6ee7b7",
    accentColor: "#a7f3d0",
    backgroundColor: "#fcfefb",
    sectionBg: "#f0fdf4",
    sectionBgAlt: "#dcfce7",
    headingFont: "Inter",
    bodyFont: "Inter",
    headingColor: "#14532d",
    bodyColor: "#1a3c24",
    bodyColorLight: "#4ade80",
    dangerColor: "#dc2626",
    successColor: "#059669",
    warningColor: "#d97706",
    dividerColor: "#bbf7d0",
    badgeBg: "#166534",
    badgeText: "#ffffff",
    tableBorderColor: "#bbf7d0",
    tableRowEven: "#f0fdf4",
    tableRowOdd: "#dcfce7",
    pearlBg: "#ecfdf5",
    pearlBorder: "#6ee7b7",
    flagBg: "#fef2f2",
    flagBorder: "#dc2626",
    coverBg: "#15803d",
    coverBgOverlay: "#166534",
  },
  {
    id: "sky-breeze",
    name: "Sky Breeze",
    primaryColor: "#0369a1",
    secondaryColor: "#7dd3fc",
    accentColor: "#bae6fd",
    backgroundColor: "#fcfeff",
    sectionBg: "#f0f9ff",
    sectionBgAlt: "#e0f2fe",
    headingFont: "Inter",
    bodyFont: "Inter",
    headingColor: "#0c4a6e",
    bodyColor: "#0e3654",
    bodyColorLight: "#38bdf8",
    dangerColor: "#dc2626",
    successColor: "#059669",
    warningColor: "#d97706",
    dividerColor: "#bae6fd",
    badgeBg: "#0369a1",
    badgeText: "#ffffff",
    tableBorderColor: "#bae6fd",
    tableRowEven: "#f0f9ff",
    tableRowOdd: "#e0f2fe",
    pearlBg: "#f0f9ff",
    pearlBorder: "#7dd3fc",
    flagBg: "#fef2f2",
    flagBorder: "#dc2626",
    coverBg: "#075985",
    coverBgOverlay: "#0369a1",
  },
  {
    id: "peach-glow",
    name: "Peach Glow",
    primaryColor: "#c2410c",
    secondaryColor: "#fdba74",
    accentColor: "#fed7aa",
    backgroundColor: "#fffcfa",
    sectionBg: "#fff7ed",
    sectionBgAlt: "#ffedd5",
    headingFont: "Inter",
    bodyFont: "Inter",
    headingColor: "#7c2d12",
    bodyColor: "#431407",
    bodyColorLight: "#ea580c",
    dangerColor: "#dc2626",
    successColor: "#059669",
    warningColor: "#d97706",
    dividerColor: "#fed7aa",
    badgeBg: "#c2410c",
    badgeText: "#ffffff",
    tableBorderColor: "#fed7aa",
    tableRowEven: "#fff7ed",
    tableRowOdd: "#ffedd5",
    pearlBg: "#fff7ed",
    pearlBorder: "#fdba74",
    flagBg: "#fef2f2",
    flagBorder: "#dc2626",
    coverBg: "#9a3412",
    coverBgOverlay: "#c2410c",
  },
  {
    id: "cotton-candy",
    name: "Cotton Candy",
    primaryColor: "#a21caf",
    secondaryColor: "#f0abfc",
    accentColor: "#e9d5ff",
    backgroundColor: "#fefcff",
    sectionBg: "#fdf4ff",
    sectionBgAlt: "#fae8ff",
    headingFont: "Inter",
    bodyFont: "Inter",
    headingColor: "#701a75",
    bodyColor: "#4a044e",
    bodyColorLight: "#c026d3",
    dangerColor: "#dc2626",
    successColor: "#059669",
    warningColor: "#d97706",
    dividerColor: "#f5d0fe",
    badgeBg: "#a21caf",
    badgeText: "#ffffff",
    tableBorderColor: "#f5d0fe",
    tableRowEven: "#fdf4ff",
    tableRowOdd: "#fae8ff",
    pearlBg: "#fdf4ff",
    pearlBorder: "#f0abfc",
    flagBg: "#fef2f2",
    flagBorder: "#dc2626",
    coverBg: "#86198f",
    coverBgOverlay: "#a21caf",
  },
];

function getTheme(id: string): ThemeConfig {
  return THEMES.find(t => t.id === id) || THEMES[0];
}

function generateCoverPage(w: number, h: number, t: ThemeConfig, opts: {
  title?: string; subtitle?: string; examTarget?: string; badges?: string[];
  includesFlashcards?: boolean; includesQbank?: boolean; pageCount?: number;
} = {}): CanvasObject[] {
  const title = opts.title || "STUDY GUIDE";
  const subtitle = opts.subtitle || "High-Yield Review";
  const exam = opts.examTarget || "";
  const badges = opts.badges || [];
  const year = new Date().getFullYear();
  const objs: CanvasObject[] = [];
  let z = 0;

  objs.push({ id: uid(), type: "rect", x: 0, y: 0, width: w, height: h, fill: t.coverBg, rotation: 0, opacity: 1, zIndex: z++, borderRadius: 0 });

  objs.push({ id: uid(), type: "rect", x: 0, y: 0, width: w, height: h * 0.4, fill: t.coverBgOverlay, rotation: 0, opacity: 0.3, zIndex: z++, borderRadius: 0 });

  objs.push({ id: uid(), type: "rect", x: 0, y: h * 0.38, width: w, height: 3, fill: t.accentColor, rotation: 0, opacity: 0.8, zIndex: z++ });

  objs.push({ id: uid(), type: "rect", x: w * 0.08, y: h * 0.06, width: w * 0.84, height: h * 0.88, fill: "transparent", rotation: 0, opacity: 0.15, zIndex: z++, borderRadius: 16, stroke: "#ffffff", strokeWidth: 1 });

  objs.push({ id: uid(), type: "text", x: 46, y: h * 0.12, width: w - 92, height: 16, content: "NurseNest", fontSize: 12, fontWeight: "bold", fill: t.accentColor, fontFamily: t.headingFont, rotation: 0, opacity: 0.9, zIndex: z++, textAlign: "center", tag: "brand-logo", locked: true });

  objs.push({ id: uid(), type: "text", x: 36, y: h * 0.22, width: w - 72, height: 60, content: title.toUpperCase(), fontSize: 36, fontWeight: "bold", fill: "#ffffff", fontFamily: t.headingFont, rotation: 0, opacity: 1, zIndex: z++, textAlign: "center" });

  objs.push({ id: uid(), type: "text", x: 46, y: h * 0.33, width: w - 92, height: 24, content: subtitle, fontSize: 15, fontWeight: "normal", fill: "#ffffff", fontFamily: t.bodyFont, rotation: 0, opacity: 0.75, zIndex: z++, textAlign: "center" });

  const chipY = h * 0.44;
  const allChips = [];
  if (exam) allChips.push(exam);
  allChips.push(`Updated ${year}`);
  if (opts.includesFlashcards) allChips.push("Flashcards");
  if (opts.includesQbank) allChips.push("QBank");
  if (opts.pageCount) allChips.push(`${opts.pageCount} Pages`);
  allChips.push(...badges);

  const chipW = 100;
  const chipGap = 8;
  const totalChipW = allChips.length * chipW + (allChips.length - 1) * chipGap;
  const chipStartX = (w - totalChipW) / 2;

  allChips.forEach((label, i) => {
    const cx = chipStartX + i * (chipW + chipGap);
    objs.push({ id: uid(), type: "rect", x: cx, y: chipY, width: chipW, height: 24, fill: i === 0 ? t.accentColor : t.primaryColor + "33", borderRadius: 12, rotation: 0, opacity: 1, zIndex: z++ });
    objs.push({ id: uid(), type: "text", x: cx + 4, y: chipY + 4, width: chipW - 8, height: 16, content: label, fontSize: 9, fontWeight: "bold", fill: i === 0 ? "#ffffff" : "#ffffff", fontFamily: t.bodyFont, rotation: 0, opacity: i === 0 ? 1 : 0.85, zIndex: z++, textAlign: "center" });
  });

  const featureY = h * 0.56;
  const features = [
    "High-yield content mapped to exam blueprints",
    "Clinical pearls and red flags highlighted",
    "Nursing-first language and prioritization focus",
    "Designed for quick review before the exam",
  ];
  features.forEach((f, i) => {
    objs.push({ id: uid(), type: "text", x: w * 0.15, y: featureY + i * 22, width: w * 0.7, height: 18, content: `✦  ${f}`, fontSize: 10, fontWeight: "normal", fill: "#ffffff", fontFamily: t.bodyFont, rotation: 0, opacity: 0.7, zIndex: z++, textAlign: "center" });
  });

  objs.push({ id: uid(), type: "rect", x: w * 0.25, y: h * 0.78, width: w * 0.5, height: 36, fill: t.accentColor, borderRadius: 18, rotation: 0, opacity: 1, zIndex: z++ });
  objs.push({ id: uid(), type: "text", x: w * 0.25, y: h * 0.78 + 8, width: w * 0.5, height: 20, content: "INSTANT DOWNLOAD", fontSize: 12, fontWeight: "bold", fill: "#ffffff", fontFamily: t.headingFont, rotation: 0, opacity: 1, zIndex: z++, textAlign: "center" });

  objs.push({ id: uid(), type: "text", x: 46, y: h - 50, width: w - 92, height: 14, content: `© ${year} NurseNest  •  For personal study use only`, fontSize: 8, fontWeight: "normal", fill: "#ffffff", fontFamily: t.bodyFont, rotation: 0, opacity: 0.4, zIndex: z++, textAlign: "center" });

  return objs;
}

type CoverPreset = { id: string; name: string; bgStyle: "gradient" | "solid" | "split"; shapesDensity: number; titleWeight: string; };

const COVER_PRESETS: CoverPreset[] = [
  { id: "soft-pastel", name: "Soft Pastel", bgStyle: "gradient", shapesDensity: 4, titleWeight: "bold" },
  { id: "clinical-minimal", name: "Clinical Minimal", bgStyle: "solid", shapesDensity: 1, titleWeight: "bold" },
  { id: "bold-exam", name: "Bold Exam Focus", bgStyle: "split", shapesDensity: 2, titleWeight: "bold" },
  { id: "neutral-academic", name: "Neutral Academic", bgStyle: "solid", shapesDensity: 0, titleWeight: "600" },
];

function generateStyledCoverPage(w: number, h: number, t: ThemeConfig, preset: CoverPreset, opts: {
  title?: string; subtitle?: string; examTarget?: string; badges?: string[];
  includesFlashcards?: boolean; includesQbank?: boolean; pageCount?: number;
} = {}): CanvasObject[] {
  const title = opts.title || "STUDY GUIDE";
  const subtitle = opts.subtitle || "High-Yield Review";
  const exam = opts.examTarget || "";
  const year = new Date().getFullYear();
  const objs: CanvasObject[] = [];
  let z = 0;

  if (preset.bgStyle === "gradient") {
    objs.push({ id: uid(), type: "rect", x: 0, y: 0, width: w, height: h, fill: t.coverBg, rotation: 0, opacity: 1, zIndex: z++, borderRadius: 0 });
    objs.push({ id: uid(), type: "rect", x: 0, y: 0, width: w, height: h * 0.55, fill: t.coverBgOverlay, rotation: 0, opacity: 0.25, zIndex: z++, borderRadius: 0 });
    objs.push({ id: uid(), type: "rect", x: 0, y: h * 0.55, width: w, height: h * 0.45, fill: t.primaryColor, rotation: 0, opacity: 0.15, zIndex: z++, borderRadius: 0 });
  } else if (preset.bgStyle === "split") {
    objs.push({ id: uid(), type: "rect", x: 0, y: 0, width: w, height: h * 0.45, fill: t.coverBg, rotation: 0, opacity: 1, zIndex: z++, borderRadius: 0 });
    objs.push({ id: uid(), type: "rect", x: 0, y: h * 0.45, width: w, height: h * 0.55, fill: t.accentColor, rotation: 0, opacity: 1, zIndex: z++, borderRadius: 0 });
    objs.push({ id: uid(), type: "rect", x: 0, y: h * 0.44, width: w, height: 6, fill: "#ffffff", rotation: 0, opacity: 0.3, zIndex: z++ });
  } else {
    objs.push({ id: uid(), type: "rect", x: 0, y: 0, width: w, height: h, fill: t.coverBg, rotation: 0, opacity: 1, zIndex: z++, borderRadius: 0 });
  }

  for (let s = 0; s < preset.shapesDensity; s++) {
    const shapeX = Math.random() * w * 0.6 + w * 0.2;
    const shapeY = Math.random() * h * 0.4;
    const shapeSize = 40 + Math.random() * 80;
    objs.push({ id: uid(), type: "circle", x: shapeX, y: shapeY, width: shapeSize, height: shapeSize, fill: t.accentColor, rotation: 0, opacity: 0.06 + Math.random() * 0.06, zIndex: z++, borderRadius: 0 });
  }

  if (preset.bgStyle !== "split") {
    objs.push({ id: uid(), type: "rect", x: 0, y: h * 0.42, width: w, height: 3, fill: t.accentColor, rotation: 0, opacity: 0.7, zIndex: z++ });
  }

  objs.push({ id: uid(), type: "rect", x: w * 0.08, y: h * 0.06, width: w * 0.84, height: h * 0.88, fill: "transparent", rotation: 0, opacity: 0.12, zIndex: z++, borderRadius: 16, stroke: "#ffffff", strokeWidth: 1 });

  objs.push({ id: uid(), type: "text", x: 46, y: h * 0.10, width: w - 92, height: 16, content: "NurseNest", fontSize: 12, fontWeight: "bold", fill: t.accentColor, fontFamily: t.headingFont, rotation: 0, opacity: 0.9, zIndex: z++, textAlign: "center", tag: "brand-logo", locked: true });

  const titleY = preset.bgStyle === "split" ? h * 0.18 : h * 0.20;
  objs.push({ id: uid(), type: "text", x: 36, y: titleY, width: w - 72, height: 60, content: title.toUpperCase(), fontSize: preset.bgStyle === "bold-exam" ? 40 : 34, fontWeight: preset.titleWeight, fill: "#ffffff", fontFamily: t.headingFont, rotation: 0, opacity: 1, zIndex: z++, textAlign: "center" });

  objs.push({ id: uid(), type: "text", x: 46, y: titleY + 65, width: w - 92, height: 24, content: subtitle, fontSize: 15, fontWeight: "normal", fill: "#ffffff", fontFamily: t.bodyFont, rotation: 0, opacity: 0.75, zIndex: z++, textAlign: "center" });

  const chipY = preset.bgStyle === "split" ? h * 0.50 : h * 0.46;
  const allChips = [];
  if (exam) allChips.push(exam);
  allChips.push(`Updated ${year}`);
  if (opts.includesFlashcards) allChips.push("Flashcards");
  if (opts.includesQbank) allChips.push("QBank");
  if (opts.pageCount) allChips.push(`${opts.pageCount} Pages`);
  if (opts.badges) allChips.push(...opts.badges);

  const chipW = 95;
  const chipGap = 6;
  const totalChipW = allChips.length * chipW + (allChips.length - 1) * chipGap;
  const chipStartX = (w - totalChipW) / 2;

  allChips.forEach((label, i) => {
    const cx = chipStartX + i * (chipW + chipGap);
    const chipFill = i === 0 ? t.accentColor : (preset.bgStyle === "split" ? "#ffffff33" : t.primaryColor + "33");
    objs.push({ id: uid(), type: "rect", x: cx, y: chipY, width: chipW, height: 24, fill: chipFill, borderRadius: 12, rotation: 0, opacity: 1, zIndex: z++ });
    objs.push({ id: uid(), type: "text", x: cx + 4, y: chipY + 4, width: chipW - 8, height: 16, content: label, fontSize: 9, fontWeight: "bold", fill: "#ffffff", fontFamily: t.bodyFont, rotation: 0, opacity: 0.9, zIndex: z++, textAlign: "center" });
  });

  const featureY = preset.bgStyle === "split" ? h * 0.58 : h * 0.56;
  const features = [
    "High-yield content mapped to exam blueprints",
    "Clinical pearls and red flags highlighted",
    "Nursing-first language and prioritization focus",
    "Designed for quick review before the exam",
  ];
  const featureColor = preset.bgStyle === "split" ? "#ffffff" : "#ffffff";
  features.forEach((f, i) => {
    objs.push({ id: uid(), type: "text", x: w * 0.12, y: featureY + i * 22, width: w * 0.76, height: 18, content: `✦  ${f}`, fontSize: 10, fontWeight: "normal", fill: featureColor, fontFamily: t.bodyFont, rotation: 0, opacity: 0.7, zIndex: z++, textAlign: "center" });
  });

  objs.push({ id: uid(), type: "rect", x: w * 0.25, y: h * 0.80, width: w * 0.5, height: 36, fill: preset.bgStyle === "split" ? "#ffffff" : t.accentColor, borderRadius: 18, rotation: 0, opacity: 1, zIndex: z++ });
  objs.push({ id: uid(), type: "text", x: w * 0.25, y: h * 0.80 + 8, width: w * 0.5, height: 20, content: "INSTANT DOWNLOAD", fontSize: 12, fontWeight: "bold", fill: preset.bgStyle === "split" ? t.coverBg : "#ffffff", fontFamily: t.headingFont, rotation: 0, opacity: 1, zIndex: z++, textAlign: "center" });

  objs.push({ id: uid(), type: "text", x: 46, y: h - 46, width: w - 92, height: 14, content: `© ${year} NurseNest  •  For personal study use only`, fontSize: 8, fontWeight: "normal", fill: "#ffffff", fontFamily: t.bodyFont, rotation: 0, opacity: 0.4, zIndex: z++, textAlign: "center" });

  return objs;
}

function generateChapterCoverPage(w: number, h: number, t: ThemeConfig, preset: CoverPreset, opts: {
  chapterTitle: string; chapterNumber: number; totalChapters: number;
}): CanvasObject[] {
  const objs: CanvasObject[] = [];
  let z = 0;
  const bgFill = preset.bgStyle === "gradient" ? t.coverBgOverlay : preset.bgStyle === "split" ? t.accentColor : t.sectionBg;
  objs.push({ id: uid(), type: "rect", x: 0, y: 0, width: w, height: h, fill: bgFill, rotation: 0, opacity: 1, zIndex: z++ });
  objs.push({ id: uid(), type: "rect", x: 0, y: h * 0.35, width: w, height: h * 0.30, fill: t.primaryColor, rotation: 0, opacity: 0.12, zIndex: z++ });
  for (let s = 0; s < Math.min(preset.shapesDensity, 2); s++) {
    const sx = w * 0.3 + Math.random() * w * 0.4;
    const sy = h * 0.1 + Math.random() * h * 0.2;
    const sz = 30 + Math.random() * 60;
    objs.push({ id: uid(), type: "circle", x: sx, y: sy, width: sz, height: sz, fill: t.accentColor, rotation: 0, opacity: 0.06, zIndex: z++ });
  }
  objs.push({ id: uid(), type: "rect", x: w * 0.1, y: h * 0.38, width: w * 0.8, height: 3, fill: t.accentColor, rotation: 0, opacity: 0.5, zIndex: z++ });
  objs.push({ id: uid(), type: "text", x: 46, y: h * 0.28, width: w - 92, height: 20, content: `SECTION ${opts.chapterNumber} OF ${opts.totalChapters}`, fontSize: 11, fontWeight: "bold", fill: t.primaryColor, fontFamily: t.bodyFont, rotation: 0, opacity: 0.6, zIndex: z++, textAlign: "center" });
  objs.push({ id: uid(), type: "text", x: 36, y: h * 0.40, width: w - 72, height: 50, content: opts.chapterTitle.toUpperCase(), fontSize: 28, fontWeight: preset.titleWeight, fill: t.headingColor, fontFamily: t.headingFont, rotation: 0, opacity: 1, zIndex: z++, textAlign: "center" });
  objs.push({ id: uid(), type: "text", x: 46, y: h * 0.55, width: w - 92, height: 18, content: "NurseNest  •  Exam Prep", fontSize: 10, fontWeight: "normal", fill: t.bodyColorLight, fontFamily: t.bodyFont, rotation: 0, opacity: 0.5, zIndex: z++, textAlign: "center" });
  objs.push({ id: uid(), type: "rect", x: w * 0.15, y: h * 0.90, width: w * 0.7, height: 2, fill: t.dividerColor, rotation: 0, opacity: 0.3, zIndex: z++ });
  return objs;
}

const CONTENT_BLOCK_LIBRARY = [
  { id: "cover", label: "Cover Page", icon: "BookOpen", category: "structure" },
  { id: "toc", label: "Table of Contents", icon: "FileText", category: "structure" },
  { id: "section-divider", label: "Section Divider", icon: "LayoutTemplate", category: "structure" },
  { id: "learning-objectives", label: "Learning Objectives", icon: "Target", category: "content" },
  { id: "key-concepts", label: "Key Concepts / Quick Hits", icon: "Zap", category: "content" },
  { id: "pathophysiology", label: "Pathophysiology", icon: "Brain", category: "content" },
  { id: "signs-symptoms", label: "Signs & Symptoms", icon: "AlertTriangle", category: "content" },
  { id: "assessment", label: "Assessment Findings", icon: "ClipboardCheck", category: "content" },
  { id: "labs-diagnostics", label: "Labs / Diagnostics", icon: "Grid3X3", category: "content" },
  { id: "medications", label: "Treatment & Medications", icon: "Sparkles", category: "content" },
  { id: "nursing-interventions", label: "Nursing Interventions", icon: "Shield", category: "content" },
  { id: "complications", label: "Complications", icon: "AlertTriangle", category: "clinical" },
  { id: "patient-teaching", label: "Patient Teaching", icon: "BookOpen", category: "clinical" },
  { id: "clinical-pearls", label: "Clinical Pearls", icon: "Star", category: "clinical" },
  { id: "exam-tips", label: "Exam Tips", icon: "Award", category: "clinical" },
  { id: "practice-questions", label: "Practice Questions", icon: "ClipboardCheck", category: "assessment" },
  { id: "rationales", label: "Rationales", icon: "Brain", category: "assessment" },
  { id: "summary", label: "Summary One-Pager", icon: "FileText", category: "assessment" },
];

const PRODUCT_PRESETS: { id: string; label: string; blocks: string[] }[] = [
  { id: "cram-guide", label: "Cram Guide", blocks: ["cover", "toc", "learning-objectives", "key-concepts", "pathophysiology", "signs-symptoms", "medications", "nursing-interventions", "clinical-pearls", "exam-tips", "practice-questions", "rationales", "summary"] },
  { id: "question-pack", label: "Question Pack", blocks: ["cover", "practice-questions", "rationales"] },
  { id: "study-plan", label: "Study Plan", blocks: ["cover", "toc", "learning-objectives", "key-concepts", "assessment", "labs-diagnostics", "medications", "clinical-pearls", "summary"] },
  { id: "quick-reference", label: "Quick Reference", blocks: ["cover", "key-concepts", "labs-diagnostics", "medications", "nursing-interventions", "clinical-pearls"] },
];

type PageFlowStep =
  | { type: "cover" }
  | { type: "toc" }
  | { type: "divider"; sectionId: string }
  | { type: "section"; sectionId: string }
  | { type: "questions" }
  | { type: "rationales" }
  | { type: "summary" };

type TemplateBlueprint = {
  id: string;
  label: string;
  description: string;
  icon: string;
  minPages: number;
  maxPages: number;
  defaultPages: number;
  charsPerPage: number;
  sections: { id: string; label: string; weight: number; required: boolean }[];
  pageFlow: PageFlowStep[];
  imageSlots: { id: string; label: string; promptHint: string }[];
  includesQuestions: boolean;
  defaultQuestionCount: number;
};

function buildCramPageFlow(): PageFlowStep[] {
  const secs = ["learning-objectives","pathophysiology","signs-symptoms","assessment","labs-diagnostics","medications","nursing-interventions","complications","patient-teaching"];
  const flow: PageFlowStep[] = [{ type: "cover" }, { type: "toc" }];
  for (const s of secs) { flow.push({ type: "divider", sectionId: s }, { type: "section", sectionId: s }); }
  flow.push({ type: "questions" }, { type: "rationales" }, { type: "summary" });
  return flow;
}

const TEMPLATE_BLUEPRINTS: TemplateBlueprint[] = [
  {
    id: "cram", label: "Cram Guide", description: "Comprehensive exam review with high-yield content, clinical pearls, and practice questions", icon: "📘",
    minPages: 20, maxPages: 80, defaultPages: 45, charsPerPage: 1800,
    sections: [
      { id: "learning-objectives", label: "Learning Objectives", weight: 0.05, required: true },
      { id: "pathophysiology", label: "Pathophysiology", weight: 0.15, required: true },
      { id: "signs-symptoms", label: "Signs & Symptoms", weight: 0.10, required: true },
      { id: "assessment", label: "Assessment Findings", weight: 0.08, required: true },
      { id: "labs-diagnostics", label: "Labs & Diagnostics", weight: 0.08, required: true },
      { id: "medications", label: "Medications", weight: 0.12, required: true },
      { id: "nursing-interventions", label: "Nursing Interventions", weight: 0.10, required: true },
      { id: "complications", label: "Complications", weight: 0.07, required: true },
      { id: "patient-teaching", label: "Patient Teaching", weight: 0.05, required: false },
      { id: "practice-questions", label: "Practice Questions", weight: 0.15, required: true },
      { id: "rationales", label: "Rationales", weight: 0.05, required: true },
    ],
    pageFlow: buildCramPageFlow(),
    imageSlots: [
      { id: "cover-hero", label: "Cover Illustration", promptHint: "soft pastel medical illustration for nursing study guide cover" },
      { id: "patho-diagram", label: "Pathophysiology Diagram", promptHint: "clean clinical flowchart diagram" },
      { id: "med-icon", label: "Medications Icon", promptHint: "simple flat medication pill icon" },
      { id: "assessment-flow", label: "Assessment Algorithm", promptHint: "nursing assessment decision flowchart" },
    ],
    includesQuestions: true, defaultQuestionCount: 25,
  },
  {
    id: "questions", label: "Question Pack", description: "Focused practice questions with detailed rationales", icon: "📝",
    minPages: 15, maxPages: 60, defaultPages: 30, charsPerPage: 1600,
    sections: [
      { id: "practice-questions", label: "Practice Questions", weight: 0.65, required: true },
      { id: "rationales", label: "Rationales", weight: 0.35, required: true },
    ],
    pageFlow: [{ type: "cover" }, { type: "questions" }, { type: "rationales" }],
    imageSlots: [
      { id: "cover-hero", label: "Cover Illustration", promptHint: "exam practice question book cover illustration" },
    ],
    includesQuestions: true, defaultQuestionCount: 50,
  },
  {
    id: "cheatsheet", label: "Cheat Sheet", description: "Quick-reference card with key facts, tables, and algorithms", icon: "⚡",
    minPages: 1, maxPages: 6, defaultPages: 2, charsPerPage: 2200,
    sections: [
      { id: "key-concepts", label: "Key Concepts", weight: 0.30, required: true },
      { id: "labs-diagnostics", label: "Labs Quick Ref", weight: 0.20, required: true },
      { id: "medications", label: "Med Quick Ref", weight: 0.25, required: true },
      { id: "clinical-pearls", label: "Clinical Pearls", weight: 0.25, required: true },
    ],
    pageFlow: [
      { type: "cover" },
      { type: "section", sectionId: "key-concepts" },
      { type: "section", sectionId: "labs-diagnostics" },
      { type: "section", sectionId: "medications" },
      { type: "section", sectionId: "clinical-pearls" },
    ],
    imageSlots: [
      { id: "cover-hero", label: "Cover Illustration", promptHint: "quick reference cheat sheet cover" },
    ],
    includesQuestions: false, defaultQuestionCount: 0,
  },
  {
    id: "studyplan", label: "Study Plan", description: "Structured learning pathway with objectives and milestones", icon: "📅",
    minPages: 5, maxPages: 25, defaultPages: 12, charsPerPage: 1800,
    sections: [
      { id: "learning-objectives", label: "Learning Objectives", weight: 0.10, required: true },
      { id: "key-concepts", label: "Core Concepts", weight: 0.25, required: true },
      { id: "assessment", label: "Self-Assessment", weight: 0.15, required: true },
      { id: "medications", label: "Medication Focus", weight: 0.15, required: true },
      { id: "clinical-pearls", label: "Clinical Pearls", weight: 0.15, required: true },
      { id: "practice-questions", label: "Knowledge Checks", weight: 0.20, required: true },
    ],
    pageFlow: [
      { type: "cover" }, { type: "toc" },
      { type: "section", sectionId: "learning-objectives" },
      { type: "section", sectionId: "key-concepts" },
      { type: "section", sectionId: "assessment" },
      { type: "section", sectionId: "medications" },
      { type: "section", sectionId: "clinical-pearls" },
      { type: "questions" }, { type: "summary" },
    ],
    imageSlots: [
      { id: "cover-hero", label: "Cover Illustration", promptHint: "study plan calendar timeline illustration" },
    ],
    includesQuestions: true, defaultQuestionCount: 15,
  },
  {
    id: "bundle", label: "Bundle", description: "Multi-part product with TOC, chapter covers, and combined content", icon: "📦",
    minPages: 30, maxPages: 120, defaultPages: 60, charsPerPage: 1800,
    sections: [
      { id: "pathophysiology", label: "Pathophysiology", weight: 0.12, required: true },
      { id: "signs-symptoms", label: "Signs & Symptoms", weight: 0.08, required: true },
      { id: "assessment", label: "Assessment", weight: 0.08, required: true },
      { id: "labs-diagnostics", label: "Labs & Diagnostics", weight: 0.08, required: true },
      { id: "medications", label: "Medications", weight: 0.12, required: true },
      { id: "nursing-interventions", label: "Nursing Interventions", weight: 0.08, required: true },
      { id: "complications", label: "Complications", weight: 0.06, required: true },
      { id: "clinical-pearls", label: "Clinical Pearls", weight: 0.08, required: true },
      { id: "practice-questions", label: "Practice Questions", weight: 0.20, required: true },
      { id: "rationales", label: "Rationales", weight: 0.10, required: true },
    ],
    pageFlow: (() => {
      const secs = ["pathophysiology","signs-symptoms","assessment","labs-diagnostics","medications","nursing-interventions","complications","clinical-pearls"];
      const flow: PageFlowStep[] = [{ type: "cover" }, { type: "toc" }];
      for (const s of secs) { flow.push({ type: "divider", sectionId: s }, { type: "section", sectionId: s }); }
      flow.push({ type: "questions" }, { type: "rationales" }, { type: "summary" });
      return flow;
    })(),
    imageSlots: [
      { id: "cover-hero", label: "Cover Illustration", promptHint: "bundle nursing study guide cover" },
      { id: "ch1-icon", label: "Ch 1 Icon", promptHint: "pathophysiology section icon" },
      { id: "ch2-icon", label: "Ch 2 Icon", promptHint: "nursing assessment icon" },
      { id: "ch3-icon", label: "Ch 3 Icon", promptHint: "medication management icon" },
    ],
    includesQuestions: true, defaultQuestionCount: 40,
  },
];

const GUIDED_EXAM_OPTIONS = [
  { id: "rex-pn", label: "REx-PN (Canada)", region: "CA" },
  { id: "nclex-pn", label: "NCLEX-PN (US)", region: "US" },
  { id: "nclex-rn", label: "NCLEX-RN (US)", region: "US" },
  { id: "np", label: "NP (AANP/ANCC)", region: "US" },
];

type CompileStep = "plan" | "ai" | "compile" | "images" | "store-ready" | "done";

function computeSectionBudgets(bp: TemplateBlueprint, targetPages: number) {
  const totalChars = targetPages * bp.charsPerPage;
  let weightSum = 0;
  for (const s of bp.sections) weightSum += s.weight;
  const budgets: Record<string, number> = {};
  for (const s of bp.sections) {
    budgets[s.id] = Math.round((totalChars * s.weight) / (weightSum || 1));
  }
  return { totalChars, budgets };
}

function parseAIJsonResponse(raw: string): any {
  let text = raw.trim();
  const jsonStart = text.indexOf("{");
  const jsonEnd = text.lastIndexOf("}");
  if (jsonStart >= 0 && jsonEnd > jsonStart) {
    text = text.substring(jsonStart, jsonEnd + 1);
  }
  try { return JSON.parse(text); } catch { return null; }
}

function applyThemeToPageObjects(objects: CanvasObject[], oldTheme: ThemeConfig, newTheme: ThemeConfig): CanvasObject[] {
  const colorMap: Record<string, string> = {};
  const keys: (keyof ThemeConfig)[] = [
    "primaryColor","secondaryColor","accentColor","backgroundColor","sectionBg","sectionBgAlt",
    "headingColor","bodyColor","bodyColorLight","dangerColor","successColor","warningColor",
    "dividerColor","badgeBg","badgeText","tableBorderColor","tableRowEven","tableRowOdd",
    "pearlBg","pearlBorder","flagBg","flagBorder","coverBg","coverBgOverlay",
  ];
  for (const k of keys) {
    const oldVal = oldTheme[k] as string;
    const newVal = newTheme[k] as string;
    if (oldVal && newVal && oldVal !== newVal) colorMap[oldVal.toLowerCase()] = newVal;
  }
  const fontMap: Record<string, string> = {};
  if (oldTheme.headingFont !== newTheme.headingFont) fontMap[oldTheme.headingFont] = newTheme.headingFont;
  if (oldTheme.bodyFont !== newTheme.bodyFont) fontMap[oldTheme.bodyFont] = newTheme.bodyFont;

  return objects.map(obj => {
    const updated = { ...obj };
    if (updated.fill) {
      const mapped = colorMap[updated.fill.toLowerCase()];
      if (mapped) updated.fill = mapped;
    }
    if (updated.stroke) {
      const mapped = colorMap[updated.stroke.toLowerCase()];
      if (mapped) updated.stroke = mapped;
    }
    if (updated.fontFamily && fontMap[updated.fontFamily]) {
      updated.fontFamily = fontMap[updated.fontFamily];
    }
    return updated;
  });
}

const BRAND = {
  primary: "#7c3aed",
  secondary: "#06b6d4",
  accent: "#f59e0b",
  danger: "#ef4444",
  success: "#10b981",
  neutral: "#f8fafc",
  textDark: "#1e293b",
  textLight: "#64748b",
  fontHeading: "Inter",
  fontBody: "Inter",
};

interface CanvasObject {
  id: string;
  type: "text" | "rect" | "circle" | "image";
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  content?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  src?: string;
  borderRadius?: number;
  textAlign?: string;
  zIndex: number;
  locked?: boolean;
  tag?: string;
  groupId?: string;
}

function uid() {
  return `obj-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

function gid() {
  return `grp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

const DESIGN_COMPONENTS: { label: string; icon: any; tag: string; objects: Partial<CanvasObject>[] }[] = [
  {
    label: "Clinical Pearl",
    icon: Sparkles,
    tag: "clinical-pearl",
    objects: [
      { type: "rect", width: 520, height: 90, fill: "#ede9fe", stroke: "#7c3aed", strokeWidth: 2, borderRadius: 10 },
      { type: "text", x: 14, y: 8, width: 492, height: 20, content: "Clinical Pearl", fontSize: 13, fontWeight: "bold", fill: "#7c3aed", fontFamily: "Inter" },
      { type: "text", x: 14, y: 32, width: 492, height: 48, content: "Key insight goes here...", fontSize: 11, fontWeight: "normal", fill: "#1e293b", fontFamily: "Inter" },
    ],
  },
  {
    label: "Red Flag",
    icon: AlertTriangle,
    tag: "red-flag",
    objects: [
      { type: "rect", width: 520, height: 90, fill: "#fef2f2", stroke: "#ef4444", strokeWidth: 2, borderRadius: 10 },
      { type: "text", x: 14, y: 8, width: 492, height: 20, content: "Red Flag", fontSize: 13, fontWeight: "bold", fill: "#dc2626", fontFamily: "Inter" },
      { type: "text", x: 14, y: 32, width: 492, height: 48, content: "Critical warning...", fontSize: 11, fontWeight: "normal", fill: "#1e293b", fontFamily: "Inter" },
    ],
  },
  {
    label: "Exam Trap",
    icon: Target,
    tag: "exam-trap",
    objects: [
      { type: "rect", width: 520, height: 90, fill: "#fef9c3", stroke: "#ca8a04", strokeWidth: 2, borderRadius: 10 },
      { type: "text", x: 14, y: 8, width: 492, height: 20, content: "Exam Trap", fontSize: 13, fontWeight: "bold", fill: "#a16207", fontFamily: "Inter" },
      { type: "text", x: 14, y: 32, width: 492, height: 48, content: "Common test pitfall...", fontSize: 11, fontWeight: "normal", fill: "#1e293b", fontFamily: "Inter" },
    ],
  },
  {
    label: "Most Tested",
    icon: Star,
    tag: "most-tested",
    objects: [
      { type: "rect", width: 180, height: 28, fill: "#7c3aed", borderRadius: 14 },
      { type: "text", x: 10, y: 4, width: 160, height: 20, content: "Most Tested Concept", fontSize: 11, fontWeight: "bold", fill: "#ffffff", fontFamily: "Inter", textAlign: "center" },
    ],
  },
  {
    label: "Common Mistake",
    icon: Shield,
    tag: "common-mistake",
    objects: [
      { type: "rect", width: 520, height: 90, fill: "#fff7ed", stroke: "#ea580c", strokeWidth: 2, borderRadius: 10 },
      { type: "text", x: 14, y: 8, width: 492, height: 20, content: "Common Mistake", fontSize: 13, fontWeight: "bold", fill: "#ea580c", fontFamily: "Inter" },
      { type: "text", x: 14, y: 32, width: 492, height: 48, content: "Students often confuse...", fontSize: 11, fontWeight: "normal", fill: "#1e293b", fontFamily: "Inter" },
    ],
  },
  {
    label: "High-Yield Badge",
    icon: Award,
    tag: "high-yield",
    objects: [
      { type: "rect", width: 150, height: 28, fill: "#10b981", borderRadius: 14 },
      { type: "text", x: 8, y: 4, width: 134, height: 20, content: "HIGH-YIELD ONLY", fontSize: 10, fontWeight: "bold", fill: "#ffffff", fontFamily: "Inter", textAlign: "center" },
    ],
  },
  {
    label: "Confidence Check",
    icon: ClipboardCheck,
    tag: "confidence-check",
    objects: [
      { type: "rect", width: 520, height: 140, fill: "#f0fdf4", stroke: "#22c55e", strokeWidth: 2, borderRadius: 10 },
      { type: "text", x: 14, y: 8, width: 492, height: 20, content: "Confidence Checklist", fontSize: 13, fontWeight: "bold", fill: "#15803d", fontFamily: "Inter" },
      { type: "text", x: 14, y: 32, width: 492, height: 96, content: "[ ] I can explain the pathophysiology\n[ ] I know the priority assessments\n[ ] I can identify key medications\n[ ] I recognize red flags\n[ ] I understand the nursing priorities", fontSize: 10, fontWeight: "normal", fill: "#1e293b", fontFamily: "Inter" },
    ],
  },
];

const PAGE_TEMPLATES: { label: string; icon: any; generate: (w: number, h: number) => CanvasObject[] }[] = [
  {
    label: "Cover Page",
    icon: BookOpen,
    generate: (w, h) => generateCoverPage(w, h, getTheme("soft-clinical")),
  },
  {
    label: "Section Divider",
    icon: LayoutTemplate,
    generate: (w, h) => [
      { id: uid(), type: "rect" as const, x: 0, y: 0, width: w, height: h, fill: "#f8fafc", rotation: 0, opacity: 1, zIndex: 0, borderRadius: 0 },
      { id: uid(), type: "rect" as const, x: 0, y: h / 2 - 80, width: w, height: 160, fill: "#7c3aed", rotation: 0, opacity: 1, zIndex: 1, borderRadius: 0 },
      { id: uid(), type: "text" as const, x: 46, y: h / 2 - 40, width: w - 92, height: 40, content: "SECTION TITLE", fontSize: 32, fontWeight: "bold", fill: "#ffffff", fontFamily: "Inter", rotation: 0, opacity: 1, zIndex: 2, textAlign: "center" },
      { id: uid(), type: "text" as const, x: 46, y: h / 2 + 10, width: w - 92, height: 24, content: "Subsection description", fontSize: 14, fontWeight: "normal", fill: "#e0d5f5", fontFamily: "Inter", rotation: 0, opacity: 1, zIndex: 3, textAlign: "center" },
    ],
  },
  {
    label: "Comparison Grid",
    icon: Grid3X3,
    generate: (w, h) => {
      const col = (w - 92) / 2;
      return [
        { id: uid(), type: "rect" as const, x: 0, y: 0, width: w, height: h, fill: "#ffffff", rotation: 0, opacity: 1, zIndex: 0, borderRadius: 0 },
        { id: uid(), type: "text" as const, x: 46, y: 30, width: w - 92, height: 30, content: "COMPARISON", fontSize: 22, fontWeight: "bold", fill: "#1e293b", fontFamily: "Inter", rotation: 0, opacity: 1, zIndex: 1, textAlign: "center" },
        { id: uid(), type: "rect" as const, x: 46, y: 80, width: col - 5, height: 36, fill: "#ef4444", borderRadius: 6, rotation: 0, opacity: 1, zIndex: 2 },
        { id: uid(), type: "text" as const, x: 56, y: 86, width: col - 25, height: 24, content: "HYPER", fontSize: 14, fontWeight: "bold", fill: "#fff", fontFamily: "Inter", rotation: 0, opacity: 1, zIndex: 3, textAlign: "center" },
        { id: uid(), type: "rect" as const, x: 46 + col + 5, y: 80, width: col - 5, height: 36, fill: "#3b82f6", borderRadius: 6, rotation: 0, opacity: 1, zIndex: 4 },
        { id: uid(), type: "text" as const, x: 56 + col + 5, y: 86, width: col - 25, height: 24, content: "HYPO", fontSize: 14, fontWeight: "bold", fill: "#fff", fontFamily: "Inter", rotation: 0, opacity: 1, zIndex: 5, textAlign: "center" },
        { id: uid(), type: "rect" as const, x: 46, y: 126, width: col - 5, height: 550, fill: "#fef2f2", borderRadius: 8, rotation: 0, opacity: 1, zIndex: 6, stroke: "#fca5a5", strokeWidth: 1 },
        { id: uid(), type: "rect" as const, x: 46 + col + 5, y: 126, width: col - 5, height: 550, fill: "#eff6ff", borderRadius: 8, rotation: 0, opacity: 1, zIndex: 7, stroke: "#93c5fd", strokeWidth: 1 },
        { id: uid(), type: "text" as const, x: 56, y: 136, width: col - 25, height: 530, content: "Signs & symptoms...\n\nKey values...\n\nInterventions...", fontSize: 10, fontWeight: "normal", fill: "#1e293b", fontFamily: "Inter", rotation: 0, opacity: 1, zIndex: 8 },
        { id: uid(), type: "text" as const, x: 56 + col + 5, y: 136, width: col - 25, height: 530, content: "Signs & symptoms...\n\nKey values...\n\nInterventions...", fontSize: 10, fontWeight: "normal", fill: "#1e293b", fontFamily: "Inter", rotation: 0, opacity: 1, zIndex: 9 },
      ];
    },
  },
  {
    label: "Medication Table",
    icon: FileText,
    generate: (w, h) => {
      const cw = w - 92;
      const rows = [
        { label: "Drug Class", value: "e.g., Beta Blockers" },
        { label: "Prototype", value: "Metoprolol" },
        { label: "Mechanism", value: "Blocks beta-1 receptors" },
        { label: "Indications", value: "HTN, HF, Angina, Arrhythmias" },
        { label: "Side Effects", value: "Bradycardia, hypotension, fatigue" },
        { label: "Nursing Alerts", value: "Hold if HR < 60, check BP" },
      ];
      const rh = 60;
      const objs: CanvasObject[] = [
        { id: uid(), type: "rect", x: 0, y: 0, width: w, height: h, fill: "#ffffff", rotation: 0, opacity: 1, zIndex: 0, borderRadius: 0 },
        { id: uid(), type: "text", x: 46, y: 30, width: cw, height: 30, content: "MEDICATION SUMMARY", fontSize: 20, fontWeight: "bold", fill: "#1e293b", fontFamily: "Inter", rotation: 0, opacity: 1, zIndex: 1, textAlign: "center" },
      ];
      rows.forEach((r, i) => {
        const y = 80 + i * (rh + 6);
        const bg = i % 2 === 0 ? "#f8fafc" : "#f1f5f9";
        objs.push(
          { id: uid(), type: "rect", x: 46, y, width: cw, height: rh, fill: bg, borderRadius: 6, rotation: 0, opacity: 1, zIndex: 2 + i * 3, stroke: "#e2e8f0", strokeWidth: 1 },
          { id: uid(), type: "text", x: 56, y: y + 6, width: 140, height: 16, content: r.label, fontSize: 10, fontWeight: "bold", fill: BRAND.primary, fontFamily: "Inter", rotation: 0, opacity: 1, zIndex: 3 + i * 3 },
          { id: uid(), type: "text", x: 56, y: y + 24, width: cw - 20, height: 30, content: r.value, fontSize: 10, fontWeight: "normal", fill: "#334155", fontFamily: "Inter", rotation: 0, opacity: 1, zIndex: 4 + i * 3 },
        );
      });
      return objs;
    },
  },
  {
    label: "Algorithm Flow",
    icon: Zap,
    generate: (w, h) => {
      const cx = w / 2;
      return [
        { id: uid(), type: "rect" as const, x: 0, y: 0, width: w, height: h, fill: "#ffffff", rotation: 0, opacity: 1, zIndex: 0, borderRadius: 0 },
        { id: uid(), type: "text" as const, x: 46, y: 30, width: w - 92, height: 30, content: "DECISION ALGORITHM", fontSize: 20, fontWeight: "bold", fill: "#1e293b", fontFamily: "Inter", rotation: 0, opacity: 1, zIndex: 1, textAlign: "center" },
        { id: uid(), type: "rect" as const, x: cx - 110, y: 80, width: 220, height: 44, fill: "#7c3aed", borderRadius: 8, rotation: 0, opacity: 1, zIndex: 2 },
        { id: uid(), type: "text" as const, x: cx - 100, y: 90, width: 200, height: 24, content: "Assessment Finding", fontSize: 12, fontWeight: "bold", fill: "#fff", fontFamily: "Inter", rotation: 0, opacity: 1, zIndex: 3, textAlign: "center" },
        { id: uid(), type: "rect" as const, x: cx - 130, y: 160, width: 260, height: 44, fill: "#fef9c3", borderRadius: 22, stroke: "#ca8a04", strokeWidth: 2, rotation: 0, opacity: 1, zIndex: 4 },
        { id: uid(), type: "text" as const, x: cx - 120, y: 168, width: 240, height: 28, content: "Is the patient stable?", fontSize: 12, fontWeight: "600", fill: "#92400e", fontFamily: "Inter", rotation: 0, opacity: 1, zIndex: 5, textAlign: "center" },
        { id: uid(), type: "rect" as const, x: cx - 200, y: 240, width: 170, height: 44, fill: "#dcfce7", borderRadius: 8, stroke: "#22c55e", strokeWidth: 1, rotation: 0, opacity: 1, zIndex: 6 },
        { id: uid(), type: "text" as const, x: cx - 190, y: 248, width: 150, height: 28, content: "YES: Monitor", fontSize: 11, fontWeight: "600", fill: "#166534", fontFamily: "Inter", rotation: 0, opacity: 1, zIndex: 7, textAlign: "center" },
        { id: uid(), type: "rect" as const, x: cx + 30, y: 240, width: 170, height: 44, fill: "#fef2f2", borderRadius: 8, stroke: "#ef4444", strokeWidth: 1, rotation: 0, opacity: 1, zIndex: 8 },
        { id: uid(), type: "text" as const, x: cx + 40, y: 248, width: 150, height: 28, content: "NO: Intervene", fontSize: 11, fontWeight: "600", fill: "#991b1b", fontFamily: "Inter", rotation: 0, opacity: 1, zIndex: 9, textAlign: "center" },
      ];
    },
  },
  {
    label: "Checklist Page",
    icon: ClipboardCheck,
    generate: (w, h) => [
      { id: uid(), type: "rect" as const, x: 0, y: 0, width: w, height: h, fill: "#ffffff", rotation: 0, opacity: 1, zIndex: 0, borderRadius: 0 },
      { id: uid(), type: "text" as const, x: 46, y: 30, width: w - 92, height: 30, content: "CONFIDENCE CHECKLIST", fontSize: 20, fontWeight: "bold", fill: "#1e293b", fontFamily: "Inter", rotation: 0, opacity: 1, zIndex: 1, textAlign: "center" },
      { id: uid(), type: "rect" as const, x: 46, y: 80, width: w - 92, height: 600, fill: "#f0fdf4", borderRadius: 12, stroke: "#86efac", strokeWidth: 2, rotation: 0, opacity: 1, zIndex: 2 },
      { id: uid(), type: "text" as const, x: 66, y: 100, width: w - 132, height: 560, content: "[ ] I can describe the pathophysiology\n\n[ ] I know the priority nursing assessments\n\n[ ] I can identify key medications and side effects\n\n[ ] I recognize early vs late signs\n\n[ ] I know the red flags requiring immediate action\n\n[ ] I understand the diagnostic findings\n\n[ ] I can teach the patient about their condition\n\n[ ] I am confident in exam-style questions on this topic\n\n[ ] I reviewed common exam traps\n\n[ ] I practiced with case scenarios", fontSize: 12, fontWeight: "normal", fill: "#1e293b", fontFamily: "Inter", rotation: 0, opacity: 1, zIndex: 3 },
    ],
  },
];

const AI_TOOLS = [
  { id: "cram-section", label: "Full Cram Section", icon: BookOpen, prompt: "Generate a comprehensive cram section" },
  { id: "pathophysiology", label: "Pathophysiology", icon: Brain, prompt: "Generate a pathophysiology explanation" },
  { id: "signs-symptoms", label: "Signs & Symptoms", icon: AlertTriangle, prompt: "Generate early vs late signs and symptoms" },
  { id: "diagnostics", label: "Diagnostics", icon: Target, prompt: "Generate key diagnostic findings and lab values" },
  { id: "management", label: "Management", icon: Shield, prompt: "Generate management and treatment priorities" },
  { id: "nursing-priorities", label: "Nursing Priorities", icon: Star, prompt: "Generate priority nursing interventions" },
  { id: "exam-traps", label: "Exam Traps", icon: AlertTriangle, prompt: "Generate common exam traps and distractors" },
  { id: "practice-questions", label: "Practice Questions", icon: ClipboardCheck, prompt: "Generate NCLEX-style practice questions" },
  { id: "high-yield", label: "Condense High-Yield", icon: Zap, prompt: "Condense to high-yield bullet points only" },
  { id: "accuracy-review", label: "Accuracy Review", icon: CheckCircle, prompt: "Review for clinical accuracy and flag issues" },
  { id: "product-listing", label: "Product Listing", icon: ShoppingCart, prompt: "Generate SEO-optimized product listing" },
  { id: "flashcards", label: "Convert to Flashcards", icon: Layers, prompt: "Convert content to flashcard format" },
  { id: "question-bank", label: "Convert to Q-Bank", icon: FileText, prompt: "Convert to structured question bank" },
  { id: "suggest-diagrams", label: "Suggest Diagrams", icon: ImagePlus, prompt: "Suggest medical diagrams to include" },
  { id: "bundle-generator", label: "Bundle: Cram + QBank + Flash + Listing", icon: Crown, prompt: "Generate a full product bundle" },
];

function ProjectListView({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  const [projects, setProjects] = useState<DesignProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState("booklet");
  const [newPageSize, setNewPageSize] = useState("Letter");
  const [newOrientation, setNewOrientation] = useState("portrait");

  useEffect(() => {
    adminFetch(`/api/admin/design-projects`)
      .then(r => { if (!r.ok) throw new Error("Unauthorized"); return r.json(); })
      .then(data => { if (Array.isArray(data)) setProjects(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const createProject = async () => {
    if (!newTitle.trim()) return;
    const res = await adminFetch("/api/admin/design-projects", {
      method: "POST",
      body: { title: newTitle, type: newType, pageSize: newPageSize, orientation: newOrientation },
    });
    if (res.ok) {
      const project = await res.json();
      onOpenProject(project.id);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Delete this project and all its pages?")) return;
    await adminFetch(`/api/admin/design-projects/${id}`, { method: "DELETE" });
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" data-testid="text-builder-title">Digital Product Builder</h1>
          <p className="text-sm text-gray-500 mt-1">Create professional study materials for your marketplace</p>
        </div>
        <Button onClick={() => setShowCreate(!showCreate)} className="gap-2" data-testid="button-new-project">
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </div>

      {showCreate && (
        <Card className="mb-6 border-primary/20" data-testid="card-create-project">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <Input placeholder="Project title" value={newTitle} onChange={e => setNewTitle(e.target.value)} className="text-sm" data-testid="input-project-title" />
              <select value={newType} onChange={e => setNewType(e.target.value)} className="text-sm border rounded-md px-3 py-2" data-testid="select-project-type">
                <option value="booklet">Booklet</option>
                <option value="one-pager">One-Pager</option>
                <option value="poster">Poster</option>
                <option value="cheat-sheet">Cheat Sheet</option>
                <option value="bundle">Bundle</option>
              </select>
              <select value={newPageSize} onChange={e => setNewPageSize(e.target.value)} className="text-sm border rounded-md px-3 py-2" data-testid="select-page-size">
                <option value="Letter">Letter (8.5x11)</option>
                <option value="A4">A4</option>
                <option value="5x7">5x7</option>
              </select>
              <select value={newOrientation} onChange={e => setNewOrientation(e.target.value)} className="text-sm border rounded-md px-3 py-2" data-testid="select-orientation">
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
              <Button onClick={createProject} disabled={!newTitle.trim()} data-testid="button-create-project">Create</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="text-center py-16" data-testid="text-no-projects">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No design projects yet. Create your first one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map(project => (
            <Card key={project.id} className="group cursor-pointer hover:border-primary/30 transition-colors" onClick={() => onOpenProject(project.id)} data-testid={`card-project-${project.id}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-800 truncate">{project.title}</h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{project.type}</span>
                      <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{project.pageSize}</span>
                      <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{project.orientation}</span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-2">Updated {new Date(project.updatedAt).toLocaleDateString()}</p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); deleteProject(project.id); }} className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-50 rounded transition-all" data-testid={`button-delete-project-${project.id}`}>
                    <Trash2 className="w-3.5 h-3.5 text-red-400" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function GuidedModeView({ projectId, onBack, onSwitchToCanvas }: { projectId: string; onBack: () => void; onSwitchToCanvas: () => void }) {
  const { toast } = useToast();
  const [project, setProject] = useState<DesignProject | null>(null);
  const [template, setTemplate] = useState<string>("cram");
  const [topic, setTopic] = useState("");
  const [examTier, setExamTier] = useState("nclex-rn");
  const [region, setRegion] = useState("BOTH");
  const [targetPages, setTargetPages] = useState(45);
  const [themeId, setThemeId] = useState("soft-clinical");
  const [coverPreset, setCoverPreset] = useState("soft-pastel");
  const [includeQuestions, setIncludeQuestions] = useState(true);
  const [questionCount, setQuestionCount] = useState(25);
  const [includeImages, setIncludeImages] = useState(true);
  const [imageIntensity, setImageIntensity] = useState<"low" | "medium">("low");
  const [autoStoreReady, setAutoStoreReady] = useState(true);

  const [compileStep, setCompileStep] = useState<CompileStep>("plan");
  const [generating, setGenerating] = useState(false);
  const [stepLabel, setStepLabel] = useState("");
  const [compiledPages, setCompiledPages] = useState<number>(0);
  const [isComplete, setIsComplete] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const [compiledThemeId, setCompiledThemeId] = useState<string | null>(null);
  const [switchingTheme, setSwitchingTheme] = useState(false);

  const bp = TEMPLATE_BLUEPRINTS.find(t => t.id === template) || TEMPLATE_BLUEPRINTS[0];
  const theme = getTheme(themeId);
  const preset = COVER_PRESETS.find(p => p.id === coverPreset) || COVER_PRESETS[0];
  const { totalChars, budgets } = computeSectionBudgets(bp, targetPages);
  const STEPS_ORDER: CompileStep[] = ["plan", "ai", "compile", "images", "store-ready", "done"];
  const STEP_LABELS: Record<CompileStep, string> = { plan: "Building Plan", ai: "Generating Content", compile: "Compiling Pages", images: "Generating Images", "store-ready": "Store-Ready Pass", done: "Complete" };

  useEffect(() => {
    setTargetPages(bp.defaultPages);
    setQuestionCount(bp.defaultQuestionCount);
    setIncludeQuestions(bp.includesQuestions);
  }, [template]);

  useEffect(() => {
    adminFetch(`/api/admin/design-projects/${projectId}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setProject(data); })
      .catch(() => {});
  }, [projectId]);

  const W = 612;
  const H = 792;
  const M = 46;
  const contentW = W - M * 2;

  const renderTOCPage = (th: ThemeConfig, sectionTitles: string[], startPage: number): CanvasObject[] => {
    const objs: CanvasObject[] = [];
    let z = 0;
    objs.push({ id: uid(), type: "rect", x: 0, y: 0, width: W, height: H, fill: th.backgroundColor, rotation: 0, opacity: 1, zIndex: z++ });
    objs.push({ id: uid(), type: "rect", x: 0, y: 0, width: W, height: 6, fill: th.primaryColor, rotation: 0, opacity: 0.8, zIndex: z++ });
    objs.push({ id: uid(), type: "text", x: M, y: M, width: contentW, height: 36, content: "TABLE OF CONTENTS", fontSize: 22, fontWeight: "bold", fill: th.headingColor, fontFamily: th.headingFont, rotation: 0, opacity: 1, zIndex: z++, textAlign: "left" });
    objs.push({ id: uid(), type: "rect", x: M, y: M + 42, width: 80, height: 3, fill: th.primaryColor, rotation: 0, opacity: 0.4, zIndex: z++ });
    let pgNum = startPage;
    sectionTitles.forEach((title, i) => {
      const yPos = M + 64 + i * 30;
      if (yPos < H - M - 20) {
        objs.push({ id: uid(), type: "text", x: M + 4, y: yPos, width: 22, height: 20, content: `${i + 1}.`, fontSize: 11, fontWeight: "bold", fill: th.primaryColor, fontFamily: th.bodyFont, rotation: 0, opacity: 0.7, zIndex: z++, textAlign: "right" });
        objs.push({ id: uid(), type: "text", x: M + 30, y: yPos, width: contentW - 80, height: 20, content: title, fontSize: 12, fontWeight: "600", fill: th.bodyColor, fontFamily: th.bodyFont, rotation: 0, opacity: 1, zIndex: z++, textAlign: "left" });
        objs.push({ id: uid(), type: "rect", x: M + 30, y: yPos + 18, width: contentW - 80, height: 1, fill: th.dividerColor, rotation: 0, opacity: 0.3, zIndex: z++ });
        objs.push({ id: uid(), type: "text", x: M + contentW - 40, y: yPos, width: 40, height: 20, content: `${pgNum}`, fontSize: 11, fontWeight: "normal", fill: th.bodyColorLight, fontFamily: th.bodyFont, rotation: 0, opacity: 0.5, zIndex: z++, textAlign: "right" });
      }
      pgNum += 2;
    });
    objs.push({ id: uid(), type: "text", x: M, y: H - 30, width: contentW, height: 12, content: "NurseNest", fontSize: 8, fontWeight: "normal", fill: th.bodyColorLight, fontFamily: th.bodyFont, rotation: 0, opacity: 0.3, zIndex: z++, textAlign: "center" });
    return objs;
  };

  const renderSummaryPage = (th: ThemeConfig, topicStr: string): CanvasObject[] => {
    const objs: CanvasObject[] = [];
    let z = 0;
    objs.push({ id: uid(), type: "rect", x: 0, y: 0, width: W, height: H, fill: th.sectionBg, rotation: 0, opacity: 1, zIndex: z++ });
    objs.push({ id: uid(), type: "rect", x: M, y: M, width: contentW, height: 70, fill: th.primaryColor, borderRadius: 14, rotation: 0, opacity: 1, zIndex: z++ });
    objs.push({ id: uid(), type: "text", x: M + 16, y: M + 14, width: contentW - 32, height: 26, content: "KEY TAKEAWAYS", fontSize: 20, fontWeight: "bold", fill: "#ffffff", fontFamily: th.headingFont, rotation: 0, opacity: 1, zIndex: z++, textAlign: "center" });
    objs.push({ id: uid(), type: "text", x: M + 16, y: M + 42, width: contentW - 32, height: 16, content: topicStr, fontSize: 11, fontWeight: "normal", fill: "#ffffffcc", fontFamily: th.bodyFont, rotation: 0, opacity: 1, zIndex: z++, textAlign: "center" });
    objs.push({ id: uid(), type: "text", x: M, y: M + 90, width: contentW, height: H - M * 2 - 120, content: "Review the key points from this guide before your exam.\n\nUse this page as your final quick-reference checklist.\n\nGood luck!", fontSize: 11, fontWeight: "normal", fill: th.bodyColor, fontFamily: th.bodyFont, rotation: 0, opacity: 0.8, zIndex: z++, textAlign: "left" });
    objs.push({ id: uid(), type: "text", x: M, y: H - 30, width: contentW, height: 12, content: `\u00A9 ${new Date().getFullYear()} NurseNest  \u2022  ${topicStr}`, fontSize: 8, fontWeight: "normal", fill: th.bodyColorLight, fontFamily: th.bodyFont, rotation: 0, opacity: 0.4, zIndex: z++, textAlign: "center" });
    return objs;
  };

  const renderBlocksToPages = (blocks: any[], sectionTitle: string, th: ThemeConfig) => {
    const pages: CanvasObject[][] = [];
    let pageObjs: CanvasObject[] = [];
    let curY = M;
    let z = 0;
    let pageCount = 0;

    const initPage = () => {
      pageObjs = [];
      z = 0;
      curY = M;
      pageObjs.push({ id: uid(), type: "rect", x: 0, y: 0, width: W, height: H, fill: th.backgroundColor, rotation: 0, opacity: 1, zIndex: z++ });
      pageObjs.push({ id: uid(), type: "rect", x: 0, y: 0, width: W, height: 4, fill: th.primaryColor, rotation: 0, opacity: 0.15, zIndex: z++ });
    };

    const flushPage = () => {
      pageCount++;
      pageObjs.push({ id: uid(), type: "text", x: M, y: H - 28, width: contentW, height: 12, content: `${sectionTitle}  \u2022  NurseNest  \u2022  Page ${pageCount}`, fontSize: 7, fontWeight: "normal", fill: th.bodyColorLight, fontFamily: th.bodyFont, rotation: 0, opacity: 0.35, zIndex: 999, textAlign: "center" });
      pages.push([...pageObjs]);
      initPage();
    };

    const maxY = H - M - 34;

    const ensureSpace = (needed: number) => {
      if (curY + needed > maxY) flushPage();
    };

    initPage();

    for (const block of blocks) {
      const kind = block.kind || block.type || "paragraph";
      const text = block.text || block.content || block.body || "";
      const title = block.title || "";

      if (kind === "heading") {
        const level = block.level || 1;
        const fs = level === 1 ? 17 : level === 2 ? 14 : 12;
        const bh = level === 1 ? 38 : level === 2 ? 32 : 28;
        ensureSpace(bh);
        if (level <= 2) {
          pageObjs.push({ id: uid(), type: "rect", x: M, y: curY + bh - 6, width: level === 1 ? 60 : 40, height: 2.5, fill: th.primaryColor, rotation: 0, opacity: 0.4, zIndex: z++ });
        }
        pageObjs.push({ id: uid(), type: "text", x: M, y: curY, width: contentW, height: bh - 8, content: text, fontSize: fs, fontWeight: "bold", fill: th.headingColor, fontFamily: th.headingFont, rotation: 0, opacity: 1, zIndex: z++, textAlign: "left" });
        curY += bh;
      } else if (kind === "paragraph") {
        const lines = Math.max(1, Math.ceil(text.length / 78));
        const bh = Math.max(18, lines * 14 + 6);
        ensureSpace(bh);
        pageObjs.push({ id: uid(), type: "text", x: M, y: curY, width: contentW, height: bh, content: text, fontSize: 10, fontWeight: "normal", fill: th.bodyColor, fontFamily: th.bodyFont, rotation: 0, opacity: 1, zIndex: z++, textAlign: "left" });
        curY += bh + 4;
      } else if (kind === "bullets" || kind === "list") {
        const items = block.items || (typeof text === "string" ? text.split("\n").filter((s: string) => s.trim()) : []);
        const bh = items.length * 17 + 6;
        ensureSpace(Math.min(bh, 200));
        items.forEach((item: string, idx: number) => {
          if (curY + 17 > maxY) flushPage();
          pageObjs.push({ id: uid(), type: "text", x: M + 14, y: curY, width: contentW - 28, height: 15, content: `\u2022  ${item.replace(/^[-*]\s*/, "").trim()}`, fontSize: 10, fontWeight: "normal", fill: th.bodyColor, fontFamily: th.bodyFont, rotation: 0, opacity: 1, zIndex: z++, textAlign: "left" });
          curY += 17;
        });
        curY += 6;
      } else if (kind === "table") {
        const cols: string[] = block.columns || [];
        const rows: string[][] = block.rows || [];
        const caption = block.caption || "";
        const colW = cols.length > 0 ? (contentW - 4) / cols.length : contentW;
        const headerH = 24;
        const rowH = 22;
        const totalH = headerH + rows.length * rowH + (caption ? 18 : 0) + 8;
        ensureSpace(Math.min(totalH, 200));
        if (caption) {
          pageObjs.push({ id: uid(), type: "text", x: M, y: curY, width: contentW, height: 14, content: caption, fontSize: 9, fontWeight: "bold", fill: th.bodyColorLight, fontFamily: th.bodyFont, rotation: 0, opacity: 0.7, zIndex: z++, textAlign: "left" });
          curY += 16;
        }
        pageObjs.push({ id: uid(), type: "rect", x: M, y: curY, width: contentW, height: headerH, fill: th.primaryColor, borderRadius: 4, rotation: 0, opacity: 0.9, zIndex: z++ });
        cols.forEach((col, ci) => {
          pageObjs.push({ id: uid(), type: "text", x: M + 4 + ci * colW, y: curY + 4, width: colW - 8, height: 16, content: col, fontSize: 9, fontWeight: "bold", fill: "#ffffff", fontFamily: th.bodyFont, rotation: 0, opacity: 1, zIndex: z++, textAlign: "left" });
        });
        curY += headerH;
        rows.forEach((row, ri) => {
          if (curY + rowH > maxY) flushPage();
          const bg = ri % 2 === 0 ? th.tableRowEven : th.tableRowOdd;
          pageObjs.push({ id: uid(), type: "rect", x: M, y: curY, width: contentW, height: rowH, fill: bg, rotation: 0, opacity: 1, zIndex: z++, stroke: th.tableBorderColor, strokeWidth: 0.5 });
          row.forEach((cell, ci) => {
            if (ci < cols.length) {
              pageObjs.push({ id: uid(), type: "text", x: M + 4 + ci * colW, y: curY + 3, width: colW - 8, height: 16, content: cell, fontSize: 9, fontWeight: "normal", fill: th.bodyColor, fontFamily: th.bodyFont, rotation: 0, opacity: 1, zIndex: z++, textAlign: "left" });
            }
          });
          curY += rowH;
        });
        curY += 8;
      } else if (kind === "callout" || kind === "clinical-pearl" || kind === "clinical_pearl" || kind === "exam_tip" || kind === "trap" || kind === "warning") {
        const flavor = block.flavor || kind;
        let bg = th.pearlBg, border = th.pearlBorder, label = "CLINICAL PEARL", labelColor = th.primaryColor;
        if (flavor === "exam_tip" || flavor === "exam-tip") { bg = th.sectionBg; border = th.secondaryColor; label = "EXAM TIP"; labelColor = th.secondaryColor; }
        else if (flavor === "trap" || flavor === "exam-trap") { bg = th.flagBg; border = th.warningColor; label = "EXAM TRAP"; labelColor = th.warningColor; }
        else if (flavor === "warning") { bg = th.flagBg; border = th.flagBorder; label = "\u26A0 WARNING"; labelColor = th.dangerColor; }
        const bodyText = text || block.body || "";
        const titleText = title || block.title || label;
        const bh = Math.max(58, Math.ceil(bodyText.length / 68) * 14 + 34);
        ensureSpace(bh + 8);
        pageObjs.push({ id: uid(), type: "rect", x: M, y: curY, width: contentW, height: bh, fill: bg, stroke: border, strokeWidth: 2, borderRadius: 10, rotation: 0, opacity: 1, zIndex: z++ });
        pageObjs.push({ id: uid(), type: "text", x: M + 14, y: curY + 8, width: contentW - 28, height: 14, content: titleText.toUpperCase(), fontSize: 8, fontWeight: "bold", fill: labelColor, fontFamily: th.bodyFont, rotation: 0, opacity: 0.9, zIndex: z++, textAlign: "left" });
        pageObjs.push({ id: uid(), type: "text", x: M + 14, y: curY + 26, width: contentW - 28, height: bh - 34, content: bodyText, fontSize: 10, fontWeight: "normal", fill: th.bodyColor, fontFamily: th.bodyFont, rotation: 0, opacity: 1, zIndex: z++, textAlign: "left" });
        curY += bh + 10;
      } else if (kind === "image") {
        const bh = 120;
        ensureSpace(bh + 8);
        pageObjs.push({ id: uid(), type: "rect", x: M + contentW * 0.15, y: curY, width: contentW * 0.7, height: bh, fill: th.sectionBgAlt, stroke: th.dividerColor, strokeWidth: 1, borderRadius: 8, rotation: 0, opacity: 1, zIndex: z++ });
        pageObjs.push({ id: uid(), type: "text", x: M + contentW * 0.15 + 8, y: curY + bh / 2 - 8, width: contentW * 0.7 - 16, height: 16, content: block.alt || block.promptHint || "[Image Placeholder]", fontSize: 9, fontWeight: "normal", fill: th.bodyColorLight, fontFamily: th.bodyFont, rotation: 0, opacity: 0.5, zIndex: z++, textAlign: "center" });
        curY += bh + 8;
      } else {
        const lines = Math.max(1, Math.ceil(text.length / 78));
        const bh = Math.max(18, lines * 14 + 6);
        ensureSpace(bh);
        pageObjs.push({ id: uid(), type: "text", x: M, y: curY, width: contentW, height: bh, content: text, fontSize: 10, fontWeight: "normal", fill: th.bodyColor, fontFamily: th.bodyFont, rotation: 0, opacity: 1, zIndex: z++, textAlign: "left" });
        curY += bh + 4;
      }
    }

    if (pageObjs.length > 2) flushPage();

    return pages;
  };

  const buildAIPrompt = (examCtx: any) => {
    const sectionList = bp.sections
      .filter(s => s.id !== "practice-questions" && s.id !== "rationales")
      .map(s => `  - id: "${s.id}", title: "${s.label}", budget: ~${budgets[s.id] || 800} characters`)
      .join("\n");

    return `You are a nursing exam content expert. Generate structured study content as valid JSON.

TOPIC: "${topic}"
TEMPLATE: ${bp.label}
AUDIENCE: ${examCtx?.label || "Nursing"} students
REGION: ${region === "BOTH" ? "Include both Canadian (metric, SI, °C, kg, mmol/L) and US (imperial, °F, lbs, mg/dL) values" : region === "CA" ? "Canadian context only (metric, SI units)" : "US context only (imperial, conventional units)"}
TARGET LENGTH: ~${totalChars} total characters across all sections

SECTIONS TO GENERATE:
${sectionList}

${includeQuestions ? `QUESTIONS: Generate ${questionCount} exam-style multiple-choice questions (4 options each) with rationales for EACH option.` : "NO QUESTIONS."}

BLOCK TYPES YOU MUST USE (mix them for variety):
- {"kind":"heading","text":"...","level":1|2|3}
- {"kind":"paragraph","text":"..."}
- {"kind":"bullets","items":["item1","item2","item3"]}
- {"kind":"table","columns":["Col1","Col2"],"rows":[["a","b"],["c","d"]],"caption":"optional"}
- {"kind":"callout","flavor":"exam_tip"|"trap"|"clinical_pearl","title":"...","body":"..."}

RULES:
- Return ONLY valid JSON, no markdown, no trailing commas, no comments
- Every section must have at least 3 blocks
- Include at least 1 callout per section (clinical_pearl, exam_tip, or trap)
- Keep paragraphs concise (2-4 sentences)
- Include at least 1 table per major section where appropriate
- Do NOT include keys not listed above

RETURN THIS EXACT STRUCTURE:
{"sections":[{"id":"section-id","title":"Section Title","blocks":[...]}]${includeQuestions ? ',"questions":[{"stem":"...","options":["A)...","B)...","C)...","D)..."],"correct":"A","rationale":"..."}]' : ""}}`;
  };

  const fetchAIContent = async (examCtx: any): Promise<any> => {
    const prompt = buildAIPrompt(examCtx);

    const res = await adminFetch("/api/ai/generate-content", {
      method: "POST",
      body: { prompt, mode: "generate", examTarget: examTier, topic },
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || err.message || "AI generation failed");
    }
    const data = await res.json();

    if (data.sections && Array.isArray(data.sections)) return data;

    const raw = typeof data === "string" ? data : JSON.stringify(data);
    const parsed = parseAIJsonResponse(raw);
    if (parsed?.sections) return parsed;

    setStepLabel("Retrying with JSON fix...");
    const fixPrompt = `The following AI output was not valid JSON or did not match the expected schema. Fix it and return ONLY valid JSON matching the original schema. Do not add explanation.

Original output:
${raw.slice(0, 3000)}

Expected structure: {"sections":[{"id":"...","title":"...","blocks":[...]}]}`;

    const res2 = await adminFetch("/api/ai/generate-content", {
      method: "POST",
      body: { prompt: fixPrompt, mode: "generate", examTarget: examTier, topic },
    });
    if (!res2.ok) throw new Error("AI retry failed");
    const data2 = await res2.json();
    if (data2.sections) return data2;
    const parsed2 = parseAIJsonResponse(typeof data2 === "string" ? data2 : JSON.stringify(data2));
    if (parsed2?.sections) return parsed2;

    return { sections: [{ id: "content", title: topic, blocks: [{ kind: "paragraph", text: raw.slice(0, 2000) }] }] };
  };

  const compileDocument = async () => {
    if (!topic.trim()) { toast({ title: "Enter a topic", variant: "destructive" }); return; }
    setGenerating(true);
    setLastError(null);
    setCompiledPages(0);
    setIsComplete(false);
    const startTime = Date.now();

    try {
      setCompileStep("plan");
      setStepLabel("Building content plan from blueprint...");
      const examCtx = GUIDED_EXAM_OPTIONS.find(e => e.id === examTier);
      const sectionTitles = bp.sections.filter(s => s.id !== "practice-questions" && s.id !== "rationales").map(s => s.label);

      setCompileStep("ai");
      setStepLabel("Generating content via AI...");
      const aiData = await fetchAIContent(examCtx);
      const sections: any[] = aiData.sections || [];
      const questions: any[] = aiData.questions || [];

      const sectionMap: Record<string, any> = {};
      for (const sec of sections) {
        sectionMap[sec.id] = sec;
      }

      setCompileStep("compile");
      setStepLabel("Compiling pages from blueprint...");
      let pagesCreated = 0;
      let dividerIndex = 0;

      const savePage = async (title: string, objects: CanvasObject[]) => {
        if (pagesCreated === 0 && project?.pages?.[0]) {
          await adminFetch(`/api/admin/design-pages/${project.pages[0].id}`, {
            method: "PUT",
            body: { canvasJson: { objects, version: "1.0" }, backgroundColor: "#ffffff" },
          });
        } else {
          await adminFetch(`/api/admin/design-projects/${projectId}/pages`, {
            method: "POST",
            body: { title, backgroundColor: "#ffffff", canvasJson: { objects, version: "1.0" } },
          });
        }
        pagesCreated++;
        setCompiledPages(pagesCreated);
        setStepLabel(`Compiling... ${pagesCreated} pages`);
      };

      for (const step of bp.pageFlow) {
        if (step.type === "cover") {
          const coverObjs = generateStyledCoverPage(W, H, theme, preset, {
            title: topic,
            subtitle: `${examCtx?.label || "Nursing"} ${bp.label}`,
            examTarget: examCtx?.label || "",
            includesFlashcards: false,
            includesQbank: includeQuestions,
            pageCount: targetPages,
          });
          await savePage("Cover", coverObjs);
        } else if (step.type === "toc") {
          const tocObjs = renderTOCPage(theme, sectionTitles, pagesCreated + 1);
          await savePage("Table of Contents", tocObjs);
        } else if (step.type === "divider") {
          dividerIndex++;
          const secDef = bp.sections.find(s => s.id === step.sectionId);
          const divObjs = generateChapterCoverPage(W, H, theme, preset, {
            chapterTitle: secDef?.label || step.sectionId,
            chapterNumber: dividerIndex,
            totalChapters: sectionTitles.length,
          });
          await savePage(secDef?.label || step.sectionId, divObjs);
        } else if (step.type === "section") {
          const sec = sectionMap[step.sectionId];
          if (sec?.blocks?.length > 0) {
            const contentPages = renderBlocksToPages(sec.blocks, sec.title || step.sectionId, theme);
            for (const pageObjects of contentPages) {
              await savePage(sec.title || step.sectionId, pageObjects);
            }
          } else {
            const fallback = sections.find(s => s.id === step.sectionId || s.title?.toLowerCase().includes(step.sectionId.replace(/-/g, " ")));
            if (fallback?.blocks?.length > 0) {
              const contentPages = renderBlocksToPages(fallback.blocks, fallback.title || step.sectionId, theme);
              for (const pageObjects of contentPages) {
                await savePage(fallback.title || step.sectionId, pageObjects);
              }
            }
          }
        } else if (step.type === "questions") {
          if (includeQuestions && questions.length > 0) {
            const qBlocks: any[] = [{ kind: "heading", text: "Practice Questions", level: 1 }];
            questions.forEach((q: any, i: number) => {
              qBlocks.push({ kind: "heading", text: `Question ${i + 1}`, level: 3 });
              qBlocks.push({ kind: "paragraph", text: q.stem || q.question || "" });
              if (q.options) {
                qBlocks.push({ kind: "bullets", items: q.options });
              }
            });
            const qPages = renderBlocksToPages(qBlocks, "Practice Questions", theme);
            for (const pg of qPages) await savePage("Practice Questions", pg);
          }
        } else if (step.type === "rationales") {
          if (includeQuestions && questions.length > 0) {
            const rBlocks: any[] = [{ kind: "heading", text: "Answer Rationales", level: 1 }];
            questions.forEach((q: any, i: number) => {
              rBlocks.push({ kind: "heading", text: `Q${i + 1}: ${q.correct || ""}`, level: 3 });
              rBlocks.push({ kind: "callout", flavor: "exam_tip", title: "Rationale", body: q.rationale || "See explanation above." });
            });
            const rPages = renderBlocksToPages(rBlocks, "Rationales", theme);
            for (const pg of rPages) await savePage("Rationales", pg);
          }
        } else if (step.type === "summary") {
          const sumObjs = renderSummaryPage(theme, topic);
          await savePage("Summary", sumObjs);
        }
      }

      if (includeImages && bp.imageSlots.length > 0) {
        setCompileStep("images");
        const maxImages = imageIntensity === "low" ? 6 : 12;
        const slotsToFill = bp.imageSlots.slice(0, maxImages);
        setStepLabel(`Generating ${slotsToFill.length} images (graceful fallback if unavailable)...`);
        for (const slot of slotsToFill) {
          try {
            const imgPromptText = `${slot.promptHint}, topic: ${topic}, style: clean pastel medical illustration, no text, no words`;
            await adminFetch("/api/ai/image-generate", {
              method: "POST",
              body: { prompt: imgPromptText, stylePreset: "nursenest-pastel", themeId, aspectRatio: "1:1", size: "512x512" },
            }).catch(() => {});
          } catch {}
        }
      }

      if (autoStoreReady) {
        setCompileStep("store-ready");
        setStepLabel("Running Store-Ready pipeline...");
        await new Promise(r => setTimeout(r, 300));
      }

      setCompileStep("done");
      setCompiledThemeId(themeId);
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      setStepLabel(`Complete! ${pagesCreated} pages compiled in ${elapsed}s`);
      setIsComplete(true);
      toast({ title: "Draft compiled", description: `${pagesCreated} pages generated for "${topic}" ${bp.label}` });
    } catch (e: any) {
      setLastError(e.message);
      toast({ title: "Generation failed", description: e.message, variant: "destructive" });
      setStepLabel("");
    } finally {
      setGenerating(false);
    }
  };

  const switchThemeAfterCompile = async (newThemeId: string) => {
    if (!compiledThemeId || !project) return;
    setSwitchingTheme(true);
    try {
      const oldTheme = getTheme(compiledThemeId);
      const newTheme = getTheme(newThemeId);
      const res = await adminFetch(`/api/admin/design-projects/${projectId}`);
      if (!res.ok) throw new Error("Failed to load project");
      const data = await res.json();
      const pages = data.pages || [];

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const objs = page.canvasJson?.objects || [];
        if (objs.length === 0) continue;
        const reSkinned = applyThemeToPageObjects(objs, oldTheme, newTheme);
        await adminFetch(`/api/admin/design-pages/${page.id}`, {
          method: "PUT",
          body: { canvasJson: { objects: reSkinned, version: "1.0" }, backgroundColor: "#ffffff" },
        });
      }

      setCompiledThemeId(newThemeId);
      setThemeId(newThemeId);
      toast({ title: "Theme applied", description: `Switched to ${newTheme.name} across all pages` });
    } catch (e: any) {
      toast({ title: "Theme switch failed", description: e.message, variant: "destructive" });
    } finally {
      setSwitchingTheme(false);
    }
  };

  const stepIndex = STEPS_ORDER.indexOf(compileStep);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="h-14 bg-white border-b flex items-center justify-between px-6 shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition" data-testid="button-guided-back">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1.5 text-sm">
            <button onClick={onBack} className="text-gray-400 hover:text-primary transition text-xs font-medium" data-testid="link-guided-drafts">Drafts</button>
            <span className="text-gray-300">/</span>
            <span className="font-semibold text-gray-800" data-testid="text-guided-title">{project?.title || "Product Generator"}</span>
            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full ml-1 font-medium">Guided Mode</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isComplete && compiledThemeId && (
            <div className="flex items-center gap-1.5 mr-2" data-testid="section-theme-switch">
              <Palette className="w-3.5 h-3.5 text-gray-400" />
              <select
                value={compiledThemeId}
                onChange={e => switchThemeAfterCompile(e.target.value)}
                disabled={switchingTheme}
                className="h-8 rounded-lg border px-2 text-xs"
                data-testid="select-reskin-theme"
              >
                {THEMES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
              {switchingTheme && <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />}
            </div>
          )}
          <Button size="sm" variant="outline" onClick={onSwitchToCanvas} className="h-8 text-xs gap-1.5" data-testid="button-switch-canvas">
            <Grid3X3 className="w-3.5 h-3.5" /> Advanced Canvas
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">

          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900" data-testid="text-guided-heading">Create Your Product</h2>
            <p className="text-sm text-gray-500">Choose a template, configure options, and compile a complete draft automatically.</p>
          </div>

          {generating && (
            <div className="rounded-2xl border bg-white p-6 shadow-sm" data-testid="section-stepper">
              <div className="flex items-center justify-between mb-4">
                {STEPS_ORDER.filter(s => s !== "done").map((s, i) => {
                  const isActive = s === compileStep;
                  const isDone = stepIndex > i;
                  const skip = s === "images" && !includeImages;
                  const skipSR = s === "store-ready" && !autoStoreReady;
                  if (skip || skipSR) return null;
                  return (
                    <div key={s} className="flex items-center gap-2 flex-1">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${isDone ? "bg-green-500 text-white" : isActive ? "bg-primary text-white ring-2 ring-primary/30 animate-pulse" : "bg-gray-200 text-gray-500"}`}>
                        {isDone ? <CheckCircle className="w-4 h-4" /> : i + 1}
                      </div>
                      <span className={`text-[10px] font-medium hidden sm:block ${isActive ? "text-primary" : isDone ? "text-green-600" : "text-gray-400"}`}>{STEP_LABELS[s]}</span>
                      {i < 4 && <div className={`flex-1 h-0.5 mx-1 ${isDone ? "bg-green-400" : "bg-gray-200"}`} />}
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-2 justify-center">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span className="text-sm text-gray-600">{stepLabel}</span>
              </div>
              {compiledPages > 0 && (
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${Math.min(100, (compiledPages / Math.max(targetPages, 1)) * 100)}%` }} />
                </div>
              )}
            </div>
          )}

          {lastError && !generating && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 flex items-start gap-3" data-testid="section-error">
              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="text-sm font-semibold text-red-700 block">Compilation Error</span>
                <span className="text-xs text-red-600 block mt-1">{lastError}</span>
              </div>
              <Button size="sm" variant="outline" onClick={compileDocument} className="shrink-0 text-xs" data-testid="button-retry">Retry</Button>
            </div>
          )}

          <div className="space-y-2" data-testid="section-template-select">
            <label className="text-sm font-semibold text-gray-700 block">Template</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {TEMPLATE_BLUEPRINTS.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTemplate(t.id)}
                  disabled={generating}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${template === t.id ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-md" : "border-gray-200 hover:border-gray-300 hover:shadow-sm"}`}
                  data-testid={`button-template-${t.id}`}
                >
                  <span className="text-2xl block mb-2">{t.icon}</span>
                  <span className="text-sm font-semibold text-gray-800 block">{t.label}</span>
                  <span className="text-[10px] text-gray-500 block mt-1 leading-tight">{t.description.slice(0, 60)}...</span>
                  <span className="text-[10px] text-primary font-medium block mt-2">{t.minPages}-{t.maxPages} pages</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-5">
              <div className="space-y-2" data-testid="section-topic">
                <label className="text-sm font-semibold text-gray-700 block">Topic</label>
                <Input
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  placeholder="e.g., Electrolyte Imbalances, Cardiac Assessment, Diabetes Management"
                  className="h-12 text-sm"
                  disabled={generating}
                  data-testid="input-guided-topic"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2" data-testid="section-tier">
                  <label className="text-sm font-semibold text-gray-700 block">Exam Tier</label>
                  <select value={examTier} onChange={e => setExamTier(e.target.value)} disabled={generating} className="w-full h-10 rounded-lg border px-3 text-sm" data-testid="select-guided-tier">
                    {GUIDED_EXAM_OPTIONS.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
                  </select>
                </div>
                <div className="space-y-2" data-testid="section-region">
                  <label className="text-sm font-semibold text-gray-700 block">Region</label>
                  <select value={region} onChange={e => setRegion(e.target.value)} disabled={generating} className="w-full h-10 rounded-lg border px-3 text-sm" data-testid="select-guided-region">
                    <option value="BOTH">CA + US (Both)</option>
                    <option value="CA">Canada Only</option>
                    <option value="US">US Only</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2" data-testid="section-pages">
                <label className="text-sm font-semibold text-gray-700 flex items-center justify-between">
                  <span>Target Pages</span>
                  <span className="text-primary font-bold">{targetPages}</span>
                </label>
                <input
                  type="range"
                  min={bp.minPages}
                  max={bp.maxPages}
                  value={targetPages}
                  onChange={e => setTargetPages(Number(e.target.value))}
                  disabled={generating}
                  className="w-full h-2 accent-primary"
                  data-testid="slider-guided-pages"
                />
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>{bp.minPages} min</span>
                  <span>~{totalChars.toLocaleString()} chars budget</span>
                  <span>{bp.maxPages} max</span>
                </div>
              </div>

              {bp.includesQuestions && (
                <div className="space-y-2 p-4 rounded-xl bg-gray-50 border" data-testid="section-questions">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={includeQuestions} onChange={e => setIncludeQuestions(e.target.checked)} disabled={generating} className="rounded" data-testid="checkbox-include-questions" />
                    <span className="text-sm font-medium text-gray-700">Include Practice Questions</span>
                  </label>
                  {includeQuestions && (
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-gray-500">Count:</span>
                      <Input type="number" min={5} max={100} value={questionCount} onChange={e => setQuestionCount(Number(e.target.value))} disabled={generating} className="w-20 h-8 text-xs" data-testid="input-question-count" />
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-2 p-4 rounded-xl bg-gray-50 border" data-testid="section-images">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={includeImages} onChange={e => setIncludeImages(e.target.checked)} disabled={generating} className="rounded" data-testid="checkbox-include-images" />
                  <span className="text-sm font-medium text-gray-700">Include Images</span>
                  <span className="text-[10px] text-gray-400">({bp.imageSlots.length} slots)</span>
                </label>
                {includeImages && (
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-gray-500">Intensity:</span>
                    <select value={imageIntensity} onChange={e => setImageIntensity(e.target.value as any)} disabled={generating} className="h-8 rounded-lg border px-2 text-xs" data-testid="select-image-intensity">
                      <option value="low">Low (up to 6)</option>
                      <option value="medium">Medium (up to 12)</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-2" data-testid="section-theme">
                <label className="text-sm font-semibold text-gray-700 block">Color Theme</label>
                <div className="grid grid-cols-2 gap-2">
                  {THEMES.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setThemeId(t.id)}
                      disabled={generating}
                      className={`p-3 rounded-xl border-2 flex items-center gap-3 transition ${themeId === t.id ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-gray-200 hover:border-gray-300"}`}
                      data-testid={`button-theme-${t.id}`}
                    >
                      <div className="flex gap-1">
                        <div className="w-5 h-5 rounded-full border" style={{ backgroundColor: t.primaryColor }} />
                        <div className="w-5 h-5 rounded-full border" style={{ backgroundColor: t.secondaryColor }} />
                        <div className="w-5 h-5 rounded-full border" style={{ backgroundColor: t.accentColor }} />
                      </div>
                      <span className="text-xs font-medium text-gray-700">{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2" data-testid="section-cover-preset">
                <label className="text-sm font-semibold text-gray-700 block">Cover Style</label>
                <div className="grid grid-cols-2 gap-2">
                  {COVER_PRESETS.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setCoverPreset(p.id)}
                      disabled={generating}
                      className={`h-12 rounded-xl border-2 text-xs font-medium transition flex items-center justify-center gap-2 ${coverPreset === p.id ? "border-primary bg-primary/5 text-primary" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
                      data-testid={`button-guided-cover-${p.id}`}
                    >
                      <div className="w-6 h-4 rounded-sm" style={{ background: p.bgStyle === "gradient" ? `linear-gradient(135deg, ${theme.coverBg}, ${theme.primaryColor})` : p.bgStyle === "split" ? `linear-gradient(180deg, ${theme.coverBg} 50%, ${theme.accentColor} 50%)` : theme.coverBg }} />
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-gray-50 border" data-testid="section-store-ready">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={autoStoreReady} onChange={e => setAutoStoreReady(e.target.checked)} disabled={generating} className="rounded" data-testid="checkbox-auto-store-ready" />
                  <span className="text-sm font-medium text-gray-700">Auto Store-Ready After Compile</span>
                </label>
                <p className="text-[10px] text-gray-400 mt-1">Normalize spacing, safe margins, and prepare for marketplace.</p>
              </div>

              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 space-y-2" data-testid="section-plan-preview">
                <span className="text-xs font-semibold text-gray-700 block">Blueprint Preview</span>
                <div className="space-y-1">
                  <div className="text-[10px] text-gray-400 mb-1">Page flow: {bp.pageFlow.length} steps</div>
                  {bp.sections.filter(s => s.id !== "practice-questions" && s.id !== "rationales").map(s => {
                    const charBudget = budgets[s.id] || 0;
                    const approxPages = Math.max(1, Math.round(charBudget / bp.charsPerPage));
                    return (
                      <div key={s.id} className="flex items-center justify-between text-[11px]">
                        <span className="text-gray-600">{s.label}</span>
                        <span className="text-gray-400">~{charBudget.toLocaleString()} chars / {approxPages} pg</span>
                      </div>
                    );
                  })}
                  {includeQuestions && (
                    <div className="flex items-center justify-between text-[11px] text-blue-600">
                      <span>Practice Questions + Rationales</span>
                      <span>{questionCount} Qs</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-[11px] font-semibold text-primary border-t pt-1 mt-1">
                    <span>Total target</span>
                    <span>~{targetPages} pages</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 pt-4" data-testid="section-generate">
            <Button
              onClick={compileDocument}
              disabled={generating || !topic.trim()}
              className="h-14 px-10 text-base font-semibold gap-2 rounded-2xl shadow-lg"
              data-testid="button-generate-draft"
            >
              {generating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
              {generating ? "Compiling..." : `Generate ${bp.label} Draft`}
            </Button>

            {isComplete && (
              <div className="flex flex-col items-center gap-3 mt-2" data-testid="section-post-generate">
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>{stepLabel}</span>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={onSwitchToCanvas} className="gap-1.5" data-testid="button-edit-in-canvas">
                    <Grid3X3 className="w-4 h-4" /> Edit in Canvas
                  </Button>
                  <Button variant="outline" onClick={() => { setIsComplete(false); setStepLabel(""); setCompiledPages(0); setLastError(null); setCompileStep("plan"); }} className="gap-1.5" data-testid="button-regenerate">
                    <Wand2 className="w-4 h-4" /> Regenerate
                  </Button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

function CanvasEditorView({ projectId, onBack, initialPresetType }: { projectId: string; onBack: () => void; initialPresetType?: string | null }) {
  const { toast } = useToast();
  const [project, setProject] = useState<DesignProject | null>(null);
  const [pages, setPages] = useState<DesignPage[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [objects, setObjects] = useState<CanvasObject[]>([]);
  const [saving, setSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [exporting, setExporting] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [publishForm, setPublishForm] = useState({ title: "", description: "", price: "", category: "Cram Guide" });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const [undoStack, setUndoStack] = useState<CanvasObject[][]>([]);
  const [redoStack, setRedoStack] = useState<CanvasObject[][]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastThemeIdRef = useRef("soft-clinical");

  const [showGrid, setShowGrid] = useState(false);
  const [showMargins, setShowMargins] = useState(true);
  const [brandLock, setBrandLock] = useState(true);
  const [brandVerified, setBrandVerified] = useState(false);
  const [activeThemeId, setActiveThemeId] = useState("soft-clinical");
  const [showLogo, setShowLogo] = useState(true);
  const [leftPanel, setLeftPanel] = useState<"tools" | "components" | "templates" | "ai" | "imagelab" | "brand" | "blocks" | null>("tools");
  const [zoom, setZoom] = useState(85);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [aiTopic, setAiTopic] = useState("");
  const [aiTier, setAiTier] = useState("rn");
  const [aiExamTarget, setAiExamTarget] = useState("nclex-rn");
  const [aiLoading, setAiLoading] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<any>(null);
  const [imgPrompt, setImgPrompt] = useState("");
  const [imgNegative, setImgNegative] = useState("");
  const [imgTextFree, setImgTextFree] = useState(true);
  const [imgSize, setImgSize] = useState("1024x1024");
  const [imgCount, setImgCount] = useState(1);
  const [imgLoading, setImgLoading] = useState(false);
  const [imgResults, setImgResults] = useState<{ id: string; url: string }[]>([]);
  const [pageThumbs, setPageThumbs] = useState<Record<string, string>>({});
  const [coverPresetId, setCoverPresetId] = useState("soft-pastel");
  const [autoStoreReady, setAutoStoreReady] = useState(true);
  const [aiStatus, setAiStatus] = useState<{ enabled: boolean; usage: { itemsGenerated: number; tokensUsed: number }; model: string } | null>(null);
  const [tbQuestionCount, setTbQuestionCount] = useState(25);
  const [tbDifficulty, setTbDifficulty] = useState("mixed");
  const [tbQuestionTypes, setTbQuestionTypes] = useState<string[]>(["multiple-choice", "select-all", "ordered-response"]);
  const [tbLoading, setTbLoading] = useState(false);
  const [tbResult, setTbResult] = useState<any>(null);
  const [tbPreviewOpen, setTbPreviewOpen] = useState(false);
  const [tbPublishing, setTbPublishing] = useState(false);
  const [tbPrice, setTbPrice] = useState("14.99");
  const [bundleTargetPages, setBundleTargetPages] = useState(30);
  const [bundleProgress, setBundleProgress] = useState<{ step: string; current: number; total: number } | null>(null);

  const theme = getTheme(activeThemeId);
  const themePalette = [
    theme.primaryColor, theme.secondaryColor, theme.accentColor,
    theme.backgroundColor, theme.sectionBg, theme.sectionBgAlt,
    theme.headingColor, theme.bodyColor, theme.bodyColorLight,
    theme.dangerColor, theme.successColor, theme.warningColor,
    theme.badgeBg, theme.badgeText, theme.pearlBg, theme.pearlBorder,
    theme.flagBg, theme.flagBorder, theme.coverBg, theme.coverBgOverlay,
    "#ffffff", "#fff", "#000", "#000000",
  ];

  const CANVAS_WIDTH = 612;
  const CANVAS_HEIGHT = 792;
  const SCALE = zoom / 100;
  const MARGIN = 46;
  const GRID_SIZE = 20;

  const zoomIn = () => setZoom(z => Math.min(200, z + 10));
  const zoomOut = () => setZoom(z => Math.max(25, z - 10));
  const zoomFit = () => setZoom(85);
  const zoomActual = () => setZoom(100);

  const selectedId = selectedIds.length === 1 ? selectedIds[0] : null;
  const setSelectedId = (id: string | null) => setSelectedIds(id ? [id] : []);

  const toggleSelect = (id: string, shift: boolean) => {
    if (shift) {
      setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    } else {
      setSelectedIds([id]);
    }
  };

  const bringForward = () => {
    if (selectedIds.length === 0) return;
    pushUndo();
    const maxZ = Math.max(...objects.map(o => o.zIndex));
    setObjects(prev => prev.map(o => selectedIds.includes(o.id) ? { ...o, zIndex: Math.min(maxZ + 1, o.zIndex + 1) } : o));
  };

  const sendBackward = () => {
    if (selectedIds.length === 0) return;
    pushUndo();
    setObjects(prev => prev.map(o => selectedIds.includes(o.id) ? { ...o, zIndex: Math.max(0, o.zIndex - 1) } : o));
  };

  const bringToFront = () => {
    if (selectedIds.length === 0) return;
    pushUndo();
    const maxZ = Math.max(...objects.map(o => o.zIndex));
    setObjects(prev => prev.map(o => selectedIds.includes(o.id) ? { ...o, zIndex: maxZ + 1 } : o));
  };

  const sendToBack = () => {
    if (selectedIds.length === 0) return;
    pushUndo();
    setObjects(prev => prev.map(o => selectedIds.includes(o.id) ? { ...o, zIndex: 0 } : o));
  };

  const toggleLockSelected = () => {
    if (selectedIds.length === 0) return;
    pushUndo();
    const firstObj = objects.find(o => o.id === selectedIds[0]);
    const newLocked = !firstObj?.locked;
    setObjects(prev => prev.map(o => selectedIds.includes(o.id) ? { ...o, locked: newLocked } : o));
    toast({ title: newLocked ? "Locked" : "Unlocked" });
  };

  const selectGroupOfObject = (objId: string): string[] => {
    const obj = objects.find(o => o.id === objId);
    if (!obj?.groupId) return [objId];
    return objects.filter(o => o.groupId === obj.groupId).map(o => o.id);
  };

  const getGroupIdsFromSelection = (): Set<string> => {
    const ids = new Set<string>();
    for (const o of objects) {
      if (selectedIds.includes(o.id) && o.groupId) ids.add(o.groupId);
    }
    return ids;
  };

  const groupSelected = () => {
    if (selectedIds.length < 2) {
      toast({ title: "Select 2+ elements to group", variant: "destructive" });
      return;
    }
    const locked = objects.find(o => selectedIds.includes(o.id) && o.locked);
    if (locked) {
      toast({ title: "Locked element", description: "Unlock before grouping", variant: "destructive" });
      return;
    }
    pushUndo();
    const newGroupId = gid();
    setObjects(prev => prev.map(o =>
      selectedIds.includes(o.id) ? { ...o, groupId: newGroupId } : o
    ));
    toast({ title: "Grouped" });
  };

  const ungroupSelected = () => {
    const groupIds = getGroupIdsFromSelection();
    if (groupIds.size === 0) {
      toast({ title: "No groups selected", variant: "destructive" });
      return;
    }
    pushUndo();
    setObjects(prev => prev.map(o =>
      o.groupId && groupIds.has(o.groupId) ? { ...o, groupId: undefined } : o
    ));
    toast({ title: "Ungrouped" });
  };

  const duplicatePage = async (index: number) => {
    const srcPage = pages[index];
    if (!srcPage) return;
    const res = await adminFetch(`/api/admin/design-projects/${projectId}/pages`, {
      method: "POST",
      body: {},
    });
    if (res.ok) {
      const newPage = await res.json();
      const srcData = index === currentPageIndex ? { objects } : srcPage.canvasJson;
      await adminFetch(`/api/admin/design-pages/${newPage.id}`, {
        method: "PUT",
        body: { canvasJson: srcData || { objects: [], version: "1.0" }, backgroundColor: srcPage.backgroundColor },
      });
      newPage.canvasJson = srcData;
      newPage.backgroundColor = srcPage.backgroundColor;
      setPages(prev => [...prev, newPage]);
      toast({ title: "Page duplicated" });
    }
  };

  useEffect(() => {
    adminFetch(`/api/admin/design-projects/${projectId}`)
      .then(r => { if (!r.ok) throw new Error("Failed to load"); return r.json(); })
      .then(data => {
        setProject(data);
        setPages(data.pages || []);
        if (data.pages?.length > 0) {
          const pageData = data.pages[0].canvasJson;
          setObjects(pageData?.objects || []);
        }
      })
      .catch(() => {});
  }, [projectId]);

  const presetAppliedRef = useRef(false);
  useEffect(() => {
    if (!initialPresetType || !project || presetAppliedRef.current) return;
    const presetMap: Record<string, string> = {
      "bundle": "cram-guide",
      "cram": "cram-guide",
      "cram-guide": "cram-guide",
      "question-pack": "question-pack",
      "cheat-sheet": "quick-reference",
      "study-plan": "study-plan",
      "quick-reference": "quick-reference",
    };
    const presetId = presetMap[initialPresetType];
    if (presetId && objects.length === 0) {
      presetAppliedRef.current = true;
      loadProductPreset(presetId);
    }
  }, [initialPresetType, project]);

  const saveCanvas = useCallback(async () => {
    if (!pages[currentPageIndex]) return;
    setSaving(true);
    try {
      await adminFetch(`/api/admin/design-pages/${pages[currentPageIndex].id}`, {
        method: "PUT",
        body: { canvasJson: { objects, version: "1.0" }, backgroundColor: pages[currentPageIndex].backgroundColor },
      });
      setLastSavedAt(new Date());
    } catch (e) {}
    setSaving(false);
  }, [objects, pages, currentPageIndex]);

  useEffect(() => {
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => { saveCanvas(); }, 2000);
    return () => { if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current); };
  }, [objects, saveCanvas]);

  const deepCloneObjects = (arr: CanvasObject[]) => arr.map(o => ({ ...o }));

  const pushUndo = () => {
    setUndoStack(prev => [...prev.slice(-20), deepCloneObjects(objects)]);
    setRedoStack([]);
  };

  const undo = () => {
    setUndoStack(prev => {
      if (prev.length === 0) return prev;
      const next = [...prev];
      const last = next.pop()!;
      setRedoStack(r => [...r, deepCloneObjects(objects)]);
      setObjects(last);
      return next;
    });
  };

  const redo = () => {
    setRedoStack(prev => {
      if (prev.length === 0) return prev;
      const next = [...prev];
      const last = next.pop()!;
      setUndoStack(u => [...u, deepCloneObjects(objects)]);
      setObjects(last);
      return next;
    });
  };

  const addObject = (type: CanvasObject["type"]) => {
    pushUndo();
    const id = uid();
    const base = { id, x: MARGIN, y: 50, rotation: 0, opacity: 1, zIndex: objects.length };
    let obj: CanvasObject;
    switch (type) {
      case "text":
        obj = { ...base, type: "text", width: CANVAS_WIDTH - MARGIN * 2, height: 40, content: "New Text", fontSize: 18, fontFamily: BRAND.fontBody, fontWeight: "normal", fill: BRAND.textDark, textAlign: "left" };
        break;
      case "rect":
        obj = { ...base, type: "rect", width: 150, height: 100, fill: "#e2e8f0", stroke: "#94a3b8", strokeWidth: 1, borderRadius: 8 };
        break;
      case "circle":
        obj = { ...base, type: "circle", width: 100, height: 100, fill: "#e2e8f0", stroke: "#94a3b8", strokeWidth: 1 };
        break;
      case "image":
        obj = { ...base, type: "image", width: 200, height: 200, src: "" };
        break;
      default: return;
    }
    setObjects(prev => [...prev, obj]);
    setSelectedId(id);
  };

  const updateObject = (id: string, updates: Partial<CanvasObject>) => {
    setObjects(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o));
  };

  const deleteSelected = () => {
    if (selectedIds.length === 0) return;
    const lockedObj = objects.find(o => selectedIds.includes(o.id) && o.locked);
    if (lockedObj) {
      toast({ title: "Locked element", description: "Unlock elements before deleting", variant: "destructive" });
      return;
    }
    if (brandLock && objects.some(o => selectedIds.includes(o.id) && o.tag === "brand-logo")) {
      toast({ title: "Logo protected", description: "Disable Brand Lock to remove the logo", variant: "destructive" });
      return;
    }
    pushUndo();
    setObjects(prev => prev.filter(o => !selectedIds.includes(o.id)));
    setSelectedIds([]);
  };

  const duplicateSelected = () => {
    if (!selectedId) return;
    const obj = objects.find(o => o.id === selectedId);
    if (!obj) return;
    pushUndo();
    const newObj = { ...obj, id: uid(), x: obj.x + 20, y: obj.y + 20, zIndex: objects.length };
    setObjects(prev => [...prev, newObj]);
    setSelectedId(newObj.id);
  };

  const insertDesignComponent = (comp: typeof DESIGN_COMPONENTS[0]) => {
    pushUndo();
    const baseY = 50 + objects.length * 10;
    const newObjs = comp.objects.map((partial, i) => ({
      ...partial,
      id: uid(),
      x: MARGIN + (partial.x || 0),
      y: baseY + (partial.y || 0),
      rotation: 0,
      opacity: 1,
      zIndex: objects.length + i,
      tag: comp.tag,
    } as CanvasObject));
    setObjects(prev => [...prev, ...newObjs]);
    setSelectedId(newObjs[0]?.id || null);
    toast({ title: `${comp.label} added` });
  };

  const applyPageTemplate = (template: typeof PAGE_TEMPLATES[0]) => {
    if (objects.length > 0 && !confirm("Replace current page content with this template?")) return;
    pushUndo();
    const newObjs = template.generate(CANVAS_WIDTH, CANVAS_HEIGHT);
    setObjects(newObjs);
    toast({ title: `${template.label} template applied` });
  };

  const mapColorToTheme = (color: string | undefined, oldTheme: ThemeConfig, newTheme: ThemeConfig): string | undefined => {
    if (!color) return color;
    const c = color.toLowerCase();
    const mapping: [string, keyof ThemeConfig][] = [
      [oldTheme.primaryColor, "primaryColor"], [oldTheme.secondaryColor, "secondaryColor"],
      [oldTheme.accentColor, "accentColor"], [oldTheme.backgroundColor, "backgroundColor"],
      [oldTheme.sectionBg, "sectionBg"], [oldTheme.sectionBgAlt, "sectionBgAlt"],
      [oldTheme.headingColor, "headingColor"], [oldTheme.bodyColor, "bodyColor"],
      [oldTheme.bodyColorLight, "bodyColorLight"], [oldTheme.dangerColor, "dangerColor"],
      [oldTheme.successColor, "successColor"], [oldTheme.warningColor, "warningColor"],
      [oldTheme.badgeBg, "badgeBg"], [oldTheme.badgeText, "badgeText"],
      [oldTheme.pearlBg, "pearlBg"], [oldTheme.pearlBorder, "pearlBorder"],
      [oldTheme.flagBg, "flagBg"], [oldTheme.flagBorder, "flagBorder"],
      [oldTheme.coverBg, "coverBg"], [oldTheme.coverBgOverlay, "coverBgOverlay"],
      [oldTheme.dividerColor, "dividerColor"], [oldTheme.tableBorderColor, "tableBorderColor"],
      [oldTheme.tableRowEven, "tableRowEven"], [oldTheme.tableRowOdd, "tableRowOdd"],
    ];
    for (const [oldColor, key] of mapping) {
      if (c === oldColor.toLowerCase()) return newTheme[key] as string;
    }
    return color;
  };

  const applyThemeToObjects = (objs: CanvasObject[], oldTheme: ThemeConfig, newTheme: ThemeConfig): CanvasObject[] => {
    return objs.map(obj => {
      const updated = { ...obj };
      updated.fill = mapColorToTheme(obj.fill, oldTheme, newTheme);
      updated.stroke = mapColorToTheme(obj.stroke, oldTheme, newTheme);
      if (obj.type === "text") {
        const isHeading = (obj.fontSize || 0) >= 18 || obj.fontWeight === "bold";
        updated.fontFamily = isHeading ? newTheme.headingFont : newTheme.bodyFont;
      }
      return updated;
    });
  };

  const switchTheme = (newThemeId: string) => {
    const oldTheme = getTheme(activeThemeId);
    const newTheme = getTheme(newThemeId);
    if (oldTheme.id === newTheme.id) return;
    lastThemeIdRef.current = oldTheme.id;
    pushUndo();
    setObjects(prev => applyThemeToObjects(prev, oldTheme, newTheme));
    setActiveThemeId(newThemeId);
    toast({ title: `Theme: ${newTheme.name}`, description: "Colors and fonts updated" });
  };

  const THEME_KEYS: (keyof ThemeConfig)[] = [
    "primaryColor","secondaryColor","accentColor",
    "backgroundColor","sectionBg","sectionBgAlt",
    "headingColor","bodyColor","bodyColorLight",
    "dangerColor","successColor","warningColor",
    "dividerColor","badgeBg","badgeText",
    "tableBorderColor","tableRowEven","tableRowOdd",
    "pearlBg","pearlBorder","flagBg","flagBorder",
    "coverBg","coverBgOverlay",
  ];

  const themeColorIndex = (() => {
    const idx = new Map<string, keyof ThemeConfig>();
    for (const t of THEMES) {
      for (const k of THEME_KEYS) {
        const v = (t[k] as string) || "";
        if (v) idx.set(v.trim().toLowerCase(), k);
      }
    }
    return idx;
  })();

  const mapColorToActiveTheme = (color: string | undefined, active: ThemeConfig): string | undefined => {
    if (!color) return color;
    const key = themeColorIndex.get(color.trim().toLowerCase());
    if (!key) return color;
    return active[key] as string;
  };

  const applyActiveThemeToObjects = (objs: CanvasObject[], active: ThemeConfig): CanvasObject[] => {
    return objs.map(obj => {
      const updated = { ...obj };
      updated.fill = mapColorToActiveTheme(obj.fill, active);
      updated.stroke = mapColorToActiveTheme(obj.stroke, active);
      if (obj.type === "text") {
        const isHeading = (obj.fontSize || 0) >= 18 || obj.fontWeight === "bold";
        updated.fontFamily = isHeading ? active.headingFont : active.bodyFont;
      }
      return updated;
    });
  };

  const applyThemeToAllPages = async () => {
    const active = getTheme(activeThemeId);
    await saveCanvas();
    let updatedCount = 0;
    for (let i = 0; i < pages.length; i++) {
      const isCurrent = i === currentPageIndex;
      const pageObjects: CanvasObject[] = isCurrent
        ? objects
        : (pages[i]?.canvasJson?.objects || []);
      if (!pageObjects || pageObjects.length === 0) continue;
      const themed = applyActiveThemeToObjects(pageObjects, active);
      if (isCurrent) {
        pushUndo();
        setObjects(themed);
      }
      try {
        await adminFetch(`/api/admin/design-pages/${pages[i].id}`, {
          method: "PUT",
          body: { canvasJson: { objects: themed, version: "1.0" }, backgroundColor: pages[i].backgroundColor },
        });
        setPages(prev => {
          const next = [...prev];
          next[i] = { ...next[i], canvasJson: { objects: themed, version: "1.0" } };
          return next;
        });
        updatedCount++;
      } catch {}
    }
    toast({ title: "Theme applied to all pages", description: `${updatedCount} page(s) updated` });
  };

  const insertLogoFooter = () => {
    pushUndo();
    const logoExists = objects.some(o => o.tag === "brand-logo");
    if (logoExists) return;
    const logoObj: CanvasObject = {
      id: uid(), type: "text", x: CANVAS_WIDTH / 2 - 60, y: CANVAS_HEIGHT - 30,
      width: 120, height: 16, content: "NurseNest", fontSize: 9,
      fontWeight: "600", fill: theme.bodyColorLight, fontFamily: theme.bodyFont,
      rotation: 0, opacity: 0.5, zIndex: 999, textAlign: "center",
      tag: "brand-logo", locked: brandLock,
    };
    setObjects(prev => [...prev, logoObj]);
  };

  const beautifyPage = () => {
    pushUndo();
    const sorted = [...objects].sort((a, b) => a.y - b.y);
    let curY = MARGIN;
    const updated = sorted.map((obj, i) => {
      const snappedX = Math.max(MARGIN, Math.round(obj.x / GRID_SIZE) * GRID_SIZE);
      const clampedW = Math.min(obj.width, CANVAS_WIDTH - MARGIN * 2);
      const newObj = {
        ...obj,
        x: snappedX,
        y: curY,
        width: clampedW,
        zIndex: i,
        fontFamily: obj.type === "text" ? (((obj.fontSize || 0) >= 18 || obj.fontWeight === "bold") ? theme.headingFont : theme.bodyFont) : obj.fontFamily,
      };
      curY += obj.height + 12;
      return newObj;
    });
    setObjects(updated);
    toast({ title: "Page beautified", description: "Aligned, spaced, and themed" });
  };

  const runDesignAudit = () => {
    const issues: string[] = [];
    objects.forEach(obj => {
      if (obj.x < MARGIN - 5 || obj.x + obj.width > CANVAS_WIDTH - MARGIN + 5) issues.push(`"${obj.content?.slice(0, 20) || obj.type}" outside margins`);
      if (obj.type === "text" && obj.fontFamily && obj.fontFamily !== theme.bodyFont && obj.fontFamily !== theme.headingFont) issues.push(`Off-theme font: ${obj.fontFamily}`);
      if (brandLock && obj.type === "text" && obj.fill && !themePalette.includes(obj.fill.toLowerCase())) issues.push(`Off-palette color on "${obj.content?.slice(0, 15) || "text"}"`);
      if (obj.type === "text" && obj.fontSize && obj.fontSize < 8) issues.push(`Very small text: ${obj.fontSize}px`);
    });
    if (showLogo && !objects.some(o => o.tag === "brand-logo")) issues.push("Missing brand logo footer");
    if (issues.length === 0) {
      setBrandVerified(true);
      insertVerifiedBadge();
      toast({ title: "Design Audit Passed", description: "Brand verified badge added" });
    } else {
      setBrandVerified(false);
      setObjects(prev => prev.filter(o => o.tag !== "brand-verified"));
      toast({ title: `Design Audit: ${issues.length} issue(s)`, description: issues.slice(0, 3).join("; "), variant: "destructive" });
    }
  };

  const generateCoverForCurrentProject = (presetOverride?: string) => {
    pushUndo();
    const pid = presetOverride || coverPresetId;
    const preset = COVER_PRESETS.find(p => p.id === pid) || COVER_PRESETS[0];
    const coverObjs = generateStyledCoverPage(CANVAS_WIDTH, CANVAS_HEIGHT, theme, preset, {
      title: project?.title || "Study Guide",
      subtitle: `${EXAM_CONTEXT_MAP[aiExamTarget]?.label || "Nursing"} Review`,
      examTarget: EXAM_CONTEXT_MAP[aiExamTarget]?.label || "",
      badges: EXAM_CONTEXT_MAP[aiExamTarget]?.region === "CA" ? ["Canada"] : EXAM_CONTEXT_MAP[aiExamTarget]?.region === "US" ? ["USA"] : [],
      pageCount: pages.length,
    });
    setObjects(coverObjs);
    toast({ title: "Cover page generated", description: `${preset.name} preset applied` });
  };

  const insertBlockToCanvas = (blockId: string) => {
    const block = CONTENT_BLOCK_LIBRARY.find(b => b.id === blockId);
    if (!block) return;
    if (blockId === "cover") {
      generateCoverForCurrentProject();
      return;
    }
    pushUndo();
    const baseY = objects.length > 0 ? Math.max(...objects.map(o => o.y + o.height)) + 16 : MARGIN;
    const contentWidth = CANVAS_WIDTH - MARGIN * 2;
    const newObjs: CanvasObject[] = [];
    let z = objects.length;

    if (blockId === "section-divider") {
      newObjs.push({ id: uid(), type: "rect", x: 0, y: baseY, width: CANVAS_WIDTH, height: 80, fill: theme.primaryColor, rotation: 0, opacity: 1, zIndex: z++, borderRadius: 0 });
      newObjs.push({ id: uid(), type: "text", x: MARGIN, y: baseY + 20, width: contentWidth, height: 28, content: "SECTION TITLE", fontSize: 22, fontWeight: "bold", fill: "#ffffff", fontFamily: theme.headingFont, rotation: 0, opacity: 1, zIndex: z++, textAlign: "center" });
      newObjs.push({ id: uid(), type: "text", x: MARGIN, y: baseY + 50, width: contentWidth, height: 18, content: "Subsection description", fontSize: 12, fontWeight: "normal", fill: "#ffffffcc", fontFamily: theme.bodyFont, rotation: 0, opacity: 1, zIndex: z++, textAlign: "center" });
    } else if (blockId === "toc") {
      newObjs.push({ id: uid(), type: "rect", x: MARGIN, y: baseY, width: contentWidth, height: 200, fill: theme.sectionBg, stroke: theme.dividerColor, strokeWidth: 1, borderRadius: 12, rotation: 0, opacity: 1, zIndex: z++ });
      newObjs.push({ id: uid(), type: "text", x: MARGIN + 16, y: baseY + 12, width: contentWidth - 32, height: 24, content: "TABLE OF CONTENTS", fontSize: 16, fontWeight: "bold", fill: theme.headingColor, fontFamily: theme.headingFont, rotation: 0, opacity: 1, zIndex: z++ });
      newObjs.push({ id: uid(), type: "text", x: MARGIN + 16, y: baseY + 44, width: contentWidth - 32, height: 140, content: "1. Learning Objectives ........................ 3\n2. Key Concepts ............................... 5\n3. Pathophysiology ............................. 7\n4. Signs & Symptoms .......................... 9\n5. Medications ................................ 11\n6. Nursing Interventions ....................... 13\n7. Practice Questions ......................... 15", fontSize: 11, fontWeight: "normal", fill: theme.bodyColor, fontFamily: theme.bodyFont, rotation: 0, opacity: 1, zIndex: z++ });
    } else {
      newObjs.push({ id: uid(), type: "rect", x: MARGIN, y: baseY, width: contentWidth, height: 32, fill: theme.primaryColor, borderRadius: 8, rotation: 0, opacity: 1, zIndex: z++ });
      newObjs.push({ id: uid(), type: "text", x: MARGIN + 12, y: baseY + 6, width: contentWidth - 24, height: 20, content: block.label.toUpperCase(), fontSize: 13, fontWeight: "bold", fill: "#ffffff", fontFamily: theme.headingFont, rotation: 0, opacity: 1, zIndex: z++ });
      newObjs.push({ id: uid(), type: "rect", x: MARGIN, y: baseY + 40, width: contentWidth, height: 100, fill: theme.sectionBg, stroke: theme.dividerColor, strokeWidth: 1, borderRadius: 8, rotation: 0, opacity: 1, zIndex: z++ });
      newObjs.push({ id: uid(), type: "text", x: MARGIN + 12, y: baseY + 50, width: contentWidth - 24, height: 80, content: `Content for ${block.label} will appear here.\nUse "Generate with AI" to auto-fill this section.`, fontSize: 11, fontWeight: "normal", fill: theme.bodyColor, fontFamily: theme.bodyFont, rotation: 0, opacity: 1, zIndex: z++ });
    }

    setObjects(prev => [...prev, ...newObjs]);
    toast({ title: `${block.label} block added` });
  };

  const loadProductPreset = (presetId: string) => {
    const preset = PRODUCT_PRESETS.find(p => p.id === presetId);
    if (!preset) return;
    if (objects.length > 0 && !confirm(`Replace current content with ${preset.label} preset? This loads ${preset.blocks.length} blocks.`)) return;
    pushUndo();
    setObjects([]);
    setTimeout(() => {
      preset.blocks.forEach((blockId, i) => {
        setTimeout(() => insertBlockToCanvas(blockId), i * 50);
      });
    }, 100);
    toast({ title: `${preset.label} preset loaded`, description: `${preset.blocks.length} blocks queued` });
  };

  const applyBrandTypography = () => {
    pushUndo();
    setObjects(prev => prev.map(obj => {
      if (obj.type !== "text") return obj;
      const isHeading = (obj.fontSize || 0) >= 18 || obj.fontWeight === "bold";
      return { ...obj, fontFamily: isHeading ? theme.headingFont : theme.bodyFont };
    }));
    toast({ title: "Theme typography applied" });
  };

  type LayoutPreset = "stack" | "two-col" | "hero-cards";
  const applyLayoutPreset = (preset: LayoutPreset) => {
    if (objects.length === 0) return;
    pushUndo();
    const contentW = CANVAS_WIDTH - MARGIN * 2;
    const leftX = MARGIN;
    const rightX = MARGIN + contentW / 2 + 8;
    const colW = contentW / 2 - 8;
    const sorted = [...objects].sort((a, b) => a.y - b.y);
    let y = MARGIN;
    const updated = sorted.map((o, i) => {
      if (preset === "stack") {
        const w = Math.min(contentW, o.width);
        const next = { ...o, x: MARGIN, y, width: w, zIndex: i };
        y += next.height + 12;
        return next;
      }
      if (preset === "two-col") {
        const col = i % 2 === 0 ? "left" : "right";
        const x = col === "left" ? leftX : rightX;
        const w = Math.min(colW, o.width);
        const next = { ...o, x, y, width: w, zIndex: i };
        if (col === "right") y += next.height + 12;
        return next;
      }
      if (i === 0 && o.type === "text") {
        const next = { ...o, x: MARGIN, y, width: contentW, fontSize: Math.max(o.fontSize || 18, 26), fontWeight: "bold" as string, zIndex: i };
        y += next.height + 16;
        return next;
      }
      const col = i % 2 === 0 ? "left" : "right";
      const x = col === "left" ? leftX : rightX;
      const w = Math.min(colW, o.width);
      const next = { ...o, x, y, width: w, zIndex: i };
      if (col === "right") y += next.height + 12;
      return next;
    });
    setObjects(updated);
    toast({ title: "Layout applied", description: preset === "stack" ? "Stacked" : preset === "two-col" ? "Two columns" : "Hero + cards" });
  };

  const insertVerifiedBadge = () => {
    if (objects.some(o => o.tag === "brand-verified")) return;
    pushUndo();
    setObjects(prev => [
      ...prev,
      {
        id: uid(), type: "rect" as const, x: CANVAS_WIDTH - MARGIN - 110, y: MARGIN,
        width: 110, height: 22, fill: theme.successColor, borderRadius: 11,
        rotation: 0, opacity: 0.9, zIndex: 999, tag: "brand-verified", locked: true,
      },
      {
        id: uid(), type: "text" as const, x: CANVAS_WIDTH - MARGIN - 105, y: MARGIN + 3,
        width: 100, height: 16, content: "BRAND VERIFIED", fontSize: 9, fontWeight: "bold",
        fill: "#ffffff", fontFamily: theme.bodyFont, rotation: 0, opacity: 1,
        zIndex: 1000, textAlign: "center", tag: "brand-verified", locked: true,
      },
    ]);
  };

  const measureTextHeight = (text: string, width: number, fontSize: number, fontFamily: string, fontWeight: string = "normal"): number => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}, Inter, sans-serif`;
    const words = text.split(/\s+/);
    let line = "";
    let lines = 1;
    const maxW = width - 4;
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > maxW && line) {
        lines++;
        line = word;
      } else {
        line = test;
      }
    }
    const newlines = (text.match(/\n/g) || []).length;
    return Math.max(lines + newlines, 1) * fontSize * 1.35 + 4;
  };

  const autofitText = (mode: "expand" | "shrink" = "expand") => {
    pushUndo();
    let fixCount = 0;
    setObjects(prev => prev.map(obj => {
      if (obj.type !== "text" || !obj.content) return obj;
      const needed = measureTextHeight(obj.content, obj.width, obj.fontSize || 16, obj.fontFamily || "Inter", obj.fontWeight || "normal");
      if (needed <= obj.height + 2) return obj;
      fixCount++;
      if (mode === "expand") {
        return { ...obj, height: Math.min(needed, CANVAS_HEIGHT - obj.y) };
      }
      let fs = obj.fontSize || 16;
      while (fs > 8) {
        const h = measureTextHeight(obj.content, obj.width, fs, obj.fontFamily || "Inter", obj.fontWeight || "normal");
        if (h <= obj.height + 2) break;
        fs--;
      }
      return { ...obj, fontSize: fs };
    }));
    toast({ title: mode === "expand" ? "Boxes expanded to fit" : "Font shrunk to fit", description: `${fixCount} text element(s) adjusted` });
  };

  const findOverflows = (): string[] => {
    const ids: string[] = [];
    for (const obj of objects) {
      if (obj.type !== "text" || !obj.content) continue;
      const needed = measureTextHeight(obj.content, obj.width, obj.fontSize || 16, obj.fontFamily || "Inter", obj.fontWeight || "normal");
      if (needed > obj.height + 2) ids.push(obj.id);
    }
    return ids;
  };

  const highlightOverflows = () => {
    const ids = findOverflows();
    if (ids.length === 0) {
      toast({ title: "No overflows found" });
      return;
    }
    setSelectedIds(ids);
    toast({ title: `${ids.length} overflowing text element(s)`, description: "Selected for review", variant: "destructive" });
  };

  const makeStoreReady = () => {
    pushUndo();
    const steps: string[] = [];

    setObjects(prev => {
      let arr = [...prev];

      if (showLogo && !arr.some(o => o.tag === "brand-logo")) {
        arr.push({
          id: uid(), type: "text", x: CANVAS_WIDTH / 2 - 60, y: CANVAS_HEIGHT - 30,
          width: 120, height: 16, content: "NurseNest", fontSize: 9,
          fontWeight: "600", fill: theme.bodyColorLight, fontFamily: theme.bodyFont,
          rotation: 0, opacity: 0.5, zIndex: 999, textAlign: "center",
          tag: "brand-logo", locked: brandLock,
        });
        steps.push("Logo");
      }

      arr = arr.map(obj => {
        if (obj.type !== "text") return obj;
        const isHeading = (obj.fontSize || 0) >= 18 || obj.fontWeight === "bold";
        return { ...obj, fontFamily: isHeading ? theme.headingFont : theme.bodyFont };
      });
      steps.push("Typography");

      if (brandLock) {
        arr = arr.map(obj => {
          if (obj.type !== "text" || !obj.fill || obj.tag === "brand-verified" || obj.tag === "brand-logo") return obj;
          if (themePalette.includes(obj.fill.toLowerCase())) return obj;
          return { ...obj, fill: theme.headingColor };
        });
        steps.push("Colors");
      }

      const sorted = [...arr].sort((a, b) => a.y - b.y);
      let curY = MARGIN;
      arr = sorted.map((obj, i) => {
        const snappedX = Math.max(MARGIN, Math.round(obj.x / GRID_SIZE) * GRID_SIZE);
        const clampedW = Math.min(obj.width, CANVAS_WIDTH - MARGIN * 2);
        const clampedX = Math.min(snappedX, CANVAS_WIDTH - MARGIN - clampedW);
        const newObj = { ...obj, x: Math.max(MARGIN, clampedX), y: curY, width: clampedW, zIndex: i };
        curY += obj.height + 12;
        return newObj;
      });
      steps.push("Grid + margins");

      arr = arr.map(obj => {
        if (obj.type !== "text" || !obj.content) return obj;
        const needed = measureTextHeight(obj.content, obj.width, obj.fontSize || 16, obj.fontFamily || "Inter", obj.fontWeight || "normal");
        if (needed <= obj.height + 2) return obj;
        return { ...obj, height: Math.min(needed, CANVAS_HEIGHT - obj.y) };
      });
      steps.push("Autofit");

      const issues: string[] = [];
      arr.forEach(obj => {
        if (obj.x < MARGIN - 5 || obj.x + obj.width > CANVAS_WIDTH - MARGIN + 5) issues.push("margin");
        if (obj.type === "text" && obj.fontSize && obj.fontSize < 8) issues.push("small-text");
      });

      arr = arr.filter(o => o.tag !== "brand-verified");

      if (issues.length === 0) {
        setBrandVerified(true);
        arr.push(
          { id: uid(), type: "rect" as const, x: CANVAS_WIDTH - MARGIN - 110, y: MARGIN, width: 110, height: 22, fill: theme.successColor, borderRadius: 11, rotation: 0, opacity: 0.9, zIndex: 999, tag: "brand-verified", locked: true },
          { id: uid(), type: "text" as const, x: CANVAS_WIDTH - MARGIN - 105, y: MARGIN + 3, width: 100, height: 16, content: "BRAND VERIFIED", fontSize: 9, fontWeight: "bold", fill: "#ffffff", fontFamily: theme.bodyFont, rotation: 0, opacity: 1, zIndex: 1000, textAlign: "center", tag: "brand-verified", locked: true },
        );
        steps.push("Verified ✓");
      } else {
        setBrandVerified(false);
        steps.push(`${issues.length} issue(s)`);
      }

      return arr;
    });

    toast({ title: "Store-Ready Pipeline Complete", description: steps.join(" → ") });
  };

  const alignSelected = (dir: "left" | "center" | "right" | "distribute") => {
    if (dir === "distribute") {
      pushUndo();
      const sorted = [...objects].sort((a, b) => a.y - b.y);
      if (sorted.length < 2) return;
      const totalH = sorted.reduce((s, o) => s + o.height, 0);
      const gap = (CANVAS_HEIGHT - MARGIN * 2 - totalH) / (sorted.length - 1);
      let y = MARGIN;
      setObjects(sorted.map(o => { const newO = { ...o, y }; y += o.height + Math.max(8, gap); return newO; }));
      return;
    }
    if (!selectedId) return;
    pushUndo();
    if (dir === "left") updateObject(selectedId, { x: MARGIN });
    else if (dir === "right") {
      const obj = objects.find(o => o.id === selectedId);
      if (obj) updateObject(selectedId, { x: CANVAS_WIDTH - MARGIN - obj.width });
    }
    else if (dir === "center") {
      const obj = objects.find(o => o.id === selectedId);
      if (obj) updateObject(selectedId, { x: (CANVAS_WIDTH - obj.width) / 2 });
    }
  };

  const EXAM_CONTEXT_MAP: Record<string, { label: string; tier: string; region: string; frameworks: string; questionStyle: string; terminology: string; scope: string }> = {
    "rex-pn": {
      label: "REX-PN (Canada)",
      tier: "RPN",
      region: "CA",
      frameworks: "Patient safety priority framework, RPN scope of practice, CNO practice standards, harm reduction, infection control (IPAC)",
      questionStyle: "Computer Adaptive Testing (CAT), case-based clinical scenarios, safety-focused decision making",
      terminology: "RPN (Registered Practical Nurse), CNO, metric units (°C, kg, cm), SI lab values (mmol/L, µmol/L, g/L)",
      scope: "RPN scope: medication administration (excluding IV initiation in some jurisdictions), wound care, patient assessment within scope, delegation from RN"
    },
    "nclex-pn": {
      label: "NCLEX-PN (US)",
      tier: "LPN/LVN",
      region: "US",
      frameworks: "ABCs (Airway-Breathing-Circulation), Maslow's hierarchy, safety and infection control, nursing process",
      questionStyle: "Computer Adaptive Testing (CAT), SATA (select all that apply), prioritization and delegation, fill-in-the-blank calculations",
      terminology: "LPN/LVN (Licensed Practical/Vocational Nurse), State Board of Nursing, imperial units (°F, lbs, in), conventional lab values (mEq/L, mg/dL)",
      scope: "LPN/LVN scope: basic patient care, data collection, medication administration under RN supervision, stable patient assignments"
    },
    "nclex-rn": {
      label: "NCLEX-RN",
      tier: "RN",
      region: "US",
      frameworks: "Clinical Judgment Measurement Model (CJMM), NCSBN Clinical Judgment, ABCs, safety and infection control, evidence-based practice",
      questionStyle: "Next Generation NCLEX (NGN): extended drag-and-drop, cloze, enhanced hotspot, matrix/grid, trend items, case studies with 6 questions each",
      terminology: "RN, NCSBN, State Board of Nursing, imperial units (°F, lbs), conventional lab values (mEq/L, mg/dL, g/dL)",
      scope: "Full RN scope: comprehensive assessment, care planning, IV therapy, delegation to LPN/UAP, patient education, discharge planning"
    },
    "np": {
      label: "NP (AANP/ANCC)",
      tier: "NP",
      region: "US",
      frameworks: "Differential diagnosis, evidence-based prescribing, advanced health assessment, pharmacological and non-pharmacological management",
      questionStyle: "Multiple-choice with complex clinical scenarios, differential diagnosis reasoning, treatment planning, prescription writing",
      terminology: "NP, AANP, ANCC, FNP-BC, autonomous practice vs collaborative practice, DEA prescriptive authority",
      scope: "NP scope: independent assessment, diagnosis, prescribing, referral, advanced procedures, health promotion"
    },
  };

  const runAiTool = async (toolId: string) => {
    if (!aiTopic.trim()) {
      toast({ title: "Enter a topic first", variant: "destructive" });
      return;
    }
    setAiLoading(toolId);
    setAiResult(null);
    try {
      const tool = AI_TOOLS.find(t => t.id === toolId);
      const examCtx = EXAM_CONTEXT_MAP[aiExamTarget] || EXAM_CONTEXT_MAP["nclex-rn"];
      const mode = toolId === "bundle-generator" ? "bundle" : "generate";

      let prompt: string;
      if (mode === "bundle") {
        prompt = `Generate a complete sellable study bundle for: ${aiTopic}.
Exam Target: ${examCtx.label} | Tier: ${examCtx.tier}
Frameworks: ${examCtx.frameworks}
Question Style: ${examCtx.questionStyle}
Terminology: ${examCtx.terminology}
Scope: ${examCtx.scope}

Include comprehensive content pages, flashcards, practice questions, and a marketplace listing.`;
      } else {
        prompt = `${tool?.prompt || "Generate content"} for: ${aiTopic}.
Exam Target: ${examCtx.label} | Tier: ${examCtx.tier}
Frameworks: ${examCtx.frameworks}
Question Style: ${examCtx.questionStyle}
Terminology: ${examCtx.terminology}
Scope: ${examCtx.scope}

Return ONLY valid JSON in this exact schema:
{
  "blocks": [
    { "type": "heading", "content": "..." },
    { "type": "paragraph", "content": "..." },
    { "type": "list", "content": "item 1\\nitem 2\\nitem 3" },
    { "type": "clinical-pearl", "content": "..." },
    { "type": "warning", "content": "..." },
    { "type": "callout", "content": "..." }
  ]
}
Rules: No markdown. No extra keys. Keep paragraphs short (1-4 sentences). Lists must be newline separated.`;
      }

      const res = await adminFetch("/api/ai/generate-content", {
        method: "POST",
        body: { prompt, mode, examTarget: aiExamTarget, topic: aiTopic },
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "AI generation failed");
      }

      const data = await res.json();

      if (mode === "bundle") {
        setAiResult(data);
        toast({ title: "Bundle generated", description: "Canvas + flashcards + qbank + listing ready" });
      } else {
        const blocks = data.blocks || [];
        setAiResult(blocks);
        toast({ title: "Content generated", description: `${blocks.length} blocks ready to insert` });

        if (autoStoreReady && blocks.length > 0) {
          setTimeout(() => {
            makeStoreReady();
            toast({ title: "Auto Store-Ready complete", description: "Pipeline ran automatically after generation" });
          }, 300);
        }
      }
    } catch (e: any) {
      const code = (e as any).code;
      const desc = code === "AI_RATE_LIMIT" ? "Please wait a moment and try again."
        : code === "AI_QUOTA_EXCEEDED" ? "Daily budget reached. Resets at midnight UTC."
        : e.message;
      toast({ title: "AI Error", description: desc, variant: "destructive" });
    } finally {
      setAiLoading(null);
    }
  };

  const generateTestBank = async () => {
    if (!aiTopic.trim()) {
      toast({ title: "Enter a topic first", variant: "destructive" });
      return;
    }
    setTbLoading(true);
    setTbResult(null);
    try {
      const res = await adminFetch("/api/ai/generate-test-bank", {
        method: "POST",
        body: {
          topic: aiTopic,
          examTarget: aiExamTarget,
          questionCount: tbQuestionCount,
          difficulty: tbDifficulty,
          questionTypes: tbQuestionTypes,
        },
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Test bank generation failed");
      }
      const data = await res.json();
      setTbResult(data);
      toast({ title: "Test Bank Generated", description: `${(data.questions || []).length} questions ready` });
    } catch (e: any) {
      toast({ title: "Generation Failed", description: e.message, variant: "destructive" });
    } finally {
      setTbLoading(false);
    }
  };

  const exportTestBankJSON = () => {
    if (!tbResult) return;
    const blob = new Blob([JSON.stringify(tbResult, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `${(tbResult.title || "test-bank").replace(/\s+/g, "-").toLowerCase()}.json`; a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Exported as JSON" });
  };

  const exportTestBankCSV = () => {
    if (!tbResult?.questions) return;
    const header = "ID,Type,Difficulty,Stem,Options,CorrectAnswer,Rationale,Category,Tags";
    const rows = tbResult.questions.map((q: any) =>
      `${q.id},"${q.type}","${q.difficulty}","${(q.stem || "").replace(/"/g, '""')}","${(q.options || []).join(" | ").replace(/"/g, '""')}","${q.correctAnswer}","${(q.rationale || "").replace(/"/g, '""')}","${q.category || ""}","${(q.tags || []).join(", ")}"`
    );
    const csv = header + "\n" + rows.join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `${(tbResult.title || "test-bank").replace(/\s+/g, "-").toLowerCase()}.csv`; a.click();
    URL.revokeObjectURL(url);
    toast({ title: `Exported ${tbResult.questions.length} questions as CSV` });
  };

  const publishTestBankToMarketplace = async () => {
    if (!tbResult || !tbPrice) return;
    setTbPublishing(true);
    try {
      const title = tbResult.title || `Test Bank: ${aiTopic}`;
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const qCount = (tbResult.questions || []).length;
      const description = `${tbResult.description || ""}\n\n${qCount} exam-style questions with detailed rationales. Includes multiple-choice, select-all-that-apply, and ordered-response formats. Mapped to ${aiExamTarget.toUpperCase()} exam blueprint.`;

      const res = await adminFetch("/api/admin/shop/products", {
        method: "POST",
        body: {
          title,
          slug,
          description: description.trim(),
          shortDescription: `${qCount} ${aiExamTarget.toUpperCase()} practice questions with rationales`,
          price: Math.round(parseFloat(tbPrice) * 100),
          category: "Question Pack",
          examTarget: aiExamTarget,
          featured: false,
        },
      });
      if (res.ok) {
        toast({ title: "Test Bank Published!", description: "Product listed in marketplace as draft." });
      } else {
        const err = await res.json();
        toast({ title: "Publish failed", description: err.error || "Unknown error", variant: "destructive" });
      }
    } catch (e: any) {
      toast({ title: "Publish failed", description: e.message, variant: "destructive" });
    } finally {
      setTbPublishing(false);
    }
  };

  const toggleTbQuestionType = (type: string) => {
    setTbQuestionTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const buildBlockObjects = (block: any, curY: number, baseZIndex: number, contentWidth: number): { objs: CanvasObject[]; height: number } => {
    const blockType = block.type || "paragraph";
    const content = block.content || "";
    const objs: CanvasObject[] = [];

    if (blockType === "heading") {
      objs.push({ id: uid(), type: "text", x: MARGIN, y: curY, width: contentWidth, height: 30, content, fontSize: 18, fontWeight: "bold", fill: BRAND.textDark, fontFamily: BRAND.fontHeading, rotation: 0, opacity: 1, zIndex: baseZIndex, textAlign: "left" });
      return { objs, height: 38 };
    } else if (blockType === "clinical-pearl") {
      objs.push({ id: uid(), type: "rect", x: MARGIN, y: curY, width: contentWidth, height: 70, fill: "#ede9fe", stroke: BRAND.primary, strokeWidth: 2, borderRadius: 10, rotation: 0, opacity: 1, zIndex: baseZIndex });
      objs.push({ id: uid(), type: "text", x: MARGIN + 12, y: curY + 6, width: contentWidth - 24, height: 16, content: "Clinical Pearl", fontSize: 11, fontWeight: "bold", fill: BRAND.primary, fontFamily: BRAND.fontBody, rotation: 0, opacity: 1, zIndex: baseZIndex + 1 });
      objs.push({ id: uid(), type: "text", x: MARGIN + 12, y: curY + 24, width: contentWidth - 24, height: 40, content, fontSize: 10, fontWeight: "normal", fill: BRAND.textDark, fontFamily: BRAND.fontBody, rotation: 0, opacity: 1, zIndex: baseZIndex + 2 });
      return { objs, height: 80 };
    } else if (blockType === "warning") {
      objs.push({ id: uid(), type: "rect", x: MARGIN, y: curY, width: contentWidth, height: 70, fill: "#fef2f2", stroke: BRAND.danger, strokeWidth: 2, borderRadius: 10, rotation: 0, opacity: 1, zIndex: baseZIndex });
      objs.push({ id: uid(), type: "text", x: MARGIN + 12, y: curY + 6, width: contentWidth - 24, height: 16, content: "Red Flag", fontSize: 11, fontWeight: "bold", fill: BRAND.danger, fontFamily: BRAND.fontBody, rotation: 0, opacity: 1, zIndex: baseZIndex + 1 });
      objs.push({ id: uid(), type: "text", x: MARGIN + 12, y: curY + 24, width: contentWidth - 24, height: 40, content, fontSize: 10, fontWeight: "normal", fill: BRAND.textDark, fontFamily: BRAND.fontBody, rotation: 0, opacity: 1, zIndex: baseZIndex + 2 });
      return { objs, height: 80 };
    } else if (blockType === "callout") {
      objs.push({ id: uid(), type: "rect", x: MARGIN, y: curY, width: contentWidth, height: 50, fill: "#f0fdf4", stroke: BRAND.success, strokeWidth: 1, borderRadius: 8, rotation: 0, opacity: 1, zIndex: baseZIndex });
      objs.push({ id: uid(), type: "text", x: MARGIN + 12, y: curY + 8, width: contentWidth - 24, height: 34, content, fontSize: 10, fontWeight: "normal", fill: BRAND.textDark, fontFamily: BRAND.fontBody, rotation: 0, opacity: 1, zIndex: baseZIndex + 1 });
      return { objs, height: 58 };
    } else if (blockType === "list") {
      const lines = content.split("\n").filter((l: string) => l.trim());
      const h = Math.max(40, lines.length * 16);
      objs.push({ id: uid(), type: "text", x: MARGIN, y: curY, width: contentWidth, height: h, content: lines.map((l: string) => `• ${l.replace(/^[-•]\s*/, "")}`).join("\n"), fontSize: 10, fontWeight: "normal", fill: BRAND.textDark, fontFamily: BRAND.fontBody, rotation: 0, opacity: 1, zIndex: baseZIndex, textAlign: "left" });
      return { objs, height: h + 10 };
    } else {
      const estLines = Math.ceil(content.length / 70);
      const h = Math.max(30, estLines * 14);
      objs.push({ id: uid(), type: "text", x: MARGIN, y: curY, width: contentWidth, height: h, content, fontSize: 10, fontWeight: "normal", fill: BRAND.textDark, fontFamily: BRAND.fontBody, rotation: 0, opacity: 1, zIndex: baseZIndex, textAlign: "left" });
      return { objs, height: h + 8 };
    }
  };

  const insertAiBlocks = () => {
    if (!aiResult || aiResult.length === 0) return;
    pushUndo();
    let curY = MARGIN;
    const existingMaxY = objects.reduce((m, o) => Math.max(m, o.y + o.height), 0);
    if (existingMaxY > MARGIN) curY = existingMaxY + 20;

    const newObjs: CanvasObject[] = [];
    const contentWidth = CANVAS_WIDTH - MARGIN * 2;

    for (const block of aiResult) {
      const { objs, height } = buildBlockObjects(block, curY, objects.length + newObjs.length, contentWidth);
      newObjs.push(...objs);
      curY += height;
    }

    setObjects(prev => [...prev, ...newObjs]);
    setAiResult(null);
    toast({ title: `${newObjs.length} elements inserted` });
  };

  const insertAiBlocksMultiPage = async () => {
    if (!aiResult || aiResult.length === 0) return;
    pushUndo();
    const contentWidth = CANVAS_WIDTH - MARGIN * 2;
    const maxY = CANVAS_HEIGHT - MARGIN;
    const bgColor = pages[currentPageIndex]?.backgroundColor || "#ffffff";

    const pageChunks: CanvasObject[][] = [[]];
    let curY = MARGIN;
    const existingMaxY = objects.reduce((m, o) => Math.max(m, o.y + o.height), 0);
    if (existingMaxY > MARGIN) curY = existingMaxY + 20;

    if (curY >= maxY) {
      pageChunks.push([]);
      curY = MARGIN;
    }

    let zBase = objects.length;

    for (const block of aiResult) {
      const { objs, height } = buildBlockObjects(block, curY, zBase, contentWidth);

      if (curY + height > maxY) {
        if (pageChunks[pageChunks.length - 1].length > 0) {
          pageChunks[pageChunks.length - 1].push({
            id: uid(), type: "text", x: MARGIN, y: CANVAS_HEIGHT - MARGIN - 12,
            width: contentWidth, height: 12, content: "continued…", fontSize: 8,
            fontWeight: "normal", fill: theme.bodyColorLight, fontFamily: theme.bodyFont,
            rotation: 0, opacity: 0.6, zIndex: zBase++, textAlign: "right",
          });
        }
        pageChunks.push([]);
        curY = MARGIN;
        const rebased = buildBlockObjects(block, curY, zBase, contentWidth);
        pageChunks[pageChunks.length - 1].push(...rebased.objs);
        curY += rebased.height;
        zBase += rebased.objs.length;
      } else {
        pageChunks[pageChunks.length - 1].push(...objs);
        curY += height;
        zBase += objs.length;
      }
    }

    setObjects(prev => [...prev, ...pageChunks[0]]);

    let createdPages = 0;
    for (let i = 1; i < pageChunks.length; i++) {
      try {
        const res = await adminFetch(`/api/admin/design-projects/${projectId}/pages`, {
          method: "POST",
          body: { title: `AI Page ${pages.length + i}`, backgroundColor: bgColor, canvasJson: { objects: pageChunks[i], version: "1.0" } },
        });
        if (res.ok) {
          const newPage = await res.json();
          setPages(prev => [...prev, newPage]);
          createdPages++;
        }
      } catch {}
    }

    setAiResult(null);
    toast({
      title: `AI content paginated`,
      description: `Page 1 updated + ${createdPages} new page(s) created`,
    });
  };

  const handleCanvasMouseDown = (e: React.MouseEvent, objId?: string) => {
    if (objId) {
      const obj = objects.find(o => o.id === objId);
      if (!obj) return;

      if (e.shiftKey) {
        toggleSelect(objId, true);
      } else {
        if (obj.groupId) {
          setSelectedIds(selectGroupOfObject(objId));
        } else {
          setSelectedIds([objId]);
        }
      }

      if (obj.locked) return;
      const canvasRect = canvasRef.current?.getBoundingClientRect();
      if (!canvasRect) return;
      setIsDragging(true);
      setDragOffset({ x: e.clientX / SCALE - obj.x, y: e.clientY / SCALE - obj.y });
      e.stopPropagation();
    } else {
      setSelectedIds([]);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (isDragging && selectedIds.length > 0) {
      const primaryId = selectedIds[selectedIds.length - 1];
      const primaryObj = objects.find(o => o.id === primaryId);
      if (!primaryObj) return;
      const rawX = e.clientX / SCALE - dragOffset.x;
      const rawY = e.clientY / SCALE - dragOffset.y;
      const snappedX = Math.round(rawX / GRID_SIZE) * GRID_SIZE;
      const snappedY = Math.round(rawY / GRID_SIZE) * GRID_SIZE;
      const clampedX = Math.max(0, Math.min(snappedX, CANVAS_WIDTH - primaryObj.width));
      const clampedY = Math.max(0, Math.min(snappedY, CANVAS_HEIGHT - primaryObj.height));
      const dx = clampedX - primaryObj.x;
      const dy = clampedY - primaryObj.y;
      setObjects(prev => prev.map(o => selectedIds.includes(o.id) ? { ...o, x: o.x + dx, y: o.y + dy } : o));
    }
    if (isResizing && selectedId) {
      const obj = objects.find(o => o.id === selectedId);
      const dx = (e.clientX - resizeStart.x) / SCALE;
      const dy = (e.clientY - resizeStart.y) / SCALE;
      const newW = Math.max(20, Math.min(resizeStart.w + dx, CANVAS_WIDTH - (obj?.x || 0)));
      const newH = Math.max(20, Math.min(resizeStart.h + dy, CANVAS_HEIGHT - (obj?.y || 0)));
      updateObject(selectedId, { width: newW, height: newH });
    }
  };

  const handleCanvasMouseUp = () => {
    if (isDragging || isResizing) pushUndo();
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    const obj = objects.find(o => o.id === selectedId);
    if (!obj || obj.locked) return;
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({ x: e.clientX, y: e.clientY, w: obj.width, h: obj.height });
  };

  const switchPage = (index: number) => {
    const leaving = pages[currentPageIndex];
    if (leaving) {
      try {
        const bg = leaving.backgroundColor || "#ffffff";
        const url = makeThumb(objects, bg);
        if (url) setPageThumbs(prev => ({ ...prev, [leaving.id]: url }));
      } catch {}
    }
    saveCanvas();
    setCurrentPageIndex(index);
    const pageData = pages[index]?.canvasJson;
    const pageObjects = pageData?.objects || [];
    setObjects(pageObjects);
    setSelectedId(null);
    setUndoStack([]);
    setRedoStack([]);
  };

  const addPage = async () => {
    const res = await adminFetch(`/api/admin/design-projects/${projectId}/pages`, {
      method: "POST",
      body: {},
    });
    if (res.ok) {
      const page = await res.json();
      setPages(prev => [...prev, page]);
      switchPage(pages.length);
    }
  };

  const deletePage = async (pageId: string, index: number) => {
    if (pages.length <= 1) return;
    if (!confirm("Delete this page?")) return;
    await adminFetch(`/api/admin/design-pages/${pageId}`, { method: "DELETE" });
    const newPages = pages.filter(p => p.id !== pageId);
    setPages(newPages);
    if (currentPageIndex >= newPages.length) switchPage(newPages.length - 1);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (selectedIds.length > 0 && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") deleteSelected();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "z") { e.preventDefault(); undo(); }
      if ((e.ctrlKey || e.metaKey) && e.key === "y") { e.preventDefault(); redo(); }
      if ((e.ctrlKey || e.metaKey) && e.key === "d") { e.preventDefault(); duplicateSelected(); }
      if ((e.ctrlKey || e.metaKey) && e.key === "s") { e.preventDefault(); saveCanvas(); }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "g") {
        e.preventDefault();
        if (e.shiftKey) ungroupSelected();
        else groupSelected();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedIds, objects, undoStack, redoStack]);

  const renderPageToCanvas = (pageObjects: CanvasObject[], bgColor: string = "#ffffff"): HTMLCanvasElement => {
    const canvas = document.createElement("canvas");
    canvas.width = CANVAS_WIDTH * 2;
    canvas.height = CANVAS_HEIGHT * 2;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(2, 2);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    const sorted = [...pageObjects].sort((a, b) => a.zIndex - b.zIndex);
    for (const obj of sorted) {
      ctx.save();
      ctx.globalAlpha = obj.opacity ?? 1;
      if (obj.rotation) {
        ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);
        ctx.rotate((obj.rotation * Math.PI) / 180);
        ctx.translate(-(obj.x + obj.width / 2), -(obj.y + obj.height / 2));
      }
      if (obj.type === "rect") {
        ctx.fillStyle = obj.fill || "#94a3b8";
        if (obj.borderRadius) {
          const r = Math.min(obj.borderRadius, obj.width / 2, obj.height / 2);
          ctx.beginPath();
          ctx.moveTo(obj.x + r, obj.y);
          ctx.lineTo(obj.x + obj.width - r, obj.y);
          ctx.arcTo(obj.x + obj.width, obj.y, obj.x + obj.width, obj.y + r, r);
          ctx.lineTo(obj.x + obj.width, obj.y + obj.height - r);
          ctx.arcTo(obj.x + obj.width, obj.y + obj.height, obj.x + obj.width - r, obj.y + obj.height, r);
          ctx.lineTo(obj.x + r, obj.y + obj.height);
          ctx.arcTo(obj.x, obj.y + obj.height, obj.x, obj.y + obj.height - r, r);
          ctx.lineTo(obj.x, obj.y + r);
          ctx.arcTo(obj.x, obj.y, obj.x + r, obj.y, r);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
        }
        if (obj.stroke) {
          ctx.strokeStyle = obj.stroke;
          ctx.lineWidth = obj.strokeWidth || 1;
          if (obj.borderRadius) ctx.stroke();
          else ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);
        }
      } else if (obj.type === "circle") {
        ctx.fillStyle = obj.fill || "#3b82f6";
        ctx.beginPath();
        ctx.ellipse(obj.x + obj.width / 2, obj.y + obj.height / 2, obj.width / 2, obj.height / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        if (obj.stroke) { ctx.strokeStyle = obj.stroke; ctx.lineWidth = obj.strokeWidth || 1; ctx.stroke(); }
      } else if (obj.type === "text") {
        ctx.fillStyle = obj.fill || "#000000";
        ctx.font = `${obj.fontWeight || "normal"} ${obj.fontSize || 16}px ${obj.fontFamily || "sans-serif"}`;
        ctx.textAlign = (obj.textAlign as CanvasTextAlign) || "left";
        const lines = (obj.content || "Text").split("\n");
        const lineHeight = (obj.fontSize || 16) * 1.3;
        lines.forEach((line, li) => {
          const tx = obj.textAlign === "center" ? obj.x + obj.width / 2 : obj.textAlign === "right" ? obj.x + obj.width : obj.x;
          ctx.fillText(line, tx, obj.y + (obj.fontSize || 16) + li * lineHeight, obj.width);
        });
      }
      ctx.restore();
    }
    return canvas;
  };

  function makeThumb(pageObjects: CanvasObject[], bgColor: string, maxW = 160, maxH = 210): string {
    try {
      const src = renderPageToCanvas(pageObjects, bgColor);
      const thumb = document.createElement("canvas");
      const scale = Math.min(maxW / CANVAS_WIDTH, maxH / CANVAS_HEIGHT);
      thumb.width = Math.max(1, Math.round(CANVAS_WIDTH * scale));
      thumb.height = Math.max(1, Math.round(CANVAS_HEIGHT * scale));
      const ctx = thumb.getContext("2d");
      if (!ctx) return "";
      ctx.fillStyle = bgColor || "#ffffff";
      ctx.fillRect(0, 0, thumb.width, thumb.height);
      ctx.drawImage(src, 0, 0, thumb.width, thumb.height);
      return thumb.toDataURL("image/png");
    } catch {
      return "";
    }
  }

  useEffect(() => {
    const page = pages[currentPageIndex];
    if (!page) return;
    const id = page.id;
    const bg = page.backgroundColor || "#ffffff";
    const t = window.setTimeout(() => {
      try {
        const url = makeThumb(objects, bg);
        if (url) setPageThumbs(prev => (prev[id] === url ? prev : { ...prev, [id]: url }));
      } catch {}
    }, 250);
    return () => window.clearTimeout(t);
  }, [objects, currentPageIndex, pages]);

  useEffect(() => {
    if (!pages.length) return;
    setPageThumbs(prev => {
      const next = { ...prev };
      let changed = false;
      for (const p of pages) {
        if (next[p.id]) continue;
        const objs: CanvasObject[] = p.canvasJson?.objects || [];
        const bg = p.backgroundColor || "#ffffff";
        try {
          const url = makeThumb(objs, bg);
          if (url) { next[p.id] = url; changed = true; }
        } catch {}
      }
      return changed ? next : prev;
    });
  }, [pages.length]);

  const exportAsImages = async () => {
    setExporting(true);
    try {
      await saveCanvas();
      for (let i = 0; i < pages.length; i++) {
        const pageData = i === currentPageIndex ? { objects } : pages[i]?.canvasJson;
        const pageObjects = pageData?.objects || [];
        const bgColor = pages[i]?.backgroundColor || "#ffffff";
        const canvas = renderPageToCanvas(pageObjects, bgColor);
        const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, "image/png"));
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${project?.title || "design"}-page-${i + 1}.png`;
          a.click();
          URL.revokeObjectURL(url);
        }
      }
      toast({ title: `Exported ${pages.length} page(s) as PNG images` });
    } catch (e: any) {
      toast({ title: "Export failed", description: e.message, variant: "destructive" });
    } finally {
      setExporting(false);
    }
  };

  const exportAsPDF = async () => {
    setExporting(true);
    try {
      await saveCanvas();
      const { jsPDF } = await import("jspdf");
      const orientation = project?.orientation === "landscape" ? "landscape" : "portrait";
      const pdf = new jsPDF({ orientation: orientation as any, unit: "pt", format: [CANVAS_WIDTH, CANVAS_HEIGHT] });
      for (let i = 0; i < pages.length; i++) {
        if (i > 0) pdf.addPage([CANVAS_WIDTH, CANVAS_HEIGHT], orientation);
        const pageData = i === currentPageIndex ? { objects } : pages[i]?.canvasJson;
        const pageObjects = pageData?.objects || [];
        const bgColor = pages[i]?.backgroundColor || "#ffffff";
        const canvas = renderPageToCanvas(pageObjects, bgColor);
        const dataUrl = canvas.toDataURL("image/png");
        pdf.addImage(dataUrl, "PNG", 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      }
      pdf.save(`${(project?.title || "design").replace(/[^a-zA-Z0-9]/g, "-")}.pdf`);
      toast({ title: `Exported ${pages.length} page(s) as PDF` });
    } catch (e: any) {
      toast({ title: "PDF export failed", description: e.message, variant: "destructive" });
    } finally {
      setExporting(false);
    }
  };

  const exportThumbnail = (width: number, height: number) => {
    const pageData = pages[0]?.canvasJson;
    const pageObjects = currentPageIndex === 0 ? objects : (pageData?.objects || []);
    const bgColor = pages[0]?.backgroundColor || "#ffffff";
    const srcCanvas = renderPageToCanvas(pageObjects, bgColor);
    const thumbCanvas = document.createElement("canvas");
    thumbCanvas.width = width * 2;
    thumbCanvas.height = height * 2;
    const ctx = thumbCanvas.getContext("2d")!;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, thumbCanvas.width, thumbCanvas.height);
    const scale = Math.min((width * 2) / srcCanvas.width, (height * 2) / srcCanvas.height);
    const dx = (width * 2 - srcCanvas.width * scale) / 2;
    const dy = (height * 2 - srcCanvas.height * scale) / 2;
    ctx.drawImage(srcCanvas, dx, dy, srcCanvas.width * scale, srcCanvas.height * scale);
    thumbCanvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `thumbnail-${width}x${height}.png`;
        a.click();
        URL.revokeObjectURL(url);
      }
    }, "image/png");
    toast({ title: `Thumbnail ${width}x${height} exported` });
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const canvasToBlob = (canvas: HTMLCanvasElement, type = "image/png", quality?: number) =>
    new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(b => (b ? resolve(b) : reject(new Error("Failed to create blob"))), type, quality);
    });

  const renderPageToSize = (
    pageObjects: CanvasObject[], bgColor: string,
    targetW: number, targetH: number, fit: "contain" | "cover" = "contain"
  ) => {
    const src = renderPageToCanvas(pageObjects, bgColor);
    const out = document.createElement("canvas");
    out.width = targetW * 2;
    out.height = targetH * 2;
    const ctx = out.getContext("2d")!;
    ctx.fillStyle = bgColor || "#ffffff";
    ctx.fillRect(0, 0, out.width, out.height);
    const scaleX = out.width / src.width;
    const scaleY = out.height / src.height;
    const scale = fit === "cover" ? Math.max(scaleX, scaleY) : Math.min(scaleX, scaleY);
    const drawW = src.width * scale;
    const drawH = src.height * scale;
    const dx = (out.width - drawW) / 2;
    const dy = (out.height - drawH) / 2;
    ctx.drawImage(src, dx, dy, drawW, drawH);
    return out;
  };

  const drawMockupFrame = (pageCanvas: HTMLCanvasElement, _bgColor: string, targetW: number, targetH: number, label: string) => {
    const out = document.createElement("canvas");
    out.width = targetW * 2;
    out.height = targetH * 2;
    const ctx = out.getContext("2d")!;
    const g = ctx.createLinearGradient(0, 0, out.width, out.height);
    g.addColorStop(0, "#f8f7ff");
    g.addColorStop(0.5, "#f5fbff");
    g.addColorStop(1, "#fffdf7");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, out.width, out.height);

    const cardX = Math.round(out.width * 0.12);
    const cardY = Math.round(out.height * 0.10);
    const cardW = Math.round(out.width * 0.76);
    const cardH = Math.round(out.height * 0.80);
    const radius = Math.round(out.width * 0.03);

    const roundRect = (c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
      const rr = Math.min(r, w / 2, h / 2);
      c.beginPath();
      c.moveTo(x + rr, y);
      c.lineTo(x + w - rr, y);
      c.arcTo(x + w, y, x + w, y + rr, rr);
      c.lineTo(x + w, y + h - rr);
      c.arcTo(x + w, y + h, x + w - rr, y + h, rr);
      c.lineTo(x + rr, y + h);
      c.arcTo(x, y + h, x, y + h - rr, rr);
      c.lineTo(x, y + rr);
      c.arcTo(x, y, x + rr, y, rr);
      c.closePath();
    };

    ctx.save();
    ctx.shadowColor = "rgba(124,58,237,0.22)";
    ctx.shadowBlur = 60;
    ctx.shadowOffsetY = 20;
    ctx.fillStyle = "#ffffff";
    roundRect(ctx, cardX, cardY, cardW, cardH, radius);
    ctx.fill();
    ctx.restore();

    const framePad = Math.round(cardW * 0.06);
    const frameX = cardX + framePad;
    const frameY = cardY + Math.round(cardH * 0.10);
    const frameW = cardW - framePad * 2;
    const frameH = cardH - Math.round(cardH * 0.18);
    const frameR = Math.round(radius * 0.8);
    ctx.fillStyle = "#0f172a";
    roundRect(ctx, frameX, frameY, frameW, frameH, frameR);
    ctx.fill();

    const inset = Math.round(frameW * 0.03);
    const screenX = frameX + inset;
    const screenY = frameY + inset;
    const screenW = frameW - inset * 2;
    const screenH = frameH - inset * 2;
    ctx.fillStyle = "#ffffff";
    roundRect(ctx, screenX, screenY, screenW, screenH, Math.round(frameR * 0.7));
    ctx.fill();

    const scaleX = screenW / pageCanvas.width;
    const scaleY = screenH / pageCanvas.height;
    const scale = Math.min(scaleX, scaleY);
    const drawW = pageCanvas.width * scale;
    const drawH = pageCanvas.height * scale;
    const dx = screenX + (screenW - drawW) / 2;
    const dy = screenY + (screenH - drawH) / 2;
    ctx.drawImage(pageCanvas, dx, dy, drawW, drawH);

    ctx.fillStyle = "#1e293b";
    ctx.font = `700 ${Math.round(out.width * 0.022)}px Inter, system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText(label, out.width / 2, Math.round(cardY + cardH * 0.07));

    ctx.fillStyle = "rgba(30,41,59,0.55)";
    ctx.font = `600 ${Math.round(out.width * 0.016)}px Inter, system-ui, sans-serif`;
    ctx.fillText("NurseNest \u2022 Instant Download", out.width / 2, Math.round(cardY + cardH * 0.94));

    return out;
  };

  const exportInstagramCarousel = async () => {
    setExporting(true);
    try {
      await saveCanvas();
      const title = (project?.title || "design").replace(/[^a-zA-Z0-9]/g, "-");
      for (let i = 0; i < pages.length; i++) {
        const pageData = i === currentPageIndex ? { objects } : pages[i]?.canvasJson;
        const pageObjects = pageData?.objects || [];
        const bgColor = pages[i]?.backgroundColor || "#ffffff";
        const c = renderPageToSize(pageObjects, bgColor, 1080, 1350, "contain");
        const blob = await canvasToBlob(c);
        downloadBlob(blob, `${title}-IG-${String(i + 1).padStart(2, "0")}.png`);
      }
      toast({ title: "Exported Instagram carousel", description: `${pages.length} image(s) 1080x1350` });
    } catch (e: any) {
      toast({ title: "IG export failed", description: e.message, variant: "destructive" });
    } finally {
      setExporting(false);
    }
  };

  const exportEtsyStorePack = async () => {
    setExporting(true);
    try {
      await saveCanvas();
      const title = (project?.title || "design").replace(/[^a-zA-Z0-9]/g, "-");
      const heroPageData = currentPageIndex === 0 ? { objects } : pages[0]?.canvasJson;
      const heroObjects = heroPageData?.objects || [];
      const heroBg = pages[0]?.backgroundColor || "#ffffff";

      const sq = renderPageToSize(heroObjects, heroBg, 600, 600, "cover");
      downloadBlob(await canvasToBlob(sq), `${title}-thumb-600x600.png`);

      const banner = renderPageToSize(heroObjects, heroBg, 1200, 630, "cover");
      downloadBlob(await canvasToBlob(banner), `${title}-banner-1200x630.png`);

      const page1 = renderPageToSize(heroObjects, heroBg, 900, 1200, "contain");
      const mock1 = drawMockupFrame(page1, heroBg, 2000, 2000, "Study Guide Preview");
      downloadBlob(await canvasToBlob(mock1), `${title}-mockup-1.png`);

      const page2Data = pages[1] ? (currentPageIndex === 1 ? { objects } : pages[1]?.canvasJson) : heroPageData;
      const page3Data = pages[2] ? (currentPageIndex === 2 ? { objects } : pages[2]?.canvasJson) : heroPageData;
      const p2Objs = page2Data?.objects || heroObjects;
      const p3Objs = page3Data?.objects || heroObjects;

      const p2 = renderPageToSize(p2Objs, heroBg, 900, 1200, "contain");
      const p3 = renderPageToSize(p3Objs, heroBg, 900, 1200, "contain");
      const mock2 = drawMockupFrame(p2, heroBg, 2000, 2000, "High-Yield Layout");
      const mock3 = drawMockupFrame(p3, heroBg, 2000, 2000, "Exam-Ready Format");
      downloadBlob(await canvasToBlob(mock2), `${title}-mockup-2.png`);
      downloadBlob(await canvasToBlob(mock3), `${title}-mockup-3.png`);

      toast({ title: "Exported Etsy store pack", description: "Thumb + banner + 3 mockups created" });
    } catch (e: any) {
      toast({ title: "Etsy export failed", description: e.message, variant: "destructive" });
    } finally {
      setExporting(false);
    }
  };

  const dollarsToCents = (v: string): number => {
    const n = Number(String(v).replace(/[^0-9.]/g, ""));
    if (!isFinite(n)) return 0;
    return Math.round(n * 100);
  };

  const publishToMarketplace = async () => {
    if (!publishForm.title.trim() || !publishForm.price) return;
    setPublishing(true);
    try {
      await saveCanvas();
      const res = await adminFetch("/api/admin/shop/products", {
        method: "POST",
        body: {
          title: publishForm.title,
          slug: publishForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
          description: publishForm.description || publishForm.title,
          price: dollarsToCents(publishForm.price),
          category: publishForm.category,
          coverImageUrl: null,
          featured: false,
        },
      });
      if (res.ok) {
        toast({ title: "Published to marketplace!", description: "Your product is now in the store as a draft." });
        setShowPublishDialog(false);
      } else {
        const err = await res.json();
        toast({ title: "Publish failed", description: err.error || "Unknown error", variant: "destructive" });
      }
    } catch (e: any) {
      toast({ title: "Publish failed", description: e.message, variant: "destructive" });
    } finally {
      setPublishing(false);
    }
  };

  const selectedObj = objects.find(o => o.id === selectedId);

  const renderLeftPanel = () => {
    if (!leftPanel) return null;

    if (leftPanel === "components") {
      return (
        <div className="w-52 bg-white border-r overflow-y-auto shrink-0" data-testid="panel-components">
          <div className="p-3 border-b">
            <span className="text-xs font-semibold text-gray-600">Design Components</span>
          </div>
          <div className="p-2 space-y-1">
            {DESIGN_COMPONENTS.map(comp => (
              <button key={comp.tag} onClick={() => insertDesignComponent(comp)} className="w-full text-left px-3 py-2 rounded-lg hover:bg-primary/5 text-xs flex items-center gap-2 text-gray-700 hover:text-primary transition-colors" data-testid={`button-comp-${comp.tag}`}>
                <comp.icon className="w-3.5 h-3.5 shrink-0" />
                <span>{comp.label}</span>
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (leftPanel === "templates") {
      return (
        <div className="w-52 bg-white border-r overflow-y-auto shrink-0" data-testid="panel-templates">
          <div className="p-3 border-b">
            <span className="text-xs font-semibold text-gray-600">Page Templates</span>
          </div>
          <div className="p-2 space-y-1">
            {PAGE_TEMPLATES.map(tmpl => (
              <button key={tmpl.label} onClick={() => applyPageTemplate(tmpl)} className="w-full text-left px-3 py-2 rounded-lg hover:bg-primary/5 text-xs flex items-center gap-2 text-gray-700 hover:text-primary transition-colors" data-testid={`button-template-${tmpl.label.replace(/\s/g, "-").toLowerCase()}`}>
                <tmpl.icon className="w-3.5 h-3.5 shrink-0" />
                <span>{tmpl.label}</span>
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (leftPanel === "ai") {
      return (
        <div className="w-64 bg-white border-r overflow-y-auto shrink-0" data-testid="panel-ai">
          <div className="p-3 border-b">
            <span className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
              <Brain className="w-3.5 h-3.5 text-primary" /> AI Content Tools
            </span>
          </div>
          <div className="p-3 space-y-3">
            <div>
              <label className="text-[10px] font-medium text-gray-500 block mb-1">Topic</label>
              <Input value={aiTopic} onChange={e => setAiTopic(e.target.value)} placeholder="e.g., Heart Failure" className="text-xs h-8" data-testid="input-ai-topic" />
            </div>
            <div>
              <label className="text-[10px] font-medium text-gray-500 block mb-1">Exam Target</label>
              <select value={aiExamTarget} onChange={e => setAiExamTarget(e.target.value)} className="w-full text-xs border rounded-md px-2 py-1.5" data-testid="select-ai-exam-target">
                <option value="rex-pn">REX-PN (Canada - RPN)</option>
                <option value="nclex-pn">NCLEX-PN (US - LPN/LVN)</option>
                <option value="nclex-rn">NCLEX-RN (US/CA - RN)</option>
                <option value="np">NP (AANP/ANCC)</option>
              </select>
            </div>
            <div className="border-t pt-2 space-y-0.5">
              {AI_TOOLS.map(tool => (
                <button
                  key={tool.id}
                  onClick={() => runAiTool(tool.id)}
                  disabled={aiLoading !== null || !aiTopic.trim()}
                  className="w-full text-left px-2.5 py-1.5 rounded text-[11px] flex items-center gap-2 text-gray-600 hover:bg-primary/5 hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  data-testid={`button-ai-${tool.id}`}
                >
                  {aiLoading === tool.id ? <Loader2 className="w-3 h-3 animate-spin shrink-0" /> : <tool.icon className="w-3 h-3 shrink-0" />}
                  <span className="truncate">{tool.label}</span>
                </button>
              ))}
            </div>
            {aiResult && Array.isArray(aiResult) && aiResult.length > 0 && (
              <div className="border-t pt-3">
                <div className="bg-primary/5 rounded-lg p-2.5">
                  <p className="text-[10px] font-semibold text-primary mb-1">{aiResult.length} blocks generated</p>
                  <div className="max-h-32 overflow-y-auto text-[9px] text-gray-500 space-y-1 mb-2">
                    {aiResult.slice(0, 5).map((b: any, i: number) => (
                      <p key={i} className="truncate">{b.type}: {(b.content || "").slice(0, 50)}...</p>
                    ))}
                    {aiResult.length > 5 && <p>...and {aiResult.length - 5} more</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <Button size="sm" onClick={insertAiBlocks} className="h-7 text-[10px] gap-1" data-testid="button-insert-ai">
                      <Plus className="w-3 h-3" /> Insert
                    </Button>
                    <Button size="sm" variant="outline" onClick={insertAiBlocksMultiPage} className="h-7 text-[10px] gap-1" data-testid="button-insert-ai-multipage">
                      <Layers className="w-3 h-3" /> Multi-Page
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {aiResult && aiResult.bundle === true && (
              <div className="border-t pt-3 space-y-2">
                <div className="bg-primary/5 rounded-lg p-2.5">
                  <p className="text-[10px] font-semibold text-primary mb-1">Bundle ready</p>
                  <div className="text-[10px] text-gray-600 space-y-1">
                    <p>Pages: {(aiResult.pages || []).length}</p>
                    <p>Flashcards: {(aiResult.flashcards || []).length}</p>
                    <p>QBank: {(aiResult.qbank || []).length}</p>
                    <p>Listing: {aiResult.listing?.title ? "Yes" : "No"}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Button size="sm" className="h-7 text-[10px]" data-testid="button-insert-bundle-pages" onClick={async () => {
                      const pagesPayload = aiResult.pages || [];
                      const listing = aiResult.listing;
                      pushUndo();
                      const preset = COVER_PRESETS.find(p => p.id === coverPresetId) || COVER_PRESETS[0];
                      const coverObjs = generateStyledCoverPage(CANVAS_WIDTH, CANVAS_HEIGHT, theme, preset, {
                        title: listing?.title || project?.title || "Study Guide",
                        subtitle: `${EXAM_CONTEXT_MAP[aiExamTarget]?.label || "Nursing"} Review`,
                        examTarget: EXAM_CONTEXT_MAP[aiExamTarget]?.label || "",
                        includesFlashcards: (aiResult.flashcards || []).length > 0,
                        includesQbank: (aiResult.qbank || []).length > 0,
                        pageCount: pagesPayload.length + 1,
                      });
                      setObjects(coverObjs);
                      const bgColor = pages[currentPageIndex]?.backgroundColor || "#ffffff";
                      let created = 0;
                      const totalSections = pagesPayload.length;
                      for (let pi = 0; pi < pagesPayload.length; pi++) {
                        const p = pagesPayload[pi];
                        try {
                          const chapterTitle = p.title || `Section ${pi + 1}`;
                          if (totalSections > 1) {
                            const chapterObjs = generateChapterCoverPage(CANVAS_WIDTH, CANVAS_HEIGHT, theme, preset, {
                              chapterTitle,
                              chapterNumber: pi + 1,
                              totalChapters: totalSections,
                            });
                            const chRes = await adminFetch(`/api/admin/design-projects/${projectId}/pages`, {
                              method: "POST",
                              body: { title: chapterTitle, backgroundColor: bgColor, canvasJson: { objects: chapterObjs, version: "1.0" } },
                            });
                            if (chRes.ok) { const cp = await chRes.json(); setPages(prev => [...prev, cp]); }
                          }
                          const res = await adminFetch(`/api/admin/design-projects/${projectId}/pages`, {
                            method: "POST",
                            body: { title: `Content Page ${created + 1}`, backgroundColor: bgColor, canvasJson: { objects: p.objects || [], version: "1.0" } },
                          });
                          if (res.ok) { const np = await res.json(); setPages(prev => [...prev, np]); created++; }
                        } catch {}
                      }
                      toast({ title: "Bundle inserted with cover", description: `Cover + ${totalSections > 1 ? totalSections + " chapter covers + " : ""}${created} content page(s) created` });
                    }}>Insert + Cover</Button>
                    <Button size="sm" variant="outline" className="h-7 text-[10px]" data-testid="button-copy-listing" onClick={() => {
                      const listing = aiResult.listing;
                      if (!listing) return;
                      const text = `${listing.title}\n\n${listing.description}\n\n${(listing.bullets || []).join("\n")}`;
                      navigator.clipboard.writeText(text);
                      toast({ title: "Listing copied to clipboard" });
                    }}>Copy Listing</Button>
                    <Button size="sm" variant="outline" className="h-7 text-[10px]" data-testid="button-export-flashcards" onClick={() => {
                      const cards = aiResult.flashcards || [];
                      const csv = "Front,Back\n" + cards.map((c: any) => `"${(c.front || "").replace(/"/g, '""')}","${(c.back || "").replace(/"/g, '""')}"`).join("\n");
                      const blob = new Blob([csv], { type: "text/csv" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a"); a.href = url; a.download = "flashcards.csv"; a.click();
                      URL.revokeObjectURL(url);
                      toast({ title: `Exported ${cards.length} flashcards` });
                    }}>Export Flash</Button>
                    <Button size="sm" variant="outline" className="h-7 text-[10px]" data-testid="button-export-qbank" onClick={() => {
                      const qbank = aiResult.qbank || [];
                      const blob = new Blob([JSON.stringify(qbank, null, 2)], { type: "application/json" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a"); a.href = url; a.download = "qbank.json"; a.click();
                      URL.revokeObjectURL(url);
                      toast({ title: `Exported ${qbank.length} questions` });
                    }}>Export QBank</Button>
                  </div>
                </div>
              </div>
            )}

            <div className="border-t pt-3">
              <div className="flex items-center gap-1.5 mb-2">
                <ClipboardCheck className="w-3.5 h-3.5 text-primary" />
                <span className="text-[11px] font-semibold text-gray-700">Test Bank Generator</span>
              </div>
              <p className="text-[9px] text-gray-400 mb-2">Generate exam-style question banks to sell in your marketplace. Uses the topic and exam target above.</p>
              <div className="space-y-2">
                <div>
                  <label className="text-[9px] font-medium text-gray-500 block mb-0.5">Questions</label>
                  <div className="flex gap-1">
                    {[10, 25, 50, 75].map(n => (
                      <button key={n} onClick={() => setTbQuestionCount(n)} className={`flex-1 h-6 rounded text-[9px] font-medium border transition ${tbQuestionCount === n ? "bg-primary text-white border-primary" : "border-gray-200 text-gray-500 hover:border-primary/30"}`} data-testid={`button-tb-count-${n}`}>{n}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[9px] font-medium text-gray-500 block mb-0.5">Difficulty</label>
                  <div className="flex gap-1">
                    {[{v:"easy",l:"Easy"},{v:"mixed",l:"Mixed"},{v:"hard",l:"Hard"}].map(d => (
                      <button key={d.v} onClick={() => setTbDifficulty(d.v)} className={`flex-1 h-6 rounded text-[9px] font-medium border transition ${tbDifficulty === d.v ? "bg-primary text-white border-primary" : "border-gray-200 text-gray-500 hover:border-primary/30"}`} data-testid={`button-tb-diff-${d.v}`}>{d.l}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[9px] font-medium text-gray-500 block mb-0.5">Question Types</label>
                  <div className="flex flex-col gap-1">
                    {[{v:"multiple-choice",l:"Multiple Choice"},{v:"select-all",l:"Select All (SATA)"},{v:"ordered-response",l:"Ordered Response"}].map(qt => (
                      <label key={qt.v} className="flex items-center gap-1.5 text-[9px] text-gray-600 cursor-pointer">
                        <input type="checkbox" checked={tbQuestionTypes.includes(qt.v)} onChange={() => toggleTbQuestionType(qt.v)} className="rounded border-gray-300 w-3 h-3 accent-primary" />
                        {qt.l}
                      </label>
                    ))}
                  </div>
                </div>
                <Button size="sm" onClick={generateTestBank} disabled={tbLoading || !aiTopic.trim() || tbQuestionTypes.length === 0} className="w-full h-8 text-[11px] gap-1.5" data-testid="button-generate-test-bank">
                  {tbLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ClipboardCheck className="w-3.5 h-3.5" />}
                  {tbLoading ? "Generating..." : "Generate Test Bank"}
                </Button>
              </div>

              {tbResult && (
                <div className="mt-3 space-y-2">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-2.5">
                    <p className="text-[11px] font-semibold text-green-800 mb-0.5">{tbResult.title || "Test Bank"}</p>
                    <p className="text-[9px] text-green-600 mb-1.5">{(tbResult.questions || []).length} questions generated</p>
                    <div className="flex gap-1 flex-wrap text-[8px] mb-2">
                      {(() => {
                        const qs = tbResult.questions || [];
                        const mc = qs.filter((q: any) => q.type === "multiple-choice").length;
                        const sa = qs.filter((q: any) => q.type === "select-all").length;
                        const or = qs.filter((q: any) => q.type === "ordered-response").length;
                        const easy = qs.filter((q: any) => q.difficulty === "easy").length;
                        const mod = qs.filter((q: any) => q.difficulty === "moderate").length;
                        const hard = qs.filter((q: any) => q.difficulty === "hard").length;
                        return (
                          <>
                            {mc > 0 && <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">{mc} MC</span>}
                            {sa > 0 && <span className="bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full">{sa} SATA</span>}
                            {or > 0 && <span className="bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">{or} Ordered</span>}
                            {easy > 0 && <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">{easy} Easy</span>}
                            {mod > 0 && <span className="bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full">{mod} Med</span>}
                            {hard > 0 && <span className="bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full">{hard} Hard</span>}
                          </>
                        );
                      })()}
                    </div>

                    <button onClick={() => setTbPreviewOpen(!tbPreviewOpen)} className="text-[9px] text-green-700 hover:text-green-900 underline mb-1.5 block" data-testid="button-tb-preview-toggle">
                      {tbPreviewOpen ? "Hide Preview" : "Preview Questions"}
                    </button>
                    {tbPreviewOpen && (
                      <div className="max-h-48 overflow-y-auto space-y-2 mb-2">
                        {(tbResult.questions || []).slice(0, 10).map((q: any, i: number) => (
                          <div key={i} className="bg-white rounded-lg p-2 border border-green-100 text-[9px]">
                            <div className="flex items-center gap-1 mb-1">
                              <span className="bg-gray-100 text-gray-600 px-1 rounded text-[8px] font-mono">Q{q.id || i + 1}</span>
                              <span className={`px-1 rounded text-[8px] ${q.difficulty === "easy" ? "bg-green-50 text-green-600" : q.difficulty === "hard" ? "bg-red-50 text-red-600" : "bg-yellow-50 text-yellow-600"}`}>{q.difficulty}</span>
                              <span className="bg-blue-50 text-blue-600 px-1 rounded text-[8px]">{q.type}</span>
                            </div>
                            <p className="text-gray-800 font-medium mb-1">{q.stem}</p>
                            <div className="space-y-0.5 text-gray-600">
                              {(q.options || []).map((opt: string, oi: number) => {
                                const letter = opt.charAt(0);
                                const isCorrect = (q.correctAnswer || "").includes(letter);
                                return (
                                  <p key={oi} className={isCorrect ? "text-green-700 font-medium" : ""}>{isCorrect ? "✓ " : "  "}{opt}</p>
                                );
                              })}
                            </div>
                            <p className="text-gray-400 mt-1 italic">{(q.rationale || "").slice(0, 100)}...</p>
                          </div>
                        ))}
                        {(tbResult.questions || []).length > 10 && <p className="text-[8px] text-gray-400 text-center">+{(tbResult.questions || []).length - 10} more questions</p>}
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-1.5">
                      <Button size="sm" variant="outline" onClick={exportTestBankJSON} className="h-7 text-[10px] gap-1" data-testid="button-tb-export-json">
                        <Download className="w-3 h-3" /> JSON
                      </Button>
                      <Button size="sm" variant="outline" onClick={exportTestBankCSV} className="h-7 text-[10px] gap-1" data-testid="button-tb-export-csv">
                        <Download className="w-3 h-3" /> CSV
                      </Button>
                    </div>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-2.5">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <ShoppingCart className="w-3.5 h-3.5 text-primary" />
                      <span className="text-[11px] font-semibold text-gray-700">Sell This Test Bank</span>
                    </div>
                    <p className="text-[9px] text-gray-500 mb-2">Publish directly to your marketplace as a digital product.</p>
                    <div className="space-y-1.5">
                      <div>
                        <label className="text-[9px] font-medium text-gray-500 block mb-0.5">Price (CAD)</label>
                        <Input type="number" step="0.01" min="0" value={tbPrice} onChange={e => setTbPrice(e.target.value)} className="text-xs h-7" placeholder="14.99" data-testid="input-tb-price" />
                      </div>
                      <Button size="sm" onClick={publishTestBankToMarketplace} disabled={tbPublishing || !tbPrice} className="w-full h-8 text-[11px] gap-1.5" data-testid="button-tb-publish">
                        {tbPublishing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ShoppingCart className="w-3.5 h-3.5" />}
                        {tbPublishing ? "Publishing..." : "Publish to Marketplace"}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (leftPanel === "imagelab") {
      const generateImages = async () => {
        if (!imgPrompt.trim()) {
          toast({ title: "Enter a prompt", variant: "destructive" });
          return;
        }
        setImgLoading(true);
        setImgResults([]);
        try {
          const res = await adminFetch("/api/admin/images/generate", {
            method: "POST",
            body: {
              prompt: imgPrompt,
              negativePrompt: imgNegative,
              size: imgSize,
              n: imgCount,
              textFree: imgTextFree,
            },
          });
          if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.error || "Generation failed");
          }
          const data = await res.json();
          setImgResults(data.assets || []);
          toast({ title: "Images generated", description: `${(data.assets || []).length} image(s) ready` });
        } catch (e: any) {
          toast({ title: "Image Error", description: e.message, variant: "destructive" });
        } finally {
          setImgLoading(false);
        }
      };

      const insertImageToCanvas = (url: string) => {
        pushUndo();
        const newObj: CanvasObject = {
          id: uid(),
          type: "image" as const,
          x: MARGIN,
          y: MARGIN,
          width: CANVAS_WIDTH - MARGIN * 2,
          height: 300,
          src: url,
          rotation: 0,
          opacity: 1,
          zIndex: objects.length,
        };
        setObjects(prev => [...prev, newObj]);
        setSelectedId(newObj.id);
        toast({ title: "Image inserted into canvas" });
      };

      return (
        <div className="w-64 bg-white border-r overflow-y-auto shrink-0">
          <div className="p-3 border-b">
            <span className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
              <ImagePlus className="w-3.5 h-3.5 text-primary" /> Image Lab
            </span>
          </div>
          <div className="p-3 space-y-3">
            <div>
              <label className="text-[10px] font-medium text-gray-500 block mb-1">Prompt</label>
              <textarea
                value={imgPrompt}
                onChange={e => setImgPrompt(e.target.value)}
                placeholder="A warm, pastel illustration of a nurse checking vital signs on a patient in a modern hospital room, soft lighting, educational style..."
                className="w-full text-xs border rounded-md px-2 py-1.5 h-24 resize-none"
                data-testid="textarea-img-prompt"
              />
            </div>
            <div>
              <label className="text-[10px] font-medium text-gray-500 block mb-1">Negative Prompt</label>
              <textarea
                value={imgNegative}
                onChange={e => setImgNegative(e.target.value)}
                placeholder="blurry, low quality, distorted..."
                className="w-full text-xs border rounded-md px-2 py-1.5 h-12 resize-none"
                data-testid="textarea-img-negative"
              />
            </div>
            <label className="flex items-center gap-2 text-[10px] font-medium text-gray-600 cursor-pointer">
              <input type="checkbox" checked={imgTextFree} onChange={e => setImgTextFree(e.target.checked)} className="rounded" data-testid="checkbox-img-textfree" />
              Text-Free Mode
              <span className="text-gray-400">(no words/labels)</span>
            </label>
            {imgTextFree && (
              <span className="text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded-full" data-testid="badge-text-free">
                Text-Free Mode Active
              </span>
            )}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-medium text-gray-500 block mb-1">Size</label>
                <select value={imgSize} onChange={e => setImgSize(e.target.value)} className="w-full text-[10px] border rounded-md px-2 py-1" data-testid="select-img-size">
                  <option value="1024x1024">Square 1024x1024</option>
                  <option value="1024x1792">Portrait 1024x1792</option>
                  <option value="1792x1024">Landscape 1792x1024</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-medium text-gray-500 block mb-1">Count</label>
                <select value={imgCount} onChange={e => setImgCount(Number(e.target.value))} className="w-full text-[10px] border rounded-md px-2 py-1" data-testid="select-img-count">
                  <option value={1}>1 image</option>
                  <option value={2}>2 images</option>
                  <option value={3}>3 images</option>
                  <option value={4}>4 images</option>
                </select>
              </div>
            </div>
            <Button
              size="sm"
              onClick={generateImages}
              disabled={imgLoading || !imgPrompt.trim()}
              className="w-full h-8 text-[11px] gap-1"
              data-testid="button-generate-images"
            >
              {imgLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <ImagePlus className="w-3 h-3" />}
              {imgLoading ? "Generating..." : "Generate Images"}
            </Button>
            {imgResults.length > 0 && (
              <div className="border-t pt-3 space-y-2">
                <p className="text-[10px] font-semibold text-gray-600">{imgResults.length} image(s) ready</p>
                <div className="grid grid-cols-2 gap-2">
                  {imgResults.map((img) => (
                    <div key={img.id} className="relative group">
                      <img src={img.url} alt="Generated" className="w-full aspect-square object-cover rounded-lg border" />
                      <button
                        onClick={() => insertImageToCanvas(img.url)}
                        className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        data-testid={`button-insert-img-${img.id}`}
                      >
                        <span className="text-white text-[10px] font-medium bg-primary px-2 py-1 rounded">Insert</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (leftPanel === "blocks") {
      const categories = [...new Set(CONTENT_BLOCK_LIBRARY.map(b => b.category))];
      return (
        <div className="w-72 bg-white border-r overflow-y-auto shrink-0" data-testid="panel-blocks">
          <div className="p-4 border-b">
            <div className="flex items-center gap-2">
              <Grid3X3 className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-gray-800">Content Blocks</span>
            </div>
            <p className="text-[11px] text-gray-500 mt-1">Click blocks to add structured sections to your page.</p>
          </div>
          <div className="p-4 space-y-4">
            <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-white to-primary/5 p-4 shadow-sm">
              <span className="text-xs font-semibold text-gray-700 block mb-2">Product Presets</span>
              <div className="grid grid-cols-2 gap-2">
                {PRODUCT_PRESETS.map(p => (
                  <button
                    key={p.id}
                    onClick={() => loadProductPreset(p.id)}
                    className="h-12 rounded-xl border hover:bg-primary/5 hover:border-primary/20 text-[10px] font-medium text-gray-600 transition flex flex-col items-center justify-center"
                    data-testid={`button-preset-panel-${p.id}`}
                  >
                    <span className="font-semibold">{p.label}</span>
                    <span className="text-[9px] text-gray-400">{p.blocks.length} blocks</span>
                  </button>
                ))}
              </div>
            </div>
            {categories.map(cat => (
              <div key={cat} className="rounded-2xl border border-primary/10 bg-gradient-to-br from-white to-primary/5 p-4 shadow-sm">
                <span className="text-xs font-semibold text-gray-700 block mb-2 capitalize">{cat}</span>
                <div className="space-y-1">
                  {CONTENT_BLOCK_LIBRARY.filter(b => b.category === cat).map(block => (
                    <button
                      key={block.id}
                      onClick={() => insertBlockToCanvas(block.id)}
                      className="w-full text-left px-3 py-2.5 rounded-xl border hover:bg-primary/5 hover:border-primary/20 text-[11px] font-medium text-gray-600 transition flex items-center gap-2.5"
                      data-testid={`button-block-panel-${block.id}`}
                    >
                      <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-[9px] text-primary font-bold">{block.label.charAt(0)}</span>
                      </div>
                      {block.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (leftPanel === "brand") {
      const paletteSwatches: { color: string; label: string }[] = [
        { color: theme.primaryColor, label: "Primary" },
        { color: theme.secondaryColor, label: "Secondary" },
        { color: theme.accentColor, label: "Accent" },
        { color: theme.headingColor, label: "Heading" },
        { color: theme.bodyColor, label: "Body" },
        { color: theme.dangerColor, label: "Danger" },
        { color: theme.successColor, label: "Success" },
        { color: theme.warningColor, label: "Warning" },
        { color: theme.backgroundColor, label: "Page BG" },
        { color: theme.sectionBg, label: "Section" },
      ];

      const textPresets: { label: string; preview: string; fontSize: number; fontWeight: string; fontFamily: string; testId: string }[] = [
        { label: "H1 Heading", preview: "Aa", fontSize: 24, fontWeight: "bold", fontFamily: theme.headingFont, testId: "button-style-heading" },
        { label: "H2 Subhead", preview: "Aa", fontSize: 16, fontWeight: "bold", fontFamily: theme.headingFont, testId: "button-style-h2" },
        { label: "H3 Section", preview: "Aa", fontSize: 14, fontWeight: "600", fontFamily: theme.headingFont, testId: "button-style-subheading" },
        { label: "Body", preview: "Aa", fontSize: 11, fontWeight: "normal", fontFamily: theme.bodyFont, testId: "button-style-body" },
        { label: "Caption", preview: "Aa", fontSize: 9, fontWeight: "600", fontFamily: theme.bodyFont, testId: "button-style-caption" },
        { label: "Footnote", preview: "Aa", fontSize: 8, fontWeight: "normal", fontFamily: theme.bodyFont, testId: "button-style-footnote" },
      ];

      return (
        <div className="w-72 bg-white border-r overflow-y-auto shrink-0" data-testid="panel-brand">
          <div className="p-4 border-b">
            <div className="flex items-center gap-2">
              <SwatchBook className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-gray-800">Brand Kit</span>
            </div>
            <p className="text-[11px] text-gray-500 mt-1">Keep every page on-brand and store-ready.</p>
          </div>
          <div className="p-4 space-y-4">
            <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-white to-primary/5 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-700">Theme</span>
                <span className="text-[10px] text-gray-400">{theme.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5" data-testid="select-brand-theme">
                {THEMES.map(t => (
                  <button
                    key={t.id}
                    onClick={() => switchTheme(t.id)}
                    className={`p-2 rounded-xl border-2 flex items-center gap-2 transition text-left ${activeThemeId === t.id ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-gray-200 hover:border-gray-300"}`}
                    data-testid={`button-canvas-theme-${t.id}`}
                  >
                    <div className="flex gap-0.5 shrink-0">
                      <div className="w-4 h-4 rounded-full border border-white/50" style={{ backgroundColor: t.primaryColor }} />
                      <div className="w-4 h-4 rounded-full border border-white/50" style={{ backgroundColor: t.accentColor }} />
                    </div>
                    <span className="text-[9px] font-medium text-gray-600 truncate">{t.name}</span>
                  </button>
                ))}
              </div>
              <div className="mt-3">
                <span className="text-[10px] text-gray-400 block mb-1.5">Palette</span>
                <div className="grid grid-cols-5 gap-1.5">
                  {paletteSwatches.map((s, i) => (
                    <div key={i} className="flex flex-col items-center gap-0.5 group" title={`${s.label}: ${s.color}`}>
                      <button
                        className="w-8 h-8 rounded-lg border border-gray-200 hover:ring-2 hover:ring-primary/30 transition cursor-pointer"
                        style={{ backgroundColor: s.color }}
                        onClick={() => {
                          if (selectedId) { pushUndo(); updateObject(selectedId, { fill: s.color }); }
                        }}
                        data-testid={`swatch-${s.label.toLowerCase().replace(/\s/g, "-")}`}
                      />
                      <span className="text-[7px] text-gray-400 leading-none">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-white to-primary/5 p-4 shadow-sm">
              <span className="text-xs font-semibold text-gray-700 block mb-2">Cover Preset</span>
              <div className="grid grid-cols-2 gap-2">
                {COVER_PRESETS.map(p => (
                  <button
                    key={p.id}
                    onClick={() => { setCoverPresetId(p.id); generateCoverForCurrentProject(p.id); }}
                    className={`h-14 rounded-xl border text-[10px] font-medium transition flex flex-col items-center justify-center gap-1 ${coverPresetId === p.id ? "bg-primary/10 border-primary text-primary ring-1 ring-primary/20" : "hover:bg-gray-50 text-gray-600"}`}
                    data-testid={`button-cover-preset-${p.id}`}
                  >
                    <div className="w-6 h-3 rounded-sm" style={{ background: p.bgStyle === "gradient" ? `linear-gradient(135deg, ${theme.coverBg}, ${theme.primaryColor})` : p.bgStyle === "split" ? `linear-gradient(180deg, ${theme.coverBg} 50%, ${theme.accentColor} 50%)` : theme.coverBg }} />
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-white to-primary/5 p-4 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-700">Brand Lock</span>
                <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                  <input type="checkbox" checked={brandLock} onChange={e => setBrandLock(e.target.checked)} className="rounded" data-testid="checkbox-brand-lock-panel" />
                  {brandLock ? "Active" : "Off"}
                </label>
              </div>
              <p className="text-[10px] text-gray-500 leading-relaxed">When active, prevents off-palette colors, protects the logo footer, and enforces theme fonts on all text elements. Turn off to freely customize individual elements.</p>
            </div>

            <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-white to-primary/5 p-4 shadow-sm">
              <span className="text-xs font-semibold text-gray-700 block mb-2">Text Styles</span>
              <div className="space-y-1.5">
                {textPresets.map(tp => (
                  <div key={tp.testId} className="flex items-center gap-2">
                    <div className="flex-1 flex items-baseline gap-2 min-w-0">
                      <span style={{ fontSize: Math.min(tp.fontSize, 16), fontWeight: tp.fontWeight as any, fontFamily: tp.fontFamily, color: theme.headingColor }} className="shrink-0">{tp.preview}</span>
                      <span className="text-[10px] text-gray-500 truncate">{tp.label} ({tp.fontSize}px)</span>
                    </div>
                    <button
                      className="h-6 px-2.5 rounded-lg bg-primary/10 text-primary text-[9px] font-medium hover:bg-primary/20 transition disabled:opacity-30"
                      onClick={() => selectedId && (pushUndo(), updateObject(selectedId, { fontSize: tp.fontSize, fontWeight: tp.fontWeight, fontFamily: tp.fontFamily }))}
                      disabled={!selectedId}
                      data-testid={tp.testId}
                    >Apply</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-white to-primary/5 p-4 shadow-sm">
              <span className="text-xs font-semibold text-gray-700 block mb-2">Quick Actions</span>
              <div className="space-y-2">
                <button className="w-full h-10 rounded-xl bg-primary text-white hover:bg-primary/90 text-xs font-semibold" onClick={makeStoreReady} data-testid="button-store-ready">Make Store-Ready</button>
                <button className="w-full h-10 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 text-xs font-medium text-primary" onClick={() => generateCoverForCurrentProject()} data-testid="button-generate-cover">Generate Cover Page</button>
                <button className="w-full h-10 rounded-xl border hover:bg-gray-50 text-xs" onClick={beautifyPage} data-testid="button-brand-beautify">Beautify Layout</button>
                <button className="w-full h-10 rounded-xl border hover:bg-gray-50 text-xs" onClick={runDesignAudit} data-testid="button-brand-audit">{brandVerified ? "Re-Audit (Verified)" : "Run Design Audit"}</button>
                <button className="w-full h-10 rounded-xl border hover:bg-gray-50 text-xs" onClick={applyBrandTypography} data-testid="button-brand-fonts">Apply Theme Fonts</button>
                <button className="w-full h-10 rounded-xl border hover:bg-gray-50 text-xs" onClick={applyThemeToAllPages} data-testid="button-brand-apply-all">Apply to All Pages</button>
              </div>
            </div>

            <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-white to-primary/5 p-4 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-700">Auto Store-Ready</span>
                <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                  <input type="checkbox" checked={autoStoreReady} onChange={e => setAutoStoreReady(e.target.checked)} className="rounded" data-testid="checkbox-auto-store-ready" />
                  {autoStoreReady ? "On" : "Off"}
                </label>
              </div>
              <p className="text-[11px] text-gray-500">Auto-run Store-Ready after AI generation completes.</p>
            </div>

            <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-white to-primary/5 p-4 shadow-sm">
              <span className="text-xs font-semibold text-gray-700 block mb-2">Block Library</span>
              <p className="text-[10px] text-gray-400 mb-2">Click to add content blocks to your page.</p>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {CONTENT_BLOCK_LIBRARY.map(block => (
                  <button
                    key={block.id}
                    onClick={() => insertBlockToCanvas(block.id)}
                    className="w-full text-left px-3 py-2 rounded-xl border hover:bg-primary/5 hover:border-primary/20 text-[10px] font-medium text-gray-600 transition flex items-center gap-2"
                    data-testid={`button-block-${block.id}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                    {block.label}
                    <span className="ml-auto text-[9px] text-gray-300">{block.category}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-white to-primary/5 p-4 shadow-sm">
              <span className="text-xs font-semibold text-gray-700 block mb-2">Product Presets</span>
              <p className="text-[10px] text-gray-400 mb-2">One-click preset loads all blocks for a product type.</p>
              <div className="space-y-1.5">
                {PRODUCT_PRESETS.map(p => (
                  <button
                    key={p.id}
                    onClick={() => loadProductPreset(p.id)}
                    className="w-full h-9 rounded-xl border hover:bg-gray-50 text-[10px] font-medium text-gray-600 flex items-center justify-between px-3"
                    data-testid={`button-preset-${p.id}`}
                  >
                    {p.label}
                    <span className="text-[9px] text-gray-300">{p.blocks.length} blocks</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-white to-primary/5 p-4 shadow-sm">
              <span className="text-xs font-semibold text-gray-700 block mb-2">Layout Presets</span>
              <div className="space-y-2">
                <button className="w-full h-10 rounded-xl border hover:bg-gray-50 text-xs" onClick={() => applyLayoutPreset("stack")} data-testid="button-layout-stack">Stack Layout</button>
                <button className="w-full h-10 rounded-xl border hover:bg-gray-50 text-xs" onClick={() => applyLayoutPreset("two-col")} data-testid="button-layout-two-col">Two Column Layout</button>
                <button className="w-full h-10 rounded-xl border hover:bg-gray-50 text-xs" onClick={() => applyLayoutPreset("hero-cards")} data-testid="button-layout-hero">Hero + Cards Layout</button>
              </div>
            </div>

            <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-white to-primary/5 p-4 shadow-sm">
              <span className="text-xs font-semibold text-gray-700 block mb-2">Text Autofit</span>
              <div className="space-y-2">
                <button className="w-full h-10 rounded-xl border hover:bg-gray-50 text-xs" onClick={() => autofitText("expand")} data-testid="button-autofit-expand">Expand Boxes to Fit</button>
                <button className="w-full h-10 rounded-xl border hover:bg-gray-50 text-xs" onClick={() => autofitText("shrink")} data-testid="button-autofit-shrink">Shrink Font to Fit</button>
                <button className="w-full h-10 rounded-xl border hover:bg-gray-50 text-xs" onClick={highlightOverflows} data-testid="button-find-overflows">Find Overflows</button>
              </div>
            </div>

            <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-white to-primary/5 p-4 shadow-sm space-y-2">
              <span className="text-xs font-semibold text-gray-700 block">Display</span>
              <label className="flex items-center gap-2 text-[11px] text-gray-600 cursor-pointer">
                <input type="checkbox" checked={showLogo} onChange={e => { setShowLogo(e.target.checked); if (e.target.checked) insertLogoFooter(); }} className="rounded" />
                Include logo on pages
              </label>
              <label className="flex items-center gap-2 text-[11px] text-gray-600 cursor-pointer">
                <input type="checkbox" checked={showMargins} onChange={e => setShowMargins(e.target.checked)} className="rounded" />
                Margin guides
              </label>
              <label className="flex items-center gap-2 text-[11px] text-gray-600 cursor-pointer">
                <input type="checkbox" checked={showGrid} onChange={e => setShowGrid(e.target.checked)} className="rounded" />
                Grid overlay
              </label>
            </div>

            <div className="rounded-2xl border border-green-200 bg-gradient-to-br from-white to-green-50 p-4 shadow-sm space-y-1.5">
              <span className="text-xs font-semibold text-gray-700 block">AI Status</span>
              {aiStatus ? (
                <>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${aiStatus.enabled ? "bg-green-500" : "bg-red-500"}`} />
                    <span className="text-[10px] text-gray-600">{aiStatus.enabled ? "AI Enabled" : "AI Disabled"}</span>
                  </div>
                  <p className="text-[10px] text-gray-400">Model: {aiStatus.model}</p>
                  <p className="text-[10px] text-gray-400">Today: {aiStatus.usage.itemsGenerated} items, {aiStatus.usage.tokensUsed.toLocaleString()} tokens</p>
                </>
              ) : (
                <button onClick={async () => {
                  try {
                    const r = await adminFetch("/api/admin/ai-config");
                    if (r.ok) setAiStatus(await r.json());
                  } catch {}
                }} className="text-[10px] text-primary hover:underline" data-testid="button-load-ai-status">Load AI status</button>
              )}
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: "#f6f7fb" }}>
      <div className="h-12 bg-white border-b flex items-center justify-between px-4 shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => { saveCanvas(); onBack(); }} className="p-1.5 hover:bg-gray-100 rounded-lg transition" data-testid="button-back-to-projects">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1.5 text-sm">
            <button onClick={() => { saveCanvas(); onBack(); }} className="text-gray-400 hover:text-primary transition text-xs font-medium" data-testid="link-drafts">Drafts</button>
            <span className="text-gray-300">/</span>
            <span className="font-semibold text-gray-800">{project?.title || "Loading..."}</span>
          </div>
          <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{project?.type}</span>
          <span className="text-[10px] text-gray-400">{pages.length} page(s)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1.5 mr-1">
            {saving ? (
              <span className="flex items-center gap-1 text-[10px] text-gray-400"><Loader2 className="w-3 h-3 animate-spin" />Saving...</span>
            ) : lastSavedAt ? (
              <span className="flex items-center gap-1 text-[10px] text-green-500" title={`Last saved at ${lastSavedAt.toLocaleTimeString()}`}>
                <CheckCircle className="w-3 h-3" />
                Saved {lastSavedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            ) : (
              <span className="text-[10px] text-gray-400">Auto-save on</span>
            )}
          </div>
          <Button size="sm" variant="outline" onClick={saveCanvas} className="h-7 text-xs gap-1" data-testid="button-save-canvas"><Save className="w-3 h-3" /> Save</Button>
          <Button size="sm" variant="outline" onClick={exportAsPDF} disabled={exporting} className="h-7 text-xs gap-1" data-testid="button-export-pdf">
            {exporting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Download className="w-3 h-3" />} PDF
          </Button>
          <Button size="sm" variant="outline" onClick={exportAsImages} disabled={exporting} className="h-7 text-xs gap-1" data-testid="button-export-png">
            <Image className="w-3 h-3" /> PNG
          </Button>
          <Button size="sm" variant="outline" onClick={exportInstagramCarousel} disabled={exporting} className="h-7 text-xs gap-1" data-testid="button-export-ig">
            <ImagePlus className="w-3 h-3" /> IG
          </Button>
          <Button size="sm" variant="outline" onClick={exportEtsyStorePack} disabled={exporting} className="h-7 text-xs gap-1" data-testid="button-export-etsy">
            <ShoppingCart className="w-3 h-3" /> Etsy Pack
          </Button>
          <Button size="sm" onClick={() => { setPublishForm(f => ({ ...f, title: project?.title || "" })); setShowPublishDialog(true); }} className="h-7 text-xs gap-1" data-testid="button-publish-marketplace">
            <ShoppingCart className="w-3 h-3" /> Publish
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-[72px] bg-white border-r flex flex-col items-center py-2 gap-0.5 shrink-0">
          <button onClick={() => setLeftPanel(leftPanel === "templates" ? null : "templates" as any)} className={`w-[62px] rounded-xl px-1 py-2 flex flex-col items-center gap-0.5 transition ${leftPanel === "templates" ? "bg-primary/10 text-primary" : "text-gray-500 hover:bg-gray-50"}`} data-testid="button-panel-templates">
            <LayoutTemplate className="w-4.5 h-4.5" />
            <span className="text-[9px] font-medium leading-tight">Templates</span>
          </button>
          <button onClick={() => setLeftPanel(leftPanel === "components" ? null : "components" as any)} className={`w-[62px] rounded-xl px-1 py-2 flex flex-col items-center gap-0.5 transition ${leftPanel === "components" ? "bg-primary/10 text-primary" : "text-gray-500 hover:bg-gray-50"}`} data-testid="button-panel-components">
            <Sparkles className="w-4.5 h-4.5" />
            <span className="text-[9px] font-medium leading-tight">Elements</span>
          </button>
          <button onClick={() => addObject("text")} className="w-[62px] rounded-xl px-1 py-2 flex flex-col items-center gap-0.5 text-gray-500 hover:bg-primary/5 hover:text-primary transition" data-testid="button-add-text">
            <Type className="w-4.5 h-4.5" />
            <span className="text-[9px] font-medium leading-tight">Text</span>
          </button>
          <button onClick={() => setLeftPanel(leftPanel === "imagelab" ? null : "imagelab" as any)} className={`w-[62px] rounded-xl px-1 py-2 flex flex-col items-center gap-0.5 transition ${leftPanel === "imagelab" ? "bg-primary/10 text-primary" : "text-gray-500 hover:bg-gray-50"}`} data-testid="button-panel-imagelab">
            <ImagePlus className="w-4.5 h-4.5" />
            <span className="text-[9px] font-medium leading-tight">Images</span>
          </button>
          <button onClick={() => setLeftPanel(leftPanel === "brand" ? null : "brand" as any)} className={`w-[62px] rounded-xl px-1 py-2 flex flex-col items-center gap-0.5 transition ${leftPanel === "brand" ? "bg-primary/10 text-primary" : "text-gray-500 hover:bg-gray-50"}`} data-testid="button-panel-brand">
            <SwatchBook className="w-4.5 h-4.5" />
            <span className="text-[9px] font-medium leading-tight">Brand</span>
          </button>
          <button onClick={() => setLeftPanel(leftPanel === "ai" ? null : "ai" as any)} className={`w-[62px] rounded-xl px-1 py-2 flex flex-col items-center gap-0.5 transition ${leftPanel === "ai" ? "bg-primary/10 text-primary" : "text-gray-500 hover:bg-gray-50"}`} data-testid="button-panel-ai">
            <Brain className="w-4.5 h-4.5" />
            <span className="text-[9px] font-medium leading-tight">AI</span>
          </button>
          <button onClick={() => setLeftPanel(leftPanel === "blocks" ? null : "blocks" as any)} className={`w-[62px] rounded-xl px-1 py-2 flex flex-col items-center gap-0.5 transition ${leftPanel === "blocks" ? "bg-primary/10 text-primary" : "text-gray-500 hover:bg-gray-50"}`} data-testid="button-panel-blocks">
            <Grid3X3 className="w-4.5 h-4.5" />
            <span className="text-[9px] font-medium leading-tight">Blocks</span>
          </button>
          <div className="mt-auto pt-2 w-full flex flex-col items-center gap-1">
            <button onClick={undo} className="w-[56px] h-7 rounded-lg border text-[9px] hover:bg-gray-50 text-gray-500" title="Undo (Ctrl+Z)" data-testid="button-undo">Undo</button>
            <button onClick={redo} className="w-[56px] h-7 rounded-lg border text-[9px] hover:bg-gray-50 text-gray-500" title="Redo (Ctrl+Y)" data-testid="button-redo">Redo</button>
          </div>
        </div>

        {renderLeftPanel()}

        <div className="flex-1 overflow-auto relative" style={{ backgroundColor: "#f6f7fb" }}>
          <div className="min-h-full w-full flex items-center justify-center px-10 py-10">
            <div className="relative">
              <div className="relative rounded-lg bg-white transition-all duration-200" style={{ boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)" }}>
                <div
                  ref={canvasRef}
                  className="bg-white relative select-none rounded-lg"
                  style={{ width: CANVAS_WIDTH * SCALE, height: CANVAS_HEIGHT * SCALE }}
                  onMouseDown={(e) => handleCanvasMouseDown(e)}
                  onMouseMove={handleCanvasMouseMove}
                  onMouseUp={handleCanvasMouseUp}
                  data-testid="canvas-area"
                >
                  {showGrid && (
                    <svg className="absolute inset-0 pointer-events-none" width={CANVAS_WIDTH * SCALE} height={CANVAS_HEIGHT * SCALE} style={{ opacity: 0.08 }}>
                      {Array.from({ length: Math.floor(CANVAS_WIDTH / GRID_SIZE) + 1 }).map((_, i) => (
                        <line key={`v${i}`} x1={i * GRID_SIZE * SCALE} y1={0} x2={i * GRID_SIZE * SCALE} y2={CANVAS_HEIGHT * SCALE} stroke="#000" strokeWidth={0.5} />
                      ))}
                      {Array.from({ length: Math.floor(CANVAS_HEIGHT / GRID_SIZE) + 1 }).map((_, i) => (
                        <line key={`h${i}`} x1={0} y1={i * GRID_SIZE * SCALE} x2={CANVAS_WIDTH * SCALE} y2={i * GRID_SIZE * SCALE} stroke="#000" strokeWidth={0.5} />
                      ))}
                    </svg>
                  )}
                  {showMargins && (
                    <div className="absolute pointer-events-none" style={{ left: MARGIN * SCALE, top: MARGIN * SCALE, right: MARGIN * SCALE, bottom: MARGIN * SCALE, border: "1px dashed rgba(124,58,237,0.15)" }} />
                  )}

                  {[...objects].sort((a, b) => a.zIndex - b.zIndex).map(obj => {
                    const isSelected = selectedIds.includes(obj.id);
                    return (
                      <div
                        key={obj.id}
                        style={{
                          position: "absolute",
                          left: obj.x * SCALE,
                          top: obj.y * SCALE,
                          width: obj.width * SCALE,
                          height: obj.height * SCALE,
                          transform: `rotate(${obj.rotation || 0}deg)`,
                          opacity: obj.opacity ?? 1,
                          cursor: obj.locked ? "default" : (isDragging && isSelected ? "grabbing" : "grab"),
                          outline: isSelected ? (selectedId === obj.id ? `2px solid ${theme.primaryColor}` : `2px solid ${theme.primaryColor}59`) : "none",
                          outlineOffset: "2px",
                          zIndex: obj.zIndex,
                          transition: "box-shadow 0.15s ease",
                          boxShadow: isSelected ? `0 0 0 2px ${theme.primaryColor}33` : "none",
                        }}
                        onMouseDown={(e) => handleCanvasMouseDown(e, obj.id)}
                        data-testid={`canvas-object-${obj.id}`}
                      >
                        {obj.type === "text" && (
                          <div style={{ width: "100%", height: "100%", fontSize: (obj.fontSize || 16) * SCALE, fontFamily: obj.fontFamily || "Inter", fontWeight: obj.fontWeight || "normal", color: obj.fill || "#333", textAlign: (obj.textAlign as any) || "left", display: "flex", alignItems: "flex-start", padding: "2px", overflow: "hidden", userSelect: "none", lineHeight: 1.3, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                            {obj.content}
                          </div>
                        )}
                        {obj.type === "rect" && (
                          <div style={{ width: "100%", height: "100%", backgroundColor: obj.fill || "#e2e8f0", border: obj.stroke ? `${(obj.strokeWidth || 1) * SCALE}px solid ${obj.stroke}` : "none", borderRadius: (obj.borderRadius || 0) * SCALE }} />
                        )}
                        {obj.type === "circle" && (
                          <div style={{ width: "100%", height: "100%", backgroundColor: obj.fill || "#e2e8f0", border: obj.stroke ? `${(obj.strokeWidth || 1) * SCALE}px solid ${obj.stroke}` : "none", borderRadius: "50%" }} />
                        )}
                        {obj.type === "image" && (
                          <div style={{ width: "100%", height: "100%", backgroundColor: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {obj.src ? <img src={obj.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <Image className="w-8 h-8 text-gray-300" />}
                          </div>
                        )}
                        {isSelected && !obj.locked && selectedIds.length === 1 && (
                          <div className="absolute -right-1.5 -bottom-1.5 w-3 h-3 bg-primary rounded-full cursor-se-resize border-2 border-white shadow" onMouseDown={handleResizeStart} data-testid="resize-handle" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between rounded-xl bg-white border border-gray-200 px-3 py-2 shadow-sm" style={{ minWidth: CANVAS_WIDTH * SCALE }}>
                <div className="flex items-center gap-2">
                  <button onClick={zoomOut} className="w-7 h-7 rounded-lg border text-xs hover:bg-gray-50 flex items-center justify-center text-gray-500" data-testid="button-zoom-out"><ZoomOut className="w-3.5 h-3.5" /></button>
                  <input type="range" min={25} max={200} step={5} value={zoom} onChange={e => setZoom(Number(e.target.value))} className="w-28 h-1.5 accent-primary" data-testid="slider-zoom" />
                  <button onClick={zoomIn} className="w-7 h-7 rounded-lg border text-xs hover:bg-gray-50 flex items-center justify-center text-gray-500" data-testid="button-zoom-in"><ZoomIn className="w-3.5 h-3.5" /></button>
                  <span className="text-[11px] font-medium text-gray-600 w-10 text-center tabular-nums" data-testid="text-zoom-level">{zoom}%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button onClick={zoomFit} className="h-7 px-2.5 rounded-lg border text-[10px] hover:bg-gray-50 text-gray-500 font-medium" data-testid="button-zoom-fit">Fit</button>
                  <button onClick={zoomActual} className="h-7 px-2.5 rounded-lg border text-[10px] hover:bg-gray-50 text-gray-500 font-medium" data-testid="button-zoom-100">100%</button>
                  <button onClick={() => setZoom(Math.min(200, Math.round((window.innerHeight - 200) / CANVAS_HEIGHT * 100)))} className="h-7 px-2.5 rounded-lg border text-[10px] hover:bg-gray-50 text-gray-500 font-medium" data-testid="button-zoom-fill">Fill</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-60 bg-white border-l overflow-y-auto shrink-0">
          <div className="p-3 border-b">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs font-semibold text-gray-600">Pages ({pages.length})</span>
              </div>
              <button onClick={addPage} className="text-[10px] px-2 py-1 rounded-lg border hover:bg-gray-50 text-gray-500 hover:text-primary transition" data-testid="button-add-page">+ Add</button>
            </div>
            <div className="space-y-2">
              {pages.map((page, i) => {
                const isActive = i === currentPageIndex;
                const thumbSrc = pageThumbs[page.id] || "";
                return (
                  <div
                    key={page.id}
                    onClick={() => switchPage(i)}
                    className={`group relative rounded-xl border-2 p-1 cursor-pointer transition-all ${isActive ? "border-primary ring-2 ring-primary/20 shadow-sm" : "border-transparent hover:border-gray-200"}`}
                    data-testid={`button-page-${i + 1}`}
                  >
                    <div className="w-full aspect-[612/792] rounded-lg overflow-hidden bg-white border border-gray-100">
                      {thumbSrc ? (
                        <img src={thumbSrc} className="w-full h-full object-cover" alt={`Page ${i + 1}`} />
                      ) : (
                        <div className="w-full h-full bg-gray-50 flex items-center justify-center text-lg text-gray-200 font-bold">{i + 1}</div>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-1 px-0.5">
                      <span className="text-[10px] font-medium text-gray-500">{i + 1}</span>
                      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={(e) => { e.stopPropagation(); duplicatePage(i); }} className="text-gray-400 hover:text-primary p-0.5 rounded" data-testid={`button-dup-page-${i + 1}`}>
                          <Copy className="w-3 h-3" />
                        </button>
                        {pages.length > 1 && (
                          <button onClick={(e) => { e.stopPropagation(); deletePage(page.id, i); }} className="text-gray-400 hover:text-red-500 p-0.5 rounded" data-testid={`button-del-page-${i + 1}`}>
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <button onClick={addPage} className="w-full aspect-[612/792] rounded-xl border-2 border-dashed border-gray-200 hover:border-primary/40 flex items-center justify-center text-gray-300 hover:text-primary transition-colors" data-testid="button-add-page-bottom">
                <Plus className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-3 border-b">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-[10px] text-gray-400">Align:</span>
              <div className="flex gap-1">
                <button onClick={() => alignSelected("left")} className="p-1 rounded hover:bg-gray-100" title="Align left" data-testid="button-align-left"><AlignLeft className="w-3.5 h-3.5 text-gray-500" /></button>
                <button onClick={() => alignSelected("center")} className="p-1 rounded hover:bg-gray-100" title="Align center" data-testid="button-align-center"><AlignCenter className="w-3.5 h-3.5 text-gray-500" /></button>
                <button onClick={() => alignSelected("right")} className="p-1 rounded hover:bg-gray-100" title="Align right" data-testid="button-align-right"><AlignRight className="w-3.5 h-3.5 text-gray-500" /></button>
                <button onClick={() => alignSelected("distribute")} className="p-1 rounded hover:bg-gray-100" title="Distribute" data-testid="button-distribute"><AlignVerticalJustifyCenter className="w-3.5 h-3.5 text-gray-500" /></button>
              </div>
            </div>
            {selectedIds.length > 1 && (
              <div className="space-y-1.5 mt-2">
                <span className="text-[10px] font-semibold text-gray-600">{selectedIds.length} selected</span>
                <div className="flex gap-1 flex-wrap">
                  <button onClick={bringForward} className="h-7 px-2 rounded-lg border text-[10px] hover:bg-gray-50 flex items-center gap-1" data-testid="button-bring-forward"><ArrowUp className="w-3 h-3" />Fwd</button>
                  <button onClick={sendBackward} className="h-7 px-2 rounded-lg border text-[10px] hover:bg-gray-50 flex items-center gap-1" data-testid="button-send-backward"><ArrowDown className="w-3 h-3" />Back</button>
                  <button onClick={toggleLockSelected} className="h-7 px-2 rounded-lg border text-[10px] hover:bg-gray-50 flex items-center gap-1" data-testid="button-lock-toggle"><Lock className="w-3 h-3" />Lock</button>
                  <button onClick={groupSelected} className="h-7 px-2 rounded-lg border text-[10px] hover:bg-gray-50 flex items-center gap-1" data-testid="button-group"><Group className="w-3 h-3" />Group</button>
                  <button onClick={ungroupSelected} className="h-7 px-2 rounded-lg border text-[10px] hover:bg-gray-50 flex items-center gap-1" data-testid="button-ungroup"><Ungroup className="w-3 h-3" />Ungroup</button>
                  <Button size="sm" variant="destructive" onClick={deleteSelected} className="h-7 text-[10px] gap-1" data-testid="button-delete-multi"><Trash2 className="w-3 h-3" />Del</Button>
                </div>
              </div>
            )}
          </div>

          {selectedObj && (
            <div className="p-3 border-b" data-testid="panel-properties">
              <span className="text-xs font-semibold text-gray-600 mb-2 block">Properties</span>
              <div className="space-y-2">
                {selectedObj.type === "text" && (
                  <>
                    <Textarea value={selectedObj.content || ""} onChange={(e) => { pushUndo(); updateObject(selectedObj.id, { content: e.target.value }); }} className="text-xs" rows={2} data-testid="input-text-content" />
                    <div className="flex gap-1.5">
                      <Input type="number" value={selectedObj.fontSize || 16} onChange={(e) => { pushUndo(); updateObject(selectedObj.id, { fontSize: Number(e.target.value) }); }} className="text-xs w-16" data-testid="input-font-size" />
                      <select value={selectedObj.fontWeight || "normal"} onChange={(e) => { pushUndo(); updateObject(selectedObj.id, { fontWeight: e.target.value }); }} className="text-xs border rounded px-2 flex-1" data-testid="select-font-weight">
                        <option value="normal">Regular</option>
                        <option value="600">Semi-Bold</option>
                        <option value="bold">Bold</option>
                      </select>
                    </div>
                    <div className="flex gap-1">
                      {(["left", "center", "right"] as const).map(align => (
                        <button key={align} onClick={() => { pushUndo(); updateObject(selectedObj.id, { textAlign: align }); }} className={`flex-1 h-7 text-[10px] rounded border ${selectedObj.textAlign === align ? "bg-primary/10 border-primary text-primary" : "border-gray-200 text-gray-500"}`} data-testid={`button-text-${align}`}>
                          {align}
                        </button>
                      ))}
                    </div>
                  </>
                )}
                {selectedObj.type === "image" && (
                  <Input placeholder="Image URL" value={selectedObj.src || ""} onChange={(e) => { pushUndo(); updateObject(selectedObj.id, { src: e.target.value }); }} className="text-xs" data-testid="input-image-url" />
                )}
                <div className="flex gap-1.5">
                  <div>
                    <label className="text-[9px] text-gray-400">Fill</label>
                    <input type="color" value={selectedObj.fill || "#333333"} onChange={(e) => { pushUndo(); updateObject(selectedObj.id, { fill: e.target.value }); }} className="w-full h-7 rounded border cursor-pointer" data-testid="input-fill-color" />
                  </div>
                  {(selectedObj.type === "rect" || selectedObj.type === "circle") && (
                    <div>
                      <label className="text-[9px] text-gray-400">Stroke</label>
                      <input type="color" value={selectedObj.stroke || "#94a3b8"} onChange={(e) => { pushUndo(); updateObject(selectedObj.id, { stroke: e.target.value }); }} className="w-full h-7 rounded border cursor-pointer" data-testid="input-stroke-color" />
                    </div>
                  )}
                </div>
                {(selectedObj.type === "rect") && (
                  <div>
                    <label className="text-[9px] text-gray-400">Radius</label>
                    <Input type="number" value={selectedObj.borderRadius || 0} onChange={(e) => { pushUndo(); updateObject(selectedObj.id, { borderRadius: Number(e.target.value) }); }} className="text-xs" data-testid="input-border-radius" />
                  </div>
                )}
                <div className="flex gap-1.5">
                  <div>
                    <label className="text-[9px] text-gray-400">W</label>
                    <Input type="number" value={Math.round(selectedObj.width)} onChange={(e) => { pushUndo(); updateObject(selectedObj.id, { width: Number(e.target.value) }); }} className="text-xs" data-testid="input-width" />
                  </div>
                  <div>
                    <label className="text-[9px] text-gray-400">H</label>
                    <Input type="number" value={Math.round(selectedObj.height)} onChange={(e) => { pushUndo(); updateObject(selectedObj.id, { height: Number(e.target.value) }); }} className="text-xs" data-testid="input-height" />
                  </div>
                </div>
                <div>
                  <label className="text-[9px] text-gray-400">Opacity</label>
                  <input type="range" min={0} max={1} step={0.05} value={selectedObj.opacity ?? 1} onChange={(e) => { pushUndo(); updateObject(selectedObj.id, { opacity: Number(e.target.value) }); }} className="w-full h-1.5" data-testid="input-opacity" />
                </div>
                <div className="flex gap-1 flex-wrap pt-1">
                  <button onClick={bringForward} className="h-7 px-2 rounded-lg border text-[10px] hover:bg-gray-50 flex items-center gap-1" data-testid="button-bring-forward-single"><ArrowUp className="w-3 h-3" /></button>
                  <button onClick={sendBackward} className="h-7 px-2 rounded-lg border text-[10px] hover:bg-gray-50 flex items-center gap-1" data-testid="button-send-backward-single"><ArrowDown className="w-3 h-3" /></button>
                  <button onClick={bringToFront} className="h-7 px-2 rounded-lg border text-[10px] hover:bg-gray-50 flex items-center gap-1" data-testid="button-bring-front"><ChevronsUp className="w-3 h-3" /></button>
                  <button onClick={sendToBack} className="h-7 px-2 rounded-lg border text-[10px] hover:bg-gray-50 flex items-center gap-1" data-testid="button-send-back"><ChevronsDown className="w-3 h-3" /></button>
                  <button onClick={toggleLockSelected} className="h-7 px-2 rounded-lg border text-[10px] hover:bg-gray-50 flex items-center gap-1" data-testid="button-lock-single">{selectedObj.locked ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}</button>
                </div>
                <div className="flex gap-1.5 pt-1">
                  <Button size="sm" variant="outline" onClick={duplicateSelected} className="h-7 text-[10px] flex-1 gap-1" data-testid="button-duplicate"><Copy className="w-3 h-3" /> Dup</Button>
                  <Button size="sm" variant="destructive" onClick={deleteSelected} className="h-7 text-[10px] flex-1 gap-1" data-testid="button-delete-object"><Trash2 className="w-3 h-3" /> Del</Button>
                </div>
              </div>
            </div>
          )}

          <div className="p-3">
            <span className="text-xs font-semibold text-gray-600 mb-2 block">Layers ({objects.length})</span>
            <div className="space-y-0.5 max-h-40 overflow-y-auto">
              {[...objects].reverse().map(obj => (
                <button key={obj.id} onClick={() => setSelectedId(obj.id)} className={`w-full text-left px-2 py-1 rounded text-[10px] flex items-center gap-2 ${selectedIds.includes(obj.id) ? "bg-primary/10 text-primary" : "hover:bg-gray-50 text-gray-600"}`} data-testid={`layer-${obj.id}`}>
                  {obj.type === "text" && <Type className="w-3 h-3" />}
                  {obj.type === "rect" && <Square className="w-3 h-3" />}
                  {obj.type === "circle" && <Circle className="w-3 h-3" />}
                  {obj.type === "image" && <Image className="w-3 h-3" />}
                  <span className="truncate">{obj.groupId ? "[Group] " : ""}{obj.type === "text" ? (obj.content || "Text").slice(0, 20) : obj.tag || obj.type}</span>
                  {obj.locked && <Lock className="w-2.5 h-2.5 text-gray-400 ml-auto" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showPublishDialog && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 space-y-4">
            <h3 className="font-semibold text-lg text-gray-900">Publish to Marketplace</h3>
            <p className="text-sm text-gray-500">Create a product listing from this design.</p>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Product Title</label>
                <Input value={publishForm.title} onChange={(e) => setPublishForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g., Cardiac Assessment Cram Guide" data-testid="input-publish-title" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Description</label>
                <Textarea value={publishForm.description} onChange={(e) => setPublishForm(f => ({ ...f, description: e.target.value }))} placeholder="Describe what students will learn..." rows={3} data-testid="input-publish-description" />
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-xs font-medium text-gray-600 block mb-1">Price (CAD)</label>
                  <Input type="number" step="0.01" min="0" value={publishForm.price} onChange={(e) => setPublishForm(f => ({ ...f, price: e.target.value }))} placeholder="19.99" data-testid="input-publish-price" />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-medium text-gray-600 block mb-1">Category</label>
                  <select value={publishForm.category} onChange={(e) => setPublishForm(f => ({ ...f, category: e.target.value }))} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm" data-testid="select-publish-category">
                    <option value="Cram Guide">Cram Guide</option>
                    <option value="Quick Reference">Quick Reference</option>
                    <option value="Flashcard Pack">Flashcard Pack</option>
                    <option value="Printable">Printable</option>
                    <option value="Bundle">Bundle</option>
                  </select>
                </div>
              </div>
              <p className="text-[10px] text-gray-400">A thumbnail will be generated from page 1. Product will be saved as a draft.</p>
            </div>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" onClick={() => setShowPublishDialog(false)} className="flex-1" data-testid="button-cancel-publish">Cancel</Button>
              <Button onClick={publishToMarketplace} disabled={publishing || !publishForm.title.trim() || !publishForm.price} className="flex-1 gap-1.5" data-testid="button-confirm-publish">
                {publishing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ShoppingCart className="w-3.5 h-3.5" />}
                {publishing ? "Publishing..." : "Publish Draft"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getQueryParam(key: string): string | null {
  try {
    const search = window.location.search;
    return new URLSearchParams(search).get(key);
  } catch { return null; }
}

export default function ProductBuilderPage() {
  const { isAdmin } = useAuth();
  const [, navigate] = useLocation();
  const [, params] = useRoute("/admin/product-builder/:id");
  const [, paramsLocale] = useRoute("/:locale/admin/product-builder/:id");
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [presetType, setPresetType] = useState<string | null>(null);
  const [editorMode, setEditorMode] = useState<"guided" | "canvas">("guided");

  useEffect(() => {
    const id = params?.id || paramsLocale?.id;
    if (id) setEditingProjectId(id);
  }, [params?.id, paramsLocale?.id]);

  useEffect(() => {
    const type = getQueryParam("type");
    if (type) setPresetType(type);
    const mode = getQueryParam("mode");
    if (mode === "canvas") setEditorMode("canvas");
  }, []);

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Admin access required</p>
      </div>
    );
  }

  const handleBack = () => {
    setEditingProjectId(null);
    setPresetType(null);
    setEditorMode("guided");
    navigate("/admin/product-builder");
  };

  if (editingProjectId) {
    if (editorMode === "guided") {
      return (
        <GuidedModeView
          projectId={editingProjectId}
          onBack={handleBack}
          onSwitchToCanvas={() => setEditorMode("canvas")}
        />
      );
    }
    return (
      <CanvasEditorView
        projectId={editingProjectId}
        onBack={handleBack}
        initialPresetType={presetType}
      />
    );
  }

  return <ProjectListView onOpenProject={(id) => { setEditingProjectId(id); navigate(`/admin/product-builder/${id}`); }} />;
}
