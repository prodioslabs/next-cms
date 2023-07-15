import { z } from 'zod'
import { CMSField } from '../types/field'
import { CMSDataItem } from './schema'

export type CollectionOptions<
  Schema extends Record<string, CMSField>,
  SlugField extends keyof Schema = keyof Schema,
  NameField extends keyof Schema = keyof Schema,
> = {
  label: string
  description?: string
  slugField: SlugField
  nameField?: NameField
}

export class CMSCollection<Schema extends Record<string, CMSField>> extends CMSDataItem<Schema> {
  constructor(readonly name: string, readonly schema: Schema, readonly options: CollectionOptions<Schema>) {
    super(schema)
  }

  getValidationSchema() {
    return z.array(this.getValidationSchemaForFields())
  }

  async fetchData() {}
}
