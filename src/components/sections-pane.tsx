"use client"

import React, { useState, useMemo } from "react";
import { GripVertical, Plus, Trash2, RotateCcw, Search, Pencil, FileX } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { Section } from "@/lib/types";
import { useIsMobile } from "@/hooks/use-mobile";

interface SectionsPaneProps {
  sections: Section[];
  activeSectionId: string | null;
  availableSections: Section[];
  onSelect: (id: string) => void;
  onOrderChange: (sections: Section[]) => void;
  onAddSection: (section: Omit<Section, 'id'>) => void;
  onDeleteSection: (id: string) => void;
  onResetSectionContent: (id: string) => void;
  onResetAll: () => void;
  onCleanStart: () => void;
  onRenameSection: (id: string, newTitle: string) => void;
}

export function SectionsPane({ 
  sections, 
  activeSectionId, 
  availableSections,
  onSelect, 
  onOrderChange,
  onAddSection,
  onDeleteSection,
  onResetSectionContent,
  onResetAll,
  onCleanStart,
  onRenameSection,
}: SectionsPaneProps) {
  const [draggedItem, setDraggedItem] = useState<Section | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const isMobile = useIsMobile();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, section: Section) => {
    if (editingId) return;
    setDraggedItem(section);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetSection: Section) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.id === targetSection.id) return;

    const currentIndex = sections.findIndex((s) => s.id === draggedItem.id);
    const targetIndex = sections.findIndex((s) => s.id === targetSection.id);

    const newSections = [...sections];
    newSections.splice(currentIndex, 1);
    newSections.splice(targetIndex, 0, draggedItem);

    onOrderChange(newSections);
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };
  
  const filteredAvailableSections = useMemo(() => 
    availableSections.filter(section => 
      section.title.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [availableSections, searchTerm]
  );

  const handleAddCustomSection = () => {
    onAddSection({
      title: "Custom Section",
      content: "## Custom Section\n\nYour content here."
    });
  };
  
  const handleAddAvailableSection = (section: Section) => {
    onAddSection({ title: section.title, content: section.content });
  }

  const handleStartEditing = (section: Section) => {
    setEditingId(section.id);
    setEditingTitle(section.title);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingTitle(e.target.value);
  };

  const handleFinishEditing = () => {
    if (editingId && editingTitle.trim()) {
      onRenameSection(editingId, editingTitle.trim());
    }
    setEditingId(null);
    setEditingTitle("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleFinishEditing();
    } else if (e.key === 'Escape') {
      setEditingId(null);
      setEditingTitle("");
    }
  };


  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold tracking-tight">Sections</h2>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={onCleanStart} className="text-muted-foreground hover:text-foreground">
            <FileX className="mr-2 h-4 w-4" />
            Clean Start
          </Button>
          <Button variant="ghost" size="sm" onClick={onResetAll} className="text-muted-foreground hover:text-foreground">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <ScrollArea className="h-full">
          <div className="p-4 pt-0">
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">
              Click on a section below to edit the contents
            </h3>
            <div className="flex flex-col gap-1">
              {sections.map((section) => (
                <div 
                  key={section.id} 
                  className={cn(
                    "group relative rounded-md border text-left p-2 pr-24 transition-all duration-200",
                    activeSectionId === section.id ? "border-primary ring-1 ring-primary" : "border-input bg-background hover:bg-accent hover:border-accent-foreground/20",
                    draggedItem?.id === section.id ? "opacity-50" : ""
                  )}
                  draggable={!editingId}
                  onDragStart={(e) => handleDragStart(e, section)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, section)}
                  onDragEnd={handleDragEnd}
                  onClick={() => {
                    if (editingId !== section.id) {
                      onSelect(section.id);
                    }
                  }}
                >
                  <div className="flex items-center">
                    <GripVertical className="mr-2 h-5 w-5 cursor-move text-muted-foreground transition-opacity group-hover:opacity-100 flex-shrink-0" />
                    {editingId === section.id ? (
                      <Input
                        type="text"
                        value={editingTitle}
                        onChange={handleTitleChange}
                        onBlur={handleFinishEditing}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        className="h-7 p-1 flex-1 text-sm bg-transparent"
                      />
                    ) : (
                      <span
                        className="truncate flex-1 cursor-pointer"
                        onClick={() => handleStartEditing(section)}
                      >
                        {section.title}
                      </span>
                    )}
                  </div>
                  <div className={cn(
                      "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1 transition-opacity",
                      isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    )}>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleStartEditing(section)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onResetSectionContent(section.id)}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-destructive/10 hover:text-destructive" onClick={() => onDeleteSection(section.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-2"/>

          <div className="p-4">
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">
              Click on a section below to add it to your readme
            </h3>
            <div className="space-y-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search for a section" 
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="w-full transition-all hover:bg-primary/5" onClick={handleAddCustomSection}>
                <Plus className="mr-2 h-4 w-4"/>
                Custom Section
              </Button>
            </div>
          </div>

          <div className="p-4 pt-2">
            <div className="flex flex-col gap-1">
              {filteredAvailableSections.map((section) => (
                <Button
                  key={section.id}
                  variant="ghost"
                  className="w-full justify-start transition-all hover:bg-primary/5 hover:pl-3"
                  onClick={() => handleAddAvailableSection(section)}
                >
                  {section.title}
                </Button>
              ))}
            </div>
          </div>

        </ScrollArea>
      </div>
    </div>
  );
}
