import path from 'path'
import fs from 'fs/promises'
import { z } from 'zod'
import { Field, InferFieldDataType, InferFieldZodSchema, getValidationSchemaForField } from './field'
import { fixData, generateDummyData } from './data'
import { isErrnoException } from './utils/file'

export type Collection = {
  name: string
  description?: string
  // TODO: add path validation
  path: string
  fields: { [key: string]: Field }
}

/**
 * Singleton is a collection with only one item. Right now there is no difference between
 * collection and singleton, but in the future we might add some special behavior for singletons.
 */
export type Singleton = Collection

export type ZodSchemaForCollection<C extends Collection> = z.ZodObject<{
  [FieldKey in keyof C['fields']]: C['fields'][FieldKey]['required'] extends true
    ? InferFieldZodSchema<C['fields'][FieldKey]>
    : z.ZodOptional<InferFieldZodSchema<C['fields'][FieldKey]>>
}>

/**
 * Creates a zod validation schema for the collection fields. This component is helper utility
 * which can be used for creating validation schema for both collection and singletons
 *
 * @param collection collection to get the validation schema for
 * @returns zod validation schema for the collection
 * @see getValidationSchemaForCollection
 * @see getValidationSchemaForSingleton
 */
function getValidationSchemaForFields<C extends Collection>(collection: Collection): ZodSchemaForCollection<C> {
  let schema = z.object({})
  Object.entries(collection.fields).forEach(([fieldKey, field]) => {
    const fieldSchema = getValidationSchemaForField(field)
    if (!field.required) {
      schema = schema.extend({ [fieldKey]: fieldSchema.optional() })
    } else {
      schema = schema.extend({ [fieldKey]: fieldSchema })
    }
  })
  return schema as ZodSchemaForCollection<C>
}

/**
 * Create a zod validation schema for the collection. As the collection data would be
 * present in an array, this function will create a zod array schema from the fields validation schema.
 *
 * @param collection collection to get the validation schema for
 * @returns zod validation schema for the collection
 * @see getValidationSchemaForFields
 */
function getValidationSchemaForCollection(collection: Collection) {
  return z.array(getValidationSchemaForFields(collection))
}

/**
 * Create a zod validation schema for the singleton. As the singleton data would be a single object,
 * this function will create a zod object schema from the fields validation schema.
 *
 * @param singleton singleton to get the validation schema for
 * @returns zod validation schema for the singleton
 */
function getValidationSchemaForSingleton(singleton: Singleton) {
  return getValidationSchemaForFields(singleton)
}

/**
 * Get the collection folder path. If the folder is not present, it will create it.
 *
 * @param basePath base path of the project
 * @param collectionPath path of the collection
 * @returns the full path of the collection folder
 */
async function getDataFolder(basePath: string, collectionPath: string) {
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
 * Read the collection data from the file. If the file is not present, it will create it using
 * dummy data.
 *
 * TODO: Break this function into smaller functions or figure out a better name for it
 *
 * @param dataPath complete path to the data file
 * @param schema collection schema
 * @param isSingleton is the data is fetched for a singleton or collection
 * @returns
 */
async function readOrCreateDataFromFile(dataPath: string, schema: Collection, isSingleton: boolean) {
  try {
    const data = await fs.readFile(dataPath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    if (isErrnoException(error) && error.code === 'ENOENT') {
      const data = isSingleton ? generateDummyData(schema) : [generateDummyData(schema)]
      await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf-8')
      return data
    } else {
      throw error
    }
  }
}

/**
 * Write back data to the file. This function will be used to write back the fixed data to the file.
 *
 * @param dataPath complete path to the data file
 * @param data data to be written
 * @see getCollectionData
 * @see getSingletonData
 */
async function writeDataToFile(dataPath: string, data: any) {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf-8')
}

type Optional<T> = T | undefined

export type CollectionData<C extends Collection> = {
  [FieldKey in keyof C['fields']]: C['fields'][FieldKey]['required'] extends true
    ? InferFieldDataType<C['fields'][FieldKey]>
    : Optional<InferFieldDataType<C['fields'][FieldKey]>>
}

/**
 * Get the collection data from the local storage. If the data is not present, it will create it with dummy data.
 * This method would also validate the data against the collection schema.
 * If the validation fails, it will try to fix the data and return the fixed data.
 *
 * @param collection collection to get the data for
 * @param basePath base path of the local storage folder
 * @returns collection data
 */
export async function getCollectionData<C extends Collection>(collection: C, basePath = `${process.cwd()}/content`) {
  const collectionFolderPath = await getDataFolder(basePath, collection.path)
  const collectionDataFile = path.resolve(collectionFolderPath, 'data.json')
  const collectionData = await readOrCreateDataFromFile(collectionDataFile, collection, false)

  const validationSchema = getValidationSchemaForCollection(collection)
  try {
    const parsedData = validationSchema.parse(collectionData)
    return parsedData
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fixedData = fixData(collection, collectionData, error)
      await writeDataToFile(collectionDataFile, fixedData)
      return fixedData
    }
    throw error
  }
}

/**
 * Get the singleton data from the local storage. If the data is not present, it will create it with dummy data.
 * This method would also validate the data against the singleton schema.
 * If the validation fails, it will try to fix the data and return the fixed data.
 *
 * @param singleton singleton to get the data for
 * @param basePath base path of the local storage folder
 * @returns singleton data
 */
export async function getSingletonData<S extends Singleton>(singleton: S, basePath = `${process.cwd()}/content`) {
  const singleFolderPath = await getDataFolder(basePath, singleton.path)
  const singletonDataFile = path.resolve(singleFolderPath, 'data.json')
  const singletonData = await readOrCreateDataFromFile(singletonDataFile, singleton, true)

  const validationSchema = getValidationSchemaForSingleton(singleton)

  try {
    const parsedData = validationSchema.parse(singletonData) as CollectionData<S>
    return parsedData
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fixedData = fixData(singleton, singletonData, error)
      await writeDataToFile(singletonDataFile, fixedData)
      return fixedData
    }
    throw error
  }
}
