"use client"

import React, { useState } from "react";
import { GripVertical } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Section } from "@/lib/types";

interface SectionsPaneProps {
  sections: Section[];
  activeSectionId: string | null;
  onSelect: (id: string) => void;
  onOrderChange: (sections: Section[]) => void;
}

export function SectionsPane({ sections, activeSectionId, onSelect, onOrderChange }: SectionsPaneProps) {
  const [draggedItem, setDraggedItem] = useState<Section | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLButtonElement>, section: Section) => {
    setDraggedItem(section);
    e.dataTransfer.effectAllowed = "move";
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLButtonElement>, targetSection: Section) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.id === targetSection.id) return;

    const currentIndex = sections.findIndex((s) => s.id === draggedItem.id);
    const targetIndex = sections.findIndex((s) => s.id === targetSection.id);

    const newSections = [...sections];
    newSections.splice(currentIndex, 1);
    newSections.splice(targetIndex, 0, draggedItem);

    onOrderChange(newSections);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLButtonElement>) => {
    setDraggedItem(null);
    e.currentTarget.style.opacity = '1';
  };

  return (
    <div className="flex h-full flex-col">
      <h2 className="p-4 text-lg font-semibold tracking-tight">Sections</h2>
      <ScrollArea className="flex-1 px-2">
        <div className="flex flex-col gap-1 p-2">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={activeSectionId === section.id ? "secondary" : "ghost"}
              className={cn("w-full justify-start rounded-md border-l-4 border-transparent", 
                activeSectionId === section.id ? "border-primary bg-primary/10 hover:bg-primary/20" : "hover:bg-accent",
                {
                "ring-2 ring-primary": draggedItem?.id === section.id,
              })}
              onClick={() => onSelect(section.id)}
              draggable
              onDragStart={(e) => handleDragStart(e, section)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, section)}
              onDragEnd={handleDragEnd}
            >
              <GripVertical className="mr-2 h-5 w-5 cursor-move text-muted-foreground" />
              <span className="truncate">{section.title}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
