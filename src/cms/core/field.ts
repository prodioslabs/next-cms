import { CMSField } from '../types/field'

/**
 * Checks if the field is an array type.
 *
 * @param field field to be checked
 * @returns true if the field is an array type, false otherwise
 */
export function isFieldArrayType(field: CMSField) {
  // right now, the only array type is the image type
  return field.multiple
}

/**
 * Checks if the field data is of type text
 *
 * @param field field to be checked
 * @returns true if the field data is of type string
 */
export function isTextField(field?: CMSField) {
  // multiple fields are not text fields
  return (field?.type === 'text' || field?.type === 'rich-text' || field?.type === 'slug') && !field.multiple
}
