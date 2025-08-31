"use client";

import { useState, useMemo, useCallback } from "react";
import type { Section } from "@/lib/types";
import { DEFAULT_SECTIONS, ALL_SECTIONS } from "@/lib/initial-data";
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

  const availableSections = useMemo(() => {
    const activeSectionIds = new Set(sections.map((s) => s.id));
    return ALL_SECTIONS.filter((s) => !activeSectionIds.has(s.id));
  }, [sections]);

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

  const handleAddSection = useCallback((sectionToAdd: Omit<Section, 'id'>) => {
    const newId = sectionToAdd.title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
    const newSection: Section = {
      ...sectionToAdd,
      id: newId,
    };
    setSections(prev => [...prev, newSection]);
    setActiveSectionId(newId);
    toast({
      title: "Section Added",
      description: `"${newSection.title}" has been added to your README.`,
    });
  }, [toast]);

  const handleDeleteSection = useCallback((id: string) => {
    setSections(prev => {
      const newSections = prev.filter(s => s.id !== id);
      if (activeSectionId === id) {
        setActiveSectionId(newSections[0]?.id || null);
      }
      return newSections;
    });
    toast({
      title: "Section Removed",
      description: "The section has been removed from your README.",
      variant: "destructive"
    });
  }, [activeSectionId, toast]);

  const handleResetSectionContent = useCallback((id: string) => {
    const defaultSection = DEFAULT_SECTIONS.find(s => s.id === id) || ALL_SECTIONS.find(s => s.id === id);
    if (defaultSection) {
      setSections(prev => prev.map(s => s.id === id ? { ...s, content: defaultSection.content } : s));
      toast({
        title: "Section Content Reset",
        description: "The content of the section has been reset to its default.",
      });
    }
  }, [toast]);


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
          <ResizablePanel defaultSize={25} minSize={20} maxSize={30}>
            <SectionsPane
              sections={sections}
              activeSectionId={activeSectionId}
              availableSections={availableSections}
              onSelect={handleSectionSelect}
              onOrderChange={handleSectionOrderChange}
              onAddSection={handleAddSection}
              onDeleteSection={handleDeleteSection}
              onResetSectionContent={handleResetSectionContent}
              onResetAll={handleReset}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={38} minSize={30}>
            <EditorPane
              key={activeSection?.id}
              section={activeSection}
              onContentChange={handleContentChange}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={37} minSize={30}>
            <PreviewPane sections={sections} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}
