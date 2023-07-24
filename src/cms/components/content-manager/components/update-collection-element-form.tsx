'use client'

import Link from 'next/link'
import BaseForm from './base-form'
import { useToast } from '~/components/ui/use-toast'
import { api } from '~/cms/server/api'
import { ToastAction } from '~/components/ui/toast'
import { ContentManagerProps } from '../types'

type UpdateCollectionElementFormProps = Omit<ContentManagerProps, 'config'> & {
  collectionName: string
  elementId: string
  redirectToOnSave: string
}

export default function UpdateCollectionElementForm({
  collectionName,
  elementId,
  redirectToOnSave,
  onUpdate,
  ...rest
}: UpdateCollectionElementFormProps) {
  const { toast } = useToast()

  const mutation = api.collection.updateCollectionElement.useMutation({
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
          collectionName,
          elementId,
          data,
        })
      }}
    />
  )
}
