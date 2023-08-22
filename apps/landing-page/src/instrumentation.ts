/* eslint-disable no-console */

import config from './cms.config'
import { env } from './env'

export async function register() {
  if (env.NEXT_RUNTIME === 'nodejs') {
    await import('@nextjs-cms/cms/core').then((mod) => {
      mod.bootstrap(config)
    })
  }
}
