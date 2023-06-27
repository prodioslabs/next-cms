import { z } from 'zod'
import { Field, InferFieldDataType, InferFieldZodSchema } from './field'

export type Glob = '*' | '**'

export type Collection = {
  slug: string
  name: string
  path: `${string}/${Glob}` | `${string}/${Glob}/${string}`
  fields: { [key: string]: Field }
}

export type Singleton = Collection

type Optional<T> = T | undefined

export type CollectionData<C extends Collection> = {
  [FieldKey in keyof C['fields']]: C['fields'][FieldKey]['required'] extends true
    ? InferFieldDataType<C['fields'][FieldKey]>
    : Optional<InferFieldDataType<C['fields'][FieldKey]>>
}

export type ZodSchemaForCollection<C extends Collection> = z.ZodObject<{
  [FieldKey in keyof C['fields']]: C['fields'][FieldKey]['required'] extends true
    ? InferFieldZodSchema<C['fields'][FieldKey]>
    : z.ZodOptional<InferFieldZodSchema<C['fields'][FieldKey]>>
}>
