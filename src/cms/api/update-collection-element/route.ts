import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { CMSField } from '~/cms/types/field'
import { CMSCollection } from '~/cms/types/schema'
import { handleError } from '~/cms/utils/api'
import { UpdateCollectionElementBodySchema } from './schema'
import { updateCollectionElementData } from '~/cms/core/data'

export function createUpdateCollectionItemAPI<
  CMSCollections extends Record<string, CMSCollection<Record<string, CMSField>>>,
>(collections: CMSCollections) {
  return async function updateCollectionItemAPI(input: UpdateCollectionElementBodySchema) {
    try {
      const { collectionName, elementId, data } = input

      if (!(collectionName in collections)) {
        return NextResponse.json({ message: `Collection ${collectionName} not found` }, { status: 404 })
      }

      const collection = collections[collectionName]
      await updateCollectionElementData(collection, elementId, data)

      // revalidate path
      revalidatePath('/cms/admin/[[...slug]]')

      return NextResponse.json({ type: 'collection', collectionName, elementId, data })
    } catch (error) {
      return handleError(error)
    }
  }
}
