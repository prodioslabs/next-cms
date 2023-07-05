import { NextResponse } from 'next/server'
import { prisma } from '~/cms/core/db'
import { deleteCollectionItemParamSchema } from './schema'
import { handleError } from '~/cms/utils/api'

/**
 * DELETE /cms/content
 *
 * Method to delete the element of a collection
 */
export async function deleteCollectionItem(request: Request) {
  const { searchParams } = new URL(request.url)

  try {
    const { elementId } = deleteCollectionItemParamSchema.parse({
      id: Number.parseInt(searchParams.get('id') as string),
    })

    await prisma.collectionElement.delete({
      where: {
        id: elementId,
      },
    })

    return NextResponse.json({ elementId, type: 'collection' })
  } catch (error) {
    handleError(error)
  }
}
