import { CreateNextContextOptions, createNextApiHandler } from '@trpc/server/adapters/next'
import { initTRPC } from '@trpc/server'
import superjson from 'superjson'
import { ZodError } from 'zod'
import { getServerSession } from 'next-auth'
import { CMSConfig } from '../types/config'
import { prisma } from '../core/db'
import { authOptions } from '../core/auth'

// TODO: Check if any, any can work or not
export function createTRPCHandler(config: CMSConfig<any, any>) {
  async function createContext(opts: CreateNextContextOptions) {
    const { req, res } = opts

    // get auth session
    const session = await getServerSession(req, res, authOptions)

    return {
      config,
      prisma,
      session,
    }
  }

  const trpc = initTRPC.context<typeof createContext>().create({
    transformer: superjson,
    errorFormatter({ shape, error }) {
      return {
        ...shape,
        data: {
          ...shape.data,
          zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
        },
      }
    },
  })

  return createNextApiHandler({
    router: trpc.router({}),
    createContext,
  })
}
