import { z } from 'zod'
import { CMSField } from '../types/field'
import {
  CMSCollection,
  CMSCollectionItemZodSchema,
  CMSSchemaZodSchema,
  CMSSingleton,
  CMSSingletonZodSchema,
} from '../types/schema'

/**
 * Get validation zod schema for a field
 *
 * @param field field to get validation schema for
 * @returns zod schema
 */
export function getValidationSchemaForField(field: CMSField) {
  switch (field.type) {
    case 'text':
    case 'rich-text':
    case 'slug':
      return z.string().min(1)

    case 'date':
      return z.string().datetime()

    case 'number':
      return z.number()

    case 'image':
      return z
        .array(
          z.object({
            url: z.string().min(1),
            width: z.number().int(),
            height: z.number().int(),
          }),
        )
        .min(1)

    case 'icon': {
      return z.object({
        name: z.string().min(1),
        // update the list based on the icons list in future
        iconLib: z.enum(['lucide']),
      })
    }

    default: {
      throw new Error('Invalid field type')
    }
  }
}

/**
 * Creates a zod validation schema for the collection fields. This component is helper utility
 * which can be used for creating validation schema for both collection and singletons
 *
 * @param schema collection to get the validation schema for
 * @returns zod validation schema for the collection
 * @see getValidationSchemaForCollectionList
 * @see getValidationSchemaForSingleton
 */
export function getValidationSchemaForSchema<Schema extends Record<string, CMSField>>(schema: Schema) {
  let validationSchema = z.object({})
  Object.entries(schema).forEach(([fieldKey, field]) => {
    const fieldSchema = getValidationSchemaForField(field)
    if (!field.required) {
      validationSchema = validationSchema.extend({ [fieldKey]: fieldSchema.optional() })
    } else {
      validationSchema = validationSchema.extend({ [fieldKey]: fieldSchema })
    }
  })
  return validationSchema as CMSSchemaZodSchema<Schema>
}

/**
 * Create a zod validation schema for the collection. As the collection data would be
 * present in an array, this function will create a zod array schema from the fields validation schema.
 *
 * @param collection collection to get the validation schema for
 * @returns zod validation schema for the collection
 * @see getValidationSchemaForFields
 */
export function getValidationSchemaForCollectionList<_Collection extends CMSCollection<Record<string, CMSField>>>(
  collection: _Collection,
) {
  return z.array(getValidationSchemaForSchema(collection.schema)) as z.ZodArray<CMSCollectionItemZodSchema<_Collection>>
}

/**
 * Create a zod validation schema for a particular element of the collection. As the collection data would be
 * present in an array, this function will create a zod array schema from the fields validation schema.
 *
 * @param collection collection to get the validation schema for
 * @returns zod validation schema for the collection
 * @see getValidationSchemaForFields
 */
export function getValidationSchemaForCollectionElement<_Collection extends CMSCollection<Record<string, CMSField>>>(
  collection: _Collection,
) {
  return getValidationSchemaForSchema(collection.schema) as CMSCollectionItemZodSchema<_Collection>
}

/**
 * Create a zod validation schema for the singleton. As the singleton data would be a single object,
 * this function will create a zod object schema from the fields validation schema.
 *
 * @param singleton singleton to get the validation schema for
 * @returns zod validation schema for the singleton
 */
export function getValidationSchemaForSingleton<_Singleton extends CMSSingleton<Record<string, CMSField>>>(
  singleton: _Singleton,
) {
  return getValidationSchemaForSchema(singleton.schema) as CMSSingletonZodSchema<_Singleton>
}
