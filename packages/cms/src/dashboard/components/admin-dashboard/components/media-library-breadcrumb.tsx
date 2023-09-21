import Link from 'next/link'
import { Prisma } from '@nextjs-cms/core'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '../../../../ui/breadcrumb'

type MediaLibraryBreadcrumbProps = {
  className?: string
  folder: Prisma.FileGetPayload<{
    select: {
      id: true
      name: true
      parent: {
        select: {
          id: true
          name: true
        }
      }
    }
  }>
}

export function MediaLibraryBreadcrumb({ className, folder }: MediaLibraryBreadcrumbProps) {
  return (
    <Breadcrumb className={className}>
      {folder.parent ? (
        <BreadcrumbItem>
          <BreadcrumbLink as={'span'} className="pointer-events-none">
            ...
          </BreadcrumbLink>
        </BreadcrumbItem>
      ) : null}
      {folder.parent ? (
        <BreadcrumbItem>
          <BreadcrumbLink
            as={Link}
            href={`/cms/admin/media-library/${folder.parent.id}`}
            className="max-w-[8rem] text-ellipsis overflow-hidden whitespace-nowrap"
          >
            {folder.parent.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ) : (
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/cms/admin/media-library/">
            Folders
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink
          as={Link}
          href={`/cms/admin/media-library/${folder.id}`}
          className="max-w-[8rem] text-ellipsis overflow-hidden whitespace-nowrap"
        >
          {folder.name}
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}
