import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

/**
 * PATCH  /api/projects/[projectId]  — rename a project
 * DELETE /api/projects/[projectId]  — delete a project
 */

export async function PATCH(
  _req: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { projectId } = await params
  const body = await _req.json().catch(() => ({}))
  const name = (body.name as string)?.trim()

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 })
  }

  const project = await prisma.project.findUnique({
    where: { id: projectId },
  })

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 })
  }

  if (project.ownerId !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const updated = await prisma.project.update({
    where: { id: projectId },
    data: { name },
  })

  return NextResponse.json(updated)
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { projectId } = await params

  const project = await prisma.project.findUnique({
    where: { id: projectId },
  })

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 })
  }

  if (project.ownerId !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  await prisma.project.delete({
    where: { id: projectId },
  })

  return new NextResponse(null, { status: 204 })
}