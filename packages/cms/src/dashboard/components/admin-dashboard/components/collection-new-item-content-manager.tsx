'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { CMSField } from '../../../../types/field'
import { CMSCollection } from '../../../../types/schema'
import ContentManager from '../../content-manager'
import { generateDummyData } from '../../../../core/fix-data'
import { CMSPlugin } from '../../../../types/plugin'
import { api } from '../../../../server/api'
import { cn } from '../../../lib/utils'

type CollectionNewItemContentManagerProps = {
  collection: CMSCollection<Record<string, CMSField>>
  collectionName: string
  redirectTo: string
  plugins?: CMSPlugin[]
  className?: string
  style?: React.CSSProperties
}

export default function CollectionNewItemContentManager({
  collection,
  collectionName,
  redirectTo,
  plugins,
  className,
  style,
}: CollectionNewItemContentManagerProps) {
  const collectionElementsQuery = api.collection.fetchCollectionElements.useQuery(
    {
      collectionName,
    },
    {
      enabled: false,
    },
  )

  const initialData = generateDummyData(collection.schema)

  return (
    <div className={cn('space-y-4', className)} style={style}>
      <div>
        <Link
          href={`/cms/admin/collection/${collectionName}`}
          className="flex items-center text-sm text-muted-foreground"
        >
          <ChevronRight className="mr-2 h-5 w-5" />
          Show all items
        </Link>
      </div>
      <ContentManager
        schema={collection.schema}
        config={{ type: 'collection', collectionName, method: 'create' }}
        initialData={initialData}
        plugins={plugins}
        redirectToOnSave={redirectTo}
        onUpdate={() => {
          collectionElementsQuery.refetch()
        }}
        title={`${collection.label} - New Item`}
      />
    </div>
  )
}
