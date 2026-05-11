"use client"

import { useRef, useEffect } from "react"
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

interface RenameProjectDialogProps {
  open: boolean
  onClose: () => void
  name: string
  onNameChange: (name: string) => void
  onSubmit: () => void
}

export function RenameProjectDialog({
  open,
  onClose,
  name,
  onNameChange,
  onSubmit,
}: RenameProjectDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [open])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && name.trim()) {
      onSubmit()
    }
  }

  // No need for original name; description is generic

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rename Project</DialogTitle>
          <DialogDescription>
            Change the name of your project.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="rename-name">Project name</Label>
            <Input
              id="rename-name"
              ref={inputRef}
              placeholder="Project name"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={!name.trim()} onClick={onSubmit}>
            Rename
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
