'use client'

import { File } from '@nextjs-cms/core'
import { File as FileIcon } from 'lucide-react'
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
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <button
          className={cn('flex items-center space-x-2 rounded-md border bg-background px-4 py-3 text-left', className)}
          style={style}
        >
          <FileIcon name="file" className="h-4 w-4 text-muted-foreground" />
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
