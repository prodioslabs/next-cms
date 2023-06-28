'use client'

import { LuEdit2 } from 'react-icons/lu'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from '~/components/ui/sheet'

export default function AdminPanel() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="fixed bottom-4 right-4 shadow" icon={<LuEdit2 />}>
          Edit Content
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Admin Panel</SheetTitle>
          <SheetDescription>Update the page content</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
