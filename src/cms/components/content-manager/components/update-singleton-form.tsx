'use client'

import Link from 'next/link'
import BaseForm from './base-form'
import { useToast } from '~/components/ui/use-toast'
import { api } from '~/cms/server/api'
import { ToastAction } from '~/components/ui/toast'
import { ContentManagerProps } from '../types'

type UpdateSingletonFormProps = Omit<ContentManagerProps, 'config'> & {
  singletonName: string
}

export default function UpdateSingletonForm({
  singletonName,
  redirectToOnSave,
  onUpdate,
  ...rest
}: UpdateSingletonFormProps) {
  const { toast } = useToast()

  const mutation = api.singleton.updateSingleton.useMutation({
    onSuccess: (singleton) => {
      toast({
        title: `${singleton.name} content updated successfully`,
        description: 'Refresh page to see the updated content',
        action: (
          <ToastAction asChild altText="View Page">
            <Link href={redirectToOnSave}>View Page</Link>
          </ToastAction>
        ),
      })
      onUpdate()
    },
    onError: (error) => {
      toast({
        title: 'Error updating content',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  return (
    <BaseForm
      {...rest}
      submitting={mutation.isLoading}
      onSubmit={(data) => {
        mutation.mutate({
          singletonName,
          data,
        })
      }}
    />
  )
}
