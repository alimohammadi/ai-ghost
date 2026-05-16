import "dotenv/config"
import { PrismaClient } from "@/prisma/app/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

function getPrismaClient() {
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Ensure it is defined in .env.local or .env"
    )
  }

  if (url.startsWith("prisma+postgres://")) {
    return new PrismaClient({ accelerateUrl: url })
  }

  return new PrismaClient({ adapter: new PrismaPg(url) })
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? getPrismaClient()

if (process.env.NODE_ENV === "development") {
  globalForPrisma.prisma = prisma
}