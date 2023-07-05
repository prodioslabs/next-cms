import { z } from 'zod'

export type CMSBaseField = {
  label?: string
  hidden?: boolean
  required?: boolean
}

export type CMSTextField = {
  type: 'text'
  default?: string
}

export type CMSRichTextField = {
  type: 'rich-text'
  default?: string
}

export type CMSNumberField = {
  type: 'number'
  default?: number
}

export type CMSDateField = {
  type: 'date'
  default?: string
}

export type CMSImageField = {
  type: 'image'
  multiple?: boolean
}
export type CMSImageData = {
  url: string
  width: number
  height: number
}
export type ZodImageSchema = z.ZodObject<{ url: z.ZodString; width: z.ZodNumber; height: z.ZodNumber }>

export type CMSSlugField = {
  type: 'slug'
  from: string
}

export type CMSField = CMSBaseField &
  (CMSTextField | CMSRichTextField | CMSNumberField | CMSDateField | CMSImageField | CMSSlugField)

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
