import { z } from 'zod'
import { Field, FieldDataType, FieldZodSchema } from './field'

export type Collection<
  Schema extends Record<string, Field>,
  SlugField extends keyof Schema & string = keyof Schema & string,
  NameField extends keyof Schema = keyof Schema & string,
> = {
  label: string
  path: string
  slugField: SlugField
  nameField?: NameField
  schema: Schema
}

export type SchemaData<Schema extends Record<string, Field>> = {
  [Key in keyof Schema]: FieldDataType<Schema[Key]>
}

export type CollectionData<_Collection extends Collection<Record<string, Field>>> = SchemaData<_Collection['schema']>

export type CollectionItemZodSchema<_Collection extends Collection<Record<string, Field>>> = z.ZodObject<{
  [Key in keyof _Collection['schema']]: FieldZodSchema<_Collection['schema'][Key]>
}>

export type Singleton<Schema extends Record<string, Field>> = {
  label: string
  path: string
  schema: Schema
}

export type SingletonData<_Singleton extends Singleton<Record<string, Field>>> = SchemaData<_Singleton['schema']>

export type SingletonZodSchema<_Singleton extends Singleton<Record<string, Field>>> = z.ZodObject<{
  [Key in keyof _Singleton['schema']]: FieldZodSchema<_Singleton['schema'][Key]>
}>
