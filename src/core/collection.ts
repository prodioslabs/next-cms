import path from 'path'
import fs from 'fs/promises'
import { z } from 'zod'
import { Field, InferFieldDataType, InferFieldZodSchema, getValidationSchemaForField } from './field'
import { readData } from './data'
import { isErrnoException } from './utils/file'

export type Collection = {
  slug: string
  name: string
  // TODO: add path validation
  path: string
  fields: { [key: string]: Field }
}

export type Singleton = Collection

type Optional<T> = T | undefined

export type CollectionData<C extends Collection> = {
  [FieldKey in keyof C['fields']]: C['fields'][FieldKey]['required'] extends true
    ? InferFieldDataType<C['fields'][FieldKey]>
    : Optional<InferFieldDataType<C['fields'][FieldKey]>>
}

export type ZodSchemaForCollection<C extends Collection> = z.ZodObject<{
  [FieldKey in keyof C['fields']]: C['fields'][FieldKey]['required'] extends true
    ? InferFieldZodSchema<C['fields'][FieldKey]>
    : z.ZodOptional<InferFieldZodSchema<C['fields'][FieldKey]>>
}>

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
    await fs.stat(fullPath)
  } catch (error) {
    if (isErrnoException(error) && error.code === 'ENOENT') {
      await fs.mkdir(fullPath, { recursive: true })
    } else {
      throw error
    }
  }
  return fullPath
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
  let schema = z.object({})
  Object.entries(collection.fields).forEach(([fieldKey, field]) => {
    const fieldSchema = getValidationSchemaForField(field)
    if (!field.required) {
      schema = schema.extend({ [fieldKey]: fieldSchema.optional() })
    } else {
      schema = schema.extend({ [fieldKey]: fieldSchema })
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
  const collectionData = await readData(collectionDataFile, collection, false)

  const validationSchema = getValidationSchemaForCollection(collection)
  try {
    const parsedData = validationSchema.parse(collectionData) as CollectionData<C>[]
    return parsedData
  } catch (error) {}
}

export async function getSingletonData<S extends Singleton>(singleton: S, basePath = `${process.cwd()}/content`) {
  const singleFolderPath = await getCollectionFolder(basePath, singleton.path)
  const singletonDataFile = path.resolve(singleFolderPath, 'data.json')
  const singletonData = await readData(singletonDataFile, singleton, true)

  const validationSchema = getValidationSchemaForSingleton(singleton)

  try {
    const parsedData = validationSchema.parse(singletonData) as CollectionData<S>
    return parsedData
  } catch (error) {}
}
