import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { getServerSession } from 'next-auth'
import { CMSConfig } from '../types/config'
import { CreateContext } from './trpc'
import { prisma } from '../core/db'
import { authOptions } from '../core/auth'
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
