import { z } from 'zod'
import { searchImageQueryParamsSchema, searchImageResponseSchema } from '../../api/schema'

export async function searchImage({ query, page = '1' }: z.infer<typeof searchImageQueryParamsSchema>) {
  const res = await fetch(`/cms/plugins/unsplash-image?query=${query}&page=${page}`, {
    method: 'GET',
  })
  return searchImageResponseSchema.parse(await res.json())
}
