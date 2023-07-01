import { FolderOpen, File } from 'lucide-react'
import cmsConfig from '~/cms.config'
import NavLink from '~/components/nav-link/nav-link'
import Providers from './providers'
import { Toaster } from '~/components/ui/toaster'

export const metadata = {
  title: 'Next CMS Admin',
  description: 'Next CMS Admin',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <div className="w-[240px] space-y-4 overflow-auto border-r px-2 py-4">
        <div className="space-y-2">
          <div className="flex items-center px-2 text-xs uppercase text-secondary-foreground">
            <FolderOpen className="mr-1 h-4 w-4" />
            Collections
          </div>
          {Object.entries(cmsConfig.collections).map(([collectionKey, collection]) => {
            return (
              <NavLink
                href={`/admin/collection/${collectionKey}`}
                key={collectionKey}
                className="block rounded-md border border-transparent p-2 text-sm text-muted-foreground hover:border-border hover:bg-muted"
                activeClassName="text-secondary-foreground border-border bg-muted"
              >
                {collection.name}
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
          {Object.entries(cmsConfig.singletons).map(([singletonKey, singleton]) => {
            return (
              <NavLink
                href={`/admin/singleton/${singletonKey}`}
                key={singletonKey}
                className="block rounded-md border border-transparent p-2 text-sm text-muted-foreground hover:border-border hover:bg-muted"
                activeClassName="text-secondary-foreground border-border bg-muted"
              >
                {singleton.name}
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
