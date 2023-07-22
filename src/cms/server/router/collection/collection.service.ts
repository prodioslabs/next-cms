import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import {
  createCollectionElementSchema,
  deleteCollectionElementSchema,
  updateCollectionElementSchema,
} from './collection.schema'
import { CMSConfig } from '~/cms/types/config'
import {
  createCollectionElement as _createCollectionElement,
  updateCollectionElementData as _updateCollectionElement,
  deleteCollectionElement as _deleteCollectionElement,
} from '~/cms/core/data'

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
  return _createCollectionElement(collection, collectionName, data, prisma)
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
  return _updateCollectionElement(collection, elementId, data, prisma)
}

export function deleteCollectionElement(input: z.infer<typeof deleteCollectionElementSchema>, prisma: PrismaClient) {
  const { elementId } = input
  return _deleteCollectionElement(elementId, prisma)
}
