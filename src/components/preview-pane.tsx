"use client"

import { useMemo } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Section } from "@/lib/types";

interface PreviewPaneProps {
  sections: Section[];
}

export function PreviewPane({ sections }: PreviewPaneProps) {
  const fullMarkdown = useMemo(() => 
    sections.map((section) => section.content).join("\n\n"),
    [sections]
  );

  return (
    <div className="flex h-full flex-col bg-muted/20">
      <div className="p-4 border-b bg-background">
        <h2 className="text-lg font-semibold tracking-tight">Preview</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 sm:p-6">
          <div className="prose dark:prose-invert prose-sm max-w-none rounded-md border bg-card p-6 shadow-sm text-card-foreground">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {fullMarkdown}
            </ReactMarkdown>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
