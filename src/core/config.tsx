import { Field, InferFieldDataType } from './field'

export type Collection = {
  slug: string
  name: string
  path: string
  fields: { [key: string]: Field }
}

export type Singleton = {
  slug: string
  name: string
  path: string
  fields: { [key: string]: Field }
}

export type Config = {
  collections: { [key: string]: Collection }
  singletons: { [key: string]: Singleton }
}

type CollectionProps<C extends Config, CollectionName extends keyof C['collections']> = {
  children: (props: { items: InferCollectionDataType<C, CollectionName>[] }) => React.ReactNode
}

type InferCollectionDataType<C extends Config, CollectionName extends keyof C['collections']> = {
  [FieldKey in keyof C['collections'][CollectionName]['fields']]: InferFieldDataType<
    C['collections'][CollectionName]['fields'][FieldKey]
  >
}

export function createCollectionComponent<C extends Config, CollectionName extends keyof C['collections']>(
  config: C,
  collectionName: CollectionName,
) {
  async function CollectionComponent({ children }: CollectionProps<C, CollectionName>) {
    const items = await Promise.resolve([] as InferCollectionDataType<C, CollectionName>[])
    // Wrapped the children with Fragment because of this issue: https://github.com/vercel/next.js/issues/49280
    // TODO: Remove this if the issue is fixed
    return <>{children({ items })}</>
  }

  return CollectionComponent
}
