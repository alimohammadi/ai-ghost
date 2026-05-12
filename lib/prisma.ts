import { PrismaClient } from "@prisma/client"
import { PrismaPostgres } from "@prisma/postgres"
import { withAccelerate } from "@prisma/client/accelerate"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? (() => {
  const connectionString = process.env.DATABASE_URL || ""

  // Use Accelerate if DATABASE_URL starts with "prisma+postgres://"
  if (connectionString.startsWith("prisma+postgres://")) {
    const prismaPostgres = new PrismaPostgres({
      connectionString,
    })
    const client = prismaPostgres.$extends(withAccelerate())
    return client
  }

  // Otherwise use direct @prisma/adapter-pg with pg
  // The PrismaClient will automatically use the connection string from env
  return new PrismaClient()
})()

if (process.env.NODE_ENV === "development") {
  globalForPrisma.prisma = prisma
}
