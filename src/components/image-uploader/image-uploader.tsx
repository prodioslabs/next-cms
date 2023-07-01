'use client'

import { useMutation } from 'react-query'
import Image from 'next/image'
import { X, Loader2 } from 'lucide-react'
import { ImageData } from '~/core/field'
import { Uploader } from '../ui/uploader'
import { uploadImage } from './queries'
import { cn } from '~/lib/utils'
import { Button } from '../ui/button'

type ImageUploaderProps = {
  uploadedImages?: ImageData[]
  multiple?: boolean
  onChange?: (uploadImages: ImageData[]) => void
  className?: string
  style?: React.CSSProperties
}

export default function ImageUploader({ uploadedImages, onChange, multiple, className, style }: ImageUploaderProps) {
  const mutation = useMutation(uploadImage, {
    onSuccess: (uploadedImage) => {
      // if multiple then pass all the uploaded images, else just pass the uploaded image
      onChange?.(multiple ? [...(uploadedImages ?? []), uploadedImage] : [uploadedImage])
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
      {uploadedImages?.length ? (
        <div className="mt-2 space-y-2">
          {uploadedImages.map((uploadedImage) => {
            return (
              <div key={uploadedImage.url} className="flex items-center space-x-2 truncate rounded-md border p-2">
                <Image
                  alt=""
                  src={uploadedImage.url}
                  width={uploadedImage.width}
                  height={uploadedImage.height}
                  className="h-10 w-10 rounded-md object-cover"
                />
                <div className="flex-1 truncate text-xs text-muted-foreground">
                  <div className="truncate">{uploadedImage.url}</div>
                  <div className="truncate">
                    {uploadedImage.width}x{uploadedImage.height}
                  </div>
                </div>
                <Button
                  variant="secondary"
                  size="icon"
                  type="button"
                  onClick={() => {
                    // remove the image
                    onChange?.((uploadedImages ?? []).filter((image) => image.url !== uploadedImage.url))
                  }}
                  icon={<X />}
                />
              </div>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
