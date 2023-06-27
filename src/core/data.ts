import * as fs from 'fs/promises'
import * as path from 'path'
import { z } from 'zod'
import { getValidationSchemaForField } from './field'
import { Collection, CollectionData, Singleton } from './collection'
import { isErrnoException } from './utils/file'

/**
 * Get the collection folder path. If the folder is not present, it will create it.
 *
 * @param basePath base path of the project
 * @param collectionPath path of the collection
 * @returns the full path of the collection folder
 */
async function getCollectionFolder(basePath: string, collectionPath: string) {
  const fullPath = path.resolve(basePath, collectionPath)
  try {
    await fs.opendir(fullPath)
  } catch (error) {
    if (isErrnoException(error) && error.code === 'ENOENT') {
      await fs.mkdir(fullPath, { recursive: true })
    }
    throw error
  }
  return fullPath
}

async function readData(collectionDataPath: string, defaultData: string) {
  let data: string = defaultData

  try {
    data = await fs.readFile(collectionDataPath, 'utf-8')
  } catch (error) {
    if (isErrnoException(error) && error.code === 'ENOENT') {
      await fs.writeFile(collectionDataPath, data, 'utf-8')
    }
    throw error
  }

  return JSON.parse(data)
}

/**
 * Creates a zod validation schema for the collection fields. This component is helper utility
 * which can be used for creating validation schema for both collection and singletons
 *
 * @param collection collection to get the validation schema for
 * @returns zod validation schema for the collection
 * @see getValidationSchemaForCollection
 * @see getValidationSchemaForSingleton
 */
function _getValidationSchemaForCollectionFields(collection: Collection) {
  const schema = z.object({})
  Object.entries(collection.fields).forEach(([fieldKey, field]) => {
    const fieldSchema = getValidationSchemaForField(field)
    if (!field.required) {
      schema.extend({ [fieldKey]: fieldSchema.optional() })
    } else {
      schema.extend({ [fieldKey]: fieldSchema })
    }
  })
  return schema
}

function getValidationSchemaForCollection(collection: Collection) {
  return z.array(_getValidationSchemaForCollectionFields(collection))
}

function getValidationSchemaForSingleton(collection: Collection) {
  return _getValidationSchemaForCollectionFields(collection)
}

export async function getCollectionData<C extends Collection>(collection: C, basePath = `${process.cwd()}/content`) {
  const collectionFolderPath = await getCollectionFolder(basePath, collection.path)
  const collectionDataFile = path.resolve(collectionFolderPath, 'data.json')
  const collectionData = await readData(collectionDataFile, '[]')

  const validationSchema = getValidationSchemaForCollection(collection)
  return validationSchema.parse(collectionData) as CollectionData<C>[]
}

export async function getSingletonData<S extends Singleton>(singleton: S, basePath = `${process.cwd()}/content`) {
  const singleFolderPath = await getCollectionFolder(basePath, singleton.path)
  const singletonDataFile = path.resolve(singleFolderPath, 'data.json')
  const singletonData = await readData(singletonDataFile, '{}')

  const validationSchema = getValidationSchemaForSingleton(singleton)
  return validationSchema.parse(singletonData) as CollectionData<S>
}
