import { PrismaClient } from '@prisma/client'
import { env } from './env'
export type {
  Collection,
  CollectionElement,
  File,
  Folder,
  Prisma,
  PrismaClient,
  Singleton,
  SingletonData,
} from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

let prisma: PrismaClient

if (typeof window === 'undefined' && env.NEXT_RUNTIME === 'nodejs') {
  prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
      log: env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    })

  if (env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
  }
}

export { prisma }
