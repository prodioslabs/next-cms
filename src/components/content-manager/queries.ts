import { generateRouteHandlerSchemas } from '~/app/(cms)/cms/content/schema'
import cmsConfig from '~/cms.config'
import { resolveUrl } from '~/lib/api'

const { updateContentResponseSchema } = generateRouteHandlerSchemas(cmsConfig)

export async function updateContent({ type, id, data }: { type: 'singleton' | 'collection'; id: string; data: any }) {
  const res = await fetch(resolveUrl('/cms/content'), { method: 'POST', body: JSON.stringify({ type, id, data }) })
  return updateContentResponseSchema.parse(await res.json())
}
