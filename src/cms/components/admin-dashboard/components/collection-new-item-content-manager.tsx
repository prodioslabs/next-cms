import { Field } from '~/cms/types/field'
import { Collection } from '~/cms/types/schema'

type CollectionNewItemContentManagerProps = {
  collection: Collection<Record<string, Field>>
  collectionName: string
  className?: string
  style?: React.CSSProperties
}

export default function CollectionNewItemContentManager({
  collection,
  collectionName,
  className,
  style,
}: CollectionNewItemContentManagerProps) {
  return <div className="" />
}
