'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import BaseForm, { BaseFormProps } from './base-form'
import { useToast } from '~/components/ui/use-toast'
import { api } from '~/cms/server/api'
import { ToastAction } from '~/components/ui/toast'

type CreateCollectionElementFormProps = Omit<BaseFormProps, 'onSubmit' | 'submitting'> & {
  collectionName: string
  redirectToOnSave: string
}

export default function CreateCollectionElementForm({
  collectionName,
  redirectToOnSave,
  ...rest
}: CreateCollectionElementFormProps) {
  const { toast } = useToast()

  const router = useRouter()

  const mutation = api.collection.createCollectionElement.useMutation({
    onSuccess: (collectionElement) => {
      toast({
        title: `${collectionElement.slug} content updated successfully`,
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
          collectionName,
          data,
        })
      }}
    />
  )
}
