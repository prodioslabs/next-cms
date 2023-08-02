'use client'

import { Editor } from '@tiptap/react'
import { Image } from 'lucide-react'
import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from 'ui'
import { useState } from 'react'
import ImageUploader from '../../image-uploader'
import { CMSImageData } from '../../../../../types'

type ImageButtonProps = {
  editor: Editor
  className?: string
  style?: React.CSSProperties
}

export default function ImageButton({ editor, className, style }: ImageButtonProps) {
  const [uploadedImage, setUploadedImage] = useState<CMSImageData | undefined | null>(null)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline" icon={<Image />} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Insert Image</DialogTitle>
          <DialogDescription>Upload image to upload</DialogDescription>
        </DialogHeader>
        <ImageUploader
          field={{ required: false, label: '', type: 'image' }}
          uploadedImage={uploadedImage ?? undefined}
          onChange={setUploadedImage}
        />
      </DialogContent>
    </Dialog>
  )
}
