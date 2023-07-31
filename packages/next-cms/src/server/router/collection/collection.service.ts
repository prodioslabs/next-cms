import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import {
  createCollectionElementSchema,
  deleteCollectionElementSchema,
  fetchCollectionElementsSchema,
  fetchCollectionElementByIdSchema,
  fetchCollectionElementBySlugSchema,
  updateCollectionElementSchema,
} from './collection.schema'
import { CMSConfig } from '../../../types/config'
import {
  createCollectionElement as _createCollectionElement,
  updateCollectionElementData as _updateCollectionElement,
  deleteCollectionElement as _deleteCollectionElement,
  fetchCollectionElements as _fetchCollectionElements,
  fetchCollectionElementById as _fetchCollectionElementById,
  fetchCollectionElementBySlug as _fetchCollectionElementBySlug,
} from '../../../core/data'
import { NotFoundError } from '../../../core/error'

export function fetchCollectionElements(
  input: z.infer<typeof fetchCollectionElementsSchema>,
  config: CMSConfig<any, any>,
  prisma: PrismaClient,
) {
  const { collectionName } = input

  if (!(collectionName in config.collections)) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `Collection ${collectionName} not found`,
    })
  }

  const collection = config.collections[collectionName]
  return _fetchCollectionElements(collection, collectionName, prisma)
}

export function fetchCollectionElementById(
  input: z.infer<typeof fetchCollectionElementByIdSchema>,
  config: CMSConfig<any, any>,
  prisma: PrismaClient,
) {
  const { collectionName, elementId } = input

  if (!(collectionName in config.collections)) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `Collection ${collectionName} not found`,
    })
  }

  const collection = config.collections[collectionName]
  try {
    return _fetchCollectionElementById(collection, elementId, prisma)
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: error.message,
      })
    }
    throw error
  }
}

export function fetchCollectionElementBySlug(
  input: z.infer<typeof fetchCollectionElementBySlugSchema>,
  config: CMSConfig<any, any>,
  prisma: PrismaClient,
) {
  const { collectionName, slug } = input

  if (!(collectionName in config.collections)) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `Collection ${collectionName} not found`,
    })
  }

  const collection = config.collections[collectionName]
  try {
    return _fetchCollectionElementBySlug(collection, collectionName, slug, prisma)
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: error.message,
      })
    }
    throw error
  }
}

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
