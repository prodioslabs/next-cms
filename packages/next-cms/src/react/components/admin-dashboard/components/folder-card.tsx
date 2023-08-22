'use client'

import { Folder } from '@prisma/client'
import { FolderIcon } from 'lucide-react'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
  cn,
} from '@next-cms/ui'

type FolderCardProps = {
  folder: Folder
  onRename?: (folder: Folder) => void
  onDelete?: (folder: Folder) => void
  className?: string
  style?: React.CSSProperties
}

export default function FolderCard({ folder, className, style }: FolderCardProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <button
          className={cn('flex items-center space-x-2 rounded-md border bg-background px-4 py-3 text-left', className)}
          style={style}
        >
          <FolderIcon className="h-4 w-4 text-muted-foreground" />
          <div className="flex-1 truncate text-sm text-foreground">{folder.name}</div>
        </button>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Rename Folder</ContextMenuItem>
        <ContextMenuItem disabled>Move Folder</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="text-destructive">Delete Folder</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
