import { NextResponse } from 'next/server'
import { CMSField } from '~/cms/types/field'
import { CMSCollection } from '~/cms/types/schema'
import { handleError } from '~/cms/utils/api'
import { createCollectionElementBodySchema } from './schema'
import { createCollectionElement } from '~/cms/core/data'

export function createCreateCollectionItemAPI<
  CMSCollections extends Record<string, CMSCollection<Record<string, CMSField>>>,
>(collections: CMSCollections) {
  return async function createCollectionItemAPI(request: Request) {
    try {
      const { collectionName, data } = createCollectionElementBodySchema.parse(await request.json())

      if (!(collectionName in collections)) {
        return NextResponse.json({ message: `Collection ${collectionName} not found` }, { status: 404 })
      }

      const collection = collections[collectionName]
      await createCollectionElement(collection, collectionName, data)
      return NextResponse.json({ type: 'collection', collectionName, data })
    } catch (error) {
      return handleError(error)
    }
  }
}
