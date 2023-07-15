import { CMSField } from '../types/field'

export function createSingleton<Schema extends Record<string, CMSField>>(name: string, schema: Schema) {
  return {
    name,
    schema,
  }
}
