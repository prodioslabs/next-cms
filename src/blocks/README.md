# CMS Blocks

While building websites, we generally need blocks such as hero section, feature section, etc. Blocks provides an API to create such reusable components that can be used directly with `next-cms`.

The conventional approach of creating `singleton` or `collection` in the `cms.config` file and using a reader in the component hampers the developer experience. The **blocks** API provide a way of collocating the block data configuration and component.

```tsx
const HeroSection = createSingletonBlock({
  config: {
    label: 'Hero Section',
    schema: {
      title: {
        type: 'text',
        label: 'Title',
        required: true,
      },
      content: {
        type: 'rich-text',
        label: 'Description',
      },
    },
  },
  component: ({ data: { title, content } }) => {
    return (
      <div>
        <h1>{title}</h1>
      </div>
    )
  },
})
```
