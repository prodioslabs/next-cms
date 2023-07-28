import { CMSPlugin } from '~/types/plugin'
import UnsplashImageSelector from './components/unsplash-image-selector'
import { searchImage } from './api/route'

export function createUnsplashPlugin(config: any): CMSPlugin {
  return {
    name: 'unsplash-image',
    config,
    enabledForFields: ['image'],
    component: UnsplashImageSelector,
    api: {
      method: 'GET',
      handler: searchImage,
    },
  }
}
