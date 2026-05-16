"use client"

import React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"
import { Project } from "@/types/project"

// Types
interface ProjectState {
  projects: Project[]
  createOpen: boolean
  createName: string
  createSlug: string
  renameOpen: boolean
  renameId: string
  renameName: string
  deleteOpen: boolean
  deleteId: string
  deleteName: string
}

interface ProjectActions {
  openCreate: () => void
  closeCreate: () => void
  setCreateName: (name: string) => void
  openRename: (project: Project) => void
  closeRename: () => void
  setRenameName: (name: string) => void
  openDelete: (project: Project) => void
  closeDelete: () => void
  addProject: (name: string, slug: string) => void
  updateProject: (id: string, name: string) => void
  deleteProject: (id: string) => void
}

type ProjectContextType = ProjectState & ProjectActions

const ProjectContext = createContext<ProjectContextType | null>(null)

// Provider component
export function ProjectProvider({ children }: { children: ReactNode }) {
const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "First Project",
      slug: "first-project",
      isOwner: true,
      status: "DRAFT",
      ownerId: "user-1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Collaborative Draft",
      slug: "collaborative-draft",
      isOwner: false,
      status: "DRAFT",
      ownerId: "user-2",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ])

  const [createOpen, setCreateOpen] = useState(false)
  const [createName, setCreateName] = useState("")
  const [createSlug, setCreateSlug] = useState("")

  const [renameOpen, setRenameOpen] = useState(false)
  const [renameId, setRenameId] = useState("")
  const [renameName, setRenameName] = useState("")

  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteId, setDeleteId] = useState("")
  const [deleteName, setDeleteName] = useState("")

  // Handlers
  const openCreate = () => {
    setCreateName("")
    setCreateSlug("")
    setCreateOpen(true)
  }

  const closeCreate = () => setCreateOpen(false)

  const setCreateNameHandler = (name: string) => {
    setCreateName(name)
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    setCreateSlug(slug)
  }

  const openRename = (project: Project) => {
    setRenameId(project.id)
    setRenameName(project.name)
    setRenameOpen(true)
  }

  const closeRename = () => setRenameOpen(false)

  const setRenameNameHandler = (name: string) => {
    setRenameName(name)
  }

  const openDelete = (project: Project) => {
    setDeleteId(project.id)
    setDeleteName(project.name)
    setDeleteOpen(true)
  }

  const closeDelete = () => setDeleteOpen(false)

const now = new Date().toISOString()
   const addProject = (name: string, slug: string) => {
     const newProject: Project = {
       id: Date.now().toString(),
       name,
       slug,
       isOwner: true,
       status: "DRAFT",
       ownerId: "user",
       createdAt: now,
       updatedAt: now,
     }
     setProjects(prev => [...prev, newProject])
     closeCreate()
   }

  const updateProject = (id: string, name: string) => {
    setProjects(prev => prev.map(p => (p.id === id ? { ...p, name } : p)))
    closeRename()
  }

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id))
    closeDelete()
  }

  // Context value
  const value: ProjectContextType = {
    projects,
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
    setCreateName: setCreateNameHandler,
    openRename,
    closeRename,
    setRenameName: setRenameNameHandler,
    openDelete,
    closeDelete,
    addProject,
    updateProject,
    deleteProject,
  }

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  )
}

// Hook
export function useProjectStore() {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error("useProjectStore must be used within ProjectProvider")
  }
  return context
}
