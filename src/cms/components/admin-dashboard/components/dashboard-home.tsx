import { ChevronRight, FolderOpen, File } from 'lucide-react'
import Link from 'next/link'
import { CMSConfig } from '~/cms/types/config'
import { CMSField } from '~/cms/types/field'
import { CMSCollection, CMSSingleton } from '~/cms/types/schema'

type DashboardHomeProps<
  CMSCollections extends Record<string, CMSCollection<Record<string, CMSField>>>,
  CMSSingletons extends Record<string, CMSSingleton<Record<string, CMSField>>>,
> = {
  config: CMSConfig<CMSCollections, CMSSingletons>
}

export default function DashboardHome<
  CMSCollections extends Record<string, CMSCollection<Record<string, CMSField>>>,
  CMSSingletons extends Record<string, CMSSingleton<Record<string, CMSField>>>,
>({ config }: DashboardHomeProps<CMSCollections, CMSSingletons>) {
  return (
    <div className="h-full space-y-8 overflow-auto p-4">
      <div className="text-2xl font-medium text-secondary-foreground">Dashboard</div>

      <div className="space-y-4">
        <div className="flex items-center text-lg font-medium text-secondary-foreground">
          <FolderOpen className="mr-2 h-5 w-5" />
          Collections
        </div>
        {Object.entries(config.collections).map(([collectionName, collection]) => {
          return (
            <Link
              href={`/cms/admin/collection/${collectionName}`}
              key={collectionName}
              className="flex items-center space-x-2 rounded-md border border-border px-4 py-2 hover:bg-secondary"
            >
              <div className="flex-1 space-y-1 truncate">
                <div className="truncate text-sm text-secondary-foreground">{collection.label}</div>
                {'description' in collection ? (
                  <div className="truncate text-xs text-muted-foreground">{collection.description as string}</div>
                ) : null}
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          )
        })}
      </div>

      <div className="space-y-4">
        <div className="flex items-center text-lg font-medium text-secondary-foreground">
          <File className="mr-2 h-5 w-5" />
          Singletons
        </div>
        {Object.entries(config.singletons).map(([singletonName, singleton]) => {
          return (
            <Link
              href={`/cms/admin/singleton/${singletonName}`}
              key={singletonName}
              className="flex items-center space-x-2 rounded-md border border-border px-4 py-2 hover:bg-secondary"
            >
              <div className="flex-1 space-y-1 truncate">
                <div className="truncate text-sm text-secondary-foreground">{singleton.label}</div>
                {'description' in singleton ? (
                  <div className="truncate text-xs text-muted-foreground">{singleton.description as string}</div>
                ) : null}
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
