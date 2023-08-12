'use client'

import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

type DashboardPanelProps = {
  sidebar: React.ReactElement
  content: React.ReactElement
}

export default function DashboardPanel({ sidebar, content }: DashboardPanelProps) {
  return (
    <PanelGroup direction="horizontal">
      <Panel collapsible collapsedSize={5} defaultSize={10} className="h-screen">
        {sidebar}
      </Panel>
      <PanelResizeHandle className="w-0.5 border-r border-border/80 hover:border-border/100" />
      <Panel className="h-screen">{content}</Panel>
    </PanelGroup>
  )
}
