import { z } from 'zod'
import { CollectionElement } from '@prisma/client'
import { Field } from '../types/field'
import { Collection, Singleton } from '../types/schema'
import { prisma } from './db'
import { getValidationForCollectionElement, getValidationSchemaForSingleton } from './validation'
import { fixData, generateDummyData } from './fix-data'

/**
 * Update data of a particular collection element
 *
 * @param collection collection to be updated
 * @param id id of the collection item to be updated
 * @param data data to be updated
 * @returns updated collection element
 */
export async function updateCollectionItemData<_Collection extends Collection<Record<string, Field>>>(
  collection: _Collection,
  id: string,
  data: any,
) {
  const validationSchema = getValidationForCollectionElement(collection)
  const validatedData = validationSchema.parse(data)
  return prisma.collectionElement.update({
    where: {
      id,
    },
    data: {
      data: validatedData,
    },
  })
}

/**
 * Update data of a particular collection element
 *
 * @param collection collection to be updated
 * @param id id of the collection item to be updated
 * @param data data to be updated
 * @returns updated collection element
 */
export async function createCollectionItem<_Collection extends Collection<Record<string, Field>>>(
  collection: _Collection,
  collectionName: string,
  data: any,
) {
  const validationSchema = getValidationForCollectionElement(collection)
  const validatedData = validationSchema.parse(data)
  const slug = validatedData[collection.slugField] as string
  return prisma.collectionElement.create({
    data: {
      slug,
      data: validatedData,
      collection: {
        connect: {
          name: collectionName,
        },
      },
    },
  })
}

/**
 * Fetch all the collection elements for a particular collection. This also validates the data of all the collection items
 * and if the data is not valid, it fixes the data and updates the collection item.
 *
 * @param collection collection to be fetched
 * @param collectionName name of the collection
 * @returns list of all the elements of the collection
 */
export async function fetchCollectionsListData<_Collection extends Collection<Record<string, Field>>>(
  collection: _Collection,
  collectionName: string,
) {
  const validationSchema = getValidationForCollectionElement(collection)
  const data = await prisma.collectionElement.findMany({
    where: {
      collection: {
        name: collectionName,
      },
    },
  })
  const finalData: CollectionElement[] = []
  for (const item of data) {
    try {
      const validatedData = validationSchema.parse(item.data)
      finalData.push({ ...item, data: validatedData })
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fixedData = fixData(collection.schema, item.data, error)
        await updateCollectionItemData(collection, item.id, fixedData)
        finalData.push({ ...item, data: fixedData })
      } else {
        throw error
      }
    }
  }
  return finalData
}

/**
 * Fetch a particular collection element by id. This also validates the data of the collection
 * and if the data is not valid, it fixes the data and updates the collection item.
 *
 * @param collection collection whose collection item is to fetched
 * @param elementId id of the collection item to be fetched
 * @returns collection item
 */
export async function fetchCollectionElementDataById<_Collection extends Collection<Record<string, Field>>>(
  collection: _Collection,
  elementId: string,
) {
  const validationSchema = getValidationForCollectionElement(collection)
  const item = await prisma.collectionElement.findFirst({
    where: {
      id: elementId,
    },
  })
  if (!item) {
    throw new Error(`Element with id ${elementId} not found in collection ${collection.label}`)
  }
  try {
    const validatedData = validationSchema.parse(item.data)
    return { ...item, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fixedData = fixData(collection.schema, item.data, error)
      await updateCollectionItemData(collection, item.id, fixedData)
      return { ...item, data: fixedData }
    } else {
      throw error
    }
  }
}

/**
 * Fetch a particular collection element by slug. This also validates the data of the collection
 * and if the data is not valid, it fixes the data and updates the collection item.
 *
 * @param collection collection whose collection item is to fetched
 * @param collectionName name of the collection
 * @param elementSlug slug of the collection item to be fetched
 * @returns collection element
 */
export async function fetchCollectionElementDataBySlug<_Collection extends Collection<Record<string, Field>>>(
  collection: _Collection,
  collectionName: string,
  elementSlug: string,
) {
  const validationSchema = getValidationForCollectionElement(collection)
  const item = await prisma.collectionElement.findFirst({
    where: {
      slug: elementSlug,
      collection: {
        name: collectionName,
      },
    },
  })

  if (!item) {
    throw new Error(`Element with slug ${elementSlug} not found in collection ${collection.label}`)
  }

  try {
    const validatedData = validationSchema.parse(item.data)
    return { ...item, data: validatedData } as CollectionElement
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fixedData = fixData(collection.schema, item.data, error)
      await updateCollectionItemData(collection, item.id, fixedData)
      return { ...item, data: fixedData }
    } else {
      throw error
    }
  }
}

/**
 * Update data of a particular singleton
 *
 * @param singleton singleton to be updated
 * @param singletonName name of the singleton
 * @param data data to be updated
 * @returns single data
 */
export async function createSingletonData<_Singleton extends Singleton<Record<string, Field>>>(
  singleton: _Singleton,
  singletonName: string,
  data: any,
) {
  const validationSchema = getValidationSchemaForSingleton(singleton)
  const validatedData = validationSchema.parse(data)
  return prisma.singleton.create({
    data: {
      label: singleton.label,
      schema: singleton.schema,
      name: singletonName,
      data: validatedData,
    },
  })
}

/**
 * Update data of a particular singleton
 *
 * @param singleton singleton to be updated
 * @param singletonName name of the singleton
 * @param data data to be updated
 * @returns single data
 */
export async function updateSingletonData<_Singleton extends Singleton<Record<string, Field>>>(
  singleton: _Singleton,
  singletonName: string,
  data: any,
) {
  const validationSchema = getValidationSchemaForSingleton(singleton)
  const validatedData = validationSchema.parse(data)
  return prisma.singleton.update({
    where: {
      name: singletonName,
    },
    data: {
      data: validatedData,
    },
  })
}

/**
 * Fetch data of a particular singleton. This also validates the data of the singleton
 * and if the data is not valid, it fixes the data and updates the singleton.
 *
 * @param singleton singleton to be fetched
 * @param singletonName singleton name
 * @param createDummyDataIfNotPresent create dummy data if the data for singleton is not present
 * @returns singleton
 */
export async function fetchSingletonData<_Singleton extends Singleton<Record<string, Field>>>(
  singleton: _Singleton,
  singletonName: string,
  createDummyDataIfNotPresent: boolean = true,
) {
  const validationSchema = getValidationSchemaForSingleton(singleton)

  let item = await prisma.singleton.findFirst({
    where: {
      name: singletonName,
    },
  })

  if (!item) {
    if (createDummyDataIfNotPresent) {
      const dummyData = generateDummyData(singleton.schema)
      item = await createSingletonData(singleton, singletonName, dummyData)
    } else {
      throw new Error(`Singleton ${singleton.label} not found`)
    }
  }

  try {
    validationSchema.parse(item.data)
    return item
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fixedData = fixData(singleton.schema, item.data, error)
      await updateSingletonData(singleton, singletonName, fixedData)
      return { ...item, data: fixedData }
    } else {
      throw error
    }
  }
}
