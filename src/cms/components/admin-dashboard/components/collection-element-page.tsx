import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { cn } from '~/lib/utils'
import ContentManager from '../../content-manager'
import { CMSCollection } from '~/cms/types/schema'
import { CMSField } from '~/cms/types/field'
import { fetchCollectionElementDataById } from '~/cms/core/data'

type CollectionElementPageProps = {
  collection: CMSCollection<Record<string, CMSField>>
  collectionName: string
  elementId: string
  className?: string
  style?: React.CSSProperties
}

export async function CollectionElementPage({
  collection,
  collectionName,
  elementId,
  className,
  style,
}: CollectionElementPageProps) {
  const collectionElement = await fetchCollectionElementDataById(collection, elementId)

  return (
    <div className={cn('space-y-4', className)} style={style}>
      <div>
        <Link
          href={`/cms/admin/collection/${collectionName}`}
          className="flex items-center text-sm text-muted-foreground"
        >
          <ChevronLeft className="mr-2 h-5 w-5" />
          Show all items
        </Link>
      </div>
      <ContentManager
        schema={collection.schema}
        config={{ type: 'collection', collectionName, elementId, method: 'update' }}
        initialData={collectionElement.data}
      />
    </div>
  )
}
