import { TRPCError, initTRPC } from '@trpc/server'
import superjson from 'superjson'
import { ZodError } from 'zod'
import { type Session } from 'next-auth'
import { type PrismaClient } from '@prisma/client'
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import { type CMSConfig } from '@nextjs-cms/core'

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

export const createRouter = trpc.router

export const publicProcedure = trpc.procedure

const enforceUserIsAuthenticated = trpc.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  })
})
export const protectedProcedure = trpc.procedure.use(enforceUserIsAuthenticated)
