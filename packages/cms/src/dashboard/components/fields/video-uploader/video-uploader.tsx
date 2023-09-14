'use client'

import { useMutation } from '@tanstack/react-query'
import DefaultReactPlayer from 'react-player'
import { useState } from 'react'
import { Loader, Trash } from 'lucide-react'
import type { CMSVideoField } from '@nextjs-cms/core'
import { uploadVideo } from './queries'
import { Uploader } from '../../../../ui/uploader'
import { Button } from '../../../../ui/button'
import { cn } from '../../../lib/utils'

type VideoUploaderProps = {
  field: CMSVideoField
  uploadedVideo?: string
  onChange?: (uploadedVideo: string | null) => void
  className?: string
  style?: React.CSSProperties
}

// TODO: Remove once `react-player` is fixed.
/**
 * This is a workaround for a bug in `react-player` that causes it to have named `default` export.
 * @see https://github.com/cookpete/react-player/issues/1443
 */
const ReactPlayer =
  'default' in DefaultReactPlayer ? (DefaultReactPlayer.default as typeof DefaultReactPlayer) : DefaultReactPlayer

export default function VideoUploader({ field, uploadedVideo, onChange, className, style }: VideoUploaderProps) {
  const [progress, setProgress] = useState(0)
  const mutation = useMutation(
    (file: File) =>
      uploadVideo(file, ({ progress }) => {
        setProgress(progress ?? 0)
      }),
    {
      onSuccess: ({ url }) => {
        onChange?.(url)
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
        description="Accept Videos"
        accept={{
          'video/*': ['.mp4', '.mov', '.webm'],
        }}
        disabled={mutation.isLoading}
        onDrop={(acceptedFile) => {
          mutation.mutate(acceptedFile[0])
        }}
      />
      {mutation.isLoading ? <Loader className="absolute right-3 top-3 h-6 w-6 animate-spin" /> : null}
      {uploadedVideo ? (
        <div key={uploadedVideo} className="mt-2 flex items-center space-x-2 truncate rounded-md border p-2">
          <div className="h-10 w-10 overflow-hidden rounded-md">
            <ReactPlayer alt="" url={uploadedVideo} width={40} height={40} />
          </div>
          <div className="flex-1 truncate text-xs text-muted-foreground">
            <div className="line-clamp-1 truncate whitespace-break-spaces">{uploadedVideo}</div>
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
