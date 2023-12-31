'use client'

import { Editor } from '@tiptap/react'
import { useState } from 'react'
import type { CMSImageData } from '@nextjs-cms/core'
import { Image } from 'lucide-react'
import ImageUploader from '../../image-uploader'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../../../ui/dialog'
import { Button } from '../../../../../ui/button'

type ImageButtonProps = {
  editor: Editor
  className?: string
  style?: React.CSSProperties
}

export default function ImageButton({ editor, className, style }: ImageButtonProps) {
  const [uploadedImage, setUploadedImage] = useState<CMSImageData | undefined | null>(null)

  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(openState) => {
        setDialogOpen(openState)
        setUploadedImage(undefined)
      }}
    >
      <DialogTrigger asChild>
        <Button size="icon" variant="outline" icon={<Image />} className={className} style={style} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Insert Image</DialogTitle>
          <DialogDescription>Upload image to upload</DialogDescription>
        </DialogHeader>
        <ImageUploader required uploadedImage={uploadedImage ?? undefined} onChange={setUploadedImage} />
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            disabled={!uploadedImage}
            onClick={() => {
              if (uploadedImage) {
                editor.chain().setImage({ src: uploadedImage.url }).run()
                setDialogOpen(false)
              }
            }}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
