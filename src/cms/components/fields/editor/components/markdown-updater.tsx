import { useHelpers } from '@remirror/react'
import { useEffect, useRef } from 'react'

type MarkdownUpdaterProps = {
  onChange: (markdownContent: string) => void
  value: string
  setContent: (markdownContent: string) => void
}

export default function MarkdownUpdater({ value, setContent, onChange }: MarkdownUpdaterProps) {
  const { getMarkdown } = useHelpers(true)
  const markdownContent = getMarkdown()
  const onChangeRef = useRef(onChange)

  useEffect(
    function setEditorContentOnValueChange() {
      if (getMarkdown() !== value) {
        setContent(value)
      }
    },
    [value, getMarkdown, setContent],
  )

  useEffect(
    function updateContentOnChange() {
      onChangeRef.current(markdownContent)
    },
    [markdownContent],
  )

  return null
}
