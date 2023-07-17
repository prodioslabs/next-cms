'use client'

import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useMutation } from 'react-query'
import { Button } from '~/components/ui/button'

type LogoutButtonProps = {
  className?: string
  style?: React.CSSProperties
}

export default function LogoutButton(props: LogoutButtonProps) {
  const mutation = useMutation(() => signOut({ redirect: false, callbackUrl: '/' }), {
    onSuccess: (result) => {
      if (result.url) {
        window.location.href = result.url
      }
    },
  })

  return (
    <Button
      icon={<LogOut />}
      variant="outline"
      {...props}
      loading={mutation.isLoading}
      onClick={() => {
        mutation.mutate()
      }}
    >
      Logout
    </Button>
  )
}
