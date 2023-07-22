import { FolderOpen, File } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { CMSConfig } from '~/cms/types/config'
import { CMSCollection, CMSSingleton } from '~/cms/types/schema'
import { CMSField } from '~/cms/types/field'
import NavLink from '../../nav-link'
import Providers from './providers'
import { authOptions } from '~/cms/core/auth'
import LogoutButton from './logout-button'

export default function createDashboardLayout<
  CMSCollections extends Record<string, CMSCollection<Record<string, CMSField>>>,
  CMSSingletons extends Record<string, CMSSingleton<Record<string, CMSField>>>,
>(config: CMSConfig<CMSCollections, CMSSingletons>) {
  async function Layout({ children, params: { slug } }: { children: React.ReactNode; params: { slug?: string } }) {
    // For the login page, we don't need any kind of appshell
    if (slug?.[0] === 'login') {
      return <Providers>{children}</Providers>
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
      <Providers>
        <div className="flex">
          <div className="sticky top-0 flex h-screen w-[240px] flex-col border-r">
            <div className="flex-1 space-y-4 overflow-auto px-2 py-4">
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
            <LogoutButton className="mx-2 mb-2" />
          </div>
          <div className="flex-1 overflow-auto">{children}</div>
        </div>
      </Providers>
    )
  }

  return Layout
}
