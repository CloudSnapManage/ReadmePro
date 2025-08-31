"use client";

import { useState, useMemo, useCallback } from "react";
import type { Section } from "@/lib/types";
import { DEFAULT_SECTIONS } from "@/lib/initial-data";
import { Header } from "@/components/header";
import { SectionsPane } from "@/components/sections-pane";
import { EditorPane } from "@/components/editor-pane";
import { PreviewPane } from "@/components/preview-pane";
import { useToast } from "@/hooks/use-toast";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Home() {
  const { toast } = useToast();
  const [sections, setSections] = useState<Section[]>(
    () => JSON.parse(JSON.stringify(DEFAULT_SECTIONS))
  );
  const [activeSectionId, setActiveSectionId] = useState<string | null>(
    DEFAULT_SECTIONS[0]?.id || null
  );

  const activeSection = useMemo(
    () => sections.find((section) => section.id === activeSectionId),
    [sections, activeSectionId]
  );

  const handleSectionSelect = useCallback((id: string) => {
    setActiveSectionId(id);
  }, []);

  const handleContentChange = useCallback((content: string) => {
    if (!activeSectionId) return;
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === activeSectionId ? { ...section, content } : section
      )
    );
  }, [activeSectionId]);

  const handleSectionOrderChange = useCallback((newSections: Section[]) => {
    setSections(newSections);
  }, []);

  const handleReset = useCallback(() => {
    setSections(JSON.parse(JSON.stringify(DEFAULT_SECTIONS)));
    setActiveSectionId(DEFAULT_SECTIONS[0]?.id || null);
    toast({
      title: "Content Reset",
      description: "The editor has been reset to its default state.",
    });
  }, [toast]);

  const handleDownload = useCallback(() => {
    const fullMarkdown = sections.map((section) => section.content).join("\n\n");
    const blob = new Blob([fullMarkdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Download Started",
      description: "Your README.md file is being downloaded.",
    });
  }, [sections, toast]);

  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground">
      <Header onDownload={handleDownload} onReset={handleReset} />
      <main className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
            <SectionsPane
              sections={sections}
              activeSectionId={activeSectionId}
              onSelect={handleSectionSelect}
              onOrderChange={handleSectionOrderChange}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={40} minSize={30}>
            <EditorPane
              key={activeSection?.id}
              section={activeSection}
              onContentChange={handleContentChange}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={40} minSize={30}>
            <PreviewPane sections={sections} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}
