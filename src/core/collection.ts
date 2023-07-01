import path from 'path'
import fs from 'fs/promises'
import { z } from 'zod'
import { Field, InferFieldDataType } from './field'
import { fixData, generateDummyData } from './data'
import { isErrnoException } from './utils/file'
import { getValidationSchemaForCollection, getValidationSchemaForSingleton } from './collection-schema'

export type Schema = {
  name: string
  description?: string
  // TODO: add path validation
  path: string
  fields: { [key: string]: Field }
}

export type Collection<S extends Schema = Schema> = S & {
  primaryKey: keyof S['fields']
}

/**
 * Singleton is a collection with only one item. Right now there is no difference between
 * collection and singleton, but in the future we might add some special behavior for singletons.
 */
export type Singleton = Schema

/**
 * Get the collection folder path. If the folder is not present, it will create it.
 *
 * @param basePath base path of the project
 * @param collectionPath path of the collection
 * @returns the full path of the collection folder
 */
export async function getDataFolderPath(collectionPath: string, basePath: string) {
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
 * Get the collection data file path.
 *
 * @param basePath base path of the project
 * @param collectionPath path of the collection
 * @returns the full path of the collection data file
 * @see getDataFolderPath
 */
export async function getDataFilePath(collectionPath: string, basePath: string) {
  const collectionFolderPath = await getDataFolderPath(collectionPath, basePath)
  return path.resolve(collectionFolderPath, 'data.json')
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
async function readOrCreateDataFromFile(dataPath: string, schema: Schema, isSingleton: boolean) {
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
export async function writeDataToFile(dataPath: string, data: any) {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf-8')
}

type Optional<T> = T | undefined

export type ElementData<C extends Schema> = {
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
export async function getCollectionData<C extends Schema>(collection: C, basePath: string) {
  const collectionDataFile = await getDataFilePath(collection.path, basePath)
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
export async function getSingletonData<S extends Singleton>(singleton: S, basePath: string) {
  const singletonDataFile = await getDataFilePath(singleton.path, basePath)
  const singletonData = await readOrCreateDataFromFile(singletonDataFile, singleton, true)

  const validationSchema = getValidationSchemaForSingleton(singleton)

  try {
    const parsedData = validationSchema.parse(singletonData) as ElementData<S>
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
