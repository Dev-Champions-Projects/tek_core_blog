"use client";

import { BlockquoteToolbar } from "@/components/toolbars/blockquote";
import { BoldToolbar } from "@/components/toolbars/bold";
import { BulletListToolbar } from "@/components/toolbars/bullet-list";
import { CodeToolbar } from "@/components/toolbars/code";
import { CodeBlockToolbar } from "@/components/toolbars/code-block";
import { HardBreakToolbar } from "@/components/toolbars/hard-break";
import { HorizontalRuleToolbar } from "@/components/toolbars/horizontal-rule";
import { ItalicToolbar } from "@/components/toolbars/italic";
import { OrderedListToolbar } from "@/components/toolbars/ordered-list";
import { RedoToolbar } from "@/components/toolbars/redo";
import { StrikeThroughToolbar } from "@/components/toolbars/strikethrough";
import { ToolbarProvider } from "@/components/toolbars/toolbar-provider";
import { UndoToolbar } from "@/components/toolbars/undo";
import { Separator } from "@/components/ui/separator";
import { EditorContent, type Extension, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ImageExtension } from "../extensions/image";
import { ImagePlaceholder } from "../extensions/image-placeholder";
import { ImagePlaceholderToolbar } from "./image-placeholder-toolbar";
import { LinkToolbar } from "./link";
import Link from "@tiptap/extension-link";

const extensions = [
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
];

const RichTextEditor = ({
  content,
  onChange,
}: {
  content: string | Record<string, any>;
  onChange: (richText: string) => void;
}) => {
  let initialContent: string | Record<string, any> = content;
  if (typeof content === "string") {
    try {
      initialContent = JSON.parse(content);
    } catch (e) {
      initialContent = content;
    }
  }

  const editor = useEditor({
    extensions: extensions as Extension[],
    content: initialContent,
    editable: true,
    onUpdate: () => {
      const jsonContent = editor?.getJSON();

      // Store as a JSON string so node attributes (images, align, width) are preserved
      onChange(JSON.stringify(jsonContent));
    },
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }
  return (
    <div className="border w-full relative rounded-md overflow-hidden pb-3">
      <div className="flex w-full items-center py-2 px-2 justify-between border-b  sticky top-0 left-0 bg-background z-20">
        <ToolbarProvider editor={editor}>
          <div className="flex items-center gap-2">
            <UndoToolbar />
            <RedoToolbar />
            <Separator orientation="vertical" className="h-7" />
            <BoldToolbar />
            <ItalicToolbar />
            <StrikeThroughToolbar />
            <LinkToolbar />
            <BulletListToolbar />
            <OrderedListToolbar />
            <CodeToolbar />
            <CodeBlockToolbar />
            <HorizontalRuleToolbar />
            <BlockquoteToolbar />
            <HardBreakToolbar />
            <ImagePlaceholderToolbar />
          </div>
        </ToolbarProvider>
      </div>
      <div
        onClick={() => {
          editor?.chain().focus().run();
        }}
        className="cursor-text min-h-72 bg-background"
      >
        <EditorContent className="outline-none" editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;
