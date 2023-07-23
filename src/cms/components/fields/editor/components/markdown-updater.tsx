import { useHelpers } from '@remirror/react'
import { useEffect, useRef } from 'react'

type MarkdownUpdaterProps = {
  onChange: (markdownContent: string) => void
}

export default function MarkdownUpdater({ onChange }: MarkdownUpdaterProps) {
  const { getMarkdown } = useHelpers(true)
  const markdownContent = getMarkdown()
  const onChangeRef = useRef(onChange)

  useEffect(
    function updateContentOnChange() {
      onChangeRef.current(markdownContent)
    },
    [markdownContent],
  )

  return null
}
