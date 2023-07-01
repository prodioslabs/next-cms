import { z } from 'zod'
import { Config } from '~/core/config'

export function generateRouteHandlerSchemas(config: Config) {
  const getContentQueryParamsSchema = z.union([
    z.object({
      type: z.literal('collection'),
      id: z.enum(Object.keys(config.collections) as [string, ...string[]]),
    }),
    z.object({
      type: z.literal('singleton'),
      id: z.enum(Object.keys(config.singletons) as [string, ...string[]]),
    }),
  ])

  const getContentResponseSchema = z.union([
    z.object({
      type: z.literal('collection'),
      data: z.array(z.any()),
    }),
    z.object({
      type: z.literal('singleton'),
      data: z.any(),
    }),
  ])

  const updateContentBodySchema = z.union([
    z.object({
      type: z.literal('collection'),
      elementIndex: z.number(),
      id: z.enum(Object.keys(config.collections) as [string, ...string[]]),
      data: z.any(),
    }),
    z.object({
      type: z.literal('singleton'),
      id: z.enum(Object.keys(config.singletons) as [string, ...string[]]),
      data: z.any(),
    }),
  ])

  // Right now the response schema is same as the body schema, but in future we might want to
  // change the response schema to be different from the body schema, to include additional props
  const updateContentResponseSchema = updateContentBodySchema

  return {
    // GET handler schemas
    getContentQueryParamsSchema,
    getContentResponseSchema,
    // POST handler schemas
    updateContentBodySchema,
    updateContentResponseSchema,
  }
}
