export default function Home() {
  // return (
  //   <div className="space-y-8 p-4">
  //     <HomePageHeroSectionSingleton
  //       render={({ item: { title, content, coverImage, callToAction } }) => {
  //         return (
  //           <div className="grid grid-cols-2 items-center gap-4">
  //             <div>
  //               <h1 className="mb-2 text-2xl font-bold text-foreground">{title}</h1>
  //               <div className="prose-base mb-4 text-muted-foreground">
  //                 <ReactMarkdown>{content}</ReactMarkdown>
  //               </div>
  //               <Button>{callToAction}</Button>
  //             </div>
  //             <div className="col-span-1 h-[400px]">
  //               <Image
  //                 alt=""
  //                 src={coverImage[0].url}
  //                 height={coverImage[0].height}
  //                 width={coverImage[0].width}
  //                 className="h-full w-full rounded-md object-cover"
  //               />
  //             </div>
  //           </div>
  //         )
  //       }}
  //     />
  //     <BlogsCollection
  //       render={({ items: blogs }) => {
  //         return (
  //           <div>
  //             <div className="mb-4 flex items-center justify-between">
  //               <div className="text-lg font-semibold text-foreground">Blogs</div>
  //               <Link href="/blogs" className="flex items-center text-sm text-muted-foreground">
  //                 View all
  //                 <ArrowRight className="ml-1 h-5 w-5" />
  //               </Link>
  //             </div>
  //             <div className="grid grid-cols-6 gap-4">
  //               {blogs.map((blog, index) => {
  //                 return (
  //                   <div key={index} className="rounded-md border border-border p-4">
  //                     <Image
  //                       width={blog.coverImage[0].width}
  //                       height={blog.coverImage[0].height}
  //                       src={blog.coverImage[0].url}
  //                       alt={blog.title}
  //                       className="mb-2 h-40 w-full rounded-md object-cover"
  //                     />
  //                     <div className="font-medium text-foreground">{blog.title}</div>
  //                     <div className="prose-sm line-clamp-2 text-sm text-muted-foreground">
  //                       <ReactMarkdown>{blog.content}</ReactMarkdown>
  //                     </div>
  //                   </div>
  //                 )
  //               })}
  //             </div>
  //           </div>
  //         )
  //       }}
  //     />
  //   </div>
  // )

  return null
}
