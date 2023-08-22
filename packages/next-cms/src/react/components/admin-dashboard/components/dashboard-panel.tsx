'use client'

import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { useStore } from '../../../stores'

type DashboardPanelProps = {
  sidebar: React.ReactElement
  content: React.ReactElement
}

export default function DashboardPanel({ sidebar, content }: DashboardPanelProps) {
  const { layout: defaultLayout, saveLayout, setSidebarCollapsed } = useStore()

  return (
    <PanelGroup
      direction="horizontal"
      onLayout={(sizes) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`
        saveLayout(sizes)
      }}
    >
      <Panel
        defaultSize={defaultLayout[0]}
        className="h-screen"
        collapsible
        collapsedSize={4}
        onCollapse={setSidebarCollapsed}
      >
        {sidebar}
      </Panel>
      <PanelResizeHandle className="w-0.5 border-r border-border/80 hover:border-border/100" />
      <Panel className="h-screen" defaultSize={defaultLayout[1]}>
        {content}
      </Panel>
    </PanelGroup>
  )
}
