"use client"

import { useState } from "react"
import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ServerSidebar } from "@/components/editor/server-sidebar"
import { CreateProjectDialog } from "@/components/editor/dialogs/create-project-dialog"
import { RenameProjectDialog } from "@/components/editor/dialogs/rename-project-dialog"
import { DeleteProjectDialog } from "@/components/editor/dialogs/delete-project-dialog"
import { useProjectActions } from "@/hooks/use-project-actions"
import { ProjectData } from "@/types/project"

interface EditorClientLayoutProps {
  ownedProjects: ProjectData[]
  sharedProjects: ProjectData[]
}

export function EditorClientLayout({
  ownedProjects,
  sharedProjects,
}: EditorClientLayoutProps) {
  const allProjects = [...ownedProjects, ...sharedProjects]

  const {
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
  } = useProjectActions(allProjects, {
    onProjectCreated: () => {},
    onProjectRenamed: () => {},
    onProjectDeleted: () => {},
  })

  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen">
      <EditorNavbar onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1 overflow-hidden">
        <ServerSidebar
          ownedProjects={ownedProjects}
          sharedProjects={sharedProjects}
          onCreate={openCreate}
          onRename={openRename}
          onDelete={openDelete}
        />

        <main className="flex-1 overflow-auto p-8">
          {/* Content area — page wrapper fills this */}
        </main>
      </div>

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