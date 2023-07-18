import { createUnsplashPlugin } from './cms/plugins/unsplash-image/plugin'
import { createCMSConfig } from './cms/core/config'
import { createAIContentPlugin } from './cms/plugins/ai-content/plugin'
import { env } from './env'

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
        callToActionIcon: {
          label: 'Call to Action Icon',
          type: 'icon',
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
        backgroundColor: {
          label: 'Background Color',
          type: 'color',
          required: true,
        },
        headingTextColor: {
          label: 'Heading Text Color',
          type: 'color',
          default: '#ffffff',
          required: true,
        },
        contentTextColor: {
          label: 'Content Text Color',
          type: 'color',
          default: '#e0e0e0',
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
  plugins: [
    createAIContentPlugin({
      OPENAI_API_KEY: env.OPENAI_API_KEY!,
    }),
    createUnsplashPlugin({
      UNSPLASH_ACCESS_KEY: env.UNSPLASH_ACCESS_KEY!,
    }),
  ],
})

export default config
