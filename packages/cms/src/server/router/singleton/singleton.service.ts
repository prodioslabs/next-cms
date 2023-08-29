import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { PrismaClient, updateSingleton as _updateSingleton, fetchSingleton as _fetchSingleton } from '@nextjs-cms/core'
import type { CMSConfig } from '@nextjs-cms/core'
import { fetchSingletonSchema, updateSingletonSchema } from './singleton.schema'

export function fetchSingleton(
  input: z.infer<typeof fetchSingletonSchema>,
  config: CMSConfig<any, any>,
  prisma: PrismaClient,
) {
  const { singletonName } = input
  if (!(singletonName in config.singletons)) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `Singleton ${singletonName} not found`,
    })
  }

  const singleton = config.singletons[singletonName]
  return _fetchSingleton(singleton, singletonName, prisma)
}

export function updateSingleton(
  input: z.infer<typeof updateSingletonSchema>,
  config: CMSConfig<any, any>,
  prisma: PrismaClient,
) {
  const { singletonName, data } = input
  if (!(singletonName in config.singletons)) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `Singleton ${singletonName} not found`,
    })
  }

  const singleton = config.singletons[singletonName]
  return _updateSingleton(singleton, singletonName, data, prisma)
}
