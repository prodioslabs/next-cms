'use client'

import { Trash } from 'lucide-react'
import { useMutation } from 'react-query'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '../ui/popover'
import { deleteCollectionItem } from './queries'
import { useToast } from '../ui/use-toast'

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
  onDelete,
  className,
  style,
}: DeleteCollectionItemProps) {
  const router = useRouter()

  const { toast } = useToast()

  const mutation = useMutation(deleteCollectionItem, {
    onSuccess: () => {
      router.refresh()
      onDelete?.()
      toast({
        title: 'Item deleted successfully',
      })
    },
    onError: (error) => {
      toast({
        title: 'Something went wrong',
        description: (error as Error).message,
        variant: 'destructive',
      })
    },
  })

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
          <Button
            size="sm"
            variant="outline"
            loading={mutation.isLoading}
            onClick={() => {
              mutation.mutate({ id: collectionId, elementIndex })
            }}
          >
            Continue
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
