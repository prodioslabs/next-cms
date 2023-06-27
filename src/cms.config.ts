import { Config } from './core/config'

const cmsConfig = {
  singletons: {
    homePageHeroSection: {
      slug: 'home-page-hero-section',
      name: 'Home Page Hero Section',
      path: 'home-page/hero-section',
      fields: {
        title: {
          type: 'text',
          required: true,
        },
        content: {
          type: 'rich-text',
          required: true,
        },
      },
    },
  },
  collections: {},
} as const satisfies Config

export default cmsConfig
