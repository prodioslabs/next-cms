/* eslint-disable no-console */

import colors from 'colors'
import config from '~/cms.config'
import { bootstrap } from '~/cms/core/bootstrap'

export async function register() {
  console.log(colors.blue('🛫 Bootstrapping CMS'))
  await bootstrap(config)
  console.log(colors.blue('🛬 Bootstrapping completed'))
}
