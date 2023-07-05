import { CreateOrUpdateContentBodySchema } from '~/cms/api/schema'
import { API_BASE_URL, resolveUrl } from '~/lib/api'

/**
 * TODO: Validate the output
 */
export async function updateContent(
  input: CreateOrUpdateContentBodySchema,
) {
  const res = await fetch(resolveUrl('/cms/content', API_BASE_URL), {
    method: 'POST',
    body: JSON.stringify(input),
  })

  return res.json()
}
