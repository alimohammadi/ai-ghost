import { fetchProjects } from "@/lib/fetch-projects"
import { EditorClientLayout } from "./client-layout"

export default async function EditorPage() {
  const { owned, shared } = await fetchProjects()

  return (
    <EditorClientLayout
      ownedProjects={owned}
      sharedProjects={shared}
    />
  )
}