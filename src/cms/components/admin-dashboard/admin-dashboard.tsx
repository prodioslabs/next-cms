import { CMSConfig } from '~/cms/types/config'
import { CMSField } from '~/cms/types/field'
import { CMSCollection, CMSSingleton } from '~/cms/types/schema'
import createDashboardLayout from './components/dashboard-layout'
import createDashboardPage from './components/dashboard-page'

export function createAdminPanelPages<
  CMSCollections extends Record<string, CMSCollection<Record<string, CMSField>>>,
  CMSSingletons extends Record<string, CMSSingleton<Record<string, CMSField>>>,
>(config: CMSConfig<CMSCollections, CMSSingletons>) {
  const Layout = createDashboardLayout(config)
  const { Page, generateMetadata } = createDashboardPage(config)
  return { Layout, Page, generateMetadata }
}
