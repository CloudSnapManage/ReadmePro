"use client"

import { Download, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Separator } from "@/components/ui/separator"

interface HeaderProps {
  onDownload: () => void;
  onReset: () => void;
}

export function Header({ onDownload, onReset }: HeaderProps) {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-16 lg:px-6">
      <div className="flex items-center gap-2 font-semibold">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-6 w-6 fill-primary"><path d="M224,48H32a8,8,0,0,0-8,8V192a8,8,0,0,0,8,8H224a8,8,0,0,0,8-8V56A8,8,0,0,0,224,48ZM92,168H60a8,8,0,0,1,0-16H92a8,8,0,0,1,0,16Zm104-32H60a8,8,0,0,1,0-16H196a8,8,0,0,1,0,16Zm0-32H60a8,8,0,0,1,0-16H196a8,8,0,0,1,0,16Z"></path></svg>
        <span className="">ReadmePro</span>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onReset}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
        <Button size="sm" onClick={onDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <ThemeToggle />
      </div>
    </header>
  );
}
