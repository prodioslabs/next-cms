import { z } from 'zod'
import { Config } from '../types/config'
import { Field } from '../types/field'
import { Collection, Singleton } from '../types/schema'

export function createRouteSchema<
  Collections extends Record<string, Collection<Record<string, Field>>>,
  Singletons extends Record<string, Singleton<Record<string, Field>>>,
>(config: Config<Collections, Singletons>) {
  const updateContentBodySchema = z.union([
    z.object({
      type: z.literal('collection'),
      elementId: z.string(),
      collectionName: z.enum(Object.keys(config.collections ?? {}) as [string, ...string[]]),
      data: z.any(),
    }),
    z.object({
      type: z.literal('singleton'),
      singletonName: z.enum(Object.keys(config.singletons ?? {}) as [string, ...string[]]),
      data: z.any(),
    }),
  ])

  // Right now the response schema is same as the body schema, but in future we might want to
  // change the response schema to be different from the body schema, to include additional props
  const updateContentResponseSchema = updateContentBodySchema

  const deleteCollectionElementQuerySchema = z.object({
    id: z.string(),
  })

  const deleteCollectionElementResponseSchema = deleteCollectionElementQuerySchema

  return {
    // POST method schema
    updateContentBodySchema,
    updateContentResponseSchema,
    // DELETE method schema
    deleteCollectionElementQuerySchema,
    deleteCollectionElementResponseSchema,
  }
}

export const uploadImageResponseSchema = z.object({
  url: z.string().min(1),
  width: z.number(),
  height: z.number(),
  type: z.string().min(1),
})
