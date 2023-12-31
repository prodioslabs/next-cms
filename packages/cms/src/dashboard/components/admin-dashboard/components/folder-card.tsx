'use client'

import { Folder } from '@nextjs-cms/core'
import { FolderOpen } from 'lucide-react'
import Link from 'next/link'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '../../../../ui/context-menu'
import { cn } from '../../../lib/utils'

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
        <Link
          className={cn('flex items-center space-x-2 rounded-md border bg-background px-4 py-3 text-left', className)}
          style={style}
          href={`/cms/admin/media-library/${folder.id}`}
          title={folder.name}
        >
          <FolderOpen name="folder-open" className="h-4 w-4 text-muted-foreground" />
          <div className="flex-1 truncate text-sm text-foreground">{folder.name}</div>
        </Link>
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
