import { prisma } from "@/lib/prisma"
import { ProjectData } from "@/types/project"
import { auth } from "@clerk/nextjs/server"

/**
 * Fetch projects for the current user (server-side).
 * Returns owned projects and shared (collaborated) projects.
 */
export async function fetchProjects(): Promise<{
  owned: ProjectData[]
  shared: ProjectData[]
}> {
  const { userId } = await auth()
  if (!userId) {
    return { owned: [], shared: [] }
  }

  const owned = await prisma.project.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "desc" },
  })

  const sharedProjects = await prisma.project.findMany({
    where: {
      collaborators: {
        some: { email: userId },
      },
      ownerId: { not: userId },
    },
    orderBy: { createdAt: "desc" },
  })

   return {
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     owned: owned.map((p: any) => ({
       id: p.id,
       name: p.name,
       slug: p.id,
       isOwner: true,
       description: p.description ?? undefined,
       status: p.status,
       ownerId: p.ownerId,
       canvasJsonPath: p.canvasJsonPath ?? undefined,
       createdAt: p.createdAt.toISOString(),
       updatedAt: p.updatedAt.toISOString(),
     })),
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     shared: sharedProjects.map((p: any) => ({
       id: p.id,
       name: p.name,
       slug: p.id,
       isOwner: false,
       description: p.description ?? undefined,
       status: p.status,
       ownerId: p.ownerId,
       canvasJsonPath: p.canvasJsonPath ?? undefined,
       createdAt: p.createdAt.toISOString(),
       updatedAt: p.updatedAt.toISOString(),
     })),
   }
}