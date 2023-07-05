import { z } from 'zod'
import { CMSField, CMSFieldDataType, CMSFieldZodSchema } from './field'

export type CMSCollection<
  Schema extends Record<string, CMSField>,
  SlugField extends keyof Schema & string = keyof Schema & string,
  NameField extends keyof Schema = keyof Schema & string,
> = {
  label: string
  description?: string
  slugField: SlugField
  nameField?: NameField
  schema: Schema
}

export type CMSSchemaData<Schema extends Record<string, CMSField>> = {
  [Key in keyof Schema]: CMSFieldDataType<Schema[Key]>
}

export type CMSSchemaZodSchema<Schema extends Record<string, CMSField>> = z.ZodObject<{
  [Key in keyof Schema]: CMSFieldZodSchema<Schema[Key]>
}>

export type CMSCollectionData<_Collection extends CMSCollection<Record<string, CMSField>>> = CMSSchemaData<
  _Collection['schema']
>

export type CMSCollectionItemZodSchema<_Collection extends CMSCollection<Record<string, CMSField>>> =
  CMSSchemaZodSchema<_Collection['schema']>

export type CMSSingleton<Schema extends Record<string, CMSField>> = {
  label: string
  description?: string
  schema: Schema
}

export type CMSSingletonData<_Singleton extends CMSSingleton<Record<string, CMSField>>> = CMSSchemaData<
  _Singleton['schema']
>

export type CMSSingletonZodSchema<_Singleton extends CMSSingleton<Record<string, CMSField>>> = CMSSchemaZodSchema<
  _Singleton['schema']
>
