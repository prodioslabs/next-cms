import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import {
  createCollectionElementSchema,
  deleteCollectionElementSchema,
  updateCollectionElementSchema,
} from './collection.schema'
import { CMSConfig } from '~/cms/types/config'
import { getValidationSchemaForCollectionElement } from '~/cms/core/validation'

export function createCollectionElement(
  input: z.infer<typeof createCollectionElementSchema>,
  config: CMSConfig<any, any>,
  prisma: PrismaClient,
) {
  const { collectionName, data } = input

  if (!(collectionName in config.collections)) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `Collection ${collectionName} not found`,
    })
  }

  const collection = config.collections[collectionName]
  const validationSchema = getValidationSchemaForCollectionElement(collection)
  const validatedData = validationSchema.parse(data) as Record<string, any>
  const slug = validatedData[collection.slugField] as string
  return prisma.collectionElement.create({
    data: {
      slug,
      data: validatedData,
      collection: {
        connect: {
          name: collectionName,
        },
      },
    },
  })
}

export function updateCollectionElement(
  input: z.infer<typeof updateCollectionElementSchema>,
  config: CMSConfig<any, any>,
  prisma: PrismaClient,
) {
  const { collectionName, elementId, data } = input

  if (!(collectionName in config.collections)) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `Collection ${collectionName} not found`,
    })
  }

  const collection = config.collections[collectionName]
  const validationSchema = getValidationSchemaForCollectionElement(collection)
  const validatedData = validationSchema.parse(data) as Record<string, any>
  const slug = validatedData[collection.slugField] as string
  return prisma.collectionElement.update({
    where: {
      id: elementId,
    },
    data: {
      data: validatedData,
      slug,
    },
  })
}

export function deleteCollectionElement(input: z.infer<typeof deleteCollectionElementSchema>, prisma: PrismaClient) {
  const { elementId } = input
  return prisma.collectionElement.delete({
    where: {
      id: elementId,
    },
  })
}
