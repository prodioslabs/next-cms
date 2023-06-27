import * as fs from 'fs/promises'
import { z } from 'zod'
import { faker } from '@faker-js/faker'
import { Collection, CollectionData, ZodSchemaForCollection } from './collection'
import { isErrnoException } from './utils/file'

function generateDummyData<C extends Collection>(collection: C) {
  const data: Record<string, any> = {}

  Object.entries(collection.fields).forEach(([fieldKey, field]) => {
    if ('default' in field) {
      data[fieldKey] = field.default
      return
    }

    switch (field.type) {
      case 'text':
        data[fieldKey] = faker.lorem.sentence()
        break
      case 'rich-text':
        data[fieldKey] = faker.lorem.paragraphs()
        break
      case 'number':
        data[fieldKey] = faker.datatype.number()
        break
      case 'date':
        data[fieldKey] = faker.date.past().toISOString()
        break
      case 'image':
        data[fieldKey] = {
          url: faker.image.urlLoremFlickr({ width: 640, height: 480, category: 'nature' }),
          width: 640,
          height: 480,
        }
        break
      default:
        throw new Error('Unknown field type')
    }
  })

  return data as CollectionData<C>
}

export async function readData(collectionDataPath: string, collectionSchema: Collection, isSingleton: boolean) {
  try {
    const data = await fs.readFile(collectionDataPath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    if (isErrnoException(error) && error.code === 'ENOENT') {
      const data = isSingleton ? generateDummyData(collectionSchema) : [generateDummyData(collectionSchema)]
      await fs.writeFile(collectionDataPath, JSON.stringify(data, null, 2), 'utf-8')
      return data
    } else {
      throw error
    }
  }
}

function fixData<C extends Collection>(
  invalidData: Partial<CollectionData<C>>,
  validationSchema: ZodSchemaForCollection<C>,
) {
  try {
    validationSchema.parse(invalidData)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fixedData = { ...invalidData }
      error.issues.forEach((issue) => {
        const issuePath = issue.path
      })
      return fixedData
    } else {
      throw error
    }
  }
}
