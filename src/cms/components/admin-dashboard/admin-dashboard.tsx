import { Config } from '~/cms/types/config'
import { Field } from '~/cms/types/field'
import { Collection, Singleton } from '~/cms/types/schema'
import createDashboardLayout from './components/dashboard-layout'
import createDashboardPage from './components/dashboard-page'

export function createAdminPanelPages<
  Collections extends Record<string, Collection<Record<string, Field>>>,
  Singletons extends Record<string, Singleton<Record<string, Field>>>,
>(config: Config<Collections, Singletons>) {
  return { Layout: createDashboardLayout(config), Page: createDashboardPage(config) }
}
