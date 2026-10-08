import { getCategories } from "@/app/actions"
import AdminCategoriesClient from "./AdminCategoriesClient"

export default async function AdminCategoriesPage() {
  const initialCategories = await getCategories()

  return (
    <AdminCategoriesClient initialCategories={initialCategories} />
  )
}
