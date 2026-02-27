import { useRef, useCallback, useState, useEffect } from "react";
import { Bold, Italic, Underline, Strikethrough, List, ListOrdered, Heading2, RemoveFormatting, ImagePlus, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  minHeight?: string;
}

const toolbarButtons = [
  { command: "bold", icon: Bold, label: "Bold", shortcut: "Ctrl+B" },
  { command: "italic", icon: Italic, label: "Italic", shortcut: "Ctrl+I" },
  { command: "underline", icon: Underline, label: "Underline", shortcut: "Ctrl+U" },
  { command: "strikeThrough", icon: Strikethrough, label: "Strikethrough" },
  { separator: true },
  { command: "insertUnorderedList", icon: List, label: "Bullet List" },
  { command: "insertOrderedList", icon: ListOrdered, label: "Numbered List" },
  { separator: true },
  { command: "formatBlock:H3", icon: Heading2, label: "Subheading" },
  { command: "removeFormat", icon: RemoveFormatting, label: "Clear Formatting" },
  { separator: true },
  { command: "insertLink", icon: Link, label: "Insert Link" },
  { command: "insertImage", icon: ImagePlus, label: "Insert Image" },
] as const;

export function RichTextEditor({ value, onChange, className, placeholder = "Start typing...", minHeight = "120px" }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const lastValueRef = useRef(value);
  const isFocusedRef = useRef(false);

  useEffect(() => {
    if (editorRef.current && !isFocusedRef.current && value !== lastValueRef.current) {
      editorRef.current.innerHTML = value;
      lastValueRef.current = value;
    }
  }, [value]);

  const emitChange = useCallback(() => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      lastValueRef.current = html;
      onChange(html);
    }
  }, [onChange]);

  const execCommand = useCallback((command: string) => {
    if (command === "insertImage") {
      fileInputRef.current?.click();
      return;
    }
    if (command === "insertLink") {
      const url = prompt("Enter URL:");
      if (url) {
        document.execCommand("createLink", false, url);
        if (editorRef.current) {
          const links = editorRef.current.querySelectorAll("a");
          links.forEach((a) => {
            a.setAttribute("target", "_blank");
            a.setAttribute("rel", "noopener noreferrer");
          });
          emitChange();
        }
      }
      editorRef.current?.focus();
      return;
    }
    if (command.startsWith("formatBlock:")) {
      const tag = command.split(":")[1];
      document.execCommand("formatBlock", false, tag);
    } else {
      document.execCommand(command, false);
    }
    emitChange();
    editorRef.current?.focus();
  }, [emitChange]);

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const creds = JSON.parse(localStorage.getItem("nursenest-credentials") || "{}");
      const reqRes = await fetch("/api/uploads/request-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: creds.username,
          password: creds.password,
          filename: file.name,
          contentType: file.type,
        }),
      });
      if (!reqRes.ok) throw new Error("Upload request failed");
      const { uploadURL, objectPath } = await reqRes.json();
      await fetch(uploadURL, { method: "PUT", body: file, headers: { "Content-Type": file.type } });
      const publicUrl = `/api/uploads/${objectPath}`;
      editorRef.current?.focus();
      document.execCommand("insertHTML", false, `<img src="${publicUrl}" alt="${file.name}" style="max-width:100%;border-radius:8px;margin:8px 0;" />`);
      emitChange();
    } catch {
      const reader = new FileReader();
      reader.onload = () => {
        editorRef.current?.focus();
        document.execCommand("insertHTML", false, `<img src="${reader.result}" alt="${file.name}" style="max-width:100%;border-radius:8px;margin:8px 0;" />`);
        emitChange();
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [emitChange]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith("image/")) {
        e.preventDefault();
        const file = items[i].getAsFile();
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            editorRef.current?.focus();
            document.execCommand("insertHTML", false, `<img src="${reader.result}" alt="Pasted image" style="max-width:100%;border-radius:8px;margin:8px 0;" />`);
            emitChange();
          };
          reader.readAsDataURL(file);
        }
        return;
      }
    }
    e.preventDefault();
    const html = e.clipboardData.getData("text/html");
    const text = e.clipboardData.getData("text/plain");
    let content: string;
    if (text && text.includes("\n")) {
      const sanitized = html ? sanitizeHtml(html) : "";
      const temp = document.createElement("div");
      temp.innerHTML = sanitized;
      const hasFormattedTags = temp.querySelector("b, strong, i, em, u, s, ul, ol, h1, h2, h3, h4, a, img, table, blockquote, pre");
      if (hasFormattedTags) {
        content = ensureBlockSpacing(sanitized, text);
      } else {
        content = textToHtml(text);
      }
    } else if (html) {
      content = sanitizeHtml(html);
    } else if (text) {
      content = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    } else {
      return;
    }
    document.execCommand("insertHTML", false, content);
    emitChange();
  }, [emitChange]);

  const isEmpty = !value || value === "<br>" || value === "<div><br></div>" || value.replace(/<[^>]*>/g, "").trim() === "";

  return (
    <div className={cn("border border-input rounded-lg overflow-hidden bg-white", isFocused && "ring-2 ring-ring ring-offset-1", className)} data-testid="rich-text-editor">
      <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-gray-200 bg-gray-50/80 flex-wrap" data-testid="rich-text-toolbar">
        {toolbarButtons.map((btn, i) => {
          if ("separator" in btn) {
            return <div key={`sep-${i}`} className="w-px h-5 bg-gray-200 mx-1" />;
          }
          const Icon = btn.icon;
          return (
            <Button
              key={btn.command}
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 hover:bg-primary/10 hover:text-primary"
              onClick={() => execCommand(btn.command)}
              title={btn.label + ("shortcut" in btn ? ` (${btn.shortcut})` : "")}
              data-testid={`button-format-${btn.command.toLowerCase().replace(/[^a-z]/g, "")}`}
            >
              <Icon className="w-3.5 h-3.5" />
            </Button>
          );
        })}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
        data-testid="input-image-upload"
      />
      <div className="relative">
        {isEmpty && !isFocused && (
          <div className="absolute inset-0 px-3 py-2 text-gray-400 pointer-events-none text-sm">
            {placeholder}
          </div>
        )}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          className="px-3 py-2 outline-none text-sm leading-relaxed whitespace-pre-wrap [&_b]:font-bold [&_strong]:font-bold [&_i]:italic [&_em]:italic [&_u]:underline [&_s]:line-through [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mt-3 [&_h3]:mb-1 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-3 [&_h2]:mb-1 [&_h1]:text-xl [&_h1]:font-bold [&_h1]:mt-4 [&_h1]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-0.5 [&_img]:max-w-full [&_img]:rounded-lg [&_img]:my-2 [&_a]:text-primary [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-2 [&_pre]:bg-gray-100 [&_pre]:p-2 [&_pre]:rounded [&_pre]:my-2 [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:rounded [&_table]:border-collapse [&_table]:w-full [&_table]:my-2 [&_td]:border [&_td]:border-gray-300 [&_td]:px-2 [&_td]:py-1 [&_th]:border [&_th]:border-gray-300 [&_th]:px-2 [&_th]:py-1 [&_th]:font-semibold [&_th]:bg-gray-50 [&_hr]:border-gray-300 [&_hr]:my-3 [&_p]:mb-3 [&_p:empty]:h-4 [&_div]:mb-1 [&_br]:block [&_br]:content-[''] [&_br]:mt-1"
          style={{ minHeight }}
          onInput={emitChange}
          onFocus={() => { setIsFocused(true); isFocusedRef.current = true; }}
          onBlur={() => { setIsFocused(false); isFocusedRef.current = false; lastValueRef.current = editorRef.current?.innerHTML || ""; }}
          onPaste={handlePaste}
          dangerouslySetInnerHTML={{ __html: value }}
          data-testid="rich-text-content"
        />
      </div>
    </div>
  );
}

