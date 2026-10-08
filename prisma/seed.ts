import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.content.createMany({
    data: [
      { title: "Global Forest Watch Dataset 2026", type: "Dataset", author: "j.doe", status: "Published", date: "Oct 8, 2026" },
      { title: "Amazon Canopy Height Map", type: "Map", author: "m.smith", status: "Draft", date: "Oct 7, 2026" },
      { title: "Deforestation Rates in Southeast Asia", type: "Report", author: "a.lee", status: "Published", date: "Oct 6, 2026" },
      { title: "Reforestation Project Guidelines", type: "Document", author: "admin", status: "Archived", date: "Oct 1, 2026" },
      { title: "Boreal Forest Carbon Sink Analysis", type: "Dataset", author: "c.davis", status: "Published", date: "Sep 28, 2026" },
    ]
  })

  await prisma.category.createMany({
    data: [
      { name: "Datasets", count: 423, status: "Active" },
      { name: "Maps & Imagery", count: 156, status: "Active" },
      { name: "Policy Documents", count: 89, status: "Active" },
      { name: "Climate Reports", count: 212, status: "Active" },
      { name: "Historical Archives", count: 45, status: "Hidden" },
    ]
  })

  await prisma.user.createMany({
    data: [
      { name: "Alice Johnson", email: "alice@example.com", role: "Administrator", status: "Active", lastActive: "Just now" },
      { name: "Bob Smith", email: "bob@forestry.org", role: "Reviewer", status: "Active", lastActive: "2 hours ago" },
      { name: "Charlie Davis", email: "charlie@university.edu", role: "Contributor", status: "Pending", lastActive: "Never" },
      { name: "Diana Prince", email: "diana@ngo.org", role: "Contributor", status: "Active", lastActive: "1 day ago" },
      { name: "Evan Wright", email: "evan@example.com", role: "Reviewer", status: "Suspended", lastActive: "3 weeks ago" },
    ]
  })

  await prisma.setting.create({
    data: {
      siteName: "Digital Forestry Information Hub",
      supportEmail: "support@forestryinfohub.org",
      description: "A centralized platform for forestry data, research, and collaborative networking.",
      maintenanceMode: false
    }
  })

  console.log("Database seeded successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
