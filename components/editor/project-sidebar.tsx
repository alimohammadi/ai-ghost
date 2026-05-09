"use client"

import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  return (
    <>
      {/* Overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 bottom-0 w-64 z-40",
          "bg-background border-r border-border",
          "flex flex-col",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          <h2 className="text-lg font-semibold">Projects</h2>
          <Button
            variant="ghost"
            size="default"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Tabs content */}
        <div className="flex-1 overflow-hidden flex flex-col p-4">
          <Tabs defaultValue="my-projects" className="flex flex-col h-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="my-projects">My Projects</TabsTrigger>
              <TabsTrigger value="shared">Shared</TabsTrigger>
            </TabsList>

            <TabsContent
              value="my-projects"
              className="flex-1 flex items-center justify-center text-muted-foreground"
            >
              <div className="text-center">
                <p className="text-sm">No projects yet</p>
              </div>
            </TabsContent>

            <TabsContent
              value="shared"
              className="flex-1 flex items-center justify-center text-muted-foreground"
            >
              <div className="text-center">
                <p className="text-sm">No shared projects</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer button */}
        <div className="p-4 border-t border-border">
          <Button variant="default" size="default" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  )
}
