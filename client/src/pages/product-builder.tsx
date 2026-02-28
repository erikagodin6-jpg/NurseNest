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
];

function getTheme(id: string): ThemeConfig {
  return THEMES.find(t => t.id === id) || THEMES[0];
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
    generate: (w, h) => [
      { id: uid(), type: "rect" as const, x: 0, y: 0, width: w, height: h, fill: "#7c3aed", rotation: 0, opacity: 1, zIndex: 0, borderRadius: 0 },
      { id: uid(), type: "rect" as const, x: 0, y: h * 0.65, width: w, height: h * 0.35, fill: "#6d28d9", rotation: 0, opacity: 0.6, zIndex: 1, borderRadius: 0 },
      { id: uid(), type: "text" as const, x: 46, y: 180, width: w - 92, height: 60, content: "CRAM GUIDE", fontSize: 42, fontWeight: "bold", fill: "#ffffff", fontFamily: "Inter", rotation: 0, opacity: 1, zIndex: 2, textAlign: "center" },
      { id: uid(), type: "text" as const, x: 46, y: 260, width: w - 92, height: 30, content: "Subtitle Goes Here", fontSize: 18, fontWeight: "normal", fill: "#e0d5f5", fontFamily: "Inter", rotation: 0, opacity: 1, zIndex: 3, textAlign: "center" },
      { id: uid(), type: "rect" as const, x: w / 2 - 90, y: 320, width: 180, height: 28, fill: "#f59e0b", borderRadius: 14, rotation: 0, opacity: 1, zIndex: 4 },
      { id: uid(), type: "text" as const, x: w / 2 - 80, y: 324, width: 160, height: 20, content: `Updated ${new Date().getFullYear()}`, fontSize: 11, fontWeight: "bold", fill: "#ffffff", fontFamily: "Inter", rotation: 0, opacity: 1, zIndex: 5, textAlign: "center" },
      { id: uid(), type: "text" as const, x: 46, y: h - 100, width: w - 92, height: 20, content: "NurseNest", fontSize: 14, fontWeight: "bold", fill: "#ffffff", fontFamily: "Inter", rotation: 0, opacity: 0.7, zIndex: 6, textAlign: "center" },
    ],
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

function CanvasEditorView({ projectId, onBack }: { projectId: string; onBack: () => void }) {
  const { toast } = useToast();
  const [project, setProject] = useState<DesignProject | null>(null);
  const [pages, setPages] = useState<DesignPage[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [objects, setObjects] = useState<CanvasObject[]>([]);
  const [saving, setSaving] = useState(false);
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
  const [leftPanel, setLeftPanel] = useState<"tools" | "components" | "templates" | "ai" | "imagelab" | "brand" | null>("tools");
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

  const saveCanvas = useCallback(async () => {
    if (!pages[currentPageIndex]) return;
    setSaving(true);
    try {
      await adminFetch(`/api/admin/design-pages/${pages[currentPageIndex].id}`, {
        method: "PUT",
        body: { canvasJson: { objects, version: "1.0" }, backgroundColor: pages[currentPageIndex].backgroundColor },
      });
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

      const prompt = `${tool?.prompt || "Generate content"} for: ${aiTopic}.
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
        setAiResult(data.blocks || []);
        toast({ title: "Content generated", description: `${(data.blocks || []).length} blocks ready to insert` });
      }
    } catch (e: any) {
      toast({ title: "AI Error", description: e.message, variant: "destructive" });
    } finally {
      setAiLoading(null);
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
      const blockType = block.type || "paragraph";
      const content = block.content || "";

      if (blockType === "heading") {
        newObjs.push({ id: uid(), type: "text", x: MARGIN, y: curY, width: contentWidth, height: 30, content, fontSize: 18, fontWeight: "bold", fill: BRAND.textDark, fontFamily: BRAND.fontHeading, rotation: 0, opacity: 1, zIndex: objects.length + newObjs.length, textAlign: "left" });
        curY += 38;
      } else if (blockType === "clinical-pearl") {
        newObjs.push({ id: uid(), type: "rect", x: MARGIN, y: curY, width: contentWidth, height: 70, fill: "#ede9fe", stroke: BRAND.primary, strokeWidth: 2, borderRadius: 10, rotation: 0, opacity: 1, zIndex: objects.length + newObjs.length });
        newObjs.push({ id: uid(), type: "text", x: MARGIN + 12, y: curY + 6, width: contentWidth - 24, height: 16, content: "Clinical Pearl", fontSize: 11, fontWeight: "bold", fill: BRAND.primary, fontFamily: BRAND.fontBody, rotation: 0, opacity: 1, zIndex: objects.length + newObjs.length + 1 });
        newObjs.push({ id: uid(), type: "text", x: MARGIN + 12, y: curY + 24, width: contentWidth - 24, height: 40, content, fontSize: 10, fontWeight: "normal", fill: BRAND.textDark, fontFamily: BRAND.fontBody, rotation: 0, opacity: 1, zIndex: objects.length + newObjs.length + 2 });
        curY += 80;
      } else if (blockType === "warning") {
        newObjs.push({ id: uid(), type: "rect", x: MARGIN, y: curY, width: contentWidth, height: 70, fill: "#fef2f2", stroke: BRAND.danger, strokeWidth: 2, borderRadius: 10, rotation: 0, opacity: 1, zIndex: objects.length + newObjs.length });
        newObjs.push({ id: uid(), type: "text", x: MARGIN + 12, y: curY + 6, width: contentWidth - 24, height: 16, content: "Red Flag", fontSize: 11, fontWeight: "bold", fill: BRAND.danger, fontFamily: BRAND.fontBody, rotation: 0, opacity: 1, zIndex: objects.length + newObjs.length + 1 });
        newObjs.push({ id: uid(), type: "text", x: MARGIN + 12, y: curY + 24, width: contentWidth - 24, height: 40, content, fontSize: 10, fontWeight: "normal", fill: BRAND.textDark, fontFamily: BRAND.fontBody, rotation: 0, opacity: 1, zIndex: objects.length + newObjs.length + 2 });
        curY += 80;
      } else if (blockType === "callout") {
        newObjs.push({ id: uid(), type: "rect", x: MARGIN, y: curY, width: contentWidth, height: 50, fill: "#f0fdf4", stroke: BRAND.success, strokeWidth: 1, borderRadius: 8, rotation: 0, opacity: 1, zIndex: objects.length + newObjs.length });
        newObjs.push({ id: uid(), type: "text", x: MARGIN + 12, y: curY + 8, width: contentWidth - 24, height: 34, content, fontSize: 10, fontWeight: "normal", fill: BRAND.textDark, fontFamily: BRAND.fontBody, rotation: 0, opacity: 1, zIndex: objects.length + newObjs.length + 1 });
        curY += 58;
      } else if (blockType === "list") {
        const lines = content.split("\n").filter((l: string) => l.trim());
        const h = Math.max(40, lines.length * 16);
        newObjs.push({ id: uid(), type: "text", x: MARGIN, y: curY, width: contentWidth, height: h, content: lines.map((l: string) => `• ${l.replace(/^[-•]\s*/, "")}`).join("\n"), fontSize: 10, fontWeight: "normal", fill: BRAND.textDark, fontFamily: BRAND.fontBody, rotation: 0, opacity: 1, zIndex: objects.length + newObjs.length, textAlign: "left" });
        curY += h + 10;
      } else {
        const estLines = Math.ceil(content.length / 70);
        const h = Math.max(30, estLines * 14);
        newObjs.push({ id: uid(), type: "text", x: MARGIN, y: curY, width: contentWidth, height: h, content, fontSize: 10, fontWeight: "normal", fill: BRAND.textDark, fontFamily: BRAND.fontBody, rotation: 0, opacity: 1, zIndex: objects.length + newObjs.length, textAlign: "left" });
        curY += h + 8;
      }
    }

    setObjects(prev => [...prev, ...newObjs]);
    setAiResult(null);
    toast({ title: `${newObjs.length} elements inserted` });
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
                  <Button size="sm" onClick={insertAiBlocks} className="w-full h-7 text-[10px] gap-1" data-testid="button-insert-ai">
                    <Plus className="w-3 h-3" /> Insert into Canvas
                  </Button>
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
                    <Button size="sm" className="h-7 text-[10px]" data-testid="button-insert-bundle-pages" onClick={() => {
                      const pagesPayload = aiResult.pages || [];
                      if (pagesPayload.length === 0) return;
                      pushUndo();
                      setObjects(pagesPayload[0]?.objects || []);
                      toast({ title: "Inserted bundle page 1", description: `${pagesPayload.length} page(s) in bundle` });
                    }}>Insert Pages</Button>
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

    if (leftPanel === "brand") {
      return (
        <div className="w-72 bg-white border-r overflow-y-auto shrink-0" data-testid="panel-brand">
          <div className="p-4 border-b">
            <div className="flex items-center gap-2">
              <SwatchBook className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-gray-800">Brand Kit</span>
            </div>
            <p className="text-[11px] text-gray-500 mt-1">Keep designs consistent and store-ready.</p>
          </div>
          <div className="p-4 space-y-4">
            <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-white to-primary/5 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-700">Theme</span>
                <span className="text-[10px] text-gray-400">{theme.name}</span>
              </div>
              <select value={activeThemeId} onChange={e => switchTheme(e.target.value)} className="w-full h-10 rounded-xl border px-3 text-sm" data-testid="select-brand-theme">
                {THEMES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
              <div className="flex gap-2 mt-3">
                {[theme.primaryColor, theme.secondaryColor, theme.accentColor, theme.dangerColor, theme.successColor].map((c, i) => (
                  <div key={i} className="w-7 h-7 rounded-full border" style={{ backgroundColor: c }} title={c} />
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-white to-primary/5 p-4 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-700">Brand Lock</span>
                <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                  <input type="checkbox" checked={brandLock} onChange={e => setBrandLock(e.target.checked)} className="rounded" data-testid="checkbox-brand-lock-panel" />
                  {brandLock ? "On" : "Off"}
                </label>
              </div>
              <p className="text-[11px] text-gray-500">Protects logo, limits colors/fonts for consistent output.</p>
            </div>
            <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-white to-primary/5 p-4 shadow-sm">
              <span className="text-xs font-semibold text-gray-700 block mb-2">Text Styles</span>
              <div className="grid grid-cols-2 gap-2">
                <button className="h-10 rounded-xl border hover:bg-gray-50 text-xs" onClick={() => selectedId && (pushUndo(), updateObject(selectedId, { fontSize: 24, fontWeight: "bold", fontFamily: theme.headingFont }))} disabled={!selectedId} data-testid="button-style-heading">Heading</button>
                <button className="h-10 rounded-xl border hover:bg-gray-50 text-xs" onClick={() => selectedId && (pushUndo(), updateObject(selectedId, { fontSize: 14, fontWeight: "600", fontFamily: theme.headingFont }))} disabled={!selectedId} data-testid="button-style-subheading">Subheading</button>
                <button className="h-10 rounded-xl border hover:bg-gray-50 text-xs" onClick={() => selectedId && (pushUndo(), updateObject(selectedId, { fontSize: 11, fontWeight: "normal", fontFamily: theme.bodyFont }))} disabled={!selectedId} data-testid="button-style-body">Body</button>
                <button className="h-10 rounded-xl border hover:bg-gray-50 text-xs" onClick={() => selectedId && (pushUndo(), updateObject(selectedId, { fontSize: 9, fontWeight: "600", fontFamily: theme.bodyFont }))} disabled={!selectedId} data-testid="button-style-caption">Caption</button>
              </div>
            </div>
            <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-white to-primary/5 p-4 shadow-sm">
              <span className="text-xs font-semibold text-gray-700 block mb-2">Quick Actions</span>
              <div className="space-y-2">
                <button className="w-full h-10 rounded-xl border hover:bg-gray-50 text-xs" onClick={beautifyPage} data-testid="button-brand-beautify">Beautify Layout</button>
                <button className="w-full h-10 rounded-xl border hover:bg-gray-50 text-xs" onClick={runDesignAudit} data-testid="button-brand-audit">{brandVerified ? "Re-Audit (Verified)" : "Run Design Audit"}</button>
                <button className="w-full h-10 rounded-xl border hover:bg-gray-50 text-xs" onClick={applyBrandTypography} data-testid="button-brand-fonts">Apply Theme Fonts</button>
                <button className="w-full h-10 rounded-xl border hover:bg-gray-50 text-xs" onClick={applyThemeToAllPages} data-testid="button-brand-apply-all">Apply to All Pages</button>
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
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="h-12 bg-white border-b flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => { saveCanvas(); onBack(); }} className="p-1.5 hover:bg-gray-100 rounded" data-testid="button-back-to-projects">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="font-semibold text-sm text-gray-800">{project?.title || "Loading..."}</span>
          <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{project?.type}</span>
          <span className="text-[10px] text-gray-400">{pages.length} page(s)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-gray-400 mr-1">{saving ? "Saving..." : "Auto-saved"}</span>
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
        <div className="w-[84px] bg-gradient-to-b from-white to-gray-50 border-r flex flex-col items-center py-3 gap-1 shrink-0">
          <div className="flex flex-col items-center gap-0.5 mb-1">
            {[
              { icon: Type, action: () => addObject("text"), label: "Text", testId: "button-add-text" },
              { icon: Square, action: () => addObject("rect"), label: "Rect", testId: "button-add-rect" },
              { icon: Circle, action: () => addObject("circle"), label: "Circle", testId: "button-add-circle" },
              { icon: Image, action: () => addObject("image"), label: "Image", testId: "button-add-image" },
            ].map(({ icon: Icon, action, label, testId }) => (
              <button key={testId} onClick={action} className="w-[68px] rounded-xl px-2 py-1.5 flex flex-col items-center gap-0.5 text-gray-500 hover:bg-primary/5 hover:text-primary transition-colors" title={label} data-testid={testId}>
                <Icon className="w-4 h-4" />
                <span className="text-[9px] font-medium">{label}</span>
              </button>
            ))}
          </div>
          <div className="w-12 h-px bg-gray-100" />
          <div className="text-[9px] font-semibold text-gray-400 mt-1 mb-0.5">PANELS</div>
          {[
            { id: "templates", label: "Templates", icon: LayoutTemplate },
            { id: "components", label: "Elements", icon: Sparkles },
            { id: "ai", label: "AI", icon: Brain },
            { id: "imagelab", label: "Images", icon: ImagePlus },
            { id: "brand", label: "Brand", icon: SwatchBook },
          ].map(({ id, label, icon: Icon }) => {
            const active = leftPanel === (id as any);
            return (
              <button
                key={id}
                onClick={() => setLeftPanel(active ? null : (id as any))}
                className={`w-[68px] rounded-2xl px-2 py-2 flex flex-col items-center gap-1 transition ${active ? "bg-primary/10 text-primary ring-1 ring-primary/20" : "text-gray-500 hover:bg-gray-50"}`}
                data-testid={`button-panel-${id}`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{label}</span>
              </button>
            );
          })}
          <div className="mt-auto pt-2 w-full flex flex-col items-center gap-1.5">
            <button onClick={undo} className="w-[68px] h-8 rounded-xl border text-[10px] hover:bg-gray-50" title="Undo" data-testid="button-undo">Undo</button>
            <button onClick={redo} className="w-[68px] h-8 rounded-xl border text-[10px] hover:bg-gray-50" title="Redo" data-testid="button-redo">Redo</button>
          </div>
        </div>

        {renderLeftPanel()}

        <div className="flex-1 overflow-auto relative">
          <div className="min-h-full w-full flex items-center justify-center px-10 py-10 bg-gradient-to-br from-[#f8f7ff] via-[#f5fbff] to-[#fffdf7]">
            <div className="relative">
              <div className="absolute -inset-10 rounded-3xl opacity-60" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(124,58,237,0.08) 1px, transparent 0)", backgroundSize: "22px 22px" }} />
              <div className="relative rounded-3xl shadow-[0_30px_60px_-15px_rgba(124,58,237,0.25)] ring-1 ring-primary/10 bg-white transition-all duration-300">
                <div
                  ref={canvasRef}
                  className="bg-white relative select-none rounded-2xl"
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

              <div className="mt-3 flex items-center justify-between rounded-2xl bg-white/70 backdrop-blur border border-gray-200 px-3 py-2 shadow-sm">
                <div className="flex items-center gap-2">
                  <button onClick={zoomOut} className="h-8 px-3 rounded-xl border text-xs hover:bg-gray-50" data-testid="button-zoom-out">–</button>
                  <select value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="h-8 rounded-xl border px-2 text-xs" data-testid="select-zoom">
                    {[25, 35, 50, 65, 75, 85, 100, 125, 150, 200].map(z => <option key={z} value={z}>{z}%</option>)}
                  </select>
                  <button onClick={zoomIn} className="h-8 px-3 rounded-xl border text-xs hover:bg-gray-50" data-testid="button-zoom-in">+</button>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={zoomFit} className="h-8 px-3 rounded-xl border text-xs hover:bg-gray-50" data-testid="button-zoom-fit">Fit</button>
                  <button onClick={zoomActual} className="h-8 px-3 rounded-xl border text-xs hover:bg-gray-50" data-testid="button-zoom-100">100%</button>
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
                <span className="text-xs font-semibold text-gray-600">Pages</span>
              </div>
              <button onClick={addPage} className="text-[11px] px-2 py-1 rounded-lg border hover:bg-gray-50" data-testid="button-add-page">+ Add</button>
            </div>
            <div className="space-y-2">
              {pages.map((page, i) => {
                const isActive = i === currentPageIndex;
                const bg = page.backgroundColor || "#ffffff";
                const thumbSrc = pageThumbs[page.id] || "";
                return (
                  <button
                    key={page.id}
                    onClick={() => switchPage(i)}
                    className={`w-full text-left rounded-2xl border p-2 flex gap-2 hover:border-primary/40 transition ${isActive ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-gray-200 bg-white"}`}
                    data-testid={`button-page-${i + 1}`}
                  >
                    <div className="w-[60px] h-[78px] rounded-xl overflow-hidden border bg-white shrink-0 shadow-sm hover:shadow-md transition">
                      {thumbSrc ? (
                        <img src={thumbSrc} className="w-full h-full object-cover" alt={`Page ${i + 1}`} />
                      ) : (
                        <div className="w-full h-full bg-gray-50 flex items-center justify-center text-[10px] text-gray-300">{i + 1}</div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-700">Page {i + 1}</span>
                        <div className="flex items-center gap-0.5">
                          <button onClick={(e) => { e.stopPropagation(); duplicatePage(i); }} className="text-[10px] text-gray-400 hover:text-primary px-1.5 py-0.5 rounded hover:bg-primary/5" data-testid={`button-dup-page-${i + 1}`}>
                            <Copy className="w-3 h-3" />
                          </button>
                          {pages.length > 1 && (
                            <button onClick={(e) => { e.stopPropagation(); deletePage(page.id, i); }} className="text-[10px] text-gray-400 hover:text-red-500 px-1.5 py-0.5 rounded hover:bg-red-50" data-testid={`button-del-page-${i + 1}`}>
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-0.5">{isActive ? "Editing" : "Click to edit"}</p>
                    </div>
                  </button>
                );
              })}
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

export default function ProductBuilderPage() {
  const { isAdmin } = useAuth();
  const [, navigate] = useLocation();
  const [, params] = useRoute("/admin/product-builder/:id");
  const [, paramsLocale] = useRoute("/:locale/admin/product-builder/:id");
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  useEffect(() => {
    const id = params?.id || paramsLocale?.id;
    if (id) setEditingProjectId(id);
  }, [params?.id, paramsLocale?.id]);

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Admin access required</p>
      </div>
    );
  }

  if (editingProjectId) {
    return (
      <CanvasEditorView
        projectId={editingProjectId}
        onBack={() => { setEditingProjectId(null); navigate("/admin/product-builder"); }}
      />
    );
  }

  return <ProjectListView onOpenProject={(id) => { setEditingProjectId(id); navigate(`/admin/product-builder/${id}`); }} />;
}
