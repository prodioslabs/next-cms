import { z } from 'zod'
import { jsonSchema, objectId } from '../../../lib/validation'

export const getFolderContentSchema = z.object({
  id: objectId.optional(),
})

export const createFolderSchema = z.object({
  name: z.string().nonempty(),
  parent: objectId.optional(),
})

export const updateFolderSchema = createFolderSchema.partial().extend({
  id: objectId,
})

export const deleteFolderSchema = z.object({
  id: objectId,
})

export const createFileSchema = z.object({
  assetType: z.enum(['image', 'video']),
  mimeType: z.string().nonempty(),
  path: z.string().nonempty(),
  url: z.string().nonempty(),
  name: z.string().nonempty(),
  folder: objectId.optional(),
  size: z.number(),
  metadata: jsonSchema,
})

export const updateFileSchema = createFileSchema.partial().extend({
  id: objectId,
})

export const deleteFileSchema = z.object({
  id: objectId,
})
