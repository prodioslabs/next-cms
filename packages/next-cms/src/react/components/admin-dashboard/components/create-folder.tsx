'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Folder } from '@prisma/client'
import { useForm } from 'react-hook-form'
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormFieldWithController,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from 'ui'
import { z } from 'zod'
import { useState } from 'react'
import { api } from '../../../../server/api'

const validationSchema = z.object({
  name: z.string().nonempty(),
})

type CreateFolderProps = {
  children: React.ReactElement<{ onClick: () => void }>
  folderId?: string
  onFolderCreated?: (folder: Folder) => void
}

export default function CreateFolder({ children, folderId, onFolderCreated }: CreateFolderProps) {
  const [dialogOpen, setDialogOpen] = useState(false)

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: '',
    },
  })

  const mutation = api.media.createFolder.useMutation({
    onSuccess: (folder) => {
      onFolderCreated?.(folder)
      setDialogOpen(false)
    },
  })

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Folder</DialogTitle>
          <DialogDescription>Add folder to properly segregate media assets</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(({ name }) => {
              mutation.mutate({ name: name.trim(), parent: folderId })
            })}
          >
            <FormFieldWithController
              name="name"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
