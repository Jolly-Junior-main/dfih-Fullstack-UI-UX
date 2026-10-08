import { getContent } from "@/app/actions"
import AdminContentClient from "./AdminContentClient"

export default async function AdminContentPage() {
  const initialContent = await getContent()
  
  return (
    <AdminContentClient initialContent={initialContent} />
  )
}
