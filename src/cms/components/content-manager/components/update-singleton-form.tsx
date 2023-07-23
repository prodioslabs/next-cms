'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import BaseForm, { BaseFormProps } from './base-form'
import { useToast } from '~/components/ui/use-toast'
import { api } from '~/cms/server/api'
import { ToastAction } from '~/components/ui/toast'

type UpdateSingletonFormProps = Omit<BaseFormProps, 'onSubmit' | 'submitting'> & {
  singletonName: string
  redirectToOnSave: string
}

export default function UpdateSingletonForm({ singletonName, redirectToOnSave, ...rest }: UpdateSingletonFormProps) {
  const { toast } = useToast()

  const router = useRouter()

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
      router.refresh()
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
