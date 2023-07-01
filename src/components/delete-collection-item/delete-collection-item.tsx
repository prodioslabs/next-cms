'use client'

import { Trash } from 'lucide-react'
import { Button } from '../ui/button'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '../ui/popover'

type DeleteCollectionItemProps = {
  collectionId: string
  elementIndex: number
  onDelete?: () => void
  className?: string
  style?: React.CSSProperties
}

export default function DeleteCollectionItem({
  collectionId,
  elementIndex,
  className,
  style,
}: DeleteCollectionItemProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" icon={<Trash />} variant="secondary" className={className} style={style} />
      </PopoverTrigger>
      <PopoverContent className="w-80" side="bottom" align="end">
        <div className="mb-1 text-base font-medium text-foreground">Delete item?</div>
        <div className="mb-2 text-sm text-muted-foreground">
          Item once deleted cannot be recovered. Do you want to continue?
        </div>
        <div className="flex items-center justify-end space-x-2">
          <PopoverClose asChild>
            <Button size="sm" variant="ghost">
              Cancel
            </Button>
          </PopoverClose>
          <Button size="sm" variant="outline">
            Continue
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
