type Status = "DRAFT" | "ARCHIVED"

export interface ProjectData {
  id: string
  name: string
  slug: string
  isOwner: boolean
  description?: string | null
  status: Status
  ownerId: string
  canvasJsonPath?: string | null
  createdAt: string
  updatedAt: string
}

// Backward-compatible alias for existing components that import Project
export type Project = ProjectData