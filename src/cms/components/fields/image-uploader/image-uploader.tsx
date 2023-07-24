'use client'

import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'
import { CMSImageData } from '~/cms/types/field'
import { Uploader } from '~/components/ui/uploader'
import { cn } from '~/lib/utils'
import { uploadImage } from './queries'

type ImageUploaderProps = {
  uploadedImage?: CMSImageData
  onChange?: (uploadImage: CMSImageData) => void
  className?: string
  style?: React.CSSProperties
}

export default function ImageUploader({ uploadedImage, onChange, className, style }: ImageUploaderProps) {
  const mutation = useMutation(uploadImage, {
    onSuccess: (image) => {
      // if multiple then pass all the uploaded images, else just pass the uploaded image
      onChange?.(image)
    },
  })

  return (
    <div className={cn('relative cursor-pointer', className)} style={style}>
      <Uploader
        description="Accept Images"
        accept={{
          'image/*': ['.jpeg', '.png'],
        }}
        disabled={mutation.isLoading}
        onDrop={(acceptedFile) => {
          mutation.mutate(acceptedFile[0])
        }}
      />
      {mutation.isLoading ? <Loader2 className="absolute right-3 top-3 h-6 w-6 animate-spin" /> : null}
      {uploadedImage ? (
        <div key={uploadedImage.url} className="mt-2 flex items-center space-x-2 truncate rounded-md border p-2">
          <Image
            alt=""
            src={uploadedImage.url}
            width={uploadedImage.width}
            height={uploadedImage.height}
            className="h-10 w-10 rounded-md object-cover"
          />
          <div className="flex-1 truncate text-xs text-muted-foreground">
            <div className="line-clamp-1 truncate whitespace-break-spaces">{uploadedImage.url}</div>
            <div className="truncate">
              {uploadedImage.width}x{uploadedImage.height}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
