"use client"

import { useState } from "react"
import { PanelLeftOpen, PanelLeftClose } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface EditorNavbarProps {
  onSidebarToggle?: (isOpen: boolean) => void
}

export function EditorNavbar({ onSidebarToggle }: EditorNavbarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleToggle = () => {
    const newState = !sidebarOpen
    setSidebarOpen(newState)
    onSidebarToggle?.(newState)
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 h-16 z-40",
        "bg-background border-b border-border",
        "flex items-center justify-between px-4"
      )}
    >
      {/* Left section */}
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="default"
          onClick={handleToggle}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? (
            <PanelLeftClose className="h-5 w-5" />
          ) : (
            <PanelLeftOpen className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Center section */}
      <div className="flex-1" />

      {/* Right section */}
      <div className="flex items-center" />
    </nav>
  )
}
