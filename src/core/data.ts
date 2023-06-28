import { z } from 'zod'
import { faker } from '@faker-js/faker'
import { Collection, CollectionData } from './collection'
import { Field } from './field'

/**
 * Generate dummy data for a field. This function will generate dummy data based on the
 * field type and the default value if present. If default value is not present, it will
 * use faker to generate the dummy data.
 *
 * @param field field for which the dummy data will be generated
 * @returns dummy data
 */
function generateDummyDataForField(field: Field) {
  console.log({ field })
  if ('default' in field) {
    return field.default
  }

  switch (field.type) {
    case 'text':
      return faker.lorem.sentence()

    case 'rich-text':
      return faker.lorem.paragraphs()

    case 'number':
      return faker.datatype.number()

    case 'date':
      return faker.date.past().toISOString()

    case 'image':
      return {
        url: faker.image.urlLoremFlickr({ width: 640, height: 480, category: 'nature' }),
        width: 640,
        height: 480,
      }

    default:
      throw new Error('Unknown field type')
  }
}

export function generateDummyData<C extends Collection>(collection: C) {
  const data: Record<string, any> = {}

  Object.entries(collection.fields).forEach(([fieldKey, field]) => {
    data[fieldKey] = generateDummyDataForField(field)
  })

  return data as CollectionData<C>
}

/**
 * Fix invalid data based on the zod error
 *
 * @param invalidData invalid data to be fixed
 * @param error zod error, based on which the data will be fixed
 * @returns valid data
 */
export function fixData<C extends Collection>(schema: C, invalidData: Partial<CollectionData<C>>, error: z.ZodError) {
  /**
   * Fix the invalid item data based on the zod error. This is the helper function for
   * fixing the error in the item.
   *
   * @param itemData item data to be fixed
   * @param issuePath path to the issue in the item data
   */
  function fixItemData(itemData: any, issuePath: (string | number)[]) {
    const fieldKeyWithIssue = issuePath[0]
    const field = schema.fields[fieldKeyWithIssue]
    const dummyData = generateDummyDataForField(field)
    itemData[fieldKeyWithIssue] = dummyData
  }

  const fixedData = Array.isArray(invalidData) ? [...invalidData] : { ...invalidData }
  error.issues.forEach((issue) => {
    const issuePath = issue.path
    // if the first element of the path is a number, then the issue must be in an
    // item of an array
    if (typeof issuePath[0] === 'number' && Array.isArray(fixedData)) {
      fixItemData(fixedData[issuePath[0]], issuePath.slice(1))
    } else {
      fixItemData(fixedData, issuePath)
    }
  })
  return fixedData as CollectionData<C>
}
