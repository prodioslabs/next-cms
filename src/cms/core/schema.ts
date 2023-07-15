import { z } from 'zod'
import { CMSField } from '../types/field'

export abstract class CMSDataItem<Schema extends Record<string, CMSField>> {
  constructor(readonly schema: Schema) {}

  private getValidationSchemaForField(field: CMSField) {
    switch (field.type) {
      case 'text':
      case 'rich-text':
      case 'slug':
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

      case 'icon': {
        return z.object({
          name: z.string().min(1),
          // update the list based on the icons list in future
          iconLib: z.enum(['lucide']),
        })
      }

      default: {
        throw new Error('Invalid field type')
      }
    }
  }

  getValidationSchemaForFields() {
    let validationSchema = z.object({})
    Object.entries(this.schema).forEach(([fieldKey, field]) => {
      const fieldSchema = this.getValidationSchemaForField(field)
      if (!field.required) {
        validationSchema = validationSchema.extend({ [fieldKey]: fieldSchema.optional() })
      } else {
        validationSchema = validationSchema.extend({ [fieldKey]: fieldSchema })
      }
    })
    return validationSchema
  }

  abstract getValidationSchema(): z.ZodType

  abstract fetchData(): Promise<any>

  async getData() {
    const validationSchema = this.getValidationSchema()
    const data = await this.fetchData()
    return validationSchema.parse(data)
  }
}
