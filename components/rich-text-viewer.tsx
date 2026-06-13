"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ImageExtension } from "./extensions/image";
import { ImagePlaceholder } from "./extensions/image-placeholder";
import Link from "@tiptap/extension-link";

interface RichTextProps {
  content: string | Record<string, any>;
}

export default function RichTextViewer({ content }: RichTextProps) {
  // Accept either a JSON-stringified document (preferred) or raw HTML
  let editorContent: string | Record<string, any> = content;
  if (typeof content === "string") {
    try {
      const parsed = JSON.parse(content);
      editorContent = parsed;
    } catch (e) {
      editorContent = content;
    }
  }

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc",
          },
        },
        code: {
          HTMLAttributes: {
            class: "bg-accent rounded-md p-1",
          },
        },
        horizontalRule: {
          HTMLAttributes: {
            class: "my-2",
          },
        },
        codeBlock: {
          HTMLAttributes: {
            class: "bg-primary text-primary-foreground p-2 text-sm rounded-md p-1",
          },
        },
        heading: {
          levels: [1, 2, 3, 4],
          HTMLAttributes: {
            class: "tiptap-heading",
          },
        },
      }),
      ImageExtension,
      ImagePlaceholder,
      Link,
    ],
    content: editorContent,
    editable: false,
    immediatelyRender: false,
  });

  if (!editor) return null;
  return <EditorContent editor={editor} />;
}
