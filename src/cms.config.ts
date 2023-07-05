import { createCMSConfig } from './cms/core/config'

const config = createCMSConfig({
  singletons: {
    homePageHeroSection: {
      label: 'Home Page Hero Section',
      description: 'Hero section on the home page',
      schema: {
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
        callToAction: {
          label: 'Call to Action',
          type: 'text',
          required: true,
          default: 'Learn More',
        },
        coverImage: {
          label: 'Cover Image',
          type: 'image',
          required: true,
        },
      },
    },
  },
  collections: {
    blogs: {
      label: 'Blogs',
      slugField: 'slug',
      nameField: 'title',
      schema: {
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
        slug: {
          label: 'Slug',
          type: 'slug',
          from: 'title',
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
})

export default config
