/* eslint-disable no-console */

import config from '~/cms.config'
import { bootstrap } from '~/cms/core/bootstrap'
import { env } from './env'

export async function register() {
  console.log('🛫 Bootstrapping CMS')
  if (env.NEXT_RUNTIME === 'nodejs') {
    await bootstrap(config)
  }
  console.log('🛬 Bootstrapping completed')
}
