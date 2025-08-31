"use client";

import { Download, FileX, RotateCcw, ChevronDown, FileText, FileJson } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onDownloadMd: () => void;
  onDownloadPdf: () => void;
  onCleanStart: () => void;
  onResetAll: () => void;
}

export function Header({ onDownloadMd, onDownloadPdf, onCleanStart, onResetAll }: HeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b bg-background px-4 lg:h-16 lg:px-6">
      <div className="flex items-center gap-2 font-semibold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          className="h-6 w-6 fill-primary"
        >
          <path d="M224,48H32a8,8,0,0,0-8,8V192a8,8,0,0,0,8,8H224a8,8,0,0,0,8-8V56A8,8,0,0,0,224,48ZM92,168H60a8,8,0,0,1,0-16H92a8,8,0,0,1,0,16Zm104-32H60a8,8,0,0,1,0-16H196a8,8,0,0,1,0,16Zm0-32H60a8,8,0,0,1,0-16H196a8,8,0,0,1,0,16Z"></path>
        </svg>
        <span>ReadmePro</span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onCleanStart}
                className="h-9 w-9 text-muted-foreground hover:text-foreground"
                aria-label="Clean Start"
              >
                <FileX className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Clean Start</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onResetAll}
                className="h-9 w-9 text-muted-foreground hover:text-foreground"
                aria-label="Reset All"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reset All Content</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Separator orientation="vertical" className="h-6" />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onDownloadMd}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Markdown (.md)</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDownloadPdf}>
              <FileJson className="mr-2 h-4 w-4" />
              <span>PDF (.pdf)</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ThemeToggle />
      </div>
    </header>
  );
}