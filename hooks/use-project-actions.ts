"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ProjectData } from "@/types/project"

interface UseProjectActionsOptions {
  onProjectCreated?: (id: string) => void
  onProjectRenamed?: () => void
  onProjectDeleted?: () => void
}

export function useProjectActions(
  _initialProjects: ProjectData[],
  options: UseProjectActionsOptions = {}
) {
  const { onProjectCreated, onProjectRenamed, onProjectDeleted } = options
  const router = useRouter()

  // Create dialog state
  const [createOpen, setCreateOpen] = useState(false)
  const [createName, setCreateName] = useState("")

  // Rename dialog state
  const [renameOpen, setRenameOpen] = useState(false)
  const [renameId, setRenameId] = useState("")
  const [renameName, setRenameName] = useState("")

  // Delete dialog state
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteId, setDeleteId] = useState("")
  const [deleteName, setDeleteName] = useState("")

  function slugify(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  }

  const createSlug = slugify(createName)

  async function handleSubmitCreate() {
    const name = createName.trim() || "Untitled Project"
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    })

    if (!res.ok) {
      const error = await res.json().catch(() => ({ error: "Unknown error" }))
      throw new Error(error.error || "Failed to create project")
    }

    setCreateOpen(false)
    setCreateName("")
    router.push("/editor")
    router.refresh()
    if (onProjectCreated) onProjectCreated("")
  }

  function openCreate() {
    setCreateName("")
    setCreateOpen(true)
  }

  function closeCreate() {
    setCreateOpen(false)
  }

  async function handleSubmitRename() {
    const name = renameName.trim()
    if (!name) return

    const res = await fetch(`/api/projects/${renameId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    })

    if (!res.ok) {
      if (res.status === 403) throw new Error("Forbidden")
      const error = await res.json().catch(() => ({ error: "Unknown error" }))
      throw new Error(error.error || "Failed to rename project")
    }

    setRenameOpen(false)
    router.refresh()
    if (onProjectRenamed) onProjectRenamed()
  }

  function openRename(project: ProjectData) {
    setRenameId(project.id)
    setRenameName(project.name)
    setRenameOpen(true)
  }

  function closeRename() {
    setRenameOpen(false)
  }

  async function handleSubmitDelete() {
    const res = await fetch(`/api/projects/${deleteId}`, {
      method: "DELETE",
    })

    if (!res.ok) {
      if (res.status === 403) throw new Error("Forbidden")
      throw new Error("Failed to delete project")
    }

    setDeleteOpen(false)
    router.push("/editor")
    router.refresh()
    if (onProjectDeleted) onProjectDeleted()
  }

  function openDelete(project: ProjectData) {
    setDeleteId(project.id)
    setDeleteName(project.name)
    setDeleteOpen(true)
  }

  function closeDelete() {
    setDeleteOpen(false)
  }

  return {
    createOpen,
    createName,
    createSlug,
    renameOpen,
    renameId,
    renameName,
    deleteOpen,
    deleteId,
    deleteName,
    openCreate,
    closeCreate,
    setCreateName,
    handleSubmitCreate,
    openRename,
    closeRename,
    setRenameName,
    handleSubmitRename,
    openDelete,
    closeDelete,
    handleSubmitDelete,
  }
}