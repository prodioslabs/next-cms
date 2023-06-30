import Link from 'next/link'
import { LuChevronRight, LuFile, LuFolderOpen } from 'react-icons/lu'
import cmsConfig from '~/cms.config'

export default function AdminDashboard() {
  return (
    <div className="h-full space-y-8 overflow-auto p-4">
      <div className="text-2xl font-medium text-secondary-foreground">Dashboard</div>

      <div className="space-y-4">
        <div className="flex items-center text-lg font-medium text-secondary-foreground">
          <LuFolderOpen className="mr-2 h-5 w-5" />
          Collections
        </div>
        {Object.entries(cmsConfig.collections).map(([collectionKey, collection]) => {
          return (
            <Link
              href={`/admin/collection/${collectionKey}`}
              key={collectionKey}
              className="flex items-center space-x-2 rounded-md border border-border px-4 py-2 hover:bg-secondary"
            >
              <div className="flex-1 space-y-1 truncate">
                <div className="truncate text-sm text-secondary-foreground">{collection.name}</div>
                {'description' in collection ? (
                  <div className="truncate text-xs text-muted-foreground">{collection.description as string}</div>
                ) : null}
              </div>
              <LuChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          )
        })}
      </div>

      <div className="space-y-4">
        <div className="flex items-center text-lg font-medium text-secondary-foreground">
          <LuFile className="mr-2 h-5 w-5" />
          Singletons
        </div>
        {Object.entries(cmsConfig.singletons).map(([singletonKey, singleton]) => {
          return (
            <Link
              href={`/admin/singleton/${singletonKey}`}
              key={singletonKey}
              className="flex items-center space-x-2 rounded-md border border-border px-4 py-2 hover:bg-secondary"
            >
              <div className="flex-1 space-y-1 truncate">
                <div className="truncate text-sm text-secondary-foreground">{singleton.name}</div>
                {'description' in singleton ? (
                  <div className="truncate text-xs text-muted-foreground">{singleton.description as string}</div>
                ) : null}
              </div>
              <LuChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
