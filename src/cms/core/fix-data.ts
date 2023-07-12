import { faker } from '@faker-js/faker'
import slugify from 'slugify'
import { z } from 'zod'
import { CMSField } from '../types/field'
import { CMSSchemaData } from '../types/schema'
import { isPlainObject } from '../utils/object'
import { isFieldArrayType } from './field'

/**
 * Generate dummy data for a field. This function will generate dummy data based on the
 * field type and the default value if present. If default value is not present, it will
 * use faker to generate the dummy data.
 *
 * @param field field for which the dummy data will be generated
 * @param collectionData collection data from which the some data is to be arrived
 * @returns dummy data
 */
function generateDummyDataForField(field: CMSField, collectionData: any) {
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

    case 'slug': {
      const baseValue = collectionData[field.from]
      if (baseValue && typeof baseValue === 'string') {
        return slugify(baseValue)
      }
      return faker.lorem.slug()
    }

    case 'image':
      return {
        url: faker.image.urlLoremFlickr({ width: 1920, height: 1080, category: 'nature' }),
        width: 1920,
        height: 1080,
      }

    case 'icon': {
      return {
        name: 'ShieldQuestion',
        iconLib: 'lucide',
      }
    }

    default:
      throw new Error('Unknown field type')
  }
}

/**
 * Generate dummy data for a collection. This function will generate dummy data based on the
 * field types and the default values if present. If default values are not present, it will
 * use faker to generate the dummy data.
 *
 * @param collection collection for which the dummy data will be generated
 * @returns data for the collection
 */
export function generateDummyData<Schema extends Record<string, CMSField>>(schema: Schema) {
  const data: Record<string, any> = {}

  Object.entries(schema).forEach(([fieldKey, field]) => {
    if (isFieldArrayType(field)) {
      data[fieldKey] = [generateDummyDataForField(field, data)]
    } else {
      data[fieldKey] = generateDummyDataForField(field, data)
    }
  })

  return data
}

/**
 * Fix invalid data based on the zod error
 *
 * @param invalidData invalid data to be fixed
 * @param error zod error, based on which the data will be fixed
 * @returns valid data
 */
export function fixData<Schema extends Record<string, CMSField>>(schema: Schema, invalidData: any, error: z.ZodError) {
  /**
   * Fix the invalid item data based on the zod error. This is the helper function for
   * fixing the error in the item.
   *
   * @param itemData item data to be fixed
   * @param issuePath path to the issue in the item data
   */
  function fixItemData(itemData: any, issuePath: (string | number)[]) {
    const fieldKeyWithIssue = issuePath[0]
    const field = schema[fieldKeyWithIssue]

    if (isFieldArrayType(field)) {
      const indexWithIssue = issuePath[1]
      // if field is of type array, but there is no index, then the issue must be in the entire field
      if (typeof indexWithIssue === 'undefined') {
        itemData[fieldKeyWithIssue] = [generateDummyDataForField(field, itemData)]
      } else {
        // else the issue must be in the item of the array
        itemData[fieldKeyWithIssue][indexWithIssue] = generateDummyDataForField(field, itemData)
      }
    } else {
      itemData[fieldKeyWithIssue] = generateDummyDataForField(field, itemData)
    }
  }

  const fixedData = isPlainObject(invalidData) ? { ...invalidData } : undefined

  if (!fixedData) {
    return generateDummyData(schema)
  }

  error.issues.forEach((issue) => {
    try {
      fixItemData(fixedData, issue.path)
    } catch (error) {
      return generateDummyData(schema)
    }
  })

  return fixedData as CMSSchemaData<Schema>
}
