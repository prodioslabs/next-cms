import { cn } from 'ui'
import { EditorContent, useEditor } from '@tiptap/react'
import Underline from '@tiptap/extension-underline'
import { StarterKit } from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import { useEffect, useState } from 'react'
import EditorToolbar, { HEADING_LEVELS } from './components/editor-toolbar'

type TiptapEditorProps = {
  /**
   * HTML String
   */
  value: string
  onChange: (value: string) => void
  className?: string
  style?: React.CSSProperties
}

export default function TiptapEditor({ value, onChange, className, style }: TiptapEditorProps) {
  /**
   * internalValue -> the internal value, used to compare the value and internalValue
   * @see updateContentOnValueChange
   */
  const [internalValue, setInternalValue] = useState(value)

  const editor = useEditor({
    content: value,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: HEADING_LEVELS,
        },
      }),
      Underline,
      TextStyle,
      Color.configure({
        types: ['textStyle'],
      }),
    ],
    onUpdate: () => {
      const html = editor?.getHTML()
      if (html) {
        onChange(html)
        setInternalValue(html)
      }
    },
  })

  useEffect(
    function updateContentOnValueChange() {
      if (value !== internalValue) {
        editor?.commands.setContent(value)
      }
    },
    [value, internalValue, editor],
  )

  return (
    <div className={cn('space-y-4', className)} style={style}>
      {editor ? (
        <>
          <EditorToolbar editor={editor} />
          <EditorContent
            editor={editor}
            className="editor-container prose prose-zinc !max-w-none rounded-md border px-3 py-2 text-sm text-foreground dark:prose-invert focus-within:border-primary/50 [&>.ProseMirror]:focus-within:outline-none"
          />
        </>
      ) : null}
    </div>
  )
}
