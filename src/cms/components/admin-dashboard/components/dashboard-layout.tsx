import { FolderOpen, File } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { CMSConfig } from '~/cms/types/config'
import { CMSCollection, CMSSingleton } from '~/cms/types/schema'
import { CMSField } from '~/cms/types/field'
import NavLink from '../../nav-link'
import Providers from './providers'
import { Toaster } from '~/components/ui/toaster'
import { authOptions } from '~/cms/core/auth'

export default function createDashboardLayout<
  CMSCollections extends Record<string, CMSCollection<Record<string, CMSField>>>,
  CMSSingletons extends Record<string, CMSSingleton<Record<string, CMSField>>>,
>(config: CMSConfig<CMSCollections, CMSSingletons>) {
  async function Layout({ children, params: { slug } }: { children: React.ReactNode; params: { slug?: string } }) {
    // For the login page, we don't need any kind of appshell
    if (slug?.[0] === 'login') {
      return (
        <>
          <Providers>{children}</Providers>
          <Toaster />
        </>
      )
    }

    /**
     * 1. Check for authentication
     * 2. If the user is not authenticated, the redirect the user to /admin/login
     */
    const session = await getServerSession(authOptions)
    if (!session) {
      redirect('/cms/admin/login')
    }

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
                  href={`/cms/admin/collection/${collectionKey}`}
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
                  href={`/cms/admin/singleton/${singletonName}`}
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
