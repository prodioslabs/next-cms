'use client'

type DashboardPanelProps = {
  sidebar: React.ReactElement
  content: React.ReactElement
}

export default function DashboardPanel({ sidebar, content }: DashboardPanelProps) {
  return (
    <div className="flex">
      {sidebar}
      {content}
    </div>
  )
}
