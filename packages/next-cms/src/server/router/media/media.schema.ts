import { z } from 'zod'
import { objectId } from '../../../utils/validation'

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
  name: z.string().nonempty(),
  path: z.string().nonempty(),
  folder: objectId.optional(),
})

export const updateFileSchema = createFileSchema.partial().extend({
  id: objectId,
})

export const deleteFileSchema = z.object({
  id: objectId,
})
