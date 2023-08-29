'use client'

import { useMemo } from 'react'
import { Image, PackageOpen, Plus, Upload } from 'lucide-react'
import { api } from '../../../../server/api'
import CreateFolder from './create-folder'
import FolderCard from './folder-card'
import { Loader } from '../../../../ui/loader'
import { useToast } from '../../../hooks/use-toast'
import { Button } from '../../../../ui/button'
import { PageHeading } from '../../../../ui/page-heading'

type MediaLibraryProps = {
  folderId?: string
}

export default function MediaLibrary({ folderId }: MediaLibraryProps) {
  const { toast } = useToast()

  const folderContentQuery = api.media.getFolderContent.useQuery({ id: folderId })

  const foldersContent = useMemo(() => {
    if (folderContentQuery.isLoading) {
      return <Loader message="Loading Folders..." />
    }

    if (folderContentQuery.data) {
      if (folderContentQuery.data.folders.length === 0) {
        return (
          <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-4">
            <PackageOpen name="package-open" className="mb-2 h-10 w-10 text-muted-foreground opacity-20" />
            <div className="mb-2 text-sm text-muted-foreground">No folders found</div>
            <CreateFolder
              folderId={folderId}
              onFolderCreated={() => {
                folderContentQuery.refetch()
              }}
            >
              <Button icon={<Plus name="plus" />} size="sm" variant="outline">
                Create Folder
              </Button>
            </CreateFolder>
          </div>
        )
      }

      return (
        <div className="grid grid-cols-4 gap-4">
          {folderContentQuery.data.folders.map((folder) => {
            return (
              <FolderCard
                key={folder.id}
                folder={folder}
                onDelete={() => {
                  folderContentQuery.refetch()
                }}
                onRename={() => {
                  folderContentQuery.refetch()
                }}
              />
            )
          })}
        </div>
      )
    }
  }, [folderId, folderContentQuery])

  const filesContent = useMemo(() => null, [])

  return (
    <>
      <title>Media Library</title>
      <div className="space-y-4 p-4">
        <PageHeading title="Media Library" icon={<Image />} />
        <div className="relative flex items-center justify-between space-x-4 px-4 before:absolute before:left-0 before:right-0 before:top-1/2 before:-z-10 before:h-px before:bg-muted">
          <div className="bg-background px-1 text-sm font-medium text-muted-foreground">Folders</div>
          <div className="bg-background px-2">
            <CreateFolder
              folderId={folderId}
              onFolderCreated={(folderCreated) => {
                folderContentQuery.refetch()
                toast({
                  title: 'Success',
                  description: `Folder ${folderCreated.name} has been created successfully`,
                })
              }}
            >
              <Button icon={<Plus />} size="sm" variant="outline">
                Create Folder
              </Button>
            </CreateFolder>
          </div>
        </div>
        {foldersContent}
        <div className="relative flex items-center justify-between space-x-4 px-4 before:absolute before:left-0 before:right-0 before:top-1/2 before:-z-10 before:h-px before:bg-muted">
          <div className="bg-background px-1 text-sm font-medium text-muted-foreground">Files</div>
          <div className="bg-background px-2">
            <Button icon={<Upload />} size="sm" variant="outline">
              Upload File
            </Button>
          </div>
        </div>
        {filesContent}
      </div>
    </>
  )
}
