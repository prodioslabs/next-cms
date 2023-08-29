import { createApi } from 'unsplash-js'
import { NextResponse } from 'next/server'
import { handleError } from '../../../utils/api'
import { searchImageQueryParamsSchema } from './schema'
import { env } from '../../../env'

export async function searchImage(request: Request) {
  const unsplash = createApi({ accessKey: env.UNSPLASH_ACCESS_KEY! })
  try {
    const url = new URL(request.url)
    const { query, page = '1' } = searchImageQueryParamsSchema.parse({
      query: url.searchParams.get('query'),
      page: url.searchParams.get('page'),
    })
    const { response } = await unsplash.search.getPhotos({
      query,
      perPage: 40,
      page: Number.parseInt(page, 10),
    })
    return NextResponse.json({
      photos: response,
    })
  } catch (error) {
    return handleError(error)
  }
}
