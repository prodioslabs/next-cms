import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
import Link from 'next/link'
import config from '~/cms.config'
import { createSingletonReader, createCollectionReader } from '~/cms/core/components'
import { Button } from '~/components/ui/button'

const HomePageHeroSectionSingleton = createSingletonReader(config, 'homePageHeroSection')
const BlogsCollection = createCollectionReader(config, 'blogs')

export default function Home() {
  return (
    <div className="space-y-8 p-4">
      <HomePageHeroSectionSingleton
        renderItem={({ data: { title, content, coverImage, callToAction } }) => {
          return (
            <div className="mx-auto grid grid-cols-2 items-center gap-4">
              <div className="ml-auto max-w-xl">
                <h1 className="mb-8 text-5xl font-medium text-foreground">{title}</h1>
                <div className="prose-base mb-4 text-muted-foreground">
                  <ReactMarkdown>{content}</ReactMarkdown>
                </div>
                <Button>{callToAction}</Button>
              </div>
              <div className="col-span-1 min-h-[400px]">
                <Image
                  alt=""
                  src={coverImage[0].url}
                  height={coverImage[0].height}
                  width={coverImage[0].width}
                  className="h-full w-full rounded-md object-contain"
                />
              </div>
            </div>
          )
        }}
      />
      <BlogsCollection
        type="list"
        renderItems={({ items: blogs }) => {
          return (
            <div className="mx-auto max-w-screen-xl">
              <div className="mb-2 text-center text-2xl font-semibold text-foreground">Blogs</div>
              <div className="flex items-center justify-center">
                <Link href="/blogs" className="mx-auto flex items-center text-sm text-muted-foreground">
                  Read more blogs...
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {blogs.map((blog, index) => {
                  return (
                    <Link
                      href={`/blogs/${blog.elementSlug}`}
                      key={index}
                      className="rounded-md border border-border p-4"
                    >
                      <Image
                        width={blog.data.coverImage[0].width}
                        height={blog.data.coverImage[0].height}
                        src={blog.data.coverImage[0].url}
                        alt={blog.data.title}
                        className="mb-2 h-40 w-full rounded-md object-cover"
                      />
                      <div className="line-clamp-2 font-medium text-foreground">{blog.data.title}</div>
                      <div className="line-clamp-2 text-sm text-muted-foreground">
                        <ReactMarkdown>{blog.data.content}</ReactMarkdown>
                      </div>
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