interface RichTextListEditorProps {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}

export function RichTextListEditor({ items, onChange, placeholder = "Enter item..." }: RichTextListEditorProps) {
  return (
    <div className="space-y-2" data-testid="rich-text-list-editor">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 items-start">
          <div className="flex-1">
            <RichTextEditor
              value={item}
              onChange={(v) => {
                const updated = [...items];
                updated[i] = v;
                onChange(updated);
              }}
              placeholder={placeholder}
              minHeight="40px"
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-red-400 hover:text-red-600 mt-1 shrink-0"
            onClick={() => onChange(items.filter((_, idx) => idx !== i))}
            data-testid={`button-remove-item-${i}`}
          >
            <span className="text-lg leading-none">&times;</span>
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" className="gap-1" onClick={() => onChange([...items, ""])} data-testid="button-add-list-item">
        + Add Item
      </Button>
    </div>
  );
}

export function RichTextDisplay({ html, className }: { html: string; className?: string }) {
  if (!html) return null;
  return (
    <span
      className={cn("inline whitespace-pre-wrap [&_b]:font-bold [&_strong]:font-bold [&_i]:italic [&_em]:italic [&_u]:underline [&_s]:line-through [&_h3]:text-base [&_h3]:font-semibold [&_h2]:text-lg [&_h2]:font-semibold [&_h1]:text-xl [&_h1]:font-bold [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_img]:max-w-full [&_img]:rounded-lg [&_img]:my-2 [&_a]:text-primary [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_pre]:bg-gray-100 [&_pre]:p-2 [&_pre]:rounded [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:rounded [&_table]:border-collapse [&_td]:border [&_td]:border-gray-300 [&_td]:px-2 [&_td]:py-1 [&_th]:border [&_th]:border-gray-300 [&_th]:px-2 [&_th]:py-1 [&_th]:font-semibold [&_hr]:border-gray-300 [&_hr]:my-2 [&_p]:mb-2 [&_p:last-child]:mb-0 [&_div]:mb-1", className)}
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }}
    />
  );
}

