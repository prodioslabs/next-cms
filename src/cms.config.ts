import { Config } from './core/config'

const cmsConfig = {
  singletons: {
    homePageHeroSection: {
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
  collections: {
    blogs: {
      name: 'Blogs',
      path: 'blogs',
      fields: {
        coverImage: {
          type: 'image',
          required: true,
        },
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
} as const satisfies Config

export default cmsConfig
