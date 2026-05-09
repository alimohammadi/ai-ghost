"use client"

import { useState } from "react"
import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectSidebar } from "@/components/editor/project-sidebar"

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="h-screen bg-background">
      {/* Fixed navbar */}
      <EditorNavbar onSidebarToggle={setSidebarOpen} />

      {/* Floating sidebar */}
      <ProjectSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area with navbar offset */}
      <main className="pt-16 h-[calc(100vh-4rem)] overflow-auto">
        {children}
      </main>
    </div>
  )
}
