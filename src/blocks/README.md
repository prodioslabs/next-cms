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

## De-coupled Blocks

The idea of creating blocks is to have the block config coupled tightly with the block component. But sometimes we don't want that behaviour. For example there could be a feature section that might be used in the home page as a product features page. In that case we don't want the feature section to be coupled with the home page. We can create a de-coupled block in that case.

```tsx
const ProductsCollection = createCollection('products', {
  title: {
    type: 'text',
    label: 'Text',
    required: true,
  },
  description: {
    type: 'rich-text',
    label: 'Description',
    required: true,
  },
  price: {
    type: 'number',
    label: 'Price in $',
    required: true,
  },
  productImage: {
    type: 'image',
    label: 'Product Image',
    required: true,
  },
})

type HomePageProductCollectionProps = {
  redirectProductOnClick: boolean
}

const HomePageProductCollection = createCollectionBlock<
  InferCollectionSchema<typeof ProductsCollection>,
  HomePageProductsCollectionProps
>(ProductsCollection, ({ redirectProductOnClick, collectionsData }) => {
  return (
    <div>
      {collectionsData.map((collectionItem) => {
        return (
          <div className={collectionItem.id}>
            <div>{collectionItem.title}</div>
            <div>{collectionItem.description}</div>
            <div>$ {collectionItem.price}</div>
            <div>Buy Now</div>
          </div>
        )
      })}
    </div>
  )
})
```

```ts
export const HeroSectionSingleton = new Singleton('heroSection', {
  title: { type: 'text', label: 'Title', required: true },
  description: { type: 'rich-text', label: 'Description' },
})

type HeroSectionProps = {
  className?: string
  style?: React.CSSProperties
}

export const HeroSection = createSingletonBlock<InferCollectionSchema<typeof HeroSectionSingleton, HeroSectionProps>>(
  HeroSectionSingleton,
  ({ cmsData: { title } }) => {
    return (
      <div>
        <h1>{title}</h1>
      </div>
    )
  },
)
```
