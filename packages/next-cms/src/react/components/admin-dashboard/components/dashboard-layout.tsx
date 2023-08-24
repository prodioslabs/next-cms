import { getServerSession as nextAuthGetServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { CMSConfig } from '../../../../types/config'
import { CMSCollection, CMSSingleton } from '../../../../types/schema'
import { CMSField } from '../../../../types/field'
import NavLink from '../../nav-link'
import Providers from './providers'
import { authOptions } from '../../../../core/auth'
import DashboardPanel from './dashboard-panel'
import DashboardMenu from './dashboard-menu'
import SidebarLabel from './sidebar-label'
import { LucideIcon } from '../../../../ui'

async function getServerSession() {
  try {
    return await nextAuthGetServerSession(authOptions)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    return null
  }
}

export default function createDashboardLayout<
  CMSCollections extends Record<string, CMSCollection<Record<string, CMSField>>>,
  CMSSingletons extends Record<string, CMSSingleton<Record<string, CMSField>>>,
>(config: CMSConfig<CMSCollections, CMSSingletons>) {
  async function Layout({ children, params: { slug } }: { children: React.ReactNode; params: { slug?: string } }) {
    /**
     * 1. Check for authentication
     * 2. If the user is not authenticated, the redirect the user to /admin/login
     */
    const session = await getServerSession()

    // For the login page, we don't need any kind of appshell
    if (slug?.[0] === 'login') {
      if (session) {
        redirect('/cms/admin')
      }

      return (
        <Providers session={null}>
          <div>{children}</div>
        </Providers>
      )
    }

    if (!session) {
      redirect('/cms/admin/login')
    }

    return (
      <Providers session={session}>
        <DashboardPanel
          sidebar={
            <div className="flex h-full flex-col">
              <div className="flex-1 space-y-4 overflow-y-auto overflow-x-hidden px-2 py-4">
                <NavLink href="/cms/admin/media-library" icon={<LucideIcon name="image" />} label="Media Library" />
                <div className="border-b border-border" />
                <div className="space-y-2">
                  <SidebarLabel>Collections</SidebarLabel>
                  {Object.entries(config.collections).map(([collectionKey, collection]) => {
                    return (
                      <NavLink
                        href={`/cms/admin/collection/${collectionKey}`}
                        key={collectionKey}
                        icon={<LucideIcon name="folder-open" />}
                        label={collection.label}
                      />
                    )
                  })}
                </div>
                <div className="border-b border-border" />
                <div className="space-y-2">
                  <SidebarLabel>Singletons</SidebarLabel>
                  {Object.entries(config.singletons).map(([singletonName, singleton]) => {
                    return (
                      <NavLink
                        href={`/cms/admin/singleton/${singletonName}`}
                        key={singletonName}
                        icon={<LucideIcon name="file" />}
                        label={singleton.label}
                      />
                    )
                  })}
                </div>
              </div>
              <div className="mx-2 mb-2 flex items-center space-x-2">
                <DashboardMenu />
              </div>
            </div>
          }
          content={<div className="h-full overflow-auto">{children}</div>}
        />
      </Providers>
    )
  }

  return Layout
}
