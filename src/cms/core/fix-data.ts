import { faker } from '@faker-js/faker'
import { z } from 'zod'
import { CMSField } from '../types/field'
import { CMSSchemaData } from '../types/schema'
import { isPlainObject } from '../utils/object'
import { isFieldArrayType, isFieldObjectType } from './field'

/**
 * Generate dummy data for a field. This function will generate dummy data based on the
 * field type and the default value if present. If default value is not present, it will
 * use faker to generate the dummy data.
 *
 * @param field field for which the dummy data will be generated
 * @param collectionData collection data from which the some data is to be arrived
 * @returns dummy data
 */
export function generateDummyDataForField(field: CMSField) {
  if ('default' in field) {
    return field.default
  }

  switch (field.type) {
    case 'text':
      return faker.lorem.sentence()

    case 'rich-text':
      return faker.lorem.paragraphs()

    case 'number':
      return faker.number.int()

    case 'date':
      return faker.date.past().toISOString()

    case 'slug': {
      return faker.lorem.slug()
    }

    case 'image':
      return {
        url: faker.image.urlLoremFlickr({ width: 1920, height: 1080, category: 'nature' }),
        width: 1920,
        height: 1080,
      }

    case 'video': {
      // Rick Roll 🤣
      return 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    }

    case 'icon': {
      return {
        name: 'ShieldQuestion',
        iconLib: 'lucide',
      }
    }

    case 'color': {
      return '#000000'
    }

    case 'select': {
      return field.options[0]
    }

    case 'object': {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      return generateDummyData(field.schema)
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
      data[fieldKey] = [generateDummyDataForField(field)]
    } else {
      data[fieldKey] = generateDummyDataForField(field)
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
  function fixItemData(itemData: any, issuePath: (string | number)[], schema: Record<string, CMSField>) {
    const fieldKeyWithIssue = issuePath[0]
    const field = schema[fieldKeyWithIssue]

    /**
     * Before fixing the error, check if the field is
     *  a) type array -> because in that case, we might need to fix the particular item in the array
     *  b) type object -> because in that case, we might need to fix the particular subField in the object
     *
     * If it is neither of the above, then the issue must be in the entire field, so we can generate the dummy data
     */

    if (isFieldArrayType(field)) {
      const indexWithIssue = issuePath[1]
      /**
       * if field is of type array, but there is no index, then the issue must be in the entire field
       * else the issue must be in the item of the array
       */
      if (typeof indexWithIssue === 'undefined') {
        itemData[fieldKeyWithIssue] = [generateDummyDataForField(field)]
      } else {
        // if the field is of type object, then the issue must be in the item of the array
        if (isFieldObjectType(field)) {
          /**
           * the first element of the issuePath would be fieldKey,
           * the second element of the issuePath would be the indexKey
           * the issuePath for the particular index would be the rest of the issuePath (.slice(2))
           */
          const issuePathForTheIndex = issuePath.slice(2)
          if (issuePathForTheIndex.length !== 0) {
            fixItemData(itemData[fieldKeyWithIssue][indexWithIssue], issuePathForTheIndex, field.schema)
          }
        } else {
          // else the issue must be in the item of the array, so we can safely generate the data
          itemData[fieldKeyWithIssue][indexWithIssue] = generateDummyDataForField(field)
        }
      }
    } else if (isFieldObjectType(field)) {
      const subFieldWithIssue = issuePath[1]
      // if there is issue in the subField, then fix it, else generate data for the entire field
      if (typeof subFieldWithIssue !== 'undefined') {
        /**
         * the first element of the issuePath would be fieldKey,
         * so the issue path for the subField would be the rest of the issuePath (.slice(1))
         */
        fixItemData(itemData[fieldKeyWithIssue], issuePath.slice(1), field.schema)
      } else {
        // else the issue must be in the entire field, so we can safely generate the data
        itemData[fieldKeyWithIssue] = generateDummyData(field.schema)
      }
    } else {
      itemData[fieldKeyWithIssue] = generateDummyDataForField(field)
    }
  }

  if (!isPlainObject(invalidData)) {
    return generateDummyData(schema) as CMSSchemaData<Schema>
  } else {
    const fixedData = { ...invalidData }
    error.issues.forEach((issue) => {
      try {
        fixItemData(fixedData, issue.path, schema)
      } catch (error) {
        return generateDummyData(schema) as CMSSchemaData<Schema>
      }
    })
    return fixedData as CMSSchemaData<Schema>
  }
}
