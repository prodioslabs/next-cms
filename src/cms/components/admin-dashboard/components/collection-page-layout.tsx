import { FolderOpen } from 'lucide-react'
import { Field } from '~/cms/types/field'
import { Collection } from '~/cms/types/schema'
import { PageHeading } from '~/components/ui/page-heading'

type CollectionPageLayoutProps = {
  collection: Collection<Record<string, Field>>
  children: React.ReactNode
}

export default function CollectionPageLayout({ collection, children }: CollectionPageLayoutProps) {
  return (
    <div className="space-y-4 p-4">
      <PageHeading title={collection.label} icon={<FolderOpen />} />
      {children}
    </div>
  )
}
