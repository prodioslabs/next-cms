import config from '~/cms.config'
import { createRoute } from '~/cms/api/route'
import { createAdminPanelPages } from '~/cms/components/admin-dashboard/admin-dashboard'
import { createTRPCHandler } from '~/cms/server/handler'

export const { Layout, Page, generateMetadata } = createAdminPanelPages(config)
export const { imageUploader } = createRoute(config)
export const trpcHandler = createTRPCHandler(config)
