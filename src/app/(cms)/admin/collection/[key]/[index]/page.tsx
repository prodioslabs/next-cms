import Link from 'next/link'
import { redirect } from 'next/navigation'
import { LuChevronLeft } from 'react-icons/lu'

export default function CollectionElementContentManager({
  params: { key, index },
}: {
  params: { key: string; index: string }
}) {
  const elementIndex = Number.parseInt(index)
  if (isNaN(elementIndex)) {
    redirect('/404')
  }

  return (
    <div className="space-y-4">
      <div>
        <Link href={`/admin/collection/${key}`} className="flex items-center text-sm text-muted-foreground">
          <LuChevronLeft className="mr-2 h-5 w-5" />
          Show all items
        </Link>
      </div>
    </div>
  )
}
