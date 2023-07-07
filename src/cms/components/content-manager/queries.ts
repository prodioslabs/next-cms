import { CreateOrUpdateContentBodySchema } from '~/cms/api/schema'

/**
 * TODO: Validate the output
 */
export async function updateContent(input: CreateOrUpdateContentBodySchema) {
  const res = await fetch('/cms/content', {
    method: 'POST',
    body: JSON.stringify(input),
  })

  return res.json()
}
