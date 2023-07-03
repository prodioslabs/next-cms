import { Field } from './field'
import { Collection, CollectionData, Singleton, SingletonData } from './schema'

export type CollectionReaderProps<_Collection extends Collection<Record<string, Field>>> =
  | ({
      type: 'list'
    } & CollectionListReaderProps<_Collection>)
  | ({
      type: 'element'
    } & CollectionElementReaderProps<_Collection>)

export type CollectionListReaderProps<_Collection extends Collection<Record<string, Field>>> = {
  renderItems: (args: { items: CollectionData<_Collection>[] }) => React.ReactNode
}

export type CollectionElementReaderProps<_Collection extends Collection<Record<string, Field>>> = {
  elementSlug: string
  renderItem: (args: { item: CollectionData<_Collection> }) => React.ReactNode
}

export type SingletonReaderProps<_Singleton extends Singleton<Record<string, Field>>> = {
  renderItem: (args: { item: SingletonData<_Singleton> }) => React.ReactNode
}
