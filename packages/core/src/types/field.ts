export type CMSBaseField = {
  label: string
  hidden?: boolean
  required?: boolean
  multiple?: boolean
}

export type CMSTextField = CMSBaseField & {
  type: 'text'
  default?: string
}

export type CMSRichTextField = CMSBaseField & {
  type: 'rich-text'
  default?: string
}

export type CMSNumberField = CMSBaseField & {
  type: 'number'
  default?: number
}

export type CMSDateField = CMSBaseField & {
  type: 'date'
  default?: string
}

export type CMSSlugField = CMSBaseField & {
  type: 'slug'
  from: string
}

export type CMSImageField = CMSBaseField & {
  type: 'image'
}
export type CMSImageData = {
  url: string
  metadata: {
    width: number
    height: number
  }
}

export type CMSIconField = CMSBaseField & {
  type: 'icon'
}

export type CMSIconData = {
  name: string
  iconLib: 'lucide'
}

export type CMSColorField = CMSBaseField & {
  type: 'color'
  default?: CMSColorData
}

export type CMSColorData = `#${string}`

export type CMSSelectOption = {
  value: string
  label: string
}

export type CMSSelectField = CMSBaseField & {
  type: 'select'
  options: CMSSelectOption[]
  defaultValue?: CMSSelectOption
}

export type CMSVideoField = CMSBaseField & {
  type: 'video'
}

export type CMSObjectField = CMSBaseField & {
  type: 'object'
  schema: Record<string, CMSField>
}

export type CMSObjectData<F extends CMSObjectField> = { [Key in keyof F['schema']]: CMSFieldDataType<F['schema'][Key]> }

export type CMSField =
  | CMSTextField
  | CMSRichTextField
  | CMSNumberField
  | CMSDateField
  | CMSImageField
  | CMSVideoField
  | CMSSlugField
  | CMSIconField
  | CMSColorField
  | CMSSelectField
  | CMSObjectField

type FieldDataTypeOnFieldType<F extends CMSField> = F extends CMSTextField
  ? string
  : F extends CMSRichTextField
  ? string
  : F extends CMSNumberField
  ? number
  : F extends CMSDateField
  ? string
  : F extends CMSImageField
  ? CMSImageData
  : F extends CMSVideoField
  ? string
  : F extends CMSSlugField
  ? string
  : F extends CMSIconField
  ? CMSIconData
  : F extends CMSColorField
  ? CMSColorData
  : F extends CMSSelectField
  ? CMSSelectOption
  : F extends CMSObjectField
  ? CMSObjectData<F>
  : never

type FieldDataTypeOnMultiple<F extends CMSField> = F['multiple'] extends true
  ? FieldDataTypeOnFieldType<F>[]
  : FieldDataTypeOnFieldType<F>

type FieldDataTypeOnRequired<F extends CMSField> = F['required'] extends true
  ? FieldDataTypeOnMultiple<F>
  : FieldDataTypeOnMultiple<F> | undefined

export type CMSFieldDataType<F extends CMSField> = FieldDataTypeOnRequired<F>
