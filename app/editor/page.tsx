"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useProjectStore } from "@/lib/use-project-store"

export default function EditorPage() {
  const { openCreate } = useProjectStore()

  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center space-y-6 max-w-md">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            Create a project or open an existing one
          </h1>
          <p className="text-muted-foreground">
            Start a new architecture workspace, or choose a project from the sidebar.
          </p>
        </div>

        <Button size="lg" onClick={openCreate}>
          <Plus className="h-5 w-5 mr-2" />
          New Project
        </Button>
      </div>
    </div>
  )
}
