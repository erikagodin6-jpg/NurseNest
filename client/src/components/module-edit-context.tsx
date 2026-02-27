import { createContext, useContext, useRef } from "react";
import { RichTextEditor, RichTextDisplay } from "@/components/rich-text-editor";

export type SectionOverride = {
  title?: string;
  subtitle?: string;
  content?: string;
  items?: string[];
  color?: string;
};

export type ModuleEditContextType = {
  isEditing: boolean;
  sections: Record<string, SectionOverride>;
  updateSection: (key: string, data: SectionOverride) => void;
};

export const ModuleEditContext = createContext<ModuleEditContextType>({
  isEditing: false,
  sections: {},
  updateSection: () => {},
});

export function useModuleEdit() {
  return useContext(ModuleEditContext);
}

export function useEditableText(sectionKey: string, defaultText: string): string {
  const { sections } = useModuleEdit();
  const override = sections[sectionKey];
  return override?.content ?? defaultText;
}

export function EditableModuleText({
  sectionKey,
  defaultText,
  as = "p",
  className = "",
  multiline = false,
}: {
  sectionKey: string;
  defaultText: string;
  as?: "p" | "h2" | "h3" | "span";
  className?: string;
  multiline?: boolean;
}) {
  const { isEditing, sections, updateSection } = useModuleEdit();
  const override = sections[sectionKey];
  const displayText = override?.content ?? defaultText;

  const editorContainerRef = useRef<HTMLDivElement>(null);

  if (!isEditing) {
    const Tag = as;
    const hasHtml = /<[a-z][\s\S]*>/i.test(displayText);
    if (hasHtml) {
      return <Tag className={className}><RichTextDisplay html={displayText} /></Tag>;
    }
    return <Tag className={className}>{displayText}</Tag>;
  }

  return (
    <div className="relative" ref={editorContainerRef}>
      {multiline ? (
        <RichTextEditor
          value={displayText}
          onChange={(v) => updateSection(sectionKey, { ...override, content: v })}
          className={className}
          minHeight="80px"
          placeholder="Enter content..."
        />
      ) : (
        <input
          type="text"
          value={displayText}
          onChange={(e) => updateSection(sectionKey, { ...override, content: e.target.value })}
          className={`w-full bg-white/80 border border-purple-200 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-purple-300 focus:border-purple-400 focus:outline-none ${className}`}
          data-testid={`editable-text-${sectionKey}`}
        />
      )}
    </div>
  );
}
