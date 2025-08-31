"use client"

import { useMemo } from "react";
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
          <div className="rounded-md border bg-white p-6 shadow-sm">
            <pre className="text-sm text-gray-800 font-mono whitespace-pre-wrap break-words">
              {fullMarkdown}
            </pre>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
