/* eslint-disable no-console */

import config from '~/cms.config'
import { bootstrap } from '~/cms/core/bootstrap'

export async function register() {
  console.log('🛫 Bootstrapping CMS')
  await bootstrap(config)
  console.log('🛬 Bootstrapping completed')
}
