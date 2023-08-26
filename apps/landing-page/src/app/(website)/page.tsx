import Image from 'next/image'
import Link from 'next/link'
import { createCollectionReader, createSingletonReader } from '@nextjs-cms/cms/component'
import config from '~/cms.config'
import HeroSection from '~/components/hero-section'

const HomePageHeroSectionSingleton = createSingletonReader(config, 'homePageHeroSection')
const BlogsCollection = createCollectionReader(config, 'blogs')

export default function Home() {
  return (
    <div className="space-y-12 px-4 py-4 sm:px-6 lg:px-8">
      <HomePageHeroSectionSingleton
        renderItem={({ data: { title, content, callToAction, coverImage } }) => {
          return <HeroSection title={title} description={content} image={coverImage} callToAction={callToAction} />
        }}
      />
      <BlogsCollection
        type="list"
        renderItems={({ items: blogs }) => {
          return (
            <div className="mx-auto max-w-screen-xl rounded-md">
              <div className="text-2xl font-semibold text-zinc-950">Blogs</div>
              <Link href="/blogs" className="mb-4 block text-sm text-zinc-500">
                Read more blogs...
              </Link>
              <div className="md:grid-col-2 grid grid-cols-1 gap-4 lg:grid-cols-3">
                {blogs.map((blog, index) => {
                  return (
                    <Link
                      href={`/blogs/${blog.elementSlug}`}
                      key={index}
                      className="block overflow-hidden rounded-xl border p-3"
                    >
                      <Image
                        width={blog.data.coverImage.width}
                        height={blog.data.coverImage.height}
                        src={blog.data.coverImage.url}
                        alt={blog.data.title}
                        className="mb-4 block aspect-video w-full rounded-2xl object-cover"
                      />
                      <div className="mb-1 text-lg font-medium text-zinc-950">{blog.data.title}</div>
                      <div className="line-clamp-2 text-sm text-zinc-500">{blog.data.shortContent}</div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        }}
      />
    </div>
  )
}
