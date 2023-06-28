import { NextResponse } from 'next/server'
import { z } from 'zod'
import cmsConfig from '~/cms.config'
import { Collection } from '~/core'
import { CollectionData, getCollectionData, getSingletonData } from '~/core/collection'

export const queryValidationSchema = z.object({
  type: z.enum(['collection', 'singleton']),
  id: z.string().min(1),
})

export const responseSchema = z.union([
  z.object({
    type: z.literal('collection'),
    data: z.array(z.any()),
  }),
  z.object({
    type: z.literal('singleton'),
    data: z.any(),
  }),
])

type CollectionContentResponse<C extends Collection> = {
  type: 'collection'
  data: CollectionData<C>[]
}
type SingletonContentResponse<C extends Collection> = {
  type: 'singleton'
  data: CollectionData<C>
}
export type ContentResponse<C extends Collection> = CollectionContentResponse<C> | SingletonContentResponse<C>

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  try {
    const { type, id } = queryValidationSchema.parse({ type: searchParams.get('type'), id: searchParams.get('id') })
    if (type === 'collection') {
      if (id in cmsConfig.collections) {
        const data = await getCollectionData(cmsConfig.collections[id as keyof typeof cmsConfig.collections])
        return NextResponse.json({ type: 'collection', data })
      }
      return NextResponse.json({ error: `Collection ${id} not found` }, { status: 404 })
    }
    if (type === 'singleton') {
      if (id in cmsConfig.singletons) {
        const data = await getSingletonData(cmsConfig.singletons[id as keyof typeof cmsConfig.singletons])
        return NextResponse.json({ type: 'singleton', data })
      }
      return NextResponse.json({ error: `Singleton ${id} not found` }, { status: 404 })
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 422 })
    }
    throw error
  }
}
