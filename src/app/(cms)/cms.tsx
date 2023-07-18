import config from '~/cms.config'
import { createRoute } from '~/cms/api/route'
import { createAdminPanelPages } from '~/cms/components/admin-dashboard/admin-dashboard'

export const { Layout, Page, generateMetadata } = createAdminPanelPages(config)
export const { contentManager, imageUploader } = createRoute(config)
