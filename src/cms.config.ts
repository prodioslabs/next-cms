import { Config } from './core/config'

const cmsConfig = {
  basePath: `${process.cwd()}/content`,
  singletons: {
    homePageHeroSection: {
      name: 'Home Page Hero Section',
      description: 'Hero section on the home page',
      path: 'home-page/hero-section',
      fields: {
        title: {
          label: 'Title',
          type: 'text',
          required: true,
        },
        content: {
          label: 'Content',
          type: 'rich-text',
          required: true,
        },
        productLaunchDate: {
          label: 'Product Launch Date',
          type: 'date',
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
          label: 'Cover Image',
          type: 'image',
          required: true,
        },
        title: {
          label: 'Title',
          type: 'text',
          required: true,
        },
        content: {
          label: 'Content',
          type: 'rich-text',
          required: true,
        },
      },
    },
  },
} as const satisfies Config

export default cmsConfig
