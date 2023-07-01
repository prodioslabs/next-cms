import { z } from 'zod'
import { Schema, Singleton } from './collection'
import { InferFieldZodSchema, getValidationSchemaForField } from './field'

export type ZodSchemaForCollection<C extends Schema> = z.ZodObject<{
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
function getValidationSchemaForFields<C extends Schema>(collection: Schema): ZodSchemaForCollection<C> {
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
export function getValidationSchemaForCollection(collection: Schema) {
  return z.array(getValidationSchemaForFields(collection))
}

/**
 * Create a zod validation schema for the singleton. As the singleton data would be a single object,
 * this function will create a zod object schema from the fields validation schema.
 *
 * @param singleton singleton to get the validation schema for
 * @returns zod validation schema for the singleton
 */
export function getValidationSchemaForSingleton(singleton: Singleton) {
  return getValidationSchemaForFields(singleton)
}
