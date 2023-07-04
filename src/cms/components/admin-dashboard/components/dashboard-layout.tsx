import { FolderOpen, File } from 'lucide-react'
import { Config } from '~/cms/types/config'
import { Collection, Singleton } from '~/cms/types/schema'
import { Field } from '~/cms/types/field'
import NavLink from '../../nav-link'
import Providers from './providers'
import { Toaster } from '~/components/ui/toaster'

export default function createDashboardLayout<
  Collections extends Record<string, Collection<Record<string, Field>>>,
  Singletons extends Record<string, Singleton<Record<string, Field>>>,
>(config: Config<Collections, Singletons>) {
  function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex h-screen">
        <div className="w-[240px] space-y-4 overflow-auto border-r px-2 py-4">
          <div className="space-y-2">
            <div className="flex items-center px-2 text-xs uppercase text-secondary-foreground">
              <FolderOpen className="mr-1 h-4 w-4" />
              Collections
            </div>
            {Object.entries(config.collections).map(([collectionKey, collection]) => {
              return (
                <NavLink
                  href={`/admin/collection/${collectionKey}`}
                  key={collectionKey}
                  className="block rounded-md border border-transparent p-2 text-sm text-muted-foreground hover:border-border hover:bg-muted"
                  activeClassName="text-secondary-foreground border-border bg-muted"
                >
                  {collection.label}
                </NavLink>
              )
            })}
          </div>
          <div className="border-b border-border" />
          <div className="space-y-2">
            <div className="flex items-center px-2 text-xs uppercase text-secondary-foreground">
              <File className="mr-1 h-4 w-4" />
              Singletons
            </div>
            {Object.entries(config.singletons).map(([singletonName, singleton]) => {
              return (
                <NavLink
                  href={`/admin/singleton/${singletonName}`}
                  key={singletonName}
                  className="block rounded-md border border-transparent p-2 text-sm text-muted-foreground hover:border-border hover:bg-muted"
                  activeClassName="text-secondary-foreground border-border bg-muted"
                >
                  {singleton.label}
                </NavLink>
              )
            })}
          </div>
        </div>
        <div className="flex-1">
          <Providers>{children}</Providers>
        </div>
        <Toaster />
      </div>
    )
  }

  return Layout
}
