"use client";

import React, { useState, useMemo } from "react";
import {
  GripVertical,
  Plus,
  Trash2,
  RotateCcw,
  Search,
  Pencil,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { Section } from "@/lib/types";
import { useIsMobile } from "@/hooks/use-mobile";

interface SectionsPaneProps {
  sections: Section[];
  activeSectionId: string | null;
  availableSections: Section[];
  onSelect: (id: string) => void;
  onOrderChange: (sections: Section[]) => void;
  onAddSection: (section: Omit<Section, "id">) => void;
  onDeleteSection: (id: string) => void;
  onResetSectionContent: (id: string) => void;
  onResetAll: () => void;
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
  onRenameSection,
}: SectionsPaneProps) {
  const [draggedItem, setDraggedItem] = useState<Section | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const isMobile = useIsMobile();

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    section: Section
  ) => {
    if (editingId) return;
    setDraggedItem(section);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetSection: Section
  ) => {
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

  const filteredAvailableSections = useMemo(
    () =>
      availableSections.filter((section) =>
        section.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [availableSections, searchTerm]
  );

  const handleAddCustomSection = () => {
    onAddSection({
      title: "Custom Section",
      content: "## Custom Section\n\nYour content here.",
    });
  };

  const handleAddAvailableSection = (section: Section) => {
    onAddSection({ title: section.title, content: section.content });
  };

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
    if (e.key === "Enter") {
      handleFinishEditing();
    } else if (e.key === "Escape") {
      setEditingId(null);
      setEditingTitle("");
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold tracking-tight">Sections</h2>
      </div>
      <div className="flex-1 overflow-auto">
        <ScrollArea className="h-full">
          <TooltipProvider>
            <div className="p-4 pt-2">
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                Current Sections
              </h3>
              <div className="flex flex-col gap-1">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    className={cn(
                      "group relative rounded-md border text-left p-2 transition-all duration-200",
                      activeSectionId === section.id
                        ? "border-primary bg-accent/50 ring-1 ring-primary"
                        : "border-input bg-background hover:bg-accent",
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
                    <div className="flex items-center gap-2 pr-24">
                      <GripVertical className="h-5 w-5 cursor-move text-muted-foreground transition-opacity group-hover:opacity-100 flex-shrink-0" />
                      {editingId === section.id ? (
                        <Input
                          type="text"
                          value={editingTitle}
                          onChange={handleTitleChange}
                          onBlur={handleFinishEditing}
                          onKeyDown={handleKeyDown}
                          autoFocus
                          className="h-7 p-1 flex-1 text-sm bg-transparent"
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        <span
                          className="truncate flex-1 cursor-pointer"
                          onDoubleClick={(e) => {
                            e.stopPropagation();
                            handleStartEditing(section);
                          }}
                        >
                          {section.title}
                        </span>
                      )}
                    </div>
                    <div
                      className={cn(
                        "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5 transition-opacity",
                        isMobile
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      )}
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartEditing(section);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Rename Section</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={(e) => {
                              e.stopPropagation();
                              onResetSectionContent(section.id);
                            }}
                          >
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Reset Content</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 hover:bg-destructive/10 hover:text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteSection(section.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete Section</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TooltipProvider>
          <Separator className="my-2" />

          <div className="p-4">
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">
              Add a Section
            </h3>
            <div className="space-y-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search available sections"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                className="w-full transition-all hover:bg-primary/5"
                onClick={handleAddCustomSection}
              >
                <Plus className="mr-2 h-4 w-4" />
                New Custom Section
              </Button>
            </div>
          </div>

          <div className="p-4 pt-0">
            <div className="flex flex-col gap-1">
              {filteredAvailableSections.map((section) => (
                <Button
                  key={section.id}
                  variant="ghost"
                  className="w-full justify-start transition-all hover:bg-primary/5 hover:pl-4"
                  onClick={() => handleAddAvailableSection(section)}
                >
                  <Plus className="mr-2 h-4 w-4 text-muted-foreground" />
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
