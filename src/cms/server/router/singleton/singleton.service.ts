import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { PrismaClient } from '@prisma/client'
import { updateSingletonSchema } from './singleton.schema'
import { CMSConfig } from '~/cms/types/config'
import { updateSingleton as _updateSingleton } from '~/cms/core/data'

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
