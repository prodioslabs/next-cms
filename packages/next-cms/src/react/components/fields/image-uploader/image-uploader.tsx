'use client'

import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { Loader2, Trash } from 'lucide-react'
import { useState } from 'react'
import { Uploader, Button, cn } from 'ui'
import { CMSImageData, CMSImageField } from '../../../../types/field'
import { uploadImage } from './queries'

type ImageUploaderProps = {
  field: CMSImageField
  uploadedImage?: CMSImageData
  onChange?: (uploadImage: CMSImageData | null) => void
  className?: string
  style?: React.CSSProperties
}

export default function ImageUploader({ field, uploadedImage, onChange, className, style }: ImageUploaderProps) {
  const [progress, setProgress] = useState(0)
  const mutation = useMutation(
    (file: File) =>
      uploadImage(file, ({ progress }) => {
        setProgress(progress ?? 0)
      }),
    {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onSuccess: ({ assetType, ...image }) => {
        onChange?.(image)
      },
    },
  )

  return (
    <div className={cn('relative cursor-pointer overflow-hidden rounded-md', className)} style={style}>
      {progress !== 0 && progress !== 1 ? (
        <div className="absolute left-0 right-0 top-0 h-1 overflow-hidden rounded-full">
          <div className="h-full bg-primary transition-all" style={{ width: `${progress * 100}%` }} />
        </div>
      ) : null}
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
          {!field.required ? (
            <Button
              icon={<Trash />}
              size="icon"
              variant="destructive-outline"
              type="button"
              className="opacity-30 transition-opacity hover:opacity-100"
              onClick={() => {
                onChange?.(null)
              }}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
