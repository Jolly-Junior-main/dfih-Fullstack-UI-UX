"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

// Content Actions
export async function getContent() {
  return await prisma.content.findMany({ orderBy: { id: 'desc' } })
}

export async function addContent(data: { title: string; type: string; author: string; status: string; date: string }) {
  await prisma.content.create({ data })
  revalidatePath("/admin/content")
}

export async function deleteContent(id: number) {
  await prisma.content.delete({ where: { id } })
  revalidatePath("/admin/content")
}

// Category Actions
export async function getCategories() {
  return await prisma.category.findMany({ orderBy: { id: 'desc' } })
}

export async function addCategory(data: { name: string; count: number; status: string }) {
  await prisma.category.create({ data })
  revalidatePath("/admin/categories")
}

export async function deleteCategory(id: number) {
  await prisma.category.delete({ where: { id } })
  revalidatePath("/admin/categories")
}

// User Actions
export async function getUsers() {
  return await prisma.user.findMany({ orderBy: { id: 'desc' } })
}

export async function addUser(data: { name: string; email: string; role: string; status: string; lastActive: string }) {
  await prisma.user.create({ data })
  revalidatePath("/admin/users")
}

export async function deleteUser(id: number) {
  await prisma.user.delete({ where: { id } })
  revalidatePath("/admin/users")
}

// Settings Actions
export async function getSettings() {
  let settings = await prisma.setting.findFirst()
  if (!settings) {
    settings = await prisma.setting.create({
      data: {
        siteName: "Digital Forestry Information Hub",
        supportEmail: "support@forestryinfohub.org",
        description: "A centralized platform for forestry data, research, and collaborative networking.",
        maintenanceMode: false
      }
    })
  }
  return settings
}

export async function updateSettings(data: { siteName: string; supportEmail: string; description: string; maintenanceMode: boolean }) {
  const settings = await getSettings()
  await prisma.setting.update({
    where: { id: settings.id },
    data
  })
  revalidatePath("/admin/settings")
}
