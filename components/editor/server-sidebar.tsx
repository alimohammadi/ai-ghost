import { Plus, FileText, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { ProjectData } from "@/types/project"

interface ServerSidebarProps {
  ownedProjects: ProjectData[]
  sharedProjects: ProjectData[]
  onCreate: () => void
  onRename: (project: ProjectData) => void
  onDelete: (project: ProjectData) => void
}

/**
 * Server-rendered sidebar that receives pre-fetched project data.
 * Action handlers (onRename/onDelete) bubble up to the client layout
 * which orchestrates dialog state and API calls.
 */
export function ServerSidebar({
  ownedProjects,
  sharedProjects,
  onCreate,
  onRename,
  onDelete,
}: ServerSidebarProps) {
  return (
    <aside
      className="fixed left-0 top-0 bottom-0 w-64 z-40 bg-background border-r border-border flex flex-col"
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-border">
        <h2 className="text-lg font-semibold">Projects</h2>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col p-4">
        <Tabs defaultValue="my-projects" className="flex flex-col h-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="my-projects">My Projects</TabsTrigger>
            <TabsTrigger value="shared">Shared</TabsTrigger>
          </TabsList>

          <TabsContent value="my-projects" className="flex-1 overflow-y-auto -mx-4 px-4 space-y-1">
            {ownedProjects.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">No projects yet</p>
              </div>
            ) : (
              ownedProjects.map((project) => (
                <div
                  key={project.id}
                  className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <button className="flex-1 flex items-center gap-2 text-left min-w-0">
                    <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="truncate">{project.name}</span>
                  </button>
                  <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onRename(project)}
                      title="Rename"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => onDelete(project)}
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="shared" className="flex-1 overflow-y-auto -mx-4 px-4 space-y-1">
            {sharedProjects.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">No shared projects</p>
              </div>
            ) : (
              sharedProjects.map((project) => (
                <div
                  key={project.id}
                  className="group flex items-center rounded-lg px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <button className="flex-1 flex items-center gap-2 text-left">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{project.name}</span>
                  </button>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>

      <div className="p-4 border-t border-border">
        <Button variant="default" size="default" className="w-full" onClick={onCreate}>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>
    </aside>
  )
}