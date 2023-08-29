import { PanelGroupOnLayout } from 'react-resizable-panels'
import { create } from 'zustand'

type Store = {
  layout: number[]
  saveLayout: PanelGroupOnLayout
  sidebarCollapsed: boolean
  setSidebarCollapsed: (collapsed: boolean) => void
}

export const useStore = create<Store>((set) => ({
  layout: [20, 80],
  saveLayout: (sizes) => set({ layout: sizes }),
  sidebarCollapsed: false,
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
}))
