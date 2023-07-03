import { Field } from '../types/field'
import { Collection, CollectionData, Singleton, SingletonData } from '../types/schema'
import { prisma } from './db'

// TODO: Add data fixing
// TODO: Add data validation before submitting
export async function fetchCollectionsListData<_Collection extends Collection<Record<string, Field>>>(
  collection: _Collection,
) {
  try {
    const data = await prisma.collectionElement.findMany({
      where: {
        collection: {
          name: collection.label,
        },
      },
    })
    return data.map((item) => item.data) as CollectionData<_Collection>[]
  } catch (error) {
    return []
  }
}

// TODO: Add data fixing
// TODO: Add data validation
export async function fetchCollectionElementData<_Collection extends Collection<Record<string, Field>>>(
  collection: _Collection,
  elementSlug: string,
) {
  const data = await prisma.collectionElement.findFirst({
    where: {
      slug: elementSlug,
      collection: {
        name: collection.label,
      },
    },
  })
  return data?.data as CollectionData<_Collection>
}

// TODO: Add data fixing
// TODO: Add data validation
export async function fetchSingletonData<_Singleton extends Singleton<Record<string, Field>>>(singleton: _Singleton) {
  const data = await prisma.singleton.findFirst({
    where: {
      name: singleton.label,
    },
  })
  return data?.data as SingletonData<_Singleton>
}
