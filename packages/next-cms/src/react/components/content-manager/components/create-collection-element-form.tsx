'use client'

import Link from 'next/link'
import { useToast, ToastAction } from '@next-cms/ui'
import BaseForm from './base-form'
import { api } from '../../../../server/api'
import { ContentManagerProps } from '../types'

type CreateCollectionElementFormProps = Omit<ContentManagerProps, 'config'> & {
  collectionName: string
  redirectToOnSave: string
}

export default function CreateCollectionElementForm({
  collectionName,
  redirectToOnSave,
  onUpdate,
  ...rest
}: CreateCollectionElementFormProps) {
  const { toast } = useToast()

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
          data,
        })
      }}
    />
  )
}
