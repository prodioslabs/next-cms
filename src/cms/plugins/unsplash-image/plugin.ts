import { CMSPlugin } from '~/cms/types/plugin'
import UnsplashImageSelector from './components/unsplash-image-selector'

export function createUnsplashPlugin(config: any): CMSPlugin {
  return {
    name: 'unsplash-image',
    config,
    enabledForFields: ['image'],
    component: UnsplashImageSelector,
  }
}
