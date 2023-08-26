'use client'

import { useRouter } from 'next/navigation'
import { api } from '../../../server/api'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '../../ui/popover'
import { Button } from '../../ui/button'
import { useToast } from '../../hooks/use-toast'
import { LucideIcon } from '../../../ui'

type DeleteCollectionItemProps = {
  elementId: string
  onDelete?: () => void
  className?: string
  style?: React.CSSProperties
}

export default function DeleteCollectionItem({ elementId, onDelete, className, style }: DeleteCollectionItemProps) {
  const router = useRouter()

  const { toast } = useToast()

  const mutation = api.collection.deleteCollectionElement.useMutation({
    onSuccess: (element) => {
      router.refresh()
      onDelete?.()
      toast({
        title: 'Item deleted successfully',
        description: `Item ${element.id} has been deleted successfully`,
      })
    },
    onError: (error) => {
      toast({
        title: 'Something went wrong',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          icon={<LucideIcon name="trash" />}
          variant="secondary"
          className={className}
          style={style}
        />
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
          <Button
            size="sm"
            variant="outline"
            loading={mutation.isLoading}
            onClick={() => {
              mutation.mutate({ elementId })
            }}
          >
            Continue
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
