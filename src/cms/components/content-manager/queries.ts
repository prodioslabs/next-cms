import { API_BASE_URL, resolveUrl } from '~/lib/api'

/**
 * TODO: Validate the output
 */
export async function updateContent(
  input: (
    | { type: 'collection'; elementId: string; collectionName: string }
    | { type: 'singleton'; singletonName: string }
  ) & { data: any },
) {
  let body
  if (input.type === 'collection') {
    body = {
      type: input.type,
      collectionName: input.collectionName,
      data: input.data,
      elementId: input.elementId,
    }
  } else {
    body = {
      type: input.type,
      singletonName: input.singletonName,
      data: input.data,
    }
  }

  const res = await fetch(resolveUrl('/cms/content', API_BASE_URL), {
    method: 'POST',
    body: JSON.stringify(body),
  })

  return res.json()
}