function textToHtml(text: string): string {
  const lines = text.split(/\n/);
  const blocks: string[] = [];
  let currentBlock: string[] = [];
  for (const line of lines) {
    if (line.trim() === "") {
      if (currentBlock.length > 0) {
        blocks.push(`<p>${currentBlock.join("<br>")}</p>`);
        currentBlock = [];
      }
      blocks.push("<p><br></p>");
    } else {
      currentBlock.push(line.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
    }
  }
  if (currentBlock.length > 0) {
    blocks.push(`<p>${currentBlock.join("<br>")}</p>`);
  }
  return blocks.join("");
}

function ensureBlockSpacing(html: string, plainText: string): string {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  const extractedText = temp.textContent || temp.innerText || "";
  const plainLines = plainText.split("\n");
  const htmlLines = extractedText.split("\n");
  if (plainLines.length > htmlLines.length * 1.5) {
    const walker = document.createTreeWalker(temp, NodeFilter.SHOW_TEXT);
    const textNodes: Text[] = [];
    let tNode: Text | null;
    while ((tNode = walker.nextNode() as Text | null)) {
      textNodes.push(tNode);
    }
    let plainPos = 0;
    for (const textNode of textNodes) {
      const nodeText = textNode.textContent || "";
      const idx = plainText.indexOf(nodeText.trim(), plainPos);
      if (idx >= 0) {
        const before = plainText.substring(plainPos, idx);
        const newlineCount = (before.match(/\n/g) || []).length;
        if (newlineCount > 0) {
          const br = document.createElement("span");
          let brHtml = "";
          for (let j = 0; j < newlineCount; j++) brHtml += "<br>";
          br.innerHTML = brHtml;
          const frag = document.createDocumentFragment();
          while (br.firstChild) frag.appendChild(br.firstChild);
          textNode.parentNode?.insertBefore(frag, textNode);
        }
        plainPos = idx + nodeText.trim().length;
      }
    }
    return temp.innerHTML;
  }
  const topChildren = Array.from(temp.children);
  for (const child of topChildren) {
    const el = child as HTMLElement;
    if (el.style && !el.style.marginBottom) {
      el.style.marginBottom = "0.75em";
    }
  }
  return temp.innerHTML;
}

function sanitizeHtml(html: string): string {
  const allowed = ["b", "strong", "i", "em", "u", "s", "strike", "br", "p", "div", "span", "ul", "ol", "li", "h3", "h4", "h2", "h1", "sub", "sup", "img", "a", "blockquote", "pre", "code", "table", "thead", "tbody", "tr", "td", "th", "hr"];
  const allowedAttrs: Record<string, string[]> = {
    img: ["src", "alt", "style", "width", "height"],
    a: ["href", "target", "rel"],
    td: ["colspan", "rowspan", "style"],
    th: ["colspan", "rowspan", "style"],
    span: ["style"],
    p: ["style"],
    div: ["style"],
    blockquote: ["style"],
    li: ["style"],
    ul: ["style"],
    ol: ["style", "start", "type"],
    h1: ["style"],
    h2: ["style"],
    h3: ["style"],
    h4: ["style"],
    table: ["style"],
    tr: ["style"],
    pre: ["style"],
  };
  const temp = document.createElement("div");
  temp.innerHTML = html;

  function clean(node: Node): Node | null {
    if (node.nodeType === Node.TEXT_NODE) return node.cloneNode();
    if (node.nodeType !== Node.ELEMENT_NODE) return null;

    const el = node as Element;
    const tag = el.tagName.toLowerCase();

    if (!allowed.includes(tag)) {
      const fragment = document.createDocumentFragment();
      for (const child of Array.from(el.childNodes)) {
        const cleaned = clean(child);
        if (cleaned) fragment.appendChild(cleaned);
      }
      return fragment;
    }

    const newEl = document.createElement(tag);
    const safeAttrs = allowedAttrs[tag] || [];
    for (const attrName of safeAttrs) {
      const attrVal = el.getAttribute(attrName);
      if (attrVal !== null) {
        newEl.setAttribute(attrName, attrVal);
      }
    }
    if (tag === "a" && !newEl.getAttribute("target")) {
      newEl.setAttribute("target", "_blank");
      newEl.setAttribute("rel", "noopener noreferrer");
    }
    for (const child of Array.from(el.childNodes)) {
      const cleaned = clean(child);
      if (cleaned) newEl.appendChild(cleaned);
    }
    return newEl;
  }

  const result = document.createElement("div");
  for (const child of Array.from(temp.childNodes)) {
    const cleaned = clean(child);
    if (cleaned) result.appendChild(cleaned);
  }
  return result.innerHTML;
}
