import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { PrismaClient } from '@prisma/client'
import { updateSingletonSchema } from './singleton.schema'
import { CMSConfig } from '~/cms/types/config'
import { getValidationSchemaForSingleton } from '~/cms/core/validation'

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
  const validationSchema = getValidationSchemaForSingleton(singleton)
  const validatedData = validationSchema.parse(data)
  return prisma.singleton.update({
    where: {
      name: singletonName,
    },
    data: {
      data: validatedData,
    },
  })
}
