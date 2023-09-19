'use client'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../../ui/dialog'
import { Button } from '../../../../ui/button'
import { Uploader } from '../../../../ui/uploader'
import { uploadAsset } from '../queries'

type UploadFileProps = {
  children: React.ReactElement<{ onClick: () => void }>
  folderId?: string
  onFileUploaded?: () => void
}

export default function UploadFile({ children, folderId, onFileUploaded }: UploadFileProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  const mutation = useMutation(
    (file: File) =>
      uploadAsset({ file, folderId }, ({ progress }) => {
        setProgress(progress ?? 0)
      }),
    {
      onSuccess: () => {
        onFileUploaded?.()
      },
    },
  )

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
          <DialogDescription>Add files to media library</DialogDescription>
        </DialogHeader>
        <div className="relative cursor-pointer overflow-hidden rounded-md">
          {progress !== 0 && progress !== 1 ? (
            <div className="absolute left-0 right-0 top-0 h-1 overflow-hidden rounded-full">
              <div className="h-full bg-primary transition-all" style={{ width: `${progress * 100}%` }} />
            </div>
          ) : null}
          {mutation.isLoading ? <Loader className="absolute right-3 top-3 h-6 w-6 animate-spin" /> : null}
          <Uploader
            description="Accept Images and Videos"
            accept={{
              'image/*': ['.jpeg', '.png'],
              'video/*': ['.mp4', '.mov', '.webm'],
            }}
            disabled={mutation.isLoading}
            onDrop={(acceptedFile) => {
              mutation.mutate(acceptedFile[0])
            }}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
