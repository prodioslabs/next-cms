'use client'

import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { CMSField } from '~/cms/types/field'
import { CMSCollection } from '~/cms/types/schema'
import ContentManager from '../../content-manager'
import { cn } from '~/lib/utils'
import { generateDummyData } from '~/cms/core/fix-data'
import { CMSPlugin } from '~/cms/types/plugin'

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
  const initialData = generateDummyData(collection.schema)

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
        config={{ type: 'collection', collectionName, method: 'create' }}
        initialData={initialData}
        plugins={plugins}
        redirectToOnSave={redirectTo}
      />
    </div>
  )
}
