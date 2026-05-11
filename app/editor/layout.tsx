"use client"

import { useState } from "react"
import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectSidebar } from "@/components/editor/project-sidebar"
import { CreateProjectDialog } from "@/components/editor/dialogs/create-project-dialog"
import { RenameProjectDialog } from "@/components/editor/dialogs/rename-project-dialog"
import { DeleteProjectDialog } from "@/components/editor/dialogs/delete-project-dialog"
import { ProjectProvider, useProjectStore } from "@/lib/use-project-store"

function EditorContent({ children }: { children: React.ReactNode }) {
  const {
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
    setCreateName,
    openRename,
    closeRename,
    setRenameName,
    openDelete,
    closeDelete,
    addProject,
    updateProject,
    deleteProject,
  } = useProjectStore()

  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Wrap handlers to call store actions
  const handleSubmitCreate = () => {
    if (createName.trim()) {
      addProject(createName, createSlug)
    }
  }

  const handleSubmitRename = () => {
    if (renameName.trim()) {
      updateProject(renameId, renameName)
    }
  }

  const handleSubmitDelete = () => {
    deleteProject(deleteId)
  }

  return (
    <div className="flex flex-col h-screen">
      <EditorNavbar onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <ProjectSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          projects={projects}
          onRename={openRename}
          onDelete={openDelete}
          onCreate={openCreate}
        />

        {/* Main content */}
        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>
      </div>

      {/* Dialogs */}
      <CreateProjectDialog
        open={createOpen}
        onClose={closeCreate}
        name={createName}
        slug={createSlug}
        onNameChange={setCreateName}
        onSubmit={handleSubmitCreate}
      />
      <RenameProjectDialog
        open={renameOpen}
        onClose={closeRename}
        name={renameName}
        onNameChange={setRenameName}
        onSubmit={handleSubmitRename}
      />
      <DeleteProjectDialog
        open={deleteOpen}
        onClose={closeDelete}
        projectName={deleteName}
        onSubmit={handleSubmitDelete}
      />
    </div>
  )
}

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProjectProvider>
      <EditorContent>{children}</EditorContent>
    </ProjectProvider>
  )
}
