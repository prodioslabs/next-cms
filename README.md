# next-cms

# Configuration

To get started, first create a configuration file.

```tsx
// cms.config.ts
import { type Config, field, createComponents } from '~/cms/core'

export const config = {
  singletons: [
    {
      id: 'homePageHeroSection',
      name: 'Home Page Hero Section',
      schema: {
        title: fields.string({ label: 'Title' }),
        subtitle: fields.string({ label: 'Subtitle' }),
        image: fields.image({ label: 'Image' }),
      },
    },
  ],
  collections: [
    {
      id: 'blogs',
      name: 'Blogs',
      schema: {
        slug: fields.slug({ from: 'title' }),
        title: fields.string({ label: 'Title' }),
        content: fields.richText({ label: 'Content' }),
        draft: fields.richText({ label: 'Draft' }),
        createdAt: fields.date({ default: new Date(), hidden: true }),
        updatedAt: fields.updatedAt(),
        author: fields.string({ label: 'Author' }),
        coverImage: fields.image({ label: 'Cover Image' }),
      },
    },
  ],
} as const satisfies Config

export const [Singleton, Collection] = createComponents(config)
```

## Singleton

`Singleton` component provides a way to create a singleton content type. These are one-of-a-kind content types that are not meant to be repeated. For example, a hero section on a home page.

```tsx
import { Singleton } from '~/cms.config'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <Singleton for="homePageHeroSection">
      {({ content: { title, subtitle, image } }) => {
        return (
          <div>
            <div className="text-3xl">{title}</div>
            <div className="text-2xl">{subtitle}</div>
            <Image src={image.url} width={image.width} height={image.height} />
          </div>
        )
      }}
    </Singleton>
  )
}
```

## Collection

`Collection` component provides a way to create a collection content type. These are content types that are meant to be repeated. For example, a list of blog posts.

```tsx
import { Collection } from '~/cms.config'

export default function Blogs() {
  return (
    <Collection for="blogs">
      {({ items: blogs }) => {
        return (
          <div>
            {blogs.map(({ content: { slug, title, author } }) => {
              return (
                <Link key={slug} href={`/blogs/${slug}`}>
                  <div>{title}</div>
                  <div>{author}</div>
                </Link>
              )
            })}
          </div>
        )
      }}
    </Collection>
  )
}
```
