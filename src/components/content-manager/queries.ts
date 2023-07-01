import { z } from 'zod'
import { generateRouteHandlerSchemas } from '~/app/(cms)/cms/content/schema'
import cmsConfig from '~/cms.config'
import { API_BASE_URL, resolveUrl } from '~/lib/api'

const { updateContentResponseSchema, updateContentBodySchema } = generateRouteHandlerSchemas(cmsConfig)

export async function updateContent(input: z.infer<typeof updateContentBodySchema>) {
  let body
  if (input.type === 'collection') {
    body = {
      type: input.type,
      id: input.id,
      data: input.data,
      elementIndex: input.elementIndex,
    }
  } else {
    body = {
      type: input.type,
      id: input.id,
      data: input.data,
    }
  }

  const res = await fetch(resolveUrl('/cms/content', API_BASE_URL), {
    method: 'POST',
    body: JSON.stringify(body),
  })
  return updateContentResponseSchema.parse(await res.json())
}
