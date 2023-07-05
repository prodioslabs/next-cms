import Link from 'next/link'
import { ChevronRight, Plus } from 'lucide-react'
import { Button } from '~/components/ui/button'
import DeleteCollectionItem from '../../delete-collection-item'
import { CMSCollection } from '~/cms/types/schema'
import { CMSField } from '~/cms/types/field'
import { cn } from '~/lib/utils'
import { fetchCollectionsListData } from '~/cms/core/data'

type CollectionPageProps = {
  collection: CMSCollection<Record<string, CMSField>>
  collectionName: string
  className?: string
  style?: React.CSSProperties
}

export default async function CollectionPage({ collection, collectionName, className, style }: CollectionPageProps) {
  const data = await fetchCollectionsListData(collection, collectionName)

  return (
    <div className={cn('space-y-4', className)} style={style}>
      <div className="flex items-center">
        <div className="flex-1 text-base font-medium text-foreground">Items</div>
        <Link href={`/cms/admin/collection/${collectionName}/new`}>
          <Button icon={<Plus />}>Create New Item</Button>
        </Link>
      </div>
      {data.map((item, index) => {
        const itemId = item.id
        const itemSlug = item.slug
        const itemIdentifier = collection.nameField
          ? item[collection.nameField as keyof typeof item] ?? itemSlug
          : itemSlug

        return (
          <div key={itemId} className="flex items-center space-x-2 truncate rounded-md border px-4 py-2">
            <Link className="flex-1 space-y-1 truncate" href={`/cms/admin/collection/${collectionName}/${itemId}`}>
              <div className="truncate text-sm text-foreground">
                {typeof itemIdentifier === 'string' || typeof itemIdentifier === 'number' ? itemIdentifier : index}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span>Edit</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Link>
            <DeleteCollectionItem elementId={itemId} />
          </div>
        )
      })}
    </div>
  )
}
