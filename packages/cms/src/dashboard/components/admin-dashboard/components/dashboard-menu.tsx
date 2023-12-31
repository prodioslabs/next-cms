'use client'

import { useMutation } from '@tanstack/react-query'
import { signOut } from '@nextjs-cms/auth/react'
import { useTheme } from 'next-themes'
import { Settings } from 'lucide-react'
import { useStore } from '../../../stores'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '../../../../ui/menu-bar'
import { Button } from '../../../../ui/button'

export default function DashboardMenu() {
  const sidebarCollapsed = useStore((store) => store.sidebarCollapsed)

  const mutation = useMutation(() => signOut({ redirect: false, callbackUrl: '/' }), {
    onSuccess: (result) => {
      if (result.url) {
        window.location.href = result.url
      }
    },
  })

  const { setTheme } = useTheme()

  return (
    <Menubar className="w-full border-none p-0">
      <MenubarMenu>
        <MenubarTrigger asChild>
          <Button icon={<Settings name="settings" />} variant="outline" className="w-full">
            {sidebarCollapsed ? null : 'Settings'}
          </Button>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>Theme</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem
                onClick={() => {
                  setTheme('light')
                }}
              >
                Light
              </MenubarItem>
              <MenubarItem
                onClick={() => {
                  setTheme('dark')
                }}
              >
                Dark
              </MenubarItem>
              <MenubarItem
                onClick={() => {
                  setTheme('system')
                }}
              >
                System
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem
            onClick={() => {
              mutation.mutate()
            }}
          >
            Logout
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
