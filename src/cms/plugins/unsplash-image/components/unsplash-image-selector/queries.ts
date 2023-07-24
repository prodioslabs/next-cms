import { z } from 'zod'
import axios from 'axios'
import { searchImageQueryParamsSchema, searchImageResponseSchema } from '../../api/schema'

export async function searchImage({ query, page = '1' }: z.infer<typeof searchImageQueryParamsSchema>) {
  const { data } = await axios.get('/cms/plugins/unsplash-image', {
    params: {
      query,
      page,
    },
  })
  return searchImageResponseSchema.parse(data)
}
