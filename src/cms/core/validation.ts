import { z } from 'zod'
import { CMSField } from '../types/field'
import { CMSCollection, CMSSingleton } from '../types/schema'

/**
 * Get validation zod schema for a field
 *
 * @param field field to get validation schema for
 * @returns zod schema
 */
export function getValidationSchemaForField(field: CMSField) {
  let schemaBasedOnType
  switch (field.type) {
    case 'text':
    case 'rich-text':
    case 'slug': {
      schemaBasedOnType = z.string().min(1)
      break
    }

    case 'date': {
      schemaBasedOnType = z.string().datetime()
      break
    }

    case 'number': {
      schemaBasedOnType = z.number()
      break
    }

    case 'image': {
      schemaBasedOnType = z.object({
        url: z.string().min(1),
        width: z.number().int(),
        height: z.number().int(),
      })
      break
    }

    case 'icon': {
      schemaBasedOnType = z.object({
        name: z.string().min(1),
        // update the list based on the icons list in future
        iconLib: z.enum(['lucide']),
      })
      break
    }

    case 'color': {
      schemaBasedOnType = z.string().startsWith('#')
      break
    }

    case 'select': {
      schemaBasedOnType = z.object({
        value: z.string(),
        label: z.string(),
      })
      break
    }

    default: {
      throw new Error('Invalid field type')
    }
  }

  let validationSchema
  if (field.multiple) {
    validationSchema = schemaBasedOnType.array().min(1)
  } else {
    validationSchema = schemaBasedOnType
  }

  if (!field.required) {
    return validationSchema.optional()
  }
  return validationSchema
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
export function getValidationSchemaForSchema<Schema extends Record<string, CMSField>>(schema: Schema): z.ZodType {
  let validationSchema = z.object({})
  Object.entries(schema).forEach(([fieldKey, field]) => {
    validationSchema = validationSchema.extend({ [fieldKey]: getValidationSchemaForField(field) })
  })
  return validationSchema
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
  return z.array(getValidationSchemaForSchema(collection.schema))
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
  return getValidationSchemaForSchema(collection.schema)
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
  return getValidationSchemaForSchema(singleton.schema)
}
