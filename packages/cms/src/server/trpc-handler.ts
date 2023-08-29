import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { getServerSession } from 'next-auth'
import type { CMSConfig } from '@nextjs-cms/core'
import { prisma } from '@nextjs-cms/core'
import { CreateContext } from './trpc'
import { router } from './router'
import { authOptions } from './auth-handler'

export function createTRPCHandler(config: CMSConfig<any, any>) {
  const createContext: CreateContext = async () => {
    const session = await getServerSession(authOptions)

    return {
      config,
      prisma,
      session,
    }
  }

  return function handler(request: Request) {
    return fetchRequestHandler({
      endpoint: '/cms/api/trpc',
      req: request,
      router,
      createContext,
    })
  }
}
