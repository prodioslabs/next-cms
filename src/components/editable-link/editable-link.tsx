'use client'

import { ComputePositionReturn, autoPlacement, autoUpdate, computePosition, offset } from '@floating-ui/dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { LuChevronRight } from 'react-icons/lu'
import { Collection } from '~/core'
import { cn } from '~/lib/utils'

type EditableLinkProps = {
  type: 'singleton' | 'collection'
  collection: Collection
  collectionId: string
  elementId: string
}

export default function EditableLink({ type, collectionId, collection, elementId }: EditableLinkProps) {
  const [visible, setVisible] = useState(false)
  const [computedPosition, setComputedPosition] = useState<ComputePositionReturn | undefined>(undefined)
  const [containerBBox, setContainerBBox] = useState<DOMRect | undefined>()

  const pathname = usePathname()

  useEffect(
    function computeFloatingPositionOnVisiblityChange() {
      let cleanup: () => void

      if (visible) {
        const element = document.getElementById(elementId)
        const bboxElement = document.getElementById(`bbox-${elementId}`)
        if (element && bboxElement) {
          cleanup = autoUpdate(element, bboxElement, () => {
            computePosition(element, bboxElement, {
              middleware: [
                autoPlacement({
                  alignment: 'start',
                }),
                offset(6),
              ],
              strategy: 'fixed',
            }).then(setComputedPosition)
            setContainerBBox(element.getBoundingClientRect())
          })
        }
      }

      return () => {
        if (cleanup) {
          cleanup()
        }
      }
    },
    [visible, elementId],
  )

  // timeout to prevent hiding the element as soon as mouse leaves the container element
  // instead of setting the visibility to false immediately, a setTimeout (with 100ms timeout)
  // is used to delay the closing, and if the user has hovered within the time, then the timeout
  // would be cleared
  const timeout = useRef<NodeJS.Timeout | null>(null)

  const handleMouseOver = useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current)
    }

    setVisible(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    timeout.current = setTimeout(() => {
      setVisible(false)
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

  return visible
    ? createPortal(
        <>
          <Link
            href={`/admin/${type}/${collectionId}?redirect=${pathname}`}
            className={cn(
              'fixed flex w-max items-center whitespace-nowrap rounded border border-border bg-muted px-2 py-1 text-xs text-muted-foreground hover:bg-secondary hover:text-secondary-foreground',
              {
                'rounded-t-none border-t-0': computedPosition?.placement?.startsWith('bottom'),
                'rounded-b-none border-b-0': computedPosition?.placement?.startsWith('top'),
              },
            )}
            id={`bbox-${elementId}`}
            style={{
              top: computedPosition?.y,
              left: computedPosition?.x,
            }}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
          >
            Edit {collection.name}
            <LuChevronRight className="ml-2 h-4 w-4" />
          </Link>
          {containerBBox ? (
            <div
              className="pointer-events-none fixed rounded-md ring-2 ring-border"
              style={{
                top: containerBBox.top - 4,
                left: containerBBox.left - 4,
                width: containerBBox.width + 8,
                height: containerBBox.height + 8,
              }}
            />
          ) : null}
        </>,
        document.getElementById('editable-element-portal')!,
      )
    : null
}
