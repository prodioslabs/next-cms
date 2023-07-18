import { z } from 'zod'

export type CMSBaseField = {
  label?: string
  hidden?: boolean
  required?: boolean
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
  multiple?: boolean
}
export type CMSImageData = {
  url: string
  width: number
  height: number
}
export type ZodImageSchema = z.ZodObject<{ url: z.ZodString; width: z.ZodNumber; height: z.ZodNumber }>

export type CMSIconField = CMSBaseField & {
  type: 'icon'
}

export type CMSIconData = {
  name: string
  iconLib: string
}

export type CMSColorField = CMSBaseField & {
  type: 'color'
  default?: CMSColorData
}

export type CMSColorData = `#${string}`

export type CMSField =
  | CMSTextField
  | CMSRichTextField
  | CMSNumberField
  | CMSDateField
  | CMSImageField
  | CMSSlugField
  | CMSIconField
  | CMSColorField

export type CMSFieldDataType<F extends CMSField> = F extends CMSTextField
  ? string
  : F extends CMSRichTextField
  ? string
  : F extends CMSNumberField
  ? number
  : F extends CMSDateField
  ? string
  : F extends CMSImageField
  ? CMSImageData[]
  : F extends CMSSlugField
  ? string
  : F extends CMSIconField
  ? CMSIconData
  : F extends CMSColorField
  ? CMSColorData
  : never

export type CMSFieldZodSchema<F extends CMSField> = F extends CMSTextField
  ? z.ZodString
  : F extends CMSRichTextField
  ? z.ZodString
  : F extends CMSNumberField
  ? z.ZodNumber
  : F extends CMSDateField
  ? z.ZodString
  : F extends CMSImageField
  ? z.ZodArray<ZodImageSchema>
  : F extends CMSSlugField
  ? z.ZodString
  : never
