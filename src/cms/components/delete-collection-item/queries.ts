import { z } from 'zod'
import { generateRouteHandlerSchemas } from '~/app/(cms)/cms/content/schema'
import config from '~/cms.config'

const { deleteContentResponseSchema, deleteContentQueryParamsSchema } = generateRouteHandlerSchemas(config)

export async function deleteCollectionItem({ id, elementIndex }: z.infer<typeof deleteContentQueryParamsSchema>) {
  const res = await fetch(`/cms/content?id=${id}&elementIndex=${elementIndex}`, {
    method: 'DELETE',
  })
  return deleteContentResponseSchema.parse(await res.json())
}
