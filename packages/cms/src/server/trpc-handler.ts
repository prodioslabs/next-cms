import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { getServerSession, authOptions } from '@nextjs-cms/auth'
import type { CMSConfig } from '@nextjs-cms/core'
import { prisma } from '@nextjs-cms/core'

import { CreateContext } from './trpc'
import { router } from './router'

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
