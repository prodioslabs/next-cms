'use client'

import { useRemirror, Remirror, EditorComponent } from '@remirror/react'
import {
  MarkdownExtension,
  BlockquoteExtension,
  BoldExtension,
  BulletListExtension,
  CodeExtension,
  HardBreakExtension,
  HeadingExtension,
  ItalicExtension,
  LinkExtension,
  ListItemExtension,
  OrderedListExtension,
  StrikeExtension,
  TableExtension,
  TrailingNodeExtension,
} from 'remirror/extensions'
import { ExtensionPriority } from 'remirror'
import { cn } from '~/lib/utils'
import MarkdownUpdater from './components/markdown-updater'

type EditorProps = {
  value: string
  onChange: (markdownContent: string) => void
  className?: string
  style?: React.CSSProperties
}

export default function Editor({ value, onChange, className, style }: EditorProps) {
  const editor = useRemirror({
    extensions: () => [
      new MarkdownExtension({ copyAsMarkdown: false }),
      new LinkExtension({ autoLink: true }),
      new BoldExtension(),
      new StrikeExtension(),
      new ItalicExtension(),
      new HeadingExtension(),
      new BlockquoteExtension(),
      new BulletListExtension({ enableSpine: true }),
      new OrderedListExtension(),
      new ListItemExtension({ priority: ExtensionPriority.High, enableCollapsible: true }),
      new CodeExtension(),
      new TrailingNodeExtension(),
      new TableExtension(),
      /**
       * `HardBreakExtension` allows us to create a newline inside paragraphs.
       * e.g. in a list item
       */
      new HardBreakExtension(),
    ],
    stringHandler: 'markdown',
    content: value,
  })

  return (
    <div className={cn(className)} style={style}>
      <Remirror manager={editor.manager} initialContent={editor.state}>
        <div className="editor-container rounded-md border px-3 py-2 text-sm text-foreground [&>.remirror-editor-wrapper>div]:focus-within:outline-none">
          <EditorComponent />
        </div>
        <MarkdownUpdater onChange={onChange} />
      </Remirror>
    </div>
  )
}
