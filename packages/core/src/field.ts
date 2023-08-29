import { CMSField, CMSObjectField } from './types/field'

export function isFieldArrayType(field: CMSField): field is CMSField & { multiple: true } {
  return !!field.multiple
}

export function isFieldObjectType(field: CMSField): field is CMSObjectField {
  return field.type === 'object'
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
