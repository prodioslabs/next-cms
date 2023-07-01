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

export type Field = BaseField & (TextField | RichTextField | NumberField | DateField | ImageField)

export type InferFieldDataType<F extends Field> = F extends TextField
  ? string
  : F extends RichTextField
  ? string
  : F extends NumberField
  ? number
  : F extends DateField
  ? string
  : F extends ImageField
  ? ImageData[]
  : never

export type InferFieldZodSchema<F extends Field> = F extends TextField
  ? z.ZodString
  : F extends RichTextField
  ? z.ZodString
  : F extends NumberField
  ? z.ZodNumber
  : F extends DateField
  ? z.ZodString
  : F extends ImageField
  ? z.ZodArray<ZodImageSchema>
  : never

export function getValidationSchemaForField(field: Field) {
  switch (field.type) {
    case 'text':
    case 'rich-text':
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

    default: {
      throw new Error('Invalid field type')
    }
  }
}
