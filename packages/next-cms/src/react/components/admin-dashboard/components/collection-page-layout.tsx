'use client'

import { CMSField } from '../../../../types/field'
import { CMSCollection } from '../../../../types/schema'
import { LucideIcon } from '../../../../ui'
import { PageHeading } from '../../../ui/page-heading'

type CollectionPageLayoutProps = {
  collection: CMSCollection<Record<string, CMSField>>
  children: React.ReactNode
}

export default function CollectionPageLayout({ collection, children }: CollectionPageLayoutProps) {
  return (
    <div className="space-y-4 p-4">
      <PageHeading title={collection.label} icon={<LucideIcon name="folder-open" />} />
      {children}
    </div>
  )
}
