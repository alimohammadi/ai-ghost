"use client"

import { Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CreateProjectDialogProps {
  open: boolean
  onClose: () => void
  name: string
  slug: string
  onNameChange: (name: string) => void
  onSubmit: () => void
}

export function CreateProjectDialog({
  open,
  onClose,
  name,
  slug,
  onNameChange,
  onSubmit,
}: CreateProjectDialogProps) {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onNameChange(e.target.value)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Create a new workspace to start writing.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="create-name">Project name</Label>
            <Input
              id="create-name"
              placeholder="My Project"
              value={name}
              onChange={handleNameChange}
              autoFocus
            />
          </div>

          {name && (
            <div className="grid gap-2">
              <Label>URL slug</Label>
              <p className="text-sm text-muted-foreground">
                /projects/{slug || "your-project-slug"}
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={!name.trim()} onClick={onSubmit}>
            <Plus className="h-4 w-4 mr-2" />
            Create Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
