"use client";

import { Link as LinkIcon, X } from "lucide-react";
import React from "react";

import { useToolbar } from "@/components/toolbars/toolbar-provider";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type ButtonProps = React.ComponentProps<typeof Button>;

const LinkToolbar = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const { editor } = useToolbar();

    const onSetLink = () => {
      if (!editor) return;
      const url = window.prompt("Enter URL");
      if (!url) return;
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    };

    const onUnsetLink = () => {
      if (!editor) return;
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    };

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8",
                editor?.isActive("link") && "bg-accent",
                className
              )}
              onClick={(e) => {
                onSetLink();
                onClick?.(e);
              }}
              disabled={!editor?.can().chain().focus().extendMarkRange("link").setLink({ href: "https://" }).run()}
              ref={ref}
              {...props}
            >
              {children || <LinkIcon className="h-4 w-4" />}
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                onUnsetLink();
                onClick?.(e);
              }}
              ref={ref}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <span>Link</span>
        </TooltipContent>
      </Tooltip>
    );
  }
);

LinkToolbar.displayName = "LinkToolbar";

export { LinkToolbar };
