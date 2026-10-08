import { getSettings } from "@/app/actions"
import AdminSettingsClient from "./AdminSettingsClient"

export default async function AdminSettingsPage() {
  const initialSettings = await getSettings()

  return (
    <AdminSettingsClient initialSettings={initialSettings} />
  )
}
