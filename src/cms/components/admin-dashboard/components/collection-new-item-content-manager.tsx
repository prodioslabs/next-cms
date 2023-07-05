import { CMSField } from '~/cms/types/field'
import { CMSCollection } from '~/cms/types/schema'

type CollectionNewItemContentManagerProps = {
  collection: CMSCollection<Record<string, CMSField>>
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
