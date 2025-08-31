"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import type { Section } from "@/lib/types"

interface EditorPaneProps {
  section: Section | undefined;
  onContentChange: (content: string) => void;
}

export function EditorPane({ section, onContentChange }: EditorPaneProps) {
  if (!section) {
    return (
      <div className="flex h-full items-center justify-center p-4 text-muted-foreground">
        Select a section to start editing.
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold tracking-tight">{section.title}</h2>
      </div>
      <div className="flex-1 relative">
        <ScrollArea className="absolute inset-0">
            <Textarea
              value={section.content}
              onChange={(e) => onContentChange(e.target.value)}
              className="h-full w-full resize-none rounded-none border-0 bg-transparent p-4 focus-visible:ring-0 focus-visible:ring-offset-0 font-mono"
              aria-label={`${section.title} content editor`}
            />
        </ScrollArea>
      </div>
    </div>
  );
}
