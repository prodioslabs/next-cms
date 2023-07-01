import { z } from 'zod'
import { generateRouteHandlerSchemas } from '~/app/(cms)/cms/content/schema'
import cmsConfig from '~/cms.config'

const { deleteContentResponseSchema, deleteContentQueryParamsSchema } = generateRouteHandlerSchemas(cmsConfig)

export async function deleteCollectionItem({ id, elementIndex }: z.infer<typeof deleteContentQueryParamsSchema>) {
  const res = await fetch(`/cms/content?id=${id}&elementIndex=${elementIndex}`, {
    method: 'DELETE',
  })
  return deleteContentResponseSchema.parse(await res.json())
}
