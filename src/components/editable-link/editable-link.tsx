'use client'

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { LuChevronRight } from 'react-icons/lu'
import { Collection } from '~/core'
import { cn } from '~/lib/utils'

type EditableLinkProps = {
  collection: Collection
  collectionId: string
  elementId: string
}

export default function EditableLink({ collectionId, collection, elementId }: EditableLinkProps) {
  const [visible, setVisible] = useState(false)

  // container element bounding box
  const [containerBB, setContainerBB] = useState<DOMRect | undefined>(undefined)

  // timeout to prevent hiding the element as soon as mouse leaves the container element
  // instead of setting the visibility to false immediately, a setTimeout (with 100ms timeout)
  // is used to delay the closing, and if the user has hovered within the time, then the timeout
  // would be cleared
  const timeout = useRef<NodeJS.Timeout | null>(null)

  const handleMouseOver = useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current)
    }

    setContainerBB(document.getElementById(elementId)?.getBoundingClientRect())
    setVisible(true)
  }, [elementId])

  const handleMouseLeave = useCallback(() => {
    timeout.current = setTimeout(() => {
      setVisible(false)
      setContainerBB(undefined)
    }, 200)
  }, [])

  useEffect(
    function addMouseOverEventListener() {
      const containerElement = document.getElementById(elementId)
      containerElement?.addEventListener('mouseover', handleMouseOver)
      containerElement?.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        containerElement?.removeEventListener('mouseover', handleMouseOver)
        containerElement?.removeEventListener('mouseleave', handleMouseLeave)
      }
    },
    [elementId, handleMouseOver, handleMouseLeave],
  )

  const styles = useMemo(() => {
    if (!containerBB) {
      return undefined
    }

    const topOffset = 64
    const spaceAvailableAtTop = containerBB.top >= topOffset

    return {
      verticalPosition: spaceAvailableAtTop ? 'top' : 'bottom',
    }
  }, [containerBB])

  return visible && containerBB
    ? createPortal(
        <>
          {/* element rendering the border box */}
          <div
            className={cn('pointer-events-none fixed rounded-md border border-border', {
              'rounded-tr-none': styles?.verticalPosition === 'top',
              'rounded-br-none': styles?.verticalPosition === 'bottom',
            })}
            style={{
              top: containerBB.top - 4,
              left: containerBB.left - 4,
              width: containerBB.width + 8,
              height: containerBB.height + 8,
            }}
          />
          <Link
            href={`/admin/${collectionId}`}
            className={cn('fixed z-10 flex transform justify-end', {
              'translate-y-[calc(-100%-4px)]': styles?.verticalPosition === 'top',
              'translate-y-[4px]': styles?.verticalPosition === 'bottom',
            })}
            style={{
              top: styles?.verticalPosition === 'top' ? containerBB.top : containerBB.bottom,
              left: containerBB.left - 4,
              width: containerBB.width + 8,
            }}
            onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseLeave}
          >
            <span
              className={cn(
                'flex flex-shrink-0 items-center whitespace-nowrap rounded border border-border bg-muted px-2 py-1 text-xs text-muted-foreground',
                {
                  'rounded-b-none border-b-0': styles?.verticalPosition === 'top',
                  'rounded-t-none border-t-0': styles?.verticalPosition === 'bottom',
                },
              )}
            >
              Edit {collection.name}
              <LuChevronRight className="ml-2 h-4 w-4" />
            </span>
          </Link>
        </>,
        document.getElementById('editable-element-portal')!,
      )
    : null
}
