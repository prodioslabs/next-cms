import { z } from 'zod'

export type BaseField = {
  label?: string
  hidden?: boolean
  required?: boolean
}

export type TextField = {
  type: 'text'
  default?: string
}

export type RichTextField = {
  type: 'rich-text'
  default?: string
}

export type NumberField = {
  type: 'number'
  default?: number
}

export type DateField = {
  type: 'date'
  default?: string
}

export type ImageField = {
  type: 'image'
  multiple?: boolean
}
export type ImageData = {
  url: string
  width: number
  height: number
}
export type ZodImageSchema = z.ZodObject<{ url: z.ZodString; width: z.ZodNumber; height: z.ZodNumber }>

export type SlugField = {
  type: 'slug'
  from: string
}

export type Field = BaseField & (TextField | RichTextField | NumberField | DateField | ImageField | SlugField)

export type FieldDataType<F extends Field> = F extends TextField
  ? string
  : F extends RichTextField
  ? string
  : F extends NumberField
  ? number
  : F extends DateField
  ? string
  : F extends ImageField
  ? ImageData[]
  : F extends SlugField
  ? string
  : never

export type FieldZodSchema<F extends Field> = F extends TextField
  ? z.ZodString
  : F extends RichTextField
  ? z.ZodString
  : F extends NumberField
  ? z.ZodNumber
  : F extends DateField
  ? z.ZodString
  : F extends ImageField
  ? z.ZodArray<ZodImageSchema>
  : F extends SlugField
  ? z.ZodString
  : never
