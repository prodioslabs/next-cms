import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { CMSField } from '~/cms/types/field'
import { CMSCollection } from '~/cms/types/schema'
import { handleError } from '~/cms/utils/api'
import { CreateCollectionElementBodySchema } from './schema'
import { createCollectionElement } from '~/cms/core/data'

export function createCreateCollectionItemAPI<
  CMSCollections extends Record<string, CMSCollection<Record<string, CMSField>>>,
>(collections: CMSCollections) {
  return async function createCollectionItemAPI(input: CreateCollectionElementBodySchema) {
    try {
      const { collectionName, data } = input

      if (!(collectionName in collections)) {
        return NextResponse.json({ message: `Collection ${collectionName} not found` }, { status: 404 })
      }

      const collection = collections[collectionName]
      await createCollectionElement(collection, collectionName, data)

      // revalidate path
      revalidatePath('/cms/admin/[[...slug]]')

      return NextResponse.json({ type: 'collection', collectionName, data })
    } catch (error) {
      return handleError(error)
    }
  }
}
