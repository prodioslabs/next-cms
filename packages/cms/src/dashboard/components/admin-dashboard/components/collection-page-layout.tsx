'use client'

import { FolderOpen } from 'lucide-react'
import type { CMSField, CMSCollection } from '@nextjs-cms/core'
import { PageHeading } from '../../../../ui/page-heading'

type CollectionPageLayoutProps = {
  collection: CMSCollection<Record<string, CMSField>>
  children: React.ReactNode
}

export default function CollectionPageLayout({ collection, children }: CollectionPageLayoutProps) {
  return (
    <div className="space-y-4 p-4">
      <PageHeading title={collection.label} icon={<FolderOpen name="folder-open" />} />
      {children}
    </div>
  )
}
