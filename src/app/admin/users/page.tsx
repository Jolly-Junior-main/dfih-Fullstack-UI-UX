import { getUsers } from "@/app/actions"
import AdminUsersClient from "./AdminUsersClient"

export default async function AdminUsersPage() {
  const initialUsers = await getUsers()

  return (
    <AdminUsersClient initialUsers={initialUsers} />
  )
}
