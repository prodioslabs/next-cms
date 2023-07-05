import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
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
            <div className="grid grid-cols-2 items-center gap-4">
              <div>
                <h1 className="mb-2 text-2xl font-bold text-foreground">{title}</h1>
                <div className="prose-base mb-4 text-muted-foreground">
                  <ReactMarkdown>{content}</ReactMarkdown>
                </div>
                <Button>{callToAction}</Button>
              </div>
              <div className="col-span-1 h-[400px]">
                <Image
                  alt=""
                  src={coverImage[0].url}
                  height={coverImage[0].height}
                  width={coverImage[0].width}
                  className="h-full w-full rounded-md object-cover"
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
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div className="text-lg font-semibold text-foreground">Blogs</div>
                <Link href="/blogs" className="flex items-center text-sm text-muted-foreground">
                  View all
                  <ArrowRight className="ml-1 h-5 w-5" />
                </Link>
              </div>
              <div className="grid grid-cols-6 gap-4">
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
                      <div className="font-medium text-foreground">{blog.data.title}</div>
                      <div className="prose-sm line-clamp-2 text-sm text-muted-foreground">
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
