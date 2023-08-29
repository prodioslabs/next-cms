'use client'

import { useContext } from 'react'
import { Grip } from 'lucide-react'
import { SortableItemContext } from '../context'
import { Button } from '../../../../ui/button'
import { cn } from '../../../lib/utils'

type DragHandleProps = {
  className?: string
  style?: React.CSSProperties
}

export default function DragHandle({ className, style }: DragHandleProps) {
  const { attributes, listeners, ref } = useContext(SortableItemContext)

  return (
    <Button
      icon={<Grip />}
      {...attributes}
      {...listeners}
      ref={ref}
      type="button"
      variant="ghost"
      size="icon"
      className={cn('cursor-grab', className)}
      style={style}
    />
  )
}
