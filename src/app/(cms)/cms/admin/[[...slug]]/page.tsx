'use client'

import config from '~/cms.config'
import { createDashboardPage } from '~/cms/components/admin-dashboard/admin-dashboard'

const Page = createDashboardPage(config)
export default Page
