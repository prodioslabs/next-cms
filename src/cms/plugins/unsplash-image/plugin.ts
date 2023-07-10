import { z } from 'zod'
import { CMSPlugin } from '~/cms/types/plugin'
import UnsplashImageSelector from './components/unsplash-image-selector'

const unsplashConfigPlugin = z.object({
  UNSPLASH_ACCESS_KEY: z.string().min(1),
})

export function createUnsplashPlugin(config: z.infer<typeof unsplashConfigPlugin>): CMSPlugin {
  unsplashConfigPlugin.parse(config)

  return {
    name: 'unsplash-image',
    config,
    enabledForFields: ['image'],
    component: UnsplashImageSelector,
  }
}
