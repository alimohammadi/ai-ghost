import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/**
 * GET  /api/projects  — list current user's projects
 * POST /api/projects  — create a project
 */

export async function GET() {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const projects = await prisma.project.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "desc" },
    include: {
      collaborators: {
        select: { email: true, createdAt: true },
      },
    },
  });

  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}));
  const name = (body.name as string)?.trim() || "Untitled Project";

  const project = await prisma.project.create({
    data: {
      ownerId: userId,
      name,
      status: "DRAFT",
    },
  });

  return NextResponse.json(project, { status: 201 });
}
