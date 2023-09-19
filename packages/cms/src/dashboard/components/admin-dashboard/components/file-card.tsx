'use client'

import { File } from '@nextjs-cms/core'
import { File as FileIcon, ImageIcon, VideoIcon } from 'lucide-react'
import { useMemo } from 'react'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '../../../../ui/context-menu'
import { cn } from '../../../lib/utils'

type FileCardProps = {
  file: File
  onRename?: (file: File) => void
  onDelete?: (file: File) => void
  className?: string
  style?: React.CSSProperties
}

export default function FileCard({ file, className, style }: FileCardProps) {
  const icon = useMemo(() => {
    const iconClassName = 'h-4 w-4 text-muted-foreground'

    // TODO: Render image and video preview
    switch (file.assetType) {
      case 'image':
        return <ImageIcon name="image" className={iconClassName} />
      case 'video':
        return <VideoIcon name="video" className={iconClassName} />
      default:
        return <FileIcon name="file" className={iconClassName} />
    }
  }, [file.assetType])

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <button
          className={cn('flex items-center space-x-2 rounded-md border bg-background px-4 py-3 text-left', className)}
          style={style}
          title={file.name}
        >
          {icon}
          <div className="flex-1 truncate text-sm text-foreground">{file.name}</div>
        </button>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Rename File</ContextMenuItem>
        <ContextMenuItem disabled>Move File</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="text-destructive">Delete File</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
