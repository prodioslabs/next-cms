import { initTRPC } from '@trpc/server'
import superjson from 'superjson'
import { ZodError } from 'zod'
import { type Session } from 'next-auth'
import { type PrismaClient } from '@prisma/client'
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import { type CMSConfig } from '../types/config'

export type CreateContext = (opts: FetchCreateContextFnOptions) => Promise<{
  config: CMSConfig<any, any>
  prisma: PrismaClient
  session: Session | null
}>

export const trpc = initTRPC.context<CreateContext>().create({
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
