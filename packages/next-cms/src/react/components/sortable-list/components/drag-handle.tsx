'use client'

import { useContext } from 'react'
import { SortableItemContext } from '../context'
import { Button } from '../../../ui/button'
import { cn } from '../../../lib/utils'
import { LucideIcon } from '../../../../ui'

type DragHandleProps = {
  className?: string
  style?: React.CSSProperties
}

export default function DragHandle({ className, style }: DragHandleProps) {
  const { attributes, listeners, ref } = useContext(SortableItemContext)

  return (
    <Button
      icon={<LucideIcon name="grip" />}
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
