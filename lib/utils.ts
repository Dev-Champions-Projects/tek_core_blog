import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateSlug(title: string): string {
  return title
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "-and-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export const NODE_HANDLES_SELECTED_STYLE_CLASSNAME =
  "node-handles-selected-style";

export function isValidUrl(url: string) {
  return /^https?:\/\/\S+$/.test(url);
}

export function stripHtml(html: string) {
  if (!html) return "";

  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Extract readable plain text from rich editor content saved as either HTML or
// JSON (Tiptap) string. This handles the common cases encountered in the app.
export function getPlainTextFromRichContent(content: string) {
  if (!content) return "";

  // Try to parse JSON (Tiptap saves JSON.stringify(editor.getJSON()))
  try {
    const parsed = JSON.parse(content);

    const walk = (node: any): string => {
      if (!node) return "";
      if (typeof node === "string") return node;
      let text = "";
      if (node.text) text += node.text;
      if (Array.isArray(node.content)) {
        for (const child of node.content) {
          text += (text ? " " : "") + walk(child);
        }
      }
      return text;
    };

    // The Tiptap document root often has `content` array
    if (Array.isArray(parsed.content)) {
      return parsed.content.map((n: any) => walk(n)).join(" ").replace(/\s+/g, " ").trim();
    }

    return walk(parsed).replace(/\s+/g, " ").trim();
  } catch (e) {
    // Not JSON — assume HTML or plain text
    return stripHtml(content);
  }
}

export const getNameInitials = (name: string) => {
  if (!name) return null;

  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("");
};
